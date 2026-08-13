import type { CSSProperties } from 'react'

interface MonitorMockupProps {
  src: string
  alt: string
  className?: string
  style?: CSSProperties
}

/**
 * A desktop-monitor device frame — a dark-bezel screen on a thin stand and
 * flat oval base, distinct from LaptopMockup's screen-only lid. object-cover
 * (not object-contain) crops a modest, evenly-split ~7% off each side of the
 * ~1.85:1 screenshot to fill the 16:10 screen — object-contain was tried
 * first but, anchored object-top, dumped the whole leftover gap as one solid
 * black bar at the bottom instead, reading as a broken/cut-off screenshot.
 */
export default function MonitorMockup({ src, alt, className = '', style }: MonitorMockupProps) {
  return (
    <div className={className} style={style}>
      <div className="overflow-hidden rounded-[14px] border-[10px] border-navy-900 bg-navy-900 shadow-[0_20px_45px_rgba(10,20,45,0.28)] aspect-[16/10]">
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      </div>
      <div className="mx-auto h-7 w-4 bg-gradient-to-b from-[#d8dce2] to-[#aab0bb]" />
      <div className="mx-auto h-2.5 w-[42%] rounded-full bg-gradient-to-b from-[#e2e5ea] to-[#aab0bb] shadow-[0_4px_10px_rgba(10,20,45,0.2)]" />
    </div>
  )
}
