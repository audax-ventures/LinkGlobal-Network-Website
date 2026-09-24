import type { ReactNode } from 'react'
import Footer from './footer/Footer'

// Every page uses the homepage's palette: a clean light base (#f8fbff) with
// full-width navy sections (NavyBand) and dark cards for contrast, then a
// soft fade into the dark footer. This replaced an older page-length
// white-to-sky-blue gradient that made inner pages drift into mid-blue
// midway down, unlike the homepage.
//
// Home builds its own fade to dark before the footer, so it passes
// footerFade={false}.

const LIGHT = '#f8fbff'
const FOOTER_BG = '#050f1f'

export default function PageShell({ children, footerFade = true }: { children: ReactNode; footerFade?: boolean }) {
  return (
    <main style={{ background: LIGHT }}>
      {children}
      {footerFade && (
        <div
          className="pointer-events-none h-40 sm:h-56"
          style={{ background: `linear-gradient(180deg, ${LIGHT} 0%, #c3e6ff 30%, #2f8fd4 60%, #123a66 80%, ${FOOTER_BG} 100%)` }}
          aria-hidden="true"
        />
      )}
      <div style={{ background: FOOTER_BG }}>
        <Footer />
      </div>
    </main>
  )
}
