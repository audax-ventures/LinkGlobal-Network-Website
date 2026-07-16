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
      <g id="lg-mark">
        <path
          d="M32 4C17.6 4 6 15.2 6 29c0 7 3 13.4 7.9 18l-2.6 11.4a2 2 0 0 0 2.8 2.3l12.6-6.1c1.7.3 3.5.4 5.3.4 14.4 0 26-11.2 26-25S46.4 4 32 4Z"
          fill={bubbleFill}
        />
        <circle cx="32" cy="29" r="16.5" fill="#2fb8ef" />
        <path
          d="M32 12.5a16.5 16.5 0 0 1 0 33 16.5 16.5 0 0 1 0-33Z"
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.55"
          strokeWidth="0.75"
        />
        <ellipse cx="32" cy="29" rx="6.2" ry="16.5" fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="0.75" />
        <ellipse cx="32" cy="29" rx="16.5" ry="6.2" fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="0.75" />
        <path
          d="M22.5 21c2.4-2.2 5-1 6.4.6 1 1.1 2.6.9 3.6-.2 1.6-1.8 4.6-2.6 6.8-.6 1.7 1.6 1 3.8-.6 4.6-2 1-2 2.8-.4 3.8 2.1 1.3 2.3 4 .4 5.6-1.6 1.3-1 3.2.6 3.8 1.8.7 2 2.6.6 3.8-1.9 1.6-5.2 1.4-6.8-.4-1-1.1-2.6-1-3.6 0-1.6 1.6-4.6 1.8-6.4-.2-1.5-1.7-.7-3.6 1-4.2 1.8-.7 1.8-2.6.2-3.8-2-1.5-2-4.1 0-5.6 1.6-1.2 1.4-3-.4-3.8-1.6-.7-1.9-2.4-1.4-3.4Z"
          fill="#ffffff"
          fillOpacity="0.92"
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
