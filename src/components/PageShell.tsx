import type { ReactNode } from 'react'
import Footer from './footer/Footer'

// The same continuous white-to-deep-blue gradient used on the homepage,
// reapplied per-page so every route reads as part of one site rather than
// homepage-only styling. Percentages are relative to each page's own
// height, so a short page still runs light-at-top to dark-at-footer.
const GRADIENT =
  'linear-gradient(180deg, #f8fbff 0%, #eaf5ff 15%, #c3e6ff 30%, #7fcdf0 45%, #2f8fd4 60%, #123a66 75%, #081b33 90%, #050f1f 100%)'

export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <main style={{ background: GRADIENT }}>
      {children}
      <Footer />
    </main>
  )
}
