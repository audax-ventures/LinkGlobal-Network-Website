interface LogoProps {
  variant?: 'dark' | 'reversed'
  markOnly?: boolean
  className?: string
}

/**
 * Vector recreation of the LinkGlobal Network mark: a speech-bubble containing
 * a blue-and-white globe, paired with the "Link"/"Global" wordmark.
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
          <circle cx="32" cy="29" r="16.5" />
        </clipPath>
        <linearGradient id="lg-globe-gradient" x1="16" y1="12.5" x2="48" y2="45.5" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3ec6ff" />
          <stop offset="100%" stopColor="#1373b3" />
        </linearGradient>
      </defs>
      <g id="lg-mark">
        <path
          d="M32 4C17.6 4 6 15.2 6 29c0 7 3 13.4 7.9 18l-2.6 11.4a2 2 0 0 0 2.8 2.3l12.6-6.1c1.7.3 3.5.4 5.3.4 14.4 0 26-11.2 26-25S46.4 4 32 4Z"
          fill={bubbleFill}
        />
        <circle cx="32" cy="29" r="16.5" fill="url(#lg-globe-gradient)" />
        <g clipPath="url(#lg-globe-clip)" opacity="0.5">
          <ellipse cx="32" cy="29" rx="8.4" ry="16.5" fill="none" stroke="#ffffff" strokeWidth="1" />
          <ellipse cx="32" cy="29" rx="16.5" ry="6" fill="none" stroke="#ffffff" strokeWidth="1" />
          <path
            d="M20 18c3 4 3.5 8-1 11-3.4 2.3-2 6.6 2 6.2 5-.5 6 3.7 10 4.6"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.1"
            strokeLinecap="round"
          />
        </g>
        <circle cx="24.5" cy="22.5" r="2.1" fill="#ffffff" fillOpacity="0.85" />
        <circle cx="32" cy="29" r="16.5" fill="none" stroke={variant === 'reversed' ? '#ffffff' : '#0b0d12'} strokeOpacity="0.12" strokeWidth="1" />
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
