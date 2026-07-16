import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import StylizedGlobe, { type GlobeLabel } from '../StylizedGlobe'
import { useViewportSize } from '../../hooks/useViewportSize'

interface SpinningWorldProps {
  onDismiss: () => void
}

const GREETINGS: GlobeLabel[] = [
  { text: 'Hola', lat: 40, lng: -3 },
  { text: 'Bonjour', lat: 46, lng: 2 },
  { text: '你好', lat: 34, lng: 108 },
  { text: 'こんにちは', lat: 36, lng: 138 },
  { text: 'Ciao', lat: 42, lng: 12 },
  { text: 'Hallo', lat: 51, lng: 10 },
  { text: 'مرحبا', lat: 24, lng: 45 },
]

const SCROLL_THRESHOLD = 4

export default function SpinningWorld({ onDismiss }: SpinningWorldProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const hintRef = useRef<HTMLDivElement>(null)
  const dismissedRef = useRef(false)
  const { width, height } = useViewportSize()
  const globeSize = Math.min(width * 0.82, height * 0.62, 560)

  useEffect(() => {
    const wrap = containerRef.current
    gsap.fromTo(wrap, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power1.out' })

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
        background: 'linear-gradient(160deg, #030407 0%, #0a1128 55%, #132952 100%)',
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(62,198,255,0.14), transparent 60%)',
        }}
      />
      <div className="relative flex items-center justify-center">
        <StylizedGlobe width={globeSize} height={globeSize} labels={GREETINGS} />
      </div>

      <div ref={hintRef} className="absolute bottom-12 flex flex-col items-center gap-2 text-brand-light/80">
        <span className="text-xs uppercase tracking-[0.25em] font-medium">Scroll to continue</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  )
}
