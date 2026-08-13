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
          laptop. object-contain (not object-cover) on a navy-900 bg keeps
          the full screenshot uncropped — no left/right content loss like the
          old 16:10 attempt had — with the small resulting top/bottom gap
          just reading as screen bezel inset rather than a rendering bug. */}
      <div className="overflow-hidden rounded-[10px] border-[6px] border-navy-900 bg-navy-900 shadow-[0_20px_45px_rgba(10,20,45,0.28)] aspect-[16/10]">
        <img src={src} alt={alt} className="h-full w-full object-contain object-top" />
      </div>
      <div className="mx-auto h-[7px] w-[112%] rounded-b-md bg-navy-800" />
    </div>
  )
}
