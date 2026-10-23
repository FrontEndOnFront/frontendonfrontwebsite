"use client"

import { useMemo, useRef, type ComponentType } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { DARK, PixelArt, PixelText, STEEL, Tree, Vox, WOOD, mat } from "./voxels"

// Each station is a little animated diorama for one service. Local axes:
// +x runs along the track (screen right when the stop faces the camera), +z faces outward, y = 0 is the ground.

const BRAND = "#2563eb"
const RAIL = "#ff5a36"
const GOLD = "#fbbf24"

function useMaterials(colors: string[], emissive = false) {
  return useMemo(
    () =>
      colors.map(
        (color) =>
          new THREE.MeshLambertMaterial({ color, emissive: emissive ? color : "#000000", emissiveIntensity: 0 })
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [colors.join(",")]
  )
}

function DesignStation() {
  const stripes = useMaterials(["#f43f5e", "#f59e0b", "#3b82f6"])
  const orbit = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    stripes.forEach((m, i) => m.color.setHSL((t * 0.06 + i * 0.25) % 1, 0.75, 0.58))
    if (orbit.current) orbit.current.rotation.y = t * 0.9
  })

  return (
    <group>
      <Vox p={[-0.72, 0.9, -0.15]} s={[0.14, 1.8, 0.14]} r={[0, 0, -0.12]} c={WOOD} />
      <Vox p={[0.72, 0.9, -0.15]} s={[0.14, 1.8, 0.14]} r={[0, 0, 0.12]} c={WOOD} />
      <Vox p={[0, 0.85, -0.6]} s={[0.14, 1.7, 0.14]} r={[-0.35, 0, 0]} c={WOOD} />
      <Vox p={[0, 0.8, 0.02]} s={[1.6, 0.12, 0.3]} c={WOOD} />
      <Vox p={[0, 1.6, -0.1]} s={[1.5, 1.3, 0.1]} c="#fffaf0" />
      {stripes.map((m, i) => (
        <Vox key={i} p={[-0.45 + i * 0.45, 1.6, -0.03]} s={[0.36, 1.0, 0.06]} material={m} />
      ))}
      <Vox p={[-1.6, 0.22, 0.6]} s={[0.45, 0.45, 0.45]} c="#f43f5e" />
      <Vox p={[-1.05, 0.17, 0.95]} s={[0.35, 0.35, 0.35]} c="#facc15" />
      <Vox p={[1.55, 0.22, 0.75]} s={[0.45, 0.45, 0.45]} c="#22d3ee" />
      <group ref={orbit} position={[1.4, 2.3, 0]}>
        {["#f472b6", "#facc15", "#22d3ee"].map((c, i) => (
          <Vox
            key={c}
            p={[Math.cos(i * 2.09) * 0.6, Math.sin(i * 1.3) * 0.2, Math.sin(i * 2.09) * 0.6]}
            s={[0.28, 0.28, 0.28]}
            c={c}
          />
        ))}
      </group>
    </group>
  )
}

