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
      {/* Matches the real screenshots' actual 1000x540 export dimensions —
          the previous 16:10 box didn't match, so object-cover was cropping
          content off the left/right edges of every screen. */}
      <div className="overflow-hidden rounded-[10px] border-[6px] border-navy-900 bg-navy-900 shadow-[0_20px_45px_rgba(10,20,45,0.28)] aspect-[1000/540]">
        <img src={src} alt={alt} className="h-full w-full object-cover object-top" />
      </div>
      <div className="mx-auto h-[7px] w-[112%] rounded-b-md bg-navy-800" />
    </div>
  )
}
