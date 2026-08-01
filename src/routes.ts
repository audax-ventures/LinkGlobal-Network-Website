export interface NavRoute {
  id: string
  label: string
  path: string
}

// Single source of truth for site navigation — used by FloatingNav, Footer,
// and App's <Routes>, so adding a page means updating one list.
export const NAV_ROUTES: NavRoute[] = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'about', label: 'About', path: '/about' },
  { id: 'for-you', label: 'For You', path: '/for-you' },
  { id: 'learners', label: 'For Learners', path: '/learners' },
  { id: 'educators', label: 'For Educators', path: '/educators' },
  { id: 'try-now', label: 'Try Now', path: '/try-now' },
  { id: 'pricing', label: 'Pricing', path: '/pricing' },
  { id: 'contact', label: 'Contact', path: '/contact' },
]
