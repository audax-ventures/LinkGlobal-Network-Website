// A single wave-period tile used as a CSS mask so the nav pill's bottom edge
// can ripple as it hides/reveals, instead of just sliding linearly. The tile
// repeats horizontally (mask-repeat-x) regardless of the pill's actual width,
// and moving mask-position-y sweeps the wavy opaque/transparent boundary from
// the pill's bottom edge up past its top.
export const PILL_HEIGHT = 92
const TILE_WIDTH = 40
const TILE_HEIGHT = 140
const BASELINE = 108
const AMPLITUDE = 8

const waveTileSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${TILE_WIDTH} ${TILE_HEIGHT}"><path d="M0,0 L${TILE_WIDTH},0 L${TILE_WIDTH},${BASELINE} C${TILE_WIDTH - 5.5},${BASELINE} ${TILE_WIDTH - 4.5},${BASELINE - AMPLITUDE} ${TILE_WIDTH - 10},${BASELINE - AMPLITUDE} C${TILE_WIDTH - 15.5},${BASELINE - AMPLITUDE} ${TILE_WIDTH - 14.5},${BASELINE} ${TILE_WIDTH - 20},${BASELINE} C${TILE_WIDTH - 25.5},${BASELINE} ${TILE_WIDTH - 24.5},${BASELINE + AMPLITUDE} ${TILE_WIDTH - 30},${BASELINE + AMPLITUDE} C${TILE_WIDTH - 35.5},${BASELINE + AMPLITUDE} ${TILE_WIDTH - 34.5},${BASELINE} 0,${BASELINE} Z" fill="white"/></svg>`

export const WAVE_MASK_URL = `url("data:image/svg+xml,${encodeURIComponent(waveTileSvg)}")`
export const WAVE_MASK_SIZE = `${TILE_WIDTH}px ${TILE_HEIGHT}px`

// mask-position-y at fully visible (0) and fully hidden (1) progress.
export const MASK_Y_VISIBLE = PILL_HEIGHT - BASELINE
export const MASK_Y_HIDDEN = 0 - BASELINE
