import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageShell from '../components/PageShell'
import CtaBand from '../components/CtaBand'
import AvatarIllustration from '../components/AvatarIllustration'
import { ensureGsapPlugins, gsap, ScrollTrigger } from '../lib/gsapSetup'
import { ChatIcon, GlobeIcon, HeartIcon, ClockIcon, UsersIcon, StarIcon } from '../components/icons/LineIcons'

const heroContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
}

const heroItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
}

const HERO_AVATAR_COLORS = ['#1ba3e0', '#f5a623', '#2dd4bf', '#a78bfa']

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor">
      <path d="M6 4.5v15l13-7.5-13-7.5Z" />
    </svg>
  )
}

// Decorative dot grid used behind the hero photo — echoes the site's other
// hand-drawn SVG accents (HeroBackground, StylizedGlobe) rather than an image asset.
function DotGrid({ className }: { className?: string }) {
  const dots = []
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      dots.push(<circle key={`${row}-${col}`} cx={col * 14 + 4} cy={row * 14 + 4} r="2" fill="currentColor" />)
    }
  }
  return (
    <svg viewBox="0 0 64 64" className={className} width="88" height="88">
      {dots}
    </svg>
  )
}

function Squiggle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 60" className={className} width="120" height="72" fill="none" aria-hidden="true">
      <path
        d="M2 40c10-24 24-24 34 0s24 24 34 0"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.35"
      />
    </svg>
  )
}

const VALUES = [
  {
    icon: <ChatIcon className="h-full w-full" />,
    title: 'Real conversations, not drills',
    description:
      'Fluency comes from talking to people, not tapping through flashcards. Every lesson is built around live, human conversation.',
    image: '/photos/journey-4.jpg',
    imageAlt: 'A learner waving during a live video call with a tutor',
    color: '#1ba3e0',
  },
  {
    icon: <HeartIcon className="h-full w-full" />,
    title: 'Tutors, not algorithms',
    description:
      'A language is a living thing. Our tutors adapt to how you actually learn — something no app has managed to fake yet.',
    image: '/photos/educators.jpg',
    imageAlt: 'A tutor preparing an online session on LinkGlobal Network',
    color: '#f5a623',
  },
  {
    icon: <GlobeIcon className="h-full w-full" />,
    title: 'A genuinely global community',
    description:
      'Learners and tutors in over 120 countries, meeting across time zones and cultures — the whole point of learning a language in the first place.',
    image: '/photos/journey-2.jpg',
    imageAlt: 'A group of learners studying together around a laptop',
    color: '#2dd4bf',
  },
  {
    icon: <ClockIcon className="h-full w-full" />,
    title: 'Learning that fits your life',
    description:
      'No rigid class times, no wasted modules. Sessions and pacing built around the time you actually have.',
    image: '/photos/journey-3.jpg',
    imageAlt: 'A learner relaxing at home while studying on a laptop',
    color: '#a78bfa',
  },
]

const STATS: {
  icon: typeof UsersIcon
  value: number
  suffix: string
  decimals?: number
  label: string
  color: string
}[] = [
  { icon: UsersIcon, value: 50000, suffix: '+', label: 'Learners', color: '#1ba3e0' },
  { icon: GlobeIcon, value: 120, suffix: '+', label: 'Countries', color: '#f5a623' },
  { icon: StarIcon, value: 4.9, decimals: 1, suffix: '/5', label: 'Average Rating', color: '#2dd4bf' },
  { icon: ChatIcon, value: 10000, suffix: '+', label: 'Tutoring Sessions', color: '#a78bfa' },
]

// Icon-left layout doesn't fit the shared CountUpStat's centered-card markup,
// so this stays a local variant of the same GSAP count-up-on-scroll pattern.
function StatRow({
  icon: Icon,
  value,
  suffix = '',
  decimals = 0,
  label,
  color,
}: {
  icon: typeof UsersIcon
  value: number
  suffix?: string
  decimals?: number
  label: string
  color: string
}) {
  const numberRef = useRef<HTMLSpanElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ensureGsapPlugins()
    const el = numberRef.current
    const wrap = wrapRef.current
    if (!el || !wrap) return

    const counter = { val: 0 }
    const trigger = ScrollTrigger.create({
      trigger: wrap,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(counter, {
          val: value,
          duration: 1.6,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = counter.val.toFixed(decimals)
          },
        })
        gsap.fromTo(wrap, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
      },
    })

    return () => trigger.kill()
  }, [value, decimals])

  return (
    <div ref={wrapRef} className="flex items-center gap-3 opacity-0">
      <span
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
        style={{ background: `${color}1a`, color }}
      >
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-xl sm:text-2xl font-extrabold leading-none text-navy-950">
          <span ref={numberRef}>0</span>
          {suffix}
        </p>
        <p className="mt-1 text-xs text-navy-700/60">{label}</p>
      </div>
    </div>
  )
}

