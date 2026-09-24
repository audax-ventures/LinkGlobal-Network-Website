import PageShell from '../components/PageShell'
import Hero from '../components/hero/Hero'
import LinkGlobalLoop from '../components/loop/LinkGlobalLoop'
import LearningJourney from '../components/journey/LearningJourney'
import JourneyDashboard from '../components/dashboard/JourneyDashboard'
import SeeWhereItHappens from '../components/dashboard/SeeWhereItHappens'
import SplitSection from '../components/split/SplitSection'
import GlobalReach from '../components/reach/GlobalReach'
import CtaBand from '../components/CtaBand'

// Home manages its own backgrounds: light sections on RESET_LIGHT, the navy
// Loop, then FADE_TO_DARK over the closing Global Reach + CTA stretch so it
// lands on the footer's dark tone. Hence PageShell footerFade={false}.
const RESET_LIGHT = '#f8fbff'
const FADE_TO_DARK =
  'linear-gradient(180deg, #f8fbff 0%, #eaf5ff 10%, #c3e6ff 30%, #7fcdf0 50%, #2f8fd4 68%, #123a66 84%, #081b33 96%, #050f1f 100%)'

export default function Home() {
  return (
    <PageShell footerFade={false}>
      <Hero />
      <LinkGlobalLoop />
      <div style={{ background: RESET_LIGHT }}>
        <LearningJourney />
        <JourneyDashboard />
        <SeeWhereItHappens />
        <SplitSection />
      </div>
      <div style={{ background: FADE_TO_DARK }}>
        <GlobalReach />
        <CtaBand
          title="Ready to start your journey?"
          description="Join thousands of learners and tutors already connecting on LinkGlobal Network."
          primary={{ label: 'Start Your Journey', to: '/try-now' }}
          secondary={{ label: 'Explore Pricing', to: '/pricing' }}
        />
      </div>
    </PageShell>
  )
}
