import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'

// Cookie consent (opt-in). index.html starts Google Analytics in Consent Mode
// "denied" and holds the Meta Pixel back until window.lgLoadPixel() runs.
// This banner records the visitor's choice in localStorage and applies it.
// The footer's "Cookie settings" reopens it via openCookieSettings().
//
// Bump the key's version to ask everyone again (e.g. after adding a new tool).

const KEY = 'lg-consent-v1'
const OPEN_EVENT = 'lg:cookie-settings'

type Choice = 'granted' | 'denied'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
    lgLoadPixel?: () => void
  }
}

function readChoice(): Choice | null {
  try {
    const v = window.localStorage.getItem(KEY)
    return v === 'granted' || v === 'denied' ? v : null
  } catch {
    return null
  }
}

/** Drop analytics/ad cookies already set, when someone withdraws consent. */
function clearTrackingCookies() {
  const host = window.location.hostname
  const domains = ['', host, `.${host}`, `.${host.replace(/^www\./, '')}`]
  document.cookie
    .split(';')
    .map((c) => c.trim().split('=')[0])
    .filter((name) => /^(_ga|_gid|_gat|_fbp|_fbc)/.test(name))
    .forEach((name) => {
      domains.forEach((d) => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${d ? `; domain=${d}` : ''}`
      })
    })
}

function apply(choice: Choice) {
  try {
    window.localStorage.setItem(KEY, choice)
  } catch {
    // Storage blocked: the choice applies to this visit only.
  }
  const state = choice === 'granted' ? 'granted' : 'denied'
  window.gtag?.('consent', 'update', {
    ad_storage: state,
    ad_user_data: state,
    ad_personalization: state,
    analytics_storage: state,
  })
  if (choice === 'granted') {
    window.lgLoadPixel?.()
  } else {
    window.fbq?.('consent', 'revoke')
    clearTrackingCookies()
  }
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_EVENT))
}

export default function CookieConsent() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!readChoice()) setOpen(true)
    const reopen = () => setOpen(true)
    window.addEventListener(OPEN_EVENT, reopen)
    return () => window.removeEventListener(OPEN_EVENT, reopen)
  }, [])

  const choose = (choice: Choice) => {
    apply(choice)
    setOpen(false)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-live="polite"
          aria-label="Cookie choices"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="lg-hide-on-intro fixed bottom-4 left-3 right-24 z-[60] rounded-3xl bg-white p-5 shadow-[0_20px_60px_rgba(10,17,40,0.28)] ring-1 ring-navy-900/[0.08] sm:left-6 sm:right-auto sm:max-w-md sm:p-6"
        >
          <p className="text-base font-bold text-navy-950">Cookies, with your permission</p>
          <p className="mt-2 text-sm leading-relaxed text-navy-700/80">
            With your OK, we use Google Analytics to see how the site is used and the Meta Pixel to measure our ads. You can
            change this any time in Cookie settings.{' '}
            <Link to="/privacy#cookies" className="font-semibold text-brand-blue hover:underline">
              Learn more
            </Link>
          </p>
          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={() => choose('granted')}
              className="flex-1 rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(30,120,190,0.3)] transition-transform hover:scale-[1.03]"
              style={{ background: 'linear-gradient(90deg, #1ba3e0, #3ec6ff)' }}
            >
              Accept
            </button>
            <button
              type="button"
              onClick={() => choose('denied')}
              className="flex-1 rounded-full border border-navy-900/15 bg-white px-5 py-2.5 text-sm font-semibold text-navy-800 transition-colors hover:bg-navy-900/[0.04]"
            >
              Decline
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
