import { motion } from 'framer-motion'
import MockScreen from './MockScreen'

interface ScreenConfig {
  src: string
  alt: string
  top: string
  left: string
  width: string
  rotateY: number
  rotateX: number
  translateZ: number
  z: number
}

const SCREENS: ScreenConfig[] = [
  {
    src: '/gallery/dashboard.png',
    alt: 'LinkGlobal Network learner dashboard',
    top: '8%',
    left: '6%',
    width: '30%',
    rotateY: 18,
    rotateX: 4,
    translateZ: 40,
    z: 20,
  },
  {
    src: '/gallery/onboarding.png',
    alt: 'LinkGlobal Network onboarding flow',
    top: '14%',
    left: '58%',
    width: '26%',
    rotateY: -16,
    rotateX: 6,
    translateZ: 60,
    z: 30,
  },
  {
    src: '/gallery/practice-report.png',
    alt: 'LinkGlobal Network AI practice session report',
    top: '48%',
    left: '10%',
    width: '24%',
    rotateY: 12,
    rotateX: -4,
    translateZ: 20,
    z: 10,
  },
  {
    src: '/gallery/session-details.png',
    alt: 'LinkGlobal Network session management details',
    top: '46%',
    left: '62%',
    width: '26%',
    rotateY: -20,
    rotateX: -2,
    translateZ: 80,
    z: 40,
  },
]

export default function PlatformGallery() {
  return (
    <section
      className="relative overflow-hidden py-28 sm:py-36"
      style={{ background: 'linear-gradient(180deg, #030407 0%, #0a1128 60%, #0e1c3d 100%)' }}
    >
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-light/60">
          Inside the Platform
        </span>
        <h2 className="mt-3 text-3xl sm:text-5xl font-bold text-white">
          Built for how you actually learn.
        </h2>
        <p className="mt-4 text-white/65">
          A preview of the LinkGlobal Network experience — lessons, live sessions, and
          progress tracking, all in one place.
        </p>
      </div>

      <div
        className="relative mx-auto mt-20 h-[480px] sm:h-[560px] w-full max-w-5xl px-6"
        style={{ perspective: '1600px' }}
      >
        {/* grid floor */}
        <div
          className="absolute inset-x-0 bottom-0 h-1/2"
          style={{
            transform: 'rotateX(75deg)',
            transformOrigin: 'bottom',
            backgroundImage:
              'linear-gradient(rgba(62,198,255,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(62,198,255,0.25) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage: 'linear-gradient(to top, black, transparent)',
            WebkitMaskImage: 'linear-gradient(to top, black, transparent)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(circle at 50% 40%, rgba(62,198,255,0.18), transparent 60%)' }}
        />

        <div className="relative h-full w-full" style={{ transformStyle: 'preserve-3d' }}>
          {SCREENS.map((s, i) => (
            <motion.div
              key={i}
              className="absolute aspect-[16/9]"
              style={{
                top: s.top,
                left: s.left,
                width: s.width,
                zIndex: s.z,
                transformStyle: 'preserve-3d',
              }}
              initial={{ opacity: 0, y: 40, rotateY: s.rotateY, rotateX: s.rotateX, translateZ: s.translateZ }}
              whileInView={{ opacity: 1, y: 0, rotateY: s.rotateY, rotateX: s.rotateX, translateZ: s.translateZ }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{
                rotateY: s.rotateY * 0.3,
                rotateX: s.rotateX * 0.3,
                translateZ: s.translateZ + 40,
                scale: 1.04,
              }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <MockScreen src={s.src} alt={s.alt} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
