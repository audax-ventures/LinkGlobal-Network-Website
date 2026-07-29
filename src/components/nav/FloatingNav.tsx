import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import {
  HomeIcon,
  AboutIcon,
  ForYouIcon,
  LearnersIcon,
  EducatorsIcon,
  TryNowIcon,
  PricingIcon,
  ContactIcon,
} from './NavIcons'
import { WAVE_MASK_URL, WAVE_MASK_SIZE, MASK_Y_VISIBLE, MASK_Y_HIDDEN, PILL_HEIGHT } from './waveMask'

const NAV_ITEMS = [
  { id: 'home', label: 'Home', Icon: HomeIcon },
  { id: 'about', label: 'About', Icon: AboutIcon },
  { id: 'for-you', label: 'For You', Icon: ForYouIcon },
  { id: 'learners', label: 'For Learners', Icon: LearnersIcon },
  { id: 'educators', label: 'For Educators', Icon: EducatorsIcon },
  { id: 'try-now', label: 'Try Now', Icon: TryNowIcon },
  { id: 'pricing', label: 'Pricing', Icon: PricingIcon },
  { id: 'contact', label: 'Contact', Icon: ContactIcon },
] as const

function NavCircle({ label, Icon }: { label: string; Icon: typeof HomeIcon }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="relative flex items-center justify-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.9 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute -top-9 whitespace-nowrap rounded-full bg-navy-950/90 px-3 py-1 text-xs font-medium tracking-wide text-white shadow-lg"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
      <motion.button
        type="button"
        aria-label={label}
        whileHover={{ scale: 1.14 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/90 hover:bg-white/20 hover:text-white"
      >
        <Icon className="h-5 w-5" />
      </motion.button>
    </div>
  )
}

export default function FloatingNav() {
  const clipRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef({ value: 0 })
  const lastScrollY = useRef(0)
  const tweenRef = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    lastScrollY.current = window.scrollY

    const applyMask = () => {
      const el = clipRef.current
      if (!el) return
      const p = progressRef.current.value
      const maskY = MASK_Y_VISIBLE + (MASK_Y_HIDDEN - MASK_Y_VISIBLE) * p
      const translateY = -18 * p
      el.style.maskPosition = `0px ${maskY}px`
      el.style.setProperty('-webkit-mask-position', `0px ${maskY}px`)
      el.style.transform = `translateY(${translateY}px)`
    }

    const animateTo = (target: number) => {
      tweenRef.current?.kill()
      tweenRef.current = gsap.to(progressRef.current, {
        value: target,
        duration: 0.6,
        ease: 'power2.inOut',
        onUpdate: applyMask,
      })
    }

    const onScroll = () => {
      const y = window.scrollY
      const goingDown = y > lastScrollY.current
      if (y < 60) {
        animateTo(0)
      } else if (goingDown) {
        animateTo(1)
      } else {
        animateTo(0)
      }
      lastScrollY.current = y
    }

    applyMask()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-40" style={{ height: PILL_HEIGHT }}>
      <div
        ref={clipRef}
        style={{
          maskImage: WAVE_MASK_URL,
          WebkitMaskImage: WAVE_MASK_URL,
          maskRepeat: 'repeat-x',
          WebkitMaskRepeat: 'repeat-x',
          maskSize: WAVE_MASK_SIZE,
          WebkitMaskSize: WAVE_MASK_SIZE,
        }}
      >
        <div
          className="flex items-center gap-2 sm:gap-3 rounded-full border border-white/10 bg-white/10 px-3 sm:px-4 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl"
          style={{ height: PILL_HEIGHT }}
        >
          {NAV_ITEMS.map((item) => (
            <NavCircle key={item.id} label={item.label} Icon={item.Icon} />
          ))}
        </div>
      </div>
    </div>
  )
}
