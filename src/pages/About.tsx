import { motion } from 'framer-motion'
import PageShell from '../components/PageShell'
import PageHeader from '../components/PageHeader'
import CtaBand from '../components/CtaBand'
import CountUpStat from '../components/hero/CountUpStat'
import { ChatIcon, GlobeIcon, HeartIcon, ClockIcon } from '../components/icons/LineIcons'

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
        image={{ src: '/photos/about-founders.jpg', alt: 'The LinkGlobal Network founders reviewing an early version of the platform' }}
      />

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
            className="relative mx-auto max-w-sm overflow-hidden rounded-3xl shadow-[0_30px_80px_rgba(19,41,82,0.18)]"
          >
            <img src="/photos/hero-learner.jpg" alt="A learner in a live session on LinkGlobal Network" className="h-full w-full object-cover" />
          </motion.div>
        </div>
      </section>

      <section className="relative px-6 pb-16 sm:pb-20">
        <div className="mx-auto max-w-4xl grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-14 rounded-3xl bg-white px-6 py-10 sm:px-10 shadow-[0_15px_40px_rgba(19,41,82,0.1)]">
          <CountUpStat value={50000} suffix="+" label="Learners" />
          <CountUpStat value={120} suffix="+" label="Countries" />
          <CountUpStat value={4.9} decimals={1} suffix="/5" label="Average Rating" />
          <CountUpStat value={10000} suffix="+" label="Tutoring Sessions" />
        </div>
      </section>

      <section className="relative px-6 pb-16 sm:pb-20">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-blue">
              See It In Action
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-navy-950">The platform behind the mission.</h2>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden rounded-3xl shadow-[0_20px_50px_rgba(19,41,82,0.15)]"
            >
              <img src="/gallery/dashboard.png" alt="LinkGlobal Network learner dashboard" className="w-full object-cover" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden rounded-3xl shadow-[0_20px_50px_rgba(19,41,82,0.15)]"
            >
              <img src="/gallery/practice-report.png" alt="LinkGlobal Network AI practice session report" className="w-full object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative px-6 pb-16 sm:pb-20">
        <div className="mx-auto max-w-2xl rounded-3xl bg-white px-6 py-8 sm:px-10 sm:py-10 text-center shadow-[0_20px_60px_rgba(5,15,35,0.3)]">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-blue">
            What We Believe
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-navy-950">The principles behind the platform.</h2>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2">
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
                  className="absolute -bottom-6 left-6 flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg"
                  style={{ background: v.color }}
                >
                  <span className="h-6 w-6 text-white">{v.icon}</span>
                </div>
              </div>
              <div className="px-6 pb-7 pt-10">
                <h3 className="text-xl font-bold text-navy-950">{v.title}</h3>
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
