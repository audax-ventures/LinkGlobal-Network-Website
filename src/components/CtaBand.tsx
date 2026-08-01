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
    <section className="relative px-6 py-28 sm:py-36">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mx-auto max-w-2xl rounded-3xl border border-white/10 bg-white/5 px-6 py-12 sm:px-14 sm:py-16 text-center backdrop-blur"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-white">{title}</h2>
        <p className="mt-4 text-white/65">{description}</p>
        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to={primary.to}
            className="rounded-full px-8 py-3.5 text-sm font-semibold text-white shadow-[0_8px_30px_rgba(30,120,190,0.3)] transition-transform hover:scale-105"
            style={{ background: 'linear-gradient(90deg, #1ba3e0, #3ec6ff)' }}
          >
            {primary.label}
          </Link>
          {secondary && (
            <Link
              to={secondary.to}
              className="rounded-full border border-white/20 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              {secondary.label}
            </Link>
          )}
        </div>
      </motion.div>
    </section>
  )
}
