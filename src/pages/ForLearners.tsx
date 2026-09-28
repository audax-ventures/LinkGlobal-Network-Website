import { motion } from 'framer-motion'
import PageShell from '../components/PageShell'
import NavyBand from '../components/NavyBand'
import PageHeader from '../components/PageHeader'
import FeatureRows, { CardLabel, Pill } from '../components/FeatureRows'
import type { FeatureRow } from '../components/FeatureRows'
import AvatarIllustration from '../components/AvatarIllustration'
import CtaBand from '../components/CtaBand'
import { CheckIcon } from '../components/icons/LineIcons'

const ROWS: FeatureRow[] = [
  {
    eyebrow: 'Your plan',
    title: 'A path built around you.',
    line: 'A short placement conversation finds your level, then every lesson targets exactly what you need next.',
    visual: (
      <div>
        <CardLabel>This week</CardLabel>
        <ul className="mt-4 space-y-3 text-sm">
          {[
            ['Introduce yourself with confidence', true],
            ['Handle small talk without pausing', true],
            ['Explain your work clearly', false],
          ].map(([t, done]) => (
            <li key={t as string} className="flex items-center gap-3">
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                  done ? 'bg-brand-blue text-white' : 'border-2 border-brand-blue/40'
                }`}
              >
                {done && <CheckIcon className="h-3 w-3" />}
              </span>
              <span className={done ? 'text-navy-950' : 'text-navy-700/60'}>{t}</span>
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    eyebrow: 'Your schedule',
    title: 'Native-speaking tutors, when it suits you.',
    line: 'Book live sessions around your life — mornings, lunch breaks or late evenings. No fixed class times.',
    visual: (
      <div>
        <CardLabel>Pick a time</CardLabel>
        <div className="mt-4 flex flex-wrap gap-2">
          <Pill>Mon · 7:00 am</Pill>
          <Pill on>Wed · 12:30 pm</Pill>
          <Pill>Thu · 8:00 pm</Pill>
          <Pill>Sat · 10:00 am</Pill>
        </div>
        <div className="mt-5 flex items-center gap-3 border-t border-navy-900/5 pt-4">
          <AvatarIllustration color="#1ba3e0" className="h-10 w-10 shrink-0 rounded-full" />
          <div className="text-sm">
            <p className="font-semibold text-navy-950">Native speaker</p>
            <p className="text-xs text-navy-700/60">Matched to your goals</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    eyebrow: 'Your language',
    title: '40+ languages, 120+ countries.',
    line: 'From widely spoken languages to less common ones — find a tutor for the language you actually need.',
    visual: (
      <div>
        <CardLabel>I want to speak</CardLabel>
        <div className="mt-4 flex flex-wrap gap-2">
          <Pill on>Spanish</Pill>
          <Pill>French</Pill>
          <Pill>Japanese</Pill>
          <Pill>Arabic</Pill>
          <Pill>Portuguese</Pill>
          <Pill>German</Pill>
          <Pill>+ 35 more</Pill>
        </div>
      </div>
    ),
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
        image={{ src: '/photos/learners-hero.jpg', alt: 'A learner reviewing her LinkGlobal Network dashboard in a modern office' }}
      />

      <FeatureRows eyebrow="Why learners choose us" heading="Built for how you actually learn." rows={ROWS} />

      <NavyBand className="py-8 sm:py-12">
        <div className="mx-auto grid max-w-6xl items-center gap-16 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.4)] ring-1 ring-white/10 md:order-2"
          >
            <img src="/gallery/practice-report.png" alt="LinkGlobal Network AI practice session report" className="w-full object-cover" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="px-1 sm:px-2"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-cyan">
              See Your Progress
            </span>
            <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Know exactly what to work on next.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/75">
              Every session ends with a clear, AI-supported report — what you handled well, what tripped
              you up, and what to focus on in your next lesson. No guessing, no vague progress bars.
            </p>
          </motion.div>
        </div>
      </NavyBand>

      <CtaBand
        title="Ready to start learning?"
        description="Get matched with a tutor and have your first real conversation this week."
        primary={{ label: 'Start Your Journey', to: '/try-now' }}
        secondary={{ label: 'View Pricing', to: '/pricing' }}
      />
    </PageShell>
  )
}
