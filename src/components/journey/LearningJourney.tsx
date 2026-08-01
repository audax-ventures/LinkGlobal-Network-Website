import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ensureGsapPlugins, ScrollTrigger } from '../../lib/gsapSetup'

interface Milestone {
  title: string
  description: string
  side: 'left' | 'right'
  /** Only steps 1–4 get a filler photo opposite their text card. */
  photo?: { src: string; alt: string }
}

const MILESTONES: Milestone[] = [
  {
    title: 'Choose Your Language',
    description:
      'Explore 40+ languages and pick the one that fits where you’re headed — a new job, a big trip, or reconnecting with family.',
    side: 'right',
    photo: { src: '/photos/journey-1.jpg', alt: 'Learner studying with headphones at home' },
  },
  {
    title: 'Take Our Onboarding Test',
    description:
      'A quick, guided placement assessment figures out exactly where you’re starting from, so your path is tailored from day one.',
    side: 'left',
    photo: { src: '/photos/journey-2.jpg', alt: 'Group of learners studying together around a laptop' },
  },
  {
    title: 'Start Learning',
    description:
      'Bite-sized lessons built around how busy people actually learn, fitting into the pockets of time you already have.',
    side: 'right',
    photo: { src: '/photos/journey-3.jpg', alt: 'Learner relaxing at home while studying on a laptop' },
  },
  {
    title: 'Connect with Real Tutors',
    description:
      'Practice live with native speakers who adapt to your goals and pace — not just an app quizzing you on flashcards.',
    side: 'left',
    photo: { src: '/photos/journey-4.jpg', alt: 'Learner waving during a video call with a tutor' },
  },
  {
    title: 'Expand Your Capabilities',
    description:
      'Track fluency milestones as you hit them, and unlock new opportunities at work, while traveling, or at home.',
    side: 'right',
    photo: { src: '/photos/hero-learner.jpg', alt: 'Learner confidently using the LinkGlobal Network platform' },
  },
]

// Path drawn in a 100 (wide) x 500 (tall) local coordinate space, positioned
// via a narrow centered column. Non-uniform stretch to the actual container
// is a deliberate, acceptable trade-off for a decorative scroll-driven line.
const PATH_D =
  'M50,0 C50,25 65,25 65,50 C65,100 35,100 35,150 C35,200 65,200 65,250 C65,300 35,300 35,350 C35,400 65,400 65,450 C65,475 50,475 50,500'

const FALLBACK_LINE_TOP = 360
const GAP_BELOW_HEADER = 32
const GAP_BETWEEN_STEPS = 56
const BOTTOM_PADDING = 100
const MIN_ROW_HEIGHT = 200
const FALLBACK_ROW_HEIGHT = 280

