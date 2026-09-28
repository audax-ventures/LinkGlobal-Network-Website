// Site-wide settings and the values the copy document (Website Copy v7)
// leaves blank. Fill these in when they're known — every page reads from
// here. Anything left `null` is hidden or given a neutral fallback, so the
// live site never shows a bracketed placeholder.

export const BRAND = 'LinkGlobal'

// "Start Your Journey" / "Start Teaching With Us" destinations. Point these
// at the real platform signup when it's ready (full https:// URLs work).
export const LEARNER_SIGNUP_URL = '/try-now'
export const EDUCATOR_SIGNUP_URL = '/try-now'

export const CONTACT_EMAIL = 'hello@linkglobal.com'

export const SOCIAL: { instagram: string | null; linkedin: string | null } = {
  instagram: null,
  linkedin: null,
}

// Legal pages (footer). Hidden until the pages exist.
export const LEGAL: { privacy: string | null; terms: string | null; cookies: string | null } = {
  privacy: null,
  terms: null,
  cookies: null,
}

export const PENDING = {
  /** Pay-as-you-go lesson price, e.g. '$45'. */
  lessonPrice: null as string | null,
  /** Personal AI Feedback price, e.g. '$15'. */
  aiFeedbackPrice: null as string | null,
  /** Languages currently offered, e.g. ['English', 'French']. */
  languages: null as string[] | null,
  /** Contact reply time in business days, e.g. 2. */
  replyDays: null as number | null,
  /** One sentence on the educator selection process (For Educators). */
  educatorSelection: null as string | null,
  /** Proof band on Home. The band only shows once all three are set. */
  proof: { conversations: null as string | null, educators: null as string | null, countries: null as string | null },
  /** Testimonial attributions, in the order the quotes appear on Home. */
  testimonialNames: [null, null, null] as (string | null)[],
}

/** Internal route (starts with '/') vs external URL. */
export const isExternal = (url: string) => /^https?:\/\//.test(url)
