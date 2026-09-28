import { useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { BASE_CSS, useTour } from '../home/TourSections'

// Inner-page sections ported from Riley's supplied designs (Desktop):
// reasons-to-learn.html (For Learners), teaching-with-linkglobal.html
// (For Educators), conversation-connections.html (For You) and
// from-study-to-speaking.html (About). Same tour engine as the homepage
// tours (useTour). House-style edits: no em dashes, "practise" as a verb.

const v = (vars: Record<string, string>) => vars as CSSProperties

/* ---------------- For Learners: reasons to learn ---------------- */

const REASONS_CSS = `#lg-reasons .re-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:13px}#lg-reasons .re-card{border:1px solid var(--lg-line);background:var(--lg-panel);border-radius:18px;padding:21px 17px;color:var(--lg-ink);text-align:left;min-width:0;transition:transform .338s,border-color .338s,box-shadow .338s;display:flex;flex-direction:column;width:100%}#lg-reasons .re-card[aria-pressed="true"]{transform:translateY(-5px);border-color:var(--lg-blue);box-shadow:0 12px 30px #159edb0c}#lg-reasons .re-kicker{font-size:9px;letter-spacing:1.2px;color:var(--lg-blue);margin-bottom:12px;display:block}#lg-reasons .re-title{font-size:17px;font-weight:700;line-height:1.2;letter-spacing:-.4px;display:block}#lg-reasons .re-copy{font-size:11px;line-height:1.65;color:var(--lg-muted);margin:11px 0 0;display:block;min-height:73px}#lg-reasons .re-scene{display:flex;flex-direction:column;justify-content:center;min-height:150px;border-radius:11px;background:#eff6fa;margin:17px 0;position:relative;padding:15px 11px;gap:8px}#lg-reasons .re-paper{display:block;background:white;border:1px solid #ddeaf2;border-radius:8px;padding:13px 10px;transform:rotate(-4deg);box-shadow:4px 5px 0 #dcecf7;align-self:center;width:100%;font-size:12px;line-height:1.4}#lg-reasons .re-paper small{display:block;color:var(--lg-muted);font-size:9px;letter-spacing:.8px;margin-bottom:8px}#lg-reasons .re-paper strong{display:block;font-size:14px;font-weight:600;letter-spacing:-.3px}#lg-reasons .re-note{display:block;border-left:2px solid var(--lg-blue);padding:8px 10px;background:white;border-radius:0 6px 6px 0;font-size:11px;line-height:1.4}#lg-reasons .re-screen{background:#0e304a;color:white;border-radius:8px;padding:14px 12px;font-size:14px;line-height:1.3;text-align:center}#lg-reasons .re-screen small{display:block;color:#86cce7;font-size:9px;letter-spacing:.7px;margin-bottom:9px}#lg-reasons .re-dots{display:flex;gap:6px;justify-content:center;margin-top:6px}#lg-reasons .re-dots i{width:19px;height:19px;border-radius:50%;background:#add8ec}#lg-reasons .re-dots i:nth-child(2){background:#73bce0}#lg-reasons .re-dots i:nth-child(3){background:#459dcb}#lg-reasons .re-payoff{font-size:12px;font-weight:600;line-height:1.5;display:block;border-top:1px solid var(--lg-line);padding-top:13px;margin-top:auto}#lg-reasons .re-payoff span{display:block;font-size:10px;color:var(--lg-muted);font-weight:400;margin-top:5px}@media(max-width:560px){#lg-reasons .re-grid{grid-template-columns:1fr}#lg-reasons .re-card{padding:22px}#lg-reasons .re-card[aria-pressed="true"]{transform:none}#lg-reasons .re-copy{min-height:0;font-size:12px}#lg-reasons .re-title{font-size:22px}#lg-reasons .re-scene{min-height:130px}#lg-reasons .re-paper{max-width:260px}}`
const REASON_CAPTIONS = [
  'For the everyday moments in a new home.',
  'For the ideas you’re ready to share.',
  'For the expertise you want others to hear.',
]

export function ReasonsToLearn() {
  const t = useTour({ last: 2 })
  const scene = (i: number, children: ReactNode) => (
    <span key={i === t.index ? `on-${t.nonce}` : 'off'} className={`re-scene${i === t.index && t.animate ? ' lg-enter' : ''}`}>
      {children}
    </span>
  )
  const cards = [
    {
      kicker: 'MAKE YOURSELF AT HOME',
      title: 'Newcomers',
      copy: 'Language for your first appointments, job interviews, and school meetings.',
      scene: (
        <span className="re-paper lg-animate">
          <small>YOUR NEXT APPOINTMENT</small>
          <strong>
            Let’s talk about
            <br />
            what you need.
          </strong>
        </span>
      ),
      payoff: '“I’d like to ask a question.”',
      sub: 'Find your voice in everyday life.',
    },
    {
      kicker: 'STEP INTO YOUR NEXT CHAPTER',
      title: 'International students',
      copy: 'Admission interviews, seminars, and preparation for your IELTS or TOEFL goal.',
      scene: (
        <>
          <span className="re-note lg-animate">Explain your point.</span>
          <span className="re-note lg-animate" style={v({ '--delay': '135ms' })}>
            Build on an idea.
          </span>
          <span className="re-note lg-animate" style={v({ '--delay': '270ms' })}>
            Join the discussion.
          </span>
        </>
      ),
      payoff: '“Here’s how I see it.”',
      sub: 'Bring your ideas into the room.',
    },
    {
      kicker: 'LET YOUR EXPERTISE SPEAK',
      title: 'Professionals',
      copy: 'Lead meetings, present without a script, and handle the questions on a client call.',
      scene: (
        <>
          <span className="re-screen lg-animate">
            <small>YOUR TURN TO PRESENT</small>
            One clear idea.
            <br />
            Your own words.
          </span>
          <span className="re-dots" aria-hidden="true">
            <i className="lg-animate" />
            <i className="lg-animate" style={v({ '--delay': '112ms' })} />
            <i className="lg-animate" style={v({ '--delay': '225ms' })} />
          </span>
        </>
      ),
      payoff: '“Let me walk you through it.”',
      sub: 'Sound like yourself at work.',
    },
  ]
  return (
    <section className="lgx" id="lg-reasons" ref={t.rootRef} aria-label="Your reason for learning" data-paused={t.paused ? 'true' : 'false'}>
      <style>{BASE_CSS + REASONS_CSS}</style>
      <div className="lg-wrap">
        <header className="lg-header">
          <p className="lg-eyebrow">A LANGUAGE. A REASON. YOURS.</p>
          <h2>
            You’re learning for a life.
            <br />
            <span>Let’s start there.</span>
          </h2>
          <p className="lg-intro">A new home, a new chapter, or your next big opportunity. Your reason shapes what you practise.</p>
        </header>
        <div className="re-grid">
          {cards.map((c, i) => (
            <button key={c.title} className="re-card" type="button" aria-pressed={i === t.index} onClick={() => t.go(i)}>
              <span className="re-kicker">{c.kicker}</span>
              <strong className="re-title">{c.title}</strong>
              <span className="re-copy">{c.copy}</span>
              {scene(i, c.scene)}
              <span className="re-payoff">
                {c.payoff}
                <span>{c.sub}</span>
              </span>
            </button>
          ))}
        </div>
        <div className="lg-bottom">
          <span className="lg-status" aria-live="polite">
            {REASON_CAPTIONS[t.index]}
          </span>
          <button className="lg-play" type="button" onClick={t.onControl}>
            {t.label('Play stories ▷')}
          </button>
        </div>
      </div>
    </section>
  )
}

/* ---------------- For Educators: teaching with LinkGlobal ---------------- */

const EDUCATORS_CSS = `#lg-educators .ed-layout{display:grid;grid-template-columns:.9fr 1.1fr;gap:21px}#lg-educators .ed-benefits{display:grid;gap:9px}#lg-educators .ed-benefit{padding:17px;text-align:left;cursor:pointer;background:white;border:1px solid var(--lg-line);border-radius:13px;color:var(--lg-ink);display:flex;gap:11px;align-items:flex-start;transition:border-color .3s,background .3s}#lg-educators .ed-benefit>span:first-child{font-size:10px;color:var(--lg-blue);padding-top:3px}#lg-educators .ed-benefit strong{display:block;font-size:15px;line-height:1.3;font-weight:600;margin-bottom:6px}#lg-educators .ed-benefit small{display:block;font-size:11px;line-height:1.55;color:var(--lg-muted)}#lg-educators .ed-benefit[aria-pressed="true"]{border-color:var(--lg-blue);background:#eaf7ff}#lg-educators .ed-preview{background:#0b2941;border-radius:19px;padding:23px;min-width:0;color:white;display:flex;flex-direction:column;min-height:306px}#lg-educators .ed-top{display:flex;justify-content:space-between;gap:8px;font-size:9px;letter-spacing:1.1px;color:#83cae7;margin-bottom:20px}#lg-educators .ed-demo{flex:1;display:flex;justify-content:center;flex-direction:column;min-height:209px}#lg-educators .ed-demo[hidden]{display:none}#lg-educators .ed-brief{background:#fff;color:#17364f;padding:19px;border-radius:10px;transform:rotate(-2deg)}#lg-educators .ed-brief small{display:block;color:#698296;font-size:9px;letter-spacing:1px;margin-bottom:12px}#lg-educators .ed-brief strong{display:block;font-size:18px;line-height:1.2;margin-bottom:14px;letter-spacing:-.4px}#lg-educators .ed-row{font-size:11px;line-height:1.5;display:block;border-top:1px solid #e1ebf3;padding:8px 0}#lg-educators .ed-row b{font-weight:600;color:#149ace;margin-right:6px}#lg-educators .ed-world{position:relative;text-align:center;min-height:210px;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:22px}#lg-educators .ed-you{padding:16px 23px;border-radius:40px;border:1px solid #5290ab;background:#153d56;font-size:16px;box-shadow:0 0 0 7px #35c7f508}#lg-educators .ed-learners{display:flex;gap:7px;flex-wrap:wrap;justify-content:center}#lg-educators .ed-learner{background:#1e4962;border-radius:8px;padding:11px 10px;color:#d8effb;font-size:11px;line-height:1.2}#lg-educators .ed-world-note{font-size:11px;color:#a9c9dc;line-height:1.5;max-width:190px;margin:0}#lg-educators .ed-calendar{background:#fff;border-radius:12px;color:#17364f;padding:17px}#lg-educators .ed-calendar strong{font-size:15px;display:block;margin-bottom:13px}#lg-educators .ed-slots{display:grid;grid-template-columns:repeat(3,1fr);gap:7px}#lg-educators .ed-slot{cursor:pointer;font-size:11px;background:#f0f6fa;border:1px solid #e0eaf0;border-radius:7px;padding:9px 4px;color:#557184;min-height:47px;transition:background .225s,color .225s,transform .225s}#lg-educators .ed-slot small{display:block;font-size:9px;margin-bottom:4px}#lg-educators .ed-slot[aria-pressed="true"]{background:#dff5ff;color:#066592;border-color:#55bce8;transform:translateY(-2px)}#lg-educators .ed-slot:focus-visible{outline:2px solid #35c7f7;outline-offset:2px}#lg-educators .ed-availability{display:block;font-size:10px;color:#567488;margin:11px 0 0;line-height:1.5}#lg-educators .ed-preview-note{font-size:9px;color:#85a9bd;text-align:center;margin-top:17px}@media(max-width:560px){#lg-educators .ed-layout{grid-template-columns:1fr}#lg-educators .ed-benefit{padding:16px}#lg-educators .ed-preview{min-height:310px}}`
const ED_CAPTIONS = [
  'Arrive with your learner’s goals already in view.',
  'Bring your expertise to people with different stories.',
  'Try the sample times. Choose what fits your week.',
]
const SLOTS = [
  ['MON', '09:00'],
  ['TUE', '14:00'],
  ['WED', '10:00'],
  ['THU', '16:00'],
  ['FRI', '09:00'],
  ['SAT', '11:00'],
]

export function TeachingWithLinkGlobal() {
  const t = useTour({ last: 2 })
  const [availability, setAvailability] = useState([false, true, false, true, false, false])
  const benefits = [
    ['Arrive ready to teach.', 'Your learner’s goals and focus are already in the brief.'],
    ['Meet a world of learners.', 'Newcomers, students, and professionals, wherever you’re based.'],
    ['Make it fit your life.', 'Set your own availability. Keep your schedule yours.'],
  ]
  const enter = t.animate ? ' lg-enter' : ''
  return (
    <section className="lgx" id="lg-educators" ref={t.rootRef} aria-label="Why teach with LinkGlobal" data-paused={t.paused ? 'true' : 'false'}>
      <style>{BASE_CSS + EDUCATORS_CSS}</style>
      <div className="lg-wrap">
        <header className="lg-header">
          <p className="lg-eyebrow">WHY TEACH WITH LINKGLOBAL</p>
          <h2>
            Bring your expertise.
            <br />
            <span>We’ll bring the context.</span>
          </h2>
          <p className="lg-intro">
            Know who you’re teaching, connect with learners around the world, and make room for work on your terms.
          </p>
        </header>
        <div className="ed-layout">
          <div className="ed-benefits" role="group" aria-label="Explore educator benefits">
            {benefits.map(([title, sub], i) => (
              <button key={title} type="button" className="ed-benefit" aria-pressed={i === t.index} onClick={() => t.go(i)}>
                <span>0{i + 1}</span>
                <span>
                  <strong>{title}</strong>
                  <small>{sub}</small>
                </span>
              </button>
            ))}
          </div>
          <div className="ed-preview">
            <div className="ed-top">
              <span>A LOOK INSIDE</span>
              <span>LINKGLOBAL</span>
            </div>
            {t.index === 0 && (
              <div key={t.nonce} className={`ed-demo${enter}`}>
                <div className="ed-brief lg-animate">
                  <small>BEFORE YOUR LESSON</small>
                  <strong>
                    You know where
                    <br />
                    to begin.
                  </strong>
                  <span className="ed-row lg-animate" style={v({ '--delay': '112ms' })}>
                    <b>Goal</b> Lead a meeting in English
                  </span>
                  <span className="ed-row lg-animate" style={v({ '--delay': '225ms' })}>
                    <b>Focus</b> Explain and clarify ideas
                  </span>
                  <span className="ed-row lg-animate" style={v({ '--delay': '338ms' })}>
                    <b>Practice</b> Respond to follow-up questions
                  </span>
                </div>
              </div>
            )}
            {t.index === 1 && (
              <div key={t.nonce} className={`ed-demo${enter}`}>
                <div className="ed-world">
                  <div className="ed-learners">
                    <span className="ed-learner lg-animate">Newcomers</span>
                    <span className="ed-learner lg-animate" style={v({ '--delay': '112ms' })}>
                      Students
                    </span>
                    <span className="ed-learner lg-animate" style={v({ '--delay': '225ms' })}>
                      Professionals
                    </span>
                  </div>
                  <div className="ed-you lg-animate" style={v({ '--delay': '338ms' })}>
                    Your expertise
                  </div>
                  <p className="ed-world-note">
                    Different lives.
                    <br />A shared reason to learn.
                  </p>
                </div>
              </div>
            )}
            {t.index === 2 && (
              <div key={t.nonce} className={`ed-demo${enter}`}>
                <div className="ed-calendar lg-animate">
                  <strong>Your week. Your availability.</strong>
                  <div className="ed-slots" role="group" aria-label="Try sample availability">
                    {SLOTS.map(([day, time], i) => (
                      <button
                        key={day}
                        type="button"
                        className="ed-slot"
                        aria-pressed={availability[i]}
                        onClick={() => {
                          setAvailability((a) => a.map((x, j) => (j === i ? !x : x)))
                          t.go(2, false, false)
                        }}
                      >
                        <small>{day}</small>
                        {time}
                      </button>
                    ))}
                  </div>
                  <span className="ed-availability" aria-live="polite">
                    {availability.filter(Boolean).length} sample times selected. Try changing them.
                  </span>
                </div>
              </div>
            )}
            <div className="ed-preview-note">
              {t.index === 2 ? 'Interactive sample · No schedule is being saved' : 'Illustrative preview'}
            </div>
          </div>
        </div>
        <div className="lg-bottom">
          <span className="lg-status" aria-live="polite">
            {ED_CAPTIONS[t.index]}
          </span>
          <button className="lg-play" type="button" onClick={t.onControl}>
            {t.label('Play preview ▷')}
          </button>
        </div>
      </div>
    </section>
  )
}

/* ---------------- For You: conversation connections ---------------- */

const CONNECTIONS_CSS = `#lg-connections .co-options{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin-bottom:19px}#lg-connections .co-option{padding:15px 12px;border-radius:12px;background:white;border:1px solid var(--lg-line);color:var(--lg-ink);text-align:left;transition:background .225s,border-color .225s}#lg-connections .co-option strong{font-size:13px;display:block;margin-bottom:5px}#lg-connections .co-option small{font-size:10px;line-height:1.5;color:var(--lg-muted);display:block}#lg-connections .co-option[aria-pressed="true"]{background:#eaf7ff;border-color:var(--lg-blue)}#lg-connections .co-stage{background:white;border-radius:20px;padding:25px 26px 21px;box-shadow:0 12px 35px #254e7608}#lg-connections .co-example{font-size:9px;color:var(--lg-muted);letter-spacing:1.2px;text-align:center;margin:0 0 20px}#lg-connections .co-match{display:grid;grid-template-columns:1fr 1fr 1fr;align-items:center;gap:6px;position:relative}#lg-connections .co-person{text-align:center;position:relative;z-index:2}#lg-connections .co-avatar{width:55px;height:55px;border-radius:50%;display:grid;place-items:center;margin:0 auto 10px;background:#e6f5ff;color:#0c80b4;font-weight:600;font-size:12px;box-shadow:0 0 0 5px white}#lg-connections .co-person:last-child .co-avatar{background:#e3f4ed;color:#178469}#lg-connections .co-person strong{display:block;font-size:12px;font-weight:600;line-height:1.4}#lg-connections .co-person small{display:block;font-size:10px;color:var(--lg-muted);margin-top:5px;line-height:1.45;min-height:28px}#lg-connections .co-bridge{align-self:start;margin-top:26px;height:1px;background:#bddeee;position:relative}#lg-connections .co-bridge:before{content:'';position:absolute;inset:0;background:var(--lg-blue);transform:scaleX(1);transform-origin:left}#lg-connections .co-topic{position:absolute;top:0;left:50%;transform:translate(-50%,-50%);background:#eff8fd;color:#0b7bad;border:5px solid white;padding:7px 12px;border-radius:30px;font-size:10px;white-space:nowrap;z-index:1}#lg-connections .co-dialogue{display:flex;flex-direction:column;gap:9px;max-width:430px;margin:21px auto 0;min-height:96px;justify-content:center}#lg-connections .co-bubble{padding:12px 15px;background:#edf4f8;color:var(--lg-ink);border-radius:13px 13px 13px 3px;font-size:13px;line-height:1.4;max-width:88%;align-self:flex-start}#lg-connections .co-bubble.co-answer{background:var(--lg-blue);color:white;border-radius:13px 13px 3px 13px;align-self:flex-end}#lg-connections .co-stage.lg-enter .co-bridge:before{animation:co-connect .675s ease both}@keyframes co-connect{from{transform:scaleX(0)}to{transform:scaleX(1)}}#lg-connections .co-footer{text-align:center;border-top:1px solid var(--lg-line);padding-top:18px;margin-top:8px}#lg-connections .co-footer strong{font-size:14px;font-weight:600;display:block;line-height:1.4}#lg-connections .co-footer p{font-size:11px;color:var(--lg-muted);margin:7px 0 0}@media(max-width:540px){#lg-connections .co-options{grid-template-columns:1fr;gap:8px}#lg-connections .co-option{padding:13px 15px}#lg-connections .co-stage{padding:23px 16px}#lg-connections .co-match{grid-template-columns:1fr 58px 1fr}#lg-connections .co-person strong{font-size:11px}#lg-connections .co-topic{font-size:9px;padding:5px 7px}#lg-connections .co-bubble{font-size:12px}#lg-connections .co-person small{min-height:36px}}`
const EXAMPLES = [
  {
    name: 'Your profession',
    sub: 'Someone who understands your field.',
    topic: 'Design',
    you: 'You work in design.',
    them: 'They work in design, too.',
    question: 'What are you working on lately?',
    answer: 'A new brand. I’m still exploring the colours.',
  },
  {
    name: 'Your destination',
    sub: 'Someone who knows where you’re going.',
    topic: 'New city',
    you: 'You’re moving somewhere new.',
    them: 'They’ve lived where you’re going.',
    question: 'What are you looking forward to most?',
    answer: 'Finding a neighbourhood that feels like home.',
  },
  {
    name: 'Your interests',
    sub: 'Someone who’s into what you’re into.',
    topic: 'Music',
    you: 'You love live music.',
    them: 'They always have a gig to recommend.',
    question: 'What’s the best concert you’ve been to?',
    answer: 'A tiny show last summer. I still think about it.',
  },
]
const CO_CAPTIONS = [
  'Talk shop with someone who gets your work.',
  'Get to know a place through someone who knows it.',
  'Follow a shared interest into a real conversation.',
]

export function ConversationConnections({ id }: { id?: string }) {
  const t = useTour({ last: 2 })
  const e = EXAMPLES[t.index]
  return (
    <section className="lgx" id="lg-connections" ref={t.rootRef} aria-label="Conversation partners for your world" data-paused={t.paused ? 'true' : 'false'}>
      <style>{BASE_CSS + CONNECTIONS_CSS}</style>
      {id && <div id={id} className="relative -top-24" aria-hidden="true" />}
      <div className="lg-wrap">
        <header className="lg-header">
          <p className="lg-eyebrow">FOR LEARNERS · REAL CONVERSATION</p>
          <h2>
            A shared interest.
            <br />
            <span>A reason to keep talking.</span>
          </h2>
          <p className="lg-intro">Meet someone who lives the language, and has something in common with your world.</p>
        </header>
        <div className="co-options" role="group" aria-label="Explore conversation connections">
          {EXAMPLES.map((x, i) => (
            <button key={x.name} type="button" className="co-option" aria-pressed={i === t.index} onClick={() => t.go(i)}>
              <strong>{x.name}</strong>
              <small>{x.sub}</small>
            </button>
          ))}
        </div>
        <div key={t.nonce} className={`co-stage${t.animate ? ' lg-enter' : ''}`}>
          <div className="co-example">AN EXAMPLE OF A CONNECTION</div>
          <div className="co-match">
            <div className="co-person">
              <div className="co-avatar">You</div>
              <strong>A little common ground</strong>
              <small>{e.you}</small>
            </div>
            <div className="co-bridge" aria-hidden="true">
              <span className="co-topic">{e.topic}</span>
            </div>
            <div className="co-person">
              <div className="co-avatar">Hello</div>
              <strong>A conversation partner</strong>
              <small>{e.them}</small>
            </div>
          </div>
          <div className="co-dialogue">
            <div className="co-bubble lg-animate" style={v({ '--delay': '188ms' })}>
              {e.question}
            </div>
            <div className="co-bubble co-answer lg-animate" style={v({ '--delay': '600ms' })}>
              {e.answer}
            </div>
          </div>
        </div>
        <div className="lg-bottom">
          <span className="lg-status" aria-live="polite">
            {CO_CAPTIONS[t.index]}
          </span>
          <button className="lg-play" type="button" onClick={t.onControl}>
            {t.label('Explore examples ▷')}
          </button>
        </div>
        <div className="co-footer">
          <strong>Real people. Something to talk about.</strong>
          <p>No lesson plan. No assessment. No correction.</p>
        </div>
      </div>
    </section>
  )
}

/* ---------------- About: from study to speaking ---------------- */

const STUDY_CSS = `#lg-speaking-gap .ga-stage{border:1px solid var(--lg-line);background:var(--lg-panel);border-radius:21px;padding:27px 26px 20px;position:relative;box-shadow:0 12px 35px #254e7608}#lg-speaking-gap .ga-top{display:flex;justify-content:space-between;gap:13px;align-items:center}#lg-speaking-gap .ga-label{font-size:10px;letter-spacing:1.1px;color:var(--lg-muted);line-height:1.5}#lg-speaking-gap .ga-dots{display:flex;gap:6px}#lg-speaking-gap .ga-dots span{width:6px;height:6px;background:#d9e8f2;border-radius:50%;transition:background .3s}#lg-speaking-gap .ga-dots span.ga-active{background:var(--lg-blue)}#lg-speaking-gap .ga-scene{min-height:218px;display:flex;flex-direction:column;justify-content:center;gap:17px;max-width:520px;margin:auto;padding:25px 0 8px}#lg-speaking-gap .ga-words{position:relative;display:flex;justify-content:center;gap:7px;flex-wrap:wrap;padding:23px 14px;isolation:isolate;align-self:stretch}#lg-speaking-gap .ga-words:before{content:'';position:absolute;inset:0;background:var(--lg-blue);border-radius:18px 18px 3px 18px;z-index:-1;opacity:0;transform:scale(.9);transition:opacity .525s,transform .525s}#lg-speaking-gap .ga-word{font-size:19px;line-height:1.4;font-weight:500;letter-spacing:-.4px;padding:7px 10px;background:#f1f7fb;border-radius:8px;box-shadow:0 3px 0 #dceaf4;transform:translateY(var(--shift)) rotate(var(--tilt));transition:transform .6s cubic-bezier(.2,.8,.2,1),color .525s,background .525s,box-shadow .525s,padding .525s;color:var(--lg-ink)}#lg-speaking-gap[data-step="1"] .ga-word,#lg-speaking-gap[data-step="2"] .ga-word{transform:translateY(0) rotate(0);background:transparent;box-shadow:none;color:white;padding:7px 1px}#lg-speaking-gap[data-step="1"] .ga-words:before,#lg-speaking-gap[data-step="2"] .ga-words:before{opacity:1;transform:scale(1)}#lg-speaking-gap .ga-reply{align-self:flex-start;padding:13px 17px;background:#eaf3f8;font-size:15px;line-height:1.5;border-radius:14px 14px 14px 3px;color:var(--lg-ink);opacity:0;transform:translateY(12px);transition:opacity .45s,transform .45s}#lg-speaking-gap[data-step="2"] .ga-reply{opacity:1;transform:translateY(0)}#lg-speaking-gap .ga-caption{text-align:center;font-size:12px;color:var(--lg-muted);line-height:1.5;min-height:36px;margin:0}#lg-speaking-gap .ga-marks{display:flex;justify-content:center;gap:16px;flex-wrap:wrap;border-top:1px solid var(--lg-line);padding-top:17px;margin-top:12px;color:var(--lg-muted);font-size:10px;line-height:1.5}#lg-speaking-gap .ga-marks span{display:flex;align-items:center;gap:6px}#lg-speaking-gap .ga-marks i{font-style:normal;color:var(--lg-blue)}#lg-speaking-gap .ga-ending{text-align:center;font-size:13px;color:var(--lg-ink);margin:10px auto 0;max-width:450px;line-height:1.6}#lg-speaking-gap .ga-ending strong{font-weight:600}@media(max-width:540px){#lg-speaking-gap .ga-stage{padding:22px 15px 18px}#lg-speaking-gap .ga-word{font-size:16px;padding:6px 7px}#lg-speaking-gap .ga-words{gap:5px;padding:22px 10px}#lg-speaking-gap .ga-scene{min-height:230px}#lg-speaking-gap .ga-reply{font-size:13px}}`
const GA_CAPTIONS = [
  'Familiar words. Waiting to become your words.',
  'You put them together. You take your turn.',
  'An invitation. An answer. A real connection.',
]
const GA_STATUS = ['Start with the words you already know.', 'Bring them into a conversation.', 'Let the conversation take you somewhere.']
const WORDS: [string, string, string][] = [
  ['Would you', '-8px', '-5deg'],
  ['like to', '9px', '4deg'],
  ['grab', '-5px', '-3deg'],
  ['a coffee?', '7px', '5deg'],
]

export function FromStudyToSpeaking() {
  const t = useTour({ last: 2, reducedInitial: 2 })
  return (
    <section
      className="lgx"
      id="lg-speaking-gap"
      ref={t.rootRef}
      aria-label="From study to conversation"
      data-step={t.index}
      data-paused={t.paused ? 'true' : 'false'}
    >
      <style>{BASE_CSS + STUDY_CSS}</style>
      <div className="lg-wrap">
        <header className="lg-header">
          <p className="lg-eyebrow">WHERE STUDY BECOMES LIFE</p>
          <h2>
            You know the words.
            <br />
            <span>Give them somewhere to go.</span>
          </h2>
          <p className="lg-intro">Streaks, points, and levels can keep you practising. A real conversation gives that practice a purpose.</p>
        </header>
        <div className="ga-stage">
          <div className="ga-top">
            <span className="ga-label">FROM WORDS TO A MOMENT</span>
            <div className="ga-dots" aria-hidden="true">
              {[0, 1, 2].map((i) => (
                <span key={i} className={i <= t.index ? 'ga-active' : ''} />
              ))}
            </div>
          </div>
          <div className="ga-scene">
            <div className="ga-words" aria-label="Would you like to grab a coffee?">
              {WORDS.map(([w, shift, tilt]) => (
                <span key={w} className="ga-word" style={v({ '--shift': shift, '--tilt': tilt })}>
                  {w}
                </span>
              ))}
            </div>
            <div className="ga-reply">I’d love to. How about tomorrow?</div>
          </div>
          <p className="ga-caption">{GA_CAPTIONS[t.index]}</p>
          <div className="ga-marks">
            <span>
              <i>✓</i> Keep the habit
            </span>
            <span>
              <i>→</i> Take a speaking turn
            </span>
            <span>
              <i>↗</i> Make a connection
            </span>
          </div>
        </div>
        <div className="lg-bottom">
          <span className="lg-status" aria-live="polite">
            {GA_STATUS[t.index]}
          </span>
          <button className="lg-play" type="button" onClick={t.onControl}>
            {t.label('See it happen ▷')}
          </button>
        </div>
        <p className="ga-ending">
          A conversation starts with a few words.
          <br />
          <strong>What happens next is why you learned them.</strong>
        </p>
      </div>
    </section>
  )
}
