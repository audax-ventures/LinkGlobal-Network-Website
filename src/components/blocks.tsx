import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckIcon } from './icons/LineIcons'
import AvatarIllustration from './AvatarIllustration'

// Shared content blocks for the Website Copy v7 pages. Copy is passed in by
// each page so the same layout can carry page-specific wording.

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

export function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  line,
  dark = false,
  as = 'h2',
}: {
  eyebrow?: string
  title: ReactNode
  line?: ReactNode
  dark?: boolean
  as?: 'h1' | 'h2'
}) {
  const H = as
  return (
    <Reveal className="mx-auto max-w-3xl text-center">
      {eyebrow && (
        <p className={`text-xs font-semibold uppercase tracking-[0.3em] ${dark ? 'text-brand-cyan' : 'text-brand-blue'}`}>
          {eyebrow}
        </p>
      )}
      <H className={`mt-3 text-balance text-4xl font-extrabold tracking-tight sm:text-5xl ${dark ? 'text-white' : 'text-navy-950'}`}>
        {title}
      </H>
      {line && <p className={`mx-auto mt-4 max-w-2xl text-lg ${dark ? 'text-white/70' : 'text-navy-700/75'}`}>{line}</p>}
    </Reveal>
  )
}

export function Section({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <section className={`relative px-6 py-16 sm:py-24 ${className}`}>{children}</section>
}

/** Row of short titled cards (audiences, reasons, free features...). */
export function CardRow({
  items,
  dark = false,
  cols = 3,
}: {
  items: { title: string; line: string; visual?: ReactNode }[]
  dark?: boolean
  cols?: 2 | 3 | 4
}) {
  const grid = cols === 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : cols === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'
  return (
    <div className={`mx-auto mt-12 grid max-w-6xl gap-5 ${grid}`}>
      {items.map((it, i) => (
        <Reveal key={it.title} delay={i * 0.08}>
          <div
            className={`h-full rounded-3xl p-7 ${
              dark ? 'bg-white/5 ring-1 ring-white/10' : 'bg-white shadow-[0_15px_40px_rgba(19,41,82,0.08)]'
            }`}
          >
            {it.visual}
            <h3 className={`text-xl font-bold ${it.visual ? 'mt-5' : ''} ${dark ? 'text-white' : 'text-navy-950'}`}>{it.title}</h3>
            <p className={`mt-2 leading-relaxed ${dark ? 'text-white/65' : 'text-navy-700/75'}`}>{it.line}</p>
          </div>
        </Reveal>
      ))}
    </div>
  )
}

/** Before / During / After strip (For Learners; the Loop covers Home). */
export function BeforeDuringAfter({ items }: { items: { label: string; line: string }[] }) {
  return (
    <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3">
      {items.map((it, i) => (
        <Reveal key={it.label} delay={i * 0.08}>
          <div className="relative h-full rounded-3xl bg-white p-7 shadow-[0_15px_40px_rgba(19,41,82,0.08)]">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-blue text-sm font-extrabold text-white">
              {i + 1}
            </span>
            <p className="mt-4 text-xs font-bold uppercase tracking-[0.25em] text-brand-blue">{it.label}</p>
            <p className="mt-2 text-lg font-semibold leading-snug text-navy-950">{it.line}</p>
          </div>
        </Reveal>
      ))}
    </div>
  )
}

/** Certified educators vs Conversation partners, with the For You button. */
export function TwoRoles({ educator, partner }: { educator: string; partner: string }) {
  const card = (title: string, line: string, visual: ReactNode, i: number) => (
    <Reveal delay={i * 0.1}>
      <div className="h-full rounded-3xl bg-white p-7 shadow-[0_15px_40px_rgba(19,41,82,0.08)]">
        {visual}
        <h3 className="mt-6 text-2xl font-extrabold tracking-tight text-navy-950">{title}</h3>
        <p className="mt-2 text-lg leading-relaxed text-navy-700/75">{line}</p>
      </div>
    </Reveal>
  )
  return (
    <>
      <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-2">
        {card(
          'Certified educators',
          educator,
          <div className="rounded-2xl bg-navy-900/[0.03] p-4 text-sm">
            <p className="text-navy-700/60">
              I <span className="rounded bg-rose-500/10 px-1 text-rose-600 line-through">have went</span>{' '}
              <span className="rounded bg-emerald-500/10 px-1 font-semibold text-emerald-700">went</span> to the meeting.
            </p>
            <p className="mt-2 text-xs font-semibold text-brand-blue">Correction · technique · direct feedback</p>
          </div>,
          0,
        )}
        {card(
          'Conversation partners',
          partner,
          <div className="space-y-2 rounded-2xl bg-navy-900/[0.03] p-4 text-sm">
            <div className="flex items-end gap-2">
              <AvatarIllustration color="#2dd4bf" className="h-7 w-7 shrink-0 rounded-full" />
              <p className="rounded-2xl rounded-bl-sm bg-white px-3 py-2 text-navy-800 shadow-sm">So what got you into design?</p>
            </div>
            <div className="flex items-end justify-end gap-2">
              <p className="rounded-2xl rounded-br-sm bg-brand-blue px-3 py-2 text-white">Honestly, it started with posters.</p>
            </div>
          </div>,
          1,
        )}
      </div>
      <Reveal className="mt-10 text-center">
        <Link
          to="/for-you"
          className="inline-flex items-center gap-2 rounded-full border border-navy-900/15 bg-white px-7 py-3 text-sm font-semibold text-navy-800 transition-colors hover:bg-navy-900/[0.03]"
        >
          Meet Conversation Partners <span aria-hidden="true">→</span>
        </Link>
      </Reveal>
    </>
  )
}

/** "What learners become able to do" outcome list (Home, About). */
export function OutcomeList({ items, dark = false }: { items: string[]; dark?: boolean }) {
  return (
    <ul className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
      {items.map((t, i) => (
        <Reveal key={t} delay={i * 0.06}>
          <li
            className={`flex items-center gap-4 rounded-2xl p-5 text-lg font-semibold ${
              dark ? 'bg-white/5 text-white ring-1 ring-white/10' : 'bg-white text-navy-950 shadow-[0_10px_30px_rgba(19,41,82,0.07)]'
            }`}
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
              <CheckIcon className="h-4 w-4" />
            </span>
            {t}
          </li>
        </Reveal>
      ))}
    </ul>
  )
}
