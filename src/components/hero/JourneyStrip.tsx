import { useCallback, useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'

// Journey strip beneath the hero — ported from Riley's supplied design
// (~/Desktop/journey-strip.html). Five clickable steps on a line with a
// travelling dot, a detail card with a pointer, and an animated preview per
// step. The tour auto-plays once when 60% visible (3.8s per step), with
// Play / Pause / Resume / Replay; pauses when the tab is hidden. CSS is the
// source's, scoped to #learning-journey (site font, light theme only).

const SECONDS = 3.8

const COPY: [string, string][] = [
  ['Start with what makes you, you.', 'Your goals, interests, and starting point. A journey that begins with your life.'],
  ['A clear next step. Made for you.', 'Turn your goals into a path you can follow, one useful step at a time.'],
  ['Learn something you’ll actually use.', 'Build useful words and phrases, then practise saying them out loud.'],
  ['Turn practice into a real connection.', 'Put your words to work with people. Listen, respond, and find your flow.'],
  ['See how far your voice can take you.', 'Celebrate what you can do now, and discover what to try next.'],
]
const LABELS = ['Your profile', 'Your path', 'Your lessons', 'Your conversations', 'Your progress']

const CSS = `
#learning-journey{--j-blue:#129bdc;--j-panel:#fff;--j-ink:#152b46;--j-muted:#637b92;--j-line:#deebf5;--j-soft:#e9f6fe;color:var(--j-ink);padding:30px 0 0;--j-speed:650ms;width:100%}
#learning-journey *{box-sizing:border-box}
#learning-journey .j-wrap{max-width:1120px;margin:auto}
#learning-journey .j-top{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-bottom:26px}
#learning-journey .j-kicker{font-size:10px;font-weight:700;letter-spacing:2px;color:var(--j-blue);margin:0 0 7px}
#learning-journey h2{font-size:23px;line-height:1.2;letter-spacing:-.7px;margin:0;font-weight:700;color:var(--j-ink)}
#learning-journey button{font-family:inherit;cursor:pointer}
#learning-journey .j-play{color:var(--j-muted);background:transparent;border:0;font-size:11px;padding:10px 0 10px 10px;min-height:44px;white-space:nowrap}
#learning-journey button:focus-visible{outline:2px solid var(--j-blue);outline-offset:5px}
#learning-journey .j-road{position:relative}
#learning-journey .j-line{height:2px;background:var(--j-line);position:absolute;top:23px;left:10%;right:10%;pointer-events:none}
#learning-journey .j-fill{position:absolute;inset:0 auto 0 0;width:var(--j-position);background:var(--j-blue);transition:width var(--j-speed) ease}
#learning-journey .j-traveler{position:absolute;width:8px;height:8px;top:-3px;left:var(--j-position);transform:translateX(-50%);border-radius:50%;background:var(--j-blue);box-shadow:0 0 0 5px color-mix(in srgb,var(--j-blue) 12%,transparent);transition:left var(--j-speed) ease}
#learning-journey .j-steps{padding:0;margin:0;list-style:none;display:grid;grid-template-columns:repeat(5,minmax(0,1fr));position:relative}
#learning-journey .j-step{border:0;background:transparent;color:var(--j-muted);padding:0 3px 17px;display:flex;flex-direction:column;align-items:center;gap:13px;width:100%;min-height:98px;transition:color .3s}
#learning-journey .j-number{display:grid;place-items:center;width:46px;height:46px;border-radius:50%;background:var(--j-panel);border:1px solid var(--j-line);font-size:14px;font-weight:600;transition:transform .45s,background .4s,box-shadow .4s,color .4s;position:relative}
#learning-journey .j-step[aria-pressed="true"]{color:var(--j-ink)}
#learning-journey .j-step[aria-pressed="true"] .j-number{background:var(--j-blue);color:#fff;border-color:transparent;box-shadow:0 0 0 6px color-mix(in srgb,var(--j-blue) 11%,transparent);transform:translateY(-3px)}
#learning-journey .j-step.j-past .j-number{background:var(--j-soft);color:var(--j-blue);border-color:transparent}
#learning-journey .j-label{font-size:12px;font-weight:600;line-height:1.35;text-align:center}
#learning-journey .j-detail{position:relative;background:var(--j-panel);border-radius:17px;box-shadow:0 7px 25px #10395706;padding:21px 24px;display:grid;grid-template-columns:1.1fr 1fr;gap:20px;align-items:center;min-height:132px;border:1px solid var(--j-line)}
#learning-journey .j-detail:before{content:'';width:10px;height:10px;position:absolute;top:-6px;left:calc(10% + var(--j-position) * .8);background:var(--j-panel);border-left:1px solid var(--j-line);border-top:1px solid var(--j-line);transform:translateX(-50%) rotate(45deg);transition:left var(--j-speed) ease}
#learning-journey .j-detail h3{font-size:18px;line-height:1.25;letter-spacing:-.4px;font-weight:700;margin:0 0 7px;color:var(--j-ink)}
#learning-journey .j-detail p{font-size:12px;line-height:1.6;color:var(--j-muted);margin:0;max-width:340px}
#learning-journey .j-preview{min-height:80px;display:flex;justify-content:center;align-items:center;min-width:0}
#learning-journey .j-mini{display:flex;align-items:center;justify-content:center;gap:7px;flex-wrap:wrap;width:100%}
#learning-journey .j-chip{background:var(--j-soft);color:var(--j-ink);padding:9px 11px;border-radius:9px;font-size:11px;line-height:1.2;white-space:nowrap}
#learning-journey .j-chip.j-em{background:var(--j-blue);color:#fff}
#learning-journey .j-mini[data-kind="profile"]{max-width:235px}
#learning-journey .j-mini[data-kind="path"]{gap:4px}
#learning-journey .j-arrow{color:var(--j-blue);font-size:14px}
#learning-journey .j-word{text-align:center;transform:rotate(-4deg);padding:11px 19px;border:1px solid var(--j-line);border-radius:10px;box-shadow:4px 4px 0 var(--j-soft)}
#learning-journey .j-word strong{display:block;font-size:20px;font-weight:600;letter-spacing:-.6px}
#learning-journey .j-word small{font-size:11px;color:var(--j-muted);display:block;margin-top:4px}
#learning-journey .j-practice{display:flex;gap:3px;height:36px;align-items:center;margin:0 6px;color:var(--j-blue)}
#learning-journey .j-practice span{width:3px;background:currentColor;border-radius:3px;height:var(--h)}
#learning-journey .j-chat{display:flex;flex-direction:column;align-items:flex-start;gap:7px;width:215px}
#learning-journey .j-chat .j-chip{border-radius:10px 10px 10px 2px}
#learning-journey .j-chat .j-em{align-self:flex-end;border-radius:10px 10px 2px 10px}
#learning-journey .j-wins{display:flex;flex-direction:column;gap:7px}
#learning-journey .j-win{font-size:11px;color:var(--j-ink)}
#learning-journey .j-win span{color:var(--j-blue);margin-right:7px}
#learning-journey .j-caption{font-size:10px;color:var(--j-muted);text-align:center;margin:14px 0 0}
#learning-journey .j-enter{animation:j-rise .5s ease both}
#learning-journey .j-enter .j-item{animation:j-pop .65s cubic-bezier(.2,.7,.2,1) both;animation-delay:var(--delay,0ms)}
#learning-journey .j-enter .j-practice span{animation:j-wave .8s ease 2;animation-delay:var(--delay,0ms);transform-origin:center}
@keyframes j-rise{from{transform:translateY(8px);opacity:.5}to{transform:translateY(0);opacity:1}}
@keyframes j-pop{from{transform:translateY(9px) scale(.9);opacity:0}to{transform:translateY(0) scale(1);opacity:1}}
@keyframes j-wave{50%{transform:scaleY(.35)}}
#learning-journey[data-paused="true"] .j-enter,#learning-journey[data-paused="true"] .j-item,#learning-journey[data-paused="true"] .j-practice span{animation-play-state:paused}
@media(min-width:950px){#learning-journey .j-step{flex-direction:row;justify-content:center;gap:10px;background:var(--j-panel);border:1px solid var(--j-line);border-radius:40px;padding:10px;min-height:58px;width:max-content;max-width:100%;margin:auto}#learning-journey .j-number{width:29px;height:29px;border:0;background:var(--j-soft);font-size:12px}#learning-journey .j-step[aria-pressed="true"]{box-shadow:0 5px 20px #159ade14;border-color:var(--j-blue)}#learning-journey .j-step[aria-pressed="true"] .j-number{transform:none;box-shadow:none}#learning-journey .j-line{top:28px}#learning-journey .j-label{font-size:13px}#learning-journey .j-detail{margin-top:21px;min-height:118px}#learning-journey .j-top{margin-bottom:24px}}
@media(max-width:540px){#learning-journey .j-top{align-items:flex-start;gap:5px;margin-bottom:23px}#learning-journey h2{font-size:22px;max-width:195px}#learning-journey .j-steps{grid-template-columns:1fr;gap:12px}#learning-journey .j-step{flex-direction:row;gap:14px;min-height:44px;padding:0;align-items:center;text-align:left}#learning-journey .j-number{width:38px;height:38px;flex-shrink:0}#learning-journey .j-label{font-size:13px}#learning-journey .j-step[aria-pressed="true"] .j-number{transform:none;box-shadow:0 0 0 4px color-mix(in srgb,var(--j-blue) 10%,transparent)}#learning-journey .j-line{top:22px;bottom:22px;left:18px;right:auto;width:2px;height:auto}#learning-journey .j-fill{width:2px;height:var(--j-position);transition:height var(--j-speed) ease}#learning-journey .j-traveler{left:1px;top:var(--j-position);transition:top var(--j-speed) ease;transform:translate(-50%,-50%)}#learning-journey .j-detail{margin-top:23px;padding:20px;grid-template-columns:1fr;gap:16px;min-height:222px}#learning-journey .j-detail:before{display:none}#learning-journey .j-preview{min-height:72px}}
@media(prefers-reduced-motion:reduce){#learning-journey *,#learning-journey *:before{animation:none!important;transition:none!important}}
`

const d = (ms: number) => ({ '--delay': `${ms}ms` }) as CSSProperties
const h = (px: number, ms = 0) => ({ '--h': `${px}px`, '--delay': `${ms}ms` }) as CSSProperties

function Preview({ step }: { step: number }) {
  switch (step) {
    case 0:
      return (
        <>
          <span className="j-chip j-item">Spanish</span>
          <span className="j-chip j-em j-item" style={d(120)}>Travel</span>
          <span className="j-chip j-item" style={d(240)}>Food &amp; culture</span>
          <span className="j-chip j-item" style={d(360)}>Starting fresh</span>
        </>
      )
    case 1:
      return (
        <>
          <span className="j-chip j-item">Your goal</span>
          <span className="j-arrow j-item" style={d(150)}>→</span>
          <span className="j-chip j-em j-item" style={d(300)}>Your next step</span>
        </>
      )
    case 2:
      return (
        <>
          <div className="j-word j-item">
            <strong lang="es">¡Hola!</strong>
            <small>Hello!</small>
          </div>
          <div className="j-practice" aria-hidden="true">
            <span style={h(12)} />
            <span style={h(24, 100)} />
            <span style={h(34, 200)} />
            <span style={h(20, 300)} />
            <span style={h(29, 400)} />
            <span style={h(12, 500)} />
          </div>
          <span className="j-chip j-item" style={d(300)}>Say it out loud</span>
        </>
      )
    case 3:
      return (
        <div className="j-chat">
          <span className="j-chip j-item" lang="es">¿Qué te gusta hacer?</span>
          <span className="j-chip j-em j-item" style={d(650)} lang="es">¡Me encanta viajar!</span>
        </div>
      )
    default:
      return (
        <div className="j-wins">
          <div className="j-win j-item"><span>✓</span>Introduce yourself</div>
          <div className="j-win j-item" style={d(200)}><span>✓</span>Keep a conversation going</div>
          <div className="j-win j-item" style={d(400)}><span>↗</span>Find your next challenge</div>
        </div>
      )
  }
}

const KINDS = ['profile', 'path', 'lessons', 'conversations', 'progress']

export default function JourneyStrip() {
  const rootRef = useRef<HTMLElement>(null)
  const timer = useRef<number | undefined>(undefined)
  const currentRef = useRef(0)
  const interacted = useRef(false)
  const [current, setCurrent] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [paused, setPaused] = useState(false)
  // Bumped on every step change that should replay the enter animation.
  const [animKey, setAnimKey] = useState(0)
  const [animate, setAnimate] = useState(false)
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const go = useCallback(
    (i: number, withAnim = true) => {
      currentRef.current = i
      setCurrent(i)
      setPaused(false)
      setAnimate(withAnim && !reduced)
      setAnimKey((k) => k + 1)
    },
    [reduced],
  )

  const stop = useCallback(() => {
    window.clearTimeout(timer.current)
    setPlaying(false)
  }, [])

  const tick = useCallback(() => {
    if (currentRef.current < 4) {
      go(currentRef.current + 1)
      timer.current = window.setTimeout(tick, SECONDS * 1000)
    } else {
      setPlaying(false)
    }
  }, [go])

  const play = useCallback(() => {
    window.clearTimeout(timer.current)
    go(currentRef.current === 4 ? 0 : currentRef.current)
    setPlaying(true)
    timer.current = window.setTimeout(tick, SECONDS * 1000)
  }, [go, tick])

  // Auto-play once when 60% visible, unless the visitor already interacted.
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
      { threshold: 0.6 },
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

  const onPlayButton = () => {
    interacted.current = true
    if (reduced) {
      stop()
      go((currentRef.current + 1) % 5, false)
    } else if (playing) {
      stop()
      setPaused(true)
    } else play()
  }

  const playLabel = reduced
    ? 'Next step →'
    : playing
      ? 'Pause tour Ⅱ'
      : current === 4
        ? 'Replay tour ↻'
        : current === 0
          ? 'Play tour ▷'
          : 'Resume tour ▷'

  return (
    <section
      id="learning-journey"
      ref={rootRef}
      aria-label="Your language learning journey"
      data-paused={paused ? 'true' : 'false'}
      style={{ '--j-position': `${current * 25}%` } as CSSProperties}
    >
      <style>{CSS}</style>
      <div className="j-wrap">
        <div className="j-top">
          <div>
            <p className="j-kicker">YOUR JOURNEY, MADE PERSONAL</p>
            <h2>From “where do I start?” to “I’ve got this.”</h2>
          </div>
          <button className="j-play" type="button" onClick={onPlayButton}>
            {playLabel}
          </button>
        </div>
        <div className="j-road">
          <div className="j-line" aria-hidden="true">
            <div className="j-fill" />
            <div className="j-traveler" />
          </div>
          <ol className="j-steps">
            {LABELS.map((label, i) => (
              <li key={label}>
                <button
                  className={`j-step${i < current ? ' j-past' : ''}`}
                  type="button"
                  aria-pressed={i === current}
                  aria-controls="journey-detail"
                  onClick={() => {
                    interacted.current = true
                    stop()
                    go(i)
                  }}
                >
                  <span className="j-number">{i + 1}</span>
                  <span className="j-label">{label}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
        <div className="j-detail" id="journey-detail">
          <div className="j-description" aria-live="polite">
            <h3>{COPY[current][0]}</h3>
            <p>{COPY[current][1]}</p>
          </div>
          <div className="j-preview" aria-label="Illustrative journey preview">
            <div key={animKey} className={`j-mini${animate ? ' j-enter' : ''}`} data-kind={KINDS[current]}>
              <Preview step={current} />
            </div>
          </div>
        </div>
        <p className="j-caption">Explore any step. It all starts with you.</p>
      </div>
    </section>
  )
}
