import { useState } from 'react'
import type { FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageShell from '../components/PageShell'
import PageHeader from '../components/PageHeader'
import { CONTACT_EMAIL, PENDING, WEB3FORMS_KEY } from '../content/site'

// Educator (speaker) application, Nov 2026. "Start Teaching With Us" lands
// here. Submissions are emailed to CONTACT_EMAIL through Web3Forms so the
// admin can review each one before signing the educator up to the platform.
// We only ask HOW they want to be paid, never for account or banking numbers:
// those are collected privately during onboarding.

type Status = 'idle' | 'submitting' | 'success' | 'error'

const LANGUAGES = PENDING.languages ?? []
const PAYMENT_METHODS = ['Interac e-Transfer', 'Wire transfer', 'PayPal', 'Other']

const field =
  'mt-1.5 w-full rounded-xl border border-navy-900/15 bg-white px-4 py-2.5 text-navy-950 outline-none transition-colors focus:border-brand-blue'
const labelText = 'text-sm font-semibold text-navy-800'

export default function BecomeEducator() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [languages, setLanguages] = useState<string[]>([])
  const [payment, setPayment] = useState('')

  function toggleLanguage(lang: string) {
    setLanguages((cur) => (cur.includes(lang) ? cur.filter((l) => l !== lang) : [...cur, lang]))
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    // Honeypot: real visitors never fill this hidden field in.
    if (data.get('company')) {
      setStatus('success')
      return
    }

    const get = (k: string) => String(data.get(k) ?? '').trim()
    const firstName = get('firstName')
    const lastName = get('lastName')
    const email = get('email')
    const phone = get('phone')
    const otherLanguages = get('otherLanguages')
    const paymentOther = get('paymentOther')

    const allLanguages = [...languages, ...(otherLanguages ? [otherLanguages] : [])]
    if (allLanguages.length === 0) {
      setStatus('error')
      setErrorMessage('Please choose at least one language you speak fluently.')
      return
    }
    if (!payment) {
      setStatus('error')
      setErrorMessage('Please choose how you would like to be paid.')
      return
    }
    const paymentMethod = payment === 'Other' ? `Other: ${paymentOther || 'not specified'}` : payment

    if (!WEB3FORMS_KEY) {
      setStatus('error')
      setErrorMessage(`Applications are not connected yet. Please email your details to ${CONTACT_EMAIL}.`)
      return
    }

    setStatus('submitting')
    setErrorMessage('')

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `[Educator Application] ${firstName} ${lastName}`,
          from_name: 'LinkGlobal website',
          replyto: email,
          'First name': firstName,
          'Last name': lastName,
          Email: email,
          Phone: phone,
          Languages: allLanguages.join(', '),
          'Payment method': paymentMethod,
        }),
      })
      const json = await res.json().catch(() => null)
      if (!res.ok || !json?.success) throw new Error('Something went wrong. Please try again.')
      setStatus('success')
      form.reset()
      setLanguages([])
      setPayment('')
    } catch (err) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  const within = PENDING.replyDays
    ? ` within ${PENDING.replyDays === 1 ? 'one business day' : `${PENDING.replyDays} business days`}`
    : ''

  return (
    <PageShell>
      <PageHeader
        eyebrow="Teach with LinkGlobal"
        title={
          <>
            Apply to <span className="text-gradient-brand">teach</span>
          </>
        }
        description={`Tell us about yourself. Our team reviews every application and replies${within}.`}
        image={{ src: '/photos/educator-headset.jpg', alt: 'An educator wearing a headset, ready to teach a lesson online', position: '50% 35%' }}
      />

      <section className="relative px-6 pb-16 sm:pb-20">
        <div className="mx-auto max-w-3xl">
          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl bg-white p-8 text-center shadow-[0_15px_40px_rgba(19,41,82,0.1)]"
            >
              <h2 className="text-2xl font-bold text-navy-950">Thank you for applying.</h2>
              <p className="mt-3 text-navy-700/80">
                Your application is with our team. We will review it and contact you by email{within}.
              </p>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-3xl bg-white p-6 shadow-[0_15px_40px_rgba(19,41,82,0.1)] sm:p-8"
            >
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
                aria-hidden="true"
              />

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className={labelText}>First name</span>
                  <input type="text" name="firstName" required autoComplete="given-name" className={field} />
                </label>
                <label className="block">
                  <span className={labelText}>Last name</span>
                  <input type="text" name="lastName" required autoComplete="family-name" className={field} />
                </label>
                <label className="block">
                  <span className={labelText}>Email</span>
                  <input type="email" name="email" required autoComplete="email" className={field} />
                </label>
                <label className="block">
                  <span className={labelText}>Phone number</span>
                  <input
                    type="tel"
                    name="phone"
                    required
                    autoComplete="tel"
                    pattern="[0-9+()\-\s.]{7,}"
                    title="Please enter a valid phone number, including the country code if you are outside Canada."
                    placeholder="+1 555 123 4567"
                    className={field}
                  />
                </label>
              </div>

              <fieldset className="mt-7">
                <legend className={labelText}>Languages you speak fluently</legend>
                <p className="mt-1 text-sm text-navy-700/60">Choose all that apply.</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {LANGUAGES.map((lang) => {
                    const on = languages.includes(lang)
                    return (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => toggleLanguage(lang)}
                        aria-pressed={on}
                        className={`rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-colors ${
                          on
                            ? 'border-brand-blue bg-brand-blue text-white shadow-[0_4px_12px_rgba(27,163,224,0.3)]'
                            : 'border-navy-900/15 bg-white text-navy-800 hover:border-brand-blue/60'
                        }`}
                      >
                        {lang}
                      </button>
                    )
                  })}
                </div>
                <label className="mt-4 block">
                  <span className="text-sm text-navy-700/80">Another language not listed?</span>
                  <input type="text" name="otherLanguages" placeholder="For example, Tagalog" className={field} />
                </label>
              </fieldset>

              <fieldset className="mt-7">
                <legend className={labelText}>How would you like to be paid?</legend>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {PAYMENT_METHODS.map((m) => (
                    <label
                      key={m}
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${
                        payment === m ? 'border-brand-blue bg-[#e8f6fd] text-navy-950' : 'border-navy-900/15 text-navy-800 hover:border-brand-blue/60'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={m}
                        checked={payment === m}
                        onChange={() => setPayment(m)}
                        className="h-4 w-4 accent-[#1ba3e0]"
                      />
                      {m}
                    </label>
                  ))}
                </div>
                {payment === 'Other' && (
                  <label className="mt-3 block">
                    <span className="text-sm text-navy-700/80">Which method?</span>
                    <input type="text" name="paymentOther" required className={field} />
                  </label>
                )}
                <p className="mt-3 text-sm text-navy-700/60">
                  Please do not include any account or banking details. We will collect those securely if you are selected.
                </p>
              </fieldset>

              {status === 'error' && (
                <p className="mt-5 text-sm text-red-600" role="alert">
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="mt-7 w-full rounded-full px-8 py-3.5 text-sm font-semibold text-white shadow-[0_8px_30px_rgba(30,120,190,0.3)] transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
                style={{ background: 'linear-gradient(90deg, #1ba3e0, #3ec6ff)' }}
              >
                {status === 'submitting' ? 'Sending...' : 'Submit My Application'}
              </button>
              <p className="mt-4 text-center text-sm text-navy-700/60">
                We use your details only to review your application. See our{' '}
                <Link to="/privacy" className="font-semibold text-brand-blue hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </motion.form>
          )}
        </div>
      </section>
    </PageShell>
  )
}
