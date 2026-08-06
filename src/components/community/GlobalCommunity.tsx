import { motion } from 'framer-motion'
import AvatarIllustration from '../AvatarIllustration'
import CountUpStat from '../hero/CountUpStat'

const FLAGS = ['🇺🇸', '🇪🇸', '🇯🇵', '🇧🇷', '🇩🇪', '🇫🇷', '🇨🇳']

// Rough, non-geographic placement (percentage of the map's own width/height)
// spread to suggest a global network rather than an accurate atlas.
const PINS = [
  { x: 16, y: 32, color: '#1ba3e0' },
  { x: 30, y: 64, color: '#f5a623' },
  { x: 48, y: 18, color: '#2dd4bf' },
  { x: 52, y: 56, color: '#a78bfa' },
  { x: 68, y: 24, color: '#f472b6' },
  { x: 80, y: 44, color: '#4ade80' },
  { x: 84, y: 70, color: '#3ec6ff' },
]

const ARCS = [
  'M16,32 Q34,4 48,18',
  'M48,18 Q60,8 68,24',
  'M68,24 Q75,32 80,44',
  'M52,56 Q66,62 80,44',
  'M30,64 Q42,44 52,56',
]

export default function GlobalCommunity() {
  return (
    <section className="relative overflow-hidden px-6 py-16 sm:py-20" style={{ background: '#081b33' }}>
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-light/70">
            Global Community
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Learn From Anywhere.
            <br />
            <span className="text-brand-cyan">Connect Everywhere.</span>
          </h2>
          <p className="mt-5 max-w-md text-white/70 leading-relaxed">
            Join a diverse global community of learners and tutors building confidence through
            real conversations.
          </p>

          <div className="mt-9 flex items-center gap-6">
            <CountUpStat value={120} suffix="+" label="Countries" tone="dark" />
            <div className="flex items-center gap-2">
              <div className="flex flex-wrap gap-1.5 text-lg leading-none">
                {FLAGS.map((f) => (
                  <span key={f}>{f}</span>
                ))}
              </div>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-xs font-semibold text-white">
                +
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-[5/4] w-full"
        >
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
            <ellipse cx="50" cy="45" rx="46" ry="34" fill="none" stroke="rgba(62,198,255,0.18)" strokeWidth="0.4" />
            <ellipse cx="50" cy="45" rx="46" ry="16" fill="none" stroke="rgba(62,198,255,0.14)" strokeWidth="0.35" />
            <ellipse cx="50" cy="45" rx="22" ry="34" fill="none" stroke="rgba(62,198,255,0.14)" strokeWidth="0.35" />
            <line x1="4" y1="45" x2="96" y2="45" stroke="rgba(62,198,255,0.14)" strokeWidth="0.35" />
            {ARCS.map((d, i) => (
              <path
                key={i}
                d={d}
                fill="none"
                stroke="rgba(62,198,255,0.5)"
                strokeWidth="0.5"
                strokeDasharray="1.5 1.5"
              />
            ))}
            {PINS.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r="1.2" fill={p.color} />
            ))}
          </svg>

          {PINS.map((p, i) => (
            <div
              key={i}
              className="absolute"
              style={{ left: `${p.x}%`, top: `${p.y}%`, transform: 'translate(-50%, -50%)' }}
            >
              <AvatarIllustration color={p.color} className="h-9 w-9 sm:h-11 sm:w-11 rounded-full ring-2 ring-[#081b33] shadow-lg" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
