import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageShell from '../components/PageShell'
import NavyBand from '../components/NavyBand'
import PageHeader from '../components/PageHeader'
import CtaBand from '../components/CtaBand'
import { ensureGsapPlugins, gsap, ScrollTrigger } from '../lib/gsapSetup'
import { CheckIcon, CalendarIcon, MailIcon } from '../components/icons/LineIcons'

interface Tier {
  name: string
  price: number
  period: string
  description: string
  features: string[]
  cta: { label: string; to: string }
  color: string
  highlighted?: boolean
}

// Final approved pricing — not a placeholder.
const TIERS: Tier[] = [
  {
    name: 'Starter',
    price: 39,
    period: '/month',
    description: 'For your first real conversations.',
    features: ['Full AI roadmap', '2 live native-speaker sessions / month', 'Progress tracked after every conversation'],
    cta: { label: 'Start Your Journey', to: '/try-now' },
    color: '#2dd4bf',
  },
  {
    name: 'Growth',
    price: 89,
    period: '/month',
    description: 'For steady, visible momentum.',
    features: [
      'Everything in Starter',
      '4 live native-speaker sessions / month',
      'Business or exam-prep track (IELTS & TOEFL preparation)',
    ],
    cta: { label: 'Start Your Journey', to: '/try-now' },
    color: '#1ba3e0',
    highlighted: true,
  },
  {
    name: 'Intensive',
    price: 159,
    period: '/month',
    description: 'For a deadline you intend to hit.',
    features: ['Everything in Growth', '8 live sessions / month + priority scheduling', 'Weekly roadmap check-ins'],
    cta: { label: 'Start Your Journey', to: '/try-now' },
    color: '#a78bfa',
  },
]

// Local count-up variant (not the shared CountUpStat, which has no $ prefix
// support and is used elsewhere with its own centered-card layout) — counts
// from 0 to the tier price once it scrolls into view.
function PriceCountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const wrapRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    ensureGsapPlugins()
    const el = ref.current
    const wrap = wrapRef.current
    if (!el || !wrap) return

    const counter = { val: 0 }
    const trigger = ScrollTrigger.create({
      trigger: wrap,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        gsap.to(counter, {
          val: value,
          duration: 1.2,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = Math.round(counter.val).toString()
          },
        })
      },
    })

    return () => trigger.kill()
  }, [value])

  return (
    <span ref={wrapRef}>
      $<span ref={ref}>0</span>
    </span>
  )
}

export default function Pricing() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Pricing"
        title={
          <>
            Plans built around <span className="text-gradient-brand">how you learn.</span>
          </>
        }
        description="Straightforward pricing, no surprise fees. Switch or cancel anytime."
        image={{ src: '/photos/journey-app-2.png', alt: 'The placement conversation that shapes your LinkGlobal Network plan' }}
        imageAspect="3/2"
      />

      <section className="relative px-6 pb-16 sm:pb-20">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-3">
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`relative flex flex-col rounded-3xl bg-white p-8 ${
                tier.highlighted
                  ? 'shadow-[0_30px_80px_rgba(19,41,82,0.25)] lg:-translate-y-3'
                  : 'shadow-[0_15px_40px_rgba(19,41,82,0.1)]'
              }`}
              style={tier.highlighted ? { border: `2px solid ${tier.color}` } : undefined}
            >
              {tier.highlighted && (
                <span
                  className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-white"
                  style={{ background: tier.color }}
                >
                  Most Popular
                </span>
              )}

              <h3 className="text-lg font-bold text-navy-950">{tier.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-navy-950">
                  <PriceCountUp value={tier.price} />
                </span>
                <span className="text-sm text-navy-700/60">{tier.period}</span>
              </div>
              <p className="mt-3 text-sm text-navy-700/75">{tier.description}</p>

              <ul className="mt-6 flex-1 space-y-3">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-navy-700/80">
                    <span
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white"
                      style={{ background: tier.color }}
                    >
                      <CheckIcon className="h-3 w-3" />
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                to={tier.cta.to}
                className="mt-8 rounded-full px-6 py-3 text-center text-sm font-semibold text-white shadow-[0_8px_24px_rgba(0,0,0,0.18)] transition-transform hover:scale-105"
                style={{ background: tier.color }}
              >
                {tier.cta.label}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Previously a single buried sentence below the tiers — now its own
            clearly-showcased option, distinct from (not folded into) the
            monthly plans above, matching the client's ask to give it real
            visual weight rather than a footnote. Institutions gets the same
            treatment alongside it, since ForYou.tsx already covers that
            audience in depth and doesn't need a full duplicate pricing card
            here. */}
      </section>

      <NavyBand className="py-8 sm:py-12">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-cyan">Other ways to learn</p>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Not ready for a monthly plan?</h2>
        </div>
        <div className="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-2">
          <div className="flex items-start gap-4 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-cyan/15 text-brand-cyan">
              <CalendarIcon className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-white">Prefer to pay per session?</h3>
              <p className="mt-1 text-sm text-white/65">
                No monthly commitment — book and pay one session at a time. We'll help you find the right fit.
              </p>
              <a
                href="mailto:info@linkglobalnetwork.ca"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-cyan hover:gap-2.5 transition-all"
              >
                Get in touch <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-cyan/15 text-brand-cyan">
              <MailIcon className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-white">Schools, companies, or teams?</h3>
              <p className="mt-1 text-sm text-white/65">
                Bulk seats, admin dashboards, and custom billing for institutions and organizations.
              </p>
              <Link
                to="/contact"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-cyan hover:gap-2.5 transition-all"
              >
                Contact sales <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </NavyBand>

      <CtaBand
        title="Still deciding?"
        description="Try a session first — there's no better way to know if it's the right fit."
        primary={{ label: 'Start Your Journey', to: '/try-now' }}
        secondary={{ label: 'Contact Us', to: '/contact' }}
      />
    </PageShell>
  )
}
