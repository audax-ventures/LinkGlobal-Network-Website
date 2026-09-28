import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import PageShell from '../components/PageShell'
import NavyBand from '../components/NavyBand'
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
    title: 'Start as a learner',
    description: 'Tell us your goal. Your plan follows from your answers.',
    steps: [
      { title: 'Take the free assessment', line: 'Your goals, your level, your interests.' },
      { title: 'See your learning path', line: 'The whole route, before you book anything.' },
      { title: 'Book your first lesson', line: 'With a certified educator, briefed from your path.' },
    ],
    perk: 'No subscription',
    cta: 'Start Your Journey',
    color: '#1ba3e0',
    tint: 'linear-gradient(135deg, rgba(27,163,224,0.14), rgba(62,198,255,0.05))',
    icon: <TargetIcon className="h-full w-full" />,
  },
  {
    eyebrow: 'I want to teach',
    title: 'Teach with LinkGlobal',
    description: 'Your fluency is already an asset.',
    steps: [
      { title: 'Apply', line: 'Applications are open.' },
      { title: 'Get selected', line: 'For teaching ability, not only fluency.' },
      { title: 'Start teaching', line: 'With a briefing before every lesson.' },
    ],
    perk: 'You set your own availability',
    cta: 'Start Teaching With Us',
    color: '#f5a623',
    tint: 'linear-gradient(135deg, rgba(245,166,35,0.16), rgba(245,166,35,0.04))',
    icon: <ChatIcon className="h-full w-full" />,
  },
]

export default function TryNow() {
  return (
    <PageShell footerFade={false}>
      <PageHeader
        eyebrow="Start Your Journey"
        title={
          <>
            Your path begins with a conversation <span className="text-gradient-brand">about you.</span>
          </>
        }
        description="Tell us your goal. Your plan follows from your answers."
        image={{ src: '/gallery/onboarding.png', alt: 'The LinkGlobal onboarding flow' }}
        imageAspect="1000/540"
      />

      <NavyBand className="pb-24 pt-8 sm:pt-12" fadeOut={false}>
        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
          {PATHS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-[0_30px_80px_rgba(0,0,0,0.4)]"
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

        <p className="mx-auto mt-10 max-w-md text-center text-sm text-white/70">
          Not sure where to start?{' '}
          <a href="/contact" className="font-bold text-brand-cyan underline underline-offset-2 hover:text-white">
            Tell us what brought you here.
          </a>
        </p>
      </NavyBand>
      <div className="pointer-events-none h-16" style={{ background: 'linear-gradient(180deg, #081b33, #050f1f)' }} aria-hidden="true" />
    </PageShell>
  )
}
