// Bridges the mascot button (ChatWidget.tsx) and the Intuitina chatbot that
// the script at the end of index.html loads.
//
// Intuitina's widget brings its own launcher icon, and we couldn't read its
// code or docs, so this doesn't rely on its internals. Instead:
// - Everything the widget adds to the page is tagged and kept hidden (see
//   [data-lg-intuitina] in index.css), so only the mascot shows.
// - Clicking the mascot reveals the widget, hides the mascot, and clicks the
//   widget's own launcher when it's reachable from the page.
// - When the chat shrinks back to a small launcher (or disappears), the
//   visitor closed it: the widget is hidden again and the mascot returns.

const WIDGET_SCRIPT = 'script[src*="chat.intuitina.com"]'
const TAG = 'data-lg-intuitina'
const OPEN_ATTR = 'data-lg-chat-open'
// An open chat window is bigger than this in both directions; a launcher icon
// or a hidden window is smaller.
const OPEN_MIN_PX = 180
const POLL_MS = 400

const SKIP = new Set(['SCRIPT', 'STYLE', 'LINK', 'NOSCRIPT', 'TEMPLATE', 'META'])

let poll: number | undefined

function tagged(): HTMLElement[] {
  return Array.from(document.querySelectorAll<HTMLElement>(`[${TAG}]`))
}

function tagIfWidget(node: Node) {
  if (!(node instanceof HTMLElement) || SKIP.has(node.tagName) || node.id === 'root') return
  // Only nodes added after the Intuitina script is on the page are its own.
  if (!document.querySelector(WIDGET_SCRIPT)) return
  node.setAttribute(TAG, '')
}

if (typeof window !== 'undefined' && typeof MutationObserver !== 'undefined') {
  const observer = new MutationObserver((records) => {
    for (const r of records) r.addedNodes.forEach(tagIfWidget)
  })
  observer.observe(document.documentElement, { childList: true })
  if (document.body) observer.observe(document.body, { childList: true })
  else document.addEventListener('DOMContentLoaded', () => observer.observe(document.body, { childList: true }))
}

function isBig(el: Element) {
  const r = el.getBoundingClientRect()
  return r.width > OPEN_MIN_PX && r.height > OPEN_MIN_PX
}

// True when an open chat window is showing: an iframe, or a widget element
// without an iframe of its own, larger than a launcher icon.
function chatWindowShowing(): boolean {
  return tagged().some((el) => {
    const frames = el.tagName === 'IFRAME' ? [el] : Array.from(el.querySelectorAll('iframe'))
    return frames.length ? frames.some(isBig) : isBig(el)
  })
}

// Clicks the widget's own launcher, if it lives on the page rather than
// inside the widget's iframe (an iframe from another site can't be clicked
// into).
function clickLauncher() {
  for (const el of tagged()) {
    if (el.tagName === 'IFRAME') continue
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

function setOpen(open: boolean) {
  document.documentElement.toggleAttribute(OPEN_ATTR, open)
  window.clearInterval(poll)
  poll = undefined
  if (!open) return

  let sawWindow = false
  poll = window.setInterval(() => {
    const showing = chatWindowShowing()
    if (showing) sawWindow = true
    else if (sawWindow) setOpen(false)
  }, POLL_MS)
}

/** Opens Intuitina. Returns false when its widget hasn't loaded. */
export function openIntuitina(): boolean {
  if (!tagged().length) return false
  setOpen(true)
  if (!chatWindowShowing()) clickLauncher()
  return true
}
