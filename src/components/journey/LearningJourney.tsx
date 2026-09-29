import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'

// Home "How LinkGlobal works" journey — ported from Riley's supplied design
// (~/Desktop/home-learning-journey.html). Six stages alternate either side
// of a centre line; each stage's card animates the first time it's 30%
// visible (and on its Replay button), its node turns blue, and the line fills
// down to the furthest stage reached. CSS is the source's (site font and
// background). House-style edits: "Practise" (verb), em dash -> comma.
// The section keeps the #how-it-works anchor used by the hero button.

const CSS = `#home-learning-journey{--hj-blue:#159fd9;--hj-ink:#10243c;--hj-muted:#637a93;--hj-line:#dce8f1;--hj-space:64px;color:var(--hj-ink);padding:80px 24px 64px}#home-learning-journey *{box-sizing:border-box}#home-learning-journey .hj-wrap{max-width:1120px;margin:auto}#home-learning-journey .hj-header{text-align:center;max-width:650px;margin:0 auto 53px}#home-learning-journey .hj-eyebrow{font-size:10px;letter-spacing:2.5px;font-weight:700;color:var(--hj-blue);margin:0 0 18px}#home-learning-journey h2{font-size:43px;font-weight:750;line-height:1.06;letter-spacing:-1.5px;margin:0;color:var(--hj-ink)}#home-learning-journey h2 span{color:var(--hj-blue)}#home-learning-journey .hj-subtitle{font-size:14px;line-height:1.7;max-width:460px;color:var(--hj-muted);margin:20px auto 0}#home-learning-journey .hj-scroll{font-size:10px;letter-spacing:1px;color:var(--hj-muted);display:block;margin-top:29px}#home-learning-journey .hj-scroll b{display:block;font-size:21px;font-weight:400;color:var(--hj-blue);margin-top:6px}#home-learning-journey .hj-timeline{position:relative;padding:12px 0 24px}#home-learning-journey .hj-spine{position:absolute;width:3px;left:50%;top:0;bottom:0;transform:translateX(-50%);border-radius:8px;background:var(--hj-line);overflow:hidden}#home-learning-journey .hj-fill{height:var(--hj-progress,0px);background:linear-gradient(#87d3f3,var(--hj-blue));width:100%;transition:height .75s ease}#home-learning-journey .hj-row{display:grid;grid-template-columns:minmax(0,1fr) 66px minmax(0,1fr);align-items:center;position:relative;gap:0;min-height:295px;padding:27px 0;margin-bottom:var(--hj-space)}#home-learning-journey .hj-row:last-child{margin-bottom:0}#home-learning-journey .hj-copy{grid-column:3;grid-row:1;padding-left:15px;min-width:0}#home-learning-journey .hj-art{grid-column:1;grid-row:1;margin-right:15px;min-width:0;position:relative}#home-learning-journey .hj-row:nth-of-type(even) .hj-copy{grid-column:1;text-align:right;padding-left:0;padding-right:15px}#home-learning-journey .hj-row:nth-of-type(even) .hj-art{grid-column:3;margin-right:0;margin-left:15px}#home-learning-journey .hj-node{grid-column:2;grid-row:1;justify-self:center;width:40px;height:40px;border-radius:50%;background:white;border:1px solid #cadde9;display:grid;place-items:center;font-size:13px;font-weight:600;color:#7493a8;position:relative;z-index:2;box-shadow:0 3px 8px #18345308;transition:background .375s,color .375s,box-shadow .375s}#home-learning-journey .hj-row.hj-seen .hj-node{background:var(--hj-blue);border-color:transparent;color:white;box-shadow:0 0 0 6px #159fd916}#home-learning-journey .hj-category{font-size:9px;font-weight:700;letter-spacing:1.8px;color:var(--hj-blue);margin:0 0 12px;line-height:1.5}#home-learning-journey h3{font-size:28px;line-height:1.12;letter-spacing:-.8px;font-weight:750;color:var(--hj-ink);margin:0 0 14px}#home-learning-journey .hj-description{font-size:12px;line-height:1.75;color:var(--hj-muted);margin:0}#home-learning-journey .hj-takeaway{font-size:11px;line-height:1.5;color:#148bbc;margin:15px 0 0;font-weight:600}#home-learning-journey .hj-card{background:#fff;border-radius:18px;padding:21px 18px;box-shadow:0 16px 40px #1a477310;border:1px solid #eaf1f6;min-width:0}#home-learning-journey .hj-cardtop{display:flex;justify-content:space-between;align-items:center;gap:9px;margin-bottom:17px;font-size:9px;color:var(--hj-muted);letter-spacing:1px;line-height:1.5}#home-learning-journey .hj-replay{cursor:pointer;border:0;background:transparent;color:#46839e;font-size:10px;font-family:inherit;padding:5px 0 5px 8px;letter-spacing:0;min-height:30px;white-space:nowrap}#home-learning-journey button:focus-visible{outline:2px solid var(--hj-blue);outline-offset:4px}#home-learning-journey .hj-note{font-size:9px;line-height:1.5;color:#7990a4;margin:13px 0 0}#home-learning-journey .hj-profile-goal{font-size:19px;font-weight:600;line-height:1.25;letter-spacing:-.4px;background:#e9f7fe;border-radius:11px;padding:16px 13px;color:#17678e;margin-bottom:12px}#home-learning-journey .hj-profile-goal small{font-size:9px;font-weight:400;letter-spacing:1px;display:block;margin-bottom:7px;color:#4e91ae}#home-learning-journey .hj-chips{display:flex;gap:6px;flex-wrap:wrap}#home-learning-journey .hj-chip{font-size:10px;line-height:1.4;background:#f2f6f9;border-radius:6px;padding:7px 9px;color:#48667d}#home-learning-journey .hj-chip b{font-weight:600;color:#193951}#home-learning-journey .hj-plan-title{font-size:19px;font-weight:600;line-height:1.2;letter-spacing:-.4px;margin-bottom:20px}#home-learning-journey .hj-route{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));position:relative;gap:7px;margin:0 0 17px;padding:0;list-style:none}#home-learning-journey .hj-route:before{content:'';position:absolute;left:14%;right:14%;top:13px;height:2px;background:#d5eaf6}#home-learning-journey .hj-route:after{content:'';position:absolute;left:14%;right:14%;top:13px;height:2px;background:var(--hj-blue);transform-origin:left}#home-learning-journey .hj-route li{position:relative;z-index:1;text-align:center;font-size:10px;line-height:1.4;color:var(--hj-muted)}#home-learning-journey .hj-route i{display:grid;place-items:center;width:27px;height:27px;font-size:10px;font-style:normal;border:4px solid white;margin:0 auto 9px;background:#dff3fc;border-radius:50%;color:#168dbf;box-sizing:content-box;position:relative;top:-4px}#home-learning-journey .hj-route li:last-child i{background:var(--hj-blue);color:white}#home-learning-journey .hj-destination{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:11px;background:#f0f8fd;border-radius:8px;font-size:10px;color:#3f7997;line-height:1.4}#home-learning-journey .hj-destination strong{font-weight:600;color:#1a668c}#home-learning-journey .hj-insight{border-radius:9px;background:#f1f6fa;padding:12px;font-size:11px;line-height:1.5;color:#4a687e;margin-bottom:11px}#home-learning-journey .hj-insight b{display:block;color:var(--hj-ink);font-weight:500;font-size:12px;margin-top:4px}#home-learning-journey .hj-adjustment{border:1px solid #bce5d8;background:#f1fbf6;border-radius:10px;padding:13px;color:#18765a;font-size:12px;line-height:1.4}#home-learning-journey .hj-adjustment small{font-size:9px;letter-spacing:.8px;color:#519a81;display:block;margin-bottom:7px}#home-learning-journey .hj-old{display:block;color:#819e94;font-size:10px;text-decoration:line-through;margin-bottom:6px}#home-learning-journey .hj-adjustment strong{display:block;font-weight:600}#home-learning-journey .hj-lesson{background:#0b2a43;color:white;border-color:#0b2a43}#home-learning-journey .hj-lesson .hj-cardtop{color:#83b4ce}#home-learning-journey .hj-lesson .hj-replay{color:#86d8f6}#home-learning-journey .hj-people{display:flex;align-items:center;justify-content:center;gap:18px;padding:7px 0 15px}#home-learning-journey .hj-person{text-align:center;font-size:9px;color:#c6dfef}#home-learning-journey .hj-avatar{display:grid;place-items:center;width:42px;height:42px;border-radius:50%;background:#2d5670;color:#e3f7ff;font-size:12px;font-weight:600;margin:0 auto 7px}#home-learning-journey .hj-person:last-child .hj-avatar{background:#178bb6;color:white}#home-learning-journey .hj-wave{display:flex;gap:3px;align-items:center;height:32px;color:#40c8f3}#home-learning-journey .hj-wave i{width:3px;height:var(--height);border-radius:3px;background:currentColor}#home-learning-journey .hj-brief{background:#173e58;border-radius:9px;padding:13px;font-size:12px;line-height:1.5;color:#eef8ff}#home-learning-journey .hj-brief small{display:block;font-size:9px;letter-spacing:.7px;color:#8bcce6;margin-bottom:6px}#home-learning-journey .hj-lesson .hj-note{color:#83b4ce}#home-learning-journey .hj-match{display:flex;align-items:center;gap:7px;color:#27876d;font-size:10px;line-height:1.4;margin-bottom:13px}#home-learning-journey .hj-match:before{content:'';width:6px;height:6px;flex-shrink:0;background:#28ae87;border-radius:50%}#home-learning-journey .hj-chat{display:flex;flex-direction:column;gap:9px}#home-learning-journey .hj-bubble{font-size:11px;line-height:1.45;color:#294c65;background:#edf5fa;border-radius:11px 11px 11px 2px;padding:10px 12px;max-width:94%;align-self:flex-start}#home-learning-journey .hj-bubble.hj-answer{color:white;background:var(--hj-blue);border-radius:11px 11px 2px 11px;align-self:flex-end}#home-learning-journey .hj-win{border-color:#d4ebdf;background:linear-gradient(140deg,#fff,#f4fcf8)}#home-learning-journey .hj-win-symbol{width:49px;height:49px;border-radius:50%;display:grid;place-items:center;background:#11a980;color:white;font-size:26px;margin-bottom:17px;box-shadow:0 0 0 8px #12ac7d0a}#home-learning-journey .hj-then{font-size:10px;color:#859c95;text-decoration:line-through;margin-bottom:9px}#home-learning-journey .hj-win-title{font-size:23px;line-height:1.18;letter-spacing:-.7px;color:#145d49;font-weight:600;margin:0 0 12px}#home-learning-journey .hj-stamp{display:inline-block;font-size:10px;background:#e2f6eb;color:#278167;border-radius:30px;padding:7px 10px;line-height:1.4}#home-learning-journey .hj-footer{text-align:center;max-width:450px;margin:38px auto 0;font-size:15px;line-height:1.6;color:var(--hj-ink)}#home-learning-journey .hj-footer strong{font-weight:600;color:var(--hj-blue)}#home-learning-journey .hj-footer small{display:block;font-size:10px;line-height:1.6;color:var(--hj-muted);margin-top:10px}#home-learning-journey .hj-running .hj-pop{animation:hj-item .562s cubic-bezier(.2,.7,.2,1) both;animation-delay:var(--delay,0ms)}#home-learning-journey .hj-running .hj-route:after{animation:hj-route 1.2s ease both}#home-learning-journey .hj-running .hj-wave i{animation:hj-speak .45s ease 3;animation-delay:var(--delay,0ms)}#home-learning-journey .hj-running .hj-win-symbol{animation:hj-stamp .6s ease both}#home-learning-journey .hj-running .hj-stamp{animation:hj-stamp .525s ease both;animation-delay:.375s}@keyframes hj-item{from{opacity:.1;transform:translateY(13px) scale(.95)}to{opacity:1;transform:translateY(0) scale(1)}}@keyframes hj-route{from{transform:scaleX(0)}to{transform:scaleX(1)}}@keyframes hj-speak{50%{transform:scaleY(.25)}}@keyframes hj-stamp{from{transform:scale(.5) rotate(-12deg);opacity:0}70%{transform:scale(1.08) rotate(2deg)}to{transform:scale(1) rotate(0);opacity:1}}@media(min-width:950px){#home-learning-journey{padding:112px 24px 80px;--hj-space:85px}#home-learning-journey h2{font-size:60px}#home-learning-journey .hj-header{margin-bottom:65px}#home-learning-journey .hj-subtitle{font-size:17px;max-width:520px}#home-learning-journey .hj-row{grid-template-columns:minmax(0,1fr) 115px minmax(0,1fr);min-height:350px;padding:35px 0}#home-learning-journey .hj-copy{padding-left:18px}#home-learning-journey .hj-art{margin-right:18px}#home-learning-journey .hj-row:nth-of-type(even) .hj-copy{padding-right:18px}#home-learning-journey .hj-row:nth-of-type(even) .hj-art{margin-left:18px}#home-learning-journey .hj-node{width:49px;height:49px;font-size:15px}#home-learning-journey h3{font-size:37px}#home-learning-journey .hj-description{font-size:15px}#home-learning-journey .hj-takeaway{font-size:13px}#home-learning-journey .hj-category{font-size:11px}#home-learning-journey .hj-card{padding:27px 25px;border-radius:21px}#home-learning-journey .hj-cardtop{font-size:10px}#home-learning-journey .hj-profile-goal{font-size:24px}#home-learning-journey .hj-chip,#home-learning-journey .hj-bubble,#home-learning-journey .hj-brief{font-size:13px}#home-learning-journey .hj-plan-title{font-size:24px}#home-learning-journey .hj-route li{font-size:12px}#home-learning-journey .hj-insight,#home-learning-journey .hj-adjustment{font-size:14px}#home-learning-journey .hj-win-title{font-size:30px}#home-learning-journey .hj-note{font-size:10px}#home-learning-journey .hj-footer{font-size:19px}}@media(max-width:560px){#home-learning-journey{padding:56px 16px 40px;--hj-space:37px}#home-learning-journey h2{font-size:35px}#home-learning-journey .hj-header{margin-bottom:37px}#home-learning-journey .hj-spine{left:18px}#home-learning-journey .hj-row{grid-template-columns:36px minmax(0,1fr);row-gap:20px;column-gap:16px;min-height:0;padding:12px 0 25px;align-items:start}#home-learning-journey .hj-node{grid-column:1;grid-row:1;width:32px;height:32px;font-size:11px;margin-top:2px}#home-learning-journey .hj-copy,#home-learning-journey .hj-row:nth-of-type(even) .hj-copy{grid-column:2;grid-row:1;padding:0;text-align:left}#home-learning-journey .hj-art,#home-learning-journey .hj-row:nth-of-type(even) .hj-art{grid-column:2;grid-row:2;margin:0}#home-learning-journey h3{font-size:28px}#home-learning-journey .hj-description{font-size:12px}#home-learning-journey .hj-card{padding:19px 15px}#home-learning-journey .hj-replay{min-height:44px;padding-top:10px;padding-bottom:10px}#home-learning-journey .hj-cardtop{margin-bottom:10px}#home-learning-journey .hj-profile-goal{font-size:19px}#home-learning-journey .hj-cardtop{letter-spacing:.7px}#home-learning-journey .hj-footer{padding-left:35px}#home-learning-journey .hj-route{gap:4px}#home-learning-journey .hj-route li{font-size:9px}}@media(prefers-reduced-motion:reduce){#home-learning-journey *,#home-learning-journey *:before,#home-learning-journey *:after{animation:none!important;transition:none!important}#home-learning-journey .hj-replay{display:none}}#home-learning-journey .hj-companion{position:absolute;left:50%;top:var(--hj-progress,0px);width:76px;height:76px;transform:translate(-50%,calc(-100% - 26px));z-index:3;pointer-events:none;transition:top .75s ease;filter:drop-shadow(0 8px 14px #0b35561a)}@media(max-width:560px){#home-learning-journey .hj-companion{left:18px;width:46px;height:46px;transform:translate(-50%,calc(-100% - 18px))}}@media(prefers-reduced-motion:reduce){#home-learning-journey .hj-companion{transition:none}}`

