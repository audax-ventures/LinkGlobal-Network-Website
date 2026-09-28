import { motion } from 'framer-motion'
import PageShell from '../components/PageShell'
import NavyBand from '../components/NavyBand'
import PageHeader from '../components/PageHeader'
import FeatureRows, { CardLabel } from '../components/FeatureRows'
import type { FeatureRow } from '../components/FeatureRows'
import CtaBand from '../components/CtaBand'
import { CheckIcon } from '../components/icons/LineIcons'

const ROWS: FeatureRow[] = [
  {
    eyebrow: 'Your time',
    title: 'Your hours. Your rates.',
    line: 'Teach as much or as little as you want, whenever it works for you. No fixed shifts, no quotas.',
    visual: (
      <div>
        <CardLabel>Your availability</CardLabel>
        <div className="mt-4 grid grid-cols-7 gap-1.5 text-center text-[10px] font-semibold text-navy-700/50">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
            <span key={i}>{d}</span>
          ))}
          {[1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0].map((on, i) => (
            <span key={i} className={`h-7 rounded-md ${on ? 'bg-brand-blue' : 'bg-navy-900/[0.05]'}`} />
          ))}
        </div>
        <p className="mt-4 text-xs text-navy-700/60">Change it any time — learners only see the slots you open.</p>
      </div>
    ),
  },
  {
    eyebrow: 'Your learners',
    title: 'Learners who arrive ready.',
    line: 'Placement and a clear learning path mean every student shows up knowing what they need from you.',
    visual: (
      <div>
        <CardLabel>Learner brief</CardLabel>
        <dl className="mt-4 space-y-3 text-sm">
          {[
            ['Level', 'B1 · Intermediate'],
            ['Goal', 'Job interview in English'],
            ['Today', 'Practise follow-up questions'],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 border-b border-navy-900/5 pb-2 last:border-0">
              <dt className="text-navy-700/60">{k}</dt>
              <dd className="text-right font-semibold text-navy-950">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    ),
  },
  {
    eyebrow: 'Your pay',
    title: 'Paid reliably, every session.',
    line: 'Transparent, on-time payouts for every session you teach — no chasing invoices or waiting on clients.',
    visual: (
      <div className="flex items-center gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
          <CheckIcon className="h-6 w-6" />
        </span>
        <div className="text-sm">
          <p className="font-semibold text-navy-950">Session completed</p>
          <p className="text-navy-700/60">Added to your next payout</p>
        </div>
      </div>
    ),
  },
]

const STEPS = [
  { title: 'Apply', description: 'Tell us about your teaching background and the language(s) you teach.', color: '#1ba3e0' },
  { title: 'Get verified', description: 'A short review confirms you’re a great fit for our learners.', color: '#f5a623' },
  { title: 'Set your schedule', description: 'Pick your hours and availability — entirely up to you.', color: '#2dd4bf' },
  { title: 'Start teaching', description: 'Get matched with learners and start your first session.', color: '#a78bfa' },
]

export default function ForEducators() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="For Educators"
        title={
          <>
            Teach the world, <span className="text-gradient-brand">on your terms.</span>
          </>
        }
        description="Set your own hours, connect with motivated learners globally, and get paid reliably for doing what you already love."
        image={{ src: '/photos/educators-hero.jpg', alt: 'A tutor reviewing his lesson plan before an online session' }}
      />

      <FeatureRows eyebrow="Why tutors teach here" heading="Teaching, without the admin." rows={ROWS} />

      <NavyBand className="py-8 sm:py-12">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-cyan">
            Getting Started
          </span>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Become a tutor in four steps.</h2>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10"
            >
              <span
                className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold text-white shadow-[0_6px_16px_rgba(0,0,0,0.18)]"
                style={{ background: s.color }}
              >
                {i + 1}
              </span>
              <h3 className="mt-4 text-lg font-bold text-white">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">{s.description}</p>
            </motion.div>
          ))}
        </div>
      </NavyBand>

      <section className="relative px-6 pb-16 sm:pb-20">
        {/* Screenshot now paired with copy explaining what it shows. */}
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-blue">Before every session</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
              Walk in prepared, not guessing.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-navy-700/75">
              Each session comes with the learner&rsquo;s details and AI-suggested discussion topics, so you can spend
              the time teaching instead of planning from scratch.
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden rounded-3xl shadow-[0_25px_60px_rgba(19,41,82,0.18)]"
          >
            <img
              src="/gallery/session-details.png"
              alt="LinkGlobal Network session details with AI-generated discussion topics"
              className="w-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      <CtaBand
        title="Ready to start teaching?"
        description="Join tutors in over 120 countries already teaching on LinkGlobal Network."
        primary={{ label: 'Start Your Journey', to: '/try-now' }}
        secondary={{ label: 'Contact Us', to: '/contact' }}
      />
    </PageShell>
  )
}
