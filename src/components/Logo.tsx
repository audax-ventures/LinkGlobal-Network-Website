interface LogoProps {
  variant?: 'dark' | 'reversed'
  markOnly?: boolean
  className?: string
}

/**
 * Traced from the mark used in the real product (visible in the platform
 * screenshots, e.g. public/gallery/dashboard.png top-left): a solid black
 * chat-bubble circle with a curled tail, a crisp white gap ring, and a blue
 * globe — a classic latitude/longitude grid plus a continent silhouette,
 * matching the globe glyph style the client specifically referenced — paired
 * with the "Link"/"Global" wordmark. `variant="reversed"` swaps the bubble to
 * white and the gap ring to dark for use on dark backgrounds.
 */
export default function Logo({ variant = 'dark', markOnly = false, className = '' }: LogoProps) {
  const isReversed = variant === 'reversed'
  const bubbleFill = isReversed ? '#ffffff' : '#0b0d12'
  const gapFill = isReversed ? '#0b0d12' : '#ffffff'
  const globalTextFill = isReversed ? '#ffffff' : '#0b0d12'
  const linkTextFill = '#1ba3e0'
  const globeFill = '#1ba3e0'

  return (
    <svg
      viewBox={markOnly ? '0 0 64 64' : '0 0 232 64'}
      className={className}
      role="img"
      aria-label="LinkGlobal Network"
    >
      <g id="lg-mark">
        <path
          d="M17.5,40.5c-3,4.6-7.7,8.2-13,10.8 5.6-1.3 10.9-3.8 15.2-7.4-.9-1.1-1.6-2.2-2.2-3.4Z"
          fill={bubbleFill}
        />
        <circle cx="32" cy="29" r="22" fill={bubbleFill} />
        <circle cx="32" cy="29" r="18.5" fill={gapFill} />
        <circle cx="32" cy="29" r="16.5" fill={globeFill} />
        <ellipse cx="32" cy="29" rx="16.5" ry="6.2" fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="0.75" />
        <ellipse cx="32" cy="29" rx="6.2" ry="16.5" fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="0.75" />
        <circle cx="32" cy="29" r="16.5" fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="0.75" />
        <path
          d="M22.5,21c2.4-2.2,5-1,6.4.6,1,1.1,2.6.9,3.6-.2,1.6-1.8,4.6-2.6,6.8-.6,1.7,1.6,1,3.8-.6,4.6-2,1-2,2.8-.4,3.8,2.1,1.3,2.3,4,.4,5.6-1.6,1.3-1,3.2.6,3.8,1.8.7,2,2.6.6,3.8-1.9,1.6-5.2,1.4-6.8-.4-1-1.1-2.6-1-3.6,0-1.6,1.6-4.6,1.8-6.4-.2-1.5-1.7-.7-3.6,1-4.2,1.8-.7,1.8-2.6.2-3.8-2-1.5-2-4.1,0-5.6,1.6-1.2,1.4-3-.4-3.8-1.6-.7-1.9-2.4-1.4-3.4Z"
          fill="#ffffff"
          fillOpacity="0.95"
        />
      </g>
      {!markOnly && (
        <g id="lg-wordmark" fontFamily="Inter, system-ui, sans-serif" fontWeight="800">
          <text x="70" y="40" fontSize="30" fill={linkTextFill} letterSpacing="-0.5">
            Link
          </text>
          <text x="141" y="40" fontSize="30" fill={globalTextFill} letterSpacing="-0.5">
            Global
          </text>
        </g>
      )}
    </svg>
  )
}
