import type { CSSProperties } from 'react'

interface TabletMockupProps {
  src: string
  alt: string
  className?: string
  style?: CSSProperties
}

/**
 * A landscape tablet device frame — uniform thick bezel on all sides (no
 * stand/foot, no keyboard), rounder corners than the laptop/monitor frames.
 * 16:10 (matching Laptop/MonitorMockup, not a true iPad's 4:3) keeps the
 * object-cover crop against the ~1.85:1 screenshots small and evenly split —
 * 4:3 was tried first but needed a much bigger ~28%-per-side crop, and before
 * that, object-contain avoided cropping but dumped the whole leftover gap as
 * a solid black bar (object-top-anchored) instead of splitting it away.
 */
export default function TabletMockup({ src, alt, className = '', style }: TabletMockupProps) {
  return (
    <div
      className={`overflow-hidden rounded-[20px] border-[10px] border-navy-900 bg-navy-900 shadow-[0_20px_45px_rgba(10,20,45,0.28)] aspect-[16/10] ${className}`}
      style={style}
    >
      <img src={src} alt={alt} className="h-full w-full object-cover" />
    </div>
  )
}
