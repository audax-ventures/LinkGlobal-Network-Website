import { useState } from 'react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckIcon } from './icons/LineIcons'
import Photo from './Photo'

// Shared content blocks for the Website Copy v7 pages. Copy is passed in by
// each page so the same layout can carry page-specific wording.

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

// Brief 2: entrances slide in from the sides as you scroll. `from` picks the
// direction ('up' keeps the original rise); grids alternate left / right.
export function Reveal({
  children,
  delay = 0,
  className = '',
  from = 'up',
}: {
  children: ReactNode
  delay?: number
  className?: string
  from?: 'up' | 'left' | 'right'
}) {
  const offset = from === 'left' ? { x: -64 } : from === 'right' ? { x: 64 } : { y: 28 }
  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/** Alternate grid items in from the left and right. */
export const side = (i: number) => (i % 2 === 0 ? 'left' : 'right') as 'left' | 'right'

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
        <p className={`text-sm font-semibold uppercase tracking-[0.3em] ${dark ? 'text-brand-cyan' : 'text-brand-blue'}`}>
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
        <Reveal key={it.title} delay={i * 0.08} from={side(i)}>
          <div
            className={`h-full rounded-3xl p-7 ${
              dark ? 'bg-white/5 ring-1 ring-white/10' : 'bg-white shadow-[0_15px_40px_rgba(19,41,82,0.08)]'
            }`}
          >
            {it.visual}
            <h3 className={`text-xl font-bold ${it.visual ? 'mt-5' : ''} ${dark ? 'text-white' : 'text-navy-950'}`}>{it.title}</h3>
            <p className={`mt-2 text-lg leading-relaxed ${dark ? 'text-white/65' : 'text-navy-700/75'}`}>{it.line}</p>
          </div>
        </Reveal>
      ))}
    </div>
  )
}

/** Before / During / After strip (For Learners; the Loop covers Home). */
// Brief 2, item 20: each step gets its own small animated visual (no text
// inside). Visuals loop while on screen; clicking a card replays its own.
function BriefVisual() {
  return (
    <div className="relative mx-auto flex h-full w-40 flex-col gap-2.5 rounded-xl bg-white p-4 shadow-[0_8px_24px_rgba(19,41,82,0.1)]">
      <span className="flex items-center gap-2">
        <span className="h-6 w-6 rounded-full bg-brand-blue/20" />
        <span className="h-2 w-16 rounded-full bg-navy-900/15" />
      </span>
      {[0.85, 0.65, 0.75].map((w, i) => (
        <motion.span
          key={i}
          className="h-2 origin-left rounded-full bg-brand-blue/60"
          style={{ width: `${w * 100}%` }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: [0, 1, 1, 0] }}
          transition={{ duration: 3.2, times: [0, 0.25, 0.85, 1], repeat: Infinity, delay: 0.25 + i * 0.25 }}
        />
      ))}
      <motion.span
        className="absolute -right-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg"
        animate={{ scale: [0, 0, 1.15, 1, 1, 0] }}
        transition={{ duration: 3.2, times: [0, 0.4, 0.5, 0.55, 0.9, 1], repeat: Infinity }}
      >
        ✓
      </motion.span>
    </div>
  )
}

function LessonVisual() {
  const bars = [14, 26, 34, 20, 30, 16, 24]
  return (
    <div className="flex h-full items-center justify-center gap-4">
      <span className="h-14 w-14 rounded-full bg-gradient-to-br from-brand-blue to-[#a78bfa] shadow-[0_8px_20px_rgba(27,163,224,0.35)]" />
      <span className="flex h-10 items-center gap-1">
        {bars.map((h, i) => (
          <motion.span
            key={i}
            className="w-1.5 rounded-full bg-brand-blue"
            style={{ height: h }}
            animate={{ scaleY: [1, 0.3, 1] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.1 }}
          />
        ))}
      </span>
      <span className="h-14 w-14 rounded-full bg-gradient-to-br from-[#f5a623] to-[#f472b6] shadow-[0_8px_20px_rgba(245,166,35,0.35)]" />
    </div>
  )
}

export function PathVisual() {
  return (
    <div className="relative mx-auto flex h-full w-48 items-center justify-between">
      <span className="absolute left-3 right-3 top-1/2 h-1 -translate-y-1/2 rounded-full bg-navy-900/10" />
      <motion.span
        className="absolute left-3 right-3 top-1/2 h-1 origin-left -translate-y-1/2 rounded-full bg-brand-blue"
        animate={{ scaleX: [0, 1, 1, 0] }}
        transition={{ duration: 3.2, times: [0, 0.6, 0.9, 1], repeat: Infinity }}
      />
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-brand-blue bg-white text-sm font-bold text-white"
          animate={{ backgroundColor: ['#ffffff', '#ffffff', '#1ba3e0', '#1ba3e0', '#ffffff'] }}
          transition={{ duration: 3.2, times: [0, i * 0.28, i * 0.28 + 0.05, 0.9, 1], repeat: Infinity }}
        >
          ✓
        </motion.span>
      ))}
    </div>
  )
}

