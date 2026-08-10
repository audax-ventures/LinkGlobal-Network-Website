import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { ensureGsapPlugins, ScrollTrigger } from '../../lib/gsapSetup'
import { CheckIcon, GlobeIcon, ClipboardIcon, GraduationCapIcon, UsersIcon, RocketIcon } from '../icons/LineIcons'

interface Milestone {
  title: string
  description: string
  side: 'left' | 'right'
  icon: ReactNode
  photo: { src: string; alt: string; rotate: string }
  overlay: ReactNode
}

const MILESTONES: Milestone[] = [
  {
    title: 'Choose Your Language',
    description:
      'Explore 40+ languages and pick the one that fits where you’re headed — a new job, a big trip, or reconnecting with family.',
    side: 'right',
    icon: <GlobeIcon className="h-full w-full" />,
    photo: { src: '/photos/journey-1.jpg', alt: 'Learner studying with headphones at home', rotate: '-rotate-2' },
    overlay: (
      <div className="flex flex-col gap-1.5 text-xs">
        <div className="flex items-center gap-1.5">
          <span>🇪🇸</span>
          <span className="font-semibold text-navy-950">Spanish</span>
          <CheckIcon className="ml-auto h-3 w-3 text-emerald-500" />
        </div>
        <div className="flex items-center gap-1.5 text-navy-700/50">
          <span>🇫🇷</span>
          <span>French</span>
        </div>
        <div className="flex items-center gap-1.5 text-navy-700/50">
          <span>🇯🇵</span>
          <span>Japanese</span>
        </div>
      </div>
    ),
  },
  {
    title: 'Take Our Onboarding Test',
    description:
      'A quick, guided placement assessment figures out exactly where you’re starting from, so your path is tailored from day one.',
    side: 'left',
    icon: <ClipboardIcon className="h-full w-full" />,
    photo: { src: '/photos/journey-2.jpg', alt: 'Group of learners studying together around a laptop', rotate: 'rotate-2' },
    overlay: (
      <div className="text-xs">
        <p className="text-navy-700/50">Your Level</p>
        <p className="font-bold text-navy-950">Intermediate</p>
        <div className="mt-1.5 h-1.5 w-28 rounded-full bg-navy-900/10">
          <div className="h-full w-[72%] rounded-full bg-brand-blue" />
        </div>
      </div>
    ),
  },
  {
    title: 'Start Learning',
    description:
      'Bite-sized lessons built around how busy people actually learn, fitting into the pockets of time you already have.',
    side: 'right',
    icon: <GraduationCapIcon className="h-full w-full" />,
    photo: { src: '/photos/journey-3.jpg', alt: 'Learner relaxing at home while studying on a laptop', rotate: '-rotate-2' },
    overlay: (
      <div className="text-xs">
        <div className="flex items-center justify-between gap-3">
          <p className="text-navy-700/50">Today&rsquo;s Lesson</p>
          <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-brand-blue text-white">
            <CheckIcon className="h-2 w-2" />
          </span>
        </div>
        <p className="font-bold text-navy-950">Daily Conversations</p>
        <div className="mt-1 flex items-center justify-between text-[10px] text-navy-700/50">
          <span>Lesson 8</span>
          <span>85%</span>
        </div>
      </div>
    ),
  },
  {
    title: 'Connect with Real Tutors',
    description:
      'Practice live with native speakers who adapt to your goals and pace — not just an app quizzing you on flashcards.',
    side: 'left',
    icon: <UsersIcon className="h-full w-full" />,
    photo: { src: '/photos/journey-4.jpg', alt: 'Learner waving during a video call with a tutor', rotate: 'rotate-2' },
    overlay: (
      <div className="flex items-center gap-1 text-xs font-bold text-navy-950">
        <span>5.0</span>
        <span className="text-amber-400">★★★★★</span>
      </div>
    ),
  },
  {
    title: 'Expand Your Capabilities',
    description:
      'Track fluency milestones as you hit them, and unlock new opportunities at work, while traveling, or at home.',
    side: 'right',
    icon: <RocketIcon className="h-full w-full" />,
    photo: { src: '/photos/journey-5.jpg', alt: 'Two friends chatting confidently while traveling', rotate: '-rotate-2' },
    overlay: (
      <div className="flex items-center gap-2 text-xs">
        <span className="text-lg">🏅</span>
        <div>
          <p className="text-navy-700/50">New Achievement</p>
          <p className="font-bold text-navy-950">Fluent Speaker</p>
        </div>
      </div>
    ),
  },
]

// Path drawn in a 100 (wide) x 500 (tall) local coordinate space, positioned
// via a narrow centered column. Non-uniform stretch to the actual container
// is a deliberate, acceptable trade-off for a decorative scroll-driven line.
const PATH_D =
  'M50,0 C50,25 65,25 65,50 C65,100 35,100 35,150 C35,200 65,200 65,250 C65,300 35,300 35,350 C35,400 65,400 65,450 C65,475 50,475 50,500'

