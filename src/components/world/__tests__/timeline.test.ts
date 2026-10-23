import { CYCLE_SECONDS, FINAL_FRAME, STEP_SECONDS, fade, reveal, span, stepAt } from '../timeline'

describe('station timeline', () => {
  it('walks through four steps and loops', () => {
    expect(stepAt(0).step).toBe(0)
    expect(stepAt(STEP_SECONDS * 1.5)).toEqual({ step: 1, progress: 0.5 })
    expect(stepAt(STEP_SECONDS * 3.9).step).toBe(3)
    expect(stepAt(CYCLE_SECONDS + 0.1).step).toBe(0)
  })

  it('pops things in at their step and clears them at the end of the cycle', () => {
    expect(reveal(STEP_SECONDS * 0.9, 1)).toBe(0)
    expect(reveal(STEP_SECONDS * 1 + 1, 1)).toBeCloseTo(1)
    expect(reveal(CYCLE_SECONDS - 0.01, 1)).toBeLessThan(0.05)
    expect(fade(STEP_SECONDS)).toBe(1)
  })

  it('shows the finished scene on the reduced-motion still frame', () => {
    expect(stepAt(FINAL_FRAME).step).toBe(3)
    expect(reveal(FINAL_FRAME, 3.5)).toBeCloseTo(1)
    expect(span(FINAL_FRAME, 2, 3)).toBe(1)
  })
})
