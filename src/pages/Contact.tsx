import { useState } from 'react'
import type { FormEvent } from 'react'
import { motion } from 'framer-motion'
import PageShell from '../components/PageShell'
import PageHeader from '../components/PageHeader'
import { MailIcon } from '../components/icons/LineIcons'

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
        image={{ src: '/photos/journey-5.jpg', alt: 'Two people connecting in conversation' }}
      />

      <section className="relative px-6 pb-16 sm:pb-20">
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-[1.3fr_1fr]">
          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl bg-white p-8 text-center shadow-[0_15px_40px_rgba(19,41,82,0.1)]"
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
              className="rounded-3xl bg-white p-8 shadow-[0_15px_40px_rgba(19,41,82,0.1)]"
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

          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden rounded-3xl shadow-[0_20px_50px_rgba(19,41,82,0.15)]"
            >
              <img
                src="/photos/educators.jpg"
                alt="A LinkGlobal Network tutor ready to connect"
                className="aspect-[4/3] w-full object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl bg-white p-6 shadow-[0_15px_40px_rgba(19,41,82,0.1)]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue shadow-[0_6px_16px_rgba(0,0,0,0.18)]">
                <MailIcon className="h-5 w-5 text-white" />
              </div>
              <p className="mt-4 text-sm text-navy-700/70">Prefer email?</p>
              <a
                href="mailto:info@linkglobalnetwork.ca"
                className="mt-1 block font-semibold text-brand-blue hover:underline"
              >
                info@linkglobalnetwork.ca
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