function WebDevStation() {
  const jib = useRef<THREE.Group>(null)
  const cable = useRef<THREE.Mesh>(null)
  const load = useRef<THREE.Mesh>(null)
  const button = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (jib.current) jib.current.rotation.y = Math.sin(t * 0.5) * 0.6
    const drop = 1.3 + Math.sin(t * 1.2) * 0.35
    if (cable.current) {
      cable.current.scale.y = drop
      cable.current.position.y = -drop / 2
    }
    if (load.current) load.current.position.y = -drop - 0.22
    if (button.current) {
      const w = 0.1 + ((t * 0.3) % 1) * 0.8
      button.current.scale.x = w
      button.current.position.x = 0.2 + w / 2
    }
  })

  return (
    <group>
      {/* crane */}
      <Vox p={[-1.6, 0.1, -0.5]} s={[0.8, 0.2, 0.8]} c={STEEL} />
      <Vox p={[-1.6, 1.8, -0.5]} s={[0.3, 3.4, 0.3]} c="#f5b301" />
      {[0.7, 1.5, 2.3, 3.1].map((y) => (
        <Vox key={y} p={[-1.6, y, -0.5]} s={[0.32, 0.08, 0.32]} c="#3f3f46" />
      ))}
      <group ref={jib} position={[-1.6, 3.6, -0.5]}>
        <Vox p={[1.1, 0, 0]} s={[3.0, 0.22, 0.22]} c="#f5b301" />
        <Vox p={[-0.6, -0.1, 0]} s={[0.5, 0.4, 0.4]} c={STEEL} />
        <group position={[2.3, -0.1, 0]}>
          <Vox ref={cable} p={[0, -0.65, 0]} s={[0.04, 1.3, 0.04]} c={DARK} />
          <Vox ref={load} p={[0, -1.5, 0]} s={[0.42, 0.42, 0.42]} c={BRAND} />
        </group>
      </group>
      {/* the website being built */}
      <group position={[0.9, 0, 0.2]}>
        <Vox p={[0, 0.95, 0]} s={[2.2, 1.9, 0.5]} c="#f8fafc" />
        <Vox p={[0, 2.0, 0]} s={[2.24, 0.24, 0.54]} c={DARK} />
        {["#ef4444", "#f59e0b", "#22c55e"].map((c, i) => (
          <Vox key={c} p={[-0.9 + i * 0.2, 2.0, 0.28]} s={[0.1, 0.1, 0.04]} c={c} />
        ))}
        <Vox p={[0, 1.6, 0.27]} s={[1.9, 0.35, 0.05]} c={BRAND} />
        <Vox p={[-0.35, 1.2, 0.27]} s={[1.2, 0.12, 0.05]} c="#cbd5e1" />
        <Vox p={[-0.45, 0.98, 0.27]} s={[1.0, 0.12, 0.05]} c="#cbd5e1" />
        <Vox p={[0.68, 1.05, 0.27]} s={[0.55, 0.5, 0.05]} c="#93c5fd" />
        <group position={[-1.0, 0, 0]}>
          <Vox ref={button} p={[0.6, 0.55, 0.27]} s={[0.8, 0.22, 0.05]} c={RAIL} />
        </group>
      </group>
      {/* traffic cones */}
      {[-0.4, 2.1].map((x) => (
        <group key={x} position={[x, 0, 1.1]}>
          <Vox p={[0, 0.05, 0]} s={[0.4, 0.1, 0.4]} c={RAIL} />
          <Vox p={[0, 0.25, 0]} s={[0.24, 0.3, 0.24]} c={RAIL} />
          <Vox p={[0, 0.3, 0]} s={[0.26, 0.08, 0.26]} c="#ffffff" />
        </group>
      ))}
    </group>
  )
}

