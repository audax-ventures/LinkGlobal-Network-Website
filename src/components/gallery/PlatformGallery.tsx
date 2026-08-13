import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import MockScreen from './MockScreen'
import Lightbox from './Lightbox'

interface ScreenConfig {
  src: string
  alt: string
  rotateY: number
  rotateX: number
}

// A real 2x2 grid — every cell is identically sized, so alignment is exact
// by construction rather than tuned per-screen percentages. The alternating
// tilt direction per cell keeps some of the original 3D-room character.
const SCREENS: ScreenConfig[] = [
  { src: '/gallery/dashboard.png', alt: 'LinkGlobal Network learner dashboard', rotateY: 8, rotateX: 3 },
  { src: '/gallery/onboarding.png', alt: 'LinkGlobal Network onboarding flow', rotateY: -8, rotateX: 3 },
  {
    src: '/gallery/practice-report.png',
    alt: 'LinkGlobal Network AI practice session report',
    rotateY: 8,
    rotateX: -3,
  },
  {
    src: '/gallery/session-details.png',
    alt: 'LinkGlobal Network session management details',
    rotateY: -8,
    rotateX: -3,
  },
]

export default function PlatformGallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="relative overflow-hidden pb-6 sm:pb-8">
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        {/* This section sits early in Home's light-to-dark fade wrapper (see
            Home.tsx), so it reads closer to light than dark — the previous
            white-on-translucent-dark styling (sized for a solid dark navy
            backdrop) went nearly invisible here. Solid white card + dark
            navy text matches the rest of the site's light-background
            sections instead of guessing at contrast against a backdrop that
            varies by scroll position. */}
        <div className="rounded-3xl bg-white px-6 py-10 sm:px-12 sm:py-12 shadow-[0_20px_60px_rgba(19,41,82,0.12)]">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-blue">
            Inside the Platform
          </span>
          <h2 className="mt-3 text-3xl sm:text-5xl font-bold text-navy-950">
            Built for how you actually learn.
          </h2>
          <p className="mt-4 text-navy-700/80">
            A preview of the LinkGlobal Network experience — lessons, live sessions, and
            progress tracking, all in one place.
          </p>
          <Link
            to="/about"
            className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-navy-900/15 px-6 py-2.5 text-sm font-semibold text-navy-800 transition-colors hover:bg-navy-900/[0.03]"
          >
            Learn More
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      <div className="relative mx-auto mt-14 w-full max-w-7xl px-6" style={{ perspective: '1600px' }}>
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(circle at 50% 40%, rgba(62,198,255,0.18), transparent 60%)' }}
        />

        <div className="relative grid grid-cols-2 gap-8 sm:gap-12">
          {SCREENS.map((s, i) => (
            <motion.button
              key={i}
              type="button"
              aria-label={`View ${s.alt} full size`}
              onClick={() => setOpenIndex(i)}
              className="group relative aspect-[16/9] w-full appearance-none border-0 bg-transparent p-0 text-left cursor-pointer"
              style={{ transformStyle: 'preserve-3d' }}
              initial={{ opacity: 0, y: 40, rotateY: s.rotateY, rotateX: s.rotateX }}
              whileInView={{ opacity: 1, y: 0, rotateY: s.rotateY, rotateX: s.rotateX }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ rotateY: s.rotateY * 0.3, rotateX: s.rotateX * 0.3, scale: 1.04 }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <MockScreen src={s.src} alt={s.alt} />
              <span className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-2xl bg-navy-950/0 opacity-0 transition-all duration-200 group-hover:bg-navy-950/30 group-hover:opacity-100">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-navy-900">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M9 3H3v6M15 3h6v6M3 15v6h6M21 15v6h-6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <Lightbox
        src={openIndex !== null ? SCREENS[openIndex].src : null}
        alt={openIndex !== null ? SCREENS[openIndex].alt : ''}
        onClose={() => setOpenIndex(null)}
      />
    </section>
  )
}
