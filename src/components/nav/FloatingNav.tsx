import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import Logo from '../Logo'
import { NAV_ROUTES } from '../../routes'
import SmartLink from '../SmartLink'
import { LEARNER_SIGNUP_URL } from '../../content/site'
import Photo from '../Photo'
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
  home: { color: '#1ba3e0', image: '/photos/friends-laptop.jpg', blurb: 'Learn the language. Own the conversation.' },
  learners: { color: '#a78bfa', image: '/photos/learner-headphones.jpg', blurb: 'Made for language learners.' },
  educators: { color: '#f472b6', image: '/photos/educator-video-lesson.jpg', blurb: 'For educators who want to teach, not prepare.' },
  'for-you': { color: '#2dd4bf', image: '/photos/cafe-conversation.jpg', blurb: 'For native speakers who want to share their language.' },
  about: { color: '#f5a623', image: '/photos/team-meeting-flipchart.jpg', blurb: 'The story behind LinkGlobal.' },
  pricing: { color: '#1ba3e0', image: '/photos/professional-video-call.jpg', blurb: 'Simple, flexible pricing.' },
  contact: { color: '#f5a623', image: '/photos/learner-sofa.jpg', blurb: 'Questions? We are here to help.' },
}

const MotionLink = motion(Link)

/** Lighten (amount > 0) or darken (amount < 0) a #rrggbb colour. */
function shade(hex: string, amount: number) {
  const n = parseInt(hex.slice(1), 16)
  const ch = (v: number) => Math.round(amount < 0 ? v * (1 + amount) : v + (255 - v) * amount)
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map(ch)
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`
}

function NavCircle({ label, path, Icon, id, index }: { label: string; path: string; Icon: typeof HomeIcon; id: string; index: number }) {
  const [hovered, setHovered] = useState(false)
  const meta = ROUTE_META[id]

  return (
    <div
      className="relative flex items-center justify-center [perspective:400px]"
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
                <Photo src={meta.image} alt="" sizes="240px" className="h-full w-full object-cover" />
                <div
                  className="absolute inset-0"
                  style={{ background: `linear-gradient(180deg, transparent 40%, ${meta.color}cc 100%)` }}
                />
                <span className="absolute bottom-2 left-2.5 text-sm font-bold text-white drop-shadow">{label}</span>
              </div>
              <p className="px-2.5 py-2 text-sm leading-snug text-navy-700/75">{meta.blurb}</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* Final changes (Nov 2026): 3D, animated page symbols. Each is a glossy
          sphere in the page's colour (light from the top left, inner shade
          at the bottom), floating gently on a stagger; on hover it lifts,
          tilts towards the pointer side and the icon gives a little wiggle. */}
      <MotionLink
        to={path}
        aria-label={label}
        animate={{ y: [0, -2.5, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: index * 0.35 }}
        whileHover={{ y: -4, scale: 1.12, rotateX: 14, rotateY: -14 }}
        whileTap={{ scale: 0.94 }}
        className="relative flex h-11 w-11 items-center justify-center rounded-full text-white [transform-style:preserve-3d]"
        style={{
          background: `radial-gradient(circle at 30% 25%, rgba(255,255,255,0.75) 0%, ${meta.color} 42%, ${shade(meta.color, -0.32)} 100%)`,
          boxShadow: `0 ${hovered ? 12 : 6}px ${hovered ? 22 : 14}px ${meta.color}${hovered ? '80' : '55'}, inset 0 -3px 6px rgba(0,0,0,0.18), inset 0 2px 3px rgba(255,255,255,0.55)`,
          transition: 'box-shadow .3s',
        }}
      >
        <motion.span
          className="flex drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]"
          animate={hovered ? { rotate: [0, -14, 12, -6, 0], scale: [1, 1.15, 1] } : { rotate: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Icon className="h-[18px] w-[18px]" />
        </motion.span>
      </MotionLink>
    </div>
  )
}

export default function FloatingNav() {
  // The nav stays on screen while scrolling (Riley, Oct 2026; it used to
  // slide away on scroll-down). Once the page moves past its top it gets a
  // frosted white backdrop, so the dark logo and icons stay readable over the
  // navy sections. On Home the "top" is the hero, which sits below the intro
  // (IntroSection publishes its offset as data-hero-top).
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const top = Number(document.documentElement.dataset.heroTop || 0)
      setScrolled(window.scrollY > top + 24)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Phones: the seven icon chips don't fit (they ran off-screen), so below
  // md the nav is logo + compact Start Your Journey + a menu button.
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => setMenuOpen(false), [pathname])

  return (
    <div
      className={`lg-hide-on-intro fixed inset-x-0 top-0 z-40 px-5 py-4 transition-[background-color,box-shadow,backdrop-filter,padding] duration-300 sm:px-8 ${
        scrolled ? 'bg-white/85 py-3 shadow-[0_6px_24px_rgba(19,41,82,0.08)] backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <Link to="/" aria-label="LinkGlobal home" className="shrink-0">
          <Logo variant="dark" className="h-8 w-auto sm:h-9" />
        </Link>
        <div className="hidden items-center gap-2.5 md:flex">
          {NAV_ROUTES.map((route, i) => (
            <NavCircle key={route.id} id={route.id} label={route.label} path={route.path} Icon={ICONS[route.id]} index={i} />
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
            className="rounded-full px-3.5 py-2 text-sm font-semibold text-white shadow-[0_6px_18px_rgba(30,120,190,0.3)]"
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
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-full text-white"
                    style={{
                      background: `radial-gradient(circle at 30% 25%, rgba(255,255,255,0.75) 0%, ${color} 42%, ${shade(color, -0.32)} 100%)`,
                      boxShadow: `0 4px 10px ${color}55, inset 0 -2px 4px rgba(0,0,0,0.18), inset 0 2px 3px rgba(255,255,255,0.55)`,
                    }}
                  >
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
