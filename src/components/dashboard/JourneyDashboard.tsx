import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { CheckIcon } from '../icons/LineIcons'
import AvatarIllustration from '../AvatarIllustration'

// "Your journey has a dashboard": three tabs (Roadmap / Live Sessions /
// Progress) that auto-advance while the section is on screen — a progress bar
// under the active tab shows the timer — and stop auto-advancing once the
// visitor picks one themselves. Each tab swaps the product view on the right.

const AUTO_MS = 6000

function SampleTag() {
  return (
    <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
      Sample
    </span>
  )
}

function RoadmapView() {
  const weeks = [
    { w: 'Week 1–2', t: 'Introduce yourself with confidence', done: true },
    { w: 'Week 3–4', t: 'Handle small talk without pausing', done: true },
    { w: 'Week 5–6', t: 'Explain your work clearly', done: false, now: true },
    { w: 'Week 7–8', t: 'Mock interview with follow-ups', done: false },
  ]
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-lg font-bold text-white">Your 8-week roadmap</p>
        <SampleTag />
      </div>
      <ol className="mt-5 space-y-3">
        {weeks.map((x) => (
          <li
            key={x.w}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 ${x.now ? 'bg-brand-blue/15 ring-1 ring-brand-cyan/50' : 'bg-white/5'}`}
          >
            <span
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                x.done ? 'bg-brand-blue text-white' : x.now ? 'border-2 border-brand-cyan' : 'border-2 border-white/20'
              }`}
            >
              {x.done && <CheckIcon className="h-3.5 w-3.5" />}
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/45">{x.w}</p>
              <p className="truncate text-sm text-white">{x.t}</p>
            </div>
            {x.now && <span className="ml-auto shrink-0 text-[11px] font-semibold text-brand-cyan">This week</span>}
          </li>
        ))}
      </ol>
    </div>
  )
}

function SessionView() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-2 text-lg font-bold text-white">
          <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" /> Live session
        </p>
        <SampleTag />
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        {[
          { name: 'Your tutor', color: '#3ec6ff' },
          { name: 'You', color: '#8fe0ff' },
        ].map((p) => (
          <div key={p.name} className="relative flex aspect-[4/3] items-center justify-center rounded-xl bg-white/5">
            <AvatarIllustration color={p.color} className="h-14 w-14 rounded-full" />
            <span className="absolute bottom-2 left-2 rounded-md bg-black/40 px-2 py-0.5 text-[11px] text-white">{p.name}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-xl bg-white/5 px-4 py-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-cyan">Today&rsquo;s focus</p>
        <p className="mt-1 text-sm text-white">Describing your experience — no notes</p>
      </div>
    </div>
  )
}

function ProgressView() {
  const skills = [
    { k: 'Fluency', from: 48, to: 74 },
    { k: 'Pronunciation', from: 55, to: 70 },
    { k: 'Vocabulary', from: 60, to: 81 },
    { k: 'Confidence', from: 35, to: 72 },
  ]
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-lg font-bold text-white">After 12 sessions</p>
        <SampleTag />
      </div>
      <div className="mt-5 space-y-4">
        {skills.map((s, i) => (
          <div key={s.k}>
            <div className="flex justify-between text-sm">
              <span className="text-white/80">{s.k}</span>
              <span className="font-semibold text-brand-cyan">+{s.to - s.from}%</span>
            </div>
            <div className="relative mt-1.5 h-2 overflow-hidden rounded-full bg-white/10">
              <div className="absolute inset-y-0 left-0 rounded-full bg-white/25" style={{ width: `${s.from}%` }} />
              <motion.div
                className="absolute inset-y-0 rounded-r-full bg-gradient-to-r from-brand-blue to-brand-cyan"
                style={{ left: `${s.from}%` }}
                initial={{ width: '0%' }}
                animate={{ width: `${s.to - s.from}%` }}
                transition={{ duration: 1.2, delay: 0.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-5 text-xs text-white/50">Grey: where you started. Blue: what 12 sessions added.</p>
    </div>
  )
}

const TABS: { title: string; copy: string; view: ReactNode }[] = [
  { title: 'Your Roadmap', copy: 'A plan built from your goals, updated after every conversation.', view: <RoadmapView /> },
  { title: 'Live Sessions', copy: 'Unscripted conversation with a native speaker who already knows you.', view: <SessionView /> },
  { title: 'Your Progress', copy: 'Every session updates the picture — hesitation shrinking, fluency rising.', view: <ProgressView /> },
]

export default function JourneyDashboard() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { amount: 0.4 })
  const [active, setActive] = useState(0)
  const [auto, setAuto] = useState(true)

  useEffect(() => {
    if (!auto || !inView) return
    const id = window.setTimeout(() => setActive((a) => (a + 1) % TABS.length), AUTO_MS)
    return () => window.clearTimeout(id)
  }, [active, auto, inView])

  return (
    <section ref={sectionRef} className="relative px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-blue">A look inside</p>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-navy-950 sm:text-6xl">Your journey has a dashboard.</h2>
        </div>

        <div className="mt-12 grid items-center gap-10 sm:mt-16 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
          <div role="tablist" aria-label="Dashboard views" className="relative border-l-2 border-navy-900/10">
            {TABS.map((t, i) => {
              const on = i === active
              return (
                <button
                  key={t.title}
                  role="tab"
                  aria-selected={on}
                  onClick={() => {
                    setActive(i)
                    setAuto(false)
                  }}
                  className={`relative -ml-0.5 block w-full rounded-r-2xl py-4 pl-6 pr-4 text-left transition-colors ${on ? 'bg-white shadow-[0_10px_30px_rgba(19,41,82,0.08)]' : 'hover:bg-white/60'}`}
                >
                  <span className={`absolute left-0 top-0 h-full w-0.5 ${on ? 'bg-brand-blue' : 'bg-transparent'}`} />
                  <span className={`text-xs font-semibold tracking-[0.2em] ${on ? 'text-brand-blue' : 'text-navy-700/40'}`}>0{i + 1}</span>
                  <span className={`mt-1 block text-xl font-bold sm:text-2xl ${on ? 'text-navy-950' : 'text-navy-700/50'}`}>{t.title}</span>
                  {on && <span className="mt-1.5 block text-sm leading-relaxed text-navy-700/75 sm:text-base">{t.copy}</span>}
                  {on && auto && inView && (
                    <span className="mt-3 block h-0.5 overflow-hidden rounded-full bg-navy-900/10">
                      <motion.span
                        key={active}
                        className="block h-full bg-brand-blue"
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: AUTO_MS / 1000, ease: 'linear' }}
                      />
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute -inset-6 rounded-[2.5rem] bg-brand-blue/15 blur-3xl" aria-hidden="true" />
            <div className="relative min-h-[360px] rounded-3xl bg-[#0c1a33] p-6 shadow-[0_30px_80px_rgba(8,27,51,0.35)] sm:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  role="tabpanel"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  {TABS[active].view}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
