import PageShell from '../components/PageShell'
import Hero from '../components/hero/Hero'
import LearningJourney from '../components/journey/LearningJourney'
import SplitSection from '../components/split/SplitSection'
import PlatformGallery from '../components/gallery/PlatformGallery'
import GlobalReach from '../components/reach/GlobalReach'

export default function Home() {
  return (
    <PageShell>
      <Hero />
      <LearningJourney />
      <SplitSection />
      <PlatformGallery />
      <GlobalReach />
    </PageShell>
  )
}
