import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
  tone?: 'light' | 'dark'
  color?: string
  delay?: number
}

const DEFAULT_COLOR_LIGHT = '#1ba3e0'
const DEFAULT_COLOR_DARK = '#3ec6ff'

export default function FeatureCard({ icon, title, description, tone = 'light', color, delay = 0 }: FeatureCardProps) {
  const isDark = tone === 'dark'
  const badgeColor = color ?? (isDark ? DEFAULT_COLOR_DARK : DEFAULT_COLOR_LIGHT)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={
        isDark
          ? 'rounded-2xl bg-navy-800 p-6 shadow-[0_20px_45px_rgba(5,15,35,0.35)]'
          : 'rounded-2xl bg-white p-6 shadow-[0_15px_40px_rgba(19,41,82,0.12)]'
      }
    >
      <div
        className="flex h-11 w-11 items-center justify-center rounded-xl shadow-[0_6px_16px_rgba(0,0,0,0.18)]"
        style={{ background: badgeColor }}
      >
        <span className="h-5 w-5 text-white">{icon}</span>
      </div>
      <h3 className={`mt-4 text-lg font-bold ${isDark ? 'text-white' : 'text-navy-950'}`}>{title}</h3>
      <p className={`mt-2 text-sm leading-relaxed ${isDark ? 'text-white/70' : 'text-navy-700/75'}`}>{description}</p>
    </motion.div>
  )
}
