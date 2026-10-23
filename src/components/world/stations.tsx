"use client"

import { useMemo, useRef, type ComponentType } from "react"
import * as THREE from "three"
import {
  BLUE,
  BLUE_DARK,
  BLUE_LIGHT,
  GOLD,
  GRAY_300,
  GRAY_700,
  GRAY_800,
  GRAY_900,
  GREEN,
  Grow,
  Magnifier,
  Person,
  Pop,
  RED,
  Robot,
  StepLights,
  WHITE,
  useLambert,
  useTimeline,
} from "./anim"
import { fade, span } from "./timeline"
import { PixelArt, PixelText, Vox, WOOD, mat } from "./voxels"

// Each station acts out its service's four steps (the `approach` list in lib/services.ts) on the shared timeline.
// Local axes: +x runs along the track (screen right when the stop faces the camera), +z faces outward, y = 0 is
// the ground. Pop/Grow marks are in steps: 0.x is step 1, 1.x is step 2, and so on.

const CHECK = ["00001", "00010", "10100", "01000"]
const ARROW_UP = ["00100", "01110", "11111", "00100", "00100"]
const CURSOR = ["1000", "1100", "1110", "1111", "1110", "0011", "0001"]
const HEART = ["01010", "11111", "11111", "01110", "00100"]

/** Moves a group along a path driven by the timeline. */
function Mover({
  path,
  children,
}: {
  path: (t: number) => [number, number, number] | null
  children: React.ReactNode
}) {
  const ref = useRef<THREE.Group>(null)
  useTimeline((t) => {
    const g = ref.current
    if (!g) return
    const p = path(t)
    g.visible = p !== null
    if (p) g.position.set(...p)
  })
  return <group ref={ref}>{children}</group>
}

const lerp = (a: number, b: number, k: number) => a + (b - a) * k

// 01 · Brand & Web Design: Discover → Direction → Refine → Roll out
function DesignStation() {
  const stripes = [BLUE, BLUE_LIGHT, GREEN]
  return (
    <group>
      {/* Discover: a mood board fills with sticky notes, then the idea lights up */}
      <Vox p={[-1.5, 0.7, -0.5]} s={[0.1, 1.4, 0.1]} c={WOOD} />
      <Vox p={[-1.5, 1.3, -0.45]} s={[1.3, 1.0, 0.08]} c="#b45309" />
      {[WHITE, GOLD, BLUE_LIGHT, GREEN].map((c, i) => (
        <Pop key={c} at={0.1 + i * 0.15} p={[-1.8 + (i % 2) * 0.55, 1.1 + Math.floor(i / 2) * 0.4, -0.39]}>
          <Vox p={[0, 0, 0]} s={[0.36, 0.3, 0.03]} c={c} />
        </Pop>
      ))}
      <Pop at={0.8} p={[-1.5, 2.05, -0.45]}>
        <Vox p={[0, 0.25, 0]} s={[0.32, 0.36, 0.32]} c={GOLD} />
        <Vox p={[0, 0.02, 0]} s={[0.18, 0.12, 0.18]} c={GRAY_700} />
      </Pop>
      {/* Direction: three routes appear; Refine: two drop away */}
      {[BLUE, GREEN, "#f472b6"].map((c, i) => (
        <Pop key={c} at={1.1 + i * 0.2} until={i === 0 ? undefined : 2.1 + i * 0.1} p={[-0.6 + i * 0.6, 0, 1.0]}>
          <Vox p={[0, 0.28, 0]} s={[0.46, 0.56, 0.06]} c={c} />
          <Vox p={[0, 0.28, -0.05]} s={[0.5, 0.6, 0.04]} c={WHITE} />
        </Pop>
      ))}
      {/* Refine: the chosen route is painted onto the main canvas */}
      <Vox p={[0.25, 0.9, -0.3]} s={[0.12, 1.8, 0.12]} r={[0, 0, -0.1]} c={WOOD} />
      <Vox p={[1.35, 0.9, -0.3]} s={[0.12, 1.8, 0.12]} r={[0, 0, 0.1]} c={WOOD} />
      <Vox p={[0.8, 0.75, -0.18]} s={[1.4, 0.1, 0.25]} c={WOOD} />
      <Vox p={[0.8, 1.45, -0.28]} s={[1.3, 1.1, 0.08]} c={WHITE} />
      {stripes.map((c, i) => (
        <Grow key={c} from={2.0 + i * 0.25} to={2.25 + i * 0.25} p={[0.4 + i * 0.4, 0.95, -0.22]} s={[0.34, 0.95, 0.04]} c={c} />
      ))}
      {/* Roll out: the brand ships on a van */}
      <Mover path={(t) => (span(t, 3.0, 3.05) > 0 && fade(t) > 0 ? [lerp(0.6, 2.1, span(t, 3.25, 3.85)), 0, 0.85] : null)}>
        <Vox p={[0, 0.42, 0]} s={[0.95, 0.55, 0.5]} c={WHITE} />
        <Vox p={[0.55, 0.32, 0]} s={[0.3, 0.38, 0.48]} c={BLUE} />
        <Vox p={[-0.1, 0.45, 0.26]} s={[0.3, 0.3, 0.02]} c={BLUE} />
        {[-0.3, 0.4].map((x) => (
          <Vox key={x} p={[x, 0.1, 0]} s={[0.2, 0.2, 0.56]} c={GRAY_900} />
        ))}
      </Mover>
    </group>
  )
}

