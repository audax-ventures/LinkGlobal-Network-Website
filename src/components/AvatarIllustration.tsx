interface AvatarIllustrationProps {
  color: string
  className?: string
}

// Illustrated (not photographic) avatar — used anywhere a "person" placeholder
// is needed, per the site's locked-in design direction of avoiding stock
// photos for generic person visuals.
export default function AvatarIllustration({ color, className = 'h-9 w-9' }: AvatarIllustrationProps) {
  return (
    <svg viewBox="0 0 36 36" className={className}>
      <circle cx="18" cy="18" r="18" fill={color} fillOpacity="0.16" />
      <circle cx="18" cy="14.5" r="6" fill={color} />
      <path d="M6 30c0-7.2 5.4-12 12-12s12 4.8 12 12" fill={color} />
    </svg>
  )
}
