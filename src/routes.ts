export interface NavRoute {
  id: string
  label: string
  path: string
}

// Single source of truth for site navigation (Website Copy v7 order) — used
// by FloatingNav, Footer and App's <Routes>. /try-now still exists as the
// interim "Start Your Journey" destination but isn't in the nav.
export const NAV_ROUTES: NavRoute[] = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'learners', label: 'For Learners', path: '/for-learners' },
  { id: 'educators', label: 'For Educators', path: '/for-educators' },
  { id: 'for-you', label: 'For You', path: '/for-you' },
  { id: 'about', label: 'About', path: '/about' },
  { id: 'pricing', label: 'Pricing', path: '/pricing' },
  { id: 'contact', label: 'Contact', path: '/contact' },
]
