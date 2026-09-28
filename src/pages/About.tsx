import PageShell from '../components/PageShell'
import NavyBand from '../components/NavyBand'
import PageHeader from '../components/PageHeader'
import CtaBand from '../components/CtaBand'
import { OutcomeList, Reveal, Section, SectionHeading } from '../components/blocks'
import { LEARNER_SIGNUP_URL } from '../content/site'

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
  { name: 'Banu Akhundova', role: 'Content Manager & Coordinator', line: 'Writes so that nobody ever feels behind.' },
  {
    name: 'Samad Abbasov',
    role: 'Meta Ads Specialist & Creative Visual Strategist',
    line: 'Finds the people who stopped speaking, and gives them a reason to start again.',
  },
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
        image={{ src: '/photos/about-founders.jpg', alt: 'Two colleagues in conversation over a laptop' }}
      />

      <Section className="pt-4 sm:pt-8">
        <SectionHeading
          eyebrow="What we saw"
          title="Study has never been the difficult part."
          line="Streaks, points, and levels keep people studying. They do not put anyone into a real conversation."
        />
      </Section>

      <NavyBand className="py-10 sm:py-16">
        <SectionHeading
          dark
          eyebrow="Our approach"
          title="We combined the two instead of choosing between them."
          line="The AI plans and updates the path. Educators teach. Native speakers give learners someone to speak with."
        />
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
        />
      </Section>

      <Section className="pt-0 sm:pt-4">
        <SectionHeading eyebrow="The people behind LinkGlobal" title="Technology starts it. People make it matter." />
        <div className="mx-auto mt-12 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((p, i) => (
            <Reveal key={p.name} delay={(i % 3) * 0.08}>
              <div className="h-full rounded-3xl bg-white p-7 shadow-[0_15px_40px_rgba(19,41,82,0.08)]">
                {p.photo ? (
                  <img src={p.photo} alt={`${p.name}, ${p.role} at LinkGlobal`} className="h-16 w-16 rounded-full object-cover" />
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

      <CtaBand title="One conversation can change what comes next." primary={{ label: 'Start Your Journey', to: LEARNER_SIGNUP_URL }} />
    </PageShell>
  )
}
