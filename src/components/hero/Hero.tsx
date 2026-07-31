import { motion } from 'framer-motion'
import HeroBackground from './HeroBackground'
import CountUpStat from './CountUpStat'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-20"
    >
      <HeroBackground />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex max-w-4xl flex-col items-center text-center"
      >
        <motion.span
          variants={item}
          className="mb-5 rounded-full border border-navy-900/10 bg-navy-900/[0.03] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-navy-700"
        >
          Language Learning, Without Borders
        </motion.span>

        <motion.h1
          variants={item}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold leading-[1.05] tracking-tight text-navy-950"
        >
          Learn Any Language.
          <br />
          <span className="text-gradient-brand">Meet the Whole World.</span>
        </motion.h1>

        <motion.p variants={item} className="mt-6 max-w-2xl text-base sm:text-lg text-navy-700/80">
          LinkGlobal Network connects you with real, native-speaking tutors in over 120
          countries — so you don&rsquo;t just learn a language, you live it.
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <button
            type="button"
            className="rounded-full px-8 py-3.5 text-sm font-semibold text-white shadow-[0_8px_30px_rgba(30,120,190,0.3)] transition-transform hover:scale-105"
            style={{ background: 'linear-gradient(90deg, #1ba3e0, #3ec6ff)' }}
          >
            Get Started
          </button>
          <button
            type="button"
            className="rounded-full border border-navy-900/15 px-8 py-3.5 text-sm font-semibold text-navy-800 transition-colors hover:bg-navy-900/[0.04]"
          >
            See How It Works
          </button>
        </motion.div>
      </motion.div>

      <motion.div
        variants={item}
        initial="hidden"
        animate="show"
        className="relative z-10 mt-16 sm:mt-20 grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-14"
      >
        <CountUpStat value={50000} suffix="+" label="Learners" />
        <CountUpStat value={120} suffix="+" label="Countries" />
        <CountUpStat value={4.9} decimals={1} suffix="/5" label="Average Rating" />
        <CountUpStat value={10000} suffix="+" label="Tutoring Sessions" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 flex flex-col items-center gap-2 text-navy-900/35"
      >
        <span className="text-[10px] uppercase tracking-[0.25em]">Scroll</span>
        <motion.svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </motion.div>
    </section>
  )
}
