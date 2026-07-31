import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ensureGsapPlugins, gsap, ScrollTrigger } from '../../lib/gsapSetup'

/**
 * Soft, restrained decorative accents only — no opaque background layer here.
 * The actual page background is one continuous gradient set on <main> in
 * App.tsx, so every section (including this one) only ever adds translucent
 * accents on top of it, never covers it.
 */
export default function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const parallaxRef = useRef<HTMLDivElement>(null)
  const inView = useInView(containerRef, { margin: '200px 0px 200px 0px' })

  useEffect(() => {
    ensureGsapPlugins()
    const el = parallaxRef.current
    const section = containerRef.current?.closest('section')
    if (!el || !section) return

    // The background accents lag behind the page's own scroll — a small
    // parallax touch so leaving the hero reads as depth pulling through
    // into the next section, rather than a hard cut.
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom top',
      scrub: 0.6,
      onUpdate: (self) => {
        gsap.set(el, { y: self.progress * 120 })
      },
    })

    return () => trigger.kill()
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div ref={parallaxRef}>
        <motion.div
          className="absolute -left-40 top-0 h-[420px] w-[420px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(62,198,255,0.18), transparent 70%)' }}
          animate={inView ? { x: [0, 30, 0], y: [0, 20, 0] } : { x: 0, y: 0 }}
          transition={{ duration: 20, repeat: inView ? Infinity : 0, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute right-[-160px] top-1/4 h-[480px] w-[480px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(143,224,255,0.16), transparent 70%)' }}
          animate={inView ? { x: [0, -30, 0], y: [0, -20, 0] } : { x: 0, y: 0 }}
          transition={{ duration: 24, repeat: inView ? Infinity : 0, ease: 'easeInOut' }}
        />
      </div>
    </div>
  )
}
