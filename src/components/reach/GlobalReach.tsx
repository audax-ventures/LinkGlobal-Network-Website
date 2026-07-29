import { motion } from 'framer-motion'
import StylizedGlobe from '../StylizedGlobe'
import { COUNTRY_GREETINGS } from '../../data/countryGreetings'
import { useViewportSize } from '../../hooks/useViewportSize'

interface Testimonial {
  name: string
  country: string
  quote: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Elena Voss',
    country: 'Germany',
    quote:
      'Learning with a real tutor changed everything — I finally understand how the language actually sounds in conversation, not just in a textbook.',
  },
  {
    name: 'Haruto Sato',
    country: 'Japan',
    quote: 'I tried three other apps before this one. It’s the first time I’ve actually looked forward to my lessons.',
  },
  {
    name: 'Amara Okafor',
    country: 'Nigeria',
    quote:
      'My tutor adjusted everything to how I learn best. Three months in, I had my first full conversation in French.',
  },
  {
    name: 'Mateus Silva',
    country: 'Brazil',
    quote: 'Connecting with a native speaker every week made all the difference. It stopped feeling like homework.',
  },
]

export default function GlobalReach() {
  const { width } = useViewportSize()
  const globeSize = Math.max(Math.min(width * 0.55, 480), 260)

  return (
    <section
      className="relative overflow-hidden py-28 sm:py-36 px-6"
      style={{ background: 'linear-gradient(180deg, #0e1c3d 0%, #0a1128 55%, #030407 100%)' }}
    >
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-light/60">
          Global Reach
        </span>
        <h2 className="mt-3 text-3xl sm:text-5xl font-bold text-white">Learners in 120+ countries.</h2>
        <p className="mt-4 text-white/65">
          Wherever you are, there’s a tutor and a community waiting on the other side of
          the conversation.
        </p>
      </div>

      <div className="relative z-10 mx-auto mt-12 flex justify-center">
        <StylizedGlobe width={globeSize} height={globeSize} greetings={COUNTRY_GREETINGS} autoRotateSpeed={14} />
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
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-cyan/20 text-sm font-semibold text-brand-light">
                {t.name.charAt(0)}
              </div>
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
