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

const PILL_HEIGHT = 92

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
            className="absolute -top-11 whitespace-nowrap rounded-full bg-navy-950/90 px-3 py-1 text-xs font-medium tracking-wide text-white shadow-lg"
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
        className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 text-white shadow-[0_4px_16px_rgba(0,0,0,0.3)] transition-colors hover:border-white/40"
        style={{ background: 'linear-gradient(145deg, rgba(62,198,255,0.45), rgba(19,41,82,0.55))' }}
      >
        <Icon className="h-7 w-7" />
      </motion.button>
    </div>
  )
}

export default function FloatingNav() {
  const navRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef({ value: 0 })
  const lastScrollY = useRef(0)
  const tweenRef = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    lastScrollY.current = window.scrollY

    const apply = () => {
      const el = navRef.current
      if (!el) return
      const p = progressRef.current.value
      el.style.transform = `translateY(${-140 * p}px)`
      el.style.opacity = `${1 - p}`
    }

    const animateTo = (target: number) => {
      tweenRef.current?.kill()
      tweenRef.current = gsap.to(progressRef.current, {
        value: target,
        duration: 0.5,
        ease: 'power2.inOut',
        onUpdate: apply,
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

    apply()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div ref={navRef} className="fixed top-6 left-1/2 -translate-x-1/2 z-40">
      <div
        className="flex items-center gap-3 sm:gap-4 rounded-full border border-white/15 px-4 sm:px-5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl"
        style={{
          height: PILL_HEIGHT,
          background:
            'linear-gradient(120deg, rgba(62,198,255,0.22), rgba(19,41,82,0.35), rgba(143,224,255,0.18))',
        }}
      >
        {NAV_ITEMS.map((item) => (
          <NavCircle key={item.id} label={item.label} Icon={item.Icon} />
        ))}
      </div>
    </div>
  )
}
