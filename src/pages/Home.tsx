import PageShell from '../components/PageShell'
import Hero from '../components/hero/Hero'
import AboutIntro from '../components/about/AboutIntro'
import LearningJourney from '../components/journey/LearningJourney'
import SplitSection from '../components/split/SplitSection'
import PlatformGallery from '../components/gallery/PlatformGallery'
import GlobalReach from '../components/reach/GlobalReach'

export default function Home() {
  return (
    <PageShell>
      <Hero />
      <AboutIntro />
      <LearningJourney />
      <SplitSection />
      <PlatformGallery />
      <GlobalReach />
    </PageShell>
  )
}
