"use client"

import { createContext, useContext, useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { fade, reveal, span, stepAt } from "./timeline"
import { BOX, Vox, mat, type V3 } from "./voxels"

export const BLUE = "#2563eb"
export const BLUE_LIGHT = "#60a5fa"
export const BLUE_DARK = "#1d4ed8"
export const GREEN = "#4ade80"
export const RED = "#ef4444"
export const GOLD = "#facc15"
export const WHITE = "#f8fafc"
export const GRAY_300 = "#d1d5db"
export const GRAY_700 = "#374151"
export const GRAY_800 = "#1f2937"
export const GRAY_900 = "#111827"

/** When set, every animation freezes on this time (used for prefers-reduced-motion). */
const FixedTime = createContext<number | null>(null)
export const FixedTimeProvider = FixedTime.Provider

export function useTimeline(callback: (t: number) => void) {
  const fixed = useContext(FixedTime)
  useFrame(({ clock }) => callback(fixed ?? clock.elapsedTime))
}

export function useLambert(color: string, emissive = false) {
  return useMemo(
    () => new THREE.MeshLambertMaterial({ color, emissive: emissive ? color : "#000000", emissiveIntensity: 0 }),
    [color, emissive]
  )
}

const TINY = 0.0001

interface PopProps {
  /** Step mark at which this pops in, e.g. 1.25. */
  at: number
  /** Optional step mark at which it shrinks away again before the cycle ends. */
  until?: number
  /** Fall in from this height above its resting place. */
  drop?: number
  p?: V3
  children: React.ReactNode
}

/** Pops its children in at a point in the timeline (scaling from its own origin, so put that at the base). */
export function Pop({ at, until, drop = 0, p = [0, 0, 0], children }: PopProps) {
  const ref = useRef<THREE.Group>(null)
  useTimeline((t) => {
    const g = ref.current
    if (!g) return
    let v = reveal(t, at)
    if (until !== undefined) v *= 1 - span(t, until, until + 0.12)
    g.visible = v > 0.001
    g.scale.setScalar(Math.max(v, TINY))
    g.position.set(p[0], p[1] + (1 - Math.min(1, Math.max(0, v))) * drop, p[2])
  })
  return (
    <group ref={ref} position={p} scale={TINY}>
      {children}
    </group>
  )
}

/** A bar that grows upward from y = 0 between two step marks. */
export function Grow({ from, to, p, s, c }: { from: number; to: number; p: V3; s: V3; c: string }) {
  const ref = useRef<THREE.Group>(null)
  useTimeline((t) => {
    if (!ref.current) return
    const v = span(t, from, to) * fade(t)
    ref.current.visible = v > 0.001
    ref.current.scale.y = Math.max(v, TINY)
  })
  return (
    <group ref={ref} position={p} scale={[1, TINY, 1]}>
      <Vox p={[0, s[1] / 2, 0]} s={s} c={c} />
    </group>
  )
}

/** Four lights in front of every station that fill in as its steps play. */
export function StepLights() {
  const materials = useMemo(
    () => [0, 1, 2, 3].map(() => new THREE.MeshLambertMaterial({ color: GRAY_700, emissive: BLUE_LIGHT, emissiveIntensity: 0 })),
    []
  )
  useTimeline((t) => {
    const { step } = stepAt(t)
    materials.forEach((m, i) => {
      const on = i <= step && fade(t) > 0.5
      m.emissiveIntensity = on ? (i === step ? 1.3 : 0.6) : 0
      m.color.set(on ? BLUE_LIGHT : GRAY_700)
    })
  })
  return (
    <group position={[0, 0.04, 1.75]}>
      {materials.map((m, i) => (
        <Vox key={i} p={[-0.54 + i * 0.36, 0, 0]} s={[0.26, 0.08, 0.26]} material={m} />
      ))}
    </group>
  )
}

const ring = new THREE.TorusGeometry(0.34, 0.07, 6, 14)
const lensGeometry = new THREE.CylinderGeometry(0.32, 0.32, 0.03, 14)
const lensMaterial = new THREE.MeshLambertMaterial({ color: "#bae6fd", transparent: true, opacity: 0.5 })

export function Magnifier() {
  return (
    <group>
      <mesh geometry={ring} material={mat(GRAY_900)} castShadow />
      <mesh geometry={lensGeometry} material={lensMaterial} rotation={[Math.PI / 2, 0, 0]} />
      <Vox p={[0.38, -0.38, 0]} s={[0.12, 0.5, 0.12]} r={[0, 0, Math.PI / 4]} c="#92400e" />
    </group>
  )
}

/** A little voxel person; walks on the spot when `walking`. */
export function Person({ shirt, walking = true }: { shirt: string; walking?: boolean }) {
  const legs = useRef<(THREE.Mesh | null)[]>([])
  useTimeline((t) => {
    legs.current.forEach((leg, i) => {
      if (leg) leg.rotation.x = walking ? Math.sin(t * 8 + i * Math.PI) * 0.5 : 0
    })
  })
  return (
    <group>
      {[-0.08, 0.08].map((x, i) => (
        <group key={x} position={[x, 0.3, 0]}>
          <mesh
            ref={(el) => {
              legs.current[i] = el
            }}
            geometry={BOX}
            material={mat(GRAY_800)}
            position={[0, -0.15, 0]}
            scale={[0.1, 0.3, 0.12]}
            castShadow
          />
        </group>
      ))}
      <Vox p={[0, 0.46, 0]} s={[0.3, 0.34, 0.18]} c={shirt} />
      <Vox p={[0, 0.76, 0]} s={[0.22, 0.22, 0.22]} c="#f1c27d" />
      <Vox p={[0, 0.89, -0.02]} s={[0.24, 0.07, 0.24]} c="#3f2a1d" />
    </group>
  )
}

/** A friendly helper robot that bobs and blinks. */
export function Robot({ seed = 0 }: { seed?: number }) {
  const head = useRef<THREE.Group>(null)
  const eyes = useLambert("#22d3ee", true)
  useTimeline((t) => {
    if (head.current) head.current.rotation.y = Math.sin(t * 1.3 + seed) * 0.4
    eyes.emissiveIntensity = (t + seed) % 3 < 0.12 ? 0 : 1.3
  })
  return (
    <group>
      <Vox p={[0, 0.12, 0]} s={[0.55, 0.24, 0.45]} c={GRAY_700} />
      <Vox p={[0, 0.55, 0]} s={[0.6, 0.55, 0.45]} c={GRAY_300} />
      <Vox p={[0, 0.55, 0.23]} s={[0.2, 0.2, 0.02]} c={BLUE} />
      <group ref={head} position={[0, 1.05, 0]}>
        <Vox p={[0, 0, 0]} s={[0.5, 0.38, 0.4]} c={WHITE} />
        <Vox p={[-0.11, 0.02, 0.205]} s={[0.09, 0.09, 0.02]} material={eyes} />
        <Vox p={[0.11, 0.02, 0.205]} s={[0.09, 0.09, 0.02]} material={eyes} />
        <Vox p={[0, 0.3, 0]} s={[0.04, 0.2, 0.04]} c={GRAY_700} />
        <Vox p={[0, 0.42, 0]} s={[0.1, 0.1, 0.1]} c={BLUE_LIGHT} />
      </group>
    </group>
  )
}
