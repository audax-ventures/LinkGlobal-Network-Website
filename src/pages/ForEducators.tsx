import PageShell from '../components/PageShell'
import NavyBand from '../components/NavyBand'
import PageHeader from '../components/PageHeader'
import CtaBand from '../components/CtaBand'
import { TeachingWithLinkGlobal } from '../components/tours/PageTours'
import SmartLink from '../components/SmartLink'
import FeatureRows, { CardLabel } from '../components/FeatureRows'
import type { FeatureRow } from '../components/FeatureRows'
import { CardRow, Reveal, Section, SectionHeading } from '../components/blocks'
import { EDUCATOR_SIGNUP_URL, PENDING } from '../content/site'
import { CalendarIcon, ClipboardIcon, RocketIcon } from '../components/icons/LineIcons'
import Photo from '../components/Photo'

// For Educators, per Website Copy v7 (section 04).

const BRIEFING = [
  { k: 'Mastered', v: 'Introductions, describing experience', c: 'text-emerald-600' },
  { k: 'Still avoiding', v: 'Salary questions, being interrupted', c: 'text-amber-600' },
  { k: 'Focus today', v: 'Mock interview, follow-up questions', c: 'text-brand-blue' },
]

// Revision brief 2, items 28-29: bigger cards and type, more colour (within
// the brand palette: blue, violet, amber, teal), and FeatureRows slides each
// card in from the side.
function CardHeader({ icon: Icon, label, from, to }: { icon: typeof ClipboardIcon; label: string; from: string; to: string }) {
  return (
    <div className="-mx-7 -mt-7 mb-6 flex items-center gap-3 px-7 py-5 text-white sm:-mx-8 sm:-mt-8 sm:px-8" style={{ background: `linear-gradient(120deg, ${from}, ${to})` }}>
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20" aria-hidden="true">
        <Icon className="h-6 w-6" />
      </span>
      <span className="text-lg font-bold">{label}</span>
    </div>
  )
}

const DASHBOARD: FeatureRow[] = [
  {
    title: 'Session briefing',
    line: 'The learner’s progress and focus areas, ready before you meet.',
    visual: (
      <div>
        <CardHeader icon={ClipboardIcon} label="Session briefing" from="#1ba3e0" to="#a78bfa" />
        <dl className="space-y-4 text-lg">
          {[
            ['Level', 'B1', 'bg-[#a78bfa]/15 text-[#7c5cd6]'],
            ['Goal', 'Job interview in English', 'bg-brand-blue/15 text-brand-blue'],
            ['Focus', 'Follow-up questions', 'bg-[#f5a623]/15 text-[#c27f0c]'],
          ].map(([k, v, c]) => (
            <div key={k} className="flex items-center justify-between gap-4">
              <dt className={`rounded-full px-3 py-1 text-sm font-bold ${c}`}>{k}</dt>
              <dd className="text-right font-semibold text-navy-950">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    ),
  },
  {
    title: 'Your schedule',
    line: 'Sessions arranged around your availability.',
    visual: (
      <div>
        <CardHeader icon={CalendarIcon} label="Your availability" from="#2dd4bf" to="#1ba3e0" />
        <div className="grid grid-cols-7 gap-2 text-center text-sm font-bold text-navy-700/60">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
            <span key={i}>{d}</span>
          ))}
          {[1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0].map((on, i) => (
            <span key={i} className={`h-9 rounded-lg ${on ? (i % 3 === 0 ? 'bg-[#2dd4bf]' : 'bg-brand-blue') : 'bg-navy-900/[0.05]'}`} />
          ))}
        </div>
      </div>
    ),
  },
  {
    title: 'Learner progress',
    line: 'How each learner has developed across sessions.',
    visual: (
      <div className="text-lg">
        <CardHeader icon={RocketIcon} label="Across 12 sessions" from="#f5a623" to="#f472b6" />
        <div className="space-y-5">
          {[
            ['Fluency', 48, 74, '#1ba3e0'],
            ['Confidence', 35, 72, '#f472b6'],
          ].map(([k, from, to, color]) => (
            <div key={k as string}>
              <div className="flex justify-between text-navy-800">
                <span className="font-semibold">{k}</span>
                <span className="font-bold" style={{ color: color as string }}>
                  +{(to as number) - (from as number)}%
                </span>
              </div>
              <div className="relative mt-2 h-3 overflow-hidden rounded-full bg-navy-900/10">
                <div className="absolute inset-y-0 left-0 rounded-full bg-navy-900/20" style={{ width: `${from}%` }} />
                <div className="absolute inset-y-0 rounded-r-full" style={{ left: `${from}%`, width: `${(to as number) - (from as number)}%`, background: color as string }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
]

export default function ForEducators() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="For Educators"
        title={
          <>
            Spend the session teaching, <span className="text-gradient-brand">not preparing.</span>
          </>
        }
        description="Before each lesson you receive a briefing: what the learner has mastered, what they avoid, what to focus on."
        actions={[{ label: 'Start Teaching With Us', to: EDUCATOR_SIGNUP_URL }]}
        image={{ src: '/photos/educators-hero.jpg', alt: 'An educator reviewing a lesson plan before an online session' }}
      />

      <TeachingWithLinkGlobal />

      {/* Brief 2, item 26: headline higher and further in, a much bigger
          briefing card with the learner's photo, bigger learner text.
          Photo is a placeholder until the client's set arrives. */}
      <NavyBand className="py-10 sm:py-16">
        <div className="mx-auto grid max-w-6xl items-start gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-14">
          <Reveal className="md:pl-8 md:pt-4" from="left">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-cyan">The Loop, from your side</p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              You see where each learner stands, and what changed.
            </h2>
            <p className="mt-5 text-xl text-white/75">After the session, their path updates automatically.</p>
          </Reveal>
          <Reveal delay={0.1} from="right">
            <div className="rounded-[2rem] bg-white p-7 shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:p-9">
              <div className="flex items-center gap-4">
                <Photo src="/photos/hero-learner.jpg" sizes="80px" alt="" className="h-20 w-20 rounded-full object-cover object-top ring-4 ring-brand-blue/20" loading="lazy" />
                <div>
                  <p className="text-xl font-bold text-navy-950">Your learner</p>
                  <p className="text-base text-navy-700/65">B1 · Preparing for a job interview</p>
                </div>
              </div>
              <dl className="mt-7 space-y-5" aria-label="An educator briefing listing what the learner has mastered and still avoids">
                {BRIEFING.map((r) => (
                  <div key={r.k} className="border-t border-navy-900/10 pt-5">
                    <dt className={`text-base font-bold uppercase tracking-[0.15em] ${r.c}`}>{r.k}</dt>
                    <dd className="mt-1.5 text-xl text-navy-950">{r.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </NavyBand>

      <FeatureRows heading="Your dashboard" rows={DASHBOARD} />

      <div className="pt-12" />
      <CtaBand primary={{ label: 'Start Teaching With Us', to: EDUCATOR_SIGNUP_URL }} />
    </PageShell>
  )
}
