interface IconProps {
  className?: string
}

const shared = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export function HomeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...shared}>
      <path d="M4 11.5 12 4l8 7.5" />
      <path d="M6 10v9a1 1 0 0 0 1 1h3v-5h4v5h3a1 1 0 0 0 1-1v-9" />
    </svg>
  )
}

export function AboutIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...shared}>
      <path d="M3 6.5 12 4l9 2.5v2L12 6l-9 2.5Z" />
      <path d="M4.5 9v6.5c2 1.3 5 2 7.5 2s5.5-.7 7.5-2V9" />
      <path d="M12 6v14" />
    </svg>
  )
}

export function ForYouIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...shared}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="12" cy="12" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function LearnersIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...shared}>
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" />
    </svg>
  )
}

export function EducatorsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...shared}>
      <rect x="3.5" y="4.5" width="17" height="11" rx="1.2" />
      <path d="M8 19.5h8" />
      <path d="M12 15.5v4" />
      <path d="M7 8.5h6" />
      <path d="M7 11.2h4" />
    </svg>
  )
}

export function TryNowIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...shared}>
      <path d="M12 3c2.8 2.3 4.3 5.3 4.3 9 0 2-.5 3.7-1.2 5.1l-3.1 3-3.1-3C8.2 15.7 7.7 14 7.7 12c0-3.7 1.5-6.7 4.3-9Z" />
      <circle cx="12" cy="10.5" r="1.8" />
      <path d="M8.5 17 6 19.5M15.5 17l2.5 2.5" />
    </svg>
  )
}

export function PricingIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...shared}>
      <path d="M11.3 3.7 20 4l.3 8.7-9.3 9.3a1.3 1.3 0 0 1-1.9 0L3.7 16.6a1.3 1.3 0 0 1 0-1.9Z" />
      <circle cx="15.2" cy="8.8" r="1.5" />
    </svg>
  )
}

export function ContactIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...shared}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
      <path d="M4 7l8 6 8-6" />
    </svg>
  )
}
