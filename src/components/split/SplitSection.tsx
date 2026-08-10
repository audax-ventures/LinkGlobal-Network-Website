import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import AvatarIllustration from '../AvatarIllustration'
import {
  SparkleIcon,
  BookIcon,
  GraduationCapIcon,
  UserIcon,
  CalendarIcon,
  GlobeIcon,
  ShieldIcon,
  ClockIcon,
} from '../icons/LineIcons'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

function Sparkline({ points, color }: { points: string; color: string }) {
  return (
    <svg width="72" height="24" viewBox="0 0 72 24" className="mt-1.5">
      <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function TestimonialChip() {
  return (
    <div className="absolute left-4 top-4 max-w-[170px] rounded-xl bg-white p-3 shadow-[0_10px_25px_rgba(19,41,82,0.25)]">
      <p className="text-[11px] italic leading-snug text-navy-700/80">
        &ldquo;My Spanish conversation skills have improved so much!&rdquo;
      </p>
      <div className="mt-2 flex items-center gap-2">
        <AvatarIllustration color="#1ba3e0" className="h-6 w-6 shrink-0 rounded-full" />
        <div>
          <p className="text-[11px] font-semibold text-navy-950">&mdash; Sophia R.</p>
          <p className="text-[10px] text-amber-400">★★★★★</p>
        </div>
      </div>
    </div>
  )
}

function ProgressChip() {
  return (
    <div className="absolute bottom-4 left-4 rounded-xl bg-white p-3 shadow-[0_10px_25px_rgba(19,41,82,0.25)]">
      <p className="text-[10px] text-navy-700/50">Your progress</p>
      <p className="text-lg font-extrabold leading-tight text-navy-950">76%</p>
      <p className="text-[10px] text-navy-700/50">Intermediate</p>
      <Sparkline points="0,20 12,15 24,17 36,8 48,10 60,4 72,3" color="#1ba3e0" />
    </div>
  )
}

function EarningsChip() {
  return (
    <div className="absolute left-4 top-4 rounded-xl bg-navy-950 p-3 shadow-[0_10px_25px_rgba(19,41,82,0.3)]">
      <p className="text-[10px] text-white/50">Earnings this month</p>
      <div className="flex items-baseline gap-1.5">
        <p className="text-lg font-extrabold leading-tight text-white">$2,450</p>
        <span className="text-[10px] font-semibold text-emerald-400">↑ 28%</span>
      </div>
      <Sparkline points="0,18 12,20 24,12 36,14 48,6 60,9 72,2" color="#a78bfa" />
    </div>
  )
}

function NextLessonChip() {
  return (
    <div className="absolute bottom-4 left-4 rounded-xl bg-white p-3 shadow-[0_10px_25px_rgba(19,41,82,0.25)]">
      <p className="text-[10px] text-navy-700/50">Next lesson</p>
      <p className="text-sm font-bold text-navy-950">Today, 4:00 PM</p>
      <div className="mt-1.5 flex items-center -space-x-2">
        <AvatarIllustration color="#1ba3e0" className="h-5 w-5 rounded-full ring-2 ring-white" />
        <AvatarIllustration color="#f5a623" className="h-5 w-5 rounded-full ring-2 ring-white" />
        <AvatarIllustration color="#2dd4bf" className="h-5 w-5 rounded-full ring-2 ring-white" />
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-navy-900/10 text-[8px] font-bold text-navy-700 ring-2 ring-white">
          +12
        </span>
      </div>
    </div>
  )
}

interface Feature {
  icon: ReactNode
  label: string
}

interface Side {
  key: string
  eyebrow: string
  eyebrowIcon: ReactNode
  heading: string
  description: string
  image: string
  imageAlt: string
  color: string
  gradient: string
  badgeIcon: ReactNode
  topChip: ReactNode
  bottomChip: ReactNode
  features: Feature[]
  ctaLabel: string
  ctaTo: string
}

const SIDES: Side[] = [
  {
    key: 'learners',
    eyebrow: 'For Learners',
    eyebrowIcon: <UserIcon className="h-full w-full" />,
    heading: 'Learn at the speed of real life.',
    description:
      'Personalized lessons, flexible scheduling, and real conversations with native speakers — so progress fits around your life, not the other way around.',
    image: '/photos/learners.jpg',
    imageAlt: 'A learner studying a new language on a laptop',
    color: '#1ba3e0',
    gradient: 'linear-gradient(90deg, #1ba3e0, #3ec6ff)',
    badgeIcon: <BookIcon className="h-full w-full" />,
    topChip: <TestimonialChip />,
    bottomChip: <ProgressChip />,
    features: [
      { icon: <UserIcon className="h-full w-full" />, label: 'Personalized path' },
      { icon: <CalendarIcon className="h-full w-full" />, label: 'Flexible schedule' },
      { icon: <GlobeIcon className="h-full w-full" />, label: 'Native speakers' },
    ],
    ctaLabel: 'Explore for Learners',
    ctaTo: '/learners',
  },
  {
    key: 'educators',
    eyebrow: 'For Educators',
    eyebrowIcon: <GraduationCapIcon className="h-full w-full" />,
    heading: 'Teach the world, on your terms.',
    description:
      'Set your own hours, connect with motivated learners globally, and get paid reliably for doing what you already love.',
    image: '/photos/educators.jpg',
    imageAlt: 'A teacher preparing an online tutoring session on a laptop',
    color: '#7c3aed',
    gradient: 'linear-gradient(90deg, #7c3aed, #a78bfa)',
    badgeIcon: <GraduationCapIcon className="h-full w-full" />,
    topChip: <EarningsChip />,
    bottomChip: <NextLessonChip />,
    features: [
      { icon: <ClockIcon className="h-full w-full" />, label: 'Set your own hours' },
      { icon: <GlobeIcon className="h-full w-full" />, label: 'Global learners' },
      { icon: <ShieldIcon className="h-full w-full" />, label: 'Reliable payouts' },
    ],
    ctaLabel: 'Become a Tutor',
    ctaTo: '/educators',
  },
]

const TRUST_AVATAR_COLORS = ['#1ba3e0', '#f5a623', '#2dd4bf', '#7c3aed']

export default function SplitSection() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20 px-6">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className="relative z-10 mx-auto max-w-2xl text-center"
      >
        <span className="inline-flex items-center gap-1.5 rounded-full border border-navy-900/10 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue shadow-[0_4px_16px_rgba(19,41,82,0.06)]">
          <SparkleIcon className="h-3.5 w-3.5" />
          Two Sides, One Platform
        </span>
        <h2 className="mt-4 font-display text-3xl sm:text-5xl font-bold tracking-tight text-navy-950">
          Whichever side you&rsquo;re on,
          <br />
          we&rsquo;ve built for you.
        </h2>
        <p className="mt-4 text-navy-700/75">
          Learning a language and teaching one are very different journeys — LinkGlobal Network is
          designed around both.
        </p>
      </motion.div>

      <div className="relative z-10 mx-auto mt-14 grid max-w-6xl gap-8 md:grid-cols-2 md:gap-8">
        {SIDES.map((side, i) => (
          <motion.div
            key={side.key}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden rounded-3xl bg-white shadow-[0_25px_70px_rgba(19,41,82,0.16)]"
          >
            <div className="relative">
              <img src={side.image} alt={side.imageAlt} className="aspect-[4/3] w-full object-cover" />
              {side.topChip}
              {side.bottomChip}
              <div
                className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-[0_8px_20px_rgba(19,41,82,0.2)]"
                style={{ color: side.color }}
              >
                <span className="h-6 w-6">{side.badgeIcon}</span>
              </div>
            </div>

            <div className="h-1.5 w-full" style={{ background: side.gradient }} />

            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-2">
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-full"
                  style={{ background: `${side.color}1a`, color: side.color }}
                >
                  <span className="h-3.5 w-3.5">{side.eyebrowIcon}</span>
                </span>
                <span
                  className="text-xs font-bold uppercase tracking-[0.2em]"
                  style={{ color: side.color }}
                >
                  {side.eyebrow}
                </span>
              </div>

              <h3 className="mt-4 text-2xl sm:text-3xl font-bold text-navy-950">{side.heading}</h3>
              <p className="mt-3 text-navy-700/75 leading-relaxed">{side.description}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {side.features.map((f) => (
                  <div
                    key={f.label}
                    className="flex items-center gap-1.5 rounded-lg border border-navy-900/10 px-3 py-2 text-xs font-medium text-navy-800"
                  >
                    <span className="h-3.5 w-3.5" style={{ color: side.color }}>
                      {f.icon}
                    </span>
                    {f.label}
                  </div>
                ))}
              </div>

              <Link
                to={side.ctaTo}
                className="mt-7 block rounded-full py-3.5 text-center text-sm font-bold text-white shadow-[0_10px_28px_rgba(0,0,0,0.16)] transition-transform hover:scale-[1.02]"
                style={{ background: side.gradient }}
              >
                {side.ctaLabel} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative z-10 mx-auto mt-10 flex max-w-6xl items-center justify-center gap-3"
      >
        <div className="flex -space-x-2">
          {TRUST_AVATAR_COLORS.map((c) => (
            <AvatarIllustration key={c} color={c} className="h-8 w-8 rounded-full ring-2 ring-white" />
          ))}
        </div>
        <p className="text-sm text-navy-700/70">
          Trusted by <span className="font-bold text-navy-950">100,000+</span> learners and tutors
          worldwide
        </p>
      </motion.div>
    </section>
  )
}
