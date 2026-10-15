import PageShell from '../components/PageShell'
import IntroSection from '../components/intro/IntroSection'
import Hero from '../components/hero/Hero'
import LearningJourney from '../components/journey/LearningJourney'
import JourneyDashboard from '../components/dashboard/JourneyDashboard'
import CtaBand from '../components/CtaBand'
import { LearnerOutcomes, Philosophy, ThreePartsPhotos, WhereLearnersGetStuck } from '../components/home/HomeSections'
import { LEARNER_SIGNUP_URL } from '../content/site'

// Home, trimmed per the client's Oct 2026 design notes (less text, more
// imagery, Lingoda as reference). The fuller v7 sections now live on For
// Learners (journey strip, full journey, Loop, ThreeParts, the two tours)
// and About (real-life progress tour). Home manages its own backgrounds:
// light base, the navy Philosophy band, then
// FADE_TO_DARK over the closing stretch so it lands on the footer's dark
// tone. Hence PageShell footerFade={false}.
const FADE_TO_DARK =
  'linear-gradient(180deg, #f8fbff 0%, #eaf5ff 18%, #c3e6ff 40%, #7fcdf0 56%, #2f8fd4 70%, #123a66 84%, #081b33 94%, #050f1f 100%)'

export default function Home() {
  return (
    <PageShell footerFade={false}>
      <IntroSection />
      <Hero />
      <Philosophy />
      <WhereLearnersGetStuck />
      <ThreePartsPhotos />
      <LearningJourney compact />
      <JourneyDashboard />
      <div style={{ background: FADE_TO_DARK }}>
        <LearnerOutcomes />
        <CtaBand
          title="Your path begins with a conversation about you."
          description="Tell us your goal. Your plan follows from your answers."
          primary={{ label: 'Start Your Journey', to: LEARNER_SIGNUP_URL }}
        />
      </div>
    </PageShell>
  )
}
