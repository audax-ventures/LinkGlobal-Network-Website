import { useCallback, useEffect, useRef, useState } from 'react'

// "The philosophy" block — ported from Riley's supplied design
// (~/Desktop/philosophy-section.html): text column + an animated scene where
// the AI brings three people into the learner's circle, lines draw in, then
// chat bubbles appear. Same CSS and timings as the source; the site's font is
// used instead of Arial, and it sits on the surrounding NavyBand background.
// Auto-plays once when 30% visible; Play / Pause / Replay button; reduced
// motion shows the final state.

const LABELS = ['It starts with you.', 'AI brings people into your circle.', 'People bring your language to life.']

const CSS = `
#people-philosophy{--pp-accent:#37c5f6;--pp-ink:#f5f9ff;--pp-muted:#a8bdd1;color:var(--pp-ink);padding:8px 0 0;position:relative;isolation:isolate}
#people-philosophy *{box-sizing:border-box}
#people-philosophy:before{content:'';position:absolute;z-index:-1;inset:0;background:radial-gradient(ellipse at 81% 45%,#10466870,transparent 54%)}
#people-philosophy .pp-layout{display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:16px;max-width:1040px;margin:auto}
#people-philosophy .pp-eyebrow{font-size:12px;letter-spacing:.3em;font-weight:600;text-transform:uppercase;color:var(--pp-accent);margin:0 0 21px}
#people-philosophy h2{font-size:clamp(32px,4.6vw,43px);line-height:1.08;letter-spacing:-1.5px;font-weight:800;margin:0;color:var(--pp-ink)}
#people-philosophy h2 span{display:block;color:var(--pp-accent);margin-top:7px}
#people-philosophy .pp-copy{font-size:14px;line-height:1.75;color:var(--pp-muted);margin:22px 0 0;max-width:330px}
#people-philosophy .pp-signature{display:flex;gap:8px;align-items:center;color:#deedf8;font-size:11px;margin-top:25px}
#people-philosophy .pp-signature:before{content:'';width:22px;height:1px;background:var(--pp-accent)}
#people-philosophy .pp-visual{min-width:0}
#people-philosophy .pp-scene{position:relative;aspect-ratio:1/1.06;width:100%;max-width:410px;margin:0 auto}
#people-philosophy .pp-orbit{position:absolute;width:77%;height:73%;border:1px solid #29476080;border-radius:50%;left:11.5%;top:14%}
#people-philosophy .pp-orbit.pp-inner{width:49%;height:46%;left:25.5%;top:27.5%;border-style:dashed;border-color:#29476065}
#people-philosophy .pp-connections{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
#people-philosophy .pp-connections path{fill:none;stroke:var(--pp-accent);stroke-width:.4;stroke-dasharray:160;stroke-dashoffset:160;opacity:.6;transition:stroke-dashoffset 1.3s ease}
#people-philosophy[data-step="1"] .pp-connections path,#people-philosophy[data-step="2"] .pp-connections path{stroke-dashoffset:0}
#people-philosophy .pp-person{position:absolute;display:flex;align-items:center;flex-direction:column;width:74px;transform:translate(-50%,-50%);transition:left 1.3s ease,top 1.3s ease;z-index:2}
#people-philosophy .pp-one{left:14%;top:23%}
#people-philosophy .pp-two{left:86%;top:29%}
#people-philosophy .pp-three{left:73%;top:88%}
#people-philosophy[data-step="1"] .pp-one,#people-philosophy[data-step="2"] .pp-one{left:22%;top:28%}
#people-philosophy[data-step="1"] .pp-two,#people-philosophy[data-step="2"] .pp-two{left:81%;top:34%}
#people-philosophy[data-step="1"] .pp-three,#people-philosophy[data-step="2"] .pp-three{left:66%;top:81%}
#people-philosophy .pp-person-label{font-size:11px;color:#c1d3e2;margin-top:8px;white-space:nowrap}
#people-philosophy .pp-portrait{width:57px;height:57px;position:relative;border-radius:50%;overflow:hidden;background:#bce4ea;border:3px solid #0d2c44;box-shadow:0 0 0 1px #47677d;--skin:#d89b73;--hair:#43302b;--shirt:#d99160}
#people-philosophy .pp-two .pp-portrait{background:#e3d4c8;--skin:#ae7658;--hair:#302620;--shirt:#7777b6}
#people-philosophy .pp-three .pp-portrait{background:#c8d3ec;--skin:#e8b58c;--hair:#7a4932;--shirt:#548a78}
#people-philosophy .pp-hair{position:absolute;left:14px;top:7px;width:27px;height:35px;border-radius:48% 48% 30% 30%;background:var(--hair)}
#people-philosophy .pp-face{position:absolute;left:18px;top:13px;width:20px;height:25px;border-radius:40% 42% 48% 48%;background:var(--skin);transform:rotate(-5deg)}
#people-philosophy .pp-face:after{content:'';position:absolute;width:6px;height:3px;border-bottom:1px solid #623d32;border-radius:50%;left:8px;top:17px}
#people-philosophy .pp-shirt{position:absolute;left:7px;top:36px;width:43px;height:34px;border-radius:50% 50% 0 0;background:var(--shirt)}
#people-philosophy .pp-two .pp-hair{height:23px;width:30px;left:12px;top:6px}
#people-philosophy .pp-three .pp-hair{height:40px;width:34px;left:10px}
#people-philosophy .pp-you{position:absolute;left:48%;top:54%;transform:translate(-50%,-50%);width:78px;height:78px;border-radius:50%;background:#0c314e;border:1px solid #49c9f599;box-shadow:0 0 0 9px #39bde90a,0 0 40px #25aeec18;display:grid;place-content:center;text-align:center;z-index:3}
#people-philosophy .pp-you strong{font-size:19px;font-weight:600}
#people-philosophy .pp-you small{font-size:9px;color:#9dcce0;margin-top:4px;letter-spacing:1px}
#people-philosophy .pp-message{position:absolute;font-size:12px;line-height:1.4;white-space:nowrap;padding:9px 13px;background:#f2f8fc;color:#15314b;border-radius:12px 12px 12px 2px;box-shadow:0 8px 24px #0002;opacity:0;transform:translateY(10px) scale(.94);transition:opacity .5s,transform .7s;z-index:5}
#people-philosophy .pp-hello{left:28%;top:0%}
#people-philosophy .pp-response{right:1%;top:51%;background:#34c5f4;color:#05213a;border-radius:12px 12px 2px 12px}
#people-philosophy .pp-welcome{left:1%;top:76%}
#people-philosophy[data-step="2"] .pp-message{opacity:1;transform:translateY(0) scale(1)}
#people-philosophy[data-step="2"] .pp-response{transition-delay:.65s}
#people-philosophy[data-step="2"] .pp-welcome{transition-delay:1.3s}
#people-philosophy .pp-ai{position:absolute;left:0;top:49%;font-size:9px;letter-spacing:1px;color:#7fabca;transition:opacity 1s}
#people-philosophy[data-step="2"] .pp-ai{opacity:.45}
#people-philosophy .pp-controls{display:flex;justify-content:space-between;align-items:center;gap:8px;min-height:44px;border-top:1px solid #23415b;max-width:410px;margin:auto}
#people-philosophy .pp-status{font-size:11px;color:#b4c8da;display:flex;align-items:center;gap:7px}
#people-philosophy .pp-status:before{content:'';width:5px;height:5px;border-radius:50%;background:var(--pp-accent);flex-shrink:0}
#people-philosophy .pp-button{border:0;background:transparent;color:var(--pp-accent);font-size:11px;padding:12px 0 12px 8px;min-height:44px;white-space:nowrap;cursor:pointer}
#people-philosophy .pp-button:focus-visible{outline:2px solid var(--pp-accent);outline-offset:3px}
#people-philosophy .pp-footer{max-width:1040px;margin:30px auto 0;padding-top:19px;border-top:1px solid #23415b;display:flex;justify-content:space-between;gap:12px;font-size:10px;color:#8eabc2;letter-spacing:.2px}
#people-philosophy .pp-footer strong{color:#c5daeb;font-weight:400}
@media(min-width:900px){#people-philosophy h2{font-size:49px}#people-philosophy .pp-copy{font-size:16px;max-width:380px}}
@media(max-width:620px){#people-philosophy .pp-layout{grid-template-columns:1fr;gap:18px}#people-philosophy h2{font-size:37px;max-width:370px}#people-philosophy .pp-copy{max-width:390px;margin-top:18px}#people-philosophy .pp-scene{max-width:340px}#people-philosophy .pp-footer{margin-top:18px;flex-wrap:wrap}#people-philosophy .pp-signature{margin-top:18px}}
@media(prefers-reduced-motion:reduce){#people-philosophy *,#people-philosophy *:before{transition:none!important;animation:none!important}}
`

