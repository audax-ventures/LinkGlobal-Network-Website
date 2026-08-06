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

export function CheckIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...shared}>
      <path d="M5 12.5 10 17l9-10" />
    </svg>
  )
}

export function ChatIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...shared}>
      <path d="M4 5.5h16v10H9l-4 3.5v-3.5H4Z" />
      <path d="M8 9.5h8M8 12.5h5" />
    </svg>
  )
}

export function GlobeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...shared}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.6 2.3 4 5.3 4 8.5s-1.4 6.2-4 8.5c-2.6-2.3-4-5.3-4-8.5s1.4-6.2 4-8.5Z" />
    </svg>
  )
}

export function HeartIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...shared}>
      <path d="M12 19c-4.5-2.9-8-6.2-8-9.9A4.6 4.6 0 0 1 12 6a4.6 4.6 0 0 1 8 3.1c0 3.7-3.5 7-8 9.9Z" />
    </svg>
  )
}

export function ClockIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...shared}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3.2 2" />
    </svg>
  )
}

export function BookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...shared}>
      <path d="M12 6.5c-1.6-1.3-3.8-2-6.5-2v11c2.7 0 4.9.7 6.5 2 1.6-1.3 3.8-2 6.5-2v-11c-2.7 0-4.9.7-6.5 2Z" />
      <path d="M12 6.5v11" />
    </svg>
  )
}

export function UsersIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...shared}>
      <circle cx="9" cy="8.5" r="3" />
      <path d="M3 20c0-3.6 2.7-6 6-6s6 2.4 6 6" />
      <path d="M15.5 6.5a3 3 0 0 1 0 5.9M21 20c0-3-1.9-5.3-4.5-5.9" />
    </svg>
  )
}

export function CalendarIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...shared}>
      <rect x="3.5" y="5" width="17" height="15" rx="1.5" />
      <path d="M3.5 9.5h17M8 3v3.5M16 3v3.5" />
    </svg>
  )
}

export function DollarIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...shared}>
      <path d="M12 3.5v17M16 7.2c0-1.5-1.8-2.7-4-2.7s-4 1.2-4 2.7 1.8 2.5 4 2.8c2.2.3 4 1.2 4 2.8s-1.8 2.7-4 2.7-4-1.1-4-2.6" />
    </svg>
  )
}

export function ShieldIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...shared}>
      <path d="M12 3.5 19 6.5v5c0 5-3 8-7 9.5-4-1.5-7-4.5-7-9.5v-5Z" />
      <path d="M9 12l2 2 4-4.5" />
    </svg>
  )
}

export function TargetIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...shared}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function MailIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...shared}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
      <path d="M4 7l8 6 8-6" />
    </svg>
  )
}

export function RocketIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...shared}>
      <path d="M12 3c2.8 2.3 4.3 5.3 4.3 9 0 2-.5 3.7-1.2 5.1l-3.1 3-3.1-3C8.2 15.7 7.7 14 7.7 12c0-3.7 1.5-6.7 4.3-9Z" />
      <circle cx="12" cy="10.5" r="1.8" />
      <path d="M8.5 17 6 19.5M15.5 17l2.5 2.5" />
    </svg>
  )
}
