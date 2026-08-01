import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageShell from '../components/PageShell'
import PageHeader from '../components/PageHeader'
import CtaBand from '../components/CtaBand'
import { CheckIcon } from '../components/icons/LineIcons'

// Placeholder tiers/prices — swap in real numbers when ready. Structure
// (3 tiers, feature lists, "most popular" middle tier) is the real design.
interface Tier {
  name: string
  price: string
  period?: string
  description: string
  features: string[]
  cta: { label: string; to: string }
  highlighted?: boolean
}

const TIERS: Tier[] = [
  {
    name: 'Starter',
    price: '$19',
    period: '/month',
    description: 'For learners just getting started with regular practice.',
    features: [
      '2 live tutor sessions / month',
      'Guided placement assessment',
      'Community practice access',
      'Basic progress tracking',
    ],
    cta: { label: 'Start Learning', to: '/try-now' },
  },
  {
    name: 'Premium',
    price: '$49',
    period: '/month',
    description: 'For learners serious about getting fluent, fast.',
    features: [
      '6 live tutor sessions / month',
      'Priority tutor matching',
      'AI-supported practice reports',
      'Flexible rescheduling',
      'Progress milestones & goals',
    ],
    cta: { label: 'Start Learning', to: '/try-now' },
    highlighted: true,
  },
  {
    name: 'Institutions',
    price: 'Custom',
    description: 'For schools, companies, and language programs.',
    features: [
      'Bulk seats for teams or classrooms',
      'Admin dashboard & cohort reporting',
      'Dedicated onboarding & support',
      'Custom billing arrangements',
    ],
    cta: { label: 'Contact Sales', to: '/contact' },
  },
]

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
      />

      <section className="relative px-6 pb-24 sm:pb-32">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-3">
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`relative flex flex-col rounded-3xl p-8 ${
                tier.highlighted
                  ? 'border-2 border-brand-blue bg-white shadow-[0_30px_80px_rgba(19,41,82,0.18)] lg:-translate-y-3'
                  : 'border border-navy-900/10 bg-navy-900/[0.03]'
              }`}
            >
              {tier.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-blue px-4 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-white">
                  Most Popular
                </span>
              )}

              <h3 className="text-lg font-bold text-navy-950">{tier.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-navy-950">{tier.price}</span>
                {tier.period && <span className="text-sm text-navy-700/60">{tier.period}</span>}
              </div>
              <p className="mt-3 text-sm text-navy-700/75">{tier.description}</p>

              <ul className="mt-6 flex-1 space-y-3">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-navy-700/80">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
                      <CheckIcon className="h-3 w-3" />
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                to={tier.cta.to}
                className={`mt-8 rounded-full px-6 py-3 text-center text-sm font-semibold transition-transform hover:scale-105 ${
                  tier.highlighted
                    ? 'text-white shadow-[0_8px_30px_rgba(30,120,190,0.3)]'
                    : 'border border-navy-900/15 text-navy-800 hover:bg-navy-900/[0.04]'
                }`}
                style={tier.highlighted ? { background: 'linear-gradient(90deg, #1ba3e0, #3ec6ff)' } : undefined}
              >
                {tier.cta.label}
              </Link>
            </motion.div>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-lg text-center text-sm text-navy-700/60">
          Prefer to pay per session instead of a monthly plan?{' '}
          <a href="mailto:info@linkglobalnetwork.ca" className="font-semibold text-brand-blue hover:underline">
            Get in touch
          </a>{' '}
          and we'll help you find the right fit.
        </p>
      </section>

      <CtaBand
        title="Still deciding?"
        description="Try a session first — there's no better way to know if it's the right fit."
        primary={{ label: 'Try It Now', to: '/try-now' }}
        secondary={{ label: 'Contact Us', to: '/contact' }}
      />
    </PageShell>
  )
}