const v = (vars: Record<string, string>) => vars as CSSProperties

interface Stage {
  category: string
  title: ReactNode
  description: string
  takeaway: string
  cardTop: string
  replayLabel: string
  cardClass?: string
  card: ReactNode
}

const STAGES: Stage[] = [
  {
    category: '01 · YOUR PROFILE',
    title: (<>Start with the life<br />you’re learning for.</>),
    description:
      'A job interview. A new city. A conversation you want to be part of. Your goals, level, profession, and interests give your learning its direction.',
    takeaway: 'Your reason comes first.',
    cardTop: 'YOUR STARTING POINT',
    replayLabel: 'Replay profile animation',
    card: (
      <>
        <div className="hj-profile-goal hj-pop">
          <small>I’M LEARNING TO…</small>Feel ready for my<br />nursing interview.
        </div>
        <div className="hj-chips">
          <span className="hj-chip hj-pop" style={v({ '--delay': '120ms' })}>Level <b>B1</b></span>
          <span className="hj-chip hj-pop" style={v({ '--delay': '240ms' })}>Work <b>Nursing</b></span>
          <span className="hj-chip hj-pop" style={v({ '--delay': '360ms' })}>Into <b>Football</b></span>
        </div>
        <p className="hj-note">An example learner. One goal to follow through the journey.</p>
      </>
    ),
  },
  {
    category: '02 · YOUR LEARNING PATH',
    title: (<>See where you’re going.<br />Know what comes next.</>),
    description:
      'Your goal becomes a structured route. Each lesson and speaking opportunity has a purpose, so you can see how today’s practice moves you forward.',
    takeaway: 'A clear next step, with the bigger picture in view.',
    cardTop: 'YOUR ROUTE TAKES SHAPE',
    replayLabel: 'Replay learning path animation',
    card: (
      <>
        <div className="hj-plan-title">Build toward<br />your interview.</div>
        <ol className="hj-route">
          <li className="hj-pop"><i>1</i>Tell your<br />story</li>
          <li className="hj-pop" style={v({ '--delay': '338ms' })}><i>2</i>Practise<br />follow-ups</li>
          <li className="hj-pop" style={v({ '--delay': '675ms' })}><i>3</i>Speak<br />naturally</li>
        </ol>
        <div className="hj-destination hj-pop" style={v({ '--delay': '862ms' })}>
          <span>Your destination</span>
          <strong>Job interview →</strong>
        </div>
        <p className="hj-note">Illustrative path · The route is shaped around your goal.</p>
      </>
    ),
  },
  {
    category: '03 · CONTINUOUS ADAPTATION',
    title: (<>You keep growing.<br />Your plan keeps up.</>),
    description:
      'The AI follows how you actually speak and adjusts what comes next. As you become more comfortable, your practice moves with you.',
    takeaway: 'The next challenge fits the speaker you’re becoming.',
    cardTop: 'A PLAN THAT LISTENS',
    replayLabel: 'Replay plan adaptation animation',
    card: (
      <>
        <div className="hj-insight hj-pop">After your speaking practice<b>Your introduction is flowing.</b></div>
        <div className="hj-adjustment hj-pop" style={v({ '--delay': '262ms' })}>
          <small>NEXT STEP, UPDATED</small>
          <span className="hj-old">Rehearse your introduction</span>
          <strong className="hj-pop" style={v({ '--delay': '638ms' })}>↳ Try an unexpected follow-up.</strong>
        </div>
        <p className="hj-note">Example adjustment based on a learner’s speaking.</p>
      </>
    ),
  },
  {
    category: '04 · CERTIFIED EDUCATORS',
    title: (<>A teacher who knows<br />where to begin.</>),
    description:
      'Your educator arrives briefed on your path. Live, structured lessons give you the feedback, technique, and human guidance to work on what matters now.',
    takeaway: 'Shared context. Focused teaching.',
    cardTop: 'READY FOR YOUR LESSON',
    replayLabel: 'Replay educator animation',
    cardClass: 'hj-lesson',
    card: (
      <>
        <div className="hj-people">
          <div className="hj-person hj-pop"><div className="hj-avatar">E</div>Your educator</div>
          <div className="hj-wave" aria-hidden="true">
            <i style={v({ '--height': '10px' })} />
            <i style={v({ '--height': '23px', '--delay': '75ms' })} />
            <i style={v({ '--height': '31px', '--delay': '150ms' })} />
            <i style={v({ '--height': '17px', '--delay': '225ms' })} />
            <i style={v({ '--height': '26px', '--delay': '300ms' })} />
          </div>
          <div className="hj-person hj-pop" style={v({ '--delay': '150ms' })}><div className="hj-avatar">You</div>Your voice</div>
        </div>
        <div className="hj-brief hj-pop" style={v({ '--delay': '488ms' })}>
          <small>WORKING ON FOLLOW-UP QUESTIONS</small>“Try leading with the action you took. Then explain why.”
        </div>
        <p className="hj-note">An example of guidance in a live lesson.</p>
      </>
    ),
  },
  {
    category: '05 · REAL CONVERSATIONS',
    title: (<>Find common ground.<br />Let the words follow.</>),
    description:
      'Meet native speakers connected to your work, interests, or destination. Talk about real things at a natural pace, without a lesson plan.',
    takeaway: 'You have more to share than a practice sentence.',
    cardTop: 'SOMETHING IN COMMON',
    replayLabel: 'Replay conversation animation',
    card: (
      <>
        <div className="hj-match">Example connection · A nurse in Toronto</div>
        <div className="hj-chat">
          <div className="hj-bubble hj-pop">What’s a typical shift like for you?</div>
          <div className="hj-bubble hj-answer hj-pop" style={v({ '--delay': '488ms' })}>Busy, but the people make it worth it.</div>
          <div className="hj-bubble hj-pop" style={v({ '--delay': '1012ms' })}>I know exactly what you mean.</div>
        </div>
      </>
    ),
  },
  {
    category: '06 · VISIBLE PROGRESS',
    title: (<>One day, the words<br />are simply there.</>),
    description:
      'You answer the question. Share your experience. Keep the conversation going. Progress becomes something you can do in the moments that matter.',
    takeaway: 'The goal you started with becomes a milestone you can reach.',
    cardTop: 'AN EXAMPLE MILESTONE',
    replayLabel: 'Replay progress animation',
    cardClass: 'hj-win',
    card: (
      <>
        <div className="hj-win-symbol" aria-hidden="true">✓</div>
        <div className="hj-then hj-pop">“I need my notes.”</div>
        <div className="hj-win-title hj-pop" style={v({ '--delay': '172ms' })}>Answer interview questions<br />in your own words.</div>
        <div className="hj-stamp">Without reaching for a script.</div>
      </>
    ),
  },
]

