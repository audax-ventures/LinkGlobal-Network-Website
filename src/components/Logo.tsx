interface LogoProps {
  variant?: 'dark' | 'reversed'
  markOnly?: boolean
  className?: string
}

/**
 * Solid black chat-bubble circle with a curled tail, a crisp white gap ring,
 * and a blue globe with a latitude/longitude grid plus an angular continent
 * silhouette, paired with the "Link"/"Global" wordmark. `variant="reversed"`
 * swaps the bubble to white and the gap ring to dark for use on dark
 * backgrounds.
 *
 * The mark renders at only ~32px total (h-8/h-9 in the nav), so both the
 * grid strokes and the continent shape are deliberately bold (2.2 stroke
 * width, 95% opacity) and straight-edged rather than fine or wavy — thin/
 * low-opacity strokes and smooth curved continent paths were tried in
 * earlier passes and either vanished or blurred into a muddy blob at real
 * size, even though they looked fine scaled up for review. This design was
 * chosen by rasterizing several candidates to a canvas at the true ~32px
 * size and comparing, not by eyeballing a zoomed-up copy.
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
        <ellipse cx="32" cy="29" rx="16.5" ry="6.5" fill="none" stroke="#ffffff" strokeOpacity="0.95" strokeWidth="2.2" />
        <ellipse cx="32" cy="29" rx="6.5" ry="16.5" fill="none" stroke="#ffffff" strokeOpacity="0.95" strokeWidth="2.2" />
        <path
          fill="#ffffff"
          d="M23,20 L29,17 L34,20 L33,24 L37,26 L36,32 L31,36 L26,35 L22,31 L23,26 Z"
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
