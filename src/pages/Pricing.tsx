import { useEffect, useRef } from 'react'
import PageShell from '../components/PageShell'
import NavyBand from '../components/NavyBand'
import PageHeader from '../components/PageHeader'
import CtaBand from '../components/CtaBand'
import SmartLink from '../components/SmartLink'
import { Reveal, Section, SectionHeading } from '../components/blocks'
import { ensureGsapPlugins, gsap, ScrollTrigger } from '../lib/gsapSetup'
import { CheckIcon } from '../components/icons/LineIcons'
import { LEARNER_SIGNUP_URL, PENDING } from '../content/site'

// Pricing, per Website Copy v7 (section 07): pay as you go at launch, no
// subscription. Prices come from content/site.ts; until set they read
// "Price to be announced". Subscription plans are built as card slots
// (PLAN_SLOTS) and switched on later by setting `enabled: true`.

interface PlanSlot {
  name: string
  type: string
  price: string | null
  features: string[]
  enabled: boolean
}

// Card slots from the copy doc's "Pricing build slots". To confirm before
// any go live: public-facing names, what each includes, and prices.
const PLAN_SLOTS: PlanSlot[] = [
  { name: 'Basic Subscription', type: 'Monthly', price: '$79.00', features: [], enabled: false },
  { name: 'Premium Subscription', type: 'Monthly', price: '$199.00', features: [], enabled: false },
  { name: 'P2P Tutoring', type: 'Per session', price: null, features: [], enabled: false },
  { name: 'AI-Based Feedback', type: 'Add-on', price: null, features: [], enabled: false },
  { name: 'Exam Courses', type: 'Course', price: null, features: [], enabled: false },
]

const FAQ: { q: string; a: string }[] = [
  { q: 'Do I have to subscribe?', a: 'No. You pay for the lessons you book, and nothing more.' },
  { q: 'What is free?', a: 'Your assessment, learning path, AI-guided practice, and progress overview.' },
  { q: 'Is there a demo lesson?', a: 'No. Your level and path are created before you book, so you can see the direction first.' },
  {
    q: 'What if I cancel a lesson?',
    a: 'A lesson you cancel is not refunded. If your educator cancels, the value returns to your balance.',
  },
  {
    q: 'How is conversation practice different from a lesson?',
    a: 'A lesson is structured teaching with a certified educator. Conversation practice is speaking with a native speaker, with no lesson plan.',
  },
  {
    q: 'Which languages are offered?',
    a: PENDING.languages?.length ? `${PENDING.languages.join(', ')}.` : 'Get in touch and we will share the current list.',
  },
]

/** Counts a price like "$45" or "$79.00" up from zero when scrolled into view. */
function Price({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const m = value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/)

  useEffect(() => {
    if (!m || !ref.current) return
    ensureGsapPlugins()
    const el = ref.current
    const target = parseFloat(m[2])
    const decimals = m[2].includes('.') ? m[2].split('.')[1].length : 0
    const counter = { val: 0 }
    el.textContent = `${m[1]}${(0).toFixed(decimals)}${m[3]}`
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () =>
        gsap.to(counter, {
          val: target,
          duration: 1.2,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = `${m[1]}${counter.val.toFixed(decimals)}${m[3]}`
          },
        }),
    })
    return () => trigger.kill()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return <span ref={ref}>{value}</span>
}

function PaidCard({
  eyebrow,
  title,
  price,
  unit,
  features,
  cta,
  delay,
}: {
  eyebrow: string
  title: string
  price: string | null
  unit?: string
  features: string[]
  cta: string
  delay: number
}) {
  return (
    <Reveal delay={delay}>
      <div className="flex h-full flex-col rounded-3xl bg-white p-8 shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-blue">{eyebrow}</p>
        <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-navy-950">{title}</h3>
        <p className="mt-5 flex items-baseline gap-2">
          {price ? (
            <>
              <span className="text-5xl font-extrabold text-navy-950">
                <Price value={price} />
              </span>
              {unit && <span className="text-navy-700/60">{unit}</span>}
            </>
          ) : (
            <span className="text-xl font-bold text-navy-700/60">Price to be announced</span>
          )}
        </p>
        <ul className="mt-6 flex-1 space-y-3">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-3 text-navy-700/85">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-blue text-white">
                <CheckIcon className="h-3 w-3" />
              </span>
              {f}
            </li>
          ))}
        </ul>
        <SmartLink
          to={LEARNER_SIGNUP_URL}
          className="mt-8 rounded-full px-6 py-3.5 text-center text-sm font-semibold text-white shadow-[0_8px_24px_rgba(30,120,190,0.3)] transition-transform hover:scale-105"
          style={{ background: 'linear-gradient(90deg, #1ba3e0, #3ec6ff)' }}
        >
          {cta}
        </SmartLink>
      </div>
    </Reveal>
  )
}

