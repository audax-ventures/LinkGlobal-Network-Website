import { useCallback, useEffect, useRef, useState } from 'react'

// Personalized-paths tour ported from Riley's supplied design
// (~/Desktop/personalized-paths.html), plus the shared tour engine used by
// tours/PageTours. (The lessons and real-life-progress tours were deleted in
// revision brief 2, items 13 and 17.) They share the source's tour engine: auto-play
// once when 25% visible, 2.6s per step, Play / Pause / Replay, pause when the
// tab is hidden, reduced motion gets a "Next example" button. CSS is the
// source's (shared .lgx base + per-section rules), on the site background and
// font. House-style edits: "practise" as a verb, no em dashes.

const SECONDS = 2.62

export const BASE_CSS = `.lgx{--lg-blue:#119edb;--lg-ink:#10263f;--lg-muted:#60788f;--lg-bg:#f5f9fd;--lg-panel:#fff;--lg-soft:#e9f5fc;--lg-line:#dfebf3;--lg-green:#087d60;color:var(--lg-ink);padding:64px 24px;isolation:isolate}.lgx *{box-sizing:border-box}.lgx .lg-wrap{max-width:1060px;margin:auto}.lgx .lg-header{text-align:center;max-width:650px;margin:0 auto 27px}.lgx .lg-eyebrow{font-size:14px;font-weight:700;letter-spacing:2.1px;color:var(--lg-blue);margin:0 0 13px}.lgx h2{color:var(--lg-ink);font-weight:750;font-size:35px;letter-spacing:-1.2px;line-height:1.1;margin:0}.lgx h2 span{color:var(--lg-blue)}.lgx .lg-intro{color:var(--lg-muted);font-size:14px;line-height:1.65;margin:14px auto 0;max-width:440px}.lgx h3{font-size:22px;line-height:1.2;letter-spacing:-.6px;font-weight:700;margin:0;color:var(--lg-ink)}.lgx p{line-height:1.65}.lgx button{font-family:inherit;cursor:pointer}.lgx button:focus-visible{outline:2px solid var(--lg-blue);outline-offset:4px}.lgx .lg-play{background:none;border:0;color:var(--lg-blue);font-size:14px;min-height:44px;padding:11px 0 11px 10px;white-space:nowrap}.lgx .lg-bottom{display:flex;align-items:center;justify-content:space-between;gap:14px;margin-top:15px;min-height:44px}.lgx .lg-status{font-size:14px;color:var(--lg-muted);line-height:1.5}.lgx .lg-smallnote{font-size:14px;text-align:center;color:var(--lg-muted);margin:12px 0 0}.lgx .lg-enter{animation:lg-enter .45s ease both}.lgx .lg-enter .lg-animate{animation:lg-pop .488s ease both;animation-delay:var(--delay,0ms)}.lgx[data-paused="true"] .lg-enter,.lgx[data-paused="true"] .lg-animate{animation-play-state:paused}@keyframes lg-enter{from{transform:translateY(7px);opacity:.6}to{transform:translateY(0);opacity:1}}@keyframes lg-pop{from{transform:translateY(12px) scale(.96);opacity:0}to{transform:translateY(0) scale(1);opacity:1}}@media(min-width:950px){.lgx{padding:88px 24px}.lgx h2{font-size:46px}.lgx .lg-intro{font-size:18px;max-width:600px}}@media(max-width:540px){.lgx{padding:56px 16px}.lgx h2{font-size:31px}.lgx .lg-header{margin-bottom:23px}.lgx .lg-bottom{align-items:flex-start}}@media(prefers-reduced-motion:reduce){.lgx *,.lgx *:before,.lgx *:after{animation:none!important;transition:none!important;scroll-behavior:auto!important}}`

