import { motion } from 'framer-motion'
import PageShell from '../components/PageShell'
import PageHeader from '../components/PageHeader'
import FeatureCard from '../components/FeatureCard'
import CtaBand from '../components/CtaBand'
import CountUpStat from '../components/hero/CountUpStat'
import { ChatIcon, GlobeIcon, HeartIcon, ClockIcon } from '../components/icons/LineIcons'

const VALUES = [
  {
    icon: <ChatIcon className="h-full w-full" />,
    title: 'Real conversations, not drills',
    description:
      'Fluency comes from talking to people, not tapping through flashcards. Every lesson is built around live, human conversation.',
  },
  {
    icon: <HeartIcon className="h-full w-full" />,
    title: 'Tutors, not algorithms',
    description:
      'A language is a living thing. Our tutors adapt to how you actually learn — something no app has managed to fake yet.',
  },
  {
    icon: <GlobeIcon className="h-full w-full" />,
    title: 'A genuinely global community',
    description:
      'Learners and tutors in over 120 countries, meeting across time zones and cultures — the whole point of learning a language in the first place.',
  },
  {
    icon: <ClockIcon className="h-full w-full" />,
    title: 'Learning that fits your life',
    description:
      'No rigid class times, no wasted modules. Sessions and pacing built around the time you actually have.',
  },
]

export default function About() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="About LinkGlobal Network"
        title={
          <>
            Built to make the world <span className="text-gradient-brand">feel a little smaller.</span>
          </>
        }
        description="LinkGlobal Network exists because language apps got really good at vocabulary drills and never got good at conversation — so we built the thing that was missing: real tutors, real people, real practice."
      />

      <section className="relative px-6 pb-24 sm:pb-32">
        <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-2 md:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-3xl border border-navy-900/10 bg-white/70 px-6 py-8 sm:px-9 sm:py-9 backdrop-blur-sm shadow-[0_8px_28px_rgba(19,41,82,0.08)]"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-navy-700/60">
              Why We Started
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-navy-950">
              Every learner deserves a tutor, not just an app.
            </h2>
            <p className="mt-5 text-navy-700/80 leading-relaxed">
              We started LinkGlobal Network because too many people gave up on language learning after
              months of streaks and gamified lessons that never turned into a real conversation. So we
              built a platform around the one thing that actually works: pairing learners with real,
              native-speaking tutors, wherever in the world they happen to be.
            </p>
            <p className="mt-4 text-navy-700/80 leading-relaxed">
              Today that means tens of thousands of learners and tutors meeting across more than 120
              countries — not to complete a level, but to actually talk to each other.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto max-w-sm overflow-hidden rounded-3xl border border-navy-900/10 shadow-[0_30px_80px_rgba(19,41,82,0.15)]"
          >
            <img src="/photos/hero-learner.jpg" alt="A learner in a live session on LinkGlobal Network" className="h-full w-full object-cover" />
          </motion.div>
        </div>
      </section>

      <section className="relative px-6 pb-24 sm:pb-32">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-14">
          <CountUpStat value={50000} suffix="+" label="Learners" />
          <CountUpStat value={120} suffix="+" label="Countries" />
          <CountUpStat value={4.9} decimals={1} suffix="/5" label="Average Rating" />
          <CountUpStat value={10000} suffix="+" label="Tutoring Sessions" />
        </div>
      </section>

      <section className="relative px-6 pb-24 sm:pb-32">
        <div className="mx-auto max-w-2xl rounded-3xl border border-navy-900/10 bg-navy-900/[0.03] px-6 py-8 sm:px-10 sm:py-10 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-navy-700/60">
            What We Believe
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-navy-950">The principles behind the platform.</h2>
        </div>
        <div className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2">
          {VALUES.map((v, i) => (
            <FeatureCard key={v.title} icon={v.icon} title={v.title} description={v.description} delay={i * 0.1} />
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
