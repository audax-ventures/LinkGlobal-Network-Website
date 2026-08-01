import { Suspense } from 'react'
import { motion } from 'framer-motion'
import LazyStylizedGlobe from '../LazyStylizedGlobe'
import { COUNTRY_GREETINGS } from '../../data/countryGreetings'
import { useViewportSize } from '../../hooks/useViewportSize'

interface Testimonial {
  name: string
  country: string
  quote: string
  accent: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Elena Voss',
    country: 'Germany',
    quote:
      'Learning with a real tutor changed everything — I finally understand how the language actually sounds in conversation, not just in a textbook.',
    accent: '#1ba3e0',
  },
  {
    name: 'Haruto Sato',
    country: 'Japan',
    quote: 'I tried three other apps before this one. It’s the first time I’ve actually looked forward to my lessons.',
    accent: '#3ec6ff',
  },
  {
    name: 'Amara Okafor',
    country: 'Nigeria',
    quote:
      'My tutor adjusted everything to how I learn best. Three months in, I had my first full conversation in French.',
    accent: '#8fe0ff',
  },
  {
    name: 'Mateus Silva',
    country: 'Brazil',
    quote: 'Connecting with a native speaker every week made all the difference. It stopped feeling like homework.',
    accent: '#5fb8e8',
  },
]

function AvatarIllustration({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 36 36" className="h-9 w-9">
      <circle cx="18" cy="18" r="18" fill={color} fillOpacity="0.16" />
      <circle cx="18" cy="14.5" r="6" fill={color} />
      <path d="M6 30c0-7.2 5.4-12 12-12s12 4.8 12 12" fill={color} />
    </svg>
  )
}

export default function GlobalReach() {
  const { width } = useViewportSize()
  const globeSize = Math.max(Math.min(width * 0.55, 480), 260)

  return (
    <section className="relative overflow-hidden py-28 sm:py-36 px-6">
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <div className="rounded-3xl border border-white/10 bg-white/5 px-6 py-10 sm:px-12 sm:py-12 backdrop-blur">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-light/60">
            Global Reach
          </span>
          <h2 className="mt-3 text-3xl sm:text-5xl font-bold text-white">Learners in 120+ countries.</h2>
          <p className="mt-4 text-white/65">
            Wherever you are, there’s a tutor and a community waiting on the other side of
            the conversation.
          </p>
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-12 flex justify-center">
        <Suspense fallback={<div style={{ width: globeSize, height: globeSize }} />}>
          <LazyStylizedGlobe width={globeSize} height={globeSize} greetings={COUNTRY_GREETINGS} autoRotateSpeed={14} />
        </Suspense>
      </div>

      <div className="relative z-10 mx-auto mt-16 grid max-w-5xl gap-5 sm:grid-cols-2">
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
          >
            <p className="text-sm sm:text-base text-white/80">&ldquo;{t.quote}&rdquo;</p>
            <div className="mt-4 flex items-center gap-3">
              <AvatarIllustration color={t.accent} />
              <div>
                <p className="text-sm font-semibold text-white">{t.name}</p>
                <p className="text-xs text-white/50">{t.country}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
