import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import PageShell from '../components/PageShell'
import PageHeader from '../components/PageHeader'
import { CheckIcon, TargetIcon, ChatIcon } from '../components/icons/LineIcons'

interface Path {
  eyebrow: string
  title: string
  description: string
  points: string[]
  cta: string
  image: string
  imageAlt: string
  color: string
  icon: ReactNode
}

const PATHS: Path[] = [
  {
    eyebrow: 'I want to learn',
    title: 'Start as a Learner',
    description: 'Take a quick placement check, get matched with a tutor, and have your first real conversation this week.',
    points: ['Free placement assessment', 'Matched with a tutor in your language', 'No fixed contracts'],
    cta: 'Start Learning',
    image: '/photos/learners.jpg',
    imageAlt: 'A learner studying a new language on a laptop',
    color: '#1ba3e0',
    icon: <TargetIcon className="h-full w-full" />,
  },
  {
    eyebrow: 'I want to teach',
    title: 'Become a Tutor',
    description: 'Apply, get verified, set your own schedule, and start teaching motivated learners from anywhere.',
    points: ['Set your own hours and rates', 'Reliable, on-time payouts', 'Learners in 120+ countries'],
    cta: 'Apply to Teach',
    image: '/photos/educators.jpg',
    imageAlt: 'A tutor preparing an online tutoring session on a laptop',
    color: '#f5a623',
    icon: <ChatIcon className="h-full w-full" />,
  },
]

export default function TryNow() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Try Now"
        title={
          <>
            Your first real conversation <span className="text-gradient-brand">starts here.</span>
          </>
        }
        description="Whether you're here to learn or here to teach, getting started takes just a few minutes."
        image={{ src: '/gallery/onboarding.png', alt: 'LinkGlobal Network onboarding flow' }}
      />

      <section className="relative px-6 pb-16 sm:pb-20">
        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
          {PATHS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-[0_20px_50px_rgba(19,41,82,0.15)]"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.imageAlt}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute -bottom-6 left-6 flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg"
                  style={{ background: p.color }}
                >
                  <span className="h-6 w-6 text-white">{p.icon}</span>
                </div>
              </div>

              <div className="flex flex-1 flex-col px-6 pb-8 pt-10 sm:px-8">
                <span className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: p.color }}>
                  {p.eyebrow}
                </span>
                <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-navy-950">{p.title}</h2>
                <p className="mt-4 text-navy-700/80 leading-relaxed">{p.description}</p>

                <ul className="mt-6 space-y-3">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-3 text-sm text-navy-700/80">
                      <span
                        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white"
                        style={{ background: p.color }}
                      >
                        <CheckIcon className="h-3 w-3" />
                      </span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex-1" />
                <button
                  type="button"
                  className="mt-8 rounded-full px-8 py-3.5 text-sm font-semibold text-white shadow-[0_8px_30px_rgba(0,0,0,0.2)] transition-transform hover:scale-105"
                  style={{ background: p.color }}
                >
                  {p.cta}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-md text-center text-sm text-navy-700/60">
          Have questions before you start?{' '}
          <a href="mailto:info@linkglobalnetwork.ca" className="font-semibold text-brand-blue hover:underline">
            Reach out
          </a>{' '}
          — we're happy to help you figure out the right fit.
        </p>
      </section>
    </PageShell>
  )
}
