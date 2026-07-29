import { useState } from 'react'
import LoadingScreen from './components/loading/LoadingScreen'
import FloatingNav from './components/nav/FloatingNav'
import Hero from './components/hero/Hero'

function App() {
  const [loadingDone, setLoadingDone] = useState(false)

  return (
    <>
      {!loadingDone && <LoadingScreen onFinished={() => setLoadingDone(true)} />}

      {loadingDone && <FloatingNav />}

      <main style={{ background: 'linear-gradient(180deg, #030407 0%, #0a1128 30%, #0e1c3d 100%)' }}>
        <Hero />
        {/* Learning Journey, Split, Gallery, Global Reach, Footer land in the next milestones. */}
        <div className="min-h-[50vh]" />
      </main>
    </>
  )
}

export default App
