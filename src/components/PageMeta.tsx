import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Per-page <title>, meta description, canonical URL and og:title/description.
// This is a client-rendered site, so these update in the browser (tab title,
// history, Google — which runs JavaScript). Link-preview scrapers that don't
// run JavaScript fall back to the site-wide defaults in index.html.

// Titles and descriptions from Website Copy v7, section 09 (Search Listings).
const META: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'AI Language Learning with Live Native Speakers | LinkGlobal',
    description:
      'A personalized AI learning path, live lessons with certified educators, and real conversation with native speakers. For newcomers, students, and professionals.',
  },
  '/for-learners': {
    title: 'Learn a Language with Native Speakers | LinkGlobal',
    description:
      'A personalized learning path for newcomers, international students, and professionals. Live lessons with certified educators, plus IELTS and TOEFL preparation.',
  },
  '/for-educators': {
    title: 'Teach Languages Online as a Native Speaker | LinkGlobal',
    description:
      'Teach motivated learners worldwide on your own schedule. LinkGlobal briefs you before every session, so the hour goes to teaching, not assessment.',
  },
  '/for-you': {
    title: 'Conversation Practice with Native Speakers | LinkGlobal',
    description:
      'Speak with native speakers matched to your profession, interests, or destination. Real conversation practice, with no lesson plan and no assessment.',
  },
  '/about': {
    title: 'About LinkGlobal | Language Learning Built Around People',
    description:
      'LinkGlobal combines an adaptive AI learning path with live educators and native speakers, so learners build confidence in the conversations that matter.',
  },
  '/pricing': {
    title: 'LinkGlobal Pricing | Pay As You Go Language Lessons',
    description:
      'No subscription. Free assessment, learning path, and AI-guided practice. Pay for individual lessons with certified educators and personal AI feedback.',
  },
  '/contact': {
    title: 'Contact LinkGlobal | Learn, Teach, or Speak With Learners',
    description:
      'Questions about learning a language, teaching with LinkGlobal, or becoming a conversation partner? Every message is read by a person.',
  },
  '/try-now': {
    title: 'Start Your Journey | LinkGlobal',
    description: 'Tell us your goal. Your plan follows from your answers.',
  },
}

const NOT_FOUND = {
  title: 'Page Not Found | LinkGlobal',
  description: 'This page has moved. Everything else is where you left it.',
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
