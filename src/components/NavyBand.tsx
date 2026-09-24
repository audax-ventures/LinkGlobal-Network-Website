import type { ReactNode } from 'react'

// Full-width navy section in the style of the homepage's "How it works"
// Loop: solid #081b33 with soft fades in from / out to the light page, so
// dark and light sections flow into each other instead of hard-cutting.
// Content inside should use white text and cyan (brand-cyan) eyebrows.

export const NAVY = '#081b33'
const LIGHT = '#f8fbff'

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
          style={{ background: `linear-gradient(180deg, ${LIGHT} 0%, rgba(27,99,170,0.22) 50%, ${NAVY} 100%)` }}
          aria-hidden="true"
        />
      )}
      <section className={`relative px-6 ${className}`} style={{ background: NAVY }}>
        {children}
      </section>
      {fadeOut && (
        <div
          className="pointer-events-none h-28 sm:h-36"
          style={{ background: `linear-gradient(180deg, ${NAVY} 0%, rgba(27,99,170,0.22) 50%, ${LIGHT} 100%)` }}
          aria-hidden="true"
        />
      )}
    </>
  )
}

export function NavyEyebrow({ children }: { children: ReactNode }) {
  return <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-cyan">{children}</p>
}
