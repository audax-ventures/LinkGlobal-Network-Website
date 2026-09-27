import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import Logo from '../Logo'
import { createGlobeBackground } from '../../lib/globeBackground'

// Homepage intro. Unlike the old full-screen overlay, this is a real section
// at the top of the page, directly above the hero:
//  - First visit this session: the brand plays for ~3.2s, then the page
//    glides down to the hero (a slow eased scroll), so the intro drifts up
//    and away with a parallax fade instead of cutting.
//  - Visitors can scroll/swipe back up from the hero to see it again.
//  - Already seen this session (or arriving from another page): land on the
//    hero with the intro just above.
// While the intro fills the screen, <html data-intro="on"> hides the nav and
// chat launcher (see .lg-hide-on-intro in index.css).
//
// ?intro=1 forces the auto-play; ?debugPhase=done skips straight to the hero.

const GREETINGS = ['Hello', 'Hola', 'Bonjour', 'こんにちは', 'Olá', 'مرحبا', 'Namaste']
const WORD = 'LinkGlobal'
const SEEN_KEY = 'lg-intro-seen'

const GREETINGS_START_MS = 600
const FIRST_RUN_STEP_MS = 380 // quick run on first play
const IDLE_STEP_MS = 1400 // gentle cycling when someone scrolls back up
const AUTOPLAY_MS = 3200 // then glide to the hero
const GLIDE_MS = 1600
const RAMP_BG = 'linear-gradient(180deg, #02070f 0%, #0b1f3a 22%, #3a6698 50%, #b9d3ee 78%, #f8fbff 100%)'

function readSeen() {
  try {
    return !!window.sessionStorage.getItem(SEEN_KEY)
  } catch {
    return false
  }
}
function markSeen() {
  try {
    window.sessionStorage.setItem(SEEN_KEY, '1')
  } catch {
    // Non-essential.
  }
}

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

