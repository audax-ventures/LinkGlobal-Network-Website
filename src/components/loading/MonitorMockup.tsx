import type { CSSProperties } from 'react'

interface MonitorMockupProps {
  src: string
  alt: string
  className?: string
  style?: CSSProperties
}

/**
 * A desktop-monitor device frame — a dark-bezel screen on a thin stand and
 * flat oval base, distinct from LaptopMockup's screen-only lid. Same
 * object-contain-on-navy-900 treatment as LaptopMockup so screenshots that
 * don't natively match the screen's aspect ratio never get cropped.
 */
export default function MonitorMockup({ src, alt, className = '', style }: MonitorMockupProps) {
  return (
    <div className={className} style={style}>
      <div className="overflow-hidden rounded-[14px] border-[10px] border-navy-900 bg-navy-900 shadow-[0_20px_45px_rgba(10,20,45,0.28)] aspect-[16/10]">
        <img src={src} alt={alt} className="h-full w-full object-contain object-top" />
      </div>
      <div className="mx-auto h-7 w-4 bg-gradient-to-b from-[#d8dce2] to-[#aab0bb]" />
      <div className="mx-auto h-2.5 w-[42%] rounded-full bg-gradient-to-b from-[#e2e5ea] to-[#aab0bb] shadow-[0_4px_10px_rgba(10,20,45,0.2)]" />
    </div>
  )
}
