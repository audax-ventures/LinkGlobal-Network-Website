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

// Each route gets its own accent (rotating the site's established palette)
// and a preview image — reusing the exact photo/screenshot that page's own
// hero already shows, rather than a separately-generated screenshot. That
// keeps every preview automatically accurate (no asset pipeline to keep in
// sync) and reuses images already shipped in the bundle.
const ROUTE_META: Record<string, { color: string; image: string; blurb: string }> = {
  home: { color: '#1ba3e0', image: '/gallery/dashboard.png', blurb: 'Real people. Real conversations.' },
  about: { color: '#f5a623', image: '/photos/about-founders.jpg', blurb: 'Why we built LinkGlobal Network.' },
  'for-you': { color: '#2dd4bf', image: '/photos/hero-learner.jpg', blurb: 'Made for learners, tutors & institutions.' },
  learners: { color: '#a78bfa', image: '/photos/learners-hero.jpg', blurb: 'Learn at the speed of real life.' },
  educators: { color: '#f472b6', image: '/photos/educators-hero.jpg', blurb: 'Teach the world, on your terms.' },
  'try-now': { color: '#4ade80', image: '/gallery/onboarding.png', blurb: 'Your first real conversation starts here.' },
  pricing: { color: '#1ba3e0', image: '/gallery/dashboard.png', blurb: 'Plans built around how you learn.' },
  contact: { color: '#f5a623', image: '/photos/journey-5.jpg', blurb: "Have a question? We're here." },
}

const MotionLink = motion(Link)

function NavCircle({ label, path, Icon, id }: { label: string; path: string; Icon: typeof HomeIcon; id: string }) {
  const [hovered, setHovered] = useState(false)
  const meta = ROUTE_META[id]

  return (
    <div
      className="relative flex items-center justify-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.94 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -bottom-3 left-1/2 w-[176px] -translate-x-1/2 translate-y-full overflow-hidden rounded-2xl bg-white shadow-[0_20px_45px_rgba(10,17,40,0.22)] ring-1 ring-navy-900/[0.06]"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <img src={meta.image} alt="" className="h-full w-full object-cover" />
              <div
                className="absolute inset-0"
                style={{ background: `linear-gradient(180deg, transparent 40%, ${meta.color}cc 100%)` }}
              />
              <span className="absolute bottom-2 left-2.5 text-xs font-bold text-white drop-shadow">{label}</span>
            </div>
            <p className="px-2.5 py-2 text-[11px] leading-snug text-navy-700/75">{meta.blurb}</p>
          </motion.div>
        )}
      </AnimatePresence>
      <MotionLink
        to={path}
        aria-label={label}
        whileHover={{ y: -2, scale: 1.06 }}
        transition={{ type: 'spring', stiffness: 400, damping: 22 }}
        className="flex h-11 w-11 items-center justify-center rounded-full shadow-[0_2px_10px_rgba(10,17,40,0.12)] ring-1 ring-navy-900/[0.06] transition-colors"
        style={{
          background: hovered ? meta.color : `${meta.color}1a`,
          color: hovered ? '#ffffff' : meta.color,
        }}
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
      <Link to="/" aria-label="LinkGlobal Network home">
        <Logo variant="dark" className="h-8 w-auto sm:h-9" />
      </Link>
      <div className="flex items-center gap-2 sm:gap-2.5">
        {NAV_ROUTES.map((route) => (
          <NavCircle key={route.id} id={route.id} label={route.label} path={route.path} Icon={ICONS[route.id]} />
        ))}
      </div>
    </div>
  )
}
