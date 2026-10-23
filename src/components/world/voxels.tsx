"use client"

import { useMemo, type Ref } from "react"
import * as THREE from "three"
import type { TreeKind } from "@/lib/services"
import { hash2 } from "./geometry"

export type V3 = [number, number, number]

export const BOX = new THREE.BoxGeometry(1, 1, 1)

const materials = new Map<string, THREE.MeshLambertMaterial>()

/** Shared flat material per colour, so hundreds of voxels cost a handful of materials. */
export function mat(color: string) {
  let material = materials.get(color)
  if (!material) {
    material = new THREE.MeshLambertMaterial({ color })
    materials.set(color, material)
  }
  return material
}

export const WOOD = "#7a4a22"
export const DARK = "#1f2937"
export const STEEL = "#6b7280"

interface VoxProps {
  p: V3
  s?: V3
  r?: V3
  c?: string
  material?: THREE.Material
  ref?: Ref<THREE.Mesh>
}

export function Vox({ p, s = [1, 1, 1], r, c = "#ffffff", material, ref }: VoxProps) {
  return (
    <mesh
      ref={ref}
      position={p}
      scale={s}
      rotation={r}
      geometry={BOX}
      material={material ?? mat(c)}
      castShadow
      receiveShadow
    />
  )
}

/** Tiny bitmap font: each glyph is rows of "1" (filled) and "0" (empty). */
const GLYPHS: Record<string, string[]> = {
  A: ["010", "101", "111", "101", "101"],
  D: ["110", "101", "101", "101", "110"],
  S: ["011", "100", "010", "001", "110"],
  H: ["101", "101", "111", "101", "101"],
  O: ["010", "101", "101", "101", "010"],
  P: ["110", "101", "110", "100", "100"],
  "1": ["010", "110", "010", "010", "111"],
  "2": ["110", "001", "010", "100", "111"],
  "3": ["110", "001", "010", "001", "110"],
  "<": ["001", "010", "100", "010", "001"],
  ">": ["100", "010", "001", "010", "100"],
  "/": ["001", "001", "010", "100", "100"],
}

interface PixelProps {
  rows: string[]
  size?: number
  depth?: number
  c: string
  p?: V3
}

/** Renders a bitmap (rows of 0/1) as voxels, centred on `p`, facing +z. */
export function PixelArt({ rows, size = 0.1, depth = 0.05, c, p = [0, 0, 0] }: PixelProps) {
  const cells = useMemo(() => {
    const width = Math.max(...rows.map((row) => row.length))
    const out: V3[] = []
    rows.forEach((row, y) =>
      row.split("").forEach((cell, x) => {
        if (cell === "1") {
          out.push([(x - (width - 1) / 2) * size, ((rows.length - 1) / 2 - y) * size, 0])
        }
      })
    )
    return out
  }, [rows, size])

  return (
    <group position={p}>
      {cells.map((cell, i) => (
        <Vox key={i} p={cell} s={[size, size, depth]} c={c} />
      ))}
    </group>
  )
}

export function PixelText({ text, ...props }: Omit<PixelProps, "rows"> & { text: string }) {
  const rows = useMemo(() => {
    const glyphs = text.split("").map((ch) => GLYPHS[ch] ?? GLYPHS.O)
    return [0, 1, 2, 3, 4].map((y) => glyphs.map((g) => g[y]).join("0"))
  }, [text])
  return <PixelArt rows={rows} {...props} />
}

function shade(color: string, amount: number) {
  return `#${new THREE.Color(color).offsetHSL(0, 0, amount).getHexString()}`
}

interface TreeProps {
  kind: TreeKind
  leaf: string
  p: V3
  seed: number
}

export function Tree({ kind, leaf, p, seed }: TreeProps) {
  const scale = 0.8 + hash2(seed, 3) * 0.45
  const rotation: V3 = [0, hash2(seed, 7) * Math.PI, 0]
  const light = shade(leaf, 0.08)

  return (
    <group position={p} scale={scale} rotation={rotation}>
      {kind === "round" && (
        <>
          <Vox p={[0, 0.35, 0]} s={[0.25, 0.7, 0.25]} c={WOOD} />
          <Vox p={[0, 1.0, 0]} s={[0.85, 0.7, 0.85]} c={leaf} />
          <Vox p={[0, 1.5, 0]} s={[0.5, 0.35, 0.5]} c={light} />
        </>
      )}
      {(kind === "pine" || kind === "snowpine") && (
        <>
          <Vox p={[0, 0.3, 0]} s={[0.22, 0.6, 0.22]} c={WOOD} />
          <Vox p={[0, 0.8, 0]} s={[0.9, 0.4, 0.9]} c={leaf} />
          <Vox p={[0, 1.2, 0]} s={[0.65, 0.4, 0.65]} c={kind === "snowpine" ? "#ffffff" : light} />
          <Vox p={[0, 1.6, 0]} s={[0.38, 0.4, 0.38]} c={kind === "snowpine" ? "#f1f5f9" : leaf} />
        </>
      )}
      {kind === "cactus" && (
        <>
          <Vox p={[0, 0.6, 0]} s={[0.35, 1.2, 0.35]} c={leaf} />
          <Vox p={[0.3, 0.6, 0]} s={[0.28, 0.16, 0.2]} c={leaf} />
          <Vox p={[0.38, 0.85, 0]} s={[0.18, 0.4, 0.18]} c={light} />
          <Vox p={[-0.28, 0.85, 0]} s={[0.22, 0.14, 0.18]} c={leaf} />
          <Vox p={[-0.34, 1.02, 0]} s={[0.15, 0.3, 0.15]} c={light} />
        </>
      )}
      {kind === "rock" && (
        <>
          <Vox p={[0, 0.25, 0]} s={[0.85, 0.5, 0.7]} c="#8b8f98" />
          <Vox p={[0.1, 0.6, 0.05]} s={[0.5, 0.3, 0.45]} c="#a3a7af" />
        </>
      )}
      {kind === "crystal" && (
        <>
          <Vox p={[0, 0.5, 0]} s={[0.3, 1.0, 0.3]} r={[0.15, 0.6, 0.1]} c={leaf} />
          <Vox p={[0.3, 0.3, 0.1]} s={[0.22, 0.6, 0.22]} r={[-0.3, 0.2, -0.35]} c={light} />
          <Vox p={[-0.25, 0.25, -0.1]} s={[0.2, 0.5, 0.2]} r={[0.3, 0.4, 0.35]} c="#c4b5fd" />
        </>
      )}
    </group>
  )
}
