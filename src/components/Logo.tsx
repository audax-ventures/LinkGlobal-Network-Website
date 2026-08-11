interface LogoProps {
  variant?: 'dark' | 'reversed'
  markOnly?: boolean
  className?: string
}

/**
 * Solid black chat-bubble circle with a curled tail, a crisp white gap ring,
 * and a blue globe with two clean rounded landmass shapes, paired with the
 * "Link"/"Global" wordmark. `variant="reversed"` swaps the bubble to white
 * and the gap ring to dark for use on dark backgrounds.
 *
 * The mark renders at only ~36px total (h-8/h-9 in the nav), so the globe is
 * deliberately just two simple, well-separated rounded shapes with no grid
 * lines — earlier passes with lat/long grid strokes and finer continent
 * detail read fine when the SVG was scaled up for review, but rasterizing at
 * the real size showed the thin strokes vanishing and the shapes blurring
 * into one indistinct blob. This was verified by rendering candidates to a
 * canvas at true size (36px) and comparing, not by eyeballing a zoomed copy.
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
        <g fill="#ffffff">
          <path d="M25,19.5c4.5,0,8,3,7.5,7-.5,4.5-4,7.5-8.5,7.5-4,0-7.5-3-7.5-7.5,0-3.5,3-7,8.5-7Z" />
          <path d="M41,18c3.5,0,6,2.5,5.5,6-.5,3.5-3.5,5.5-7,5-3-.5-5-3-4.5-6,.5-3,2.5-5,6-5Z" />
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
