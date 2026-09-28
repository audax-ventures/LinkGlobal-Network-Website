import { useCallback, useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'

// "Three parts, one system" — ported from Riley's supplied design
// (~/Desktop/three-parts-section.html). "You" at the top, branch lines that
// send a pulse to each part, three clickable cards with animated scenes, and
// an overview tour (2.55s per part, ending on all three together). Auto-plays
// once when 25% visible; Play / Pause / Replay; pauses when the tab is
// hidden. CSS is the source's, scoped to #linkglobal-system; it sits on the
// surrounding NavyBand and uses the site font.

const SECONDS = 2.55
const CAPTIONS = [
  'Your voice helps shape a plan that fits you.',
  'Your educator builds on that plan, with you.',
  'Real conversation gives what you learn a place to live.',
  'Three kinds of support. One learner at the center.',
]

const CSS = `
#linkglobal-system{--ls-blue:#35c7f7;--ls-bg:#071b30;--ls-panel:#102a40;--ls-line:#24445c;--ls-muted:#adc2d4;color:#f3f8fc;padding:8px 0 0;isolation:isolate;position:relative}#linkglobal-system *{box-sizing:border-box}#linkglobal-system:before{content:'';position:absolute;inset:0;z-index:-1;background:radial-gradient(ellipse at 50% 38%,#12446350,transparent 60%);border-radius:inherit}#linkglobal-system .ls-wrap{max-width:1100px;margin:auto}#linkglobal-system .ls-header{text-align:center;max-width:620px;margin:0 auto}#linkglobal-system .ls-eyebrow{color:var(--ls-blue);font-size:10px;letter-spacing:2.5px;font-weight:700;margin:0 0 14px}#linkglobal-system h2{font-size:38px;line-height:1.08;letter-spacing:-1.4px;font-weight:750;margin:0;color:#f3f8fc}#linkglobal-system h2 span{color:var(--ls-blue)}#linkglobal-system .ls-sub{font-size:13px;line-height:1.65;color:var(--ls-muted);margin:15px auto 0;max-width:460px}#linkglobal-system .ls-center{display:flex;justify-content:center;margin-top:26px}#linkglobal-system .ls-you{position:relative;z-index:2;display:flex;align-items:center;gap:12px;padding:11px 20px 11px 12px;border-radius:40px;background:#123049;border:1px solid #387491;box-shadow:0 0 0 6px #2ac7f508;transition:box-shadow .45s}#linkglobal-system .ls-monogram{width:34px;height:34px;display:grid;place-items:center;font-size:12px;font-weight:700;background:var(--ls-blue);color:#07243c;border-radius:50%}#linkglobal-system .ls-you strong{display:block;font-size:13px;font-weight:600}#linkglobal-system .ls-you small{display:block;margin-top:3px;font-size:10px;color:var(--ls-muted)}#linkglobal-system .ls-branches{display:block;width:100%;height:50px;overflow:visible}#linkglobal-system .ls-branches .ls-track{stroke:var(--ls-line);stroke-width:1;fill:none;vector-effect:non-scaling-stroke}#linkglobal-system .ls-branches .ls-pulse{stroke:var(--ls-blue);stroke-width:2;fill:none;vector-effect:non-scaling-stroke;stroke-dasharray:12 88;stroke-dashoffset:110;opacity:0}#linkglobal-system .ls-branches .ls-pulse.ls-flow{animation:ls-travel 1.275s ease both}@keyframes ls-travel{0%{stroke-dashoffset:110;opacity:0}15%{opacity:1}85%{opacity:1}100%{stroke-dashoffset:0;opacity:0}}#linkglobal-system .ls-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}#linkglobal-system .ls-part{background:var(--ls-panel);border:1px solid var(--ls-line);border-radius:17px;padding:20px 16px 18px;text-align:left;color:#f3f8fc;font-family:inherit;cursor:pointer;display:flex;flex-direction:column;min-width:0;width:100%;position:relative;transition:border-color .375s,transform .375s,box-shadow .375s}#linkglobal-system .ls-part[aria-pressed="true"],#linkglobal-system[data-together="true"] .ls-part{border-color:#35c7f77d;box-shadow:0 8px 30px #0002,inset 0 1px 0 #35c7f71a}#linkglobal-system .ls-part[aria-pressed="true"]{transform:translateY(-4px)}#linkglobal-system .ls-part:focus-visible,#linkglobal-system .ls-play:focus-visible{outline:2px solid var(--ls-blue);outline-offset:4px}#linkglobal-system .ls-cardtop{display:flex;justify-content:space-between;align-items:center;gap:7px;margin-bottom:12px}#linkglobal-system .ls-number{font-size:11px;color:var(--ls-blue);letter-spacing:1px}#linkglobal-system .ls-role{font-size:9px;letter-spacing:.8px;color:#9ebbd0}#linkglobal-system .ls-title{font-size:17px;font-weight:700;letter-spacing:-.3px;display:block;line-height:1.2;margin-bottom:8px}#linkglobal-system .ls-copy{font-size:11px;line-height:1.65;color:var(--ls-muted);display:block;min-height:55px}#linkglobal-system .ls-scene{margin-top:19px;padding-top:15px;border-top:1px solid var(--ls-line);height:105px;display:flex;justify-content:center;flex-direction:column;gap:8px;min-width:0}#linkglobal-system .ls-wave{display:flex;justify-content:center;align-items:center;height:32px;gap:4px;color:var(--ls-blue)}#linkglobal-system .ls-wave b{display:block;width:3px;height:var(--h);background:currentColor;border-radius:3px}#linkglobal-system .ls-focus{border-radius:7px;background:#193b52;padding:8px;font-size:10px;color:#c3eafb;line-height:1.3;text-align:center}#linkglobal-system .ls-brief{background:#19374d;padding:10px;border-radius:8px;font-size:10px;line-height:1.4}#linkglobal-system .ls-brief small{display:block;font-size:8px;letter-spacing:1px;color:#a6c5d9;margin-bottom:6px}#linkglobal-system .ls-brief span{display:block;color:#d6e9f5}#linkglobal-system .ls-brief em{font-size:9px;color:var(--ls-blue);font-style:normal;display:block;margin-top:6px}#linkglobal-system .ls-bubble{display:block;font-size:10px;padding:8px 10px;background:#224157;color:#eaf5fe;border-radius:9px 9px 9px 2px;align-self:flex-start;max-width:100%;line-height:1.3}#linkglobal-system .ls-bubble.ls-reply{background:var(--ls-blue);color:#06263b;align-self:flex-end;border-radius:9px 9px 2px 9px}#linkglobal-system .ls-on .ls-wave b{animation:ls-wave .525s ease 2;animation-delay:var(--delay,0ms)}#linkglobal-system .ls-on .ls-reveal{animation:ls-reveal .6s ease both;animation-delay:var(--delay,0ms)}@keyframes ls-wave{50%{transform:scaleY(.25)}}@keyframes ls-reveal{from{opacity:.25;transform:translateY(7px)}to{opacity:1;transform:translateY(0)}}#linkglobal-system .ls-explainer{display:flex;align-items:center;justify-content:space-between;gap:14px;min-height:55px;padding:12px 1px;margin-top:8px}#linkglobal-system .ls-status{font-size:11px;color:#b5d4e9;line-height:1.5;max-width:520px}#linkglobal-system .ls-play{font-size:11px;cursor:pointer;color:var(--ls-blue);background:transparent;border:0;min-height:44px;padding:10px 0 10px 8px;white-space:nowrap}#linkglobal-system .ls-footer{text-align:center;border-top:1px solid var(--ls-line);padding-top:20px;margin-top:1px}#linkglobal-system .ls-footer strong{font-size:16px;font-weight:600;line-height:1.5}#linkglobal-system .ls-footer span{color:var(--ls-blue)}#linkglobal-system .ls-footer p{font-size:11px;line-height:1.6;color:var(--ls-muted);margin:7px 0 0}#linkglobal-system[data-paused="true"] .ls-flow,#linkglobal-system[data-paused="true"] .ls-on *{animation-play-state:paused}#linkglobal-system[data-together="true"] .ls-you{box-shadow:0 0 0 7px #2ac7f514,0 0 30px #20bfff1c}@media(min-width:950px){#linkglobal-system h2{font-size:48px}#linkglobal-system .ls-grid{gap:20px}#linkglobal-system .ls-part{padding:24px}#linkglobal-system .ls-title{font-size:22px}#linkglobal-system .ls-copy{font-size:13px;min-height:65px}#linkglobal-system .ls-scene{height:120px}#linkglobal-system .ls-focus,#linkglobal-system .ls-brief,#linkglobal-system .ls-bubble{font-size:12px}#linkglobal-system .ls-sub{font-size:15px;max-width:570px}#linkglobal-system .ls-role{font-size:10px}}@media(max-width:560px){#linkglobal-system h2{font-size:33px}#linkglobal-system .ls-grid{grid-template-columns:1fr;gap:13px}#linkglobal-system .ls-branches{height:25px}#linkglobal-system .ls-branches path:not([data-mobile]){display:none}#linkglobal-system .ls-part{padding:18px 20px}#linkglobal-system .ls-copy{min-height:0;font-size:12px}#linkglobal-system .ls-title{font-size:20px}#linkglobal-system .ls-scene{height:90px;margin-top:14px;padding-top:12px}#linkglobal-system .ls-scene .ls-brief{max-width:260px;width:100%;margin:auto}#linkglobal-system .ls-scene .ls-focus{max-width:260px;width:100%;margin:auto}#linkglobal-system .ls-bubble{font-size:12px}#linkglobal-system .ls-part[aria-pressed="true"]{transform:none}#linkglobal-system .ls-explainer{align-items:flex-start}#linkglobal-system .ls-footer strong{font-size:15px}}@media(prefers-reduced-motion:reduce){#linkglobal-system *,#linkglobal-system *:before{animation:none!important;transition:none!important}}
`

const v = (vars: Record<string, string>) => vars as CSSProperties
const WAVE = [9, 20, 28, 16, 32, 22, 12, 26, 16, 8]
const BRANCHES = [
  { d: 'M500 0V12Q500 22 480 22H185Q167 22 167 36V50', mobile: false },
  { d: 'M500 0V50', mobile: true },
  { d: 'M500 0V12Q500 22 520 22H815Q833 22 833 36V50', mobile: false },
]

export default function ThreeParts() {
  const rootRef = useRef<HTMLElement>(null)
  const timer = useRef<number | undefined>(undefined)
  const activeRef = useRef(3)
  const interacted = useRef(false)
  const [active, setActive] = useState(3) // 3 = all three together
  const [playing, setPlaying] = useState(false)
  const [paused, setPaused] = useState(false)
  const [animate, setAnimate] = useState(false)
  const [nonce, setNonce] = useState(0) // remounts animated parts to replay them
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const go = useCallback(
    (i: number, withAnim = true) => {
      activeRef.current = i
      setActive(i)
      setPaused(false)
      setAnimate(withAnim && !reduced)
      setNonce((n) => n + 1)
    },
    [reduced],
  )

  const stop = useCallback(() => {
    window.clearTimeout(timer.current)
    setPlaying(false)
  }, [])

  const tick = useCallback(() => {
    if (activeRef.current < 3) {
      go(activeRef.current + 1)
      timer.current = window.setTimeout(tick, SECONDS * 1000)
    } else setPlaying(false)
  }, [go])

  const play = useCallback(() => {
    window.clearTimeout(timer.current)
    go(activeRef.current === 3 ? 0 : activeRef.current)
    setPlaying(true)
    timer.current = window.setTimeout(tick, SECONDS * 1000)
  }, [go, tick])

  useEffect(() => {
    if (reduced) return
    const el = rootRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          if (!interacted.current) play()
          observer.disconnect()
        }
      },
      { threshold: 0.25 },
    )
    observer.observe(el)
    const onVisibility = () => {
      if (document.hidden) {
        stop()
        setPaused(true)
      }
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      window.clearTimeout(timer.current)
    }
  }, [play, reduced, stop])

  const lit = (i: number) => animate && (active === 3 || active === i)
  const label = reduced ? 'Next part →' : playing ? 'Pause Ⅱ' : active === 3 ? 'Replay overview ↻' : 'Play overview ▷'

  const onControl = () => {
    interacted.current = true
    if (reduced) {
      stop()
      go((activeRef.current + 1) % 4, false)
    } else if (playing) {
      stop()
      setPaused(true)
    } else play()
  }

  const cards = [
    {
      aria: 'Explore personalization',
      n: '01',
      role: 'AI PERSONALIZES',
      title: 'A plan that listens.',
      copy: 'AI analyzes how you speak and shapes what comes next around you.',
      scene: (
        <>
          <span className="ls-wave" aria-hidden="true">
            {WAVE.map((px, i) => (
              <b key={i} style={v({ '--h': `${px}px`, '--delay': `${i * 53}ms` })} />
            ))}
          </span>
          <span className="ls-focus ls-reveal" style={v({ '--delay': '300ms' })}>
            Next focus: everyday phrases
          </span>
        </>
      ),
    },
    {
      aria: 'Explore teaching',
      n: '02',
      role: 'EDUCATORS TEACH',
      title: 'A teacher who’s ready.',
      copy: 'Certified educators arrive briefed on your plan, ready to help you move forward.',
      scene: (
        <span className="ls-brief ls-reveal">
          <small>YOUR EDUCATOR’S BRIEF</small>
          <span>Goal: feel at home abroad</span>
          <span>Focus: everyday phrases</span>
          <em className="ls-reveal" style={v({ '--delay': '262ms' })}>
            ✓ Ready for your lesson
          </em>
        </span>
      ),
    },
    {
      aria: 'Explore real conversation',
      n: '03',
      role: 'PEOPLE CONNECT',
      title: 'A reason to speak.',
      copy: 'Meet native speakers connected to your work, your city, and what you love.',
      scene: (
        <>
          <span className="ls-bubble ls-reveal" lang="es">
            ¿Conoces un buen café?
          </span>
          <span className="ls-bubble ls-reply ls-reveal" style={v({ '--delay': '450ms' })} lang="es">
            ¡Sí! Vamos juntos.
          </span>
        </>
      ),
    },
  ]

  return (
    <section
      id="linkglobal-system"
      ref={rootRef}
      aria-label="Three parts, one system"
      data-paused={paused ? 'true' : 'false'}
      data-together={active === 3 ? 'true' : 'false'}
    >
      <style>{CSS}</style>
      <div className="ls-wrap">
        <header className="ls-header">
          <p className="ls-eyebrow">THREE PARTS. ONE CONNECTED EXPERIENCE.</p>
          <h2>
            A plan that gets you.
            <br />
            People who <span>get you speaking.</span>
          </h2>
          <p className="ls-sub">
            Personalized by AI. Taught by educators. Brought to life in real conversation. All connected through LinkGlobal.
          </p>
        </header>
        <div className="ls-center">
          <div className="ls-you">
            <span className="ls-monogram">You</span>
            <div>
              <strong>At the heart of it all</strong>
              <small>Your goals. Your interests. Your voice.</small>
            </div>
          </div>
        </div>
        <svg className="ls-branches" viewBox="0 0 1000 50" preserveAspectRatio="none" aria-hidden="true">
          {BRANCHES.map((b, i) => (
            <path key={`t${i}`} className="ls-track" d={b.d} {...(b.mobile ? { 'data-mobile': 'true' } : {})} />
          ))}
          {BRANCHES.map((b, i) => (
            <path
              key={`p${i}-${nonce}`}
              className={`ls-pulse${lit(i) ? ' ls-flow' : ''}`}
              pathLength={100}
              d={b.d}
              {...(b.mobile ? { 'data-mobile': 'true' } : {})}
            />
          ))}
        </svg>
        <div className="ls-grid">
          {cards.map((c, i) => (
            <button
              key={c.n}
              className={`ls-part${lit(i) ? ' ls-on' : ''}`}
              type="button"
              aria-pressed={active === i}
              aria-label={c.aria}
              onClick={() => {
                interacted.current = true
                stop()
                go(i)
              }}
            >
              <span className="ls-cardtop">
                <span className="ls-number">{c.n}</span>
                <span className="ls-role">{c.role}</span>
              </span>
              <strong className="ls-title">{c.title}</strong>
              <span className="ls-copy">{c.copy}</span>
              <span key={nonce} className="ls-scene">
                {c.scene}
              </span>
            </button>
          ))}
        </div>
        <div className="ls-explainer">
          <span className="ls-status" aria-live="polite">
            {CAPTIONS[active]}
          </span>
          <button type="button" className="ls-play" onClick={onControl}>
            {label}
          </button>
        </div>
        <footer className="ls-footer">
          <strong>
            AI connects the dots. <span>People do the teaching.</span>
          </strong>
          <p>Your plan, your educator, and your conversations, all working toward the same goal.</p>
        </footer>
      </div>
    </section>
  )
}
