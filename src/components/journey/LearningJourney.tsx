import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { CheckIcon } from '../icons/LineIcons'
import AvatarIllustration from '../AvatarIllustration'
import { Link } from 'react-router-dom'

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
    title: 'Your profile',
    line: 'Your goals, your level, your profession, your interests. We start with why you are learning, not with a score.',
    visual: (
      <div className="flex flex-wrap gap-2">
        <Chip>Goal · job interview</Chip>
        <Chip>Level · B1</Chip>
        <Chip>Work · nursing</Chip>
        <Chip>Into · football</Chip>
      </div>
    ),
  },
  {
    title: 'Your learning path',
    line: 'A structured route with a clear destination. You see the whole plan, not the next exercise.',
    visual: (
      <div>
        <div className="flex items-center justify-between text-xs font-semibold text-navy-700/60">
          <span>Today</span>
          <span>Week 8 · Job interview</span>
        </div>
        <div className="relative mt-3 h-2 rounded-full bg-navy-900/10">
          <div className="absolute inset-y-0 left-0 w-[35%] rounded-full bg-brand-blue" />
          {[0, 25, 50, 75, 100].map((x) => (
            <span
              key={x}
              className={`absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-white ${x <= 35 ? 'bg-brand-blue' : 'bg-navy-900/20'}`}
              style={{ left: `${x}%` }}
            />
          ))}
        </div>
      </div>
    ),
  },
  {
    title: 'Continuous adaptation',
    line: 'The AI tracks how you actually speak, and revises the path as you progress.',
    visual: (
      <div className="space-y-2 text-xs text-navy-700/70">
        {[
          ['Fluency', '62%'],
          ['Accuracy', '71%'],
          ['Confidence', '48%'],
        ].map(([k, w]) => (
          <div key={k}>
            <span>{k}</span>
            <div className="mt-1 h-1.5 rounded-full bg-navy-900/10">
              <div className="h-full rounded-full bg-brand-blue" style={{ width: w }} />
            </div>
          </div>
        ))}
        <p className="pt-1 font-semibold text-brand-blue">Path updated after session 7</p>
      </div>
    ),
  },
  {
    title: 'Lessons with certified educators',
    line: 'Live, structured teaching. Your educator is briefed from your path before every session.',
    visual: (
      <div className="flex items-center gap-3">
        <AvatarIllustration color="#1ba3e0" className="h-11 w-11 shrink-0 rounded-full" />
        <div className="flex-1 text-sm">
          <p className="font-semibold text-navy-950">Your educator is ready</p>
          <p className="text-xs text-navy-700/60">Briefed from your path</p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-600">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Live
        </span>
      </div>
    ),
  },
  {
    title: 'Conversation with native speakers',
    line: 'Real conversation, no lesson plan. Matched to your profession, interests, or destination.',
    visual: (
      <div>
        <div className="flex items-center gap-3">
          <AvatarIllustration color="#2dd4bf" className="h-11 w-11 shrink-0 rounded-full" />
          <div className="text-sm">
            <p className="font-semibold text-navy-950">Matched with a nurse in Toronto</p>
            <p className="text-xs text-navy-700/60">Same field, no lesson plan</p>
          </div>
        </div>
        <Link to="/for-you" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue hover:gap-2.5">
          See How Conversation Practice Works <span aria-hidden="true">→</span>
        </Link>
      </div>
    ),
  },
  {
    title: 'Visible progress',
    line: 'Measured by what you become able to do, not by lessons completed.',
    visual: (
      <div className="flex items-center gap-3 text-sm">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
          <CheckIcon className="h-4 w-4" />
        </span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-navy-700/50">Now able to</p>
          <p className="font-semibold text-navy-950">Answer interview questions without notes</p>
        </div>
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
    <section id="how-it-works" className="relative scroll-mt-10 px-6 pb-24 pt-20 sm:pt-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-blue">How LinkGlobal works</p>
        <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-navy-950 sm:text-6xl">
          One path, shaped by <span className="text-brand-blue">your goal.</span>
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
                <h3 className="mt-1 text-2xl font-extrabold tracking-tight text-navy-950 sm:text-3xl">{step.title}</h3>
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