// 02 · Web Development: Scope → Build → Test → Launch & support
function WebDevStation() {
  const jib = useRef<THREE.Group>(null)
  const scan = useRef<THREE.Mesh>(null)
  const scanMaterial = useMemo(
    () => new THREE.MeshBasicMaterial({ color: GREEN, transparent: true, opacity: 0.5, depthWrite: false }),
    []
  )
  const dots = [useLambert(GRAY_700), useLambert(GRAY_700), useLambert(GRAY_700)]
  const flame = useLambert("#fb923c", true)

  useTimeline((t) => {
    if (jib.current) jib.current.rotation.y = Math.sin(t * 1.4) * 0.35 * span(t, 1, 1.1) * (1 - span(t, 2, 2.1))
    if (scan.current) {
      const k = span(t, 2.0, 2.6)
      scan.current.visible = k > 0 && k < 1
      scan.current.position.y = lerp(1.95, 0.15, k)
    }
    const tested = span(t, 2.6, 2.61) * fade(t)
    dots.forEach((m, i) => m.color.set(tested ? [RED, GOLD, GREEN][i] : GRAY_700))
    flame.emissiveIntensity = 1 + Math.sin(t * 30) * 0.4
  })

  return (
    <group>
      {/* Scope: the blueprint is drawn */}
      <Pop at={0.05} p={[0.75, 0.02, 0.25]}>
        <Vox p={[0, 0, 0]} s={[2.5, 0.04, 1.7]} c={BLUE_DARK} />
        {[0.25, 0.45, 0.65].map((at, i) => (
          <Pop key={at} at={at} p={[0, 0.03, -0.5 + i * 0.5]}>
            <Vox p={[0, 0, 0]} s={[2.2, 0.02, 0.05]} c={WHITE} />
          </Pop>
        ))}
        <Pop at={0.8} p={[0, 0.03, 0]}>
          <Vox p={[0, 0, 0]} s={[0.05, 0.02, 1.4]} c={WHITE} />
        </Pop>
      </Pop>
      {/* Build: the crane drops the site together piece by piece */}
      <Vox p={[-1.7, 0.1, -0.6]} s={[0.7, 0.2, 0.7]} c={GRAY_700} />
      <Vox p={[-1.7, 1.8, -0.6]} s={[0.26, 3.4, 0.26]} c={GOLD} />
      <group ref={jib} position={[-1.7, 3.55, -0.6]}>
        <Vox p={[1.1, 0, 0]} s={[2.9, 0.2, 0.2]} c={GOLD} />
        <Vox p={[-0.55, -0.1, 0]} s={[0.45, 0.4, 0.4]} c={GRAY_700} />
        <Vox p={[2.4, -0.7, 0]} s={[0.04, 1.4, 0.04]} c={GRAY_900} />
      </group>
      <group position={[0.75, 0, 0.1]}>
        <Pop at={1.0} drop={1.5}>
          <Vox p={[0, 0.06, 0]} s={[2.2, 0.12, 0.6]} c={GRAY_700} />
        </Pop>
        <Pop at={1.2} drop={1.5}>
          <Vox p={[0, 1.0, -0.05]} s={[2.1, 1.8, 0.4]} c={WHITE} />
        </Pop>
        <Pop at={1.4} drop={1.5} p={[0, 2.0, 0]}>
          <Vox p={[0, 0, -0.05]} s={[2.14, 0.24, 0.44]} c={GRAY_900} />
          {dots.map((m, i) => (
            <Vox key={i} p={[-0.85 + i * 0.18, 0, 0.18]} s={[0.1, 0.1, 0.03]} material={m} />
          ))}
        </Pop>
        <Pop at={1.6} drop={1.2} p={[0, 1.6, 0.17]}>
          <Vox p={[0, 0, 0]} s={[1.85, 0.32, 0.04]} c={BLUE} />
        </Pop>
        <Pop at={1.75} drop={1.2} p={[-0.35, 1.15, 0.17]}>
          <Vox p={[0, 0.05, 0]} s={[1.1, 0.1, 0.04]} c={GRAY_300} />
          <Vox p={[-0.1, -0.15, 0]} s={[0.9, 0.1, 0.04]} c={GRAY_300} />
        </Pop>
        <Pop at={1.9} drop={1.2} p={[0.6, 1.0, 0.17]}>
          <Vox p={[0, 0, 0]} s={[0.55, 0.5, 0.04]} c={BLUE_LIGHT} />
        </Pop>
        <Pop at={2.0} drop={1.2} p={[-0.45, 0.5, 0.17]}>
          <Vox p={[0, 0, 0]} s={[0.7, 0.2, 0.04]} c={BLUE} />
        </Pop>
        {/* Test: a scan passes over the page and it gets a green tick */}
        <mesh ref={scan} material={scanMaterial} position={[0, 1, 0.22]}>
          <boxGeometry args={[2.2, 0.08, 0.02]} />
        </mesh>
        <Pop at={2.6} p={[0.6, 0.45, 0.22]}>
          <PixelArt rows={CHECK} size={0.09} c={GREEN} />
        </Pop>
      </group>
      {/* Launch: lift-off */}
      <Mover path={(t) => (span(t, 3.0, 3.01) > 0 && span(t, 3.85, 3.9) < 1 ? [2.0, span(t, 3.3, 3.9) ** 2 * 6, 1.0] : null)}>
        <Vox p={[0, 0.65, 0]} s={[0.36, 0.9, 0.36]} c={WHITE} />
        <Vox p={[0, 1.2, 0]} s={[0.24, 0.24, 0.24]} c={BLUE} />
        <Vox p={[0, 0.75, 0.19]} s={[0.14, 0.14, 0.02]} c={BLUE_LIGHT} />
        {[-0.24, 0.24].map((x) => (
          <Vox key={x} p={[x, 0.3, 0]} s={[0.14, 0.3, 0.14]} c={BLUE_DARK} />
        ))}
        <Vox p={[0, 0.1, 0]} s={[0.2, 0.22, 0.2]} material={flame} />
      </Mover>
    </group>
  )
}