export default function Pricing() {
  const livePlans = PLAN_SLOTS.filter((p) => p.enabled)

  const faqJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  })

  return (
    <PageShell>
      <PageHeader
        eyebrow="Pricing"
        title={
          <>
            Pay for the lessons <span className="text-gradient-brand">you take.</span>
          </>
        }
        description="No subscription. Your assessment, learning path, and AI-guided practice are free."
        actions={[{ label: 'Start Your Journey', to: LEARNER_SIGNUP_URL }]}
        image={{ src: '/photos/journey-app-2.png', alt: 'The placement conversation that builds your LinkGlobal path' }}
        imageAspect="3/2"
      />

      <Section className="pt-4 sm:pt-8">
        <SectionHeading title="Free to use" />
        <ul className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-2">
          {['Assessment and level determination', 'Your personalized learning path', 'AI-guided practice', 'Progress overview'].map(
            (t, i) => (
              <Reveal key={t} delay={i * 0.06}>
                <li className="flex items-center gap-4 rounded-2xl bg-white p-5 text-lg font-semibold text-navy-950 shadow-[0_10px_30px_rgba(19,41,82,0.07)]">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                    <CheckIcon className="h-4 w-4" />
                  </span>
                  {t}
                </li>
              </Reveal>
            ),
          )}
        </ul>
        <Reveal className="mx-auto mt-8 max-w-2xl text-center">
          <p className="text-navy-700/75">There is no demo lesson. Your level and your path are ready before you book anything.</p>
        </Reveal>
      </Section>

      <NavyBand className="py-10 sm:py-16">
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          <PaidCard
            eyebrow="Lessons · Pay as you go"
            title="Book lessons individually with a certified educator."
            price={PENDING.lessonPrice}
            unit="per lesson"
            features={['Live one-to-one session', 'Educator briefed from your path', 'Your path updated afterwards']}
            cta="Start Your Journey"
            delay={0}
          />
          <PaidCard
            eyebrow="Personal AI feedback"
            title="Detailed analysis of how you speak."
            price={PENDING.aiFeedbackPrice}
            features={['Feedback on fluency, hesitation, and accuracy', 'Specific areas to focus on next', 'Delivered into your learning path']}
            cta="Add Personal AI Feedback"
            delay={0.1}
          />
        </div>

        {livePlans.length > 0 && (
          <div className="mx-auto mt-10 grid max-w-6xl gap-6 md:grid-cols-3">
            {livePlans.map((p, i) => (
              <PaidCard
                key={p.name}
                eyebrow={p.type}
                title={p.name}
                price={p.price}
                features={p.features}
                cta="Start Your Journey"
                delay={i * 0.08}
              />
            ))}
          </div>
        )}
      </NavyBand>

      <Section>
        <SectionHeading
          eyebrow="Booking and cancellations"
          title="Lessons are booked and paid for individually."
          line="A lesson you cancel after booking is not refunded. If your educator cancels, the full value returns to your balance for another lesson."
        />
      </Section>

      <Section className="pt-0 sm:pt-4">
        <SectionHeading title="Common questions" />
        <div className="mx-auto mt-10 max-w-3xl space-y-3">
          {FAQ.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.04}>
              <details className="group rounded-2xl bg-white p-5 shadow-[0_10px_30px_rgba(19,41,82,0.07)] open:shadow-[0_15px_40px_rgba(19,41,82,0.12)]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold text-navy-950">
                  {f.q}
                  <span className="text-2xl leading-none text-brand-blue transition-transform group-open:rotate-45" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="mt-3 leading-relaxed text-navy-700/80">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd }} />
      </Section>

      <CtaBand
        title="Start with one lesson."
        description="Nothing to subscribe to, nothing to cancel."
        primary={{ label: 'Start Your Journey', to: LEARNER_SIGNUP_URL }}
      />
    </PageShell>
  )
}
