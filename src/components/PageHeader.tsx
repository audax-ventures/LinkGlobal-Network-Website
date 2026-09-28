import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import SmartLink from './SmartLink'

interface PageHeaderProps {
  eyebrow: string
  title: ReactNode
  description?: string
  image: { src: string; alt: string }
  imagePosition?: 'left' | 'right'
  /** Tailwind aspect-ratio arbitrary value, e.g. "4/3" or "1000/540" — pass the
   * real dimensions for screenshots so object-cover doesn't crop UI content. */
  imageAspect?: string
  /** Header buttons (first is primary). Internal paths, #anchors or URLs. */
  actions?: { label: string; to: string }[]
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
}

const PRIMARY =
  'inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white shadow-[0_8px_30px_rgba(30,120,190,0.3)] transition-transform hover:scale-105'
const PRIMARY_BG = { background: 'linear-gradient(90deg, #1ba3e0, #3ec6ff)' }
const SECONDARY =
  'inline-flex items-center gap-2 rounded-full border border-navy-900/15 bg-white px-8 py-3.5 text-sm font-semibold text-navy-800 transition-colors hover:bg-navy-900/[0.03]'

export default function PageHeader({
  eyebrow,
  title,
  description,
  image,
  imagePosition = 'right',
  imageAspect = '4/3',
  actions = [],
}: PageHeaderProps) {
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

          {actions.length > 0 && (
            <motion.div variants={item} className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
              {actions.map((a, i) =>
                a.to.startsWith('#') ? (
                  <a key={a.label} href={a.to} className={i === 0 ? PRIMARY : SECONDARY} style={i === 0 ? PRIMARY_BG : undefined}>
                    {a.label}
                  </a>
                ) : (
                  <SmartLink key={a.label} to={a.to} className={i === 0 ? PRIMARY : SECONDARY} style={i === 0 ? PRIMARY_BG : undefined}>
                    {a.label}
                  </SmartLink>
                ),
              )}
            </motion.div>
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
            style={{ aspectRatio: imageAspect }}
            className="w-full rounded-3xl object-cover shadow-[0_25px_60px_rgba(19,41,82,0.2)]"
          />
        </motion.div>
      </div>
    </div>
  )
}
