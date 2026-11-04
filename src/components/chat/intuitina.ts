// Bridges the mascot button (ChatWidget.tsx) and the Intuitina chatbot that
// the script at the end of index.html loads.
//
// Intuitina's widget brings its own launcher icon, and has no documented way
// to hide it or open the chat from our own button. Its icon lives inside an
// iframe from Intuitina's site, which this page isn't allowed to click into.
// So instead (see the [data-lg-*] rules in index.css):
// - Everything the widget adds to the page is tagged and kept hidden, so only
//   the mascot shows.
// - While the chat is closed, the widget's small launcher iframe is made
//   invisible and placed exactly over the mascot. A click on the mascot lands
//   on Intuitina's own icon, so the chat opens in one click.
// - While the chat window is open, the widget shows normally and the mascot
//   steps aside. Once it's closed again, the mascot returns.

const WIDGET_SCRIPT = 'script[src*="chat.intuitina.com"]'
const TAG = 'data-lg-intuitina'
const FRAME_ATTR = 'data-lg-launcher-frame'
const OPEN_ATTR = 'data-lg-chat-open'
const PASS_ATTR = 'data-lg-chat-passthrough'
const HOVER_ATTR = 'data-lg-chat-hover'
// An open chat window is bigger than this in both directions; a launcher icon
// is smaller.
const OPEN_MIN_PX = 180
const POLL_MS = 300

const SKIP = new Set(['SCRIPT', 'STYLE', 'LINK', 'NOSCRIPT', 'TEMPLATE', 'META'])

let poll: number | undefined
let sawWindow = false
const hoverWired = new WeakSet<Element>()

function tagged(): HTMLElement[] {
  return Array.from(document.querySelectorAll<HTMLElement>(`[${TAG}]`))
}

function frames(): HTMLIFrameElement[] {
  return tagged().flatMap((el) =>
    el instanceof HTMLIFrameElement ? [el] : Array.from(el.querySelectorAll('iframe')),
  )
}

function size(el: Element) {
  const r = el.getBoundingClientRect()
  return { w: r.width, h: r.height }
}

function isBig(el: Element) {
  const { w, h } = size(el)
  return w > OPEN_MIN_PX && h > OPEN_MIN_PX
}

function isLauncherSized(el: Element) {
  const { w, h } = size(el)
  return w > 0 && h > 0 && w <= OPEN_MIN_PX && h <= OPEN_MIN_PX
}

// True when an open chat window is showing: an iframe, or a widget element
// without an iframe of its own, larger than a launcher icon.
function chatWindowShowing(): boolean {
  return tagged().some((el) => {
    const inner = el instanceof HTMLIFrameElement ? [el] : Array.from(el.querySelectorAll('iframe'))
    return inner.length ? inner.some(isBig) : isBig(el)
  })
}

function update() {
  const root = document.documentElement

  if (chatWindowShowing()) {
    sawWindow = true
    root.setAttribute(OPEN_ATTR, '')
  } else if (sawWindow) {
    sawWindow = false
    root.removeAttribute(OPEN_ATTR)
  }

  // Put the closed-state launcher iframe, invisible, over the mascot.
  const mascot = document.querySelector('.lg-chat-launcher')
  const all = frames()
  const target = !root.hasAttribute(OPEN_ATTR) && mascot ? all.find(isLauncherSized) : undefined
  all.forEach((f) => f.toggleAttribute(FRAME_ATTR, f === target))
  root.toggleAttribute(PASS_ATTR, !!target)
  if (!target || !mascot) {
    root.removeAttribute(HOVER_ATTR)
    return
  }

  const m = mascot.getBoundingClientRect()
  const { w, h } = size(target)
  root.style.setProperty('--lg-frame-left', `${m.left + m.width / 2 - w / 2}px`)
  root.style.setProperty('--lg-frame-top', `${m.top + m.height / 2 - h / 2}px`)

  // The mascot can't see the pointer through the iframe, so pass hover on.
  if (!hoverWired.has(target)) {
    hoverWired.add(target)
    target.addEventListener('mouseenter', () => root.setAttribute(HOVER_ATTR, ''))
    target.addEventListener('mouseleave', () => root.removeAttribute(HOVER_ATTR))
  }
}

function tagIfWidget(node: Node) {
  if (!(node instanceof HTMLElement) || SKIP.has(node.tagName) || node.id === 'root') return
  // Only nodes added after the Intuitina script is on the page are its own.
  if (!document.querySelector(WIDGET_SCRIPT)) return
  node.setAttribute(TAG, '')
  if (poll === undefined) poll = window.setInterval(update, POLL_MS)
  update()
}

if (typeof window !== 'undefined' && typeof MutationObserver !== 'undefined') {
  const observer = new MutationObserver((records) => {
    for (const r of records) r.addedNodes.forEach(tagIfWidget)
  })
  observer.observe(document.documentElement, { childList: true })
  if (document.body) observer.observe(document.body, { childList: true })
  else document.addEventListener('DOMContentLoaded', () => observer.observe(document.body, { childList: true }))
}

// Clicks the widget's own launcher when it lives on the page rather than
// inside the widget's iframe.
function clickLauncher() {
  for (const el of tagged()) {
    if (el instanceof HTMLIFrameElement) continue
    const root: ParentNode = el.shadowRoot ?? el
    const button =
      el.matches('button, [role="button"]') ? el : root.querySelector<HTMLElement>('button, [role="button"]')
    if (button) {
      button.click()
      return
    }
    if (!el.querySelector('iframe')) {
      el.click()
      return
    }
  }
}

/**
 * Opens Intuitina when the mascot button itself is activated: by keyboard,
 * or by mouse when the launcher iframe couldn't be placed over it. Shows the
 * widget (its own icon, if the chat can't be opened from here). Returns false
 * when the widget hasn't loaded.
 */
export function openIntuitina(): boolean {
  if (!tagged().length) return false
  sawWindow = false
  document.documentElement.setAttribute(OPEN_ATTR, '')
  update()
  if (!chatWindowShowing()) clickLauncher()
  return true
}
