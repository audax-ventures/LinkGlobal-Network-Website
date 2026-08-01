import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

export default function SplitSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28 px-6">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {/* A subtle organic divider accent only — the light/dark distinction
            between sections is handled by the page-wide gradient now, not by
            two different shades within this one section. */}
        <path
          d="M52,0 C48,35 52,65 48,100"
          fill="none"
          stroke="rgba(19,41,82,0.1)"
          strokeWidth="0.4"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className="relative z-10 mx-auto max-w-2xl text-center"
      >
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-navy-700/60">
          Two Sides, One Platform
        </span>
        <h2 className="mt-3 text-3xl sm:text-5xl font-extrabold tracking-tight text-navy-950">
          Whichever side you&rsquo;re on, we&rsquo;ve built for you.
        </h2>
        <p className="mt-4 text-navy-700/75">
          Learning a language and teaching one are very different journeys — LinkGlobal Network is
          designed around both.
        </p>
      </motion.div>

      <div className="relative z-10 mx-auto mt-16 grid max-w-6xl gap-16 md:grid-cols-2 md:gap-12">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col items-center text-center md:items-start md:text-left"
        >
          <img
            src="/photos/learners.jpg"
            alt="A learner studying a new language on a laptop"
            className="aspect-[4/3] w-full rounded-2xl object-cover shadow-[0_12px_32px_rgba(19,41,82,0.1)]"
          />
          <div className="mt-8 w-full rounded-2xl border border-navy-900/10 bg-white/70 backdrop-blur-sm px-6 py-6 sm:px-7 sm:py-7 shadow-[0_8px_28px_rgba(19,41,82,0.08)]">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-navy-700/60">
              For Learners
            </span>
            <h3 className="mt-3 text-3xl sm:text-4xl font-bold text-navy-950">Learn at the speed of real life.</h3>
            <p className="mt-4 text-navy-700/75">
              Personalized lessons, flexible scheduling, and real conversations with native
              speakers — so progress fits around your life, not the other way around.
            </p>
            <button
              type="button"
              className="mt-8 rounded-full border border-navy-900/15 px-7 py-3 text-sm font-semibold text-navy-800 transition-colors hover:bg-navy-900/[0.04]"
            >
              Explore for Learners
            </button>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col items-center text-center md:items-start md:text-left"
        >
          <img
            src="/photos/educators.jpg"
            alt="A teacher preparing an online tutoring session on a laptop"
            className="aspect-[4/3] w-full rounded-2xl object-cover shadow-[0_12px_32px_rgba(19,41,82,0.1)]"
          />
          <div className="mt-8 w-full rounded-2xl border border-navy-900/10 bg-white/70 backdrop-blur-sm px-6 py-6 sm:px-7 sm:py-7 shadow-[0_8px_28px_rgba(19,41,82,0.08)]">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-navy-700/60">
              For Educators
            </span>
            <h3 className="mt-3 text-3xl sm:text-4xl font-bold text-navy-950">Teach the world, on your terms.</h3>
            <p className="mt-4 text-navy-700/75">
              Set your own hours, connect with motivated learners globally, and get paid
              reliably for doing what you already love.
            </p>
            <button
              type="button"
              className="mt-8 rounded-full border border-navy-900/15 px-7 py-3 text-sm font-semibold text-navy-800 transition-colors hover:bg-navy-900/[0.04]"
            >
              Become a Tutor
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
