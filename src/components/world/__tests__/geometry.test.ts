import {
  FRONT_ANGLE,
  angleDistance,
  fitZoom,
  focusRotation,
  hash2,
  outwardHeading,
  polar,
  sectorAngle,
  sectorAt,
  travelHeading,
} from '../geometry'

const rotateY = ([x, z]: [number, number], a: number): [number, number] => [
  x * Math.cos(a) + z * Math.sin(a),
  -x * Math.sin(a) + z * Math.cos(a),
]

describe('rail world geometry', () => {
  it('maps every sector centre back to its own sector', () => {
    for (let i = 0; i < 8; i++) {
      expect(sectorAt(sectorAngle(i, 8), 8)).toBe(i)
      expect(sectorAt(sectorAngle(i, 8) + 0.3, 8)).toBe(i)
    }
    expect(sectorAt(-0.1, 8)).toBe(0)
  })

  it('measures the short way round between angles', () => {
    expect(angleDistance(0.1, Math.PI * 2 - 0.1)).toBeCloseTo(0.2)
    expect(angleDistance(Math.PI, 0)).toBeCloseTo(Math.PI)
  })

  it('rotates the focused stop round to face the camera', () => {
    for (let i = 0; i < 8; i++) {
      const [x, z] = rotateY(polar(12, sectorAngle(i, 8)), focusRotation(i, 8))
      expect(Math.atan2(z, x)).toBeCloseTo(FRONT_ANGLE)
    }
  })

  it('points the train along the track and stations outward', () => {
    const a = 1.2
    // three.js: rotation.y = h sends local +x to (cos h, -sin h) and local +z to (sin h, cos h)
    const h = travelHeading(a)
    expect(Math.cos(h)).toBeCloseTo(-Math.sin(a))
    expect(-Math.sin(h)).toBeCloseTo(Math.cos(a))
    const o = outwardHeading(a)
    expect(Math.sin(o)).toBeCloseTo(Math.cos(a))
    expect(Math.cos(o)).toBeCloseTo(Math.sin(a))
  })

  it('is deterministic and bounded', () => {
    expect(hash2(3, 4)).toBe(hash2(3, 4))
    expect(hash2(3, 4)).toBeGreaterThanOrEqual(0)
    expect(hash2(3, 4)).toBeLessThan(1)
  })

  it('zooms in further on a single segment than on the full loop', () => {
    expect(fitZoom('segment', 800, 500)).toBeGreaterThan(fitZoom('full', 800, 500))
  })
})
