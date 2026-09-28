import NavyBand from '../NavyBand'
import AvatarIllustration from '../AvatarIllustration'
import { CardRow, OutcomeList, Reveal, Section, SectionHeading, TwoRoles } from '../blocks'
import { PENDING } from '../../content/site'

// Homepage sections from Website Copy v7 (section 02), in reading order.

export function WhereLearnersGetStuck() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Where learners get stuck"
        title="Understanding a language and speaking it are two different abilities."
        line="The gap is rarely vocabulary. It is practice under real conditions."
      />
      <div className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-2">
        <Reveal>
          <div className="h-full rounded-3xl bg-white p-7 shadow-[0_15px_40px_rgba(19,41,82,0.08)]">
            <div className="grid grid-cols-8 gap-1.5" aria-hidden="true">
              {Array.from({ length: 40 }).map((_, i) => (
                <span key={i} className="aspect-square rounded-[4px] bg-brand-blue/70" style={{ opacity: 0.35 + (i % 5) * 0.13 }} />
              ))}
            </div>
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.25em] text-navy-700/60">months of study</p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="flex h-full flex-col rounded-3xl bg-white p-7 shadow-[0_15px_40px_rgba(19,41,82,0.08)]">
            <div className="flex flex-1 items-center justify-center" aria-hidden="true">
              <div className="flex items-end gap-3">
                <AvatarIllustration color="#f5a623" className="h-12 w-12 shrink-0 rounded-full" />
                <p className="rounded-2xl rounded-bl-sm bg-navy-900/[0.05] px-5 py-3 text-2xl font-bold tracking-widest text-navy-700/40">
                  . . .
                </p>
              </div>
            </div>
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.25em] text-navy-700/60">one real conversation</p>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}

export function PhilosophyAndSystem() {
  return (
    <NavyBand className="py-10 sm:py-16">
      <SectionHeading
        dark
        eyebrow="The philosophy"
        title="Technology can teach a language. People teach the confidence to use it."
        line="The AI does not replace them. It arranges them around you."
      />
      <div className="mx-auto mt-20 max-w-3xl border-t border-white/10 pt-16">
        <SectionHeading
          dark
          eyebrow="Three parts, one system"
          title={<span className="text-3xl sm:text-4xl">Most language platforms focus on one. LinkGlobal brings all three together around a single learner.</span>}
        />
      </div>
      <CardRow
        dark
        items={[
          { title: 'Personalization', line: 'The AI analyzes how you speak and shapes what comes next.' },
          { title: 'Teaching', line: 'Certified educators arrive already briefed on your plan.' },
          { title: 'Real conversation', line: 'Native speakers matched to your work, your city, or what you follow.' },
        ].map((it, i) => ({
          ...it,
          visual: (
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-cyan/15 text-sm font-extrabold text-brand-cyan">
              {i + 1}
            </span>
          ),
        }))}
      />
      <Reveal className="mx-auto mt-10 max-w-2xl text-center">
        <p className="text-lg font-semibold text-white">The AI never teaches you. It makes sure the right person does.</p>
      </Reveal>
    </NavyBand>
  )
}

export function LessonsAndConversation() {
  return (
    <Section>
      <SectionHeading eyebrow="Lessons and conversation" title="Two kinds of speaking. Two different jobs." />
      <TwoRoles
        educator="Structured lessons: correction, technique, direct feedback."
        partner="Native speakers you talk with. Real subjects, real pace, no assessment."
      />
    </Section>
  )
}

export function BuiltForConversations() {
  return (
    <Section className="pt-0 sm:pt-4">
      <SectionHeading eyebrow="Built for conversations that matter" title="A path shaped by what you are preparing for." />
      <CardRow
        items={[
          { title: 'Newcomers', line: "A bank appointment, a job interview, a meeting at your child's school." },
          { title: 'International students', line: 'Admission interviews, seminar discussions, IELTS and TOEFL preparation.' },
          { title: 'Professionals', line: 'Meetings, presentations, and client calls in the language your work requires.' },
        ]}
      />
      <Reveal className="mx-auto mt-10 max-w-2xl text-center">
        <p className="text-navy-700/70">Every educator is assessed before joining, and briefed before every session.</p>
      </Reveal>
    </Section>
  )
}

export const OUTCOMES = ['An interview attended.', 'An idea raised in a meeting.', 'An acceptance letter.', 'A friendship in a second language.']

export function HowWeMeasureProgress() {
  return (
    <Section>
      <SectionHeading eyebrow="How we measure progress" title="Not lessons completed. What learners become able to do." />
      <OutcomeList items={OUTCOMES} />
    </Section>
  )
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
