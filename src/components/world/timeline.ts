// Every station acts out its service's four steps on one shared, looping timeline.
// Times passed to these helpers are in "steps": 1.5 means halfway through the second step.

export const STEP_COUNT = 4
export const STEP_SECONDS = 3.5
export const CYCLE_SECONDS = STEP_COUNT * STEP_SECONDS
/** Seconds at the end of each cycle in which everything that was built clears away. */
export const RESET_SECONDS = 0.6

/** A moment in the cycle where everything has been built, used as the still frame for reduced motion. */
export const FINAL_FRAME = CYCLE_SECONDS - RESET_SECONDS - 0.05

const clamp01 = (x: number) => Math.min(1, Math.max(0, x))

export function cycleTime(t: number) {
  return ((t % CYCLE_SECONDS) + CYCLE_SECONDS) % CYCLE_SECONDS
}

export function stepAt(t: number) {
  const c = cycleTime(t)
  const step = Math.min(STEP_COUNT - 1, Math.floor(c / STEP_SECONDS))
  return { step, progress: (c - step * STEP_SECONDS) / STEP_SECONDS }
}

/** 1 for most of the cycle, easing to 0 as the scene resets at the end. */
export function fade(t: number) {
  return clamp01((CYCLE_SECONDS - cycleTime(t)) / RESET_SECONDS)
}

/** Linear 0 → 1 between two step marks (no reset). */
export function span(t: number, from: number, to: number) {
  return clamp01((cycleTime(t) - from * STEP_SECONDS) / ((to - from) * STEP_SECONDS))
}

function easeOutBack(x: number) {
  if (x <= 0) return 0
  const c1 = 1.70158
  const c3 = c1 + 1
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2)
}

/** Pop-in scale for something that appears at step mark `at` and clears away at the end of the cycle. */
export function reveal(t: number, at: number, seconds = 0.45) {
  const x = clamp01((cycleTime(t) - at * STEP_SECONDS) / seconds)
  return easeOutBack(x) * fade(t)
}
