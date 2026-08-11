interface LogoProps {
  variant?: 'dark' | 'reversed'
  markOnly?: boolean
  className?: string
}

/**
 * Traced from the mark used in the real product (visible in the platform
 * screenshots, e.g. public/gallery/dashboard.png top-left): a solid black
 * chat-bubble circle with a curled tail, a crisp white gap ring, and a blue
 * globe with a rounded two-piece continent silhouette — paired with the
 * "Link"/"Global" wordmark. `variant="reversed"` swaps the bubble to white
 * and the gap ring to dark for use on dark backgrounds.
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
          d="M17.5,39.5c-3,4.6-7.7,8.2-13,10.8 5.6-1.3 10.9-3.8 15.2-7.4-.9-1.1-1.6-2.2-2.2-3.4Z"
          fill={bubbleFill}
        />
        <circle cx="32" cy="28" r="22" fill={bubbleFill} />
        <circle cx="32" cy="28" r="18.4" fill={gapFill} />
        <circle cx="32" cy="28" r="16.2" fill={globeFill} />
        <g fill="#ffffff">
          <path d="M26,17c4,0 7,3.5 6.5,7.5 3.5,2 4.5,6.5 1.5,9-.5,4-4,7-8,7-5,0-9-4-9-9-3-2-3-6.5,0-8.5.5-3.5,3.5-6,9-6Z" />
          <path d="M40,16.5c3,0 5,2.5 4.3,5.3 2.2,1.7 2,4.7-.3,5.7-1,2.3-4,3-6,1.5-2.3,0-3.5-2.5-2.3-4.5-1.7-2-1-4.8,1.3-5.8.5-1.3,1.7-2.2,3-2.2Z" />
        </g>
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
