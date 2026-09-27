import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Route changes swap page content in place without a full reload, so the
// browser keeps whatever scroll position the previous page ended at. Reset
// to top on every navigation so a new page never opens mid-scroll.
export default function ScrollToTop() {
  const { pathname } = useLocation()

  // Layout effect + instant: runs before paint and before the homepage
  // intro's own layout effect (which may then jump down to the hero), and
  // isn't turned into an animated scroll by html's scroll-behavior: smooth.
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])

  return null
}
