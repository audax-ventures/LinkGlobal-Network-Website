import type { CSSProperties } from 'react'

interface PhoneMockupProps {
  src: string
  alt: string
  className?: string
  style?: CSSProperties
}

/** A simple phone-screen device frame, sized for a cropped slice of a
 * platform screenshot rather than a real mobile UI (the product doesn't have
 * a distinct mobile screenshot yet). */
export default function PhoneMockup({ src, alt, className = '', style }: PhoneMockupProps) {
  return (
    <div
      className={`overflow-hidden rounded-[28px] border-[6px] border-navy-900 bg-navy-900 shadow-[0_20px_45px_rgba(10,20,45,0.32)] aspect-[9/19] ${className}`}
      style={style}
    >
      <img src={src} alt={alt} className="h-full w-full object-cover object-left-top" />
    </div>
  )
}
