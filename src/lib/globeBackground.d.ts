export interface GlobeBackgroundOptions {
  /** 0–1 */
  brightness?: number
  /** Rotation multiplier; 0 stops rotation (travelling lights continue). */
  speed?: number
  /** Globe size relative to the container. */
  scale?: number
  /** Starting centre longitude in degrees. */
  longitude?: number
}

export function createGlobeBackground(container: HTMLElement, options?: GlobeBackgroundOptions): () => void
