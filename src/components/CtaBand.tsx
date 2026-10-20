import SmartLink from './SmartLink'
import { motion } from 'framer-motion'

// Slim "Start" strip (client brief Oct 2026, items 43-44): wide and short,
// a button and nothing else. Used as the closing strip on every page, plus
// once mid-way down Home (`compact` trims the vertical padding).
interface CtaBandProps {
  primary: { label: string; to: string }
  compact?: boolean
}

export default function CtaBand({ primary, compact = false }: CtaBandProps) {
  return (
    <section className={`relative px-6 ${compact ? 'py-6' : 'py-10 sm:py-14'}`}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mx-auto flex max-w-6xl items-center justify-center overflow-hidden rounded-full px-6 py-4 shadow-[0_18px_50px_rgba(5,15,35,0.25)]"
        style={{ background: 'linear-gradient(90deg, #0e2a4d, #1ba3e0 55%, #3ec6ff)' }}
      >
        <span
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '14px 14px' }}
          aria-hidden="true"
        />
        <SmartLink
          to={primary.to}
          className="group relative inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-base font-semibold text-navy-950 shadow-[0_8px_24px_rgba(0,0,0,0.2)] transition-transform hover:scale-105"
        >
          {primary.label}
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </SmartLink>
      </motion.div>
    </section>
  )
}
