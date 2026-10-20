import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

// Replaces the old 6-card icon grids on For Learners / For Educators, which
// the client flagged as filler. Each row pairs one benefit with a small
// product visual that shows exactly that benefit (client: "every visual
// block should carry meaning and connect directly to the copy next to it").

export interface FeatureRow {
  eyebrow?: string
  title: string
  line: string
  visual: ReactNode
}

export default function FeatureRows({ heading, eyebrow, rows }: { heading: string; eyebrow?: string; rows: FeatureRow[] }) {
  return (
    <section className="relative px-6 pb-8 pt-4 sm:pb-12">
      <div className="mx-auto max-w-2xl text-center">
        {eyebrow && <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-blue">{eyebrow}</p>}
        <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-navy-950 sm:text-5xl">{heading}</h2>
      </div>

      <div className="mx-auto mt-14 flex max-w-5xl flex-col gap-14 sm:gap-20">
        {rows.map((r, i) => (
          <div key={r.title} className="grid items-center gap-8 md:grid-cols-2 md:gap-16">
            <motion.div
              initial={{ opacity: 0, x: i % 2 === 1 ? 70 : -70 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className={i % 2 === 1 ? 'md:order-2' : ''}
            >
              <p className="text-sm font-semibold tracking-[0.2em] text-brand-blue">
                0{i + 1}
                {r.eyebrow ? ` · ${r.eyebrow.toUpperCase()}` : ''}
              </p>
              <h3 className="mt-2 text-4xl font-extrabold tracking-tight text-navy-950 sm:text-5xl">{r.title}</h3>
              <p className="mt-4 text-xl leading-relaxed text-navy-700/75">{r.line}</p>
            </motion.div>
            {/* Plain wrapper owns placement; motion.div only animates. */}
            <div className={`flex ${i % 2 === 1 ? 'md:order-1 md:justify-start' : 'md:justify-end'}`}>
              <motion.div
                initial={{ opacity: 0, x: i % 2 === 1 ? -90 : 90, rotate: i % 2 === 1 ? -3 : 3 }}
                whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-md overflow-hidden rounded-3xl bg-white p-7 shadow-[0_24px_60px_rgba(19,41,82,0.16)] sm:p-8"
              >
                {r.visual}
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* Small building blocks for the visuals ---------------------------------- */

export function Pill({ children, on = false }: { children: ReactNode; on?: boolean }) {
  return (
    <span
      className={`rounded-full px-3 py-1.5 text-sm font-semibold ${
        on ? 'bg-brand-blue text-white' : 'bg-navy-900/[0.05] text-navy-700/70'
      }`}
    >
      {children}
    </span>
  )
}

export function CardLabel({ children }: { children: ReactNode }) {
  return <p className="text-sm font-bold uppercase tracking-[0.2em] text-navy-700/55">{children}</p>
}
