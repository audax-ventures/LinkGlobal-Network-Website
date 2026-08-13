import type { CSSProperties } from 'react'

interface LaptopMockupProps {
  src: string
  alt: string
  className?: string
  style?: CSSProperties
}

/**
 * A laptop-screen-only device frame (no keyboard/base needed per feedback) —
 * a dark bezel around the screenshot with a thin flat foot beneath it to
 * read as a laptop lid rather than a plain browser window.
 */
export default function LaptopMockup({ src, alt, className = '', style }: LaptopMockupProps) {
  return (
    <div className={className} style={style}>
      {/* A real MacBook screen is ~16:10 — the screenshots themselves export
          at 1000x540 (~1.85:1), noticeably wider/shallower than that, which
          previously made the whole mockup read as a too-wide, squashed
          laptop. object-contain was tried to avoid cropping, but since it's
          anchored object-top, the entire ~1.85:1-vs-1.6:1 gap piles up as one
          solid black bar at the bottom instead of being split away — reads
          as a broken/cut-off screenshot, not an inset. object-cover crops a
          modest, evenly-split ~7% off each side instead — no visible dead
          space, and the crop is small enough that it doesn't cut real UI. */}
      <div className="overflow-hidden rounded-[10px] border-[6px] border-navy-900 bg-navy-900 shadow-[0_20px_45px_rgba(10,20,45,0.28)] aspect-[16/10]">
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      </div>
      <div className="mx-auto h-[7px] w-[112%] rounded-b-md bg-navy-800" />
    </div>
  )
}
