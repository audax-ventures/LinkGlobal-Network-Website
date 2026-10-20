import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import NavyBand from '../NavyBand'
import PeoplePhilosophy from './PeoplePhilosophy'
import { PersonalizedPathsTour } from './TourSections'
import { Reveal, Section, SectionHeading, side } from '../blocks'
import { PENDING } from '../../content/site'

// Homepage sections from Website Copy v7 (section 02), in reading order.

// "From studying to speaking" comparison, simplified per revision brief 2
// (item 8, the client's suggestion): the left card is one big flashcard next
// to a silent "..." bubble; on the right the same flashcard flips into the
// spoken reply, with the word highlighted and a tick. Loops while on screen.
function Flashcard({ className = '' }: { className?: string }) {
  return (
    <div className={`rounded-2xl border border-navy-900/10 bg-white px-6 py-5 text-center shadow-[5px_7px_0_#e3eef5] ${className}`}>
      <strong lang="es" className="block text-3xl font-extrabold tracking-tight text-navy-950">
        un café
      </strong>
      <span className="mt-1 block text-base text-navy-700/60">a coffee</span>
    </div>
  )
}

function SilentBubble() {
  return (
    <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-[4px] bg-[#edf3f7] px-5 py-4" aria-label="No reply">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-2.5 w-2.5 rounded-full bg-navy-700/30"
          animate={{ opacity: [0.25, 0.8, 0.25] }}
          transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  )
}

function SpokenReply() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.5 })
  const [phase, setPhase] = useState(0) // 0 flashcard, 1 flipping, 2 spoken + tick
  useEffect(() => {
    if (!inView) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase(2)
      return
    }
    const steps = [1100, 450, 2800] // time on phases 0, 1, 2
    let t: number
    const run = (p: number) => {
      setPhase(p)
      t = window.setTimeout(() => run((p + 1) % 3), steps[p])
    }
    run(0)
    return () => window.clearTimeout(t)
  }, [inView])

  return (
    <div ref={ref} className="flex flex-col gap-4" style={{ perspective: 900 }}>
      <div className="max-w-[88%] self-start rounded-2xl rounded-bl-[4px] bg-[#edf3f7] px-4 py-3 text-lg leading-snug text-navy-950">
        <span lang="es">¡Hola! ¿Qué te pongo?</span>
        <small className="mt-0.5 block text-sm text-navy-700/60">Hi! What can I get you?</small>
      </div>
      <div className="relative min-h-[112px] self-end">
        <motion.div
          animate={{ rotateY: phase === 0 ? 0 : 90, opacity: phase === 2 ? 0 : 1 }}
          transition={{ duration: 0.45, ease: 'easeIn' }}
          className="absolute right-0 top-0"
          style={{ transformOrigin: 'center', display: phase === 2 ? 'none' : 'block' }}
          aria-hidden="true"
        >
          <Flashcard />
        </motion.div>
        <motion.div
          initial={false}
          animate={{ rotateY: phase === 2 ? 0 : -90, opacity: phase === 2 ? 1 : 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="rounded-2xl rounded-br-[4px] bg-brand-blue px-4 py-3 text-lg leading-snug text-white"
        >
          <span lang="es">
            Un <mark className="rounded-md bg-white px-1.5 font-bold text-brand-blue">café</mark>, por favor.
          </span>
          <small className="mt-0.5 block text-sm text-white/80">A coffee, please.</small>
        </motion.div>
      </div>
      <motion.p
        animate={{ opacity: phase === 2 ? 1 : 0, y: phase === 2 ? 0 : 6 }}
        transition={{ duration: 0.3, delay: phase === 2 ? 0.25 : 0 }}
        className="flex items-center justify-end gap-2 text-base font-semibold text-emerald-700"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-white" aria-hidden="true">
          ✓
        </span>
        You said it.
      </motion.p>
    </div>
  )
}

function StudyPanelTop({ label, meta, speaking = false }: { label: string; meta: string; speaking?: boolean }) {
  return (
    <div className="mb-3 flex items-center justify-between gap-2">
      <span className={`text-sm font-bold uppercase tracking-[0.15em] ${speaking ? 'text-brand-blue' : 'text-navy-700/60'}`}>{label}</span>
      <span className="text-sm text-navy-700/60">{meta}</span>
    </div>
  )
}

export function WhereLearnersGetStuck() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Less rehearsing. More living."
        title={
          <>
            One conversation can unlock
            <br className="hidden sm:block" /> what a month of study <span className="text-brand-blue">couldn’t.</span>
          </>
        }
        line="You’ve learned the words. Now feel what happens when you use them with someone."
      />

      <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-2">
        <Reveal from="left">
          <article className="flex h-full flex-col rounded-3xl bg-white p-7 shadow-[0_12px_34px_rgba(11,53,84,0.06)]">
            <StudyPanelTop label="A month of study" meta="30 days" />
            <h3 className="text-2xl font-bold tracking-tight text-navy-950 sm:text-3xl">“I know this word.”</h3>
            <div className="mt-8 flex flex-1 items-center justify-center gap-4">
              <Flashcard className="-rotate-2" />
              <SilentBubble />
            </div>
          </article>
        </Reveal>

        <Reveal delay={0.1} from="right">
          <article
            className="flex h-full flex-col rounded-3xl bg-white p-7 shadow-[inset_0_0_0_2px_#1ba3e0,0_12px_34px_rgba(27,163,224,0.1)]"
            aria-label="Conversation preview"
          >
            <StudyPanelTop label="One real conversation" meta="1 moment" speaking />
            <h3 className="text-2xl font-bold tracking-tight text-navy-950 sm:text-3xl">“I can actually say it.”</h3>
            <div className="mt-8">
              <SpokenReply />
            </div>
          </article>
        </Reveal>
      </div>

      <Reveal className="mt-10 text-center">
        <p className="text-lg text-navy-700/75 sm:text-xl">
          Study builds your knowledge. <strong className="font-bold text-navy-950">Conversation puts it to work.</strong>
        </p>
      </Reveal>
    </Section>
  )
}

