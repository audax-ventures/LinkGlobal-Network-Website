import { lazy } from 'react'

// three.js + react-globe.gl + topojson-client are a large chunk (500KB+) that
// isn't needed until Beat 2 of the loading sequence at the earliest — code-
// splitting it here keeps it out of the initial bundle the page has to parse
// and execute before it's interactive.
const LazyStylizedGlobe = lazy(() => import('./StylizedGlobe'))

export default LazyStylizedGlobe
