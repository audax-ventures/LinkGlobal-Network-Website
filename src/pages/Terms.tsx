import { Link } from 'react-router-dom'
import LegalPage from '../components/LegalPage'
import type { LegalSection } from '../components/LegalPage'
import { CONTACT_EMAIL } from '../content/site'

// Terms of Service. PLACEHOLDER drafted by Audax (Oct 2026) from the site's
// own copy (pay-as-you-go lessons, the cancellation rule, AI feedback add-on);
// LinkGlobal must review and confirm it, ideally with legal counsel, before it
// is relied on. Update UPDATED on every change.

const UPDATED = 'October 20, 2026'
const mail = <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-brand-blue hover:underline">{CONTACT_EMAIL}</a>
const privacy = (
  <Link to="/privacy" className="font-semibold text-brand-blue hover:underline">
    Privacy Policy
  </Link>
)

const SECTIONS: LegalSection[] = [
  {
    id: 'agreement',
    title: 'About these terms',
    body: (
      <p>
        These terms are an agreement between you and LinkGlobal Network Inc. (“LinkGlobal”, “we”, “us”). They apply when
        you use our website at www.linkglobalnetwork.io or the LinkGlobal learning platform, whether you are a learner,
        an educator, or a conversation partner. By using LinkGlobal, you agree to these terms and to our {privacy}. If you
        do not agree, please do not use LinkGlobal.
      </p>
    ),
  },
  {
    id: 'eligibility',
    title: 'Who can use LinkGlobal',
    body: (
      <ul>
        <li>You must be 18 or older, or have the consent of a parent or guardian who agrees to these terms for you.</li>
        <li>The information you give us, including in your assessment and any application, must be accurate.</li>
        <li>You are responsible for keeping your login details private and for activity on your account.</li>
      </ul>
    ),
  },
  {
    id: 'service',
    title: 'What LinkGlobal provides',
    body: (
      <>
        <p>
          LinkGlobal combines a personalized learning path planned by AI, live lessons with certified educators,
          conversation practice with native speakers, and optional personal AI feedback.
        </p>
        <p>
          We may add, change, or remove features over time. We aim to keep LinkGlobal available, but we do not guarantee
          that it will always be uninterrupted or error-free, or that a particular educator or conversation partner will
          be available.
        </p>
      </>
    ),
  },
  {
    id: 'people',
    title: 'Educators and conversation partners',
    body: (
      <>
        <p>
          Educators deliver structured lessons. Conversation partners are native speakers who offer conversation, not
          teaching. We select and brief the people on LinkGlobal, but each person is responsible for their own conduct.
        </p>
        <p>
          If you teach or share your language on LinkGlobal, additional terms about your role, availability, and payment
          may apply, and we will provide them to you separately.
        </p>
      </>
    ),
  },
  {
    id: 'payments',
    title: 'Bookings, payments, and cancellations',
    body: (
      <ul>
        <li>Lessons are booked and paid for individually, at the price shown when you book, plus any applicable taxes.</li>
        <li>Personal AI feedback is an optional paid add-on, at the price shown when you choose it.</li>
        <li>A lesson you cancel after booking is not refunded.</li>
        <li>If your educator cancels, the full value of the lesson returns to your balance for another lesson.</li>
        <li>
          If we offer subscriptions or packages, the price, billing period, and cancellation terms will be shown before
          you buy and form part of these terms.
        </li>
        <li>Nothing in these terms limits any refund rights you have under the consumer protection laws that apply to you.</li>
      </ul>
    ),
  },
  {
    id: 'conduct',
    title: 'Using LinkGlobal respectfully',
    body: (
      <>
        <p>LinkGlobal works because people treat each other with patience and respect. You agree not to:</p>
        <ul>
          <li>harass, threaten, discriminate against, or demean anyone;</li>
          <li>share content that is unlawful, explicit, hateful, or infringes someone else’s rights;</li>
          <li>record a lesson or conversation without the consent of everyone in it;</li>
          <li>impersonate anyone, or misrepresent your qualifications;</li>
          <li>interfere with the platform’s security, or access it with automated tools without our permission.</li>
        </ul>
        <p>Please report any behaviour that concerns you to {mail}.</p>
      </>
    ),
  },
  {
    id: 'content',
    title: 'Your content and ours',
    body: (
      <>
        <p>
          You keep ownership of what you submit, such as your messages and spoken practice. You give us permission to use
          it to run LinkGlobal for you, including analyzing it with AI to update your learning path and prepare your
          educator’s briefing, as described in our {privacy}.
        </p>
        <p>
          LinkGlobal’s name, logo, website, platform, and learning materials belong to us or our licensors. You may use
          them only to learn or teach on LinkGlobal, and may not copy, resell, or redistribute them.
        </p>
      </>
    ),
  },
  {
    id: 'ai-and-outcomes',
    title: 'AI features and results',
    body: (
      <>
        <p>
          AI suggestions, feedback, and chat assistant replies can be incomplete or wrong. Use them as guidance, not as
          professional, legal, immigration, or academic advice.
        </p>
        <p>
          Progress depends on many things, including your practice. We do not guarantee fluency, a test score, an
          admission, a job, or any other particular result.
        </p>
      </>
    ),
  },
  {
    id: 'third-parties',
    title: 'Other services',
    body: (
      <p>
        LinkGlobal relies on third-party services, such as payment processing and video calls, and may link to other
        websites. Those services have their own terms, and we are not responsible for them.
      </p>
    ),
  },
  {
    id: 'ending',
    title: 'Suspending or closing accounts',
    body: (
      <p>
        You can stop using LinkGlobal and ask us to close your account at any time. We may suspend or close an account
        that breaks these terms or puts other people at risk. Where reasonable, we will tell you why first. Any unused
        balance on a closed account is handled as the law that applies to you requires.
      </p>
    ),
  },
  {
    id: 'liability',
    title: 'Limits on our responsibility',
    body: (
      <p>
        To the extent the law allows, LinkGlobal is provided “as is”, and we are not liable for indirect or consequential
        losses, or for losses caused by the conduct of other users. Where we are liable, our total liability is limited to
        the amount you paid us in the 12 months before the claim. Nothing in these terms excludes rights or liability
        that cannot be excluded under the law that applies to you.
      </p>
    ),
  },
  {
    id: 'law',
    title: 'Governing law',
    body: (
      <p>
        These terms are governed by the laws of Canada and of the province in which LinkGlobal Network Inc. has its head
        office, unless the consumer protection laws of your province give you the right to rely on its laws or courts.
      </p>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to these terms',
    body: (
      <p>
        We may update these terms as LinkGlobal changes. We will post the new version here with a new “last updated”
        date, and tell you directly about significant changes before they take effect. If you keep using LinkGlobal after
        that, the updated terms apply.
      </p>
    ),
  },
  {
    id: 'contact',
    title: 'Contact us',
    body: (
      <p>
        Questions about these terms: email {mail}, or use our{' '}
        <Link to="/contact" className="font-semibold text-brand-blue hover:underline">
          contact page
        </Link>
        .
      </p>
    ),
  },
]

export default function Terms() {
  return (
    <LegalPage
      title="Terms of Service"
      updated={UPDATED}
      intro={<p>Please read these terms before you use LinkGlobal. They explain what you can expect from us, and what we expect from you.</p>}
      sections={SECTIONS}
    />
  )
}
