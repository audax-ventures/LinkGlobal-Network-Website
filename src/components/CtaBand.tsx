import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

interface CtaBandProps {
  title: string
  description: string
  primary: { label: string; to: string }
  secondary?: { label: string; to: string }
}

export default function CtaBand({ title, description, primary, secondary }: CtaBandProps) {
  return (
    <section className="relative px-6 py-16 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mx-auto max-w-3xl overflow-hidden rounded-3xl px-6 py-12 sm:px-16 sm:py-16 text-center shadow-[0_30px_80px_rgba(5,15,35,0.4)]"
        style={{ background: 'linear-gradient(135deg, #0e2a4d, #1ba3e0)' }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-white">{title}</h2>
        <p className="mt-4 text-white/85">{description}</p>
        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to={primary.to}
            className="rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-navy-950 shadow-[0_8px_24px_rgba(0,0,0,0.2)] transition-transform hover:scale-105"
          >
            {primary.label}
          </Link>
          {secondary && (
            <Link
              to={secondary.to}
              className="rounded-full border-2 border-white/70 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              {secondary.label}
            </Link>
          )}
        </div>
      </motion.div>
    </section>
  )
}
