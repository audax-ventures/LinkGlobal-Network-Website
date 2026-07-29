import { useState } from 'react'
import LoadingScreen from './components/loading/LoadingScreen'
import FloatingNav from './components/nav/FloatingNav'
import Hero from './components/hero/Hero'
import LearningJourney from './components/journey/LearningJourney'
import SplitSection from './components/split/SplitSection'
import PlatformGallery from './components/gallery/PlatformGallery'
import GlobalReach from './components/reach/GlobalReach'
import Footer from './components/footer/Footer'

function App() {
  const [loadingDone, setLoadingDone] = useState(false)

  return (
    <>
      {!loadingDone && <LoadingScreen onFinished={() => setLoadingDone(true)} />}

      {loadingDone && <FloatingNav />}

      <main style={{ background: 'linear-gradient(180deg, #030407 0%, #0a1128 30%, #0e1c3d 100%)' }}>
        <Hero />
        <LearningJourney />
        <SplitSection />
        <PlatformGallery />
        <GlobalReach />
        <Footer />
      </main>
    </>
  )
}

export default App
