import { Suspense, useEffect, useRef } from 'react'
import gsap from 'gsap'
import LazyStylizedGlobe from '../LazyStylizedGlobe'
import LaptopMockup from './LaptopMockup'
import { useViewportSize } from '../../hooks/useViewportSize'
import { COUNTRY_GREETINGS } from '../../data/countryGreetings'

interface SpinningWorldProps {
  onDismiss: () => void
}

const SCROLL_THRESHOLD = 4

export default function SpinningWorld({ onDismiss }: SpinningWorldProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const hintRef = useRef<HTMLDivElement>(null)
  const dismissedRef = useRef(false)
  const { width, height } = useViewportSize()
  // Floor guards against a 0x0 (invisible) canvas on the first render, before
  // the real viewport size is known. Sized a bit smaller than before (and
  // against height*0.5 rather than 0.62) to leave room for the static logo
  // stacked above it.
  const globeSize = Math.max(Math.min(width * 0.75, height * 0.5, 440), 240)

  useEffect(() => {
    const wrap = containerRef.current
    // Fade in the logo/globe/hint content, not the container — the
    // container's opaque background must already be fully visible on the
    // very first paint, or the homepage underneath flashes through.
    gsap.fromTo(contentRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power1.out' })

    const hintTl = gsap.to(hintRef.current, {
      y: 8,
      opacity: 0.5,
      duration: 1.1,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
    })

    const dismiss = () => {
      if (dismissedRef.current) return
      dismissedRef.current = true
      hintTl.kill()
      gsap.to(wrap, {
        opacity: 0,
        scale: 1.05,
        filter: 'blur(6px)',
        duration: 0.7,
        ease: 'power2.inOut',
        onComplete: onDismiss,
      })
    }

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > SCROLL_THRESHOLD) {
        e.preventDefault()
        dismiss()
      }
    }

    let touchStartY = 0
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
    }
    const onTouchMove = (e: TouchEvent) => {
      const delta = touchStartY - e.touches[0].clientY
      if (Math.abs(delta) > SCROLL_THRESHOLD) {
        e.preventDefault()
        dismiss()
      }
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: false })

    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      hintTl.kill()
    }
  }, [onDismiss])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'radial-gradient(circle at 50% 40%, #ffffff 0%, #eaf5ff 55%, #d6ecff 100%)',
      }}
    >
      {/* Plain wrapper (not display:contents — that would make the opacity
          fade-in a no-op, since contents removes the element's own box). */}
      <div ref={contentRef} className="flex flex-col items-center gap-5 sm:gap-8 px-6">
        <div className="text-center max-w-xl">
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-navy-950">
            Welcome to LinkGlobal Network
          </h1>
          <p className="mt-2 text-sm sm:text-base text-navy-700/80">
            The platform that connects learners with real, native-speaking tutors — in over
            120 countries.
          </p>
        </div>

        <div className="relative flex items-center justify-center gap-8">
          <LaptopMockup
            src="/gallery/dashboard.png"
            alt="LinkGlobal Network learner dashboard"
            className="hidden xl:block w-[350px] -rotate-2 2xl:w-[420px]"
          />

          <Suspense fallback={<div style={{ width: globeSize, height: globeSize }} />}>
            <LazyStylizedGlobe width={globeSize} height={globeSize} greetings={COUNTRY_GREETINGS} />
          </Suspense>

          <LaptopMockup
            src="/gallery/practice-report.png"
            alt="LinkGlobal Network AI practice session report"
            className="hidden xl:block w-[350px] rotate-2 2xl:w-[420px]"
          />
        </div>

        <div
          ref={hintRef}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-navy-700"
        >
          <span className="text-lg sm:text-xl uppercase tracking-[0.3em] font-bold">Scroll to continue</span>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  )
}
