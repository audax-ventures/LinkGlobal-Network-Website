import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import PageShell from '../components/PageShell'
import PageHeader from '../components/PageHeader'
import { CheckIcon, TargetIcon, ChatIcon } from '../components/icons/LineIcons'

interface Step {
  title: string
  line: string
}

interface Path {
  eyebrow: string
  title: string
  description: string
  steps: Step[]
  perk: string
  cta: string
  color: string
  tint: string
  icon: ReactNode
}

// No photos here on purpose: the client flagged the stock photos as fake-
// looking and the icon badges as cropped. Each card now shows the three
// concrete steps to get started instead.
const PATHS: Path[] = [
  {
    eyebrow: 'I want to learn',
    title: 'Start as a Learner',
    description: 'From sign-up to your first real conversation — here’s the whole path.',
    steps: [
      { title: 'Take the free placement check', line: 'Find your starting level.' },
      { title: 'Get matched with a tutor', line: 'A native speaker in your language.' },
      { title: 'Have your first conversation', line: 'This week, not someday.' },
    ],
    perk: 'No fixed contracts',
    cta: 'Start Learning',
    color: '#1ba3e0',
    tint: 'linear-gradient(135deg, rgba(27,163,224,0.14), rgba(62,198,255,0.05))',
    icon: <TargetIcon className="h-full w-full" />,
  },
  {
    eyebrow: 'I want to teach',
    title: 'Become a Tutor',
    description: 'Teach motivated learners from anywhere, on a schedule you set.',
    steps: [
      { title: 'Apply and get verified', line: 'Tell us about your teaching.' },
      { title: 'Set your hours and rates', line: 'Teach when it suits you.' },
      { title: 'Start teaching', line: 'Learners in 120+ countries.' },
    ],
    perk: 'Reliable, on-time payouts',
    cta: 'Apply to Teach',
    color: '#f5a623',
    tint: 'linear-gradient(135deg, rgba(245,166,35,0.16), rgba(245,166,35,0.04))',
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
        imageAspect="1000/540"
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
              className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-[0_20px_50px_rgba(19,41,82,0.15)]"
            >
              <div className="flex items-center gap-4 px-6 py-6 sm:px-8" style={{ background: p.tint }}>
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl shadow-lg"
                  style={{ background: p.color }}
                >
                  <span className="h-6 w-6 text-white">{p.icon}</span>
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: p.color }}>
                    {p.eyebrow}
                  </span>
                  <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-navy-950 sm:text-3xl">{p.title}</h2>
                </div>
              </div>

              <div className="flex flex-1 flex-col px-6 pb-8 pt-6 sm:px-8">
                <p className="text-navy-700/80 leading-relaxed">{p.description}</p>

                <ol className="relative mt-6 space-y-5">
                  <span
                    className="absolute bottom-4 left-[15px] top-4 w-0.5 rounded-full"
                    style={{ background: p.color, opacity: 0.25 }}
                    aria-hidden="true"
                  />
                  {p.steps.map((st, n) => (
                    <motion.li
                      key={st.title}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ duration: 0.5, delay: 0.2 + n * 0.12, ease: [0.16, 1, 0.3, 1] }}
                      className="relative flex items-start gap-4"
                    >
                      <span
                        className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-extrabold text-white"
                        style={{ background: p.color }}
                      >
                        {n + 1}
                      </span>
                      <span>
                        <span className="block font-semibold text-navy-950">{st.title}</span>
                        <span className="block text-sm text-navy-700/70">{st.line}</span>
                      </span>
                    </motion.li>
                  ))}
                </ol>

                <span className="mt-6 inline-flex items-center gap-2 self-start rounded-full px-3 py-1.5 text-xs font-semibold" style={{ background: p.tint, color: p.color }}>
                  <CheckIcon className="h-3.5 w-3.5" />
                  {p.perk}
                </span>

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

        <p className="mx-auto mt-10 max-w-md text-center text-sm text-navy-950/80">
          Have questions before you start?{' '}
          <a href="mailto:info@linkglobalnetwork.ca" className="font-bold text-navy-950 underline underline-offset-2 hover:text-white">
            Reach out
          </a>{' '}
          — we're happy to help you figure out the right fit.
        </p>
      </section>
    </PageShell>
  )
}
