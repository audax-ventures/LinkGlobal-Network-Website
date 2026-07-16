import { useEffect, useRef } from 'react'
import GlobeGL, { type GlobeMethods } from 'react-globe.gl'

// Flat navy SVG texture — the globe reads as a stylized wireframe/graticule sphere
// rather than a photographic earth, keeping it in the brand's blue/navy palette.
const NAVY_TEXTURE =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='2' height='2'><rect width='2' height='2' fill='%230a1128'/></svg>"

export interface GlobeLabel {
  lat: number
  lng: number
  text: string
}

interface StylizedGlobeProps {
  width: number
  height: number
  labels?: GlobeLabel[]
  showSilhouettes?: boolean
  autoRotateSpeed?: number
  className?: string
}

const SILHOUETTE_POINTS: { lat: number; lng: number }[] = [
  { lat: 48, lng: 2 },
  { lat: -14, lng: -51 },
  { lat: 35, lng: 105 },
  { lat: 9, lng: 8 },
  { lat: -25, lng: 134 },
  { lat: 55, lng: 37 },
]

function silhouetteEl() {
  const el = document.createElement('div')
  el.innerHTML = `
    <svg width="22" height="26" viewBox="0 0 22 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="11" cy="7" r="6" fill="#8fe0ff" fill-opacity="0.85"/>
      <path d="M0 26c0-6.6 4.9-11 11-11s11 4.4 11 11" fill="#8fe0ff" fill-opacity="0.85"/>
    </svg>
  `
  el.style.filter = 'drop-shadow(0 0 6px rgba(62,198,255,0.65))'
  el.style.pointerEvents = 'none'
  return el
}

export default function StylizedGlobe({
  width,
  height,
  labels = [],
  showSilhouettes = true,
  autoRotateSpeed = 0.6,
  className = '',
}: StylizedGlobeProps) {
  const globeRef = useRef<GlobeMethods | undefined>(undefined)

  useEffect(() => {
    const globe = globeRef.current
    if (!globe) return
    const controls = globe.controls() as unknown as {
      autoRotate: boolean
      autoRotateSpeed: number
      enabled: boolean
      enableZoom: boolean
    }
    controls.autoRotate = true
    controls.autoRotateSpeed = autoRotateSpeed
    controls.enabled = false
    controls.enableZoom = false
    globe.pointOfView({ lat: 15, lng: 10, altitude: 2.2 }, 0)
  }, [autoRotateSpeed])

  return (
    <div className={className} style={{ pointerEvents: 'none' }}>
      <GlobeGL
        ref={globeRef}
        width={width}
        height={height}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl={NAVY_TEXTURE}
        showAtmosphere
        atmosphereColor="#3ec6ff"
        atmosphereAltitude={0.28}
        showGraticules
        labelsData={labels}
        labelLat={(d) => (d as GlobeLabel).lat}
        labelLng={(d) => (d as GlobeLabel).lng}
        labelText={(d) => (d as GlobeLabel).text}
        labelSize={1.4}
        labelDotRadius={0.35}
        labelColor={() => '#c7ecff'}
        labelResolution={3}
        htmlElementsData={showSilhouettes ? SILHOUETTE_POINTS : []}
        htmlLat={(d) => (d as { lat: number }).lat}
        htmlLng={(d) => (d as { lng: number }).lng}
        htmlElement={silhouetteEl}
      />
    </div>
  )
}
