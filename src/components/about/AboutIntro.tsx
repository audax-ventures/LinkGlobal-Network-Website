import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function AboutIntro() {
  return (
    <section className="relative px-6 pt-16 pb-6 sm:pt-24 sm:pb-8">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden rounded-3xl border border-navy-900/10 shadow-[0_30px_80px_rgba(19,41,82,0.15)] md:order-1"
        >
          <img
            src="/photos/about-founders.jpg"
            alt="The LinkGlobal Network founders reviewing an early version of the platform"
            className="aspect-[4/3] w-full object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl border border-navy-900/10 bg-white/70 px-6 py-8 sm:px-9 sm:py-9 backdrop-blur-sm shadow-[0_8px_28px_rgba(19,41,82,0.08)] md:order-2"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-navy-700/60">
            Why LinkGlobal Network
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-navy-950">
            We built the platform we wished existed.
          </h2>
          <p className="mt-5 text-navy-700/80 leading-relaxed">
            We&rsquo;d both tried to learn a language the &ldquo;proper&rdquo; way — years of apps, streaks,
            and vocabulary drills that never once turned into an actual conversation. So we built
            LinkGlobal Network around the one thing that actually works: pairing learners with real,
            native-speaking tutors, wherever they happen to be in the world.
          </p>
          <p className="mt-4 text-navy-700/80 leading-relaxed">
            No algorithm can replicate a real conversation. Today that idea connects tens of
            thousands of learners and tutors across more than 120 countries — not to complete a
            level, but to actually talk to each other.
          </p>
          <Link
            to="/about"
            className="mt-8 inline-block rounded-full border border-navy-900/15 px-7 py-3 text-sm font-semibold text-navy-800 transition-colors hover:bg-navy-900/[0.04]"
          >
            More About Us
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
