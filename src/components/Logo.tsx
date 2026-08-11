interface LogoProps {
  variant?: 'dark' | 'reversed'
  markOnly?: boolean
  className?: string
}

/**
 * Solid black chat-bubble circle with a curled tail and a blue globe, paired
 * with the "Link"/"Global" wordmark. `variant="reversed"` swaps the bubble
 * to white for use on dark backgrounds.
 *
 * The continent path is traced pixel-for-pixel from the client's actual
 * reference asset (not hand-drawn/eyeballed): flood-filled the globe disk,
 * classified white vs. blue pixels by color distance, ran Moore-neighbor
 * boundary tracing on the resulting mask, then simplified with Douglas-
 * Peucker (~1700 points down to 42). That tracing process also showed there
 * is no white gap ring between the black bubble and the globe in the real
 * asset — earlier versions had invented one.
 *
 * The mark renders at only ~32px total (h-8/h-9 in the nav) — confirmed via
 * a true-size raster (not a scaled-up copy, which looks fine regardless of
 * whether the real small size does) that this traced shape stays legible at
 * that size despite its detail, unlike earlier hand-drawn attempts.
 */
export default function Logo({ variant = 'dark', markOnly = false, className = '' }: LogoProps) {
  const isReversed = variant === 'reversed'
  const bubbleFill = isReversed ? '#ffffff' : '#0b0d12'
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
        <circle cx="32" cy="29" r="16.5" fill={globeFill} />
        <path
          fill="#ffffff"
          d="M33.3,14.87 L36.35,15.71 L35.9,17.08 L37.88,20.37 L37.19,21.82 L37.81,22.89 L37.35,24.42 L38.34,25.94 L39.64,27.4 L42.85,27.93 L42.92,33.43 L41.85,36.64 L43.08,37.94 L38.65,41.83 L35.51,43.06 L29.1,43.28 L25.35,41.83 L20.01,36.94 L17.56,30.83 L17.49,27.4 L18.86,22.66 L20.62,22.89 L21.23,24.88 L24.67,27.85 L24.13,30.6 L27.11,35.03 L27.26,38.4 L28.49,41.53 L29.33,41.68 L30.55,39.92 L31.08,37.63 L34.22,33.89 L34.52,30.38 L31.16,28.47 L29.02,26.17 L24.13,25.87 L22.53,22.81 L24.06,21.74 L25.35,22.05 L26.12,20.37 L30.01,17.39 L29.78,15.33 Z"
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