// 03 · E-commerce: Audit → Design the store → Build & migrate → Grow
function EcommerceStation() {
  const coinGeometry = useMemo(() => new THREE.CylinderGeometry(0.2, 0.2, 0.08, 10), [])
  const parcelPath = (offset: number) => (t: number) => {
    if (span(t, 2.0, 2.05) === 0 || fade(t) === 0) return null
    const k = (span(t, 2.0, 4.0) * 3 + offset) % 1
    return [lerp(1.65, -0.1, k), 0.56, 0.6] as [number, number, number]
  }

  return (
    <group>
      {/* Audit: count and check the existing stock */}
      {[
        [1.75, 0.3, -0.55],
        [1.75, 0.82, -0.55],
        [1.75, 0.3, 0.1],
      ].map((p, i) => (
        <group key={i}>
          <Vox p={p as [number, number, number]} s={[0.5, 0.5, 0.5]} c="#b07a3f" />
          <Pop at={0.3 + i * 0.22} p={[p[0] + 0.32, p[1] + 0.05, p[2] + 0.26]}>
            <PixelArt rows={CHECK} size={0.06} c={GREEN} />
          </Pop>
        </group>
      ))}
      <Mover path={(t) => (span(t, 0.05, 0.1) > 0 && span(t, 0.95, 1) < 1 ? [1.6 + Math.sin(t * 2) * 0.3, 1.4, 0.4] : null)}>
        <Magnifier />
      </Mover>
      {/* Design the store: the storefront goes up */}
      <group position={[-0.9, 0, -0.3]}>
        <Pop at={1.0} drop={1.2}>
          <Vox p={[0, 0.72, 0]} s={[2, 1.44, 1.2]} c={WHITE} />
          <Vox p={[-0.45, 0.48, 0.61]} s={[0.42, 0.9, 0.03]} c={GRAY_800} />
          <Vox p={[0.4, 0.8, 0.61]} s={[0.7, 0.5, 0.03]} c={BLUE_LIGHT} />
        </Pop>
        <Pop at={1.3} drop={1}>
          <Vox p={[0, 1.55, 0]} s={[2.2, 0.22, 1.4]} c={BLUE_DARK} />
        </Pop>
        {[0, 1, 2, 3, 4].map((i) => (
          <Pop key={i} at={1.5 + i * 0.07} p={[-0.8 + i * 0.4, 1.25, 0.85]}>
            <Vox p={[0, 0, 0]} s={[0.4, 0.1, 0.55]} r={[0.35, 0, 0]} c={i % 2 ? WHITE : BLUE} />
          </Pop>
        ))}
        <Pop at={1.9} p={[0, 1.9, 0]}>
          <Vox p={[0, 0, 0]} s={[1.3, 0.45, 0.12]} c={BLUE} />
          <PixelText text="SHOP" size={0.07} c={WHITE} p={[0, 0, 0.07]} />
        </Pop>
      </group>
      {/* Build & migrate: stock rides the conveyor into the new store */}
      <Pop at={1.95} p={[0.8, 0, 0.6]}>
        <Vox p={[0, 0.17, 0]} s={[1.9, 0.3, 0.55]} c={GRAY_700} />
        <Vox p={[0, 0.34, 0]} s={[1.9, 0.04, 0.45]} c={GRAY_900} />
      </Pop>
      {[0, 1 / 3, 2 / 3].map((offset) => (
        <Mover key={offset} path={parcelPath(offset)}>
          <Vox p={[0, 0, 0]} s={[0.34, 0.34, 0.34]} c="#c08a4f" />
          <Vox p={[0, 0.005, 0]} s={[0.07, 0.35, 0.35]} c="#e9d5a8" />
        </Mover>
      ))}
      {/* Grow: sales stack up */}
      {[0, 1, 2, 3, 4].map((i) => (
        <Pop key={i} at={3.0 + i * 0.12} drop={0.8} p={[-2.0, 0.05 + i * 0.1, 0.95]}>
          <mesh geometry={coinGeometry} material={mat(GOLD)} castShadow />
        </Pop>
      ))}
      <Pop at={3.6} p={[-2.0, 1.0, 0.95]}>
        <PixelArt rows={ARROW_UP} size={0.08} c={GREEN} />
      </Pop>
    </group>
  )
}

