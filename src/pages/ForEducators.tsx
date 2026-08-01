import { motion } from 'framer-motion'
import PageShell from '../components/PageShell'
import PageHeader from '../components/PageHeader'
import FeatureCard from '../components/FeatureCard'
import CtaBand from '../components/CtaBand'
import { CalendarIcon, DollarIcon, GlobeIcon, UsersIcon, ShieldIcon, ChatIcon } from '../components/icons/LineIcons'

const FEATURES = [
  {
    icon: <CalendarIcon className="h-full w-full" />,
    title: 'Set your own hours',
    description: 'Teach as much or as little as you want, whenever it works for you. No fixed shifts, no quotas.',
  },
  {
    icon: <DollarIcon className="h-full w-full" />,
    title: 'Get paid reliably',
    description: 'Transparent, on-time payouts for every session — no chasing invoices or waiting on clients.',
  },
  {
    icon: <GlobeIcon className="h-full w-full" />,
    title: 'Learners in 120+ countries',
    description: 'Connect with motivated learners from around the world, not just whoever happens to be nearby.',
  },
  {
    icon: <UsersIcon className="h-full w-full" />,
    title: 'Learners who show up ready',
    description: 'Placement testing and clear learning paths mean your students arrive knowing what they need.',
  },
  {
    icon: <ShieldIcon className="h-full w-full" />,
    title: 'A platform that has your back',
    description: 'Built-in scheduling, session tools, and support so you can focus on teaching, not admin.',
  },
  {
    icon: <ChatIcon className="h-full w-full" />,
    title: 'Real teaching, not scripts',
    description: 'Bring your own style and lesson approach — we match you with learners who fit it.',
  },
]

const STEPS = [
  { title: 'Apply', description: 'Tell us about your teaching background and the language(s) you teach.' },
  { title: 'Get verified', description: 'A short review confirms you’re a great fit for our learners.' },
  { title: 'Set your schedule', description: 'Pick your hours and availability — entirely up to you.' },
  { title: 'Start teaching', description: 'Get matched with learners and start your first session.' },
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
      />

      <section className="relative px-6 pb-24 sm:pb-32">
        <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.title} icon={f.icon} title={f.title} description={f.description} delay={(i % 3) * 0.1} />
          ))}
        </div>
      </section>

      <section className="relative px-6 pb-24 sm:pb-32">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-navy-700/60">
            Getting Started
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-navy-950">Become a tutor in four steps.</h2>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl border border-navy-900/10 bg-navy-900/[0.03] p-6"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-blue text-sm font-bold text-white">
                {i + 1}
              </span>
              <h3 className="mt-4 text-lg font-bold text-navy-950">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-700/75">{s.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <CtaBand
        title="Ready to start teaching?"
        description="Join tutors in over 120 countries already teaching on LinkGlobal Network."
        primary={{ label: 'Become a Tutor', to: '/try-now' }}
        secondary={{ label: 'Contact Us', to: '/contact' }}
      />
    </PageShell>
  )
}
