import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Per-page <title>, meta description, canonical URL and og:title/description.
// This is a client-rendered site, so these update in the browser (tab title,
// history, Google — which runs JavaScript). Link-preview scrapers that don't
// run JavaScript fall back to the site-wide defaults in index.html.

const SITE = 'LinkGlobal Network'

const META: Record<string, { title: string; description: string }> = {
  '/': {
    title: `${SITE} — Learn a Language, Meet the World`,
    description:
      'LinkGlobal Network connects learners with real, native-speaking tutors in 120+ countries. Personalized language learning, built for how the world actually talks.',
  },
  '/about': {
    title: `About Us | ${SITE}`,
    description:
      'Why we built LinkGlobal Network: language apps got good at drills, not conversation. Real tutors, real people, real practice.',
  },
  '/for-you': {
    title: `Who It's For | ${SITE}`,
    description:
      'Made for learners, tutors and institutions alike — see how LinkGlobal Network fits your side of the language-learning equation.',
  },
  '/learners': {
    title: `For Learners | ${SITE}`,
    description:
      'Personalized lessons, flexible scheduling and real conversations with native speakers — so progress fits around your life.',
  },
  '/educators': {
    title: `For Educators | ${SITE}`,
    description:
      'Teach on your own schedule, from anywhere. Set your own hours, connect with motivated learners worldwide and get paid reliably.',
  },
  '/try-now': {
    title: `Get Started | ${SITE}`,
    description:
      "Whether you're here to learn or to teach, getting started takes just a few minutes. Your first real conversation starts here.",
  },
  '/pricing': {
    title: `Pricing | ${SITE}`,
    description:
      'Straightforward monthly plans for live, 1-on-1 language learning — plus pay-per-session and institution options. Switch or cancel anytime.',
  },
  '/contact': {
    title: `Contact | ${SITE}`,
    description:
      "Questions about learning, teaching, or bringing LinkGlobal Network to your organization? Send us a message and we'll get back to you.",
  },
}

const NOT_FOUND = {
  title: `Page Not Found | ${SITE}`,
  description: "The page you're looking for doesn't exist or has moved.",
}

function setMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export default function PageMeta() {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
    const known = META[path]
    const meta = known ?? NOT_FOUND

    document.title = meta.title
    setMeta('meta[name="description"]', 'name', 'description', meta.description)
    setMeta('meta[property="og:title"]', 'property', 'og:title', meta.title)
    setMeta('meta[property="og:description"]', 'property', 'og:description', meta.description)

    const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (canonical && known) {
      const origin = new URL(canonical.href).origin
      canonical.href = `${origin}${path === '/' ? '/' : path}`
    }

    // Unknown URLs render the 404 page (the host serves index.html for every
    // path), so tell search engines not to index them.
    let robots = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]')
    if (!known) {
      if (!robots) {
        robots = document.createElement('meta')
        robots.name = 'robots'
        document.head.appendChild(robots)
      }
      robots.content = 'noindex'
    } else if (robots) {
      robots.remove()
    }
  }, [pathname])

  return null
}