// 04 · SEO: Audit → Fix the foundation → Build authority → Measure & repeat
function SeoStation() {
  const errors = [useLambert(RED, true), useLambert(RED, true), useLambert(RED, true)]
  const flag = useRef<THREE.Group>(null)

  useTimeline((t) => {
    errors.forEach((m, i) => {
      const fixed = span(t, 1.15 + i * 0.25, 1.16 + i * 0.25) * fade(t) > 0
      m.color.set(fixed ? GREEN : RED)
      m.emissive.set(fixed ? GREEN : RED)
      m.emissiveIntensity = fixed ? 0.5 : 0.4 + Math.sin(t * 8) * 0.3
    })
    if (flag.current) flag.current.rotation.y = Math.sin(t * 3) * 0.3
  })

  return (
    <group>
      {/* Audit: inspect the site and find the problems */}
      <Vox p={[-0.95, 0.3, 0]} s={[1.8, 0.6, 1.3]} c={GRAY_800} />
      <Vox p={[-0.95, 0.62, 0]} s={[1.6, 0.04, 1.1]} c={GRAY_700} />
      {errors.map((m, i) => (
        <Pop key={i} at={0.25 + i * 0.2} p={[-1.5 + i * 0.55, 0.66, i === 1 ? 0.3 : -0.2]}>
          <Vox p={[0, 0.11, 0]} s={[0.22, 0.22, 0.22]} material={m} />
        </Pop>
      ))}
      <Mover path={(t) => (span(t, 0.05, 0.1) > 0 && span(t, 1.0, 1.05) < 1 ? [lerp(-1.8, -0.1, span(t, 0.1, 0.95)), 1.4, 0.5] : null)}>
        <Magnifier />
      </Mover>
      {/* Fix the foundation: a wrench works each issue, red turns green */}
      <Mover
        path={(t) =>
          span(t, 1.05, 1.1) > 0 && span(t, 1.95, 2) < 1
            ? [lerp(-1.5, -0.4, span(t, 1.1, 1.8)), 1.15 + Math.abs(Math.sin(t * 9)) * 0.15, 0.1]
            : null
        }
      >
        <Vox p={[0, 0, 0]} s={[0.1, 0.45, 0.1]} r={[0, 0, 0.6]} c={GRAY_300} />
        <Vox p={[0.14, 0.2, 0]} s={[0.22, 0.12, 0.12]} r={[0, 0, 0.6]} c={GRAY_300} />
      </Mover>
      {/* Build authority: links connect in, content stacks up */}
      {[0, 1, 2].map((i) => (
        <Pop key={i} at={2.0 + i * 0.12} p={[-0.05 + i * 0.22, 0.12, 0.85]}>
          <Vox p={[0, 0, 0]} s={[0.16, 0.16, 0.16]} c={BLUE_LIGHT} />
        </Pop>
      ))}
      <Grow from={2.1} to={2.4} p={[0.55, 0, 0]} s={[0.45, 0.7, 0.6]} c={BLUE_LIGHT} />
      <Grow from={2.35} to={2.65} p={[1.05, 0, 0]} s={[0.45, 1.2, 0.6]} c={BLUE} />
      <Grow from={2.6} to={2.95} p={[1.55, 0, 0]} s={[0.45, 1.8, 0.6]} c={BLUE_DARK} />
      {/* Measure & repeat: number one, and climbing */}
      <Pop at={3.05} p={[1.55, 1.8, 0]}>
        <Vox p={[0, 0.55, 0]} s={[0.06, 1.1, 0.06]} c={WHITE} />
        <group ref={flag} position={[0, 0.9, 0]}>
          <Vox p={[0.27, 0, 0]} s={[0.5, 0.32, 0.04]} c={GREEN} />
        </group>
      </Pop>
      <Pop at={3.2} p={[1.55, 1.2, 0.31]}>
        <PixelText text="1" size={0.09} c={WHITE} />
      </Pop>
      <Pop at={3.4} p={[0.5, 2.0, 0.3]}>
        <PixelArt rows={ARROW_UP} size={0.13} c={GREEN} />
      </Pop>
    </group>
  )
}

