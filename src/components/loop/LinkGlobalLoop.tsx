import { useEffect, useRef, useState } from 'react'

// "The LinkGlobal Loop": a pinned circle diagram whose arc draws itself (and
// whose orbiting dot travels) as the visitor scrolls through the section,
// with the Before / During / After copy highlighting in sync. The SVG uses a
// square viewBox rendered square, so circles stay circles.
// Revision brief 2 (item 21): Before / During / After are buttons, so a
// visitor can jump to any phase (it scrolls to that point of the loop, which
// keeps the circle in sync) or keep scrolling through it naturally. The dot
// pulses continuously so the circle is always alive.

const NODES = [
  { label: 'AI analyzes', angle: -90 },
  { label: 'Educator briefed', angle: 30 },
  { label: 'You converse', angle: 150 },
]

const PHASES = [
  {
    kicker: 'Before',
    copy: 'The AI briefs your educator on where you hesitate.',
  },
  {
    kicker: 'During',
    copy: 'The lesson starts at your level. No time spent on assessment.',
  },
  {
    kicker: 'After',
    copy: 'Your path updates before the next session.',
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
  const [reached, setReached] = useState(1)

  // Scroll to the middle of a phase's share of the pinned section.
  const jumpTo = (i: number) => {
    const section = sectionRef.current
    if (!section) return
    const travel = section.offsetHeight - window.innerHeight
    const top = section.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: top + travel * ((i + 0.5) / 3) })
  }

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
      // Nodes light up once the orbiting dot has actually reached them.
      const hit = p >= 0.999 ? 3 : 1 + Math.floor(p * 3 + 0.02)
      setReached((prev) => (prev === hit ? prev : hit))
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

  return (
    <>
    {/* Soft hand-in from the light hero above. */}
    <div
      className="pointer-events-none relative -mt-16 h-56"
      style={{ background: 'linear-gradient(180deg, rgba(248,251,255,0) 0%, #d6e8f8 22%, #8fb6dc 45%, #3a6698 68%, #14325a 86%, #081b33 100%)' }}
      aria-hidden="true"
    />
    <section ref={sectionRef} className="relative h-[220vh]" style={{ background: '#081b33' }}>
      <div className="sticky top-0 flex min-h-screen items-center overflow-hidden px-6 py-8 md:py-16">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-16">
          <div className="text-center md:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-cyan">The Loop</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              Every session moves the path forward.
            </h2>
          </div>

          <div className="mx-auto w-full max-w-[250px] sm:max-w-[380px]">
            <svg viewBox="0 0 320 320" className="h-auto w-full overflow-visible" role="img" aria-label="The LinkGlobal Loop: AI analyzes, educator briefed, you converse">
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
                const on = i < reached
                const top = n.angle === -90
                // Side labels sit below and outward so they never cross the ring.
                const labelX = top ? x : x + (x > 160 ? 22 : -22)
                const labelY = top ? y - 20 : y + 40
                return (
                  <g key={n.label}>
                    <circle cx={x} cy={y} r={on ? 11 : 8} fill={on ? '#3ec6ff' : '#0e2a4d'} stroke="#3ec6ff" strokeWidth="2" style={{ transition: 'r 0.4s, fill 0.4s' }} />
                    <text
                      x={labelX}
                      y={labelY}
                      textAnchor="middle"
                      className={`text-[15px] font-semibold ${on ? 'fill-white' : 'fill-white/50'}`}
                      style={{ transition: 'fill 0.4s' }}
                    >
                      {n.label}
                    </text>
                  </g>
                )
              })}

              <g ref={dotRef} transform={`translate(${point(-90).x} ${point(-90).y})`}>
                <circle r="14" fill="rgba(62,198,255,0.25)">
                  <animate attributeName="r" values="12;20;12" dur="1.8s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.9;0.3;0.9" dur="1.8s" repeatCount="indefinite" />
                </circle>
                <circle r="5" fill="#ffffff" />
              </g>
            </svg>
          </div>

          <ol className="mx-auto w-full max-w-md divide-y divide-white/10 border-y border-white/10">
            {PHASES.map((ph, i) => {
              const on = i === phase
              return (
                <li key={ph.kicker}>
                  <button
                    type="button"
                    onClick={() => jumpTo(i)}
                    aria-current={on ? 'step' : undefined}
                    className="relative block w-full py-4 pl-5 text-left transition-opacity duration-500 hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-cyan md:py-5"
                    style={{ opacity: on ? 1 : 0.45 }}
                  >
                    <span
                      className="absolute bottom-5 left-0 top-5 w-0.5 origin-top rounded-full bg-brand-cyan transition-transform duration-500"
                      style={{ transform: `scaleY(${on ? 1 : 0})` }}
                    />
                    <span className="flex items-center justify-between gap-3">
                      <span className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-cyan">{ph.kicker}</span>
                      {!on && <span className="text-sm text-white/60" aria-hidden="true">Open →</span>}
                    </span>
                    <span className={`mt-2 block text-lg leading-relaxed text-white sm:text-xl ${on ? '' : 'hidden md:block'}`}>{ph.copy}</span>
                  </button>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
    {/* Soft hand-off into the light journey section below, instead of a hard slide-like edge. */}
    <div className="pointer-events-none h-40" style={{ background: 'linear-gradient(180deg, #081b33 0%, #14325a 14%, #3a6698 32%, #8fb6dc 55%, #d6e8f8 78%, #f8fbff 100%)' }} aria-hidden="true" />
    </>
  )
}