function Person({ cls, label }: { cls: string; label: string }) {
  return (
    <div className={`pp-person ${cls}`}>
      <div className="pp-portrait" aria-hidden="true">
        <span className="pp-hair" />
        <span className="pp-face" />
        <span className="pp-shirt" />
      </div>
      <span className="pp-person-label">{label}</span>
    </div>
  )
}

export default function PeoplePhilosophy() {
  const rootRef = useRef<HTMLElement>(null)
  const timer = useRef<number | undefined>(undefined)
  const [step, setStep] = useState(0)
  const [running, setRunning] = useState(false)
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const stepRef = useRef(0)
  const go = useCallback((n: number) => {
    stepRef.current = n
    setStep(n)
  }, [])

  const stop = useCallback(() => {
    window.clearTimeout(timer.current)
    setRunning(false)
  }, [])

  // Same timings as the source: first move after 1s (or 1.8s when resuming
  // from the middle), then 2.2s to the chat step, which holds 2.6s.
  const advanceIn = useCallback(
    (delay: number) => {
      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => {
        const next = stepRef.current + 1
        go(next)
        if (next < 2) advanceIn(2200)
        else timer.current = window.setTimeout(() => setRunning(false), 2600)
      }, delay)
    },
    [go],
  )

  const play = useCallback(() => {
    if (reduced) {
      go(2)
      stop()
      return
    }
    if (stepRef.current === 2) go(0)
    setRunning(true)
    advanceIn(stepRef.current === 0 ? 1000 : 1800)
  }, [advanceIn, go, reduced, stop])

  useEffect(() => {
    if (reduced) {
      go(2)
      return
    }
    const el = rootRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          play()
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      window.clearTimeout(timer.current)
    }
  }, [go, play, reduced])

  const buttonLabel = running ? 'Pause Ⅱ' : step === 2 ? 'Replay ↻' : 'Play animation ↗'

  return (
    <section id="people-philosophy" ref={rootRef} data-step={step} aria-label="Our philosophy">
      <style>{CSS}</style>
      <div className="pp-layout">
        <div className="pp-text">
          <p className="pp-eyebrow">The philosophy</p>
          <h2>
            Powered by technology.<span>Built around people.</span>
          </h2>
          <p className="pp-copy">Technology helps you learn the words. People give you the confidence to use them.</p>
          <p className="pp-copy">Our AI brings those people into your world. The connection you make is human.</p>
          <div className="pp-signature">A little technology. A lot more connection.</div>
        </div>
        <div className="pp-visual" aria-label="Animation showing AI connecting a learner with people for real conversations">
          <div className="pp-scene">
            <div className="pp-orbit" aria-hidden="true" />
            <div className="pp-orbit pp-inner" aria-hidden="true" />
            <svg className="pp-connections" viewBox="0 0 100 106" aria-hidden="true">
              <path d="M48 57 Q24 55 22 30" />
              <path d="M48 57 Q76 62 81 36" />
              <path d="M48 57 Q44 79 66 86" />
            </svg>
            <div className="pp-ai">AI CONNECTS</div>
            <div className="pp-you">
              <strong>You</strong>
              <small>AT THE CENTER</small>
            </div>
            <Person cls="pp-one" label="A new perspective" />
            <Person cls="pp-two" label="A shared interest" />
            <Person cls="pp-three" label="A familiar face" />
            <div className="pp-message pp-hello" lang="es">
              ¡Hola! ¿Cómo estás?
            </div>
            <div className="pp-message pp-response" lang="es">
              ¡Bien! ¿Y tú?
            </div>
            <div className="pp-message pp-welcome">You’re doing great.</div>
          </div>
          <div className="pp-controls">
            <span className="pp-status" aria-live="polite">
              {LABELS[step]}
            </span>
            <button type="button" className="pp-button" onClick={() => (running ? stop() : play())}>
              {buttonLabel}
            </button>
          </div>
        </div>
      </div>
      <div className="pp-footer">
        <span>TECHNOLOGY IN THE BACKGROUND.</span>
        <strong>Real people. Real conversations. Real confidence.</strong>
      </div>
    </section>
  )
}