/** Bars that grow, for progress (Pricing "Free to use"). */
export function ProgressVisual() {
  const bars = [
    { w: 0.55, c: '#1ba3e0' },
    { w: 0.8, c: '#a78bfa' },
    { w: 0.68, c: '#2dd4bf' },
  ]
  return (
    <div className="mx-auto flex h-full w-48 flex-col justify-center gap-3">
      {bars.map((b, i) => (
        <span key={i} className="h-3 overflow-hidden rounded-full bg-navy-900/10">
          <motion.span
            className="block h-full origin-left rounded-full"
            style={{ width: `${b.w * 100}%`, background: b.c }}
            animate={{ scaleX: [0.2, 1, 1, 0.2] }}
            transition={{ duration: 3.2, times: [0, 0.45, 0.85, 1], repeat: Infinity, delay: i * 0.2 }}
          />
        </span>
      ))}
    </div>
  )
}

const BDA_VISUALS = [BriefVisual, LessonVisual, PathVisual]

export function BeforeDuringAfter({ items }: { items: { label: string; line: string }[] }) {
  const [replay, setReplay] = useState([0, 0, 0])
  return (
    <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3">
      {items.map((it, i) => {
        const Visual = BDA_VISUALS[i % BDA_VISUALS.length]
        return (
          <Reveal key={it.label} delay={i * 0.08} from={i === 1 ? 'up' : side(i === 2 ? 1 : 0)}>
            <button
              type="button"
              onClick={() => setReplay((r) => r.map((n, j) => (j === i ? n + 1 : n)))}
              className="group relative h-full w-full rounded-3xl bg-white p-7 text-left shadow-[0_15px_40px_rgba(19,41,82,0.08)] transition-transform hover:-translate-y-1"
              aria-label={`${it.label}: ${it.line} Replay animation`}
            >
              <div className="h-32 rounded-2xl bg-gradient-to-br from-[#eaf6fd] to-[#f4f0ff] p-4" aria-hidden="true">
                <Visual key={replay[i]} />
              </div>
              <p className="mt-6 text-sm font-bold uppercase tracking-[0.25em] text-brand-blue">
                {i + 1} · {it.label}
              </p>
              <p className="mt-2 text-xl font-semibold leading-snug text-navy-950">{it.line}</p>
            </button>
          </Reveal>
        )
      })}
    </div>
  )
}

/** Certified educators vs Conversation partners, with the For You button.
 *  Each card leads with a stock photo (revision brief 2, item 22). */
export function TwoRoles({ educator, partner }: { educator: string; partner: string }) {
  const card = (title: string, line: string, visual: ReactNode, i: number) => (
    <Reveal delay={i * 0.1} from={side(i)}>
      <div className="h-full rounded-3xl bg-white p-7 shadow-[0_15px_40px_rgba(19,41,82,0.08)]">
        {visual}
        <h3 className="mt-6 text-2xl font-extrabold tracking-tight text-navy-950">{title}</h3>
        <p className="mt-2 text-lg leading-relaxed text-navy-700/75">{line}</p>
      </div>
    </Reveal>
  )
  const photo = (src: string, alt: string) => (
    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
      <Photo src={src} alt={alt} sizes="(min-width: 768px) 460px, 90vw" className="absolute inset-0 h-full w-full object-cover" />
    </div>
  )
  return (
    <>
      <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-2">
        {card('Certified educators', educator, photo('/photos/educator-whiteboard.jpg', 'An educator waving hello on a video lesson, a grammar whiteboard behind her'), 0)}
        {card('Conversation partners', partner, photo('/photos/cafe-trio.jpg', 'Three friends talking over coffee at an outdoor café table'), 1)}
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

/** "What learners become able to do" outcome list (About). With `photos`
 *  (same order as items), each outcome becomes a photo card (brief 2, item 37). */
export function OutcomeList({ items, photos, dark = false }: { items: string[]; photos?: { src: string; alt: string }[]; dark?: boolean }) {
  if (photos) {
    return (
      <ul className="mx-auto mt-12 flex max-w-6xl flex-wrap justify-center gap-5">
        {items.map((t, i) => (
          <Reveal key={t} delay={(i % 3) * 0.08} from={side(i)} className="w-full sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.84rem)]">
            <li className="h-full overflow-hidden rounded-3xl bg-white shadow-[0_15px_40px_rgba(19,41,82,0.08)]">
              <div className="relative aspect-[4/3]">
                <Photo src={photos[i].src} alt={photos[i].alt} sizes="(min-width: 1024px) 370px, (min-width: 640px) 45vw, 90vw" className="absolute inset-0 h-full w-full object-cover" />
              </div>
              <p className="flex items-center gap-3 p-5 text-lg font-semibold text-navy-950">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                  <CheckIcon className="h-4 w-4" />
                </span>
                {t}
              </p>
            </li>
          </Reveal>
        ))}
      </ul>
    )
  }
  return (
    <ul className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
      {items.map((t, i) => (
        <Reveal key={t} delay={i * 0.06} from={side(i)}>
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
