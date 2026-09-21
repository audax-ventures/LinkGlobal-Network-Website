import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'

// The assistant's display name — change it here and it updates everywhere in
// the widget (the server-side persona in api/chat.ts is separate).
const ASSISTANT_NAME = 'Intuitina'
const MASCOT_SRC = '/mascot/assistant-mascot.svg'
const MAX_INPUT_LENGTH = 500
const HISTORY_SENT = 12

const GREETING = `Hi, I'm ${ASSISTANT_NAME}, LinkGlobal's AI assistant. Ask me how it works, about plans and pricing, or how to become a tutor.`

const SUGGESTIONS = [
  'How does LinkGlobal work?',
  'What are the pricing plans?',
  'Can I pay per session?',
  'How do I become a tutor?',
]

type ErrorKind = 'unavailable' | 'rate' | 'failed'

const ERROR_TEXT: Record<ErrorKind, string> = {
  unavailable: "I'm not available just yet. In the meantime, you can reach the team directly.",
  rate: "You're sending messages quickly. Please wait a few minutes and try again, or reach the team directly.",
  failed: 'Something went wrong on my end. Please try again, or reach the team directly.',
}

interface ChatMessage {
  id: number
  role: 'user' | 'assistant'
  content: string
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1 py-1" aria-label={`${ASSISTANT_NAME} is typing`}>
      {[0, 150, 300].map((delay) => (
        <span
          key={delay}
          className="h-2 w-2 animate-bounce rounded-full bg-brand-blue/60"
          style={{ animationDelay: `${delay}ms` }}
        />
      ))}
    </div>
  )
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<ErrorKind | null>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const nextId = useRef(1)

  useEffect(() => {
    const el = listRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, sending, error, open])

  useEffect(() => {
    if (!open) return
    inputRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  async function send(text: string) {
    const content = text.trim()
    if (!content || sending) return

    const userMessage: ChatMessage = { id: nextId.current++, role: 'user', content }
    const history = [...messages, userMessage]
    setMessages(history)
    setInput('')
    setError(null)
    setSending(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: history.slice(-HISTORY_SENT).map(({ role, content: c }) => ({ role, content: c })),
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok && typeof data.reply === 'string' && data.reply) {
        setMessages((prev) => [...prev, { id: nextId.current++, role: 'assistant', content: data.reply }])
      } else if (res.status === 503) {
        setError('unavailable')
      } else if (res.status === 429) {
        setError('rate')
      } else {
        setError('failed')
      }
    } catch {
      setError('failed')
    } finally {
      setSending(false)
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    send(input)
  }

  const started = messages.length > 0

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label={`Chat with ${ASSISTANT_NAME}`}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ height: 'min(560px, calc(100dvh - 8rem))', transformOrigin: 'bottom right' }}
            className="fixed bottom-24 right-4 z-50 flex w-[calc(100vw-2rem)] max-w-[380px] flex-col overflow-hidden rounded-3xl bg-white shadow-[0_30px_80px_rgba(10,17,40,0.28)] ring-1 ring-navy-900/[0.06] sm:right-6"
          >
            <div
              className="flex items-center gap-3 px-4 py-3.5 text-white"
              style={{ background: 'linear-gradient(135deg, #0e2a4d, #1ba3e0)' }}
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white">
                <img src={MASCOT_SRC} alt="" className="h-full w-full scale-[1.15]" draggable={false} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-bold leading-tight">{ASSISTANT_NAME}</p>
                <p className="text-xs text-white/85">LinkGlobal&rsquo;s AI assistant</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="flex h-9 w-9 items-center justify-center rounded-full text-white/90 transition-colors hover:bg-white/15"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div
              ref={listRef}
              role="log"
              aria-live="polite"
              className="flex-1 space-y-3 overflow-y-auto bg-[#f6f9fd] px-4 py-4"
            >
              <div className="max-w-[88%] rounded-2xl rounded-tl-md bg-white px-3.5 py-2.5 text-sm leading-relaxed text-navy-800 shadow-sm ring-1 ring-navy-900/[0.05]">
                {GREETING}
              </div>

              {!started && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => send(s)}
                      className="rounded-full border border-brand-blue/40 bg-white px-3 py-1.5 text-left text-sm font-medium text-brand-blue transition-colors hover:bg-brand-blue hover:text-white"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {messages.map((m) =>
                m.role === 'user' ? (
                  <div
                    key={m.id}
                    className="ml-auto max-w-[88%] whitespace-pre-wrap rounded-2xl rounded-tr-md bg-brand-blue px-3.5 py-2.5 text-sm leading-relaxed text-white"
                  >
                    {m.content}
                  </div>
                ) : (
                  <div
                    key={m.id}
                    className="max-w-[88%] whitespace-pre-wrap rounded-2xl rounded-tl-md bg-white px-3.5 py-2.5 text-sm leading-relaxed text-navy-800 shadow-sm ring-1 ring-navy-900/[0.05]"
                  >
                    {m.content}
                  </div>
                ),
              )}

              {sending && (
                <div className="w-fit rounded-2xl rounded-tl-md bg-white px-3.5 py-2 shadow-sm ring-1 ring-navy-900/[0.05]">
                  <TypingDots />
                </div>
              )}

              {error && (
                <div className="max-w-[88%] rounded-2xl rounded-tl-md bg-white px-3.5 py-2.5 text-sm leading-relaxed text-navy-800 shadow-sm ring-1 ring-amber-400/60">
                  <p>{ERROR_TEXT[error]}</p>
                  <Link
                    to="/contact"
                    onClick={() => setOpen(false)}
                    className="mt-1.5 inline-block font-semibold text-brand-blue hover:underline"
                  >
                    Contact the team &rarr;
                  </Link>
                </div>
              )}
            </div>

            <form onSubmit={onSubmit} className="border-t border-navy-900/10 bg-white px-3 pb-2.5 pt-3">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  maxLength={MAX_INPUT_LENGTH}
                  placeholder="Ask about plans, tutors, how it works…"
                  aria-label={`Message ${ASSISTANT_NAME}`}
                  className="min-w-0 flex-1 rounded-full border border-navy-900/15 bg-white px-4 py-2.5 text-sm text-navy-950 placeholder:text-navy-700/50 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/25"
                />
                <button
                  type="submit"
                  disabled={sending || !input.trim()}
                  aria-label="Send message"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-blue text-white transition-opacity disabled:opacity-40"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
              <p className="mt-2 text-center text-xs text-navy-700/60">
                {ASSISTANT_NAME} is an AI assistant and can make mistakes.
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? `Close chat with ${ASSISTANT_NAME}` : `Chat with ${ASSISTANT_NAME}`}
        aria-expanded={open}
        className="fixed bottom-5 right-4 z-50 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-white shadow-[0_10px_30px_rgba(10,17,40,0.25)] ring-1 ring-navy-900/[0.08] transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue sm:right-6"
      >
        <img src={MASCOT_SRC} alt="" className="h-full w-full scale-[1.15]" draggable={false} />
      </button>
    </>
  )
}
