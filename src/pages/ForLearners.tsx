import { motion } from 'framer-motion'
import PageShell from '../components/PageShell'
import PageHeader from '../components/PageHeader'
import FeatureCard from '../components/FeatureCard'
import CtaBand from '../components/CtaBand'
import { TargetIcon, HeartIcon, ClockIcon, ChatIcon, BookIcon, GlobeIcon } from '../components/icons/LineIcons'

const FEATURES = [
  {
    icon: <TargetIcon className="h-full w-full" />,
    title: 'A path built around you',
    description: 'A guided placement assessment figures out where you’re starting from, so lessons target exactly what you need next.',
  },
  {
    icon: <HeartIcon className="h-full w-full" />,
    title: 'Real, native-speaking tutors',
    description: 'Practice with people who actually speak the language, not a chatbot reciting the same three sentences.',
  },
  {
    icon: <ClockIcon className="h-full w-full" />,
    title: 'Fits your schedule',
    description: 'Book sessions around your life, not the other way around. No fixed class times, no missed makeup work.',
  },
  {
    icon: <ChatIcon className="h-full w-full" />,
    title: 'AI-supported practice reports',
    description: 'Every session comes with a breakdown of what you did well and what to focus on next time.',
  },
  {
    icon: <BookIcon className="h-full w-full" />,
    title: '40+ languages',
    description: 'From widely-spoken languages to less common ones, find a tutor for the language you actually need.',
  },
  {
    icon: <GlobeIcon className="h-full w-full" />,
    title: 'A global community',
    description: 'Learners and tutors in over 120 countries — meet people, not just material.',
  },
]

export default function ForLearners() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="For Learners"
        title={
          <>
            Learn at the speed of <span className="text-gradient-brand">real life.</span>
          </>
        }
        description="Personalized lessons, flexible scheduling, and real conversations with native speakers — so progress fits around your life, not the other way around."
      />

      <section className="relative px-6 pb-24 sm:pb-32">
        <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.title} icon={f.icon} title={f.title} description={f.description} delay={(i % 3) * 0.1} />
          ))}
        </div>
      </section>

      <section className="relative px-6 pb-24 sm:pb-32">
        <div className="mx-auto grid max-w-6xl items-center gap-16 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden rounded-3xl border border-navy-900/10 shadow-[0_30px_80px_rgba(19,41,82,0.12)] md:order-2"
          >
            <img src="/gallery/practice-report.png" alt="LinkGlobal Network AI practice session report" className="w-full object-cover" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-navy-700/60">
              See Your Progress
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-navy-950">
              Know exactly what to work on next.
            </h2>
            <p className="mt-5 text-navy-700/80 leading-relaxed">
              Every session ends with a clear, AI-supported report — what you handled well, what tripped
              you up, and what to focus on in your next lesson. No guessing, no vague progress bars.
            </p>
          </motion.div>
        </div>
      </section>

      <CtaBand
        title="Ready to start learning?"
        description="Get matched with a tutor and have your first real conversation this week."
        primary={{ label: 'Try It Now', to: '/try-now' }}
        secondary={{ label: 'View Pricing', to: '/pricing' }}
      />
    </PageShell>
  )
}
