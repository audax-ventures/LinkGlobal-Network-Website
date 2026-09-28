import { useCallback, useEffect, useRef, useState } from 'react'

// Three homepage sections ported from Riley's supplied designs
// (~/Desktop/lessons-and-conversations.html, personalized-paths.html,
// real-life-progress.html). They share the source's tour engine: auto-play
// once when 25% visible, 3.5s per step, Play / Pause / Replay, pause when the
// tab is hidden, reduced motion gets a "Next example" button. CSS is the
// source's (shared .lgx base + per-section rules), on the site background and
// font. House-style edits: "practise" as a verb, no em dashes.

const SECONDS = 3.5

export const BASE_CSS = `.lgx{--lg-blue:#119edb;--lg-ink:#10263f;--lg-muted:#60788f;--lg-bg:#f5f9fd;--lg-panel:#fff;--lg-soft:#e9f5fc;--lg-line:#dfebf3;--lg-green:#087d60;color:var(--lg-ink);padding:64px 24px;isolation:isolate}.lgx *{box-sizing:border-box}.lgx .lg-wrap{max-width:1060px;margin:auto}.lgx .lg-header{text-align:center;max-width:650px;margin:0 auto 27px}.lgx .lg-eyebrow{font-size:10px;font-weight:700;letter-spacing:2.1px;color:var(--lg-blue);margin:0 0 13px}.lgx h2{color:var(--lg-ink);font-weight:750;font-size:35px;letter-spacing:-1.2px;line-height:1.1;margin:0}.lgx h2 span{color:var(--lg-blue)}.lgx .lg-intro{color:var(--lg-muted);font-size:13px;line-height:1.65;margin:14px auto 0;max-width:440px}.lgx h3{font-size:22px;line-height:1.2;letter-spacing:-.6px;font-weight:700;margin:0;color:var(--lg-ink)}.lgx p{line-height:1.65}.lgx button{font-family:inherit;cursor:pointer}.lgx button:focus-visible{outline:2px solid var(--lg-blue);outline-offset:4px}.lgx .lg-play{background:none;border:0;color:var(--lg-blue);font-size:11px;min-height:44px;padding:11px 0 11px 10px;white-space:nowrap}.lgx .lg-bottom{display:flex;align-items:center;justify-content:space-between;gap:14px;margin-top:15px;min-height:44px}.lgx .lg-status{font-size:11px;color:var(--lg-muted);line-height:1.5}.lgx .lg-smallnote{font-size:10px;text-align:center;color:var(--lg-muted);margin:12px 0 0}.lgx .lg-enter{animation:lg-enter .6s ease both}.lgx .lg-enter .lg-animate{animation:lg-pop .65s ease both;animation-delay:var(--delay,0ms)}.lgx[data-paused="true"] .lg-enter,.lgx[data-paused="true"] .lg-animate{animation-play-state:paused}@keyframes lg-enter{from{transform:translateY(7px);opacity:.6}to{transform:translateY(0);opacity:1}}@keyframes lg-pop{from{transform:translateY(12px) scale(.96);opacity:0}to{transform:translateY(0) scale(1);opacity:1}}@media(min-width:950px){.lgx{padding:88px 24px}.lgx h2{font-size:46px}.lgx .lg-intro{font-size:15px;max-width:550px}}@media(max-width:540px){.lgx{padding:56px 16px}.lgx h2{font-size:31px}.lgx .lg-header{margin-bottom:23px}.lgx .lg-bottom{align-items:flex-start}}@media(prefers-reduced-motion:reduce){.lgx *,.lgx *:before,.lgx *:after{animation:none!important;transition:none!important;scroll-behavior:auto!important}}`

