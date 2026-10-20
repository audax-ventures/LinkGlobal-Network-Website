import type { ReactNode } from 'react'
import PageShell from './PageShell'

// Shared layout for the Privacy Policy and Terms of Service. Plain, readable
// long-form text: no animation, generous type, a contents list at the top.

export interface LegalSection {
  id: string
  title: string
  body: ReactNode
}

export default function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string
  updated: string
  intro: ReactNode
  sections: LegalSection[]
}) {
  return (
    <PageShell>
      <article className="px-6 pb-16 pt-32 sm:pb-24 sm:pt-40">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-blue">Legal</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-navy-950 sm:text-5xl">{title}</h1>
          <p className="mt-4 text-sm text-navy-700/60">Last updated: {updated}</p>
          <div className="mt-8 space-y-4 text-lg leading-relaxed text-navy-800">{intro}</div>

          <nav aria-label="Contents" className="mt-10 rounded-2xl bg-white p-6 shadow-[0_10px_30px_rgba(19,41,82,0.06)]">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-navy-700/60">Contents</p>
            <ol className="mt-3 grid gap-x-8 gap-y-1.5 text-base sm:grid-cols-2">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-brand-blue hover:underline">
                    {i + 1}. {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="mt-12 space-y-12">
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className="scroll-mt-28">
                <h2 className="text-2xl font-bold tracking-tight text-navy-950">
                  {i + 1}. {s.title}
                </h2>
                <div className="legal-body mt-4 space-y-4 text-lg leading-relaxed text-navy-800 [&_li]:ml-6 [&_li]:list-disc [&_li]:pl-1 [&_ul]:space-y-2">
                  {s.body}
                </div>
              </section>
            ))}
          </div>
        </div>
      </article>
    </PageShell>
  )
}
