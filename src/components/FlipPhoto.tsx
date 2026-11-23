import { useState } from 'react'
import Photo from './Photo'

// Final changes (client, Nov 2026): photos are interactive. Click or tap and
// the photo turns over like a flashcard to show one sentence; click again to
// turn it back. Fills its parent, so the parent sets the size and aspect.
export default function FlipPhoto({
  src,
  alt,
  sentence,
  sizes,
  position,
  rounded = 'rounded-3xl',
}: {
  src: string
  alt: string
  sentence: string
  sizes?: string
  position?: string
  rounded?: string
}) {
  const [flipped, setFlipped] = useState(false)
  return (
    <button
      type="button"
      onClick={() => setFlipped((f) => !f)}
      aria-pressed={flipped}
      aria-label={flipped ? sentence : `${alt}. Turn over to read more.`}
      className="group relative block h-full w-full cursor-pointer text-left [perspective:1200px] focus-visible:outline-none"
    >
      <span
        className={`relative block h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] [transform-style:preserve-3d] ${
          flipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        <span className={`absolute inset-0 overflow-hidden ${rounded} [backface-visibility:hidden] group-focus-visible:ring-4 group-focus-visible:ring-brand-cyan`}>
          <Photo
            src={src}
            alt=""
            sizes={sizes}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            style={{ objectPosition: position }}
          />
          <span
            className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-brand-blue shadow-[0_6px_18px_rgba(19,41,82,0.25)] transition-transform duration-300 group-hover:rotate-180"
            aria-hidden="true"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 11a8 8 0 0 0-14.9-4M4 4v4h4M4 13a8 8 0 0 0 14.9 4M20 20v-4h-4" />
            </svg>
          </span>
        </span>
        <span
          className={`absolute inset-0 flex items-center justify-center ${rounded} bg-gradient-to-br from-[#1ba3e0] via-[#3b82f6] to-[#7c5cd6] p-6 text-center text-lg font-bold leading-snug text-white shadow-[0_16px_40px_rgba(27,99,224,0.3)] [backface-visibility:hidden] [transform:rotateY(180deg)] sm:text-xl`}
          aria-hidden={!flipped}
        >
          {sentence}
        </span>
      </span>
    </button>
  )
}
