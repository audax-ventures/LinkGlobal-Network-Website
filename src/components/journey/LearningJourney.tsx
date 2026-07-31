import { useEffect, useRef } from 'react'
import { ensureGsapPlugins, ScrollTrigger } from '../../lib/gsapSetup'

interface Milestone {
  title: string
  description: string
  side: 'left' | 'right'
  /** Position along the path, 0–1 */
  progress: number
}

// Spread across 0.2–0.85 — leaves clear room at the top for the title block
// and at the bottom for breathing space.
const MILESTONES: Milestone[] = [
  {
    title: 'Choose Your Language',
    description:
      'Explore 40+ languages and pick the one that fits where you’re headed — a new job, a big trip, or reconnecting with family.',
    side: 'right',
    progress: 0.2,
  },
  {
    title: 'Take Our Onboarding Test',
    description:
      'A quick, guided placement assessment figures out exactly where you’re starting from, so your path is tailored from day one.',
    side: 'left',
    progress: 0.3625,
  },
  {
    title: 'Start Learning',
    description:
      'Bite-sized lessons built around how busy people actually learn, fitting into the pockets of time you already have.',
    side: 'right',
    progress: 0.525,
  },
  {
    title: 'Connect with Real Tutors',
    description:
      'Practice live with native speakers who adapt to your goals and pace — not just an app quizzing you on flashcards.',
    side: 'left',
    progress: 0.6875,
  },
  {
    title: 'Expand Your Capabilities',
    description:
      'Track fluency milestones as you hit them, and unlock new opportunities at work, while traveling, or at home.',
    side: 'right',
    progress: 0.85,
  },
]

// Path drawn in a 100 (wide) x 500 (tall) local coordinate space, positioned
// via a narrow centered column so it maps roughly to the milestones' 0.2–0.85
// progress spread. Non-uniform stretch to the actual container is a
// deliberate, acceptable trade-off for a decorative scroll-driven line.
const PATH_D =
  'M50,0 C50,25 65,25 65,50 C65,100 35,100 35,150 C35,200 65,200 65,250 C65,300 35,300 35,350 C35,400 65,400 65,450 C65,475 50,475 50,500'

export default function LearningJourney() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const nodeRefs = useRef<(SVGCircleElement | null)[]>([])

  useEffect(() => {
    ensureGsapPlugins()
    const section = sectionRef.current
    const path = pathRef.current
    if (!section || !path) return

    const length = path.getTotalLength()
    path.style.strokeDasharray = `${length}`
    path.style.strokeDashoffset = `${length}`

    // Only the connecting line (and the nodes strung along it) animate with
    // scroll — the step text is always visible, not gated behind scrolling.
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.4,
      onUpdate: (self) => {
        const progress = self.progress
        path.style.strokeDashoffset = `${length * (1 - progress)}`

        MILESTONES.forEach((m, i) => {
          const node = nodeRefs.current[i]
          const active = progress >= m.progress - 0.02
          if (node) {
            node.style.fill = active ? '#1ba3e0' : 'rgba(19,41,82,0.15)'
            node.style.filter = active ? 'drop-shadow(0 0 5px rgba(27,163,224,0.55))' : 'none'
          }
        })
      },
    })

    return () => trigger.kill()
  }, [])

  return (
    <section ref={sectionRef} className="relative h-[150vh] sm:h-[165vh]">
      <div className="relative h-full">
        <div className="absolute left-1/2 top-10 -translate-x-1/2 text-center px-6">
          <span className="text-xs uppercase tracking-[0.3em] text-navy-700/60">The Journey</span>
          <h2 className="mt-1.5 text-2xl sm:text-3xl font-bold text-navy-950">Your Path to Fluency</h2>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 w-[110px] sm:w-[150px] h-full">
          <svg viewBox="0 0 100 500" preserveAspectRatio="none" className="h-full w-full">
            <path d={PATH_D} fill="none" stroke="rgba(19,41,82,0.14)" strokeWidth={2.5} />
            <path
              ref={pathRef}
              d={PATH_D}
              fill="none"
              stroke="url(#journey-gradient)"
              strokeWidth={2.5}
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="journey-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#132952" />
                <stop offset="100%" stopColor="#1ba3e0" />
              </linearGradient>
            </defs>
            {MILESTONES.map((m, i) => (
              <circle
                key={m.title}
                ref={(el) => {
                  nodeRefs.current[i] = el
                }}
                cx={m.side === 'right' ? 65 : 35}
                cy={m.progress * 500}
                r={5}
                fill="rgba(19,41,82,0.15)"
                stroke="#f8fbff"
                strokeWidth={1.5}
              />
            ))}
          </svg>
        </div>

        {MILESTONES.map((m, i) => (
          <div
            key={m.title}
            className={`absolute w-[48%] sm:w-[40%] px-4 ${
              m.side === 'right' ? 'left-[52%] sm:left-[54%] text-left' : 'right-[52%] sm:right-[54%] text-right'
            }`}
            style={{ top: `${m.progress * 100}%`, transform: 'translateY(-50%)' }}
          >
            <span className="mb-2 inline-block rounded-full border border-navy-900/10 bg-navy-900/[0.03] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-navy-700/70">
              Step {i + 1}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-navy-950 leading-snug">{m.title}</h3>
            <p className="mt-2 text-sm sm:text-base text-navy-700/75 leading-relaxed">{m.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