export default function LearningJourney() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const nodeRefs = useRef<(SVGCircleElement | null)[]>([])
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const photoRefs = useRef<(HTMLImageElement | null)[]>([])

  const [lineTop, setLineTop] = useState(FALLBACK_LINE_TOP)
  const [centers, setCenters] = useState<number[]>(() =>
    MILESTONES.map((_, i) => FALLBACK_ROW_HEIGHT * (i + 0.5)),
  )
  const [containerHeight, setContainerHeight] = useState(FALLBACK_ROW_HEIGHT * MILESTONES.length)

  // Measures the header's real height (so the line starts below it) and each
  // step card/photo's real height (so rows are spaced by actual content, not
  // a guessed percentage) — the root cause of two earlier overlap bugs was
  // guessing a total height instead of deriving it from what's really there.
  useLayoutEffect(() => {
    const header = headerRef.current
    if (!header) return

    const measure = () => {
      const sectionTop = sectionRef.current?.getBoundingClientRect().top ?? 0
      const headerBottom = header.getBoundingClientRect().bottom
      setLineTop(Math.round(headerBottom - sectionTop + GAP_BELOW_HEADER))

      let cumulativeTop = 0
      const nextCenters: number[] = []
      MILESTONES.forEach((m, i) => {
        const cardHeight = cardRefs.current[i]?.getBoundingClientRect().height ?? 0
        const photoHeight = m.photo ? (photoRefs.current[i]?.getBoundingClientRect().height ?? 0) : 0
        const rowHeight = Math.max(cardHeight, photoHeight, MIN_ROW_HEIGHT)
        nextCenters.push(cumulativeTop + rowHeight / 2)
        cumulativeTop += rowHeight + GAP_BETWEEN_STEPS
      })
      setCenters(nextCenters)
      setContainerHeight(Math.round(cumulativeTop - GAP_BETWEEN_STEPS + BOTTOM_PADDING))
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(header)
    cardRefs.current.forEach((el) => el && observer.observe(el))
    photoRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    ensureGsapPlugins()
    const section = sectionRef.current
    const path = pathRef.current
    if (!section || !path) return

    const length = path.getTotalLength()
    path.style.strokeDasharray = `${length}`
    path.style.strokeDashoffset = `${length}`

    const totalHeight = lineTop + containerHeight
    // Each milestone's fraction of the *whole* section (header included),
    // matching what ScrollTrigger's own progress (start 'top top' / end
    // 'bottom bottom' of the full section) means at that scroll position.
    const fractions = centers.map((c) => (totalHeight > 0 ? (lineTop + c) / totalHeight : 0))

    fractions.forEach((f, i) => {
      const node = nodeRefs.current[i]
      if (!node) return
      const pt = path.getPointAtLength(f * length)
      node.setAttribute('cx', `${pt.x}`)
      node.setAttribute('cy', `${pt.y}`)
    })

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

        fractions.forEach((f, i) => {
          const node = nodeRefs.current[i]
          const active = progress >= f - 0.02
          if (node) {
            node.style.fill = active ? '#1ba3e0' : 'rgba(19,41,82,0.15)'
            node.style.filter = active ? 'drop-shadow(0 0 5px rgba(27,163,224,0.55))' : 'none'
          }
        })
      },
    })

    return () => trigger.kill()
  }, [centers, containerHeight, lineTop])

  return (
    <section ref={sectionRef} className="relative" style={{ height: `${lineTop + containerHeight}px` }}>
      <div className="relative h-full">
        <div className="pt-16 sm:pt-24 text-center px-6">
          <div
            ref={headerRef}
            className="mx-auto max-w-2xl rounded-3xl border border-navy-900/10 bg-white/70 px-6 py-8 sm:px-10 sm:py-10 backdrop-blur-sm shadow-[0_20px_60px_rgba(19,41,82,0.08)]"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-navy-700/60">The Journey</span>
            <h2 className="mt-2 text-4xl sm:text-6xl font-extrabold tracking-tight text-brand-blue">
              Your Path to Fluency
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base sm:text-lg text-navy-700/80">
              Five steps from your first lesson to real conversations with native speakers — here&rsquo;s
              exactly how it works.
            </p>
          </div>
        </div>

        {/* Offset below the header so the animated line starts underneath the
            title block instead of running behind it — measured from the
            header box's real rendered height, not a guessed pixel value. */}
        <div className="absolute inset-x-0 bottom-0" style={{ top: `${lineTop}px` }}>
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
                  cy={0}
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
              className={`absolute w-[48%] sm:w-[38%] px-4 ${
                m.side === 'right' ? 'left-[52%] sm:left-[56%] text-left' : 'right-[52%] sm:right-[56%] text-right'
              }`}
              style={{ top: `${centers[i]}px`, transform: 'translateY(-50%)' }}
            >
              <div
                ref={(el) => {
                  cardRefs.current[i] = el
                }}
                className="rounded-2xl border border-navy-900/10 bg-white/70 backdrop-blur-sm px-5 py-5 sm:px-6 sm:py-6 shadow-[0_8px_28px_rgba(19,41,82,0.08)]"
              >
                <span className="mb-2 inline-block rounded-full border border-navy-900/10 bg-navy-900/[0.03] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-navy-700/70">
                  Step {i + 1}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-navy-950 leading-snug">{m.title}</h3>
                <p className="mt-2 text-sm sm:text-base text-navy-700/75 leading-relaxed">{m.description}</p>
              </div>
            </div>
          ))}

          {/* Each step with a photo gets it filling the empty space on the
              opposite side of the line from its text card. */}
          {MILESTONES.map((m, i) => {
            if (!m.photo) return null
            return (
              <div
                key={`photo-${m.title}`}
                className={`hidden md:block absolute w-[26%] ${
                  m.side === 'right' ? 'right-[58%]' : 'left-[58%]'
                }`}
                style={{ top: `${centers[i]}px`, transform: 'translateY(-50%)' }}
              >
                <img
                  ref={(el) => {
                    photoRefs.current[i] = el
                  }}
                  src={m.photo.src}
                  alt={m.photo.alt}
                  className="aspect-[4/3] w-full rounded-2xl object-cover shadow-[0_12px_32px_rgba(19,41,82,0.12)]"
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
