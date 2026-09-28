import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import FloatingNav from './components/nav/FloatingNav'
import ChatWidget from './components/chat/ChatWidget'
import ScrollToTop from './components/ScrollToTop'
import PageMeta from './components/PageMeta'
import OrgSchema from './components/OrgSchema'
import Home from './pages/Home'
import About from './pages/About'
import ForYou from './pages/ForYou'
import ForLearners from './pages/ForLearners'
import ForEducators from './pages/ForEducators'
import TryNow from './pages/TryNow'
import Pricing from './pages/Pricing'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <FloatingNav />
      <ChatWidget />
      <ScrollToTop />
      <PageMeta />
      <OrgSchema />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/for-you" element={<ForYou />} />
        <Route path="/for-learners" element={<ForLearners />} />
        <Route path="/for-educators" element={<ForEducators />} />
        {/* Old addresses (also 301'd in vercel.json for direct visits). */}
        <Route path="/learners" element={<Navigate to="/for-learners" replace />} />
        <Route path="/educators" element={<Navigate to="/for-educators" replace />} />
        <Route path="/try-now" element={<TryNow />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
