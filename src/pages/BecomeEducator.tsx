import { useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageShell from '../components/PageShell'
import PageHeader from '../components/PageHeader'
import { CONTACT_EMAIL, PENDING, WEB3FORMS_KEY } from '../content/site'
import { COUNTRIES } from '../content/countries'

// Educator (speaker) application, Nov 2026. "Start Teaching With Us" lands
// here. Submissions are emailed to CONTACT_EMAIL through Web3Forms so the
// admin can review each one before signing the educator up to the platform.
// Client revision (Nov 26 2026): country of birth, languages from a dropdown
// with a level for each, over-18 confirmation, optional "about you" message;
// payment question removed; no reply-time promise.

type Status = 'idle' | 'submitting' | 'success' | 'error'

interface LangRow {
  id: number
  name: string
  level: string
  custom: boolean
}

const LANGUAGES = PENDING.languages ?? []
const LEVELS = ['Native', 'Advanced', 'Intermediate', 'Beginner']
const OTHER = '__other__'

const field =
  'mt-1.5 w-full rounded-xl border border-navy-900/15 bg-white px-4 py-2.5 text-navy-950 outline-none transition-colors focus:border-brand-blue'
const labelText = 'text-sm font-semibold text-navy-800'

export default function BecomeEducator() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [rows, setRows] = useState<LangRow[]>([])
  const nextId = useRef(1)

  const chosen = new Set(rows.filter((r) => !r.custom).map((r) => r.name))

  function addLanguage(value: string) {
    if (!value) return
    const custom = value === OTHER
    setRows((cur) => [...cur, { id: nextId.current++, name: custom ? '' : value, level: '', custom }])
  }

  function updateRow(id: number, patch: Partial<LangRow>) {
    setRows((cur) => cur.map((r) => (r.id === id ? { ...r, ...patch } : r)))
  }

  function removeRow(id: number) {
    setRows((cur) => cur.filter((r) => r.id !== id))
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
    const country = get('country')
    const about = get('about')

    const langs = rows.map((r) => ({ ...r, name: r.name.trim() })).filter((r) => r.name)
    if (langs.length === 0) {
      setStatus('error')
      setErrorMessage('Please add at least one language you speak.')
      return
    }
    if (langs.some((r) => !r.level)) {
      setStatus('error')
      setErrorMessage('Please choose a level for each language.')
      return
    }

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
          'Country of birth': country,
          Languages: langs.map((r) => `${r.name} (${r.level})`).join(', '),
          'Confirmed over 18': 'Yes',
          'About them': about || '(not provided)',
        }),
      })
      const json = await res.json().catch(() => null)
      if (!res.ok || !json?.success) throw new Error('Something went wrong. Please try again.')
      setStatus('success')
      form.reset()
      setRows([])
    } catch (err) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  return (
    <PageShell>
      <PageHeader
        eyebrow="Teach with LinkGlobal"
        title={
          <>
            Apply to <span className="text-gradient-brand">teach</span>
          </>
        }
        description="Tell us about yourself. Our team reviews every application."
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
              <p className="mt-3 text-navy-700/80">Your application is with our team.</p>
              <div className="mx-auto mt-6 max-w-md rounded-2xl border-2 border-brand-blue/30 bg-[#e8f6fd] p-5 text-left">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">One more step</p>
                <p className="mt-2 text-navy-800">
                  Please email your CV to{' '}
                  <a
                    href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Educator application CV')}`}
                    className="font-semibold text-brand-blue underline underline-offset-2"
                  >
                    {CONTACT_EMAIL}
                  </a>{' '}
                  with your full name in the subject line, so we can match it to your application.
                </p>
              </div>
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
                <label className="block sm:col-span-2">
                  <span className={labelText}>Country of birth</span>
                  <select name="country" required defaultValue="" className={field}>
                    <option value="" disabled>
                      Choose a country
                    </option>
                    {COUNTRIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <fieldset className="mt-7">
                <legend className={labelText}>Languages you speak</legend>
                <p className="mt-1 text-sm text-navy-700/60">Add each language and choose your level. You can add as many as you like.</p>

                {rows.length > 0 && (
                  <ul className="mt-3 space-y-2">
                    {rows.map((r) => (
                      <li key={r.id} className="flex flex-wrap items-center gap-2 rounded-xl border border-navy-900/10 bg-[#f5fbfe] p-2.5 sm:flex-nowrap">
                        {r.custom ? (
                          <input
                            type="text"
                            value={r.name}
                            onChange={(e) => updateRow(r.id, { name: e.target.value })}
                            placeholder="Language name"
                            aria-label="Language name"
                            required
                            className="min-w-0 flex-1 rounded-lg border border-navy-900/15 bg-white px-3 py-2 text-navy-950 outline-none focus:border-brand-blue"
                          />
                        ) : (
                          <span className="min-w-0 flex-1 px-2 font-semibold text-navy-950">{r.name}</span>
                        )}
                        <select
                          value={r.level}
                          onChange={(e) => updateRow(r.id, { level: e.target.value })}
                          aria-label={`Level for ${r.name || 'this language'}`}
                          required
                          className="rounded-lg border border-navy-900/15 bg-white px-3 py-2 text-navy-950 outline-none focus:border-brand-blue"
                        >
                          <option value="" disabled>
                            Choose level
                          </option>
                          {LEVELS.map((l) => (
                            <option key={l} value={l}>
                              {l}
                            </option>
                          ))}
                        </select>
                        <button
                          type="button"
                          onClick={() => removeRow(r.id)}
                          aria-label={`Remove ${r.name || 'this language'}`}
                          className="flex h-9 w-9 items-center justify-center rounded-full text-navy-700/60 transition-colors hover:bg-red-50 hover:text-red-600"
                        >
                          ✕
                        </button>
                      </li>
                    ))}
                  </ul>
                )}

                <select
                  value=""
                  onChange={(e) => addLanguage(e.target.value)}
                  aria-label="Add a language"
                  className={`${field} mt-3`}
                >
                  <option value="">{rows.length ? '+ Add another language' : '+ Add a language'}</option>
                  {LANGUAGES.filter((l) => !chosen.has(l)).map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                  <option value={OTHER}>Other (not listed)</option>
                </select>
              </fieldset>

              <label className="mt-7 block">
                <span className={labelText}>
                  Tell us about yourself <span className="font-normal text-navy-700/60">(optional)</span>
                </span>
                <textarea
                  name="about"
                  rows={5}
                  placeholder="Your teaching experience, qualifications, interests, or anything else you would like us to know."
                  className={`${field} resize-y`}
                />
              </label>

              <label className="mt-6 flex cursor-pointer items-start gap-3">
                <input type="checkbox" name="over18" required className="mt-1 h-4 w-4 shrink-0 accent-[#1ba3e0]" />
                <span className="text-sm font-semibold text-navy-800">I confirm I am over 18</span>
              </label>

              <p className="mt-6 rounded-xl bg-[#e8f6fd] px-4 py-3 text-sm text-navy-800">
                <span className="font-semibold">Have your CV ready.</span> After you submit, we will ask you to email it to{' '}
                {CONTACT_EMAIL}.
              </p>

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
