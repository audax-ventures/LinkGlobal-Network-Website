import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageShell from '../components/PageShell'
import Logo from '../components/Logo'

// Catch-all for unknown URLs (Vercel serves index.html for every path, so the
// router decides). PageMeta marks these pages noindex.

const SUGGESTIONS = [
  { label: 'For Learners', to: '/for-learners' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Contact', to: '/contact' },
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
            This page has <span className="text-brand-blue">moved.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base text-navy-700/75 sm:text-lg">
            Everything else is where you left it.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/"
              className="rounded-full px-8 py-3.5 text-sm font-semibold text-white shadow-[0_8px_30px_rgba(30,120,190,0.3)] transition-transform hover:scale-105"
              style={{ background: 'linear-gradient(90deg, #1ba3e0, #3ec6ff)' }}
            >
              Back to Homepage
            </Link>
          </div>
        </motion.div>

        <nav className="mx-auto mt-10 flex items-center justify-center gap-3 text-sm font-semibold text-navy-700/70" aria-label="Popular pages">
          {SUGGESTIONS.map((l, i) => (
            <span key={l.to} className="flex items-center gap-3">
              {i > 0 && <span aria-hidden="true">·</span>}
              <Link to={l.to} className="transition-colors hover:text-brand-blue">
                {l.label}
              </Link>
            </span>
          ))}
        </nav>
      </section>
    </PageShell>
  )
}