export function useTour(opts: { last: number; reducedInitial?: number; seconds?: number }) {
  const { last, reducedInitial } = opts
  const stepMs = (opts.seconds ?? SECONDS) * 1000
  const rootRef = useRef<HTMLElement>(null)
  const timer = useRef<number | undefined>(undefined)
  const indexRef = useRef(0)
  const interacted = useRef(false)
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const [index, setIndex] = useState(reduced ? (reducedInitial ?? 0) : 0)
  const [playing, setPlaying] = useState(false)
  const [paused, setPaused] = useState(false)
  const [animate, setAnimate] = useState(false)
  const [nonce, setNonce] = useState(0) // remount key to replay enter animations

  const show = useCallback(
    (i: number, withAnim = true) => {
      indexRef.current = i
      setIndex(i)
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
    if (indexRef.current < last) {
      show(indexRef.current + 1)
      timer.current = window.setTimeout(tick, stepMs)
    } else setPlaying(false)
  }, [last, show])
  const start = useCallback(() => {
    window.clearTimeout(timer.current)
    show(indexRef.current === last ? 0 : indexRef.current)
    setPlaying(true)
    timer.current = window.setTimeout(tick, stepMs)
  }, [last, show, tick])

  /** Jump to a step (card/choice click), optionally continuing the tour. */
  const go = useCallback(
    (i: number, autoplay = false, withAnim = true) => {
      interacted.current = true
      stop()
      show(i, withAnim)
      if (autoplay && !reduced) {
        setPlaying(true)
        timer.current = window.setTimeout(tick, stepMs)
      }
    },
    [reduced, show, stop, tick],
  )

  const onControl = () => {
    interacted.current = true
    if (reduced) {
      stop()
      show((indexRef.current + 1) % (last + 1), false)
    } else if (playing) {
      stop()
      setPaused(true)
    } else start()
  }

  useEffect(() => {
    if (reduced) return
    const el = rootRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          if (!interacted.current) start()
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
  }, [reduced, start, stop])

  const label = (playLabel: string) =>
    reduced ? 'Next example →' : playing ? 'Pause Ⅱ' : index === last ? 'Replay ↻' : playLabel

  return { rootRef, index, paused, animate, nonce, go, onControl, label }
}

/* ---------------- Personalized paths ---------------- */

const PATHS_CSS = `#lg-paths .pa-audiences{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin-bottom:20px}#lg-paths .pa-choice{background:var(--lg-panel);border:1px solid var(--lg-line);border-radius:13px;padding:16px 14px;text-align:left;color:var(--lg-ink);transition:background .225s,border-color .225s,transform .225s;min-width:0}#lg-paths .pa-choice strong{font-size:14px;line-height:1.3;display:block;margin-bottom:7px}#lg-paths .pa-choice span{font-size:14px;line-height:1.55;display:block;color:var(--lg-muted)}#lg-paths .pa-choice[aria-pressed="true"]{border-color:var(--lg-blue);background:#eaf7ff;transform:translateY(-3px)}#lg-paths .pa-detail{border-radius:20px;background:var(--lg-panel);padding:25px;display:grid;grid-template-columns:1fr 1fr;gap:27px;align-items:center;box-shadow:0 12px 35px #254e7608}#lg-paths .pa-label{font-size:14px;letter-spacing:1.4px;color:var(--lg-blue);margin-bottom:10px}#lg-paths .pa-title{font-size:24px;line-height:1.14;letter-spacing:-.7px;margin:0 0 18px}#lg-paths .pa-route{list-style:none;margin:0;padding:0;position:relative;display:grid;gap:17px}#lg-paths .pa-route:before{content:'';width:1px;background:var(--lg-line);position:absolute;top:15px;bottom:15px;left:12px}#lg-paths .pa-step{position:relative;display:flex;gap:10px;align-items:flex-start;color:var(--lg-muted);transition:color .3s}#lg-paths .pa-step i{font-size:14px;font-style:normal;display:grid;place-items:center;background:#eff5f9;width:25px;height:25px;border-radius:50%;color:var(--lg-muted);flex-shrink:0;transition:background .3s,color .3s,box-shadow .3s}#lg-paths .pa-step strong{font-size:14px;display:block;line-height:1.3;margin-bottom:3px}#lg-paths .pa-step span{font-size:14px;line-height:1.45;display:block}#lg-paths .pa-step.pa-active{color:var(--lg-ink)}#lg-paths .pa-step.pa-active i{background:var(--lg-blue);color:white;box-shadow:0 0 0 4px #159edb12}#lg-paths .pa-moment{background:#09273e;color:#edf8ff;padding:25px 20px;border-radius:16px;min-height:250px;display:flex;flex-direction:column;justify-content:space-between;position:relative;overflow:hidden}#lg-paths .pa-moment:before{content:'';position:absolute;width:180px;height:180px;right:-95px;top:-90px;border:1px solid #265b74;border-radius:50%;box-shadow:0 0 0 23px #265b741c,0 0 0 47px #265b7414}#lg-paths .pa-moment-top{font-size:14px;letter-spacing:1.6px;color:#77c8e9;position:relative}#lg-paths .pa-question{font-size:14px;line-height:1.5;color:#adcadd;margin:23px 0 10px}#lg-paths .pa-say{font-size:21px;line-height:1.3;letter-spacing:-.4px;color:white;font-weight:500;margin:0;min-height:83px;position:relative}#lg-paths .pa-moment-footer{font-size:14px;color:#8bd9f4;margin-top:20px}#lg-paths .pa-quality{border-top:1px solid var(--lg-line);padding-top:16px;margin:8px 0 0;text-align:center;font-size:14px;color:var(--lg-muted)}@media(max-width:540px){#lg-paths .pa-audiences{grid-template-columns:1fr;gap:8px}#lg-paths .pa-choice{padding:13px 15px}#lg-paths .pa-choice strong{font-size:14px;margin-bottom:4px}#lg-paths .pa-choice span{font-size:14px}#lg-paths .pa-choice[aria-pressed="true"]{transform:none}#lg-paths .pa-detail{grid-template-columns:1fr;padding:21px;gap:24px}#lg-paths .pa-moment{min-height:215px}#lg-paths .pa-title{font-size:25px}}`
const PATHS = [
  {
    name: 'Newcomers',
    blurb: 'Appointments, interviews, and everyday life.',
    title: 'Your first school meeting.',
    details: ['Questions about your child’s day.', 'Ask clearly. Understand the reply.', 'Talk about school and family life.'],
    question: 'When it’s your turn to ask…',
    quote: '“How can I support their learning at home?”',
  },
  {
    name: 'International students',
    blurb: 'Admissions, seminars, IELTS and TOEFL.',
    title: 'Your voice in the seminar.',
    details: ['The language of sharing an opinion.', 'Explain your point and build on it.', 'Exchange ideas with another speaker.'],
    question: 'When you have something to add…',
    quote: '“I see it differently. Here’s why.”',
  },
  {
    name: 'Professionals',
    blurb: 'Meetings, presentations, and client calls.',
    title: 'Your next client presentation.',
    details: ['The phrases your work calls for.', 'Make your point. Handle questions.', 'Discuss your work at a natural pace.'],
    question: 'When the room turns to you…',
    quote: '“Let me walk you through our thinking.”',
  },
]
const PATH_STEPS = ['Prepare the words', 'Practise with an educator', 'Bring it into conversation']
const PATH_CAPTIONS = [
  'Start with the language you’ll need.',
  'Work through the moment with an educator.',
  'Practise bringing those words into real conversation.',
]

