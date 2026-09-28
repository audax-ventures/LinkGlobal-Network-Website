import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import Logo from '../Logo'
import { NAV_ROUTES } from '../../routes'
import SmartLink from '../SmartLink'
import { LEARNER_SIGNUP_URL } from '../../content/site'
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
  home: { color: '#1ba3e0', image: '/gallery/dashboard.png', blurb: 'Learn the language. Own the conversation.' },
  learners: { color: '#a78bfa', image: '/photos/learners-hero.jpg', blurb: 'Language for the conversations ahead of you.' },
  educators: { color: '#f472b6', image: '/photos/educators-hero.jpg', blurb: 'Spend the session teaching, not preparing.' },
  'for-you': { color: '#2dd4bf', image: '/photos/hero-learner.jpg', blurb: 'Conversation practice with native speakers.' },
  about: { color: '#f5a623', image: '/photos/about-founders.jpg', blurb: 'Language should carry your ideas, not limit them.' },
  pricing: { color: '#1ba3e0', image: '/photos/journey-app-2.png', blurb: 'Pay for the lessons you take.' },
  contact: { color: '#f5a623', image: '/photos/journey-5.jpg', blurb: 'Not sure where to start?' },
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
      {/* Static positioning (centering + the below-the-icon offset) lives on
          this plain wrapper, not the motion.div inside it — Framer Motion
          writes its own `transform` for the entrance animation (y/scale),
          which fully overwrites any Tailwind transform classes placed on
          the same element rather than combining with them. Same fix as the
          Learning Journey step cards hit earlier in this project. */}
      <AnimatePresence>
        {hovered && (
          <div className="absolute -bottom-3 left-1/2 w-[176px] -translate-x-1/2 translate-y-full">
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.94 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden rounded-2xl bg-white shadow-[0_20px_45px_rgba(10,17,40,0.22)] ring-1 ring-navy-900/[0.06]"
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
          </div>
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
      // On Home the hero sits below the intro section, which publishes the
      // hero's offset — treat that as the page "top" so the nav shows there.
      const top = Number(document.documentElement.dataset.heroTop || 0)
      if (y < top + 60) {
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

  // Phones: the seven icon chips don't fit (they ran off-screen), so below
  // md the nav is logo + compact Start Your Journey + a menu button.
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => setMenuOpen(false), [pathname])

  return (
    <div ref={navRef} className="lg-hide-on-intro fixed top-0 inset-x-0 z-40 px-5 sm:px-8 py-4">
      <div className="flex items-center justify-between gap-3">
        <Link to="/" aria-label="LinkGlobal home" className="shrink-0">
          <Logo variant="dark" className="h-8 w-auto sm:h-9" />
        </Link>
        <div className="hidden items-center gap-2.5 md:flex">
          {NAV_ROUTES.map((route) => (
            <NavCircle key={route.id} id={route.id} label={route.label} path={route.path} Icon={ICONS[route.id]} />
          ))}
          <SmartLink
            to={LEARNER_SIGNUP_URL}
            className="ml-1 rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(30,120,190,0.3)] transition-transform hover:scale-105"
            style={{ background: 'linear-gradient(90deg, #1ba3e0, #3ec6ff)' }}
          >
            Start Your Journey
          </SmartLink>
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <SmartLink
            to={LEARNER_SIGNUP_URL}
            className="rounded-full px-3.5 py-2 text-xs font-semibold text-white shadow-[0_6px_18px_rgba(30,120,190,0.3)]"
            style={{ background: 'linear-gradient(90deg, #1ba3e0, #3ec6ff)' }}
          >
            Start Your Journey
          </SmartLink>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="lg-mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-navy-900 shadow-[0_2px_10px_rgba(10,17,40,0.12)] ring-1 ring-navy-900/[0.06]"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {menuOpen ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="lg-mobile-menu"
            aria-label="Site"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-3 overflow-hidden rounded-3xl bg-white p-2 shadow-[0_25px_60px_rgba(10,17,40,0.25)] ring-1 ring-navy-900/[0.06] md:hidden"
          >
            {NAV_ROUTES.map((route) => {
              const Icon = ICONS[route.id]
              const color = ROUTE_META[route.id].color
              const current = pathname === route.path
              return (
                <Link
                  key={route.id}
                  to={route.path}
                  onClick={() => setMenuOpen(false)}
                  aria-current={current ? 'page' : undefined}
                  className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 text-base font-semibold ${
                    current ? 'bg-navy-900/[0.04] text-navy-950' : 'text-navy-800'
                  }`}
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: `${color}1a`, color }}>
                    <Icon className="h-[17px] w-[17px]" />
                  </span>
                  {route.label}
                </Link>
              )
            })}
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  )
}
