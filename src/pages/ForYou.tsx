import PageShell from '../components/PageShell'
import NavyBand from '../components/NavyBand'
import PageHeader from '../components/PageHeader'
import CtaBand from '../components/CtaBand'
import SmartLink from '../components/SmartLink'
import { CardRow, Reveal, Section, SectionHeading } from '../components/blocks'
import { LEARNER_SIGNUP_URL, PARTNER_FIND_URL, PARTNER_SHARE_URL } from '../content/site'

// For You · Conversation Partners, per Website Copy v7 (section 05).

const BUTTON =
  'inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(30,120,190,0.3)] transition-transform hover:scale-105'
const BUTTON_BG = { background: 'linear-gradient(90deg, #1ba3e0, #3ec6ff)' }

export default function ForYou() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Conversation Partners"
        title={
          <>
            Every language you speak is worth something <span className="text-gradient-brand">to someone.</span>
          </>
        }
        description="You do not have to be a teacher to help someone speak. You just have to speak."
        actions={[
          { label: 'Find Your Conversation Partner', to: '#for-learners' },
          { label: 'Share Your Language', to: '#for-native-speakers' },
        ]}
        image={{ src: '/photos/hero-learner.jpg', alt: 'A learner in conversation with a native speaker matched to their profession' }}
      />

      <Section className="scroll-mt-24 pt-4 sm:pt-8">
        <div id="for-learners" className="relative -top-24" aria-hidden="true" />
        <SectionHeading
          eyebrow="For learners"
          title="A conversation with someone who lives the language."
          line="A lesson teaches the language. A conversation puts you inside it."
        />
        <CardRow
          items={[
            { title: 'Your profession', line: 'Someone who works in your field.' },
            { title: 'Your destination', line: 'Someone who has lived where you are going.' },
            { title: 'Your interests', line: 'Someone who follows what you follow.' },
          ]}
        />
        <Reveal className="mt-10 text-center">
          <p className="text-lg font-semibold text-navy-950">No lesson plan. No assessment. No correction.</p>
          <SmartLink to={PARTNER_FIND_URL} className={`mt-6 ${BUTTON}`} style={BUTTON_BG}>
            Find Your Conversation Partner
          </SmartLink>
        </Reveal>
      </Section>

      <NavyBand className="py-10 sm:py-16">
        <div id="for-native-speakers" className="relative -top-24" aria-hidden="true" />
        <SectionHeading
          dark
          eyebrow="For native speakers"
          title="Share the language you already speak, on your terms."
          line="Someone is studying for years to speak the language you grew up with."
        />
        <Reveal className="mx-auto mt-4 max-w-2xl text-center">
          <p className="text-lg text-white/70">Nothing to teach and nothing to prepare. Talk the way you always talk.</p>
        </Reveal>
        <CardRow
          dark
          items={[
            { title: 'A conversation, not a class', line: 'Your language, your subjects, your opinions.' },
            { title: 'People close to your world', line: 'Matched by your field, your city, or what you follow.' },
            { title: 'Whenever it suits you', line: 'No fixed hours, and nothing to commit to.' },
          ]}
        />
        <Reveal className="mt-10 text-center">
          <p className="text-lg font-semibold text-white">Every learner remembers the first person who was patient with them.</p>
          <SmartLink to={PARTNER_SHARE_URL} className={`mt-6 ${BUTTON}`} style={BUTTON_BG}>
            Share Your Language
          </SmartLink>
        </Reveal>
      </NavyBand>

      <div className="pt-8" />
      <CtaBand
        title="A language becomes yours the moment you use it with someone."
        primary={{ label: 'Start Your Journey', to: LEARNER_SIGNUP_URL }}
        secondary={{ label: 'Share Your Language', to: PARTNER_SHARE_URL }}
      />
    </PageShell>
  )
}
