import { useEffect, useRef, useState } from 'react'

// "The LinkGlobal Loop": a pinned circle diagram whose arc draws itself (and
// whose orbiting dot travels) as the visitor scrolls through the section,
// with the Before / During / After copy highlighting in sync. The SVG uses a
// square viewBox rendered square, so circles stay circles.

const NODES = [
  { label: 'AI analyzes', angle: -90 },
  { label: 'Teacher briefed', angle: 30 },
  { label: 'You converse', angle: 150 },
]

const PHASES = [
  {
    kicker: 'Before your session',
    copy: 'The AI briefs your teacher on what you’ve mastered and what you’re still avoiding.',
    node: 1,
  },
  {
    kicker: 'During your session',
    copy: 'No diagnosis, no level-guessing. The conversation starts where you need it.',
    node: 2,
  },
  {
    kicker: 'After your session',
    copy: 'Everything that happened feeds back into your roadmap, which adjusts before your next lesson.',
    node: 0,
  },
]

const R = 120
const C = 2 * Math.PI * R
const point = (deg: number) => {
  const rad = (deg * Math.PI) / 180
  return { x: 160 + R * Math.cos(rad), y: 160 + R * Math.sin(rad) }
}

export default function LinkGlobalLoop() {
  const sectionRef = useRef<HTMLElement>(null)
  const arcRef = useRef<SVGCircleElement>(null)
  const dotRef = useRef<SVGGElement>(null)
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    let frame = 0
    const update = () => {
      frame = 0
      const rect = section.getBoundingClientRect()
      const travel = rect.height - window.innerHeight
      const p = travel > 0 ? Math.min(Math.max(-rect.top / travel, 0), 1) : 1
      if (arcRef.current) arcRef.current.style.strokeDashoffset = `${C * (1 - p)}`
      if (dotRef.current) {
        const { x, y } = point(-90 + p * 360)
        dotRef.current.setAttribute('transform', `translate(${x} ${y})`)
      }
      const next = Math.min(Math.floor(p * 3), 2)
      setPhase((prev) => (prev === next ? prev : next))
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  const activeNode = PHASES[phase].node

  return (
    <>
    <section ref={sectionRef} className="relative h-[260vh]" style={{ background: '#081b33' }}>
      <div className="sticky top-0 flex min-h-screen items-center overflow-hidden px-6 py-8 md:py-16">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-16">
          <div className="text-center md:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-cyan">How it works</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              Every session makes the next one better.
            </h2>
          </div>

          <div className="mx-auto w-full max-w-[220px] sm:max-w-[380px]">
            <svg viewBox="0 0 320 320" className="h-auto w-full overflow-visible" role="img" aria-label="The LinkGlobal Loop: AI analyzes, teacher briefed, you converse">
              <circle cx="160" cy="160" r={R} fill="none" stroke="rgba(62,198,255,0.18)" strokeWidth="2" />
              <circle
                ref={arcRef}
                cx="160"
                cy="160"
                r={R}
                fill="none"
                stroke="#3ec6ff"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray={C}
                strokeDashoffset={C}
                transform="rotate(-90 160 160)"
                style={{ filter: 'drop-shadow(0 0 6px rgba(62,198,255,0.6))' }}
              />
              <text x="160" y="154" textAnchor="middle" className="fill-white text-[20px] font-extrabold">
                The LinkGlobal
              </text>
              <text x="160" y="180" textAnchor="middle" className="fill-white text-[20px] font-extrabold">
                Loop
              </text>

              {NODES.map((n, i) => {
                const { x, y } = point(n.angle)
                const on = i === activeNode
                const labelY = n.angle === -90 ? y - 20 : y + 30
                return (
                  <g key={n.label}>
                    <circle cx={x} cy={y} r={on ? 11 : 8} fill={on ? '#3ec6ff' : '#0e2a4d'} stroke="#3ec6ff" strokeWidth="2" style={{ transition: 'r 0.4s, fill 0.4s' }} />
                    <text
                      x={x}
                      y={labelY}
                      textAnchor="middle"
                      className={`text-[13px] font-semibold ${on ? 'fill-white' : 'fill-white/50'}`}
                      style={{ transition: 'fill 0.4s' }}
                    >
                      {n.label}
                    </text>
                  </g>
                )
              })}

              <g ref={dotRef} transform={`translate(${point(-90).x} ${point(-90).y})`}>
                <circle r="14" fill="rgba(62,198,255,0.25)" />
                <circle r="5" fill="#ffffff" />
              </g>
            </svg>
          </div>

          <ol className="mx-auto w-full max-w-md divide-y divide-white/10 border-y border-white/10">
            {PHASES.map((ph, i) => {
              const on = i === phase
              return (
                <li key={ph.kicker} className="relative py-4 pl-5 md:py-5 transition-opacity duration-500" style={{ opacity: on ? 1 : 0.35 }}>
                  <span
                    className="absolute left-0 top-5 bottom-5 w-0.5 rounded-full bg-brand-cyan transition-transform duration-500 origin-top"
                    style={{ transform: `scaleY(${on ? 1 : 0})` }}
                  />
                  <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-brand-cyan">{ph.kicker}</p>
                  <p className={`mt-2 text-base leading-relaxed text-white sm:text-lg ${on ? '' : 'hidden md:block'}`}>{ph.copy}</p>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
    {/* Soft hand-off into the light journey section below, instead of a hard slide-like edge. */}
    <div className="pointer-events-none h-40" style={{ background: 'linear-gradient(180deg, #081b33 0%, #f8fbff 100%)' }} aria-hidden="true" />
    </>
  )
}
