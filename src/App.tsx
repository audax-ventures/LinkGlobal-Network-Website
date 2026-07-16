import { useState } from 'react'
import LoadingScreen from './components/loading/LoadingScreen'

function App() {
  const [loadingDone, setLoadingDone] = useState(false)

  return (
    <>
      {!loadingDone && <LoadingScreen onFinished={() => setLoadingDone(true)} />}

      {/* Home page content lands here in the next milestones (nav, hero, etc). */}
      <main
        className="min-h-[200vh]"
        style={{ background: 'linear-gradient(180deg, #030407 0%, #0a1128 30%, #0e1c3d 100%)' }}
      />
    </>
  )
}

export default App
