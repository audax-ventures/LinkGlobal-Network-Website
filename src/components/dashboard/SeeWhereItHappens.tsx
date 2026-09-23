import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { CheckIcon } from '../icons/LineIcons'

// One sample learner's story in three cards — the plan, the teacher's
// briefing, and the result (B1 today → C1 two months out). Illustrative, so
// every card carries a SAMPLE tag. Cards rise in on scroll; the progress line
// draws itself once visible.

function SampleTag() {
  return (
    <span className="rounded-full bg-brand-blue/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-blue">
      Sample
    </span>
  )
}

function Card({ title, caption, sub, delay, children }: { title: string; caption: string; sub: string; delay: number; children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col"
    >
      <div className="flex-1 rounded-3xl bg-white p-6 shadow-[0_20px_50px_rgba(19,41,82,0.1)]">
        <div className="flex items-center justify-between gap-3">
          <p className="font-bold text-navy-950">{title}</p>
          <SampleTag />
        </div>
        <div className="mt-5">{children}</div>
      </div>
      <p className="mt-5 text-center text-lg font-bold text-navy-950">{caption}</p>
      <p className="mt-1 text-center text-sm text-navy-700/70">{sub}</p>
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
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Sample progress from B1 today to C1 in two months">
      {LEVELS.map((l) => (
        <g key={l.label}>
          <line x1="34" x2={W - 8} y1={l.y} y2={l.y} stroke="rgba(19,41,82,0.08)" strokeDasharray="3 4" />
          <text x="0" y={l.y + 4} className="fill-navy-700/50 text-[11px] font-semibold">
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
      <text x="34" y={H - 2} className="fill-navy-700/50 text-[10px]">
        Today
      </text>
      <text x="160" y={H - 2} textAnchor="middle" className="fill-navy-700/50 text-[10px]">
        Month 1
      </text>
      <text x={W - 8} y={H - 2} textAnchor="end" className="fill-navy-700/50 text-[10px]">
        Month 2
      </text>
    </svg>
  )
}

export default function SeeWhereItHappens() {
  return (
    <section className="relative px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-blue">Meet Leyla</p>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-navy-950 sm:text-6xl">See where it happens.</h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-navy-700/75 sm:text-lg">
            B1 today. C1 two months from now. Here&rsquo;s what that looks like.
          </p>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-6">
          <Card title="Leyla’s Roadmap" caption="The plan" sub="Built from her goal: a job interview in English." delay={0}>
            <ul className="divide-y divide-navy-900/5 text-sm">
              {[
                { t: 'Week 2 — Describe your experience without notes', s: 'done' },
                { t: 'Week 4 — Answer unexpected questions', s: 'done' },
                { t: 'Week 6 — Mock interview: tough follow-ups', s: 'next' },
              ].map((r) => (
                <li key={r.t} className="flex items-start gap-3 py-3 first:pt-0">
                  <span
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                      r.s === 'done' ? 'bg-brand-blue text-white' : 'border-2 border-brand-blue/40'
                    }`}
                  >
                    {r.s === 'done' && <CheckIcon className="h-3 w-3" />}
                  </span>
                  <span className={r.s === 'done' ? 'text-navy-950' : 'text-navy-700/60'}>{r.t}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Teacher Briefing · Leyla" caption="The briefing" sub="Her tutor walks in already knowing where to push." delay={0.12}>
            <dl className="space-y-4 text-sm">
              {[
                { k: 'Mastered', v: 'Introductions, describing experience', c: 'text-emerald-600' },
                { k: 'Still avoiding', v: 'Salary questions, being interrupted', c: 'text-amber-600' },
                { k: 'Today', v: 'Full mock interview — push the follow-ups', c: 'text-brand-blue' },
              ].map((r) => (
                <div key={r.k}>
                  <dt className={`text-[11px] font-bold uppercase tracking-[0.2em] ${r.c}`}>{r.k}</dt>
                  <dd className="mt-1 text-navy-950">{r.v}</dd>
                </div>
              ))}
            </dl>
          </Card>

          <Card title="Leyla’s Progress · 12 sessions" caption="The result" sub="Specific, visible, and moving." delay={0.24}>
            <ProgressChart />
            <p className="mt-4 text-sm text-navy-700/80">
              <span className="font-semibold text-navy-950">Hesitation:</span> shrinking.{' '}
              <span className="font-semibold text-navy-950">Self-corrections:</span> rising.
            </p>
          </Card>
        </div>
      </div>
    </section>
  )
}
