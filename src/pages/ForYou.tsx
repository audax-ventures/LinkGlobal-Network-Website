import PageShell from '../components/PageShell'
import PageHeader from '../components/PageHeader'
import CtaBand from '../components/CtaBand'
import { ConversationConnections } from '../components/tours/PageTours'
import { motion } from 'framer-motion'
import { BookIcon, ClockIcon } from '../components/icons/LineIcons'
import { Reveal, SectionHeading } from '../components/blocks'
import { LEARNER_SIGNUP_URL, PARTNER_FIND_URL, PARTNER_SHARE_URL } from '../content/site'

// For You · Conversation Partners, per Website Copy v7 (section 05).

const BUTTON =
  'inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(30,120,190,0.3)] transition-transform hover:scale-105'
const BUTTON_BG = { background: 'linear-gradient(90deg, #1ba3e0, #3ec6ff)' }

function NativeSpeakers() {
  return (
    <div className="mb-20 sm:mb-28">
      <div id="for-native-speakers" className="relative -top-24" aria-hidden="true" />
      <SectionHeading
        eyebrow="For native speakers"
        title="Share the language you already speak, on your terms."
        line="Someone is studying for years to speak the language you grew up with. Nothing to teach and nothing to prepare. Talk the way you always talk."
      />
      <div className="mx-auto mt-12 grid max-w-4xl items-center gap-8 md:grid-cols-[1.2fr_1fr]">
        <Reveal from="left">
          <div className="grid grid-cols-2 gap-4" aria-hidden="true">
            {/* A class: crossed out */}
            <div className="relative flex flex-col items-center justify-center gap-3 rounded-3xl bg-white p-6 opacity-70 shadow-[0_12px_34px_rgba(11,53,84,0.06)]">
              <BookIcon className="h-10 w-10 text-navy-700/40" />
              <span className="h-2 w-20 rounded-full bg-navy-900/10" />
              <span className="h-2 w-14 rounded-full bg-navy-900/10" />
              <ClockIcon className="h-8 w-8 text-navy-700/30" />
              <motion.span
                className="absolute inset-0 m-auto flex h-14 w-14 items-center justify-center rounded-full bg-rose-500 text-3xl font-bold text-white shadow-lg"
                initial={{ scale: 0, rotate: -30 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.45, delay: 0.4 }}
              >
                ×
              </motion.span>
            </div>
            {/* A conversation */}
            <div className="flex flex-col justify-center gap-2.5 rounded-3xl bg-gradient-to-br from-[#e6f6fd] to-[#f1edff] p-5 shadow-[inset_0_0_0_2px_#1ba3e0]">
              {[
                ['self-start bg-white text-navy-950', '👋'],
                ['self-end bg-brand-blue text-white', '😄'],
                ['self-start bg-white text-navy-950', '☕'],
              ].map(([c, e], i) => (
                <motion.span
                  key={i}
                  className={`flex h-10 w-24 items-center justify-center rounded-2xl text-xl shadow-sm ${c}`}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.4, delay: 0.6 + i * 0.35 }}
                >
                  {e}
                </motion.span>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="text-center md:text-left" from="right">
          <h3 className="!text-3xl font-extrabold !leading-tight tracking-tight text-navy-950 sm:!text-4xl">A conversation, not a class.</h3>
          <p className="mt-4 text-xl leading-relaxed text-navy-700/75">Your language, your subjects, your opinions. No lesson plan, no grammar drills, no fixed hours.</p>
        </Reveal>
      </div>
    </div>
  )
}

export default function ForYou() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Conversation Partners"
        title={
          <>
            The language you already speak helps <span className="text-gradient-brand">someone else grow.</span>
          </>
        }
        description="You do not need to be a teacher. Just talk."
        actions={[
          { label: 'Find Your Conversation Partner', to: '#for-learners' },
          { label: 'Share Your Language', to: '#for-native-speakers' },
        ]}
        image={{ src: '/photos/cafe-conversation.jpg', alt: 'An older woman smiling in conversation over coffee' }}
      />

      {/* Brief 2, item 30: the native-speaker section moved up and merged with
          the shared-interest examples into one section; its idea is shown
          (a class vs a conversation) rather than read. Cards 2-3, the closing
          line and the Share button were deleted. */}
      <ConversationConnections id="for-learners" intro={<NativeSpeakers />} />

      <div className="pt-8" />
      <CtaBand primary={{ label: 'Start Your Journey', to: LEARNER_SIGNUP_URL }} />
    </PageShell>
  )
}
