import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageShell from '../components/PageShell'
import Logo from '../components/Logo'

// Catch-all for unknown URLs (Vercel serves index.html for every path, so the
// router decides). PageMeta marks these pages noindex.

const SUGGESTIONS = [
  { label: 'For Learners', to: '/learners', line: 'Learn with a native-speaking tutor.' },
  { label: 'For Educators', to: '/educators', line: 'Teach on your own schedule.' },
  { label: 'Pricing', to: '/pricing', line: 'Plans, pay-per-session and institutions.' },
]

export default function NotFound() {
  return (
    <PageShell>
      <section className="relative px-6 pb-16 pt-36 sm:pb-24 sm:pt-44">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="flex items-center justify-center gap-3 text-7xl font-extrabold tracking-tight text-navy-950 sm:text-8xl">
            <span>4</span>
            <Logo markOnly className="h-20 w-20 sm:h-24 sm:w-24" />
            <span>4</span>
          </div>
          <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-navy-950 sm:text-5xl">
            This page got lost in <span className="text-brand-blue">translation.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base text-navy-700/75 sm:text-lg">
            The page you&rsquo;re looking for doesn&rsquo;t exist or has moved. Let&rsquo;s get you back to a real
            conversation.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/"
              className="rounded-full px-8 py-3.5 text-sm font-semibold text-white shadow-[0_8px_30px_rgba(30,120,190,0.3)] transition-transform hover:scale-105"
              style={{ background: 'linear-gradient(90deg, #1ba3e0, #3ec6ff)' }}
            >
              Back to home
            </Link>
            <Link
              to="/contact"
              className="rounded-full border border-navy-900/15 bg-white px-8 py-3.5 text-sm font-semibold text-navy-800 transition-colors hover:bg-navy-900/[0.03]"
            >
              Contact us
            </Link>
          </div>
        </motion.div>

        <div className="mx-auto mt-16 grid max-w-4xl gap-4 sm:grid-cols-3">
          {SUGGESTIONS.map((s) => (
            <Link
              key={s.to}
              to={s.to}
              className="group rounded-2xl bg-white p-5 shadow-[0_15px_40px_rgba(19,41,82,0.08)] transition-shadow hover:shadow-[0_20px_50px_rgba(19,41,82,0.14)]"
            >
              <p className="flex items-center justify-between font-bold text-navy-950">
                {s.label}
                <span className="text-brand-blue transition-transform group-hover:translate-x-1" aria-hidden="true">
                  →
                </span>
              </p>
              <p className="mt-1 text-sm text-navy-700/70">{s.line}</p>
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  )
}
