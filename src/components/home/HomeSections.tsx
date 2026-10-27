import NavyBand from '../NavyBand'
import PeoplePhilosophy from './PeoplePhilosophy'
import { PersonalizedPathsTour } from './TourSections'
import { Reveal, Section, SectionHeading } from '../blocks'
import { LEARNER_SIGNUP_URL, PENDING } from '../../content/site'
import PhotoCarousel from '../PhotoCarousel'
import Photo from '../Photo'
import SmartLink from '../SmartLink'
import { ChatIcon, GraduationCapIcon, SparkleIcon } from '../icons/LineIcons'

// Homepage sections from Website Copy v7 (section 02), in reading order.

// "Less rehearsing. More living." Split layout per Riley's mock-up (Oct 2026):
// copy and a call to action on the left, a stock photo of a real conversation
// on the right. Replaced the flashcard comparison (item 8).
export function WhereLearnersGetStuck() {
  return (
    <Section>
      <div className="mx-auto grid max-w-6xl items-center gap-10 rounded-[2rem] bg-[#f6f9fc] p-7 sm:p-12 md:grid-cols-2 lg:gap-14 lg:p-16">
        <Reveal from="left">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-brand-blue">Real people. Real conversations.</p>
          <h2 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight text-navy-950 sm:text-5xl">
            Turn what you learn into <span className="text-brand-blue">confident conversation.</span>
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-navy-700/75 sm:text-xl">
            Practise with native speakers and build the confidence to use your language in everyday life.
          </p>
          <SmartLink
            to={LEARNER_SIGNUP_URL}
            className="mt-8 inline-flex items-center gap-3 rounded-full px-8 py-4 text-lg font-semibold text-white shadow-[0_10px_28px_rgba(30,120,190,0.3)] transition-transform hover:scale-105"
            style={{ background: 'linear-gradient(90deg, #1ba3e0, #3ec6ff)' }}
          >
            Start speaking <span aria-hidden="true">→</span>
          </SmartLink>
        </Reveal>
        <Reveal delay={0.1} from="right">
          <div className="relative aspect-square overflow-hidden rounded-[1.75rem] shadow-[0_24px_60px_rgba(19,41,82,0.16)]">
            <Photo
              src="/photos/record-store-chat.jpg"
              alt="Two friends deep in conversation in a record shop, one smiling and gesturing as she talks"
              sizes="(min-width: 768px) 520px, 90vw"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: '50% 35%' }}
            />
          </div>
        </Reveal>
      </div>
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

// Home's version of "three parts, one system": a Lingoda-style photo
// carousel (brief 2), one line per slide.
// Licensed stock photos supplied by Riley (Oct 2026).
const PARTS = [
  {
    kicker: 'AI personalizes',
    title: 'A plan that listens.',
    line: 'AI analyzes how you speak and shapes what comes next around you.',
    photo: '/photos/friendly-desk.jpg',
    alt: 'A learner smiling at her laptop with her notebook open',
    chip: 'Next focus: everyday phrases',
  },
  {
    kicker: 'Educators teach',
    title: 'A teacher who’s ready.',
    line: 'Certified educators arrive briefed on your plan, ready to help you move forward.',
    photo: '/photos/educator-headset.jpg',
    alt: 'An educator in a headset teaching a lively online lesson',
    chip: '✓ Ready for your lesson',
  },
  {
    kicker: 'People connect',
    title: 'A reason to speak.',
    line: 'Meet native speakers connected to your work, your city, and what you love.',
    photo: '/photos/friends-laughing.jpg',
    alt: 'Two friends laughing together outside a front door',
    chip: '¡Sí! Vamos juntos.',
  },
]

export function ThreePartsPhotos() {
  const icon = 'h-5 w-5 text-white'
  return (
    <section className="relative py-16 sm:py-24">
      <div className="px-6">
        <SectionHeading
          eyebrow="Three parts. One connected experience."
          title={
            <>
              A plan that gets you.
              <br className="hidden sm:block" /> People who <span className="text-brand-blue">get you speaking.</span>
            </>
          }
        />
      </div>
      <div className="mt-12">
        <PhotoCarousel
          label="Three parts of LinkGlobal"
          slides={PARTS.map((p, i) => ({
            photo: p.photo,
            alt: p.alt,
            title: p.title,
            line: p.line,
            chip: p.chip,
            icon: [<SparkleIcon className={icon} />, <GraduationCapIcon className={icon} />, <ChatIcon className={icon} />][i],
          }))}
        />
      </div>
    </section>
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