export default function IntroSection() {
  const reduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const rampRef = useRef<HTMLDivElement>(null)
  const globeRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const glideRef = useRef<{ cancel: () => void } | null>(null)
  const inView = useInView(sectionRef, { amount: 0.25 })

  const [autoplay] = useState(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('debugPhase') === 'done') return false
    if (params.get('intro') === '1') return true
    return !readSeen()
  })
  const [greeting, setGreeting] = useState<number | null>(autoplay && !reduced ? null : 0)
  const [firstRunDone, setFirstRunDone] = useState(!autoplay || !!reduced)

  const heroTop = () => {
    const ramp = rampRef.current
    return ramp ? ramp.offsetTop + ramp.offsetHeight : window.innerHeight
  }

  // Slow eased scroll to the hero. Cancelled by any user scroll input so it
  // never fights the visitor; a timeout guarantees it lands even if animation
  // frames are throttled (background tab).
  const glideToHero = () => {
    glideRef.current?.cancel()
    markSeen()
    const from = window.scrollY
    const to = heroTop()
    if (reduced || Math.abs(to - from) < 2) {
      window.scrollTo(0, to)
      return
    }
    let raf = 0
    let done = false
    const start = performance.now()
    const stop = () => {
      done = true
      cancelAnimationFrame(raf)
      window.clearTimeout(fallback)
      window.removeEventListener('wheel', stop)
      window.removeEventListener('touchstart', stop)
      window.removeEventListener('keydown', stop)
      glideRef.current = null
    }
    const step = (now: number) => {
      if (done) return
      const t = Math.min((now - start) / GLIDE_MS, 1)
      window.scrollTo(0, from + (to - from) * easeInOutCubic(t))
      if (t < 1) raf = requestAnimationFrame(step)
      else stop()
    }
    const fallback = window.setTimeout(() => {
      if (!done) {
        window.scrollTo(0, to)
        stop()
      }
    }, GLIDE_MS + 600)
    window.addEventListener('wheel', stop, { passive: true })
    window.addEventListener('touchstart', stop, { passive: true })
    window.addEventListener('keydown', stop)
    glideRef.current = { cancel: stop }
    raf = requestAnimationFrame(step)
  }

  // Globe (Riley's supplied animation). It pauses itself when off-screen.
  useEffect(() => {
    if (!globeRef.current) return
    return createGlobeBackground(globeRef.current, { brightness: 0.85, speed: 1.4, scale: 0.95, longitude: -40 })
  }, [])

  // Entry: auto-play from the top, or land on the hero.
  useEffect(() => {
    // Wait a frame so the route-change scroll reset (ScrollToTop) runs first.
    const raf = requestAnimationFrame(() => {
      if (autoplay) window.scrollTo(0, 0)
      else if (window.scrollY < heroTop() - 2) window.scrollTo(0, heroTop())
    })
    if (!autoplay) return () => cancelAnimationFrame(raf)

    // If the visitor scrolls on their own during the intro, respect that:
    // cancel the auto-glide and let them move freely.
    let userMoved = false
    const onUserInput = () => {
      userMoved = true
      markSeen()
    }
    window.addEventListener('wheel', onUserInput, { passive: true })
    window.addEventListener('touchmove', onUserInput, { passive: true })
    const t = window.setTimeout(() => {
      if (!userMoved && window.scrollY < 10) glideToHero()
    }, reduced ? 1600 : AUTOPLAY_MS)
    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(t)
      window.removeEventListener('wheel', onUserInput)
      window.removeEventListener('touchmove', onUserInput)
      glideRef.current?.cancel()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Greetings: quick first run, then a gentle loop while the intro is visible.
  useEffect(() => {
    if (reduced) return
    if (!firstRunDone) {
      const timers = GREETINGS.map((_, i) =>
        window.setTimeout(() => setGreeting(i), GREETINGS_START_MS + i * FIRST_RUN_STEP_MS),
      )
      timers.push(
        window.setTimeout(() => setFirstRunDone(true), GREETINGS_START_MS + GREETINGS.length * FIRST_RUN_STEP_MS),
      )
      return () => timers.forEach((t) => window.clearTimeout(t))
    }
    if (!inView) return
    const id = window.setInterval(() => setGreeting((g) => ((g ?? -1) + 1) % GREETINGS.length), IDLE_STEP_MS)
    return () => window.clearInterval(id)
  }, [firstRunDone, inView, reduced])

  // Parallax as the page scrolls past the intro: the content drifts up more
  // slowly than the page and fades, so it "slides away" gently.
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const section = sectionRef.current
      if (!section) return
      const h = section.offsetHeight || 1
      const p = Math.min(Math.max(window.scrollY / h, 0), 1)
      if (contentRef.current) {
        contentRef.current.style.transform = `translateY(${p * h * 0.35}px)`
        contentRef.current.style.opacity = `${Math.max(1 - p * 1.4, 0)}`
      }
      if (globeRef.current) globeRef.current.style.transform = `translateY(${p * h * 0.2}px)`
      document.documentElement.dataset.intro = p < 0.55 ? 'on' : 'off'
      document.documentElement.dataset.heroTop = String(heroTop())
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (frame) cancelAnimationFrame(frame)
      delete document.documentElement.dataset.intro
      delete document.documentElement.dataset.heroTop
    }
  }, [])

  return (
    <>
      <section
        ref={sectionRef}
        className="relative flex h-[100svh] min-h-[480px] select-none flex-col items-center justify-center overflow-hidden px-6 text-center"
        style={{ background: '#02070f' }}
        aria-label="LinkGlobal Network intro"
      >
        {/* Globe fills the section; a soft dark vignette in the centre keeps
            the wordmark and greetings readable. Opacity-only entrance: the
            globe script sizes its canvas from getBoundingClientRect, so a
            scale transform on this box would draw it off-centre. */}
        <motion.div
          ref={globeRef}
          className="pointer-events-none absolute inset-0"
          initial={autoplay && !reduced ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 55% 45% at 50% 50%, rgba(2,7,15,0.72) 0%, rgba(2,7,15,0.35) 60%, rgba(2,7,15,0) 100%)' }}
          aria-hidden="true"
        />

        <div ref={contentRef} className="relative flex flex-col items-center will-change-transform">
          <motion.div
            initial={autoplay && !reduced ? { opacity: 0, scale: 0.8 } : false}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <Logo variant="reversed" markOnly className="h-24 w-24 sm:h-32 sm:w-32" />
          </motion.div>

          <div className="mt-6 text-4xl font-extrabold uppercase tracking-[0.12em] sm:text-7xl" aria-hidden="true">
            {WORD.split('').map((ch, i) => (
              <motion.span
                key={i}
                className={i < 4 ? 'text-brand-blue' : 'text-white'}
                style={{ display: 'inline-block' }}
                initial={autoplay && !reduced ? { opacity: 0, y: 18 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                {ch}
              </motion.span>
            ))}
          </div>
          <motion.p
            className="mt-2 text-sm font-semibold uppercase tracking-[0.6em] text-white/60 sm:text-base"
            initial={autoplay && !reduced ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            aria-hidden="true"
          >
            Network
          </motion.p>

          {/* Greetings. Fixed height so nothing shifts. */}
          <div className="relative mt-8 h-8 w-full sm:h-9" aria-hidden="true">
            <AnimatePresence initial={false}>
              {greeting !== null && (
                <motion.p
                  key={greeting}
                  className="absolute inset-x-0 text-xl font-semibold text-brand-cyan sm:text-2xl"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: firstRunDone ? 0.4 : 0.15 }}
                >
                  {GREETINGS[greeting]}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        <p className="absolute bottom-6 left-5 hidden text-[11px] font-medium uppercase tracking-[0.3em] text-white/50 sm:bottom-8 sm:left-8 sm:block">
          40+ languages · 120+ countries
        </p>

        {/* Scroll cue — also the way on for anyone who scrolled back up. */}
        <button
          type="button"
          onClick={glideToHero}
          className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/60 transition-colors hover:text-white sm:bottom-8"
        >
          {autoplay && !firstRunDone ? 'Skip' : 'Explore'}
          <svg className="h-5 w-5 animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>

        {/* Progress bar during the first auto-play only. */}
        {autoplay && (
          <motion.div
            className="absolute bottom-0 left-0 h-[3px] bg-brand-blue"
            style={{ boxShadow: '0 0 12px rgba(27,163,224,0.8)' }}
            initial={{ width: '0%', opacity: 1 }}
            animate={{ width: '100%', opacity: firstRunDone ? 0 : 1 }}
            transition={{ width: { duration: AUTOPLAY_MS / 1000, ease: 'linear' }, opacity: { duration: 0.6, delay: 0.4 } }}
            aria-hidden="true"
          />
        )}
      </section>

      {/* Dark-to-light blend into the hero, so the hand-off isn't a hard edge. */}
      <div ref={rampRef} className="pointer-events-none h-32 sm:h-40" style={{ background: RAMP_BG }} aria-hidden="true" />
    </>
  )
}
