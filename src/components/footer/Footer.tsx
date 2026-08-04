import { Link } from 'react-router-dom'
import Logo from '../Logo'
import { NAV_ROUTES } from '../../routes'

const PARTNERS = [
  'Nordic Language Institute',
  'Kyoto Global Academy',
  'Andes Learning Collective',
  'Meridian Education Group',
  'Cape Town Language Exchange',
  'Alpine Linguistics Center',
  'Pacific Rim Institute',
  'Sahara Cultural Academy',
  'Baltic Fluency School',
  'Continental Language Partners',
]

function SocialIcon({ path }: { path: string }) {
  return (
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-white/30 hover:text-white"
      aria-label="Social link (placeholder)"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d={path} />
      </svg>
    </a>
  )
}

export default function Footer() {
  return (
    <footer className="relative px-6 pt-12 pb-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Logo variant="reversed" className="h-8 w-auto" />
            <p className="mt-4 max-w-xs text-sm text-white/55">
              Connecting learners with real tutors, in real conversations, all around the
              world.
            </p>
            <div className="mt-6 flex gap-3">
              <SocialIcon path="M22 5.9c-.7.3-1.5.5-2.3.6.8-.5 1.4-1.3 1.7-2.3-.8.5-1.6.8-2.6 1a4 4 0 0 0-6.9 3.7A11.4 11.4 0 0 1 3.6 4.9a4 4 0 0 0 1.2 5.4c-.6 0-1.2-.2-1.7-.5v.1a4 4 0 0 0 3.2 4 4 4 0 0 1-1.8.1 4 4 0 0 0 3.8 2.8A8 8 0 0 1 2 18.6a11.4 11.4 0 0 0 6.2 1.8c7.4 0 11.5-6.4 11.5-11.9v-.5c.8-.6 1.5-1.3 2-2.1" />
              <SocialIcon path="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3Zm-5 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5Zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5ZM17.8 6a1 1 0 1 1-1 1 1 1 0 0 1 1-1Z" />
              <SocialIcon path="M4.5 3.9a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM2.5 10.4h4V21h-4Zm7 0h3.8v1.5h.1a4.2 4.2 0 0 1 3.8-2c4 0 4.8 2.7 4.8 6.1V21h-4v-4.4c0-1 0-2.4-1.5-2.4s-1.7 1.1-1.7 2.3V21h-4Z" />
            </div>
          </div>

          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">Explore</span>
            <ul className="mt-4 space-y-2.5">
              {NAV_ROUTES.map((route) => (
                <li key={route.id}>
                  <Link to={route.path} className="text-sm text-white/60 transition-colors hover:text-white">
                    {route.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">Contact</span>
            <p className="mt-4 text-sm text-white/60">
              Have a question?
              <br />
              <a href="mailto:info@linkglobalnetwork.ca" className="text-brand-light hover:underline">
                info@linkglobalnetwork.ca
              </a>
            </p>
          </div>
        </div>

        <div className="mt-20 border-t border-white/10 pt-10">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/35">
            Trusted alongside
          </span>
          <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-5">
            {PARTNERS.map((name) => (
              <svg key={name} viewBox="0 0 160 24" className="h-5 w-full max-w-[150px] opacity-40">
                <text
                  x="0"
                  y="17"
                  fontFamily="Inter, system-ui, sans-serif"
                  fontWeight="700"
                  fontSize="12"
                  fill="#ffffff"
                >
                  {name}
                </text>
              </svg>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse items-center gap-4 border-t border-white/10 pt-8 sm:flex-row sm:justify-between">
          <p className="text-xs text-white/35">
            &copy; {new Date().getFullYear()} LinkGlobal Network. All rights reserved.
          </p>
          <p className="text-xs text-white/35">
            Built by{' '}
            <a
              href="https://audaxventures.ca"
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
