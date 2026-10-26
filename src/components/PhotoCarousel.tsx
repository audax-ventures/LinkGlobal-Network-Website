import { useCallback, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import Photo from './Photo'

// Lingoda-style carousel (revision brief 2, Lingoda reference): each slide is a
// full-bleed photo with a small icon, a short headline and a two-line
// description over it, plus an optional notification-style chip. The next
// slide peeks in at the edge; arrows, dots, swipe (native scroll-snap) and
// arrow keys all work. Pictures carry no text apart from the chip.

export interface CarouselSlide {
  photo: string
  alt: string
  icon: ReactNode
  title: string
  line: string
  chip?: string
}

function Arrow({ dir, onClick, disabled }: { dir: 'prev' | 'next'; onClick: () => void; disabled: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === 'prev' ? 'Previous slide' : 'Next slide'}
      className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-navy-950 shadow-[0_8px_24px_rgba(19,41,82,0.15)] ring-1 ring-navy-900/10 transition hover:scale-105 disabled:opacity-35 disabled:hover:scale-100"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={dir === 'prev' ? 'm15 18-6-6 6-6' : 'm9 18 6-6-6-6'} />
      </svg>
    </button>
  )
}

export default function PhotoCarousel({ slides, label }: { slides: CarouselSlide[]; label: string }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)

  // Track which slide is centred as the visitor swipes or scrolls.
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const items = Array.from(track.children) as HTMLElement[]
        const centre = track.scrollLeft + track.clientWidth / 2
        let best = 0
        let bestDist = Infinity
        items.forEach((el, i) => {
          const d = Math.abs(el.offsetLeft + el.offsetWidth / 2 - centre)
          if (d < bestDist) {
            bestDist = d
            best = i
          }
        })
        setIndex(best)
      })
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      track.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  const goTo = useCallback((i: number) => {
    const track = trackRef.current
    const el = track?.children[i] as HTMLElement | undefined
    if (!track || !el) return
    track.scrollTo({ left: el.offsetLeft - (track.clientWidth - el.offsetWidth) / 2, behavior: 'smooth' })
  }, [])

  return (
    <div
      className="relative"
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') goTo(Math.min(index + 1, slides.length - 1))
        if (e.key === 'ArrowLeft') goTo(Math.max(index - 1, 0))
      }}
    >
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-[8vw] pb-4 [scrollbar-width:none] sm:px-[14vw] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((s, i) => (
          <article
            key={s.title}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}: ${s.title}`}
            className="relative aspect-[4/5] w-[84vw] shrink-0 snap-center overflow-hidden rounded-[2rem] shadow-[0_24px_60px_rgba(19,41,82,0.18)] transition-[transform,opacity] duration-500 sm:aspect-[16/9] sm:w-[72vw] lg:w-[64vw] lg:max-w-[980px]"
            style={{ transform: i === index ? 'scale(1)' : 'scale(0.94)', opacity: i === index ? 1 : 0.7 }}
          >
            <Photo src={s.photo} alt={s.alt} sizes="(min-width: 1024px) 64vw, 84vw" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06182e]/85 via-[#06182e]/25 to-transparent" aria-hidden="true" />
            {s.chip && (
              <span className="absolute right-5 top-5 rounded-2xl bg-white/95 px-4 py-2.5 text-sm font-semibold text-navy-950 shadow-[0_10px_30px_rgba(0,0,0,0.2)] sm:right-7 sm:top-7">
                {s.chip}
              </span>
            )}
            <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-10">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/30 backdrop-blur" aria-hidden="true">
                {s.icon}
              </span>
              <h3 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">{s.title}</h3>
              <p className="mt-2 max-w-xl text-lg text-white/85 sm:text-xl">{s.line}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-5">
        <Arrow dir="prev" onClick={() => goTo(index - 1)} disabled={index === 0} />
        <div className="flex gap-2">
          {slides.map((s, i) => (
            <button
              key={s.title}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}: ${s.title}`}
              aria-current={i === index ? 'true' : undefined}
              className={`h-2.5 rounded-full transition-all ${i === index ? 'w-8 bg-brand-blue' : 'w-2.5 bg-navy-900/20'}`}
            />
          ))}
        </div>
        <Arrow dir="next" onClick={() => goTo(index + 1)} disabled={index === slides.length - 1} />
      </div>
    </div>
  )
}
