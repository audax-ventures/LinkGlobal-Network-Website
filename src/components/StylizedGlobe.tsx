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

// Module-scoped so the fetch + topojson conversion happens once for the
// entire session, no matter how many StylizedGlobe instances mount (the
// loading screen's globe and the Global Reach section's globe both use it).
let countryPolygonsPromise: Promise<Feature<Geometry>[]> | null = null

function fetchCountryPolygons(): Promise<Feature<Geometry>[]> {
  if (!countryPolygonsPromise) {
    countryPolygonsPromise = fetch(WORLD_ATLAS_URL)
      .then((res) => res.json())
      .then((topology: Topology) => {
        const collection = feature(topology, topology.objects.countries as GeometryCollection)
        return 'features' in collection ? collection.features : [collection]
      })
      .catch(() => {
        // Silently fall back to no country outlines — the globe still renders fine without them.
        return []
      })
  }
  return countryPolygonsPromise
}

function useCountryPolygons() {
  const [features, setFeatures] = useState<Feature<Geometry>[]>([])

  useEffect(() => {
    let cancelled = false
    fetchCountryPolygons().then((f) => {
      if (!cancelled) setFeatures(f)
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

// Glowing "city light" points scattered across major population centers —
// purely decorative, gives the dark globe the data-visualization texture
// from the reference design instead of a bare sphere.
const CITY_LIGHTS = [
  { lat: 40.7, lng: -74.0 }, // New York
  { lat: 34.1, lng: -118.2 }, // Los Angeles
  { lat: 43.7, lng: -79.4 }, // Toronto
  { lat: 19.4, lng: -99.1 }, // Mexico City
  { lat: -23.6, lng: -46.6 }, // São Paulo
  { lat: -34.6, lng: -58.4 }, // Buenos Aires
  { lat: 51.5, lng: -0.1 }, // London
  { lat: 48.9, lng: 2.3 }, // Paris
  { lat: 52.5, lng: 13.4 }, // Berlin
  { lat: 40.4, lng: -3.7 }, // Madrid
  { lat: 41.9, lng: 12.5 }, // Rome
  { lat: 55.8, lng: 37.6 }, // Moscow
  { lat: 30.0, lng: 31.2 }, // Cairo
  { lat: 6.5, lng: 3.4 }, // Lagos
  { lat: -1.3, lng: 36.8 }, // Nairobi
  { lat: -26.2, lng: 28.0 }, // Johannesburg
  { lat: 25.2, lng: 55.3 }, // Dubai
  { lat: 19.1, lng: 72.9 }, // Mumbai
  { lat: 28.6, lng: 77.2 }, // Delhi
  { lat: 13.8, lng: 100.5 }, // Bangkok
  { lat: 1.3, lng: 103.8 }, // Singapore
  { lat: 39.9, lng: 116.4 }, // Beijing
  { lat: 31.2, lng: 121.5 }, // Shanghai
  { lat: 35.7, lng: 139.7 }, // Tokyo
  { lat: 37.6, lng: 127.0 }, // Seoul
  { lat: -33.9, lng: 151.2 }, // Sydney
  { lat: -37.8, lng: 145.0 }, // Melbourne
  { lat: -6.2, lng: 106.8 }, // Jakarta
  { lat: 14.6, lng: 121.0 }, // Manila
  { lat: 41.0, lng: 28.98 }, // Istanbul
]

interface StylizedGlobeProps {
  width: number
  height: number
  greetings?: CountryGreeting[]
  autoRotateSpeed?: number
  className?: string
}

const GREETING_COLORS = ['#1ba3e0', '#2dd4bf', '#a78bfa', '#3ec6ff', '#f5a623', '#f472b6', '#4ade80']

function greetingEl(d: object) {
  const { greeting, index } = d as CountryGreeting & { index: number }
  const color = GREETING_COLORS[index % GREETING_COLORS.length]
  // react-globe.gl positions this OUTER element itself (via its own inline
  // transform, updated every frame to track the globe's rotation) — so the
  // pop-in animation must live on an INNER child instead. Animating
  // `transform` on this root node would fight the library's own positioning
  // transform and freeze the element at whatever position that race left it.
  const el = document.createElement('div')
  el.style.pointerEvents = 'none'

  const inner = document.createElement('div')
  inner.style.cssText = `
    opacity: 0;
    animation: lg-pop-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    animation-delay: ${0.3 + index * 0.35}s;
  `
  inner.innerHTML = `
    <div style="
      display: flex;
      align-items: center;
      gap: 6px;
      background: #ffffff;
      color: ${color};
      font-family: Inter, system-ui, sans-serif;
      font-size: 12px;
      font-weight: 700;
      padding: 5px 12px 5px 5px;
      border-radius: 999px;
      white-space: nowrap;
      box-shadow: 0 6px 18px rgba(10,20,45,0.28);
    ">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="${color}">
        <circle cx="12" cy="12" r="12" fill="${color}" fill-opacity="0.14"/>
        <circle cx="12" cy="9.5" r="3.6" fill="${color}"/>
        <path d="M4.5 20c0-4.4 3.4-7.5 7.5-7.5s7.5 3.1 7.5 7.5" fill="${color}"/>
      </svg>
      ${greeting}
    </div>
  `
  el.appendChild(inner)
  return el
}

export default function StylizedGlobe({
  width,
  height,
  greetings = [],
  autoRotateSpeed = 36,
  className = '',
}: StylizedGlobeProps) {
  const globeRef = useRef<GlobeMethods | undefined>(undefined)
  const textureUrl = useSolidTexture('#0a1128')
  const countryPolygons = useCountryPolygons()

  useEffect(() => {
    const globe = globeRef.current
    if (!globe) return
    const controls = globe.controls() as unknown as {
      enabled: boolean
      enableZoom: boolean
    }
    controls.enabled = false
    controls.enableZoom = false

    // Drive rotation manually (rather than OrbitControls' built-in autoRotate)
    // so the camera's longitude — and therefore what's currently front-and-
    // center — is always known and predictable, in degrees-per-second.
    const startLat = 20
    let lng = 10
    let lastTime: number | null = null
    let frameId: number

    const rotate = (time: number) => {
      if (lastTime !== null) {
        const dt = (time - lastTime) / 1000
        lng += autoRotateSpeed * dt
        if (lng > 180) lng -= 360
        globe.pointOfView({ lat: startLat, lng, altitude: 2.2 }, 0)
      }
      lastTime = time
      frameId = requestAnimationFrame(rotate)
    }
    frameId = requestAnimationFrame(rotate)

    return () => cancelAnimationFrame(frameId)
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
        atmosphereAltitude={0.22}
        polygonsData={countryPolygons}
        polygonCapColor={() => 'rgba(214, 224, 236, 0.94)'}
        polygonSideColor={() => 'rgba(160, 178, 202, 0.6)'}
        polygonStrokeColor={() => 'rgba(120, 140, 168, 0.5)'}
        polygonAltitude={0.006}
        pointsData={CITY_LIGHTS}
        pointLat={(d) => (d as { lat: number }).lat}
        pointLng={(d) => (d as { lng: number }).lng}
        pointColor={() => '#8fe0ff'}
        pointAltitude={0.008}
        pointRadius={0.35}
        pointResolution={6}
        pointsMerge={false}
        htmlElementsData={greetingsWithIndex}
        htmlLat={(d) => (d as CountryGreeting).lat}
        htmlLng={(d) => (d as CountryGreeting).lng}
        htmlAltitude={0.04}
        htmlElement={greetingEl}
      />
    </div>
  )
}
