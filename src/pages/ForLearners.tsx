import PageShell from '../components/PageShell'
import NavyBand from '../components/NavyBand'
import PageHeader from '../components/PageHeader'
import CtaBand from '../components/CtaBand'
import SampleCards from '../components/dashboard/SeeWhereItHappens'
import type { SampleData } from '../components/dashboard/SeeWhereItHappens'
import { BeforeDuringAfter, CardRow, Reveal, Section, SectionHeading, TwoRoles } from '../components/blocks'
import { LEARNER_SIGNUP_URL } from '../content/site'

// For Learners, per Website Copy v7 (section 03).

const STUDENT_SAMPLE: SampleData = {
  path: [
    'Week 2 · Ask a question in a seminar without rehearsing it',
    'Week 4 · Disagree politely in a group discussion',
    'Week 6 · Admission interview: explain your research in ninety seconds',
  ],
  briefing: {
    mastered: 'Introducing his research, prepared answers',
    avoiding: 'Interrupting to make a point, unscripted follow-ups',
    focus: 'Seminar simulation, with prompts to interject',
  },
  sessions: 9,
  progressLine: 'The pause before speaking is getting shorter. Unprompted questions are increasing.',
}

export default function ForLearners() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="For Learners"
        title={
          <>
            Language for the conversations <span className="text-gradient-brand">ahead of you.</span>
          </>
        }
        description="Most learners know more than they can use under pressure. LinkGlobal closes that gap."
        actions={[{ label: 'Start Your Journey', to: LEARNER_SIGNUP_URL }]}
        image={{ src: '/photos/learners-hero.jpg', alt: 'A learner reviewing her LinkGlobal dashboard' }}
      />

      <Section className="pt-4 sm:pt-8">
        <SectionHeading title="Built around your reason for learning." />
        <CardRow
          items={[
            { title: 'Newcomers', line: 'Language for the situations that arrive first: appointments, interviews, school meetings.' },
            { title: 'International students', line: 'Admission interviews, seminars, and the IELTS or TOEFL score your program requires.' },
            { title: 'Professionals', line: 'Leading meetings, presenting without a script, handling client calls.' },
          ]}
        />
      </Section>

      <NavyBand className="py-10 sm:py-16">
        <SectionHeading
          dark
          eyebrow="Your learning path"
          title="Built from what you tell us before you start."
          line="You describe your goals, your level, and how you intend to use the language. The path shows what you are working toward and what comes first."
        />
        <Reveal className="mx-auto mt-8 max-w-2xl text-center">
          <p className="text-lg font-semibold text-white">
            Material you have mastered returns only when it is useful. The areas you avoid are not skipped.
          </p>
        </Reveal>
      </NavyBand>

      <Section>
        <SectionHeading title="Your educator prepares before you arrive." />
        <BeforeDuringAfter
          items={[
            { label: 'Before', line: 'A briefing on where you need support.' },
            { label: 'During', line: 'A lesson that starts at your level.' },
            { label: 'After', line: 'Your path updates for the next session.' },
          ]}
        />
      </Section>

      <Section className="pt-0 sm:pt-4">
        <SectionHeading title="Who you will be speaking with." />
        <TwoRoles
          educator="Qualified teachers who deliver your lessons and guide your path over time."
          partner="Native speakers matched to your profession, interests, or destination. Conversation, not a lesson."
        />
      </Section>

      <Section className="pb-10 sm:pb-12">
        <SectionHeading title="Inside the platform" />
        <CardRow
          cols={4}
          items={[
            { title: 'Your learning path', line: 'A route drawn from your goals, revised as you progress.' },
            { title: 'Live sessions', line: 'Lessons with an educator who already knows your plan.' },
            { title: 'Conversation practice', line: 'Native speakers, on the subjects that matter to you.' },
            { title: 'Progress overview', line: 'Specific, visible, and moving.' },
          ]}
        />
      </Section>
      <SampleCards data={STUDENT_SAMPLE} />

      <CtaBand
        title="The path starts with where you are going."
        description="We ask about your goal first, then build the route to it."
        primary={{ label: 'Start Your Journey', to: LEARNER_SIGNUP_URL }}
      />
    </PageShell>
  )
}