function EcommerceStation() {
  const parcels = useRef<(THREE.Group | null)[]>([])
  const coin = useRef<THREE.Group>(null)
  const coinGeometry = useMemo(() => new THREE.CylinderGeometry(0.32, 0.32, 0.08, 10), [])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    parcels.current.forEach((parcel, i) => {
      if (!parcel) return
      const k = (t * 0.25 + i / 3) % 1
      parcel.position.x = 0.45 + k * 1.75
      parcel.scale.setScalar(k < 0.08 ? k / 0.08 : k > 0.92 ? (1 - k) / 0.08 : 1)
    })
    if (coin.current) {
      coin.current.rotation.y = t * 2
      coin.current.position.y = 2.6 + Math.sin(t * 2) * 0.12
    }
  })

  return (
    <group>
      <Vox p={[-0.8, 0.75, -0.3]} s={[2, 1.5, 1.3]} c="#fff4dc" />
      <Vox p={[-0.8, 1.62, -0.3]} s={[2.2, 0.25, 1.5]} c="#c2410c" />
      {[0, 1, 2, 3, 4].map((i) => (
        <Vox
          key={i}
          p={[-1.6 + i * 0.4, 1.3, 0.55]}
          s={[0.4, 0.1, 0.6]}
          r={[0.35, 0, 0]}
          c={i % 2 ? "#ffffff" : "#ef4444"}
        />
      ))}
      <Vox p={[-1.25, 0.48, 0.36]} s={[0.45, 0.9, 0.05]} c="#7c4a1f" />
      <Vox p={[-0.4, 0.8, 0.36]} s={[0.7, 0.5, 0.05]} c="#93c5fd" />
      <Vox p={[-0.8, 2.05, -0.3]} s={[1.3, 0.5, 0.12]} c={BRAND} />
      <PixelText text="SHOP" size={0.07} c="#ffffff" p={[-0.8, 2.05, -0.22]} />
      {/* conveyor */}
      <Vox p={[1.35, 0.17, 0.3]} s={[2.0, 0.3, 0.7]} c="#4b5563" />
      <Vox p={[1.35, 0.34, 0.3]} s={[2.0, 0.04, 0.6]} c={DARK} />
      {[0, 1, 2].map((i) => (
        <group
          key={i}
          ref={(el) => {
            parcels.current[i] = el
          }}
          position={[0.5, 0.56, 0.3]}
        >
          <Vox p={[0, 0, 0]} s={[0.4, 0.4, 0.4]} c="#c08a4f" />
          <Vox p={[0, 0.01, 0]} s={[0.08, 0.41, 0.41]} c="#e9d5a8" />
        </group>
      ))}
      <Vox p={[2.15, 0.3, -0.55]} s={[0.55, 0.55, 0.55]} c="#c08a4f" />
      <Vox p={[2.05, 0.8, -0.55]} s={[0.4, 0.4, 0.4]} c="#b07a3f" />
      <group ref={coin} position={[1.3, 2.6, 0.3]}>
        <mesh geometry={coinGeometry} material={mat(GOLD)} rotation={[Math.PI / 2, 0, 0]} castShadow />
      </group>
    </group>
  )
}

function SeoStation() {
  const flag = useRef<THREE.Group>(null)
  const lens = useRef<THREE.Group>(null)
  const ring = useMemo(() => new THREE.TorusGeometry(0.42, 0.09, 6, 14), [])
  const glassGeometry = useMemo(() => new THREE.CylinderGeometry(0.4, 0.4, 0.03, 14), [])
  const glass = useMemo(
    () => new THREE.MeshLambertMaterial({ color: "#bae6fd", transparent: true, opacity: 0.55 }),
    []
  )

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (flag.current) flag.current.rotation.y = Math.sin(t * 3) * 0.3
    if (lens.current) {
      lens.current.position.y = 2.2 + Math.sin(t * 1.4) * 0.2
      lens.current.rotation.y = Math.sin(t * 0.7) * 0.6
    }
  })

  return (
    <group>
      <Vox p={[-1, 0.6, 0]} s={[0.9, 1.2, 0.9]} c="#cbd5e1" />
      <Vox p={[0, 1, 0]} s={[0.9, 2, 0.9]} c="#facc15" />
      <Vox p={[1, 0.4, 0]} s={[0.9, 0.8, 0.9]} c="#d97706" />
      <PixelText text="2" size={0.09} c={DARK} p={[-1, 0.75, 0.46]} />
      <PixelText text="1" size={0.09} c={DARK} p={[0, 1.55, 0.46]} />
      <PixelText text="3" size={0.09} c={DARK} p={[1, 0.5, 0.46]} />
      <Vox p={[0, 2.75, 0]} s={[0.07, 1.5, 0.07]} c="#f8fafc" />
      <group ref={flag} position={[0, 3.25, 0]}>
        <Vox p={[0.33, 0, 0]} s={[0.6, 0.4, 0.04]} c={BRAND} />
      </group>
      <group ref={lens} position={[-1.8, 2.2, 0.6]}>
        <mesh geometry={ring} material={mat(DARK)} castShadow />
        <mesh geometry={glassGeometry} material={glass} rotation={[Math.PI / 2, 0, 0]} />
        <Vox p={[0.48, -0.48, 0]} s={[0.14, 0.6, 0.14]} r={[0, 0, Math.PI / 4]} c="#92400e" />
      </group>
    </group>
  )
}

const CURSOR = ["1000", "1100", "1110", "1111", "1110", "0011", "0001"]

