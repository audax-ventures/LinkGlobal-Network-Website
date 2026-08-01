interface LaptopMockupProps {
  src: string
  alt: string
  className?: string
}

/**
 * A laptop-screen-only device frame (no keyboard/base needed per feedback) —
 * a dark bezel around the screenshot with a thin flat foot beneath it to
 * read as a laptop lid rather than a plain browser window.
 */
export default function LaptopMockup({ src, alt, className = '' }: LaptopMockupProps) {
  return (
    <div className={className}>
      <div className="overflow-hidden rounded-[10px] border-[6px] border-navy-900 bg-navy-900 shadow-[0_20px_45px_rgba(10,20,45,0.28)] aspect-[16/10]">
        <img src={src} alt={alt} className="h-full w-full object-cover object-top" />
      </div>
      <div className="mx-auto h-[7px] w-[112%] rounded-b-md bg-navy-800" />
    </div>
  )
}
