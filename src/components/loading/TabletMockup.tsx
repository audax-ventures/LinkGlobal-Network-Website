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
 * Same object-contain-on-navy-900 treatment so screenshots keep their real
 * aspect ratio instead of being cropped to fit the tablet's frame.
 */
export default function TabletMockup({ src, alt, className = '', style }: TabletMockupProps) {
  return (
    <div
      className={`overflow-hidden rounded-[20px] border-[10px] border-navy-900 bg-navy-900 shadow-[0_20px_45px_rgba(10,20,45,0.28)] aspect-[4/3] ${className}`}
      style={style}
    >
      <img src={src} alt={alt} className="h-full w-full object-contain object-top" />
    </div>
  )
}