function AdsStation() {
  const palette = useMemo(() => [BRAND, RAIL, "#16a34a", "#f5b301"], [])
  const face = useMaterials([BRAND])[0]
  const bulbs = useMaterials(Array(6).fill("#fde047"), true)
  const cursor = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    face.color.set(palette[Math.floor(t / 1.6) % palette.length])
    bulbs.forEach((m, i) => {
      m.emissiveIntensity = Math.floor(t * 6) % bulbs.length === i ? 1.4 : 0.1
    })
    if (cursor.current) {
      const k = (t * 0.8) % 1
      cursor.current.position.z = 0.9 - Math.sin(k * Math.PI) * 0.35
      cursor.current.scale.setScalar(k > 0.45 && k < 0.6 ? 0.85 : 1)
    }
  })

  return (
    <group>
      <Vox p={[-0.95, 1.05, -0.25]} s={[0.18, 2.1, 0.18]} c={WOOD} />
      <Vox p={[0.95, 1.05, -0.25]} s={[0.18, 2.1, 0.18]} c={WOOD} />
      <Vox p={[0, 2.4, -0.3]} s={[2.8, 1.5, 0.15]} c={DARK} />
      <Vox p={[0, 2.4, -0.2]} s={[2.6, 1.3, 0.06]} material={face} />
      <PixelText text="AD" size={0.16} c="#ffffff" p={[0, 2.4, -0.15]} />
      {bulbs.map((m, i) => (
        <Vox key={i} p={[-1.25 + i * 0.5, 3.2, -0.25]} s={[0.14, 0.14, 0.14]} material={m} />
      ))}
      <group ref={cursor} position={[0.6, 1.4, 0.9]}>
        <PixelArt rows={CURSOR} size={0.11} depth={0.08} c="#ffffff" />
      </group>
      <Tree kind="cactus" leaf="#4f9a52" p={[-1.9, 0, 0.6]} seed={11} />
      <Vox p={[1.8, 0.15, 0.7]} s={[0.5, 0.3, 0.4]} c="#d6b77a" />
    </group>
  )
}

const HEART = ["01010", "11111", "11111", "01110", "00100"]

function MarketingStation() {
  const rings = useMemo(
    () =>
      [0, 1, 2].map(
        () => new THREE.MeshBasicMaterial({ color: RAIL, transparent: true, opacity: 1, depthWrite: false })
      ),
    []
  )
  const ringGeometry = useMemo(() => new THREE.TorusGeometry(1, 0.05, 4, 28), [])
  const ringMeshes = useRef<(THREE.Mesh | null)[]>([])
  const beacon = useMaterials(["#ef4444"], true)[0]
  const mailFlag = useRef<THREE.Group>(null)
  const bubble = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    ringMeshes.current.forEach((mesh, i) => {
      if (!mesh) return
      const a = (t * 0.45 + i / 3) % 1
      mesh.scale.setScalar(0.3 + a * 2.4)
      rings[i].opacity = 1 - a
    })
    beacon.emissiveIntensity = Math.sin(t * 5) > 0 ? 1.5 : 0.1
    if (mailFlag.current) mailFlag.current.rotation.z = Math.floor(t / 2) % 2 ? 0 : -Math.PI / 2
    if (bubble.current) bubble.current.position.y = 2.2 + Math.sin(t * 1.6) * 0.15
  })

  return (
    <group>
      {[0, 1, 2, 3].map((k) => (
        <Vox
          key={k}
          p={[0, 0.45 + k * 0.9, 0]}
          s={[0.75 - k * 0.12, 0.9, 0.75 - k * 0.12]}
          c={k % 2 ? "#f8fafc" : "#ef4444"}
        />
      ))}
      <Vox p={[0, 3.75, 0]} s={[0.25, 0.25, 0.25]} material={beacon} />
      {rings.map((m, i) => (
        <mesh
          key={i}
          ref={(el) => {
            ringMeshes.current[i] = el
          }}
          geometry={ringGeometry}
          material={m}
          position={[0, 3.75, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        />
      ))}
      <Vox p={[1.5, 0.4, 0.6]} s={[0.12, 0.8, 0.12]} c={WOOD} />
      <Vox p={[1.5, 0.95, 0.6]} s={[0.4, 0.35, 0.6]} c={BRAND} />
      <group ref={mailFlag} position={[1.73, 0.95, 0.75]}>
        <Vox p={[0, 0.15, 0]} s={[0.04, 0.3, 0.08]} c="#ef4444" />
      </group>
      <group ref={bubble} position={[-1.4, 2.2, 0.4]}>
        <Vox p={[0, 0, 0]} s={[0.9, 0.65, 0.2]} c="#ffffff" />
        <Vox p={[-0.25, -0.4, 0]} s={[0.2, 0.2, 0.2]} c="#ffffff" />
        <PixelArt rows={HEART} size={0.08} c="#ef4444" p={[0, 0, 0.11]} />
      </group>
    </group>
  )
}

function Gear({ radius, speed, p }: { radius: number; speed: number; p: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null)
  const disc = useMemo(() => new THREE.CylinderGeometry(radius, radius, 0.18, 8), [radius])
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.z = clock.elapsedTime * speed
  })
  return (
    <group ref={ref} position={p}>
      <mesh geometry={disc} material={mat("#94a3b8")} rotation={[Math.PI / 2, 0, 0]} castShadow />
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * Math.PI * 2
        return (
          <Vox
            key={i}
            p={[Math.cos(a) * (radius + 0.06), Math.sin(a) * (radius + 0.06), 0]}
            s={[0.16, 0.16, 0.16]}
            r={[0, 0, a]}
            c="#94a3b8"
          />
        )
      })}
    </group>
  )
}

