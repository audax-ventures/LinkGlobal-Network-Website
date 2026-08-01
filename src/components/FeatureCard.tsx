import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
  tone?: 'light' | 'dark'
  delay?: number
}

export default function FeatureCard({ icon, title, description, tone = 'light', delay = 0 }: FeatureCardProps) {
  const isDark = tone === 'dark'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={
        isDark
          ? 'rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur'
          : 'rounded-2xl border border-navy-900/10 bg-navy-900/[0.03] p-6'
      }
    >
      <div
        className={
          isDark
            ? 'flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-brand-light'
            : 'flex h-10 w-10 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue'
        }
      >
        <span className="h-5 w-5">{icon}</span>
      </div>
      <h3 className={`mt-4 text-lg font-bold ${isDark ? 'text-white' : 'text-navy-950'}`}>{title}</h3>
      <p className={`mt-2 text-sm leading-relaxed ${isDark ? 'text-white/65' : 'text-navy-700/75'}`}>{description}</p>
    </motion.div>
  )
}
