import PageShell from '../components/PageShell'
import Hero from '../components/hero/Hero'
import GlobalCommunity from '../components/community/GlobalCommunity'
import LearningJourney from '../components/journey/LearningJourney'
import SplitSection from '../components/split/SplitSection'
import PlatformGallery from '../components/gallery/PlatformGallery'
import GlobalReach from '../components/reach/GlobalReach'
import CtaBand from '../components/CtaBand'

// PageShell's shared gradient paces itself against the WHOLE page's height,
// so on a page as long as Home it had already darkened well past "light" by
// the time Split Section arrived, right after Learning Journey — the two
// sections sit on visibly different background tones despite both just
// showing the same continuous gradient underneath. Split Section gets an
// explicit reset back to the gradient's lightest tone, and the fade to dark
// (needed for the light-on-dark Footer) is deferred to its own gradient
// scoped to just Platform Gallery + Global Reach's combined height, instead
// of inheriting wherever the page-length-relative shared gradient happens to
// be by that point.
const RESET_LIGHT = '#f8fbff'
const FADE_TO_DARK =
  'linear-gradient(180deg, #f8fbff 0%, #eaf5ff 10%, #c3e6ff 30%, #7fcdf0 50%, #2f8fd4 68%, #123a66 84%, #081b33 96%, #050f1f 100%)'

export default function Home() {
  return (
    <PageShell>
      <Hero />
      <GlobalCommunity />
      <LearningJourney />
      <div style={{ background: RESET_LIGHT }}>
        <SplitSection />
      </div>
      <div style={{ background: FADE_TO_DARK }}>
        <PlatformGallery />
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
