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

      {/*
        One continuous background for the whole page — no per-section colors —
        so scrolling reads as a single flowing gradient rather than stacked
        slides. Starts near-white at the hero and builds to a fully saturated
        deep blue by the footer. Each section below sets its own text/border
        colors to match wherever it falls along this gradient (roughly:
        Hero/Journey/Split = dark text on the lighter top half; Gallery
        onward = white text as the background deepens).
      */}
      <main
        style={{
          background:
            'linear-gradient(180deg, #f8fbff 0%, #eaf5ff 15%, #c3e6ff 30%, #7fcdf0 45%, #2f8fd4 60%, #123a66 75%, #081b33 90%, #050f1f 100%)',
        }}
      >
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