export function Philosophy() {
  return (
    <NavyBand className="py-10 sm:py-16">
      <PeoplePhilosophy />
    </NavyBand>
  )
}

// Home's version of "three parts, one system": photo-led rows (Lingoda
// reference), one line each.
// Photos are placeholders until the client's own set arrives.
const PARTS = [
  {
    kicker: 'AI personalizes',
    title: 'A plan that listens.',
    line: 'AI analyzes how you speak and shapes what comes next around you.',
    photo: '/photos/learners.jpg',
    alt: 'A learner reviewing his personalized LinkGlobal plan',
    chip: 'Next focus: everyday phrases',
  },
  {
    kicker: 'Educators teach',
    title: 'A teacher who’s ready.',
    line: 'Certified educators arrive briefed on your plan, ready to help you move forward.',
    photo: '/photos/educators.jpg',
    alt: 'An educator preparing for a live online lesson',
    chip: '✓ Ready for your lesson',
  },
  {
    kicker: 'People connect',
    title: 'A reason to speak.',
    line: 'Meet native speakers connected to your work, your city, and what you love.',
    photo: '/photos/journey-5.jpg',
    alt: 'Two people chatting and laughing on a train',
    chip: '¡Sí! Vamos juntos.',
  },
]

export function ThreePartsPhotos() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Three parts. One connected experience."
        title={
          <>
            A plan that gets you.
            <br className="hidden sm:block" /> People who <span className="text-brand-blue">get you speaking.</span>
          </>
        }
      />
      <div className="mx-auto mt-14 flex max-w-5xl flex-col gap-14 sm:gap-20">
        {PARTS.map((p, i) => (
          <div key={p.title} className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
            <Reveal className={i % 2 ? 'md:order-2' : ''} from={side(i)}>
              <div className="relative">
                <img
                  src={p.photo}
                  alt={p.alt}
                  loading="lazy"
                  className="aspect-[4/3] w-full rounded-[1.75rem] object-cover shadow-[0_24px_60px_rgba(19,41,82,0.16)]"
                />
                <span
                  className={`absolute -bottom-4 ${i % 2 ? '-left-3 sm:-left-6' : '-right-3 sm:-right-6'} rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-navy-950 shadow-[0_14px_40px_rgba(19,41,82,0.16)]`}
                  aria-hidden="true"
                >
                  {p.chip}
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="text-center md:text-left" from={side(i + 1)}>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">
                0{i + 1} · {p.kicker}
              </p>
              <h3 className="mt-3 text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">{p.title}</h3>
              <p className="mx-auto mt-4 max-w-sm text-lg text-navy-700/75 md:mx-0">{p.line}</p>
            </Reveal>
          </div>
        ))}
      </div>
    </Section>
  )
}

export function BuiltForConversations() {
  return <PersonalizedPathsTour />
}

export const OUTCOMES = ['An interview attended.', 'An idea raised in a meeting.', 'An acceptance letter.', 'A friendship in a second language.']

const QUOTES = [
  'For months I read my points from notes in every meeting. Last week I answered a client without them.',
  'My admission interview was in English, but by then I had explained my research out loud eleven times. The nerves were about the university, not the language.',
  'I used to bring my husband to every appointment. Now I book them myself.',
]

export function LearnerOutcomes() {
  const { conversations, educators, countries } = PENDING.proof
  const proof = conversations && educators && countries
  const cards = QUOTES.map((q, i) => ({ q, name: PENDING.testimonialNames[i] ?? 'LinkGlobal learner' }))
  return (
    <section className="relative overflow-hidden px-6 pb-14 pt-6 sm:pb-20">
      <SectionHeading eyebrow="Learner outcomes" title="What changes for the people who learn with us." />
      {/* Continuous marquee (client asked for moving reviews): two copies of
          the track, animated -50% for a seamless loop; pauses on hover. */}
      <div className="relative mt-12 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
        <div className="lg-marquee-track flex w-max gap-5 hover:[animation-play-state:paused]">
          {[...cards, ...cards, ...cards, ...cards].map((c, i) => (
            <figure key={i} className="w-[320px] shrink-0 rounded-2xl bg-white p-6 shadow-[0_15px_40px_rgba(19,41,82,0.12)] sm:w-[400px]">
              <blockquote className="text-base leading-relaxed text-navy-800">&ldquo;{c.q}&rdquo;</blockquote>
              <figcaption className="mt-4 text-sm font-semibold text-navy-700/60">{c.name}</figcaption>
            </figure>
          ))}
        </div>
      </div>
      {proof && (
        <Reveal className="mx-auto mt-12 flex max-w-4xl flex-wrap justify-center gap-x-10 gap-y-4 text-center">
          {[
            [conversations, 'conversations delivered'],
            [educators, 'certified educators'],
            [countries, 'countries'],
          ].map(([n, label]) => (
            <p key={label} className="text-white">
              <span className="block text-4xl font-extrabold">{n}</span>
              <span className="text-sm text-white/70">{label}</span>
            </p>
          ))}
        </Reveal>
      )}
    </section>
  )
}
