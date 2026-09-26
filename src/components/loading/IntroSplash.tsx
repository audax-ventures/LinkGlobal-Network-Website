import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Logo from '../Logo'
import { createGlobeBackground } from '../../lib/globeBackground'

// Brand intro (modelled on the Avid Golf splash the client liked): navy
// screen, spinning logo mark, letter-by-letter wordmark, then a run of
// greetings while a thin progress bar fills.
// Ends on its own, or immediately on Skip / click / key / scroll.

interface IntroSplashProps {
  onDismiss: () => void
}

const GREETINGS = ['Hello', 'Hola', 'Bonjour', 'こんにちは', 'Olá', 'مرحبا', 'Namaste']
const WORD = 'LinkGlobal'

// Whole intro is ~4s: auto-exit starts at 3.4s, then a 0.6s fade.
// The last greeting stays up until the exit.
const GREETINGS_START_MS = 600
const GREETING_MS = 380
const TOTAL_MS = 3400
const REDUCED_TOTAL_MS = 1200
const EXIT_S = 0.6

export default function IntroSplash({ onDismiss }: IntroSplashProps) {
  const reduced = useReducedMotion()
  const total = reduced ? REDUCED_TOTAL_MS : TOTAL_MS
  const [greeting, setGreeting] = useState<number | null>(reduced ? 0 : null)
  const [exiting, setExiting] = useState(false)
  const finishedRef = useRef(false)
  const globeRef = useRef<HTMLDivElement>(null)

  // Animated globe behind the brand mark (Riley's supplied animation).
  useEffect(() => {
    if (!globeRef.current) return
    return createGlobeBackground(globeRef.current, { brightness: 0.85, speed: 1.4, scale: 0.95, longitude: -40 })
  }, [])

  const finish = () => {
    if (finishedRef.current) return
    finishedRef.current = true
    onDismiss()
  }

  const exit = () => setExiting(true)

  // Timeline: greetings → auto-exit.
  useEffect(() => {
    if (reduced) {
      const t = window.setTimeout(exit, total)
      return () => window.clearTimeout(t)
    }
    const timers: number[] = []
    GREETINGS.forEach((_, i) => {
      timers.push(window.setTimeout(() => setGreeting(i), GREETINGS_START_MS + i * GREETING_MS))
    })
    timers.push(window.setTimeout(exit, total))
    return () => timers.forEach((t) => window.clearTimeout(t))
  }, [reduced, total])

  // Skip on any deliberate input. Scroll input is swallowed while the intro
  // is up (the page underneath shouldn't move) and just ends the intro.
  useEffect(() => {
    if (exiting) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') return
      exit()
    }
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      exit()
    }
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      exit()
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchmove', onTouchMove)
    }
  }, [exiting])

  // Safety net: background tabs can throttle animation frames, so never rely
  // on the exit animation's completion callback alone.
  useEffect(() => {
    if (!exiting) return
    const t = window.setTimeout(finish, EXIT_S * 1000 + 400)
    return () => window.clearTimeout(t)
  }, [exiting])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex cursor-pointer select-none flex-col items-center justify-center overflow-hidden px-6 text-center"
      style={{ background: '#02070f' }}
      animate={exiting ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: EXIT_S, ease: [0.65, 0, 0.35, 1] }}
      onAnimationComplete={() => {
        if (exiting) finish()
      }}
      onClick={exit}
      role="dialog"
      aria-label="LinkGlobal Network intro"
    >
      {/* Globe fills the screen; a soft dark vignette in the centre keeps the
          wordmark and greetings readable over the coastlines. */}
      <motion.div
        ref={globeRef}
        className="pointer-events-none absolute inset-0"
        // Opacity only: the globe script sizes itself from getBoundingClientRect,
        // so a scale transform here would bake an off-centre globe into the canvas.
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 55% 45% at 50% 50%, rgba(2,7,15,0.72) 0%, rgba(2,7,15,0.35) 60%, rgba(2,7,15,0) 100%)' }}
        aria-hidden="true"
      />

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          exit()
        }}
        className="absolute right-5 top-5 rounded-md border border-white/30 px-3.5 py-2 text-xs font-medium text-white/80 transition-colors hover:border-white/70 hover:text-white sm:right-8 sm:top-8"
      >
        Skip intro
      </button>

      <motion.div
        className="relative flex flex-col items-center"
        animate={exiting ? { y: -24, scale: 0.97 } : { y: 0, scale: 1 }}
        transition={{ duration: EXIT_S, ease: [0.65, 0, 0.35, 1] }}
      >
        <motion.div
          initial={reduced ? false : { opacity: 0, scale: 0.8 }}
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
              initial={reduced ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              aria-hidden="true"
            >
              {ch}
            </motion.span>
          ))}
        </div>
        <motion.p
          className="mt-2 text-sm font-semibold uppercase tracking-[0.6em] text-white/60 sm:text-base"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          aria-hidden="true"
        >
          Network
        </motion.p>

        {/* Greeting run. Fixed height so nothing shifts. */}
        <div className="relative mt-8 h-8 w-full sm:h-9" aria-live="polite">
          <AnimatePresence initial={false}>
            {greeting !== null && (
              <motion.p
                key={greeting}
                className="absolute inset-x-0 text-xl font-semibold text-brand-cyan sm:text-2xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
              >
                {GREETINGS[greeting]}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <p className="absolute bottom-6 left-5 text-[11px] font-medium uppercase tracking-[0.3em] text-white/50 sm:bottom-8 sm:left-8">
        40+ languages · 120+ countries
      </p>

      {/* Progress bar along the bottom edge, filling over the intro's length. */}
      <motion.div
        className="absolute bottom-0 left-0 h-[3px] bg-brand-blue"
        style={{ boxShadow: '0 0 12px rgba(27,163,224,0.8)' }}
        initial={{ width: '0%' }}
        animate={{ width: '100%' }}
        transition={{ duration: total / 1000, ease: 'linear' }}
        aria-hidden="true"
      />
    </motion.div>
  )
}