export function useTour(opts: { last: number; reducedInitial?: number }) {
  const { last, reducedInitial } = opts
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
      timer.current = window.setTimeout(tick, SECONDS * 1000)
    } else setPlaying(false)
  }, [last, show])
  const start = useCallback(() => {
    window.clearTimeout(timer.current)
    show(indexRef.current === last ? 0 : indexRef.current)
    setPlaying(true)
    timer.current = window.setTimeout(tick, SECONDS * 1000)
  }, [last, show, tick])

  /** Jump to a step (card/choice click), optionally continuing the tour. */
  const go = useCallback(
    (i: number, autoplay = false, withAnim = true) => {
      interacted.current = true
      stop()
      show(i, withAnim)
      if (autoplay && !reduced) {
        setPlaying(true)
        timer.current = window.setTimeout(tick, SECONDS * 1000)
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

/* ---------------- Lessons + conversation ---------------- */

const SPEAKING_CSS = `#lg-speaking .sp-panels{display:grid;grid-template-columns:1fr 1fr;gap:17px}#lg-speaking .sp-panel{background:var(--lg-panel);border-radius:20px;padding:22px;box-shadow:0 12px 35px #254e7608;min-width:0;display:flex;flex-direction:column}#lg-speaking .sp-category{font-size:10px;letter-spacing:1.1px;color:var(--lg-muted);font-weight:700;margin:0 0 12px}#lg-speaking .sp-panel p{font-size:12px;color:var(--lg-muted);margin:11px 0 0}#lg-speaking .sp-demo{margin:22px 0 20px;min-height:185px;background:#f3f7fa;border-radius:13px;padding:17px;display:flex;flex-direction:column;justify-content:center;position:relative}#lg-speaking .sp-demo-label{font-size:9px;letter-spacing:1.3px;color:var(--lg-muted);margin-bottom:16px}#lg-speaking .sp-sentence{font-size:18px;line-height:1.8;color:var(--lg-ink)}#lg-speaking .sp-wrong{position:relative;color:#86565c;border-radius:3px;background:#f7e9eb;padding:2px 4px}#lg-speaking .sp-wrong:after{position:absolute;content:'';height:1px;background:#b65063;left:2px;right:2px;top:50%;transform:scaleX(0);transform-origin:left;transition:transform .45s}#lg-speaking[data-step="1"] .sp-wrong:after,#lg-speaking[data-step="2"] .sp-wrong:after{transform:scaleX(1)}#lg-speaking .sp-right{display:inline-block;color:var(--lg-green);background:#e1f2eb;padding:0 5px;border-radius:3px;opacity:0;transform:translateY(-8px);transition:opacity .5s,transform .5s}#lg-speaking[data-step="1"] .sp-right,#lg-speaking[data-step="2"] .sp-right{opacity:1;transform:translateY(0)}#lg-speaking .sp-coach{font-size:11px;line-height:1.5;color:var(--lg-green);margin-top:15px;min-height:33px;opacity:0;transform:translateY(6px);transition:.5s}#lg-speaking[data-step="2"] .sp-coach{opacity:1;transform:translateY(0)}#lg-speaking .sp-chat{gap:9px;justify-content:center}#lg-speaking .sp-bubble{max-width:94%;padding:10px 12px;border-radius:11px 11px 11px 2px;background:white;color:var(--lg-ink);font-size:12px;line-height:1.4;align-self:flex-start;box-shadow:0 3px 9px #18355204}#lg-speaking .sp-bubble.sp-answer{background:var(--lg-blue);color:white;border-radius:11px 11px 2px 11px;align-self:flex-end}#lg-speaking .sp-answer,#lg-speaking .sp-follow{opacity:0;transform:translateY(8px);transition:opacity .5s,transform .5s}#lg-speaking[data-step="1"] .sp-answer,#lg-speaking[data-step="2"] .sp-answer,#lg-speaking[data-step="2"] .sp-follow{opacity:1;transform:translateY(0)}#lg-speaking .sp-tags{border-top:1px solid var(--lg-line);padding-top:15px;color:var(--lg-blue);font-size:10px;line-height:1.6;margin-top:auto}#lg-speaking .sp-summary{text-align:center;color:var(--lg-ink);font-size:13px;margin:23px 0 0}#lg-speaking .sp-summary strong{font-weight:600}@media(max-width:560px){#lg-speaking .sp-panels{grid-template-columns:1fr}#lg-speaking .sp-demo{min-height:170px}#lg-speaking .sp-panel{padding:21px}}`
const SPEAKING_CAPTIONS = [
  'Two different ways to grow your voice.',
  'A correction helps you improve. A reply keeps you talking.',
  'Guidance builds the skill. Conversation builds the flow.',
]

export function LessonsAndConversationTour() {
  const t = useTour({ last: 2, reducedInitial: 2 })
  return (
    <section
      className="lgx"
      id="lg-speaking"
      ref={t.rootRef}
      aria-label="Lessons and conversation"
      data-step={t.index}
      data-paused={t.paused ? 'true' : 'false'}
    >
      <style>{BASE_CSS + SPEAKING_CSS}</style>
      <div className="lg-wrap">
        <header className="lg-header">
          <p className="lg-eyebrow">LESSONS + CONVERSATION</p>
          <h2>
            Build the skill.
            <br />
            <span>Find your flow.</span>
          </h2>
          <p className="lg-intro">Two kinds of speaking practice. Each brings something different to your voice.</p>
        </header>
        <div className="sp-panels">
          <article className="sp-panel">
            <div className="sp-category">WITH A CERTIFIED EDUCATOR</div>
            <h3>Get the guidance.</h3>
            <p>Work on technique, get clear corrections, and understand what to try next.</p>
            <div className="sp-demo">
              <div className="sp-demo-label">A MOMENT IN YOUR LESSON</div>
              <div className="sp-sentence">
                I <span className="sp-wrong">have went</span> <span className="sp-right">went</span>
                <br />
                to the meeting.
              </div>
              <div className="sp-coach">
                “It’s a finished action.
                <br />
                Here, use the simple past: went.”
              </div>
            </div>
            <div className="sp-tags">Structured practice · Clear feedback</div>
          </article>
          <article className="sp-panel">
            <div className="sp-category">WITH A CONVERSATION PARTNER</div>
            <h3>Get into the conversation.</h3>
            <p>Talk with native speakers about things you care about. Real pace. No assessment.</p>
            <div className="sp-demo sp-chat">
              <div className="sp-bubble">So, what got you into design?</div>
              <div className="sp-bubble sp-answer">Honestly, it started with posters.</div>
              <div className="sp-bubble sp-follow">Really? What kind of posters?</div>
            </div>
            <div className="sp-tags">Shared interests · Natural back-and-forth</div>
          </article>
        </div>
        <p className="sp-summary">
          Learn it with guidance. <strong>Make it yours through conversation.</strong>
        </p>
        <div className="lg-bottom">
          <span className="lg-status" aria-live="polite">
            {SPEAKING_CAPTIONS[t.index]}
          </span>
          <button className="lg-play" type="button" onClick={t.onControl}>
            {t.label('Play examples ▷')}
          </button>
        </div>
      </div>
    </section>
  )
}

/* ---------------- Personalized paths ---------------- */

const PATHS_CSS = `#lg-paths .pa-audiences{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin-bottom:20px}#lg-paths .pa-choice{background:var(--lg-panel);border:1px solid var(--lg-line);border-radius:13px;padding:16px 14px;text-align:left;color:var(--lg-ink);transition:background .3s,border-color .3s,transform .3s;min-width:0}#lg-paths .pa-choice strong{font-size:13px;line-height:1.3;display:block;margin-bottom:7px}#lg-paths .pa-choice span{font-size:10px;line-height:1.55;display:block;color:var(--lg-muted)}#lg-paths .pa-choice[aria-pressed="true"]{border-color:var(--lg-blue);background:#eaf7ff;transform:translateY(-3px)}#lg-paths .pa-detail{border-radius:20px;background:var(--lg-panel);padding:25px;display:grid;grid-template-columns:1fr 1fr;gap:27px;align-items:center;box-shadow:0 12px 35px #254e7608}#lg-paths .pa-label{font-size:9px;letter-spacing:1.4px;color:var(--lg-blue);margin-bottom:10px}#lg-paths .pa-title{font-size:24px;line-height:1.14;letter-spacing:-.7px;margin:0 0 18px}#lg-paths .pa-route{list-style:none;margin:0;padding:0;position:relative;display:grid;gap:17px}#lg-paths .pa-route:before{content:'';width:1px;background:var(--lg-line);position:absolute;top:15px;bottom:15px;left:12px}#lg-paths .pa-step{position:relative;display:flex;gap:10px;align-items:flex-start;color:var(--lg-muted);transition:color .4s}#lg-paths .pa-step i{font-size:10px;font-style:normal;display:grid;place-items:center;background:#eff5f9;width:25px;height:25px;border-radius:50%;color:var(--lg-muted);flex-shrink:0;transition:background .4s,color .4s,box-shadow .4s}#lg-paths .pa-step strong{font-size:11px;display:block;line-height:1.3;margin-bottom:3px}#lg-paths .pa-step span{font-size:10px;line-height:1.45;display:block}#lg-paths .pa-step.pa-active{color:var(--lg-ink)}#lg-paths .pa-step.pa-active i{background:var(--lg-blue);color:white;box-shadow:0 0 0 4px #159edb12}#lg-paths .pa-moment{background:#09273e;color:#edf8ff;padding:25px 20px;border-radius:16px;min-height:250px;display:flex;flex-direction:column;justify-content:space-between;position:relative;overflow:hidden}#lg-paths .pa-moment:before{content:'';position:absolute;width:180px;height:180px;right:-95px;top:-90px;border:1px solid #265b74;border-radius:50%;box-shadow:0 0 0 23px #265b741c,0 0 0 47px #265b7414}#lg-paths .pa-moment-top{font-size:9px;letter-spacing:1.6px;color:#77c8e9;position:relative}#lg-paths .pa-question{font-size:12px;line-height:1.5;color:#adcadd;margin:23px 0 10px}#lg-paths .pa-say{font-size:21px;line-height:1.3;letter-spacing:-.4px;color:white;font-weight:500;margin:0;min-height:83px;position:relative}#lg-paths .pa-moment-footer{font-size:10px;color:#8bd9f4;margin-top:20px}#lg-paths .pa-quality{border-top:1px solid var(--lg-line);padding-top:16px;margin:8px 0 0;text-align:center;font-size:11px;color:var(--lg-muted)}@media(max-width:540px){#lg-paths .pa-audiences{grid-template-columns:1fr;gap:8px}#lg-paths .pa-choice{padding:13px 15px}#lg-paths .pa-choice strong{font-size:14px;margin-bottom:4px}#lg-paths .pa-choice span{font-size:11px}#lg-paths .pa-choice[aria-pressed="true"]{transform:none}#lg-paths .pa-detail{grid-template-columns:1fr;padding:21px;gap:24px}#lg-paths .pa-moment{min-height:215px}#lg-paths .pa-title{font-size:25px}}`
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

/* ---------------- Real-life progress ---------------- */

const PROGRESS_CSS = `#lg-progress .pr-layout{display:grid;grid-template-columns:.9fr 1.1fr;gap:20px;align-items:stretch}#lg-progress .pr-choices{display:grid;gap:9px}#lg-progress .pr-choice{width:100%;display:flex;gap:12px;align-items:center;padding:15px 14px;background:var(--lg-panel);border:1px solid var(--lg-line);border-radius:12px;text-align:left;color:var(--lg-ink);transition:transform .4s,border-color .4s,background .4s}#lg-progress .pr-choice>span{width:27px;height:27px;display:grid;place-items:center;background:#eaf3f9;border-radius:50%;font-size:11px;color:var(--lg-muted);flex-shrink:0}#lg-progress .pr-choice strong{display:block;font-size:12px;font-weight:600;line-height:1.35}#lg-progress .pr-choice small{display:block;margin-top:3px;font-size:10px;color:var(--lg-muted);line-height:1.4}#lg-progress .pr-choice[aria-pressed="true"]{border-color:#16a785;background:#f0fbf7;transform:translateX(3px)}#lg-progress .pr-choice[aria-pressed="true"]>span{background:#098567;color:white}#lg-progress .pr-story{border-radius:19px;background:var(--lg-panel);box-shadow:0 12px 35px #254e7608;padding:26px 24px;display:flex;flex-direction:column;justify-content:space-between;min-width:0;position:relative;overflow:hidden}#lg-progress .pr-top{display:flex;align-items:center;justify-content:space-between;gap:8px;font-size:9px;letter-spacing:1.2px;color:var(--lg-muted)}#lg-progress .pr-stamp{display:grid;place-items:center;background:#e3f6ee;color:#07825f;border-radius:50%;width:33px;height:33px;font-size:17px;letter-spacing:0;flex-shrink:0}#lg-progress .pr-quote{font-size:26px;font-weight:500;line-height:1.22;letter-spacing:-.8px;margin:18px 0;color:var(--lg-ink)}#lg-progress .pr-quote:before{content:'“';display:block;font-family:Georgia,serif;font-size:68px;color:var(--lg-blue);height:39px;line-height:1}#lg-progress .pr-context{font-size:12px;line-height:1.6;color:var(--lg-muted);margin:0}#lg-progress .pr-line{width:42px;height:2px;background:#20ac8b;margin:17px 0 12px;transform-origin:left}#lg-progress .pr-footer{font-size:10px;color:var(--lg-green);line-height:1.5}#lg-progress .pr-story.lg-enter .pr-stamp{animation:pr-stamp .7s ease both;animation-delay:.2s}#lg-progress .pr-story.lg-enter .pr-line{animation:pr-line .8s ease both}@keyframes pr-stamp{from{transform:scale(.6) rotate(-30deg);opacity:0}to{transform:scale(1) rotate(0);opacity:1}}@keyframes pr-line{from{transform:scaleX(0)}to{transform:scaleX(1)}}#lg-progress .pr-ending{text-align:center;border-top:1px solid var(--lg-line);padding-top:19px;margin:9px 0 0;font-size:13px;color:var(--lg-ink)}@media(max-width:540px){#lg-progress .pr-layout{grid-template-columns:1fr;gap:16px}#lg-progress .pr-choice[aria-pressed="true"]{transform:none}#lg-progress .pr-choice strong{font-size:13px}#lg-progress .pr-story{min-height:290px}#lg-progress .pr-quote{font-size:27px}#lg-progress .pr-choices{grid-template-columns:1fr 1fr;gap:8px}#lg-progress .pr-choice{padding:13px 11px;align-items:flex-start;gap:8px}#lg-progress .pr-choice>span{width:23px;height:23px}#lg-progress .pr-choice small{display:none}}@media(max-width:360px){#lg-progress .pr-choices{grid-template-columns:1fr}#lg-progress .pr-choice small{display:block}}`
const MOMENTS = [
  {
    name: 'An interview attended',
    title: 'An interview attended.',
    sub: 'Tell your story with confidence.',
    quote: 'Let me tell you what I can bring to this role.”',
    context: 'Finding the words to show someone what you’re capable of.',
  },
  {
    name: 'An idea shared',
    title: 'An idea shared.',
    sub: 'Have your voice in the room.',
    quote: 'I’d like to build on that idea.”',
    context: 'Joining the discussion when you have something to say.',
  },
  {
    name: 'An acceptance letter',
    title: 'An acceptance letter.',
    sub: 'A new academic chapter.',
    quote: 'I’m excited to accept my place.”',
    context: 'A new chapter to work toward, with language as part of your preparation.',
  },
  {
    name: 'A friendship formed',
    title: 'A friendship formed.',
    sub: 'Feel at home in another language.',
    quote: 'Same time next week?”',
    context: 'When a conversation becomes a connection you want to keep.',
  },
]

export function RealLifeProgressTour() {
  const t = useTour({ last: 3 })
  const m = MOMENTS[t.index]
  return (
    <section
      className="lgx"
      id="lg-progress"
      ref={t.rootRef}
      aria-label="Progress in real life"
      data-step={t.index}
      data-paused={t.paused ? 'true' : 'false'}
    >
      <style>{BASE_CSS + PROGRESS_CSS}</style>
      <div className="lg-wrap">
        <header className="lg-header">
          <p className="lg-eyebrow">WHAT PROGRESS LOOKS LIKE</p>
          <h2>
            A stronger voice.
            <br />
            <span>A bigger world.</span>
          </h2>
          <p className="lg-intro">
            Measure progress in the things you become able to do, and the doors they can open.
          </p>
        </header>
        <div className="pr-layout">
          <div className="pr-choices" role="group" aria-label="Explore moments to work toward">
            {MOMENTS.map((x, i) => (
              <button key={x.name} className="pr-choice" type="button" aria-pressed={i === t.index} onClick={() => t.go(i)}>
                <span aria-hidden="true">0{i + 1}</span>
                <div>
                  <strong>{x.title}</strong>
                  <small>{x.sub}</small>
                </div>
              </button>
            ))}
          </div>
          <div key={t.nonce} className={`pr-story${t.animate ? ' lg-enter' : ''}`}>
            <div className="pr-top">
              PICTURE YOUR NEXT MILESTONE{' '}
              <span className="pr-stamp" aria-hidden="true">
                ✓
              </span>
            </div>
            <div>
              <blockquote className="pr-quote">{m.quote}</blockquote>
              <p className="pr-context">{m.context}</p>
            </div>
            <div>
              <div className="pr-line" aria-hidden="true" />
              <div className="pr-footer">A moment to work toward.</div>
            </div>
          </div>
        </div>
        <div className="lg-bottom">
          <span className="lg-status" aria-live="polite">
            {m.name}. A moment to work toward.
          </span>
          <button className="lg-play" type="button" onClick={t.onControl}>
            {t.label('Play moments ▷')}
          </button>
        </div>
        <p className="pr-ending">Your progress belongs in your life.</p>
      </div>
    </section>
  )
}
