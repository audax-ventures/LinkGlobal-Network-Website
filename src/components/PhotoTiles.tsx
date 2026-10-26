import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Photo from './Photo'
import { Reveal, side } from './blocks'

// Lingoda-style photo tiles (revision brief 2): the picture covers the whole
// tile, a small notification-style chip floats on it, and a "+" button opens
// the detail only when wanted. Used for "Inside the platform" (item 23).

export interface PhotoTile {
  title: string
  line: string
  photo: string
  alt: string
  chip: string
}

export default function PhotoTiles({ tiles }: { tiles: PhotoTile[] }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className="mx-auto mt-12 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {tiles.map((t, i) => {
        const isOpen = open === i
        return (
          <Reveal key={t.title} delay={i * 0.08} from={side(i)}>
            <article className="relative aspect-[3/4] overflow-hidden rounded-3xl shadow-[0_20px_50px_rgba(19,41,82,0.16)]">
              <Photo src={t.photo} alt={t.alt} sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 90vw" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06182e]/85 via-[#06182e]/10 to-transparent" aria-hidden="true" />
              <span className="absolute left-4 top-4 rounded-2xl bg-white/95 px-3.5 py-2 text-sm font-semibold text-navy-950 shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
                {t.chip}
              </span>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    id={`tile-${i}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="absolute inset-0 flex items-center bg-[#06182e]/85 p-6 backdrop-blur-sm"
                  >
                    <p className="text-lg leading-relaxed text-white">{t.line}</p>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                <h3 className="text-2xl font-extrabold leading-tight tracking-tight text-white">{t.title}</h3>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`tile-${i}`}
                  aria-label={isOpen ? `Close ${t.title}` : `Read more about ${t.title}`}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-navy-950 shadow-lg transition-transform hover:scale-105"
                >
                  <svg viewBox="0 0 24 24" className={`h-5 w-5 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </button>
              </div>
            </article>
          </Reveal>
        )
      })}
    </div>
  )
}
