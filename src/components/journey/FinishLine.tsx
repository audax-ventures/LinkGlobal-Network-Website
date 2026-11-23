import { motion, useReducedMotion } from 'framer-motion'

// Final changes (Nov 2026): where the journey line ends, a finish line. The
// ribbon snaps and swings away, a flag pops up with a burst of confetti and
// the message lands: follow the steps and you reach your goal. Plays once,
// when it scrolls into view.

const CONFETTI = ['#1ba3e0', '#f5a623', '#2dd4bf', '#a78bfa', '#f472b6', '#4ade80']
const PIECES = Array.from({ length: 16 }, (_, i) => {
  const angle = (i / 16) * Math.PI * 2
  const r = 70 + (i % 3) * 22
  return { x: Math.cos(angle) * r * 1.6, y: Math.sin(angle) * r - 30, color: CONFETTI[i % CONFETTI.length], rot: (i * 47) % 360 }
})

export default function FinishLine() {
  const reduced = useReducedMotion()
  const snap = { duration: 1.1, delay: 0.25, ease: 'easeIn' as const, times: [0, 0.35, 1] }

  return (
    <motion.div
      className="relative mx-auto mt-2 flex max-w-xl flex-col items-center px-4 pb-4 text-center"
      initial={reduced ? 'done' : 'idle'}
      whileInView="done"
      viewport={{ once: true, amount: 0.7 }}
    >
      {/* The journey line runs into the finish. */}
      <span className="h-10 w-[3px] rounded-full bg-gradient-to-b from-[#87d3f3] to-[#159fd9]" aria-hidden="true" />

      <div className="relative mt-1 h-28 w-full max-w-md" aria-hidden="true">
        {/* Posts */}
        <span className="absolute bottom-0 left-0 h-24 w-2 rounded-full bg-navy-900/80" />
        <span className="absolute bottom-0 right-0 h-24 w-2 rounded-full bg-navy-900/80" />
        {/* Ribbon halves, joined in the middle, then snapped apart */}
        <motion.span
          className="absolute left-1 top-5 h-3 w-1/2 origin-left rounded-r-sm bg-gradient-to-r from-[#1ba3e0] to-[#3ec6ff] shadow-sm"
          variants={{ idle: { rotate: 0, opacity: 1 }, done: { rotate: [0, 28, 62], y: [0, 4, 26], opacity: [1, 1, 0] } }}
          transition={snap}
        />
        <motion.span
          className="absolute right-1 top-5 h-3 w-1/2 origin-right rounded-l-sm bg-gradient-to-l from-[#1ba3e0] to-[#3ec6ff] shadow-sm"
          variants={{ idle: { rotate: 0, opacity: 1 }, done: { rotate: [0, -28, -62], y: [0, 4, 26], opacity: [1, 1, 0] } }}
          transition={snap}
        />
        {/* Confetti */}
        {PIECES.map((p, i) => (
          <motion.span
            key={i}
            className="absolute left-1/2 top-1/2 h-2.5 w-1.5 rounded-sm"
            style={{ background: p.color }}
            variants={{
              idle: { x: 0, y: 0, opacity: 0, rotate: 0 },
              done: { x: p.x, y: [0, p.y, p.y + 60], opacity: [0, 1, 0], rotate: p.rot },
            }}
            transition={{ duration: 1.6, delay: 0.45, ease: 'easeOut' }}
          />
        ))}
        {/* Flag */}
        <motion.span
          className="absolute bottom-0 left-1/2 flex -translate-x-1/2 items-end"
          variants={{ idle: { y: 30, opacity: 0, scale: 0.6 }, done: { y: 0, opacity: 1, scale: 1 } }}
          transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.5 }}
        >
          <svg viewBox="0 0 64 80" className="h-24 w-20 drop-shadow-[0_8px_16px_rgba(19,41,82,0.25)]">
            <rect x="6" y="4" width="4" height="74" rx="2" fill="#10263f" />
            <defs>
              <pattern id="lg-checks" width="12" height="12" patternUnits="userSpaceOnUse">
                <rect width="12" height="12" fill="#ffffff" />
                <rect width="6" height="6" fill="#10263f" />
                <rect x="6" y="6" width="6" height="6" fill="#10263f" />
              </pattern>
            </defs>
            <motion.path
              d="M10 6 C 26 0, 38 14, 58 8 L 58 40 C 38 46, 26 32, 10 38 Z"
              fill="url(#lg-checks)"
              stroke="#10263f"
              strokeWidth="1.5"
              animate={reduced ? undefined : { d: ['M10 6 C 26 0, 38 14, 58 8 L 58 40 C 38 46, 26 32, 10 38 Z', 'M10 6 C 26 12, 38 2, 58 10 L 58 42 C 38 34, 26 44, 10 38 Z', 'M10 6 C 26 0, 38 14, 58 8 L 58 40 C 38 46, 26 32, 10 38 Z'] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            />
          </svg>
        </motion.span>
      </div>

      <motion.p
        className="mt-6 rounded-full bg-emerald-500 px-4 py-1.5 text-sm font-bold uppercase tracking-[0.2em] text-white shadow-[0_8px_20px_rgba(16,185,129,0.35)]"
        variants={{ idle: { opacity: 0, y: 10, scale: 0.9 }, done: { opacity: 1, y: 0, scale: 1 } }}
        transition={{ duration: 0.5, delay: 0.9 }}
      >
        Goal reached
      </motion.p>
      <motion.p
        className="mt-4 text-2xl font-extrabold tracking-tight text-navy-950 sm:text-3xl"
        variants={{ idle: { opacity: 0, y: 12 }, done: { opacity: 1, y: 0 } }}
        transition={{ duration: 0.6, delay: 1.1 }}
      >
        Follow these steps, and you’ll reach your goal.
      </motion.p>
    </motion.div>
  )
}
