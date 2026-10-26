import PageShell from '../components/PageShell'
import PageHeader from '../components/PageHeader'
import CtaBand from '../components/CtaBand'
import { ReasonsToLearn } from '../components/tours/PageTours'
import { BeforeDuringAfter, CardRow, Reveal, Section, SectionHeading, TwoRoles } from '../components/blocks'
import { LEARNER_SIGNUP_URL } from '../content/site'
import PhotoTiles from '../components/PhotoTiles'
import LinkGlobalLoop from '../components/loop/LinkGlobalLoop'
import { BuiltForConversations } from '../components/home/HomeSections'

// For Learners, per Website Copy v7 (section 03), plus the Loop and the
// "What are you getting ready for?" tabs moved off Home. Revision brief 2
// (Oct 2026) deleted the journey stepper, the dark "Built from what you tell
// us" band, "Build the skill", and the sample cards; the full journey and
// ThreeParts came off too, since Home already shows those ideas (no repeats).

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

      <ReasonsToLearn />

      <LinkGlobalLoop />

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

      <BuiltForConversations />

      <Section className="pt-0 sm:pt-4">
        <SectionHeading title="Who you will be speaking with." />
        <TwoRoles
          educator="Qualified teachers who deliver your lessons and guide your path over time."
          partner="Native speakers matched to your profession, interests, or destination. Conversation, not a lesson."
        />
      </Section>

      <Section className="pb-10 sm:pb-12">
        <SectionHeading title="Inside the platform" />
        {/* Brief 2, item 23: each box has its own picture (Lingoda-style
            tiles, "+" opens the line). Placeholder photos for now. */}
        <PhotoTiles
          tiles={[
            {
              title: 'Your learning path',
              line: 'A route drawn from your goals, revised as you progress.',
              photo: '/photos/journey-3.jpg',
              alt: 'A learner smiling as she studies with headphones on',
              chip: 'Next: explain your work clearly',
            },
            {
              title: 'Live sessions',
              line: 'Lessons with an educator who already knows your plan.',
              photo: '/photos/journey-1.jpg',
              alt: 'A learner in a live online lesson at her laptop',
              chip: '● Live now',
            },
            {
              title: 'Conversation practice',
              line: 'Native speakers, on the subjects that matter to you.',
              photo: '/photos/about-founders.jpg',
              alt: 'Two people talking over a laptop',
              chip: 'Matched: you both love design',
            },
            {
              title: 'Progress overview',
              line: 'Specific, visible, and moving.',
              photo: '/photos/institutions.jpg',
              alt: 'An educator showing a learner’s progress on a tablet',
              chip: 'Confidence +26%',
            },
          ]}
        />
      </Section>

      <CtaBand primary={{ label: 'Start Your Journey', to: LEARNER_SIGNUP_URL }} />
    </PageShell>
  )
}
