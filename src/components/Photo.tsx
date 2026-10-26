import { useState } from 'react'
import type { ImgHTMLAttributes } from 'react'

// Photos served through Vercel Image Optimization (vercel.json "images"):
// resized to the widths below and converted to AVIF/WebP, so a phone never
// downloads a 1400px JPEG. Only /photos/ and /gallery/ are allowed sources.
// Locally (vite dev) and if the optimizer ever errors, it falls back to the
// original file, so an image is never broken.
const WIDTHS = [480, 800, 1200, 1600]
const OPTIMIZABLE = /^\/(photos|gallery)\//

export const optimized = (src: string, w: number) => `/_vercel/image?url=${encodeURIComponent(src)}&w=${w}&q=75`

interface PhotoProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  /** CSS sizes hint, e.g. "(min-width: 768px) 50vw, 100vw". */
  sizes?: string
}

export default function Photo({ src, sizes = '100vw', loading = 'lazy', ...rest }: PhotoProps) {
  const [failed, setFailed] = useState(false)
  const useOptimizer = !import.meta.env.DEV && OPTIMIZABLE.test(src) && !failed
  if (!useOptimizer) return <img src={src} loading={loading} decoding="async" {...rest} />
  return (
    <img
      src={optimized(src, 1200)}
      srcSet={WIDTHS.map((w) => `${optimized(src, w)} ${w}w`).join(', ')}
      sizes={sizes}
      loading={loading}
      decoding="async"
      onError={() => setFailed(true)}
      {...rest}
    />
  )
}
