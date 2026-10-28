import { useEffect, useRef } from 'react'
import PageShell from '../components/PageShell'
import NavyBand from '../components/NavyBand'
import PageHeader from '../components/PageHeader'
import CtaBand from '../components/CtaBand'
import SmartLink from '../components/SmartLink'
import { Reveal, Section, SectionHeading } from '../components/blocks'
import Photo from '../components/Photo'
import { ensureGsapPlugins, gsap, ScrollTrigger } from '../lib/gsapSetup'
import { CheckIcon } from '../components/icons/LineIcons'
import { LEARNER_SIGNUP_URL, PENDING } from '../content/site'

// Pricing, per Website Copy v7 (section 07): pay as you go, plus (revision
// brief 2, item 42) the monthly subscription plans and prices from the
// previous version of the website. Lesson prices come from content/site.ts;
// until set they read "Price to be announced". Other card slots stay off
// until `enabled: true`. Prices are in Canadian dollars (PENDING.currency).

interface PlanSlot {
  name: string
  type: string
  price: string | null
  features: string[]
  enabled: boolean
  /** One-line description under the plan name. */
  line?: string
  /** Shows a "Most popular" badge. */
  popular?: boolean
}

// Card slots from the copy doc's "Pricing build slots". To confirm before
// any go live: public-facing names, what each includes, and prices.
const PLAN_SLOTS: PlanSlot[] = [
  {
    name: 'Starter',
    type: 'Monthly',
    price: '$39',
    line: 'For your first real conversations.',
    features: ['Full AI roadmap', '2 live native-speaker sessions / month', 'Progress tracked after every conversation'],
    enabled: true,
  },
  {
    name: 'Growth',
    type: 'Monthly',
    price: '$89',
    line: 'For steady, visible momentum.',
    features: ['Everything in Starter', '4 live native-speaker sessions / month', 'Business or exam-prep track (IELTS and TOEFL)'],
    enabled: true,
    popular: true,
  },
  {
    name: 'Intensive',
    type: 'Monthly',
    price: '$159',
    line: 'For a deadline you intend to hit.',
    features: ['Everything in Growth', '8 live sessions / month and priority scheduling', 'Weekly roadmap check-ins'],
    enabled: true,
  },
  { name: 'P2P Tutoring', type: 'Per session', price: null, features: [], enabled: false },
  { name: 'AI-Based Feedback', type: 'Add-on', price: null, features: [], enabled: false },
  { name: 'Exam Courses', type: 'Course', price: null, features: [], enabled: false },
]

