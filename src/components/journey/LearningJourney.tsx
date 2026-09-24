import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { CheckIcon } from '../icons/LineIcons'
import AvatarIllustration from '../AvatarIllustration'

// Lingoda-style journey: one straight vertical line whose fill grows (and
// gets more saturated) as the visitor scrolls, numbered nodes, and minimal
// steps — short title, one line of copy, one small visual that says the same
// thing. Rows are plain document flow, so nothing here depends on guessed
// heights; the only measurement is the list's own box (for the fill) and each
// node's real offset (for activation).

interface Step {
  title: string
  line: string
  visual: ReactNode
}

function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-semibold text-brand-blue">{children}</span>
  )
}

const STEPS: Step[] = [
  {
    title: 'Discover',
    line: 'Your goals, your situation — not a placement test.',
    visual: (
      <ul className="space-y-2.5 text-sm text-navy-700">
        {['Your goals', 'Your situation', 'What you’re preparing for'].map((t) => (
          <li key={t} className="flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-blue" />
            {t}
          </li>
        ))}
      </ul>
    ),
  },
  {
    title: 'Understand',
    line: 'The AI learns how you actually speak.',
    visual: (
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-[3px] border-brand-blue text-lg font-extrabold text-navy-950">
          B1
        </div>
        <div className="flex-1 space-y-2 text-xs text-navy-700/70">
          {[
            ['Fluency', '62%'],
            ['Vocabulary', '71%'],
            ['Confidence', '48%'],
          ].map(([k, w]) => (
            <div key={k}>
              <div className="flex justify-between">
                <span>{k}</span>
              </div>
              <div className="mt-1 h-1.5 rounded-full bg-navy-900/10">
                <div className="h-full rounded-full bg-brand-blue" style={{ width: w }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: 'Plan',
    line: 'A roadmap built around where you’re headed.',
    visual: (
      <div className="flex flex-wrap gap-2">
        <Chip>Job interview</Chip>
        <Chip>8 weeks</Chip>
        <Chip>Speaking focus</Chip>
      </div>
    ),
  },
  {
    title: 'Converse',
    line: 'Live sessions with a native speaker who already knows you.',
    visual: (
      <div className="flex items-center gap-3">
        <AvatarIllustration color="#1ba3e0" className="h-11 w-11 shrink-0 rounded-full" />
        <div className="flex-1 text-sm">
          <p className="font-semibold text-navy-950">Your tutor is ready</p>
          <p className="text-xs text-navy-700/60">Briefed on your last session</p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-600">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Live
        </span>
      </div>
    ),
  },
  {
    title: 'Grow',
    line: 'Every conversation moves you forward.',
    visual: (
      <div className="flex items-center gap-3 text-sm font-bold">
        <span className="rounded-lg bg-navy-900/5 px-3 py-1.5 text-navy-700/60">B1</span>
        <span className="h-px flex-1 bg-gradient-to-r from-navy-900/15 to-brand-blue" />
        <span className="rounded-lg bg-brand-blue px-3 py-1.5 text-white">B2</span>
        <CheckIcon className="h-4 w-4 text-emerald-500" />
      </div>
    ),
  },
]

// Where on screen the "you are here" head of the line sits.
const HEAD_VIEWPORT_FRACTION = 0.55

export default function LearningJourney() {
  const listRef = useRef<HTMLOListElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)
  const characterRef = useRef<HTMLDivElement>(null)
  const nodeRefs = useRef<(HTMLSpanElement | null)[]>([])
  const [activeCount, setActiveCount] = useState(0)

  useEffect(() => {
    const list = listRef.current
    const fill = fillRef.current
    if (!list || !fill) return

    let frame = 0
    const update = () => {
      frame = 0
      const rect = list.getBoundingClientRect()
      const head = Math.min(Math.max(window.innerHeight * HEAD_VIEWPORT_FRACTION - rect.top, 0), rect.height)
      fill.style.height = `${head}px`
      // The fill's gradient is sized to the full line, so the colour under
      // the head gets deeper/more saturated the further down it travels.
      fill.style.backgroundSize = `100% ${rect.height}px`
      if (characterRef.current) characterRef.current.style.transform = `translate(-50%, ${head}px) translateY(-50%)`

      let count = 0
      nodeRefs.current.forEach((node) => {
        if (!node) return
        const r = node.getBoundingClientRect()
        if (r.top + r.height / 2 - rect.top <= head + 1) count++
      })
      setActiveCount((prev) => (prev === count ? prev : count))
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    const observer = new ResizeObserver(schedule)
    observer.observe(list)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      observer.disconnect()
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section className="relative px-6 pb-24 pt-20 sm:pt-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-blue">Your path, step by step</p>
        <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-navy-950 sm:text-6xl">
          Your learning journey <span className="text-brand-blue">starts here</span>
        </h2>
      </div>

      <ol ref={listRef} className="relative mx-auto mt-16 max-w-5xl sm:mt-24">
        {/* Track + scroll-driven fill. Mobile: line on the left; md+: centred. */}
        <div className="pointer-events-none absolute bottom-0 left-5 top-0 w-1 -translate-x-1/2 rounded-full bg-navy-900/10 md:left-1/2" aria-hidden="true">
          <div
            ref={fillRef}
            className="absolute inset-x-0 top-0 rounded-full"
            style={{
              height: 0,
              backgroundImage: 'linear-gradient(180deg, #cfdbe6 0%, #8fc3e0 30%, #1ba3e0 70%, #0a63c9 100%)',
              backgroundRepeat: 'no-repeat',
              boxShadow: '0 0 12px rgba(27,163,224,0.35)',
            }}
          />
        </div>

        {/* Character slot: rides the head of the line. Placeholder is the
            assistant mascot until the client's journey character arrives —
            swap the <img> only; positioning is handled by the effect. */}
        <div className="pointer-events-none absolute left-5 top-0 z-20 md:left-1/2" aria-hidden="true">
          <div ref={characterRef} style={{ transform: 'translate(-50%, 0) translateY(-50%)' }}>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-[0_8px_24px_rgba(19,41,82,0.25)] ring-4 ring-brand-blue/20 sm:h-14 sm:w-14">
              <img src="/mascot/assistant-mascot-static.svg" alt="" className="h-9 w-9 sm:h-11 sm:w-11" />
            </div>
          </div>
        </div>

        {STEPS.map((step, i) => {
          const active = i < activeCount
          const textLeft = i % 2 === 1
          return (
            <li key={step.title} className="relative grid grid-cols-[2.5rem_1fr] gap-x-6 py-10 sm:py-14 md:grid-cols-[1fr_4rem_1fr] md:gap-x-10">
              {/* Node */}
              <div className="relative col-start-1 row-span-2 flex justify-center md:col-start-2 md:row-span-1 md:row-start-1 md:items-center">
                <span
                  ref={(el) => {
                    nodeRefs.current[i] = el
                  }}
                  className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full text-sm font-extrabold transition-all duration-500 ${
                    active
                      ? 'bg-brand-blue text-white shadow-[0_0_0_6px_rgba(27,163,224,0.18)]'
                      : 'bg-white text-navy-700/40 shadow-[0_2px_8px_rgba(19,41,82,0.12)] ring-2 ring-navy-900/10'
                  }`}
                >
                  {i + 1}
                </span>
              </div>

              {/* Text */}
              <div
                className={`col-start-2 row-start-1 transition-[filter,opacity] duration-700 md:row-start-1 md:self-center ${
                  textLeft ? 'md:col-start-1 md:text-right' : 'md:col-start-3'
                } ${active ? 'opacity-100' : 'opacity-40 saturate-0'}`}
              >
                <p className="text-xs font-semibold tracking-[0.2em] text-brand-blue">0{i + 1}</p>
                <h3 className="mt-1 text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">{step.title}</h3>
                <p className="mt-2 text-base text-navy-700/75 sm:text-lg">{step.line}</p>
              </div>

              {/* Visual — plain wrapper owns placement, motion.div only animates. */}
              <div
                className={`col-start-2 row-start-2 mt-5 md:row-start-1 md:mt-0 md:self-center ${
                  textLeft ? 'md:col-start-3' : 'md:col-start-1 md:flex md:justify-end'
                }`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className={`w-full max-w-sm rounded-2xl bg-white p-5 shadow-[0_15px_40px_rgba(19,41,82,0.1)] transition-[filter] duration-700 ${
                    active ? '' : 'saturate-0'
                  }`}
                >
                  {step.visual}
                </motion.div>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
