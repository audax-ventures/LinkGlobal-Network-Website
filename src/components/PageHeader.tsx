import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface PageHeaderProps {
  eyebrow: string
  title: ReactNode
  description?: string
  image: { src: string; alt: string }
  imagePosition?: 'left' | 'right'
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
}

export default function PageHeader({ eyebrow, title, description, image, imagePosition = 'right' }: PageHeaderProps) {
  const imageOnLeft = imagePosition === 'left'

  return (
    <div className="relative px-6 pt-32 pb-16 sm:pt-40 sm:pb-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-16">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className={`flex flex-col items-center text-center md:items-start md:text-left ${imageOnLeft ? 'md:order-2' : ''}`}
        >
          <motion.span
            variants={item}
            className="mb-5 inline-block rounded-full bg-brand-blue/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-brand-blue"
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
            <motion.p variants={item} className="mt-6 max-w-lg text-base sm:text-lg text-navy-700/80">
              {description}
            </motion.p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className={imageOnLeft ? 'md:order-1' : ''}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="aspect-[4/3] w-full rounded-3xl object-cover shadow-[0_25px_60px_rgba(19,41,82,0.2)]"
          />
        </motion.div>
      </div>
    </div>
  )
}
