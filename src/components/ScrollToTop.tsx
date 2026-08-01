import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Route changes swap page content in place without a full reload, so the
// browser keeps whatever scroll position the previous page ended at. Reset
// to top on every navigation so a new page never opens mid-scroll.
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
