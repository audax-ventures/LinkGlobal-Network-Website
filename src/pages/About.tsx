import PageShell from '../components/PageShell'
import NavyBand from '../components/NavyBand'
import PageHeader from '../components/PageHeader'
import CtaBand from '../components/CtaBand'
import { FromStudyToSpeaking } from '../components/tours/PageTours'
import { OutcomeList, Reveal, Section, SectionHeading } from '../components/blocks'
import { LEARNER_SIGNUP_URL } from '../content/site'
import { motion } from 'framer-motion'
import { SparkleIcon } from '../components/icons/LineIcons'
import Photo from '../components/Photo'

// About, per Website Copy v7 (section 06). Team photos aren't supplied yet,
// so each person shows initials; swap in photos via `photo` when they arrive.

const TEAM: { name: string; role: string; line: string; photo?: string }[] = [
  { name: 'Huseyn Maharramov', role: 'President Director', line: 'Leads LinkGlobal with one aim: that language never decides who gets heard.' },
  {
    name: 'Ehsan Jafari Dastgerdi',
    role: 'Chief Academic Officer & Head of R&D',
    line: 'Puts years of classroom experience into a path someone can follow in weeks.',
  },
  { name: 'Mahmud Rahimov', role: 'Project Advisor', line: 'Turns what learners struggle with into what the platform does next.' },
  { name: 'Davood Zivar', role: 'Project Manager', line: 'Makes sure what we promise a learner actually arrives.' },
  { name: 'Banu Akhundlu', role: 'Manager', line: 'Writes so that nobody ever feels behind.' },
]

const COLORS = ['#1ba3e0', '#f5a623', '#2dd4bf', '#a78bfa', '#f472b6', '#4ade80']

const initials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')

export default function About() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Why we exist"
        title={
          <>
            Language should carry your ideas, <span className="text-gradient-brand">not limit them.</span>
          </>
        }
        description="Talented people go quiet in the meetings where their opinion matters most."
        image={{ src: '/photos/thinking-at-whiteboard.jpg', alt: 'A man reading his notes in front of a whiteboard', position: '50% 30%' }}
      />

      <FromStudyToSpeaking />

      {/* Brief 2, item 36: graphics either side of the headline (AI on one
          side, people on the other) with gentle floating motion. */}
      <NavyBand className="py-10 sm:py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[1fr_2fr_1fr]">
          <Reveal className="hidden justify-center lg:flex" from="left">
            <motion.div
              className="relative flex h-40 w-40 items-center justify-center"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              aria-hidden="true"
            >
              <span className="absolute inset-0 animate-[spin_14s_linear_infinite] rounded-full border border-dashed border-brand-cyan/40" />
              <span className="absolute inset-5 rounded-full bg-brand-cyan/10 shadow-[0_0_50px_rgba(62,198,255,0.35)]" />
              <SparkleIcon className="relative h-14 w-14 text-brand-cyan" />
              <span className="absolute -right-1 top-6 h-3 w-3 rounded-full bg-brand-cyan shadow-[0_0_12px_#3ec6ff]" />
            </motion.div>
          </Reveal>
          <SectionHeading
            dark
            eyebrow="Our approach"
            title="We combined the two instead of choosing between them."
            line="The AI plans and updates the path. Educators teach. Native speakers give learners someone to speak with."
          />
          <Reveal delay={0.15} className="hidden justify-center lg:flex" from="right">
            <motion.div
              className="relative h-40 w-44"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              aria-hidden="true"
            >
              <span className="absolute left-2 top-10 h-16 w-16 rounded-full bg-gradient-to-br from-[#f5a623] to-[#f472b6] shadow-[0_10px_30px_rgba(245,166,35,0.35)]" />
              <span className="absolute right-2 top-14 h-16 w-16 rounded-full bg-gradient-to-br from-brand-blue to-[#a78bfa] shadow-[0_10px_30px_rgba(27,163,224,0.35)]" />
              <motion.span
                className="absolute left-12 top-0 rounded-2xl rounded-bl-[4px] bg-white px-3 py-2 text-lg"
                animate={{ scale: [0.9, 1, 0.9] }}
                transition={{ duration: 2.4, repeat: Infinity }}
              >
                👋
              </motion.span>
              <span className="absolute bottom-2 left-1/2 h-1 w-16 -translate-x-1/2 rounded-full bg-brand-cyan/60" />
            </motion.div>
          </Reveal>
        </div>
      </NavyBand>

      <Section>
        <SectionHeading eyebrow="What we measure" title="The outcomes we consider meaningful." />
        <OutcomeList
          items={[
            'An interview attended.',
            'An idea raised in a meeting.',
            'An acceptance letter.',
            'A friendship in a second language.',
            'A business built across a border.',
          ]}
          photos={[
            { src: '/photos/interview.jpg', alt: 'A smiling candidate in a job interview across the desk' },
            { src: '/photos/meeting-idea.jpg', alt: 'Two colleagues talking through an idea at a meeting table' },
            { src: '/photos/acceptance-letter.jpg', alt: 'Three friends reading a letter together, delighted' },
            { src: '/photos/cafe-friendship.jpg', alt: 'Two friends chatting at a café table' },
            { src: '/photos/handshake-deal.jpg', alt: 'Two business people shaking hands across a meeting room' },
          ]}
        />
      </Section>

      <Section className="pt-0 sm:pt-4">
        <SectionHeading eyebrow="The people behind LinkGlobal" title="Technology starts it. People make it matter." />
        <div className="mx-auto mt-12 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((p, i) => (
            <Reveal key={p.name} delay={(i % 3) * 0.08}>
              <div className="h-full rounded-3xl bg-white p-7 shadow-[0_15px_40px_rgba(19,41,82,0.08)]">
                {p.photo ? (
                  <Photo src={p.photo} sizes="64px" alt={`${p.name}, ${p.role} at LinkGlobal`} className="h-16 w-16 rounded-full object-cover" />
                ) : (
                  <span
                    className="flex h-16 w-16 items-center justify-center rounded-full text-lg font-extrabold text-white"
                    style={{ background: COLORS[i % COLORS.length] }}
                    aria-hidden="true"
                  >
                    {initials(p.name)}
                  </span>
                )}
                <h3 className="mt-5 text-lg font-bold text-navy-950">{p.name}</h3>
                <p className="text-sm font-semibold text-brand-blue">{p.role}</p>
                <p className="mt-3 leading-relaxed text-navy-700/75">{p.line}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand primary={{ label: 'Start Your Journey', to: LEARNER_SIGNUP_URL }} />
    </PageShell>
  )
}
