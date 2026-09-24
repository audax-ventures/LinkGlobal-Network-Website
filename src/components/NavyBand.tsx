import type { ReactNode } from 'react'

// Full-width navy section in the style of the homepage's "How it works"
// Loop: solid #081b33 with soft fades in from / out to the light page, so
// dark and light sections flow into each other instead of hard-cutting.
// Content inside should use white text and cyan (brand-cyan) eyebrows.

export const NAVY = '#081b33'
const LIGHT = '#f8fbff'
// Solid blue stops (not a translucent midpoint, which read as grey banding).
const RAMP = '#f8fbff 0%, #d6e8f8 22%, #8fb6dc 45%, #3a6698 68%, #14325a 86%, #081b33 100%'
const RAMP_UP = '#081b33 0%, #14325a 14%, #3a6698 32%, #8fb6dc 55%, #d6e8f8 78%, #f8fbff 100%'

interface NavyBandProps {
  children: ReactNode
  className?: string
  fadeIn?: boolean
  fadeOut?: boolean
}

export default function NavyBand({ children, className = '', fadeIn = true, fadeOut = true }: NavyBandProps) {
  return (
    <>
      {fadeIn && (
        <div
          className="pointer-events-none h-28 sm:h-36"
          style={{ background: `linear-gradient(180deg, ${RAMP})` }}
          aria-hidden="true"
        />
      )}
      <section className={`relative px-6 ${className}`} style={{ background: NAVY }}>
        {children}
      </section>
      {fadeOut && (
        <div
          className="pointer-events-none h-28 sm:h-36"
          style={{ background: `linear-gradient(180deg, ${RAMP_UP})` }}
          aria-hidden="true"
        />
      )}
    </>
  )
}

export function NavyEyebrow({ children }: { children: ReactNode }) {
  return <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-cyan">{children}</p>
}