// 05 · Digital Marketing & Google Ads: Audit & plan → Produce → Launch → Optimize & report
function MarketingStation() {
  const face = useLambert(GRAY_900)
  const bulbMaterials = useMemo(
    () => Array.from({ length: 5 }, () => new THREE.MeshLambertMaterial({ color: GOLD, emissive: GOLD, emissiveIntensity: 0 })),
    []
  )
  const flash = useLambert(WHITE, true)
  const cursor = useRef<THREE.Group>(null)

  useTimeline((t) => {
    const live = span(t, 2.0, 2.02) * fade(t) > 0
    face.color.set(live ? BLUE : GRAY_900)
    bulbMaterials.forEach((m, i) => {
      m.emissiveIntensity = live && Math.floor(t * 6) % bulbMaterials.length === i ? 1.4 : 0.05
    })
    const produce = span(t, 1.0, 1.05) > 0 && span(t, 2.0, 2.05) < 1
    flash.emissiveIntensity = produce && (t * 1.6) % 1 < 0.12 ? 2 : 0
    if (cursor.current) {
      const k = (t * 0.9) % 1
      cursor.current.position.z = -Math.sin(k * Math.PI) * 0.3
    }
  })

  const heartPath = (dx: number, offset: number) => (t: number) => {
    if (span(t, 2.3, 2.35) === 0 || fade(t) === 0) return null
    const k = (t * 0.5 + offset) % 1
    return [0.75 + dx * k, 3.1 + k * 0.9, -0.2 + k * 0.8] as [number, number, number]
  }

  return (
    <group>
      {/* Audit & plan: review the accounts, then fill the campaign calendar */}
      <Vox p={[-1.6, 0.6, -0.4]} s={[0.1, 1.2, 0.1]} c={WOOD} />
      <Vox p={[-1.6, 1.4, -0.38]} s={[1.2, 1.0, 0.08]} c={WHITE} />
      <Vox p={[-1.6, 1.86, -0.33]} s={[1.2, 0.12, 0.04]} c={BLUE} />
      <Mover path={(t) => (span(t, 0.05, 0.1) > 0 && span(t, 0.5, 0.55) < 1 ? [lerp(-2.2, -1.0, span(t, 0.1, 0.5)), 1.4, 0.3] : null)}>
        <Magnifier />
      </Mover>
      {Array.from({ length: 9 }, (_, i) => (
        <Pop key={i} at={0.5 + i * 0.05} p={[-1.95 + (i % 3) * 0.35, 1.6 - Math.floor(i / 3) * 0.27, -0.33]}>
          <Vox p={[0, 0, 0]} s={[0.26, 0.18, 0.03]} c={[BLUE_LIGHT, GREEN, GOLD][i % 3]} />
        </Pop>
      ))}
      {/* Produce: shoot the ads and the content */}
      <Pop at={1.05} p={[-0.6, 0, 0.75]}>
        {[-0.15, 0.15].map((x) => (
          <Vox key={x} p={[x, 0.35, 0]} s={[0.05, 0.7, 0.05]} r={[0, 0, x > 0 ? 0.2 : -0.2]} c={GRAY_700} />
        ))}
        <Vox p={[0, 0.8, 0]} s={[0.45, 0.3, 0.3]} c={GRAY_900} />
        <Vox p={[0.1, 0.8, 0.2]} s={[0.16, 0.16, 0.12]} c={GRAY_700} />
        <Vox p={[-0.12, 0.98, 0]} s={[0.12, 0.06, 0.12]} material={flash} />
      </Pop>
      {[BLUE_LIGHT, GREEN, GOLD].map((c, i) => (
        <Pop key={c} at={1.4 + i * 0.25} p={[0.1 + i * 0.4, 0, 1.1]}>
          <Vox p={[0, 0.2, 0]} s={[0.32, 0.4, 0.05]} c={c} />
        </Pop>
      ))}
      {/* Launch: the billboard goes live, the clicks and the likes come in */}
      <Vox p={[0.05, 1.0, -0.3]} s={[0.14, 2.0, 0.14]} c={WOOD} />
      <Vox p={[1.45, 1.0, -0.3]} s={[0.14, 2.0, 0.14]} c={WOOD} />
      <Vox p={[0.75, 2.3, -0.35]} s={[2.1, 1.2, 0.15]} c={GRAY_800} />
      <Vox p={[0.75, 2.3, -0.25]} s={[1.9, 1.0, 0.06]} material={face} />
      {bulbMaterials.map((m, i) => (
        <Vox key={i} p={[-0.05 + i * 0.4, 2.98, -0.3]} s={[0.12, 0.12, 0.12]} material={m} />
      ))}
      <Pop at={2.05} p={[0.75, 2.3, -0.2]}>
        <PixelText text="AD" size={0.14} c={WHITE} />
      </Pop>
      <Pop at={2.2} p={[1.2, 1.95, 0.05]}>
        <group ref={cursor}>
          <PixelArt rows={CURSOR} size={0.08} depth={0.06} c={WHITE} />
        </group>
      </Pop>
      {[-0.8, 0.2, 0.9].map((dx, i) => (
        <Mover key={dx} path={heartPath(dx, i / 3)}>
          <PixelArt rows={HEART} size={0.06} c={i === 1 ? GREEN : BLUE_LIGHT} />
        </Mover>
      ))}
      {/* Optimize & report: tune the spend, the results climb */}
      <Grow from={3.0} to={3.25} p={[1.35, 0, 0.75]} s={[0.25, 0.4, 0.25]} c={BLUE_LIGHT} />
      <Grow from={3.2} to={3.45} p={[1.65, 0, 0.75]} s={[0.25, 0.7, 0.25]} c={BLUE} />
      <Grow from={3.4} to={3.65} p={[1.95, 0, 0.75]} s={[0.25, 1.05, 0.25]} c={GREEN} />
      <Pop at={3.65} p={[1.65, 1.45, 0.75]}>
        <PixelArt rows={ARROW_UP} size={0.08} c={GREEN} />
      </Pop>
    </group>
  )
}

