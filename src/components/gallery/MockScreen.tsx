interface MockScreenProps {
  src: string
  alt: string
}

export default function MockScreen({ src, alt }: MockScreenProps) {
  return (
    <div className="h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-navy-900/90 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
        <div className="h-1.5 w-1.5 rounded-full bg-white/25" />
        <div className="h-1.5 w-1.5 rounded-full bg-white/25" />
        <div className="h-1.5 w-1.5 rounded-full bg-white/25" />
      </div>
      <div className="h-[calc(100%-28px)] overflow-hidden">
        <img src={src} alt={alt} className="h-full w-full object-cover object-top" />
      </div>
    </div>
  )
}