const FAQ: { q: string; a: string }[] = [
  { q: 'Do I have to subscribe?', a: 'No. You can pay for each lesson you book, or choose a monthly plan.' },
  { q: 'What is free?', a: 'Your personalized learning path and your progress overview.' },
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
  line,
  popular = false,
  priceNote,
}: {
  eyebrow: string
  title: string
  price: string | null
  unit?: string
  features: string[]
  cta: string
  delay: number
  line?: string
  popular?: boolean
  priceNote?: string
}) {
  return (
    <Reveal delay={delay}>
      <div
        className={`relative flex h-full flex-col rounded-3xl bg-white p-8 shadow-[0_30px_80px_rgba(0,0,0,0.35)] ${popular ? 'ring-4 ring-brand-cyan' : ''}`}
      >
        {popular && (
          <span className="absolute right-6 top-6 rounded-full bg-brand-blue px-3 py-1 text-sm font-bold text-white">Most popular</span>
        )}
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-brand-blue">{eyebrow}</p>
        <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-navy-950">{title}</h3>
        {line && <p className="mt-1.5 text-navy-700/70">{line}</p>}
        <p className="mt-5 flex items-baseline gap-2">
          {price ? (
            <>
              <span className="text-5xl font-extrabold text-navy-950">
                <Price value={price} />
              </span>
              {unit && <span className="text-navy-700/60">{unit}</span>}
            </>
          ) : (
            <span className="text-xl font-bold text-navy-700/60">{priceNote ?? 'Price to be announced'}</span>
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

  // Product data (copy v7 section 09: "On Pricing, once prices are set").
  // Emitted only when a price and the currency are both known.
  const toAmount = (price: string | null) => {
    const m = price?.match(/(\d+(?:\.\d+)?)/)
    return m ? m[1] : null
  }
  const offers = [
    { name: 'Lesson with a certified educator', price: toAmount(PENDING.lessonPrice) },
    { name: 'Personal AI Feedback', price: toAmount(PENDING.aiFeedbackPrice) },
    ...livePlans.map((p) => ({ name: `${p.name} monthly plan`, price: toAmount(p.price) })),
  ].filter((o): o is { name: string; price: string } => !!o.price)
  const productJsonLd =
    PENDING.currency && offers.length
      ? JSON.stringify(
          offers.map((o) => ({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: o.name,
            brand: { '@type': 'Brand', name: 'LinkGlobal' },
            offers: { '@type': 'Offer', price: o.price, priceCurrency: PENDING.currency, availability: 'https://schema.org/InStock' },
          })),
        )
      : null

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
        actions={[{ label: 'Start Your Journey', to: LEARNER_SIGNUP_URL }]}
        image={{ src: '/photos/professional-video-call.jpg', alt: 'A learner waving at the start of a video lesson' }}
      />

      <Section className="pt-4 sm:pt-8">
        <SectionHeading title="Free to use" />
        {/* Brief 2, item 41: each free item gets its own picture and the
            cards fill the width. The final free list is still to be
            confirmed by the client (the AI assessment is not free). */}
        <ul className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-2">
          {[
            {
              t: 'Your personalized learning path',
              line: 'See the whole route to your goal before you book anything.',
              photo: '/photos/learner-tablet-headset.jpg',
              alt: 'A learner in a headset studying from a tablet with her books open',
            },
            {
              t: 'Progress overview',
              line: 'Watch your speaking improve, session by session.',
              photo: '/photos/learner-excited.jpg',
              alt: 'A learner celebrating at his laptop, surrounded by books',
            },
          ].map(({ t, line, photo, alt }, i) => (
            <Reveal key={t} delay={i * 0.08} from={i % 2 ? 'right' : 'left'}>
              <li className="h-full overflow-hidden rounded-3xl bg-white shadow-[0_15px_40px_rgba(19,41,82,0.08)]">
                <div className="relative h-56">
                  <Photo src={photo} alt={alt} sizes="(min-width: 768px) 500px, 90vw" className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: '50% 30%' }} />
                  <span className="absolute right-4 top-4 rounded-full bg-emerald-500 px-3 py-1 text-sm font-bold text-white">Free</span>
                </div>
                <div className="flex items-start gap-4 p-7">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                    <CheckIcon className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-navy-950">{t}</h3>
                    <p className="mt-1.5 text-lg text-navy-700/75">{line}</p>
                  </div>
                </div>
              </li>
            </Reveal>
          ))}
        </ul>
      </Section>

      <NavyBand className="py-10 sm:py-16">
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          <PaidCard
            eyebrow="Lessons · Pay as you go"
            title="Book lessons individually with a certified educator."
            price={PENDING.lessonPrice}
            unit={`${PENDING.currency ?? ''} per lesson`.trim()}
            priceNote="Set by your educator"
            features={['30 or 60 minute sessions, each educator sets their own rate', 'Live one-to-one session', 'Educator briefed from your path', 'Your path updated afterwards']}
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
          <>
            <div className="mx-auto mt-16 max-w-2xl text-center">
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-brand-cyan">Subscription</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Prefer a monthly plan?</h2>
            </div>
            <div className="mx-auto mt-10 grid max-w-6xl gap-6 md:grid-cols-3">
              {livePlans.map((p, i) => (
                <PaidCard
                  key={p.name}
                  eyebrow={p.type}
                  title={p.name}
                  line={p.line}
                  price={p.price}
                  unit={`${PENDING.currency ?? ''} per month`.trim()}
                  features={p.features}
                  cta="Start Your Journey"
                  delay={i * 0.08}
                  popular={p.popular}
                />
              ))}
            </div>
          </>
        )}
      </NavyBand>

      {/* Brief 2, item 42: copy beside a picture. */}
      <Section>
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 lg:gap-14">
          <Reveal from="left">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-brand-blue">Booking and cancellations</p>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-navy-950 sm:text-4xl">
              Lessons are booked and paid for individually.
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-navy-700/75">
              A lesson you cancel after booking is not refunded. If your educator cancels, the full value returns to your balance for
              another lesson.
            </p>
          </Reveal>
          <Reveal delay={0.1} from="right">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] shadow-[0_24px_60px_rgba(19,41,82,0.16)]">
              <Photo
                src="/photos/booking-phone-coffee.jpg"
                alt="A learner on the phone with a coffee, her laptop open on a café table"
                sizes="(min-width: 768px) 560px, 90vw"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
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
        {productJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: productJsonLd }} />}
      </Section>

      <CtaBand primary={{ label: 'Start Your Journey', to: LEARNER_SIGNUP_URL }} />
    </PageShell>
  )
}
