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
  const linkTextFill = '#2fb8ef'

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
      </defs>
      <g id="lg-mark">
        <path
          d="M32 4C17.6 4 6 15.2 6 29c0 7 3 13.4 7.9 18l-2.6 11.4a2 2 0 0 0 2.8 2.3l12.6-6.1c1.7.3 3.5.4 5.3.4 14.4 0 26-11.2 26-25S46.4 4 32 4Z"
          fill={bubbleFill}
        />
        <g clipPath="url(#lg-globe-clip)">
          {/* fully see-through — just the grid, no fill, so whatever sits behind reads through the gaps */}
          {/* meridians */}
          <ellipse cx="32" cy="29" rx="11" ry="16.5" fill="none" stroke="#3ec6ff" strokeOpacity="0.95" strokeWidth="1" />
          <ellipse cx="32" cy="29" rx="5.2" ry="16.5" fill="none" stroke="#3ec6ff" strokeOpacity="0.95" strokeWidth="1" />
          {/* parallels */}
          <ellipse cx="32" cy="29" rx="16.5" ry="5.2" fill="none" stroke="#3ec6ff" strokeOpacity="1" strokeWidth="1.1" />
          <ellipse cx="32" cy="20.5" rx="14.8" ry="4.4" fill="none" stroke="#3ec6ff" strokeOpacity="0.9" strokeWidth="1" />
          <ellipse cx="32" cy="37.5" rx="14.8" ry="4.4" fill="none" stroke="#3ec6ff" strokeOpacity="0.9" strokeWidth="1" />
        </g>
        <circle cx="32" cy="29" r="16.5" fill="none" stroke="#3ec6ff" strokeOpacity="1" strokeWidth="1.2" />
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
