import { useEffect, useRef } from 'react'
import { ensureGsapPlugins, gsap, ScrollTrigger } from '../../lib/gsapSetup'

interface Milestone {
  title: string
  description: string
  side: 'left' | 'right'
  /** Position along the path, 0–1 */
  progress: number
}

const MILESTONES: Milestone[] = [
  {
    title: 'Choose Your Language',
    description: 'Explore 40+ languages and pick the one that fits where you’re headed.',
    side: 'right',
    progress: 0.1,
  },
  {
    title: 'Take Our Onboarding Test',
    description: 'A quick placement assessment tailors your path from day one.',
    side: 'left',
    progress: 0.3,
  },
  {
    title: 'Start Learning',
    description: 'Bite-sized lessons built around how busy people actually learn.',
    side: 'right',
    progress: 0.5,
  },
  {
    title: 'Connect with Real Tutors',
    description: 'Practice live with native speakers — not just an app.',
    side: 'left',
    progress: 0.7,
  },
  {
    title: 'Expand Your Capabilities',
    description: 'Track fluency milestones and unlock new opportunities.',
    side: 'right',
    progress: 0.9,
  },
]

// Path drawn in a 100 (wide) x 500 (tall) local coordinate space, positioned
// via a narrow centered column so it maps roughly to the milestones' 0.1–0.9
// progress spread. Non-uniform stretch to the actual container is a
// deliberate, acceptable trade-off for a decorative scroll-driven line.
const PATH_D =
  'M50,0 C50,25 65,25 65,50 C65,100 35,100 35,150 C35,200 65,200 65,250 C65,300 35,300 35,350 C35,400 65,400 65,450 C65,475 50,475 50,500'

export default function LearningJourney() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const nodeRefs = useRef<(SVGCircleElement | null)[]>([])
  const labelRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    ensureGsapPlugins()
    const section = sectionRef.current
    const path = pathRef.current
    if (!section || !path) return

    const length = path.getTotalLength()
    path.style.strokeDasharray = `${length}`
    path.style.strokeDashoffset = `${length}`

    labelRefs.current.forEach((label) => {
      if (label) gsap.set(label, { opacity: 0, y: 24 })
    })

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
          const label = labelRefs.current[i]
          const active = progress >= m.progress - 0.02
          if (node) {
            node.style.fill = active ? '#3ec6ff' : 'rgba(143,224,255,0.15)'
            node.style.filter = active ? 'drop-shadow(0 0 8px rgba(62,198,255,0.9))' : 'none'
          }
          if (label) {
            gsap.to(label, { opacity: active ? 1 : 0, y: active ? 0 : 24, duration: 0.4, overwrite: 'auto' })
          }
        })
      },
    })

    return () => trigger.kill()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative h-[220vh] sm:h-[260vh]"
      style={{ background: 'linear-gradient(180deg, #0e1c3d 0%, #0a1128 50%, #030407 100%)' }}
    >
      <div className="relative h-full">
        <div className="absolute left-1/2 top-16 -translate-x-1/2 text-center px-6">
          <span className="text-xs uppercase tracking-[0.3em] text-brand-light/60">The Journey</span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-white">Your Path to Fluency</h2>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 w-[140px] sm:w-[180px] h-full">
          <svg viewBox="0 0 100 500" preserveAspectRatio="none" className="h-full w-full">
            <path d={PATH_D} fill="none" stroke="rgba(143,224,255,0.12)" strokeWidth={2.5} />
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
                <stop offset="100%" stopColor="#3ec6ff" />
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
                fill="rgba(143,224,255,0.15)"
                stroke="#0a1128"
                strokeWidth={1.5}
              />
            ))}
          </svg>
        </div>

        {MILESTONES.map((m, i) => (
          <div
            key={m.title}
            ref={(el) => {
              labelRefs.current[i] = el
            }}
            className={`absolute w-[46%] sm:w-[34%] px-4 ${
              m.side === 'right' ? 'left-[54%] sm:left-[58%] text-left' : 'right-[54%] sm:right-[58%] text-right'
            }`}
            style={{ top: `${m.progress * 100}%`, transform: 'translateY(-50%)' }}
          >
            <span className="mb-2 inline-block rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-light/70">
              Step {i + 1}
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white">{m.title}</h3>
            <p className="mt-1.5 text-sm text-white/60">{m.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
