import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Logo from '../Logo'

interface LogoIntroProps {
  onComplete: () => void
  durationSeconds?: number
}

/**
 * Beat 1 of the loading sequence: the LinkGlobal mark fades in, spins on its
 * axis with a subtle scale pulse, then hands off to Beat 2. Fixed timer only —
 * not click/scroll skippable, per spec.
 */
export default function LogoIntro({ onComplete, durationSeconds = 2.6 }: LogoIntroProps) {
  const logoWrapRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const logoWrap = logoWrapRef.current
    if (!logoWrap) return

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.4,
          ease: 'power1.inOut',
          onComplete,
        })
      },
    })

    tl.set(logoWrap, { opacity: 0, scale: 0.6, rotateY: -40 })
    tl.to(logoWrap, {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      duration: 0.7,
      ease: 'back.out(1.6)',
    })
    tl.to(
      logoWrap,
      {
        rotateY: 360,
        duration: durationSeconds - 0.7,
        ease: 'power1.inOut',
      },
      '<',
    )
    tl.to(
      logoWrap,
      {
        scale: 1.08,
        duration: (durationSeconds - 0.7) / 2,
        yoyo: true,
        repeat: 1,
        ease: 'sine.inOut',
      },
      '<',
    )

    return () => {
      tl.kill()
    }
  }, [durationSeconds, onComplete])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[60] flex items-center justify-center overflow-hidden"
      style={{
        background:
          'radial-gradient(circle at 50% 40%, #0e1c3d 0%, #0a1128 45%, #030407 100%)',
      }}
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(circle at 30% 70%, rgba(62,198,255,0.15), transparent 55%), radial-gradient(circle at 70% 25%, rgba(62,198,255,0.12), transparent 50%)',
        }}
      />
      <div style={{ perspective: 900 }} className="relative">
        <div ref={logoWrapRef} style={{ transformStyle: 'preserve-3d' }} className="drop-shadow-[0_0_30px_rgba(62,198,255,0.45)]">
          <Logo variant="reversed" className="w-56 sm:w-64 h-auto" />
        </div>
      </div>
    </div>
  )
}
