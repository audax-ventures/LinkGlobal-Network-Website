import { Link } from 'react-router-dom'
import LegalPage from '../components/LegalPage'
import type { LegalSection } from '../components/LegalPage'
import { CONTACT_EMAIL } from '../content/site'

// Privacy Policy. PLACEHOLDER drafted by Audax (Oct 2026) from how the site
// and platform actually work; LinkGlobal must review and confirm it (ideally
// with legal counsel) before it is relied on. Update UPDATED on every change.

const UPDATED = 'October 21, 2026'
const mail = <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-brand-blue hover:underline">{CONTACT_EMAIL}</a>

const SECTIONS: LegalSection[] = [
  {
    id: 'who-we-are',
    title: 'Who we are',
    body: (
      <>
        <p>
          LinkGlobal Network Inc. (“LinkGlobal”, “we”, “us”) is a Canadian company. We operate the website at
          www.linkglobalnetwork.io and the LinkGlobal learning platform, which connects language learners with an AI
          learning path, certified educators, and native-speaking conversation partners.
        </p>
        <p>
          We are responsible for the personal information we collect. You can reach our privacy contact at {mail}.
        </p>
      </>
    ),
  },
  {
    id: 'what-we-collect',
    title: 'Information we collect',
    body: (
      <>
        <p>We collect information you give us, and a limited amount of information collected automatically.</p>
        <ul>
          <li>
            <strong>When you contact us:</strong> your name, email address, the topic you choose, and your message.
          </li>
          <li>
            <strong>When you create an account and take the assessment:</strong> your name, email address, goals, current
            level, profession, interests, destination, and your answers to the assessment.
          </li>
          <li>
            <strong>If you sign in with Facebook:</strong> the basic profile information Facebook shares with your
            permission, such as your name, email address, and profile picture. We use it only to create and sign you in
            to your account. We do not post to Facebook or access your friends list.
          </li>
          <li>
            <strong>When you learn with us:</strong> your bookings, lesson history, progress, and the speaking you do in
            practice and sessions, which our AI analyzes to update your learning path and provide feedback.
          </li>
          <li>
            <strong>When you pay:</strong> payment details are handled by our payment processor. We receive a
            confirmation and limited details, such as the amount and the last digits of your card, and we do not store
            full card numbers.
          </li>
          <li>
            <strong>If you teach or share your language with us:</strong> the information in your application, such as
            your qualifications, languages, experience, and availability.
          </li>
          <li>
            <strong>When you use the chat assistant:</strong> the messages you type into it.
          </li>
          <li>
            <strong>Automatically:</strong> technical information such as your IP address, browser and device type, and
            the pages you visit, collected through our hosting provider, our website analytics tools (including Google Analytics), and the Meta Pixel.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'how-we-use',
    title: 'How we use your information',
    body: (
      <ul>
        <li>To reply to your messages and support requests.</li>
        <li>To build and update your learning path, and to measure your progress.</li>
        <li>To brief your educator before each lesson and to match you with conversation partners.</li>
        <li>To provide paid features you choose, such as personal AI feedback, and to process payments.</li>
        <li>To keep the platform secure, prevent abuse, and limit automated misuse.</li>
        <li>To understand how the website is used and to improve it.</li>
        <li>To meet our legal and accounting obligations.</li>
        <li>To send you news or offers, only where you have agreed to receive them. You can unsubscribe at any time.</li>
      </ul>
    ),
  },
  {
    id: 'ai',
    title: 'How we use AI',
    body: (
      <>
        <p>
          AI is part of how LinkGlobal works. It analyzes how you speak to plan what comes next, prepares the briefing
          your educator receives, and powers the chat assistant on our website.
        </p>
        <p>
          To do this, your information may be processed by third-party AI service providers acting on our behalf, under
          terms that limit its use to providing the service to us. Please do not enter sensitive personal information
          into the chat assistant.
        </p>
      </>
    ),
  },
  {
    id: 'sharing',
    title: 'When we share information',
    body: (
      <>
        <p>We do not sell your personal information. We share it only as needed to run LinkGlobal:</p>
        <ul>
          <li>
            <strong>With your educator:</strong> your goals, level, and focus areas, so each lesson starts in the right
            place.
          </li>
          <li>
            <strong>With conversation partners:</strong> your first name and the interests or background relevant to
            your match.
          </li>
          <li>
            <strong>With service providers:</strong> companies that host our website and platform, deliver email and form
            messages, provide AI processing, process payments, and measure website use. They may use your information
            only to provide their services to us.
          </li>
          <li>
            <strong>With Meta, for advertising:</strong> the Meta Pixel on our website shares information about your
            visit with Meta Platforms, so we can measure our ads on Facebook and Instagram and show them to people who
            may be interested. Meta’s use of this information is governed by its own privacy policy.
          </li>
          <li>
            <strong>For legal reasons:</strong> where required by law, or to protect the rights, safety, and property of
            our users or LinkGlobal.
          </li>
          <li>
            <strong>In a business transfer:</strong> if LinkGlobal is involved in a merger, sale, or reorganization, under
            the same protections described here.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'transfers',
    title: 'Storage outside Canada',
    body: (
      <p>
        Some of our service providers store or process information outside Canada, including in the United States.
        When that happens, your information is subject to the laws of that country, and may be accessible to its
        courts and authorities. We choose providers that protect personal information to a standard comparable to
        ours.
      </p>
    ),
  },
  {
    id: 'cookies',
    title: 'Cookies and similar technologies',
    body: (
      <>
        <p>
          Our website uses Google Analytics to understand how visitors use it, such as which pages are visited and how
          people arrive. Google Analytics sets cookies and collects information like your IP address, device, and
          browser, which Google processes on our behalf, including in the United States.
        </p>
        <p>
          We also use the Meta Pixel, an advertising tool from Meta Platforms. It sets cookies and sends Meta information
          about your visit, such as the pages you view, your IP address, and your browser, so we can measure how our
          Facebook and Instagram ads perform and reach people who may be interested in LinkGlobal. You can control the ads
          you see in your{' '}
          <a href="https://www.facebook.com/adpreferences" target="_blank" rel="noreferrer" className="font-semibold text-brand-blue hover:underline">
            Facebook ad preferences
          </a>
          .
        </p>
        <p>
          You can block cookies in your browser settings, or opt out of Google Analytics with Google’s{' '}
          <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noreferrer" className="font-semibold text-brand-blue hover:underline">
            opt-out browser add-on
          </a>
          .
        </p>
        <p>
          We also use Vercel’s cookie-free analytics, and your browser’s session storage to remember, for the current
          visit only, that you have already seen the opening animation.
        </p>
        <p>
          The learning platform uses essential cookies to keep you signed in. If we introduce other cookies, we will
          update this policy and ask for your consent where the law requires it.
        </p>
      </>
    ),
  },
  {
    id: 'retention',
    title: 'How long we keep information',
    body: (
      <p>
        We keep personal information only as long as we need it for the purposes above, or as the law requires. Contact
        messages are kept while we deal with your request and for a reasonable period afterwards. Account and learning
        information is kept while your account is open. When information is no longer needed, we delete or anonymize it.
      </p>
    ),
  },
  {
    id: 'security',
    title: 'Security',
    body: (
      <p>
        We use reasonable technical and organizational safeguards to protect your information, including encrypted
        connections. No method of transmission or storage is completely secure, so we cannot guarantee absolute
        security. If a breach creates a real risk of significant harm, we will notify you and the authorities as the law
        requires.
      </p>
    ),
  },
  {
    id: 'your-rights',
    title: 'Your choices and rights',
    body: (
      <>
        <p>
          You can ask to access the personal information we hold about you, to correct it, or to withdraw your consent to
          its use, subject to legal and contractual limits. Withdrawing consent may mean we can no longer provide some
          services. To make a request, email {mail}. We may need to confirm your identity before we respond.
        </p>
        <p>
          You can also ask us to delete your account and personal information.{' '}
          <Link to="/data-deletion" className="font-semibold text-brand-blue hover:underline">
            Here is how to request deletion
          </Link>
          .
        </p>
        <p>
          If you are not satisfied with our response, you can contact the Office of the Privacy Commissioner of Canada,
          or the privacy regulator in your province.
        </p>
      </>
    ),
  },
  {
    id: 'young-people',
    title: 'Young people',
    body: (
      <p>
        LinkGlobal is intended for adults. If you are under 18, you may use it only with the consent and supervision of a
        parent or guardian. We do not knowingly collect information from children under 13. If you believe a child has
        given us information, contact us and we will delete it.
      </p>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to this policy',
    body: (
      <p>
        We may update this policy as LinkGlobal changes. We will post the new version here with a new “last updated”
        date, and tell you directly about significant changes.
      </p>
    ),
  },
  {
    id: 'contact',
    title: 'Contact us',
    body: (
      <p>
        Questions about this policy or your information: email {mail}, or use our{' '}
        <Link to="/contact" className="font-semibold text-brand-blue hover:underline">
          contact page
        </Link>
        .
      </p>
    ),
  },
]

export default function Privacy() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated={UPDATED}
      intro={
        <p>
          This policy explains what personal information LinkGlobal collects, how we use it, and the choices you have. It
          applies to our website and to the LinkGlobal learning platform.
        </p>
      }
      sections={SECTIONS}
    />
  )
}