// 08 · IT Support & Managed IT: Assess → Secure → Set up & migrate → Support
function ItStation() {
  const leds = useMemo(
    () => Array.from({ length: 4 }, () => new THREE.MeshLambertMaterial({ color: RED, emissive: RED, emissiveIntensity: 0.6 })),
    []
  )
  const screen = useLambert(GRAY_900)

  useTimeline((t) => {
    const secured = span(t, 1.4, 1.42) * fade(t) > 0
    leds.forEach((m, i) => {
      const c = secured ? GREEN : RED
      m.color.set(c)
      m.emissive.set(c)
      m.emissiveIntensity = secured ? 0.4 + (Math.sin(t * 6 + i) > 0 ? 0.6 : 0) : 0.3 + Math.abs(Math.sin(t * 8)) * 0.7
    })
    screen.color.set(span(t, 2.4, 2.42) * fade(t) > 0 ? BLUE : GRAY_900)
  })

  const uploadPath = (offset: number) => (t: number) => {
    if (span(t, 2.05, 2.1) === 0 || span(t, 2.95, 3) === 1 || fade(t) === 0) return null
    const k = (t * 0.7 + offset) % 1
    return [lerp(-1.4, 0.9, k), 1.75 + Math.sin(k * Math.PI) * 0.9, lerp(-0.2, -0.3, k)] as [number, number, number]
  }

  return (
    <group>
      {/* Assess: audit the network, devices and accounts */}
      <Vox p={[-1.4, 0.8, -0.2]} s={[0.75, 1.6, 0.65]} c={GRAY_800} />
      {leds.map((m, i) => (
        <group key={i}>
          <Vox p={[-1.4, 0.35 + i * 0.35, 0.14]} s={[0.6, 0.22, 0.02]} c={GRAY_900} />
          <Vox p={[-1.6, 0.35 + i * 0.35, 0.16]} s={[0.07, 0.07, 0.03]} material={m} />
        </group>
      ))}
      <Mover path={(t) => (span(t, 0.05, 0.1) > 0 && span(t, 0.95, 1) < 1 ? [-1.0, lerp(0.4, 1.7, span(t, 0.1, 0.9)), 0.6] : null)}>
        <Magnifier />
      </Mover>
      {[0, 1].map((i) => (
        <Pop key={i} at={0.4 + i * 0.25} until={1.4} p={[-1.85 + i * 0.9, 1.85 + i * 0.15, 0]}>
          <Vox p={[0, 0, 0]} s={[0.08, 0.26, 0.08]} c={RED} />
          <Vox p={[0, -0.22, 0]} s={[0.08, 0.08, 0.08]} c={RED} />
        </Pop>
      ))}
      {/* Secure: lock it down, red turns green */}
      <Pop at={1.1} p={[-0.6, 0, 0.6]}>
        <Vox p={[0, 0.4, 0]} s={[0.5, 0.42, 0.18]} c={GOLD} />
        <Vox p={[-0.16, 0.74, 0]} s={[0.07, 0.3, 0.1]} c={GRAY_300} />
        <Vox p={[0.16, 0.74, 0]} s={[0.07, 0.3, 0.1]} c={GRAY_300} />
        <Vox p={[0, 0.88, 0]} s={[0.39, 0.07, 0.1]} c={GRAY_300} />
        <Vox p={[0, 0.4, 0.1]} s={[0.08, 0.16, 0.02]} c={GRAY_900} />
      </Pop>
      {/* Set up & migrate: data moves up to the cloud, the new workstation comes online */}
      <Pop at={2.0} p={[1.1, 2.6, -0.3]}>
        <Vox p={[0, 0, 0]} s={[1.0, 0.4, 0.5]} c={WHITE} />
        <Vox p={[-0.2, 0.25, 0]} s={[0.45, 0.35, 0.45]} c={WHITE} />
        <Vox p={[0.22, 0.18, 0]} s={[0.4, 0.3, 0.42]} c={GRAY_300} />
      </Pop>
      {[0, 0.33, 0.66].map((o) => (
        <Mover key={o} path={uploadPath(o)}>
          <Vox p={[0, 0, 0]} s={[0.14, 0.14, 0.14]} c={BLUE_LIGHT} />
        </Mover>
      ))}
      <Vox p={[0.9, 0.45, 0.2]} s={[1.5, 0.08, 0.8]} c={WOOD} />
      {[0.25, 1.55].map((x) => (
        <Vox key={x} p={[x, 0.2, 0.2]} s={[0.08, 0.42, 0.7]} c={WOOD} />
      ))}
      <Pop at={2.3} p={[0.65, 0.49, 0.2]}>
        <Vox p={[0, 0.02, 0.1]} s={[0.6, 0.04, 0.4]} c={GRAY_700} />
        <Vox p={[0, 0.22, -0.1]} s={[0.6, 0.4, 0.04]} c={GRAY_700} />
        <Vox p={[0, 0.22, -0.07]} s={[0.52, 0.32, 0.02]} material={screen} />
      </Pop>
      {/* Support: the help desk answers and closes the tickets */}
      <Pop at={3.0} p={[1.3, 0, 0.75]}>
        <Person shirt={BLUE} walking={false} />
        <Vox p={[0, 0.9, 0]} s={[0.28, 0.05, 0.05]} c={GRAY_900} />
        <Vox p={[0.13, 0.78, 0.08]} s={[0.05, 0.12, 0.12]} c={GRAY_900} />
      </Pop>
      {[0, 1, 2].map((i) => (
        <Pop key={i} at={3.1 + i * 0.15} p={[1.95, 0.35 + i * 0.4, 0.5]}>
          <Vox p={[0, 0, 0]} s={[0.36, 0.3, 0.04]} c={WHITE} />
        </Pop>
      ))}
      {[0, 1, 2].map((i) => (
        <Pop key={i} at={3.3 + i * 0.15} p={[1.95, 0.35 + i * 0.4, 0.54]}>
          <PixelArt rows={CHECK} size={0.05} depth={0.03} c={GREEN} />
        </Pop>
      ))}
    </group>
  )
}

