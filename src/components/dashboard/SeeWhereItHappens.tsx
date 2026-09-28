import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { CheckIcon } from '../icons/LineIcons'

// Sample cards (copy v7): a learning path, an educator briefing and a
// progress overview. The progress line draws itself once visible.

function SampleTag() {
  return (
    <span className="rounded-full bg-brand-blue/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-blue">
      Sample
    </span>
  )
}

function Card({ title, delay, children }: { title: string; delay: number; children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className="h-full rounded-3xl bg-white p-6 shadow-[0_20px_50px_rgba(19,41,82,0.1)]"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-navy-700/60">{title}</p>
        <SampleTag />
      </div>
      <div className="mt-5">{children}</div>
    </motion.div>
  )
}

// Chart geometry (viewBox units; rendered at a fixed aspect so nothing distorts).
const W = 300
const H = 170
const LEVELS = [
  { label: 'C1', y: 24 },
  { label: 'B2', y: 80 },
  { label: 'B1', y: 136 },
]
const LINE = 'M34,136 C70,134 90,118 120,104 S180,70 210,56 S262,30 286,24'

function ProgressChart() {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Sample progress rising across sessions">
      {LEVELS.map((l) => (
        <g key={l.label}>
          <line x1="34" x2={W - 8} y1={l.y} y2={l.y} stroke="rgba(19,41,82,0.08)" strokeDasharray="3 4" />
          <text x="0" y={l.y + 5} className="fill-navy-700/60 text-[14px] font-bold">
            {l.label}
          </text>
        </g>
      ))}
      <defs>
        <linearGradient id="lg-progress-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1ba3e0" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#1ba3e0" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={`${LINE} L286,150 L34,150 Z`}
        fill="url(#lg-progress-fill)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 1.2 }}
      />
      <motion.path
        d={LINE}
        fill="none"
        stroke="#1ba3e0"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, delay: 0.3, ease: 'easeInOut' }}
      />
      <circle cx="34" cy="136" r="5" fill="#0a1128" />
      <motion.g initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.8, duration: 0.4 }}>
        <circle cx="286" cy="24" r="9" fill="#1ba3e0" opacity="0.2" />
        <circle cx="286" cy="24" r="5" fill="#fff" stroke="#1ba3e0" strokeWidth="3" />
      </motion.g>
      <text x="34" y={H - 2} className="fill-navy-700/60 text-[13px]">
        First session
      </text>
      <text x={W - 8} y={H - 2} textAnchor="end" className="fill-navy-700/60 text-[13px]">
        Now
      </text>
    </svg>
  )
}

export interface SampleData {
  /** Learning-path lines; the last one is the upcoming step. */
  path: string[]
  briefing: { mastered: string; avoiding: string; focus: string }
  sessions: number
  progressLine: string
}

export const HOME_SAMPLE: SampleData = {
  path: [
    'Week 2 · Describe your experience without notes',
    'Week 4 · Answer unexpected questions',
    'Week 6 · Mock interview with follow-up questions',
  ],
  briefing: {
    mastered: 'Introductions, describing experience',
    avoiding: 'Salary questions, being interrupted',
    focus: 'Mock interview, follow-up questions',
  },
  sessions: 12,
  progressLine: 'Hesitation is getting shorter. Self-corrections are increasing. Next milestone in sight.',
}

// Three SAMPLE cards: learning path, educator briefing, progress overview
// (copy v7). Illustrative, so each carries a SAMPLE tag.
export default function SampleCards({ data = HOME_SAMPLE }: { data?: SampleData }) {
  return (
    <section className="relative px-6 pb-16 sm:pb-24">
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
        <Card title="Sample · Learning path" delay={0}>
          <ul className="divide-y divide-navy-900/5 text-sm" aria-label="A learner's personalized path showing weekly speaking goals">
            {data.path.map((t, i) => {
              const done = i < data.path.length - 1
              return (
                <li key={t} className="flex items-start gap-3 py-3 first:pt-0">
                  <span
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                      done ? 'bg-brand-blue text-white' : 'border-2 border-brand-blue/40'
                    }`}
                  >
                    {done && <CheckIcon className="h-3 w-3" />}
                  </span>
                  <span className={done ? 'text-navy-950' : 'text-navy-700/60'}>{t}</span>
                </li>
              )
            })}
          </ul>
        </Card>

        <Card title="Sample · Educator briefing" delay={0.12}>
          <dl className="space-y-4 text-sm" aria-label="An educator briefing listing what the learner has mastered and still avoids">
            {[
              { k: 'Mastered', v: data.briefing.mastered, c: 'text-emerald-600' },
              { k: 'Still avoiding', v: data.briefing.avoiding, c: 'text-amber-600' },
              { k: 'Focus today', v: data.briefing.focus, c: 'text-brand-blue' },
            ].map((r) => (
              <div key={r.k}>
                <dt className={`text-[11px] font-bold uppercase tracking-[0.2em] ${r.c}`}>{r.k}</dt>
                <dd className="mt-1 text-navy-950">{r.v}</dd>
              </div>
            ))}
          </dl>
        </Card>

        <Card title={`Sample · Progress overview · ${data.sessions} sessions`} delay={0.24}>
          <ProgressChart />
          <p className="mt-4 text-sm text-navy-700/80">{data.progressLine}</p>
        </Card>
      </div>
    </section>
  )
}
