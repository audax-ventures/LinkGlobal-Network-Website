import { useEffect, useRef } from 'react'
import { ensureGsapPlugins, gsap, ScrollTrigger } from '../../lib/gsapSetup'

interface CountUpStatProps {
  value: number
  suffix?: string
  decimals?: number
  label: string
}

export default function CountUpStat({ value, suffix = '', decimals = 0, label }: CountUpStatProps) {
  const numberRef = useRef<HTMLSpanElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ensureGsapPlugins()
    const el = numberRef.current
    const wrap = wrapRef.current
    if (!el || !wrap) return

    const counter = { val: 0 }
    const trigger = ScrollTrigger.create({
      trigger: wrap,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(counter, {
          val: value,
          duration: 1.6,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = counter.val.toFixed(decimals)
          },
        })
        gsap.fromTo(wrap, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
      },
    })

    return () => trigger.kill()
  }, [value, decimals])

  return (
    <div
      ref={wrapRef}
      className="flex flex-col items-center rounded-2xl bg-white px-4 py-5 text-center opacity-0 shadow-[0_15px_35px_rgba(19,41,82,0.1)]"
    >
      <span className="text-3xl sm:text-4xl font-extrabold text-navy-950">
        <span ref={numberRef}>0</span>
        {suffix}
      </span>
      <span className="mt-1 text-xs sm:text-sm uppercase tracking-[0.2em] text-navy-700/70">{label}</span>
    </div>
  )
}