// 06 · CRM & Custom Applications: Map the workflow → Prototype → Build in phases → Train & support
function CrmStation() {
  const ghost = useMemo(
    () => new THREE.MeshBasicMaterial({ color: BLUE_LIGHT, transparent: true, opacity: 0.18, depthWrite: false }),
    []
  )
  const edges = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(2.2, 1.95, 1.2)), [])
  const edgeMaterial = useMemo(() => new THREE.LineBasicMaterial({ color: BLUE_LIGHT, transparent: true }), [])
  const ghostGroup = useRef<THREE.Group>(null)
  const gear = useRef<THREE.Group>(null)
  const leds = useMemo(
    () => Array.from({ length: 15 }, (_, i) => new THREE.MeshLambertMaterial({ color: i % 3 ? GREEN : BLUE_LIGHT, emissive: i % 3 ? GREEN : BLUE_LIGHT })),
    []
  )
  const walker = (start: number, x0: number) => (t: number) => {
    if (span(t, start, start + 0.02) === 0 || fade(t) === 0) return null
    return [lerp(x0, 0.6, span(t, start, start + 0.5)), 0, 1.05] as [number, number, number]
  }

  useTimeline((t) => {
    const shown = span(t, 1.05, 1.15) * (1 - span(t, 2.8, 3.0)) * fade(t)
    if (ghostGroup.current) ghostGroup.current.visible = shown > 0.01
    ghost.opacity = 0.18 * shown
    edgeMaterial.opacity = shown
    if (gear.current) gear.current.rotation.z = t * 1.5
    leds.forEach((m, i) => (m.emissiveIntensity = Math.sin(t * 3 + i * 1.7) > 0.1 ? 1.2 : 0.05))
  })

  const nodes: [number, number][] = [
    [-1.9, 0.9],
    [-1.3, 1.25],
    [-0.6, 0.9],
    [-1.3, 0.55],
  ]

  return (
    <group>
      {/* Map the workflow: a flowchart is laid out on the ground */}
      {nodes.map(([x, z], i) => (
        <Pop key={i} at={0.1 + i * 0.2} p={[x, 0, z]}>
          <Vox p={[0, 0.1, 0]} s={[0.3, 0.2, 0.3]} c={[BLUE, GREEN, GOLD, BLUE_LIGHT][i]} />
        </Pop>
      ))}
      {[
        [-1.6, 1.07, 0.6],
        [-0.95, 1.07, -0.6],
        [-0.95, 0.72, 0.6],
      ].map(([x, z, r], i) => (
        <Pop key={i} at={0.25 + i * 0.2} p={[x, 0.08, z]}>
          <Vox p={[0, 0, 0]} s={[0.5, 0.04, 0.06]} r={[0, r, 0]} c={WHITE} />
        </Pop>
      ))}
      {/* Prototype: a see-through mock-up of the system */}
      <group ref={ghostGroup} position={[0.6, 0.98, -0.4]}>
        <mesh material={ghost}>
          <boxGeometry args={[2.2, 1.95, 1.2]} />
        </mesh>
        <lineSegments geometry={edges} material={edgeMaterial} />
      </group>
      {/* Build in phases: it goes up one floor at a time */}
      {[0, 1, 2].map((floor) => (
        <Pop key={floor} at={2.0 + floor * 0.25} drop={1.2} p={[0.6, floor * 0.65, -0.4]}>
          <Vox p={[0, 0.32, 0]} s={[2.2, 0.64, 1.2]} c={floor === 2 ? GRAY_700 : GRAY_800} />
          {[0, 1, 2, 3, 4].map((i) => (
            <Vox key={i} p={[-0.8 + i * 0.4, 0.32, 0.61]} s={[0.22, 0.08, 0.03]} material={leds[floor * 5 + i]} />
          ))}
        </Pop>
      ))}
      <Pop at={2.9} p={[0.6, 1.95, -0.4]}>
        <Vox p={[0, 0.06, 0]} s={[2.3, 0.12, 1.3]} c={WHITE} />
      </Pop>
      {/* Train & support: the team moves in and the machine runs */}
      <Pop at={3.0} p={[1.1, 2.55, -0.4]}>
        <group ref={gear}>
          <Vox p={[0, 0, 0]} s={[0.5, 0.5, 0.15]} c={GRAY_300} />
          <Vox p={[0, 0, 0]} s={[0.5, 0.5, 0.15]} r={[0, 0, Math.PI / 4]} c={GRAY_300} />
        </group>
      </Pop>
      <Mover path={walker(3.05, 2.2)}>
        <Person shirt={BLUE} />
      </Mover>
      <Mover path={walker(3.25, 2.4)}>
        <group position={[0.35, 0, 0.2]}>
          <Person shirt={GREEN} />
        </group>
      </Mover>
    </group>
  )
}