export default function LearningJourney() {
  const rootRef = useRef<HTMLElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const rowRefs = useRef<(HTMLElement | null)[]>([])
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([])
  const visited = useRef(new Set<number>())
  const [highest, setHighest] = useState(-1)
  const [running, setRunning] = useState<boolean[]>(() => STAGES.map(() => false))
  const [runKeys, setRunKeys] = useState<number[]>(() => STAGES.map(() => 0))
  const [progress, setProgress] = useState(0)
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const visit = useCallback(
    (i: number) => {
      visited.current.add(i)
      setHighest((h) => Math.max(h, i))
      if (!reduced) {
        setRunning((r) => r.map((x, j) => (j === i ? true : x)))
        setRunKeys((k) => k.map((x, j) => (j === i ? x + 1 : x))) // remount card to replay
      }
    },
    [reduced],
  )

  // Line fill: down to the centre of the furthest node reached (or the full
  // line once the last stage is reached).
  const updateLine = useCallback(() => {
    const tl = timelineRef.current
    if (!tl || highest < 0) {
      setProgress(0)
      return
    }
    const parent = tl.getBoundingClientRect()
    const node = nodeRefs.current[highest]?.getBoundingClientRect()
    if (!node) return
    setProgress(highest === STAGES.length - 1 ? parent.height : Math.max(0, node.top - parent.top + node.height / 2))
  }, [highest])

  useLayoutEffect(() => updateLine(), [updateLine])

  useEffect(() => {
    const tl = timelineRef.current
    if (!tl) return
    const ro = new ResizeObserver(() => updateLine())
    ro.observe(tl)
    return () => ro.disconnect()
  }, [updateLine])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const i = rowRefs.current.indexOf(entry.target as HTMLElement)
          if (entry.isIntersecting && i >= 0 && !visited.current.has(i)) visit(i)
        })
      },
      { threshold: 0.3 },
    )
    rowRefs.current.forEach((r) => r && observer.observe(r))
    return () => observer.disconnect()
  }, [visit])

  return (
    <section
      id="home-learning-journey"
      ref={rootRef}
      aria-label="Your learning journey with LinkGlobal"
      style={v({ '--hj-progress': `${progress}px` })}
    >
      <style>{CSS}</style>
      <div id="how-it-works" className="relative -top-24" aria-hidden="true" />
      <div className="hj-wrap">
        <header className="hj-header">
          <p className="hj-eyebrow">HOW LINKGLOBAL WORKS</p>
          <h2>
            One path, shaped by
            <br />
            <span>your goal.</span>
          </h2>
          <p className="hj-subtitle">
            A plan that listens. People who help you grow.
            <br />
            And progress that comes with you into real life.
          </p>
          <span className="hj-scroll">
            FOLLOW THE JOURNEY<b aria-hidden="true">↓</b>
          </span>
        </header>
        <div className="hj-timeline" ref={timelineRef}>
          <div className="hj-spine" aria-hidden="true">
            <div className="hj-fill" />
          </div>
          {/* Journey companion: travels down the line with the fill, resting
              just above the stage it's heading to. Its float / blink / wave
              loop lives inside the SVG (sped up 25% from Riley's file). */}
          <img src="/journey-companion.svg" alt="" aria-hidden="true" className="hj-companion" />
          {STAGES.map((s, i) => (
            <article
              key={s.category}
              ref={(el) => {
                rowRefs.current[i] = el
              }}
              className={`hj-row${i <= highest ? ' hj-seen' : ''}${running[i] ? ' hj-running' : ''}`}
              aria-labelledby={`hj-title-${i + 1}`}
            >
              <div className="hj-copy">
                <p className="hj-category">{s.category}</p>
                <h3 id={`hj-title-${i + 1}`}>{s.title}</h3>
                <p className="hj-description">{s.description}</p>
                <p className="hj-takeaway">{s.takeaway}</p>
              </div>
              <div
                className="hj-node"
                aria-hidden="true"
                ref={(el) => {
                  nodeRefs.current[i] = el
                }}
              >
                {i + 1}
              </div>
              <div className="hj-art">
                <div key={runKeys[i]} className={`hj-card${s.cardClass ? ` ${s.cardClass}` : ''}`}>
                  <div className="hj-cardtop">
                    <span>{s.cardTop}</span>
                    <button className="hj-replay" type="button" aria-label={s.replayLabel} onClick={() => visit(i)}>
                      Replay ↻
                    </button>
                  </div>
                  {s.card}
                </div>
              </div>
            </article>
          ))}
        </div>
        <footer className="hj-footer">
          Your goal gives the journey its direction.
          <br />
          <strong>Your voice makes it yours.</strong>
          <small>Illustrative journey · Every learner’s path and pace are different.</small>
        </footer>
      </div>
    </section>
  )
}
