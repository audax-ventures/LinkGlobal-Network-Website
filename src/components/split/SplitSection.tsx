import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

function LearnerIllustration() {
  return (
    <svg viewBox="0 0 200 160" className="w-full max-w-xs mx-auto">
      <rect x="30" y="90" width="140" height="8" rx="4" fill="#cfe6f7" />
      <rect x="50" y="50" width="100" height="60" rx="8" fill="#eef7ff" stroke="#1ba3e0" strokeOpacity="0.35" />
      <rect x="58" y="58" width="84" height="44" rx="4" fill="#dcefff" />
      <path d="M74 78h52M74 88h36" stroke="#1ba3e0" strokeOpacity="0.55" strokeWidth="2" strokeLinecap="round" />
      <circle cx="100" cy="34" r="16" fill="#1ba3e0" fillOpacity="0.9" />
      <path d="M86 46c0-8 6-14 14-14s14 6 14 14" fill="#1ba3e0" fillOpacity="0.9" />
      <rect x="20" y="112" width="36" height="26" rx="3" fill="#eef7ff" stroke="#1ba3e0" strokeOpacity="0.3" />
      <path d="M20 118h36M20 124h28" stroke="#1ba3e0" strokeOpacity="0.45" strokeWidth="1.5" />
    </svg>
  )
}

function EducatorIllustration() {
  return (
    <svg viewBox="0 0 200 160" className="w-full max-w-xs mx-auto">
      <rect x="30" y="30" width="120" height="80" rx="6" fill="#eef7ff" stroke="#1ba3e0" strokeOpacity="0.35" />
      <path d="M46 50h60M46 64h88M46 78h70" stroke="#1ba3e0" strokeOpacity="0.55" strokeWidth="2" strokeLinecap="round" />
      <circle cx="100" cy="132" r="18" fill="#3ec6ff" fillOpacity="0.9" />
      <path d="M84 146c0-9 7-16 16-16s16 7 16 16" fill="#3ec6ff" fillOpacity="0.9" />
      <path d="M60 116l40-14 40 14-40 14z" fill="#1ba3e0" fillOpacity="0.4" />
      <rect x="96" y="130" width="8" height="18" fill="#1ba3e0" fillOpacity="0.4" />
    </svg>
  )
}

export default function SplitSection() {
  return (
    <section className="relative overflow-hidden py-28 sm:py-36 px-6">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {/* A subtle organic divider accent only — the light/dark distinction
            between sections is handled by the page-wide gradient now, not by
            two different shades within this one section. */}
        <path
          d="M52,0 C48,35 52,65 48,100"
          fill="none"
          stroke="rgba(19,41,82,0.1)"
          strokeWidth="0.4"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div className="relative z-10 mx-auto grid max-w-6xl gap-16 md:grid-cols-2 md:gap-24">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col items-center text-center md:items-start md:text-left md:pr-6"
        >
          <LearnerIllustration />
          <span className="mt-8 text-xs font-semibold uppercase tracking-[0.25em] text-navy-700/60">
            For Learners
          </span>
          <h3 className="mt-3 text-3xl sm:text-4xl font-bold text-navy-950">Learn at the speed of real life.</h3>
          <p className="mt-4 max-w-md text-navy-700/75">
            Personalized lessons, flexible scheduling, and real conversations with native
            speakers — so progress fits around your life, not the other way around.
          </p>
          <button
            type="button"
            className="mt-8 rounded-full border border-navy-900/15 px-7 py-3 text-sm font-semibold text-navy-800 transition-colors hover:bg-navy-900/[0.04]"
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
          <span className="mt-8 text-xs font-semibold uppercase tracking-[0.25em] text-navy-700/60">
            For Educators
          </span>
          <h3 className="mt-3 text-3xl sm:text-4xl font-bold text-navy-950">Teach the world, on your terms.</h3>
          <p className="mt-4 max-w-md text-navy-700/75">
            Set your own hours, connect with motivated learners globally, and get paid
            reliably for doing what you already love.
          </p>
          <button
            type="button"
            className="mt-8 rounded-full border border-navy-900/15 px-7 py-3 text-sm font-semibold text-navy-800 transition-colors hover:bg-navy-900/[0.04]"
          >
            Become a Tutor
          </button>
        </motion.div>
      </div>
    </section>
  )
}
