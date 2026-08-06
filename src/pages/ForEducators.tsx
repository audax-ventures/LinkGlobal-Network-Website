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
    color: '#1ba3e0',
  },
  {
    icon: <DollarIcon className="h-full w-full" />,
    title: 'Get paid reliably',
    description: 'Transparent, on-time payouts for every session — no chasing invoices or waiting on clients.',
    color: '#f5a623',
  },
  {
    icon: <GlobeIcon className="h-full w-full" />,
    title: 'Learners in 120+ countries',
    description: 'Connect with motivated learners from around the world, not just whoever happens to be nearby.',
    color: '#2dd4bf',
  },
  {
    icon: <UsersIcon className="h-full w-full" />,
    title: 'Learners who show up ready',
    description: 'Placement testing and clear learning paths mean your students arrive knowing what they need.',
    color: '#a78bfa',
  },
  {
    icon: <ShieldIcon className="h-full w-full" />,
    title: 'A platform that has your back',
    description: 'Built-in scheduling, session tools, and support so you can focus on teaching, not admin.',
    color: '#f472b6',
  },
  {
    icon: <ChatIcon className="h-full w-full" />,
    title: 'Real teaching, not scripts',
    description: 'Bring your own style and lesson approach — we match you with learners who fit it.',
    color: '#4ade80',
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
        image={{ src: '/photos/educators.jpg', alt: 'A tutor preparing an online tutoring session on a laptop' }}
      />

      <section className="relative px-6 pb-16 sm:pb-20">
        <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <FeatureCard
              key={f.title}
              icon={f.icon}
              title={f.title}
              description={f.description}
              color={f.color}
              delay={(i % 3) * 0.1}
            />
          ))}
        </div>
      </section>

      <section className="relative px-6 pb-16 sm:pb-20">
        <div className="mx-auto max-w-2xl rounded-3xl bg-white px-6 py-8 sm:px-10 sm:py-10 text-center shadow-[0_15px_40px_rgba(19,41,82,0.1)]">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-blue">
            Getting Started
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-navy-950">Become a tutor in four steps.</h2>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl bg-white p-6 shadow-[0_15px_40px_rgba(19,41,82,0.1)]"
            >
              <span
                className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold text-white shadow-[0_6px_16px_rgba(0,0,0,0.18)]"
                style={{ background: s.color }}
              >
                {i + 1}
              </span>
              <h3 className="mt-4 text-lg font-bold text-navy-950">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-700/75">{s.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative px-6 pb-16 sm:pb-20">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden rounded-3xl shadow-[0_25px_60px_rgba(19,41,82,0.18)]"
          >
            <img src="/gallery/session-details.png" alt="LinkGlobal Network session management details" className="w-full object-cover" />
          </motion.div>
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
