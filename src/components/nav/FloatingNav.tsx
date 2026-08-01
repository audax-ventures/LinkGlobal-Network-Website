import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import Logo from '../Logo'
import { NAV_ROUTES } from '../../routes'
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

const ICONS: Record<string, typeof HomeIcon> = {
  home: HomeIcon,
  about: AboutIcon,
  'for-you': ForYouIcon,
  learners: LearnersIcon,
  educators: EducatorsIcon,
  'try-now': TryNowIcon,
  pricing: PricingIcon,
  contact: ContactIcon,
}

const MotionLink = motion(Link)

// Each icon is its own small floating chip with a soft shadow, rather than
// one shared gradient pill housing all of them — a deliberately different
// visual language from the earlier treatment.
function NavCircle({ label, path, Icon }: { label: string; path: string; Icon: typeof HomeIcon }) {
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
            initial={{ opacity: 0, y: -4, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.92 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className="absolute -bottom-9 whitespace-nowrap rounded-full bg-navy-950 px-3 py-1 text-[11px] font-medium tracking-wide text-white shadow-md"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
      <MotionLink
        to={path}
        aria-label={label}
        whileHover={{ y: -2 }}
        transition={{ type: 'spring', stiffness: 400, damping: 22 }}
        className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-navy-700 shadow-[0_2px_10px_rgba(10,17,40,0.12)] ring-1 ring-navy-900/[0.06] transition-colors hover:text-brand-blue hover:ring-brand-blue/30"
      >
        <Icon className="h-[18px] w-[18px]" />
      </MotionLink>
    </div>
  )
}

export default function FloatingNav() {
  const navRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef({ value: 0 })
  const lastScrollY = useRef(0)
  const currentTarget = useRef(0)
  const tweenRef = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    lastScrollY.current = window.scrollY

    const apply = () => {
      const el = navRef.current
      if (!el) return
      const p = progressRef.current.value
      el.style.transform = `translateY(${-90 * p}px)`
      el.style.opacity = `${1 - p}`
    }

    const animateTo = (target: number) => {
      if (currentTarget.current === target) return
      currentTarget.current = target
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
    <div ref={navRef} className="fixed top-0 inset-x-0 z-40 flex items-center justify-between px-5 sm:px-8 py-4">
      <Logo variant="dark" className="h-8 w-auto sm:h-9" />
      <div className="flex items-center gap-2 sm:gap-2.5">
        {NAV_ROUTES.map((route) => (
          <NavCircle key={route.id} label={route.label} path={route.path} Icon={ICONS[route.id]} />
        ))}
      </div>
    </div>
  )
}
