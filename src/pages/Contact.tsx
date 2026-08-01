import { useState } from 'react'
import type { FormEvent } from 'react'
import { motion } from 'framer-motion'
import PageShell from '../components/PageShell'
import PageHeader from '../components/PageHeader'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const SUBJECTS = ['General Inquiry', 'Learner Support', 'Become a Tutor', 'Partnership / Institution', 'Press', 'Other']

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    // Honeypot — real visitors never fill this hidden field in.
    if (formData.get('company')) {
      setStatus('success')
      return
    }

    setStatus('submitting')
    setErrorMessage('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          subject: formData.get('subject'),
          message: formData.get('message'),
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => null)
        throw new Error(data?.error || 'Something went wrong. Please try again.')
      }

      setStatus('success')
      form.reset()
    } catch (err) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  return (
    <PageShell>
      <PageHeader
        eyebrow="Get in Touch"
        title={
          <>
            We'd love to <span className="text-gradient-brand">hear from you.</span>
          </>
        }
        description="Questions about learning, teaching, or bringing LinkGlobal Network to your organization — send us a message and we'll get back to you."
      />

      <section className="relative px-6 pb-24 sm:pb-32">
        <div className="mx-auto max-w-xl">
          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl border border-navy-900/10 bg-navy-900/[0.03] p-8 text-center"
            >
              <h2 className="text-2xl font-bold text-navy-950">Message sent.</h2>
              <p className="mt-3 text-navy-700/80">
                Thanks for reaching out — we'll get back to you as soon as we can.
              </p>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl border border-navy-900/10 bg-navy-900/[0.03] p-8"
            >
              {/* Honeypot field — hidden from real users via CSS, visible to bots. */}
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
                  <span className="text-sm font-semibold text-navy-800">Name</span>
                  <input
                    type="text"
                    name="name"
                    required
                    className="mt-1.5 w-full rounded-xl border border-navy-900/15 bg-white px-4 py-2.5 text-navy-950 outline-none transition-colors focus:border-brand-blue"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-navy-800">Email</span>
                  <input
                    type="email"
                    name="email"
                    required
                    className="mt-1.5 w-full rounded-xl border border-navy-900/15 bg-white px-4 py-2.5 text-navy-950 outline-none transition-colors focus:border-brand-blue"
                  />
                </label>
              </div>

              <label className="mt-5 block">
                <span className="text-sm font-semibold text-navy-800">Topic</span>
                <select
                  name="subject"
                  defaultValue={SUBJECTS[0]}
                  className="mt-1.5 w-full rounded-xl border border-navy-900/15 bg-white px-4 py-2.5 text-navy-950 outline-none transition-colors focus:border-brand-blue"
                >
                  {SUBJECTS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </label>

              <label className="mt-5 block">
                <span className="text-sm font-semibold text-navy-800">Message</span>
                <textarea
                  name="message"
                  required
                  rows={5}
                  className="mt-1.5 w-full resize-none rounded-xl border border-navy-900/15 bg-white px-4 py-2.5 text-navy-950 outline-none transition-colors focus:border-brand-blue"
                />
              </label>

              {status === 'error' && (
                <p className="mt-4 text-sm text-red-600">{errorMessage}</p>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="mt-7 w-full rounded-full px-8 py-3.5 text-sm font-semibold text-white shadow-[0_8px_30px_rgba(30,120,190,0.3)] transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
                style={{ background: 'linear-gradient(90deg, #1ba3e0, #3ec6ff)' }}
              >
                {status === 'submitting' ? 'Sending…' : 'Send Message'}
              </button>
            </motion.form>
          )}

          <p className="mt-8 text-center text-sm text-navy-700/60">
            Prefer email?{' '}
            <a href="mailto:info@linkglobalnetwork.ca" className="font-semibold text-brand-blue hover:underline">
              info@linkglobalnetwork.ca
            </a>
          </p>
        </div>
      </section>
    </PageShell>
  )
}
