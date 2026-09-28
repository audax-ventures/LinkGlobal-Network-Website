import { useState } from 'react'
import { motion } from 'framer-motion'
import NavyBand from '../NavyBand'
import PeoplePhilosophy from './PeoplePhilosophy'
import ThreeParts from './ThreeParts'
import { LessonsAndConversationTour, PersonalizedPathsTour, RealLifeProgressTour } from './TourSections'
import { Reveal, Section, SectionHeading } from '../blocks'
import { PENDING } from '../../content/site'

// Homepage sections from Website Copy v7 (section 02), in reading order.

// "From studying to speaking" comparison (Riley's supplied design,
// conversation-section.html): a month of study vs one real conversation.
// The conversation panel cycles through three café exchanges.
const CAFE_SCENES = [
  { them: '¡Hola! ¿Qué te pongo?', themEn: 'Hi! What can I get you?', you: 'Un café con leche, por favor.', youEn: 'A coffee with milk, please.', win: 'You found the words. Out loud.' },
  { them: '¿Para aquí o para llevar?', themEn: 'For here or to go?', you: 'Para aquí, gracias.', youEn: 'For here, thank you.', win: 'You understood. And answered.' },
  { them: '¿Algo más?', themEn: 'Anything else?', you: 'Sí, un croissant, por favor.', youEn: 'Yes, a croissant, please.', win: 'You kept the conversation going.' },
]

function StudyPanelTop({ label, meta, speaking = false }: { label: string; meta: string; speaking?: boolean }) {
  return (
    <div className="mb-2.5 flex items-center justify-between gap-2">
      <span className={`text-[11px] font-bold uppercase tracking-[0.15em] ${speaking ? 'text-brand-blue' : 'text-navy-700/60'}`}>{label}</span>
      <span className="text-xs text-navy-700/60">{meta}</span>
    </div>
  )
}

export function WhereLearnersGetStuck() {
  const [step, setStep] = useState(0)
  const scene = CAFE_SCENES[step]
  const last = step === CAFE_SCENES.length - 1

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

      <div className="mx-auto mt-12 grid max-w-4xl gap-4 md:grid-cols-2">
        {/* A month of study */}
        <Reveal>
          <article className="flex h-full flex-col rounded-3xl bg-white p-6 shadow-[0_12px_34px_rgba(11,53,84,0.05)]">
            <StudyPanelTop label="A month of study" meta="30 days" />
            <h3 className="text-2xl font-bold tracking-tight text-navy-950">“I know this word.”</h3>
            <div className="my-6 flex min-h-[224px] flex-col justify-center">
              <div className="mb-5 grid grid-cols-10 gap-1.5" aria-label="Thirty days of studying" role="img">
                {Array.from({ length: 30 }).map((_, i) => (
                  <span
                    key={i}
                    className="h-4 rounded-[3px]"
                    style={{ background: (i + 1) % 3 === 0 ? '#bde4f6' : (i + 1) % 3 === 1 ? '#d6edf7' : '#edf3f7' }}
                  />
                ))}
              </div>
              <div className="mx-2 -rotate-3 rounded-xl border border-navy-900/10 p-4 text-center shadow-[4px_6px_0_#edf3f7]">
                <small className="text-[10px] font-semibold uppercase tracking-[0.15em] text-navy-700/60">Vocabulary · At the café</small>
                <strong lang="es" className="my-1.5 block text-2xl font-bold tracking-tight text-navy-950">
                  un café
                </strong>
                <em className="text-sm not-italic text-navy-700/60">a coffee</em>
              </div>
              <p className="mt-4 text-center text-sm text-navy-700/60">But when it’s your turn to order…</p>
            </div>
            <div className="mt-auto border-t border-navy-900/10 pt-5">
              <strong className="block font-bold text-navy-950">The words look familiar.</strong>
              <p className="mt-2 text-sm leading-relaxed text-navy-700/65">
                You recognize the answer on a flashcard.
                <br />
                Finding it in the moment feels different.
              </p>
              <div className="min-h-[38px]" aria-hidden="true" />
            </div>
          </article>
        </Reveal>

        {/* One real conversation */}
        <Reveal delay={0.1}>
          <article
            className="flex h-full flex-col rounded-3xl bg-white p-6 shadow-[inset_0_0_0_1.5px_#1ba3e0,0_12px_34px_rgba(27,163,224,0.08)]"
            aria-label="Conversation preview"
          >
            <StudyPanelTop label="One real conversation" meta="1 moment" speaking />
            <h3 className="text-2xl font-bold tracking-tight text-navy-950">“I can actually say it.”</h3>
            <div className="my-6 flex min-h-[224px] flex-col justify-center">
              <p className="mb-4 text-center text-[11px] font-semibold uppercase tracking-[0.15em] text-navy-700/60">Same words. Real life.</p>
              <motion.div
                key={step}
                initial={{ opacity: 0.5, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.19, ease: 'easeOut' }}
                className="flex flex-col"
                aria-live="polite"
              >
                <div className="mb-2.5 max-w-[92%] self-start rounded-2xl rounded-bl-[3px] bg-[#edf3f7] px-3.5 py-3 text-sm leading-snug text-navy-950">
                  <span lang="es">{scene.them}</span>
                  <small className="mt-1 block text-[11px] opacity-70">{scene.themEn}</small>
                </div>
                <div className="mb-2.5 max-w-[92%] self-end rounded-2xl rounded-br-[3px] bg-brand-blue px-3.5 py-3 text-sm leading-snug text-white">
                  <span lang="es">{scene.you}</span>
                  <small className="mt-1 block text-[11px] opacity-80">{scene.youEn}</small>
                </div>
                <p className="flex min-h-[42px] items-center justify-center gap-1.5 text-xs font-semibold text-emerald-700">✓ {scene.win}</p>
              </motion.div>
            </div>
            <div className="mt-auto border-t border-navy-900/10 pt-5">
              <strong className="block font-bold text-navy-950">The words become yours.</strong>
              <p className="mt-2 text-sm leading-relaxed text-navy-700/65">
                You recall them, say them, and respond.
                <br />
                A little less hesitation. A real step forward.
              </p>
              <button
                type="button"
                onClick={() => setStep((s) => (s + 1) % CAFE_SCENES.length)}
                className="min-h-[38px] pt-3 text-left text-sm font-semibold text-brand-blue hover:underline"
              >
                {last ? 'Replay the conversation ↻' : 'Keep the conversation going →'}
              </button>
            </div>
          </article>
        </Reveal>
      </div>

      <Reveal className="mt-8 text-center">
        <p className="text-navy-700/70">
          Study builds your knowledge. <strong className="font-bold text-navy-950">Conversation puts it to work.</strong>
        </p>
      </Reveal>
    </Section>
  )
}

export function PhilosophyAndSystem() {
  return (
    <NavyBand className="py-10 sm:py-16">
      <PeoplePhilosophy />
      <div className="mt-20">
        <ThreeParts />
      </div>
    </NavyBand>
  )
}

export function LessonsAndConversation() {
  return <LessonsAndConversationTour />
}

export function BuiltForConversations() {
  return <PersonalizedPathsTour />
}

export const OUTCOMES = ['An interview attended.', 'An idea raised in a meeting.', 'An acceptance letter.', 'A friendship in a second language.']

export function HowWeMeasureProgress() {
  return <RealLifeProgressTour />
}

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
