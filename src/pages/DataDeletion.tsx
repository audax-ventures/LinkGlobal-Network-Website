import { Link } from 'react-router-dom'
import LegalPage from '../components/LegalPage'
import type { LegalSection } from '../components/LegalPage'
import { CONTACT_EMAIL } from '../content/site'

// Data deletion instructions: required by Meta for Facebook Login (the app's
// "Data deletion instructions URL"). PLACEHOLDER drafted by Audax (Oct 2026);
// LinkGlobal must confirm the process and the 30-day timeline.

const UPDATED = 'October 21, 2026'
const SUBJECT = 'Delete my data'
const mailHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(SUBJECT)}`
const mail = (
  <a href={mailHref} className="font-semibold text-brand-blue hover:underline">
    {CONTACT_EMAIL}
  </a>
)

const SECTIONS: LegalSection[] = [
  {
    id: 'request',
    title: 'How to ask us to delete your data',
    body: (
      <>
        <p>
          Email {mail} with the subject <strong>“{SUBJECT}”</strong>. Please send it from the email address on your
          LinkGlobal account, and include:
        </p>
        <ul>
          <li>your full name;</li>
          <li>how you sign in to LinkGlobal (for example, with Facebook or with your email address);</li>
          <li>anything else that helps us find your account, such as your Facebook name if it differs.</li>
        </ul>
        <p>
          <a
            href={mailHref}
            className="mt-2 inline-flex items-center gap-2 rounded-full px-7 py-3 text-base font-semibold text-white shadow-[0_8px_24px_rgba(30,120,190,0.3)]"
            style={{ background: 'linear-gradient(90deg, #1ba3e0, #3ec6ff)' }}
          >
            Email a deletion request
          </a>
        </p>
      </>
    ),
  },
  {
    id: 'what-happens',
    title: 'What happens next',
    body: (
      <ul>
        <li>We reply to confirm we have your request. We may ask you to verify that the account is yours.</li>
        <li>We delete your account and personal information within 30 days of verifying your request.</li>
        <li>We email you when the deletion is complete.</li>
      </ul>
    ),
  },
  {
    id: 'what-is-deleted',
    title: 'What we delete',
    body: (
      <>
        <p>
          Your account and profile, including any information we received through Facebook Login, your assessment
          answers, learning path, progress, lesson history, and messages.
        </p>
        <p>
          We may keep a limited record where the law requires it, such as payment and tax records, or where we need it
          to resolve a dispute or prevent fraud. We keep it only as long as necessary, and it is not used for anything
          else.
        </p>
      </>
    ),
  },
  {
    id: 'facebook',
    title: 'Removing LinkGlobal from Facebook',
    body: (
      <>
        <p>
          You can also stop LinkGlobal from receiving information from Facebook. In Facebook, go to{' '}
          <strong>Settings &amp; privacy</strong>, then <strong>Settings</strong>, then <strong>Apps and websites</strong>,
          and remove LinkGlobal.
        </p>
        <p>
          This stops future sharing, but it does not delete the information LinkGlobal already holds. To delete that, send
          us a request as described above.
        </p>
      </>
    ),
  },
  {
    id: 'more',
    title: 'More about your information',
    body: (
      <p>
        Our{' '}
        <Link to="/privacy" className="font-semibold text-brand-blue hover:underline">
          Privacy Policy
        </Link>{' '}
        explains what we collect, how we use it, and your other rights, including access and correction.
      </p>
    ),
  },
]

export default function DataDeletion() {
  return (
    <LegalPage
      title="Delete your data"
      updated={UPDATED}
      intro={<p>You can ask LinkGlobal to delete your account and personal information at any time, including information we received when you signed in with Facebook.</p>}
      sections={SECTIONS}
    />
  )
}
