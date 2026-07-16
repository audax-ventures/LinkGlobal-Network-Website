import { useEffect, useState } from 'react'

export function useViewportSize() {
  const [size, setSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1280,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  })

  useEffect(() => {
    const onResize = () => setSize({ width: window.innerWidth, height: window.innerHeight })
    // Re-measure once on mount: the lazy initial state above can be stale/zero
    // if the window wasn't fully attached yet when this hook first ran, and
    // that value would otherwise never self-correct since nothing else besides
    // a real `resize` event triggers an update.
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return size
}