function CrmStation() {
  const leds = useMaterials(
    Array.from({ length: 21 }, (_, i) => (i % 3 ? "#4ade80" : "#22d3ee")),
    true
  )
  const bars = useRef<(THREE.Mesh | null)[]>([])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    leds.forEach((m, i) => {
      m.emissiveIntensity = Math.sin(t * 3 + i * 1.7) > 0.2 ? 1.2 : 0.05
    })
    bars.current.forEach((bar, i) => {
      if (!bar) return
      const h = 0.1 + (Math.sin(t * 1.5 + i) * 0.5 + 0.5) * 0.35
      bar.scale.y = h
      bar.position.y = -0.22 + h / 2
    })
  })

  return (
    <group>
      <Vox p={[-0.4, 1.0, -0.3]} s={[2.4, 2.0, 1.3]} c="#334155" />
      <Vox p={[-0.4, 2.08, -0.3]} s={[2.5, 0.16, 1.4]} c="#ffffff" />
      {leds.map((m, i) => (
        <Vox
          key={i}
          p={[-1.3 + (i % 7) * 0.3, 0.55 + Math.floor(i / 7) * 0.45, 0.36]}
          s={[0.16, 0.08, 0.04]}
          material={m}
        />
      ))}
      <Gear radius={0.42} speed={0.8} p={[0.15, 2.7, -0.3]} />
      <Gear radius={0.28} speed={-1.2} p={[-0.6, 2.5, -0.3]} />
      {/* dashboard */}
      <Vox p={[1.65, 0.4, 0.5]} s={[0.1, 0.8, 0.1]} c={DARK} />
      <group position={[1.65, 1.05, 0.5]}>
        <Vox p={[0, 0, 0]} s={[1.0, 0.65, 0.08]} c={DARK} />
        {[0, 1, 2, 3].map((i) => (
          <Vox
            key={i}
            ref={(el) => {
              bars.current[i] = el
            }}
            p={[-0.3 + i * 0.2, 0, 0.05]}
            s={[0.12, 0.3, 0.03]}
            c={i % 2 ? "#22d3ee" : "#4ade80"}
          />
        ))}
      </group>
    </group>
  )
}

