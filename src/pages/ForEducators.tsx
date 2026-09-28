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

// For Educators, per Website Copy v7 (section 04).

const BRIEFING = [
  { k: 'Mastered', v: 'Introductions, describing experience', c: 'text-emerald-600' },
  { k: 'Still avoiding', v: 'Salary questions, being interrupted', c: 'text-amber-600' },
  { k: 'Focus today', v: 'Mock interview, follow-up questions', c: 'text-brand-blue' },
]

const DASHBOARD: FeatureRow[] = [
  {
    title: 'Session briefing',
    line: 'The learner’s progress and focus areas, ready before you meet.',
    visual: (
      <div>
        <CardLabel>Before your session</CardLabel>
        <dl className="mt-4 space-y-3 text-sm">
          {[
            ['Level', 'B1'],
            ['Goal', 'Job interview in English'],
            ['Focus', 'Follow-up questions'],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 border-b border-navy-900/5 pb-2 last:border-0">
              <dt className="text-navy-700/60">{k}</dt>
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
        <CardLabel>Your availability</CardLabel>
        <div className="mt-4 grid grid-cols-7 gap-1.5 text-center text-[10px] font-semibold text-navy-700/50">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
            <span key={i}>{d}</span>
          ))}
          {[1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0].map((on, i) => (
            <span key={i} className={`h-7 rounded-md ${on ? 'bg-brand-blue' : 'bg-navy-900/[0.05]'}`} />
          ))}
        </div>
      </div>
    ),
  },
  {
    title: 'Learner progress',
    line: 'How each learner has developed across sessions.',
    visual: (
      <div className="space-y-3 text-sm">
        <CardLabel>Across 12 sessions</CardLabel>
        {[
          ['Fluency', 48, 74],
          ['Confidence', 35, 72],
        ].map(([k, from, to]) => (
          <div key={k as string}>
            <div className="flex justify-between text-navy-700/70">
              <span>{k}</span>
              <span className="font-semibold text-brand-blue">+{(to as number) - (from as number)}%</span>
            </div>
            <div className="relative mt-1.5 h-2 overflow-hidden rounded-full bg-navy-900/10">
              <div className="absolute inset-y-0 left-0 rounded-full bg-navy-900/20" style={{ width: `${from}%` }} />
              <div className="absolute inset-y-0 rounded-r-full bg-brand-blue" style={{ left: `${from}%`, width: `${(to as number) - (from as number)}%` }} />
            </div>
          </div>
        ))}
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

      <NavyBand className="py-10 sm:py-16">
        <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2 md:gap-16">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-cyan">The Loop, from your side</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              You see where each learner stands, and what changed.
            </h2>
            <p className="mt-4 text-lg text-white/70">After the session, their path updates automatically.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-3xl bg-white p-6 shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-navy-700/60">Sample · Educator briefing</p>
              </div>
              <dl className="mt-5 space-y-4 text-sm" aria-label="An educator briefing listing what the learner has mastered and still avoids">
                {BRIEFING.map((r) => (
                  <div key={r.k}>
                    <dt className={`text-[11px] font-bold uppercase tracking-[0.2em] ${r.c}`}>{r.k}</dt>
                    <dd className="mt-1 text-navy-950">{r.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </NavyBand>

      <Section>
        <SectionHeading
          eyebrow="How we select educators"
          title="Selected for teaching ability, not only fluency."
          line="We look at how you explain, how you correct, and how you read cultural context."
        />
        <Reveal className="mx-auto mt-6 max-w-2xl text-center">
          {PENDING.educatorSelection && <p className="text-navy-700/75">{PENDING.educatorSelection}</p>}
          <SmartLink
            to={EDUCATOR_SIGNUP_URL}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-5 py-2.5 text-sm font-semibold text-emerald-700 transition-colors hover:bg-emerald-500/20"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500" /> Applications are open.
          </SmartLink>
        </Reveal>
      </Section>

      <FeatureRows heading="Your dashboard" rows={DASHBOARD} />

      <div className="pt-12" />
      <CtaBand
        title="Your fluency is already an asset."
        description="LinkGlobal connects it with the people who need it."
        primary={{ label: 'Start Teaching With Us', to: EDUCATOR_SIGNUP_URL }}
      />
    </PageShell>
  )
}
