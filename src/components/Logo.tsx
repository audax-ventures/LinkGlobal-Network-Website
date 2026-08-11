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
          <path d="M28.3,13.7c4.2-.4 7.6,2.8 6.6,6.7 3.2,1.7 4.3,5.5 2.2,8.4 1,3.7-1.3,7.5-5.1,8.5-1.6.4-2.6,1.6-3.2,3.1-4.4.2-8.3-2.7-9-6.9-2.7-1.7-3.7-5.1-2.3-7.9-1.6-3.1-.6-6.9,2.3-8.8 1.9-3.1 5.2-1.5 8.5-3.1Z" />
          <path d="M41,17.3c2.7-.3 5,1.7 5,4.3.9,1.1.9,2.7-.1,3.7.6,2-.5,4.1-2.5,4.7-1.1.3-1.8,1.1-2.1,2.2-2.7-.1-4.8-2.2-4.8-4.8-1.4-1.2-1.7-3.3-.6-4.8-.7-2 .3-4.2 2.2-4.9.3-.2.6-.3.9-.4Z" />
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
