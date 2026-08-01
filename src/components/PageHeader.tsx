import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface PageHeaderProps {
  eyebrow: string
  title: ReactNode
  description?: string
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
}

export default function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="relative px-6 pt-36 pb-16 sm:pt-44 sm:pb-20 text-center"
    >
      <div className="mx-auto max-w-3xl rounded-3xl border border-navy-900/10 bg-white/70 px-6 py-10 sm:px-12 sm:py-14 backdrop-blur-sm shadow-[0_20px_60px_rgba(19,41,82,0.08)]">
        <motion.span
          variants={item}
          className="mb-5 inline-block rounded-full border border-navy-900/10 bg-navy-900/[0.03] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-navy-700"
        >
          {eyebrow}
        </motion.span>

        <motion.h1
          variants={item}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.05] tracking-tight text-navy-950"
        >
          {title}
        </motion.h1>

        {description && (
          <motion.p variants={item} className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-navy-700/80">
            {description}
          </motion.p>
        )}
      </div>
    </motion.div>
  )
}
