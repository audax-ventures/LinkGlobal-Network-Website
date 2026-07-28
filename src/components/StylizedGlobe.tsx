import { useEffect, useRef, useState } from 'react'
import GlobeGL, { type GlobeMethods } from 'react-globe.gl'
import { feature } from 'topojson-client'
import type { Topology, GeometryCollection } from 'topojson-specification'
import type { Feature, Geometry } from 'geojson'

// Flat navy texture (the globe's "ocean") — generated via canvas rather than a
// hand-built data URI so it's always a well-formed bitmap three.js can decode.
function useSolidTexture(color: string) {
  const [url, setUrl] = useState<string | null>(null)

  useEffect(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 4
    canvas.height = 4
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.fillStyle = color
    ctx.fillRect(0, 0, 4, 4)
    setUrl(canvas.toDataURL('image/png'))
  }, [color])

  return url
}

const WORLD_ATLAS_URL = 'https://unpkg.com/world-atlas@2.0.2/countries-110m.json'

function useCountryPolygons() {
  const [features, setFeatures] = useState<Feature<Geometry>[]>([])

  useEffect(() => {
    let cancelled = false
    fetch(WORLD_ATLAS_URL)
      .then((res) => res.json())
      .then((topology: Topology) => {
        if (cancelled) return
        const collection = feature(
          topology,
          topology.objects.countries as GeometryCollection,
        )
        setFeatures('features' in collection ? collection.features : [collection])
      })
      .catch(() => {
        // Silently fall back to no country outlines — the globe still renders fine without them.
      })
    return () => {
      cancelled = true
    }
  }, [])

  return features
}

export interface CountryGreeting {
  lat: number
  lng: number
  greeting: string
  country: string
}

interface StylizedGlobeProps {
  width: number
  height: number
  greetings?: CountryGreeting[]
  autoRotateSpeed?: number
  className?: string
}

function greetingEl(d: object) {
  const { greeting, index } = d as CountryGreeting & { index: number }
  // react-globe.gl positions this OUTER element itself (via its own inline
  // transform, updated every frame to track the globe's rotation) — so the
  // pop-in animation must live on an INNER child instead. Animating
  // `transform` on this root node would fight the library's own positioning
  // transform and freeze the element at whatever position that race left it.
  const el = document.createElement('div')
  el.style.pointerEvents = 'none'

  const inner = document.createElement('div')
  inner.style.cssText = `
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    opacity: 0;
    animation: lg-pop-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    animation-delay: ${0.3 + index * 0.35}s;
  `
  inner.innerHTML = `
    <div style="
      background: rgba(10, 17, 40, 0.85);
      border: 1px solid rgba(143, 224, 255, 0.5);
      color: #eaf8ff;
      font-family: Inter, system-ui, sans-serif;
      font-size: 11px;
      font-weight: 600;
      padding: 3px 8px;
      border-radius: 999px;
      white-space: nowrap;
      box-shadow: 0 0 12px rgba(62,198,255,0.45);
    ">${greeting}</div>
    <svg width="16" height="19" viewBox="0 0 22 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="11" cy="7" r="6" fill="#8fe0ff" fill-opacity="0.9"/>
      <path d="M0 26c0-6.6 4.9-11 11-11s11 4.4 11 11" fill="#8fe0ff" fill-opacity="0.9"/>
    </svg>
  `
  el.appendChild(inner)
  return el
}

export default function StylizedGlobe({
  width,
  height,
  greetings = [],
  autoRotateSpeed = 1.2,
  className = '',
}: StylizedGlobeProps) {
  const globeRef = useRef<GlobeMethods | undefined>(undefined)
  const textureUrl = useSolidTexture('#0a1128')
  const countryPolygons = useCountryPolygons()

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
  }, [autoRotateSpeed, textureUrl])

  if (!textureUrl) return <div className={className} style={{ width, height }} />

  const greetingsWithIndex = greetings.map((g, index) => ({ ...g, index }))

  return (
    <div className={className} style={{ pointerEvents: 'none' }}>
      <GlobeGL
        ref={globeRef}
        width={width}
        height={height}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl={textureUrl}
        showAtmosphere
        atmosphereColor="#3ec6ff"
        atmosphereAltitude={0.28}
        showGraticules
        polygonsData={countryPolygons}
        polygonCapColor={() => 'rgba(62, 198, 255, 0.28)'}
        polygonSideColor={() => 'rgba(62, 198, 255, 0.08)'}
        polygonStrokeColor={() => 'rgba(200, 236, 255, 0.85)'}
        polygonAltitude={0.006}
        htmlElementsData={greetingsWithIndex}
        htmlLat={(d) => (d as CountryGreeting).lat}
        htmlLng={(d) => (d as CountryGreeting).lng}
        htmlAltitude={0.04}
        htmlElement={greetingEl}
      />
    </div>
  )
}
