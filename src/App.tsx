import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoadingScreen from './components/loading/LoadingScreen'
import FloatingNav from './components/nav/FloatingNav'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import About from './pages/About'
import ForYou from './pages/ForYou'
import ForLearners from './pages/ForLearners'
import ForEducators from './pages/ForEducators'
import TryNow from './pages/TryNow'
import Pricing from './pages/Pricing'
import Contact from './pages/Contact'

function App() {
  const [loadingDone, setLoadingDone] = useState(false)

  return (
    <BrowserRouter>
      {!loadingDone && <LoadingScreen onFinished={() => setLoadingDone(true)} />}

      {loadingDone && <FloatingNav />}
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/for-you" element={<ForYou />} />
        <Route path="/learners" element={<ForLearners />} />
        <Route path="/educators" element={<ForEducators />} />
        <Route path="/try-now" element={<TryNow />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