// 07 · AI & Automation: Find the hours → Pilot → Scale → Monitor
function AiStation() {
  const hand = useRef<THREE.Group>(null)
  const clockFace = useMemo(() => new THREE.CylinderGeometry(0.45, 0.45, 0.1, 16), [])
  const stacks = useRef<(THREE.Group | null)[]>([])

  useTimeline((t) => {
    const busy = 1 - span(t, 3.0, 3.3)
    if (hand.current) hand.current.rotation.z = -t * (0.6 + busy * 5)
    stacks.current.forEach((stack, i) => {
      if (!stack) return
      const grown = span(t, 0.1 + i * 0.15, 0.6 + i * 0.15)
      const cleared = i === 0 ? span(t, 1.3, 1.9) : span(t, 2.3 + (i - 1) * 0.15, 2.8 + (i - 1) * 0.15)
      const v = grown * (1 - cleared) * fade(t)
      stack.visible = v > 0.001
      stack.scale.y = Math.max(v, 0.0001)
    })
  })

  return (
    <group>
      {/* Find the hours: the clock races while paperwork piles up */}
      <group position={[-1.7, 1.5, -0.4]}>
        <Vox p={[0, -0.75, 0]} s={[0.1, 1.0, 0.1]} c={GRAY_700} />
        <mesh geometry={clockFace} material={mat(WHITE)} rotation={[Math.PI / 2, 0, 0]} castShadow />
        <group ref={hand} position={[0, 0, 0.07]}>
          <Vox p={[0, 0.16, 0]} s={[0.05, 0.32, 0.02]} c={GRAY_900} />
        </group>
      </group>
      {[0, 1, 2].map((i) => (
        <group
          key={i}
          ref={(el) => {
            stacks.current[i] = el
          }}
          position={[-0.9 + i * 0.5, 0, 1.0]}
          scale={[1, 0.0001, 1]}
        >
          <Vox p={[0, 0.35, 0]} s={[0.36, 0.7, 0.46]} c={WHITE} />
          <Vox p={[0, 0.5, 0.24]} s={[0.26, 0.04, 0.01]} c={GRAY_300} />
        </group>
      ))}
      {/* Pilot: one assistant takes on the first pile */}
      <Pop at={1.05} p={[0.1, 0, -0.2]}>
        <Robot seed={0} />
      </Pop>
      {/* Scale: more assistants clear the rest */}
      <Pop at={2.05} p={[0.9, 0, -0.4]}>
        <Robot seed={1} />
      </Pop>
      <Pop at={2.2} p={[1.7, 0, -0.1]}>
        <Robot seed={2} />
      </Pop>
      {/* Monitor: a person keeps an eye on it, everything green */}
      <Pop at={3.05} p={[1.6, 0, 1.0]}>
        <Person shirt={BLUE} walking={false} />
        <Vox p={[-0.35, 0.45, 0]} s={[0.06, 0.9, 0.06]} c={GRAY_700} />
        <Vox p={[-0.35, 0.95, 0]} s={[0.5, 0.35, 0.05]} c={GRAY_900} />
        <Vox p={[-0.35, 0.95, 0.03]} s={[0.4, 0.25, 0.02]} c={GREEN} />
      </Pop>
      <Pop at={3.3} p={[0.5, 2.0, 0]}>
        <PixelArt rows={CHECK} size={0.16} c={GREEN} />
      </Pop>
    </group>
  )
}

function withSteps(Station: ComponentType) {
  function StationWithSteps() {
    return (
      <>
        <Station />
        <StepLights />
      </>
    )
  }
  return StationWithSteps
}

export const stations: Record<string, ComponentType> = {
  "branding-design": withSteps(DesignStation),
  "web-development": withSteps(WebDevStation),
  ecommerce: withSteps(EcommerceStation),
  seo: withSteps(SeoStation),
  "digital-marketing": withSteps(MarketingStation),
  "crm-custom-software": withSteps(CrmStation),
  "ai-automation": withSteps(AiStation),
  "it-support": withSteps(ItStation),
}

