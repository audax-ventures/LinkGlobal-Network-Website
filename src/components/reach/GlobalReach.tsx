import { motion } from 'framer-motion'
import AvatarIllustration from '../AvatarIllustration'

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

export default function GlobalReach() {
  return (
    <section className="relative overflow-hidden pt-10 sm:pt-14 pb-14 sm:pb-20 px-6">
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        {/* Solid white card + dark navy text, same fix as Platform Gallery's
            intro card — this section sits partway through Home's
            light-to-dark fade wrapper (see Home.tsx), so translucent
            white-on-white text sized for a solid dark navy backdrop had
            poor contrast against the lighter/mid-tone part of that fade. */}
        <div className="rounded-3xl bg-white px-6 py-10 sm:px-12 sm:py-12 shadow-[0_20px_60px_rgba(19,41,82,0.12)]">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-blue">
            Global Reach
          </span>
          <h2 className="mt-3 text-3xl sm:text-5xl font-bold text-navy-950">Learners in 120+ countries.</h2>
          <p className="mt-4 text-navy-700/80">
            Wherever you are, there’s a tutor and a community waiting on the other side of
            the conversation.
          </p>
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-16 grid max-w-5xl gap-5 sm:grid-cols-2">
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl bg-white p-6 shadow-[0_15px_40px_rgba(19,41,82,0.12)]"
          >
            <p className="text-sm sm:text-base text-navy-700/85">&ldquo;{t.quote}&rdquo;</p>
            <div className="mt-4 flex items-center gap-3">
              <AvatarIllustration color={t.accent} />
              <div>
                <p className="text-sm font-semibold text-navy-950">{t.name}</p>
                <p className="text-xs text-navy-700/60">{t.country}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
