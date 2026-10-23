// Pure layout math for the rail world, kept free of three.js so it can be unit tested.

export const LAKE_RADIUS = 5.2
export const ISLAND_RADIUS = 14.3
export const TRACK_RADIUS = 9.5
export const STATION_RADIUS = 12
export const GROUND_HEIGHT = 1

/** The camera looks at the island from this azimuth, so a stop placed here faces the viewer. */
export const FRONT_ANGLE = Math.PI / 4

export const TAU = Math.PI * 2

export function sectorAngle(index: number, count: number) {
  return (index / count) * TAU
}

/** Which sector a polar angle falls in. Sectors are centred on their angle. */
export function sectorAt(angle: number, count: number) {
  const size = TAU / count
  const normalized = (((angle + size / 2) % TAU) + TAU) % TAU
  return Math.floor(normalized / size) % count
}

/** Smallest absolute difference between two angles, in radians. */
export function angleDistance(a: number, b: number) {
  const d = Math.abs((((a - b) % TAU) + TAU) % TAU)
  return d > Math.PI ? TAU - d : d
}

/** Point on the ground plane, three.js style: x right, z towards the viewer. */
export function polar(radius: number, angle: number): [number, number] {
  return [radius * Math.cos(angle), radius * Math.sin(angle)]
}

/** World rotation that brings a given sector round to face the camera. */
export function focusRotation(index: number, count: number) {
  return sectorAngle(index, count) - FRONT_ANGLE
}

/** Y rotation that points an object's local +x along the direction of travel (increasing angle). */
export function travelHeading(angle: number) {
  return -angle - Math.PI / 2
}

/** Y rotation that turns an object's local +z to face outward from the centre. */
export function outwardHeading(angle: number) {
  return Math.PI / 2 - angle
}

/** Deterministic pseudo random number in [0, 1) for a pair of integers. */
export function hash2(x: number, y: number) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453
  return s - Math.floor(s)
}

/** Orthographic zoom (pixels per world unit) that fits the view into the canvas. */
export function fitZoom(mode: "full" | "segment", width: number, height: number) {
  return mode === "full"
    ? Math.min(width / 26.5, height / 24)
    : Math.min(width / 12, height / 8.5)
}
