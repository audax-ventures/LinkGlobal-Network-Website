import { Link } from 'react-router-dom'
import Logo from '../Logo'
import { BRAND, CONTACT_EMAIL, LEGAL, SOCIAL } from '../../content/site'


function SocialIcon({ path, href, label }: { path: string; href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-white/30 hover:text-white"
      aria-label={label}
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d={path} />
      </svg>
    </a>
  )
}

const INSTAGRAM_PATH =
  'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3Zm-5 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5Zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5ZM17.8 6a1 1 0 1 1-1 1 1 1 0 0 1 1-1Z'
const LINKEDIN_PATH =
  'M4.5 3.9a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM2.5 10.4h4V21h-4Zm7 0h3.8v1.5h.1a4.2 4.2 0 0 1 3.8-2c4 0 4.8 2.7 4.8 6.1V21h-4v-4.4c0-1 0-2.4-1.5-2.4s-1.7 1.1-1.7 2.3V21h-4Z'

// Footer per Website Copy v7. Links whose destination doesn't exist yet
// (social profiles, legal pages) stay hidden until set in content/site.ts.
const COLUMNS: { title: string; links: { label: string; to: string }[] }[] = [
  {
    title: 'Explore',
    links: [
      { label: 'For Learners', to: '/for-learners' },
      { label: 'Pricing', to: '/pricing' },
      { label: 'About', to: '/about' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    title: 'Join Us',
    links: [
      { label: 'For Educators', to: '/for-educators' },
      { label: 'Conversation Partners', to: '/for-you' },
    ],
  },
]

function ColumnTitle({ children }: { children: string }) {
  return <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">{children}</span>
}

export default function Footer() {
  const legal = [
    { label: 'Privacy Policy', href: LEGAL.privacy },
    { label: 'Terms of Service', href: LEGAL.terms },
    { label: 'Cookie Settings', href: LEGAL.cookies },
  ].filter((l): l is { label: string; href: string } => !!l.href)
  const hasSocial = !!(SOCIAL.instagram || SOCIAL.linkedin)

  return (
    <footer className="relative px-6 pt-12 pb-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" aria-label={`${BRAND} home`}>
              <Logo variant="reversed" className="h-8 w-auto" />
            </Link>
            <p className="mt-5 text-base font-semibold text-white">Learn the language. Own the conversation.</p>
            <p className="mt-2 max-w-xs text-sm text-white/55">
              A personalized learning path, live lessons, and real conversation with native speakers.
            </p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">Headquartered in Canada</p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <ColumnTitle>{col.title}</ColumnTitle>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-sm text-white/60 transition-colors hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <ColumnTitle>Contact</ColumnTitle>
            <p className="mt-4 text-sm">
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand-light hover:underline">
                {CONTACT_EMAIL}
              </a>
            </p>
            {hasSocial && (
              <>
                <div className="mt-6">
                  <ColumnTitle>Follow</ColumnTitle>
                </div>
                <div className="mt-3 flex gap-3">
                  {SOCIAL.instagram && <SocialIcon path={INSTAGRAM_PATH} href={SOCIAL.instagram} label="Instagram" />}
                  {SOCIAL.linkedin && <SocialIcon path={LINKEDIN_PATH} href={SOCIAL.linkedin} label="LinkedIn" />}
                </div>
              </>
            )}
            {legal.length > 0 && (
              <>
                <div className="mt-6">
                  <ColumnTitle>Legal</ColumnTitle>
                </div>
                <ul className="mt-3 space-y-2">
                  {legal.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} className="text-sm text-white/60 transition-colors hover:text-white">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse items-center gap-4 border-t border-white/10 pt-8 sm:flex-row sm:justify-between">
          <p className="text-xs text-white/35">&copy; {new Date().getFullYear()} {BRAND}. All rights reserved.</p>
          <p className="text-xs text-white/35">
            Built by{' '}
            <a
              href="https://www.audaxventures.ca"
              target="_blank"
              rel="noreferrer"
              className="text-white/60 hover:text-white"
            >
              Audax Ventures
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