export default function About() {
  return (
    <PageShell>
      <section className="relative px-6 pt-32 pb-20 sm:pt-40 sm:pb-24 overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-16 md:grid-cols-2 md:gap-12">
          <motion.div
            variants={heroContainer}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center text-center md:items-start md:text-left"
          >
            <motion.span
              variants={heroItem}
              className="mb-5 inline-block rounded-full bg-brand-blue/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-brand-blue"
            >
              About LinkGlobal Network
            </motion.span>

            <motion.h1
              variants={heroItem}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.05] tracking-tight text-navy-950"
            >
              Built to make the world <span className="text-gradient-brand">feel a little smaller.</span>
            </motion.h1>

            <motion.p variants={heroItem} className="mt-6 max-w-lg text-base sm:text-lg text-navy-700/80">
              LinkGlobal Network exists because language apps got really good at vocabulary drills — and
              never got good at conversation. We built the thing that was missing: real tutors, real
              people, real practice.
            </motion.p>

            <motion.div variants={heroItem} className="mt-9 flex flex-col sm:flex-row items-center gap-4">
              <Link
                to="/for-you"
                className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white shadow-[0_8px_30px_rgba(30,120,190,0.3)] transition-transform hover:scale-105"
                style={{ background: 'linear-gradient(90deg, #1ba3e0, #3ec6ff)' }}
              >
                Explore the platform
                <span aria-hidden="true">→</span>
              </Link>
              <button
                type="button"
                className="inline-flex items-center gap-2.5 rounded-full border border-navy-900/15 bg-white px-8 py-3.5 text-sm font-semibold text-navy-800 shadow-[0_4px_16px_rgba(19,41,82,0.06)] transition-colors hover:bg-navy-900/[0.03]"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-navy-900/[0.06]">
                  <PlayIcon />
                </span>
                Watch how it works
              </button>
            </motion.div>

            <motion.div variants={heroItem} className="mt-9 flex items-center gap-3">
              <div className="flex -space-x-3">
                {HERO_AVATAR_COLORS.map((color) => (
                  <AvatarIllustration key={color} color={color} className="h-9 w-9 rounded-full ring-2 ring-white" />
                ))}
              </div>
              <p className="text-sm text-navy-700/70">Trusted by learners worldwide</p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto w-full max-w-md md:max-w-none"
          >
            <div
              className="absolute -top-8 -right-5 -z-10 h-28 w-28 rotate-12 rounded-[2rem]"
              style={{ background: 'linear-gradient(135deg, #1ba3e0, #3ec6ff)' }}
              aria-hidden="true"
            />
            <DotGrid className="absolute -bottom-8 -left-8 -z-10 text-brand-blue/25" />

            <div className="relative overflow-hidden rounded-3xl shadow-[0_30px_80px_rgba(19,41,82,0.2)]">
              <img
                src="/photos/about-founders.jpg"
                alt="The LinkGlobal Network founders reviewing an early version of the platform"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>

            <div className="absolute -top-5 left-4 flex max-w-[190px] items-center gap-2 rounded-xl bg-white px-4 py-3 shadow-[0_10px_25px_rgba(19,41,82,0.22)] sm:-left-6">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center text-rose-400">
                <HeartIcon className="h-4 w-4" />
              </span>
              <span className="text-xs font-semibold leading-snug text-navy-800">
                Learning together, growing together.
              </span>
            </div>

            <div className="absolute -bottom-6 right-4 rounded-xl bg-white px-4 py-3 shadow-[0_10px_25px_rgba(19,41,82,0.22)] sm:-right-6">
              <p className="text-xs font-semibold leading-snug text-navy-800">
                Real people.
                <br />
                Real conversations.
              </p>
              <div className="mt-2 flex -space-x-2">
                {HERO_AVATAR_COLORS.slice(0, 3).map((c) => (
                  <AvatarIllustration key={c} color={c} className="h-6 w-6 rounded-full ring-2 ring-white" />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative px-6 pb-16 sm:pb-20">
        <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-2 md:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-3xl bg-white px-6 py-8 sm:px-9 sm:py-9 shadow-[0_15px_40px_rgba(19,41,82,0.1)]"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-blue">
              Why We Started
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-navy-950">
              Every learner deserves a tutor, not just an app.
            </h2>
            <p className="mt-5 text-navy-700/80 leading-relaxed">
              We started LinkGlobal Network because too many people gave up on language learning after
              months of streaks and gamified lessons that never turned into a real conversation.
            </p>
            <p className="mt-4 text-navy-700/80 leading-relaxed">
              So we built a platform around the one thing that actually works: pairing learners with
              real, native-speaking tutors, wherever in the world they happen to be.
            </p>
            <p className="mt-4 text-navy-700/80 leading-relaxed">
              Today that means tens of thousands of learners and tutors meeting across more than 120
              countries — not to complete a level, but to actually talk to each other.
            </p>
            <Link
              to="/for-you"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue transition-all hover:gap-2.5"
            >
              Learn more about us <span aria-hidden="true">→</span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto max-w-sm"
          >
            <Squiggle className="absolute -top-8 -right-6 -z-10 text-brand-blue" />

            <div className="relative overflow-hidden rounded-3xl shadow-[0_30px_80px_rgba(19,41,82,0.18)]">
              <img
                src="/photos/hero-learner.jpg"
                alt="A learner in a live session on LinkGlobal Network"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="absolute -bottom-6 -right-4 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_10px_25px_rgba(19,41,82,0.22)] sm:-right-6">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
                <GlobeIcon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-lg font-extrabold leading-none text-navy-950">120+</p>
                <p className="mt-1 text-[11px] text-navy-700/60">Countries represented</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative px-6 pb-16 sm:pb-20">
        <div className="mx-auto max-w-4xl grid grid-cols-2 gap-y-8 gap-x-6 sm:grid-cols-4 sm:gap-8 rounded-3xl bg-white px-6 py-8 sm:px-10 shadow-[0_15px_40px_rgba(19,41,82,0.1)]">
          {STATS.map((s) => (
            <StatRow
              key={s.label}
              icon={s.icon}
              value={s.value}
              suffix={s.suffix}
              decimals={s.decimals}
              label={s.label}
              color={s.color}
            />
          ))}
        </div>
      </section>

      <section className="relative px-6 pb-16 sm:pb-20">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-center md:text-left"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-blue">
              See It In Action
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-navy-950">
              The platform behind the mission.
            </h2>
            <p className="mt-4 max-w-md text-navy-700/80 leading-relaxed mx-auto md:mx-0">
              Powerful tools for learners and tutors to connect, grow, and succeed — together.
            </p>
            <Link
              to="/for-you"
              className="mt-7 inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white shadow-[0_8px_30px_rgba(30,120,190,0.3)] transition-transform hover:scale-105"
              style={{ background: 'linear-gradient(90deg, #1ba3e0, #3ec6ff)' }}
            >
              Explore the platform
              <span aria-hidden="true">→</span>
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-3"
            >
              <div className="overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(19,41,82,0.15)]">
                <img
                  src="/gallery/dashboard.png"
                  alt="LinkGlobal Network learner dashboard"
                  style={{ aspectRatio: '1000/540' }}
                  className="w-full object-cover"
                />
              </div>
              <p className="text-center text-xs font-semibold uppercase tracking-wide text-navy-700/50">
                Learner Dashboard
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-3 sm:mt-10"
            >
              <div className="overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(19,41,82,0.15)]">
                <img
                  src="/gallery/session-details.png"
                  alt="LinkGlobal Network tutor session workspace"
                  style={{ aspectRatio: '1000/540' }}
                  className="w-full object-cover"
                />
              </div>
              <p className="text-center text-xs font-semibold uppercase tracking-wide text-navy-700/50">
                Tutor Workspace
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative px-6 pb-16 sm:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-blue">
            What We Believe
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-navy-950">
            The principles behind the platform.
          </h2>
        </motion.div>

        <div className="mx-auto mt-12 grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group overflow-hidden rounded-3xl bg-white shadow-[0_20px_50px_rgba(5,15,35,0.3)]"
            >
              <div className="relative aspect-[3/2] overflow-hidden">
                <img
                  src={v.image}
                  alt={v.imageAlt}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute -bottom-5 left-5 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-[0_8px_20px_rgba(19,41,82,0.2)]"
                  style={{ color: v.color }}
                >
                  <span className="h-5 w-5">{v.icon}</span>
                </div>
              </div>
              <div className="px-5 pb-6 pt-9">
                <h3 className="text-base font-bold text-navy-950">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-700/75">{v.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <CtaBand
        title="Ready to see it for yourself?"
        description="Start learning with a real tutor today, or explore how LinkGlobal Network fits into your classroom or organization."
        primary={{ label: 'Try It Now', to: '/try-now' }}
        secondary={{ label: 'Explore Pricing', to: '/pricing' }}
      />
    </PageShell>
  )
}
