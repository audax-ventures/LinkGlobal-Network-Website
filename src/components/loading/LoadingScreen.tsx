import { useEffect, useState } from 'react'
import IntroSplash from './IntroSplash'

interface LoadingScreenProps {
  onFinished: () => void
}

type Phase = 'intro' | 'done'

// The intro plays once per browser session. `?intro=1` forces a replay (handy
// for checking it on the live site); `?debugPhase=done` skips it.
const SEEN_KEY = 'lg-intro-seen'

function getInitialPhase(): Phase {
  if (typeof window === 'undefined') return 'intro'
  const params = new URLSearchParams(window.location.search)
  if (params.get('debugPhase') === 'done') return 'done'
  if (params.get('intro') === '1') return 'intro'
  try {
    if (window.sessionStorage.getItem(SEEN_KEY)) return 'done'
  } catch {
    // Storage blocked (private mode etc.) — just play the intro.
  }
  return 'intro'
}

export default function LoadingScreen({ onFinished }: LoadingScreenProps) {
  const [phase, setPhase] = useState<Phase>(getInitialPhase)

  useEffect(() => {
    if (phase === 'done') return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [phase])

  useEffect(() => {
    if (phase !== 'done') return
    try {
      window.sessionStorage.setItem(SEEN_KEY, '1')
    } catch {
      // Non-essential.
    }
    onFinished()
  }, [phase, onFinished])

  if (phase === 'done') return null

  return <IntroSplash onDismiss={() => setPhase('done')} />
}