function AiStation() {
  const head = useRef<THREE.Group>(null)
  const wave = useRef<THREE.Group>(null)
  const swing = useRef<THREE.Group>(null)
  const chip = useRef<THREE.Group>(null)
  const [eyes, core, antenna] = useMaterials(["#22d3ee", "#22d3ee", RAIL], true)
  const eyeRefs = useRef<(THREE.Mesh | null)[]>([])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (head.current) head.current.rotation.y = Math.sin(t * 0.8) * 0.5
    if (wave.current) wave.current.rotation.z = 2.4 + Math.sin(t * 6) * 0.35
    if (swing.current) swing.current.rotation.x = Math.sin(t * 2) * 0.4
    eyes.emissiveIntensity = 1.2
    core.emissiveIntensity = 0.6 + Math.sin(t * 3) * 0.5
    antenna.emissiveIntensity = Math.sin(t * 4) > 0 ? 1.4 : 0.2
    const blink = t % 3.5 < 0.12 ? 0.15 : 1
    eyeRefs.current.forEach((eye) => eye && (eye.scale.y = 0.12 * blink))
    if (chip.current) {
      chip.current.rotation.y = t * 0.8
      chip.current.position.y = 1.7 + Math.sin(t * 1.5) * 0.15
    }
  })

  return (
    <group>
      <Vox p={[-0.25, 0.3, 0]} s={[0.26, 0.6, 0.3]} c="#475569" />
      <Vox p={[0.25, 0.3, 0]} s={[0.26, 0.6, 0.3]} c="#475569" />
      <Vox p={[0, 0.98, 0]} s={[0.95, 0.8, 0.6]} c="#e2e8f0" />
      <Vox p={[0, 1.02, 0.31]} s={[0.26, 0.26, 0.04]} material={core} />
      <group ref={swing} position={[-0.6, 1.3, 0]}>
        <Vox p={[0, -0.3, 0]} s={[0.22, 0.62, 0.24]} c="#cbd5e1" />
      </group>
      <group ref={wave} position={[0.6, 1.3, 0]}>
        <Vox p={[0, -0.3, 0]} s={[0.22, 0.62, 0.24]} c="#cbd5e1" />
      </group>
      <group ref={head} position={[0, 1.72, 0]}>
        <Vox p={[0, 0, 0]} s={[0.72, 0.52, 0.56]} c="#f8fafc" />
        {[-0.16, 0.16].map((x, i) => (
          <Vox
            key={x}
            ref={(el) => {
              eyeRefs.current[i] = el
            }}
            p={[x, 0.03, 0.285]}
            s={[0.12, 0.12, 0.03]}
            material={eyes}
          />
        ))}
        <Vox p={[0, 0.38, 0]} s={[0.05, 0.25, 0.05]} c={STEEL} />
        <Vox p={[0, 0.55, 0]} s={[0.14, 0.14, 0.14]} material={antenna} />
      </group>
      <group ref={chip} position={[1.5, 1.7, 0.3]}>
        <Vox p={[0, 0, 0]} s={[0.6, 0.12, 0.6]} c="#111827" />
        <Vox p={[0, 0.08, 0]} s={[0.3, 0.06, 0.3]} c={GOLD} />
        {[-0.18, 0, 0.18].flatMap((o) => [
          <Vox key={`a${o}`} p={[o, 0, 0.36]} s={[0.07, 0.04, 0.14]} c={GOLD} />,
          <Vox key={`b${o}`} p={[o, 0, -0.36]} s={[0.07, 0.04, 0.14]} c={GOLD} />,
          <Vox key={`c${o}`} p={[0.36, 0, o]} s={[0.14, 0.04, 0.07]} c={GOLD} />,
          <Vox key={`d${o}`} p={[-0.36, 0, o]} s={[0.14, 0.04, 0.07]} c={GOLD} />,
        ])}
      </group>
      <Tree kind="crystal" leaf="#7c6cf0" p={[-1.6, 0, 0.7]} seed={5} />
    </group>
  )
}

export const stations: Record<string, ComponentType> = {
  "branding-design": DesignStation,
  "web-development": WebDevStation,
  ecommerce: EcommerceStation,
  seo: SeoStation,
  "google-ads": AdsStation,
  "digital-marketing": MarketingStation,
  "crm-custom-software": CrmStation,
  "ai-automation": AiStation,
}
