import { useEffect, useState } from 'react'
import LogoIntro from './LogoIntro'
import SpinningWorld from './SpinningWorld'

interface LoadingScreenProps {
  onFinished: () => void
}

type Phase = 'logo' | 'world' | 'done'

function getInitialPhase(): Phase {
  if (typeof window === 'undefined') return 'logo'
  const debugPhase = new URLSearchParams(window.location.search).get('debugPhase')
  return debugPhase === 'world' ? 'world' : 'logo'
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
    if (phase === 'done') onFinished()
  }, [phase, onFinished])

  if (phase === 'done') return null

  return (
    <>
      {phase === 'logo' && <LogoIntro onComplete={() => setPhase('world')} />}
      {phase === 'world' && <SpinningWorld onDismiss={() => setPhase('done')} />}
    </>
  )
}