export function PersonalizedPathsTour() {
  const t = useTour({ last: 2, reducedInitial: 2 })
  const [audience, setAudience] = useState(0)
  const path = PATHS[audience]
  return (
    <section
      className="lgx"
      id="lg-paths"
      ref={t.rootRef}
      aria-label="Learning for the moments that matter"
      data-step={t.index}
      data-paused={t.paused ? 'true' : 'false'}
    >
      <style>{BASE_CSS + PATHS_CSS}</style>
      <div className="lg-wrap">
        <header className="lg-header">
          <p className="lg-eyebrow">BUILT AROUND YOUR NEXT CHAPTER</p>
          <h2>
            What are you
            <br />
            <span>getting ready for?</span>
          </h2>
          <p className="lg-intro">Start with a moment that matters to you. Build your learning around it.</p>
        </header>
        <div className="pa-audiences" role="group" aria-label="Choose your learning context">
          {PATHS.map((p, i) => (
            <button
              key={p.name}
              className="pa-choice"
              type="button"
              aria-pressed={i === audience}
              onClick={() => {
                setAudience(i)
                t.go(0, true)
              }}
            >
              <strong>{p.name}</strong>
              <span>{p.blurb}</span>
            </button>
          ))}
        </div>
        <div className="pa-detail">
          <div>
            <div className="pa-label">ONE MOMENT. YOUR PATH TO IT.</div>
            <h3 className="pa-title">{path.title}</h3>
            <ol className="pa-route">
              {PATH_STEPS.map((s, i) => (
                <li key={s} className={`pa-step${i === t.index ? ' pa-active' : ''}`}>
                  <i>{i + 1}</i>
                  <div>
                    <strong>{s}</strong>
                    <span>{path.details[i]}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div key={t.nonce} className={`pa-moment${t.animate ? ' lg-enter' : ''}`}>
            <div className="pa-moment-top">PICTURE YOURSELF SAYING</div>
            <div>
              <p className="pa-question">{path.question}</p>
              <blockquote className="pa-say">{path.quote}</blockquote>
            </div>
            <div className="pa-moment-footer">Your life gives the language a purpose.</div>
          </div>
        </div>
        <div className="lg-bottom">
          <span className="lg-status" aria-live="polite">
            {PATH_CAPTIONS[t.index]}
          </span>
          <button className="lg-play" type="button" onClick={t.onControl}>
            {t.label('Play this path ▷')}
          </button>
        </div>
        <p className="pa-quality">Every educator is assessed before joining and briefed before each session.</p>
      </div>
    </section>
  )
}
