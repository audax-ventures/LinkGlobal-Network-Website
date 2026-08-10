interface LogoProps {
  variant?: 'dark' | 'reversed'
  markOnly?: boolean
  className?: string
}

/**
 * Matches the mark used in the real product (visible in the platform
 * screenshots): a solid black chat-bubble circle with a small tail,
 * a thin light ring, and a blue globe with white continent silhouettes —
 * paired with the "Link"/"Global" wordmark.
 * `variant="reversed"` swaps the bubble + "Global" text to white for dark backgrounds.
 */
export default function Logo({ variant = 'dark', markOnly = false, className = '' }: LogoProps) {
  const bubbleFill = variant === 'reversed' ? '#ffffff' : '#0b0d12'
  const globalTextFill = variant === 'reversed' ? '#ffffff' : '#0b0d12'
  const linkTextFill = '#1ba3e0'

  return (
    <svg
      viewBox={markOnly ? '0 0 64 64' : '0 0 232 64'}
      className={className}
      role="img"
      aria-label="LinkGlobal Network"
    >
      <defs>
        <clipPath id="lg-globe-clip">
          <circle cx="32" cy="27" r="13.5" />
        </clipPath>
      </defs>
      <g id="lg-mark">
        <path d="M11,36 L15,43 L3,54 Z" fill={bubbleFill} />
        <circle cx="32" cy="27" r="23" fill={bubbleFill} />
        <circle cx="32" cy="27" r="15.5" fill={bubbleFill} />
        <circle cx="32" cy="27" r="13.5" fill="#1ba3e0" />
        <g clipPath="url(#lg-globe-clip)" fill="#ffffff">
          <path d="M27,14.5c2.3.2 3.6 2 3 4.3-.5 1.8.4 3 2 4.3 2.3 1.9 2 4.7-.4 6-1.7.9-2.1 2.6-1.4 4.6.9 2.6-.2 5.3-2.6 5.9-1.6.4-2.6 1.6-2.9 3.4-.6-.1-1.2-.3-1.7-.6-2-1.2-2.4-3.7-3.4-5.7-1-2.1.2-3.9 1.7-5.2 1.7-1.5 1.5-3.4-.2-4.6-2.2-1.6-2.6-3.8-1.5-6.1 1-2.1 3-2.9 5-3.1.6-.1 1.3-.1 1.9-1.2Z" />
          <path d="M40,17.5c1.9-.3 3.6.6 3.9 2.4.3 1.6-.6 2.8-2.1 3.3-1.7.6-1.9 2-1.2 3.4.8 1.7-.1 3.1-1.9 3.2-1.5.1-2.4-.8-2.6-2.2-.2-1.5.6-2.6 1.9-3.2 1.4-.7 1.5-1.7.3-2.7-1.2-1-1.3-2.3-.4-3.4.6-.7 1.4-.9 2.1-.8Z" />
        </g>
        <circle cx="32" cy="27" r="15.5" fill="none" stroke={variant === 'reversed' ? '#0b0d12' : '#ffffff'} strokeOpacity="0.15" strokeWidth="0.75" />
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
