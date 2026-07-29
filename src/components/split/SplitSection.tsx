import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

function LearnerIllustration() {
  return (
    <svg viewBox="0 0 200 160" className="w-full max-w-xs mx-auto">
      <rect x="30" y="90" width="140" height="8" rx="4" fill="#132952" />
      <rect x="50" y="50" width="100" height="60" rx="8" fill="#0e1c3d" stroke="#3ec6ff" strokeOpacity="0.4" />
      <rect x="58" y="58" width="84" height="44" rx="4" fill="#132952" />
      <path d="M74 78h52M74 88h36" stroke="#8fe0ff" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" />
      <circle cx="100" cy="34" r="16" fill="#3ec6ff" fillOpacity="0.85" />
      <path d="M86 46c0-8 6-14 14-14s14 6 14 14" fill="#3ec6ff" fillOpacity="0.85" />
      <rect x="20" y="112" width="36" height="26" rx="3" fill="#132952" stroke="#3ec6ff" strokeOpacity="0.35" />
      <path d="M20 118h36M20 124h28" stroke="#8fe0ff" strokeOpacity="0.5" strokeWidth="1.5" />
    </svg>
  )
}

function EducatorIllustration() {
  return (
    <svg viewBox="0 0 200 160" className="w-full max-w-xs mx-auto">
      <rect x="30" y="30" width="120" height="80" rx="6" fill="#0e1c3d" stroke="#8fe0ff" strokeOpacity="0.4" />
      <path d="M46 50h60M46 64h88M46 78h70" stroke="#3ec6ff" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" />
      <circle cx="100" cy="132" r="18" fill="#8fe0ff" fillOpacity="0.85" />
      <path d="M84 146c0-9 7-16 16-16s16 7 16 16" fill="#8fe0ff" fillOpacity="0.85" />
      <path d="M60 116l40-14 40 14-40 14z" fill="#3ec6ff" fillOpacity="0.5" />
      <rect x="96" y="130" width="8" height="18" fill="#3ec6ff" fillOpacity="0.5" />
    </svg>
  )
}

export default function SplitSection() {
  return (
    <section className="relative overflow-hidden py-28 sm:py-36 px-6" style={{ background: '#0a1128' }}>
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {/* Kept close to 54–58% (never below 54%) so it stays well clear of the
            content grid's ~50% column boundary regardless of the curve. */}
        <path d="M0,0 L58,0 C54,35 58,65 54,100 L0,100 Z" fill="rgba(62,198,255,0.05)" />
        <path
          d="M58,0 C54,35 58,65 54,100"
          fill="none"
          stroke="rgba(143,224,255,0.18)"
          strokeWidth="0.4"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div className="relative z-10 mx-auto grid max-w-6xl gap-16 md:grid-cols-2 md:gap-20">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col items-center text-center md:items-start md:text-left"
        >
          <LearnerIllustration />
          <span className="mt-8 text-xs font-semibold uppercase tracking-[0.25em] text-brand-light/60">
            For Learners
          </span>
          <h3 className="mt-3 text-3xl sm:text-4xl font-bold text-white">Learn at the speed of real life.</h3>
          <p className="mt-4 max-w-md text-white/65">
            Personalized lessons, flexible scheduling, and real conversations with native
            speakers — so progress fits around your life, not the other way around.
          </p>
          <button
            type="button"
            className="mt-8 rounded-full border border-white/20 px-7 py-3 text-sm font-semibold text-white/90 transition-colors hover:bg-white/10"
          >
            Explore for Learners
          </button>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col items-center text-center md:items-start md:text-left md:pl-6"
        >
          <EducatorIllustration />
          <span className="mt-8 text-xs font-semibold uppercase tracking-[0.25em] text-brand-light/60">
            For Educators
          </span>
          <h3 className="mt-3 text-3xl sm:text-4xl font-bold text-white">Teach the world, on your terms.</h3>
          <p className="mt-4 max-w-md text-white/65">
            Set your own hours, connect with motivated learners globally, and get paid
            reliably for doing what you already love.
          </p>
          <button
            type="button"
            className="mt-8 rounded-full border border-white/20 px-7 py-3 text-sm font-semibold text-white/90 transition-colors hover:bg-white/10"
          >
            Become a Tutor
          </button>
        </motion.div>
      </div>
    </section>
  )
}
