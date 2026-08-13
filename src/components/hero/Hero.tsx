import { motion } from 'framer-motion'
import HeroBackground from './HeroBackground'
import LaptopMockup from '../loading/LaptopMockup'
import AvatarIllustration from '../AvatarIllustration'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

const AVATAR_COLORS = ['#1ba3e0', '#f5a623', '#2dd4bf', '#a78bfa']

function LightningIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor">
      <path d="M6 4.5v15l13-7.5-13-7.5Z" />
    </svg>
  )
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-16"
    >
      <HeroBackground />

      <div className="relative z-10 grid w-full max-w-6xl items-center gap-16 md:grid-cols-2 md:gap-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center text-center md:items-start md:text-left"
        >
          <motion.span
            variants={item}
            className="mb-5 inline-flex items-center gap-1.5 rounded-full bg-brand-blue/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue"
          >
            <LightningIcon />
            #1 Platform for Real Conversations
          </motion.span>

          <motion.h1
            variants={item}
            className="text-4xl sm:text-6xl md:text-6xl font-extrabold leading-[1.05] tracking-tight text-navy-950"
          >
            Real People.
            <br />
            <span className="whitespace-nowrap">Real Conversations.</span>
            <br />
            <span style={{ background: 'linear-gradient(90deg, #1ba3e0, #a78bfa)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
              Real Progress.
            </span>
          </motion.h1>

          <motion.p variants={item} className="mt-6 max-w-lg text-base sm:text-lg text-navy-700/80">
            LinkGlobal Network connects learners with native-speaking tutors in over 120
            countries for personalized 1-on-1 sessions.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-col sm:flex-row items-center gap-4">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white shadow-[0_8px_30px_rgba(30,120,190,0.3)] transition-transform hover:scale-105"
              style={{ background: 'linear-gradient(90deg, #1ba3e0, #3ec6ff)' }}
            >
              Start Your Journey
              <span aria-hidden="true">→</span>
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2.5 rounded-full border border-navy-900/15 bg-white px-8 py-3.5 text-sm font-semibold text-navy-800 shadow-[0_4px_16px_rgba(19,41,82,0.06)] transition-colors hover:bg-navy-900/[0.03]"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-navy-900/[0.06]">
                <PlayIcon />
              </span>
              Learn More
            </button>
          </motion.div>

          <motion.div variants={item} className="mt-9 flex items-center gap-3">
            <div className="flex -space-x-3">
              {AVATAR_COLORS.map((color) => (
                <AvatarIllustration key={color} color={color} className="h-9 w-9 rounded-full ring-2 ring-white" />
              ))}
            </div>
            <p className="text-sm text-navy-700/70">
              Join thousands of learners
              <br className="hidden sm:block" /> growing every day
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          variants={item}
          initial="hidden"
          animate="show"
          className="relative flex justify-center md:justify-end"
        >
          <LaptopMockup
            src="/gallery/dashboard.png"
            alt="LinkGlobal Network learner dashboard"
            className="relative z-10 w-full max-w-md"
          />
          <img
            src="/gallery/mobile-dashboard-mockup.png"
            alt="LinkGlobal Network dashboard on mobile"
            className="absolute -bottom-6 -left-2 z-20 w-24 drop-shadow-[0_20px_45px_rgba(10,20,45,0.32)] -rotate-6 sm:-left-8 sm:w-32"
          />
        </motion.div>
      </div>
    </section>
  )
}