const FALLBACK_LINE_TOP = 360
const GAP_BELOW_HEADER = 24
const GAP_BETWEEN_STEPS = 36
const BOTTOM_PADDING = 32
const MIN_ROW_HEIGHT = 170
const FALLBACK_ROW_HEIGHT = 240

export default function LearningJourney() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const glowPathRef = useRef<SVGPathElement>(null)
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([])
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const photoRefs = useRef<(HTMLImageElement | null)[]>([])

  const [lineTop, setLineTop] = useState(FALLBACK_LINE_TOP)
  const [centers, setCenters] = useState<number[]>(() =>
    MILESTONES.map((_, i) => FALLBACK_ROW_HEIGHT * (i + 0.5)),
  )
  const [containerHeight, setContainerHeight] = useState(FALLBACK_ROW_HEIGHT * MILESTONES.length)
  const [lineHeight, setLineHeight] = useState(FALLBACK_ROW_HEIGHT * MILESTONES.length)

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
      // The line itself should stop exactly at the last step's row (card or
      // photo, whichever is taller) — BOTTOM_PADDING is scroll/layout
      // breathing room after that, not something the drawn line should
      // visually run through.
      setLineHeight(Math.round(cumulativeTop - GAP_BETWEEN_STEPS))
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
    const glowPath = glowPathRef.current
    if (!section || !path) return

    const length = path.getTotalLength()
    path.style.strokeDasharray = `${length}`
    path.style.strokeDashoffset = `${length}`
    if (glowPath) {
      glowPath.style.strokeDasharray = `${length}`
      glowPath.style.strokeDashoffset = `${length}`
    }

    // Two different fractions, deliberately: the path is only drawn to
    // lineHeight tall (stops at step 5), so a dot's position along it is a
    // fraction of *that*. But "has the user scrolled this far" compares
    // against self.progress, which spans the whole section (header +
    // BOTTOM_PADDING included) — a fraction of containerHeight instead.
    const pathFractions = centers.map((c) => (lineHeight > 0 ? c / lineHeight : 0))
    const totalHeight = lineTop + containerHeight
    const scrollFractions = centers.map((c) => (totalHeight > 0 ? (lineTop + c) / totalHeight : 0))

    // Nodes are plain HTML circles positioned by percentage (left/top),
    // deliberately NOT drawn inside the SVG — that viewBox is stretched
    // non-uniformly to fit its container (fine for the decorative line
    // itself, which is meant to look like a loose squiggle either way,
    // but a <circle> living in that same distorted space renders as an
    // ellipse, not a circle). Percentage positioning on an HTML element
    // resolves against the container's real, undistorted box.
    pathFractions.forEach((f, i) => {
      const node = nodeRefs.current[i]
      if (!node) return
      const pt = path.getPointAtLength(f * length)
      node.style.left = `${pt.x}%`
      node.style.top = `${(pt.y / 500) * 100}%`
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
        if (glowPath) glowPath.style.strokeDashoffset = `${length * (1 - progress)}`

        scrollFractions.forEach((f, i) => {
          const node = nodeRefs.current[i]
          if (!node) return
          const active = progress >= f - 0.02
          node.style.borderColor = active ? '#1ba3e0' : 'rgba(19,41,82,0.2)'
          node.style.color = active ? '#1ba3e0' : 'rgba(19,41,82,0.35)'
          node.style.boxShadow = active ? '0 0 0 4px rgba(27,163,224,0.18), 0 2px 8px rgba(19,41,82,0.15)' : '0 2px 8px rgba(19,41,82,0.15)'
        })
      },
    })

    return () => trigger.kill()
  }, [centers, containerHeight, lineHeight, lineTop])

  return (
    <section ref={sectionRef} className="relative overflow-hidden" style={{ height: `${lineTop + containerHeight}px` }}>
      {/* Faint decorative dots, matching the reference's ambient scatter. */}
      <div className="pointer-events-none absolute left-[8%] top-[6%] h-2 w-2 rounded-full bg-brand-blue/30" aria-hidden="true" />
      <div className="pointer-events-none absolute left-[14%] top-[10%] h-1.5 w-1.5 rounded-full bg-brand-blue/20" aria-hidden="true" />
      <svg
        className="pointer-events-none absolute right-[10%] top-[4%] h-10 w-10 text-brand-blue/50"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 3 3 10.5l7 2.5 2.5 7L21 3Z" />
        <path d="M12.5 13 21 3" />
      </svg>

      <div className="relative h-full">
        <div className="pt-10 sm:pt-14 text-center px-6">
          <div ref={headerRef} className="mx-auto max-w-2xl rounded-3xl bg-white px-6 py-8 sm:px-10 sm:py-10 shadow-[0_20px_60px_rgba(19,41,82,0.1)]">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-blue/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-brand-blue">
              Our Journey
            </span>
            <h2 className="mt-3 text-4xl sm:text-6xl font-extrabold tracking-tight text-navy-950">
              Your Path to <span className="text-brand-blue">Fluency</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base sm:text-lg text-navy-700/80">
              From first lesson to real conversations with native speakers, we guide your journey
              every step of the way.
            </p>
          </div>
        </div>

        {/* Offset below the header so the animated line starts underneath the
            title block instead of running behind it — measured from the
            header box's real rendered height, not a guessed pixel value. */}
        <div className="absolute inset-x-0 bottom-0" style={{ top: `${lineTop}px` }}>
          <div
            className="absolute left-1/2 -translate-x-1/2 w-[110px] sm:w-[150px]"
            style={{ height: `${lineHeight}px` }}
          >
            <svg viewBox="0 0 100 500" preserveAspectRatio="none" className="h-full w-full overflow-visible">
              <path d={PATH_D} fill="none" stroke="rgba(19,41,82,0.12)" strokeWidth={3} />
              <path
                ref={glowPathRef}
                d={PATH_D}
                fill="none"
                stroke="#3ec6ff"
                strokeWidth={7}
                strokeLinecap="round"
                opacity={0.35}
                style={{ filter: 'blur(3px)' }}
              />
              <path
                ref={pathRef}
                d={PATH_D}
                fill="none"
                stroke="url(#journey-gradient)"
                strokeWidth={3}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="journey-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8fe0ff" />
                  <stop offset="100%" stopColor="#1ba3e0" />
                </linearGradient>
              </defs>
            </svg>

            {/* Plain HTML circles, not SVG — see the effect above for why. */}
            {MILESTONES.map((m, i) => (
              <div
                key={m.title}
                ref={(el) => {
                  nodeRefs.current[i] = el
                }}
                className="absolute z-10 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-xs font-extrabold"
                style={{ border: '2px solid rgba(19,41,82,0.2)', color: 'rgba(19,41,82,0.35)', boxShadow: '0 2px 8px rgba(19,41,82,0.15)' }}
              >
                {i + 1}
              </div>
            ))}
          </div>

          {MILESTONES.map((m, i) => (
            <div
              key={m.title}
              className={`absolute w-[48%] sm:w-[38%] px-4 text-left ${
                m.side === 'right' ? 'left-[52%] sm:left-[56%]' : 'right-[52%] sm:right-[56%]'
              }`}
              style={{ top: `${centers[i]}px`, transform: 'translateY(-50%)' }}
            >
              <div
                ref={(el) => {
                  cardRefs.current[i] = el
                }}
                className="relative rounded-2xl bg-white px-5 py-5 sm:px-6 sm:py-6 shadow-[0_15px_40px_rgba(19,41,82,0.1)]"
              >
                <span className="inline-block rounded-full bg-brand-blue/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-blue">
                  Step {i + 1}
                </span>
                <div className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue sm:right-6 sm:top-6">
                  <span className="h-5 w-5">{m.icon}</span>
                </div>
                <h3 className="mt-3 max-w-[calc(100%-56px)] text-xl sm:text-2xl font-bold text-navy-950 leading-snug">
                  {m.title}
                </h3>
                <p className="mt-2 text-sm sm:text-base text-navy-700/75 leading-relaxed">{m.description}</p>
              </div>
            </div>
          ))}

          {/* Each step's photo fills the empty space on the opposite side of
              the line from its text card, framed like a floating print with
              a small contextual UI chip overlapping its bottom edge. */}
          {MILESTONES.map((m, i) => (
            <div
              key={`photo-${m.title}`}
              className={`hidden md:block absolute w-[26%] ${m.side === 'right' ? 'right-[58%]' : 'left-[58%]'}`}
              style={{ top: `${centers[i]}px`, transform: 'translateY(-50%)' }}
            >
              <div className={`rounded-2xl bg-white p-2 shadow-[0_20px_50px_rgba(19,41,82,0.15)] ${m.photo.rotate}`}>
                <img
                  ref={(el) => {
                    photoRefs.current[i] = el
                  }}
                  src={m.photo.src}
                  alt={m.photo.alt}
                  className="aspect-[3/2] w-full rounded-xl object-cover"
                />
              </div>
              <div
                className={`absolute -bottom-4 rounded-xl bg-white px-3 py-2.5 shadow-[0_10px_25px_rgba(19,41,82,0.18)] ${
                  m.side === 'right' ? 'left-3' : 'right-3'
                }`}
              >
                {m.overlay}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
