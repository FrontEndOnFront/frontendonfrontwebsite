"use client"

import { useLayoutEffect, useMemo, useRef, type RefObject } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import { services } from "@/lib/services"
import {
  FRONT_ANGLE,
  GROUND_HEIGHT,
  ISLAND_RADIUS,
  LAKE_RADIUS,
  STATION_RADIUS,
  TAU,
  TRACK_RADIUS,
  angleDistance,
  fitZoom,
  focusRotation,
  hash2,
  outwardHeading,
  polar,
  sectorAngle,
  sectorAt,
  travelHeading,
} from "./geometry"
import { FixedTimeProvider, useTimeline } from "./anim"
import { stations } from "./stations"
import { FINAL_FRAME, stepAt } from "./timeline"
import { BOX, DARK, PixelText, Tree, Vox, mat, type V3 } from "./voxels"

const COUNT = services.length
const CAMERA_DIRECTION = new THREE.Vector3(1, 1.15, 1).normalize()
const LOOP_SECONDS = 36
const SPEED = TAU / LOOP_SECONDS

export interface WorldControl {
  angle: number
  paused: boolean
}

export interface RailWorldProps {
  mode: "full" | "segment"
  focus: number
  active: boolean
  reducedMotion: boolean
  control: RefObject<WorldControl>
  labels: RefObject<(HTMLElement | null)[]>
  fallback: React.ReactNode
  /** Called whenever the shared station timeline moves to a new step. */
  onStep: (step: number) => void
}

function instanced(cells: { p: V3; s: V3; c: THREE.Color }[], material: THREE.Material) {
  const mesh = new THREE.InstancedMesh(BOX, material, cells.length)
  const m = new THREE.Matrix4()
  cells.forEach((cell, i) => {
    m.makeScale(...cell.s).setPosition(...cell.p)
    mesh.setMatrixAt(i, m)
    mesh.setColorAt(i, cell.c)
  })
  mesh.castShadow = true
  mesh.receiveShadow = true
  return mesh
}

function jitter(hex: string, x: number, z: number, amount = 0.05) {
  return new THREE.Color(hex).offsetHSL(0, 0, (hash2(x, z) - 0.5) * amount * 2)
}

function Terrain() {
  const { land, water } = useMemo(() => {
    const ground: { p: V3; s: V3; c: THREE.Color }[] = []
    const lake: { p: V3; s: V3; c: THREE.Color }[] = []
    const R = Math.ceil(ISLAND_RADIUS)

    for (let x = -R; x <= R; x++) {
      for (let z = -R; z <= R; z++) {
        const r = Math.hypot(x, z)
        if (r > ISLAND_RADIUS) continue
        const angle = Math.atan2(z, x)
        const sector = sectorAt(angle, COUNT)
        const isLake = r < LAKE_RADIUS && r > 1.6

        // Floating island underside: stepped layers that shrink towards the bottom.
        for (let k = 1; k <= 4; k++) {
          if (r < ISLAND_RADIUS - k * 2.6 + hash2(x * k, z) * 1.4) {
            ground.push({ p: [x, -k + 0.5, z], s: [1, 1, 1], c: jitter(k > 2 ? "#6b7280" : "#8b5a2b", x, z * k) })
          }
        }

        if (isLake) {
          ground.push({ p: [x, 0.15, z], s: [1, 0.3, 1], c: jitter("#d9c48f", x, z) })
          lake.push({ p: [x, 0.55, z], s: [1, 0.5, 1], c: jitter("#4fb3e8", x, z, 0.03) })
          continue
        }

        const offCentre = angleDistance(angle, sectorAngle(sector, COUNT))
        let height = GROUND_HEIGHT
        if (r > 12.9 && offCentre > 0.26) {
          const h = hash2(x + 3, z - 5)
          height += h > 0.82 ? 1 : h > 0.5 ? 0.5 : 0
        }
        const shore = r < LAKE_RADIUS + 0.9
        const top = shore ? "#e8d8a8" : services[sector].world.ground

        ground.push({ p: [x, (height - 0.3) / 2, z], s: [1, height - 0.3, 1], c: jitter("#9a6a3a", x, z) })
        ground.push({ p: [x, height - 0.15, z], s: [1, 0.3, 1], c: jitter(top, x, z) })
      }
    }

    const waterMaterial = new THREE.MeshLambertMaterial({ transparent: true, opacity: 0.85 })
    const waterMesh = instanced(lake, waterMaterial)
    waterMesh.castShadow = false
    return { land: instanced(ground, new THREE.MeshLambertMaterial()), water: waterMesh }
  }, [])

  const waterRef = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    if (waterRef.current) waterRef.current.position.y = Math.sin(clock.elapsedTime * 1.2) * 0.04
  })

  return (
    <>
      <primitive object={land} />
      <group ref={waterRef}>
        <primitive object={water} />
      </group>
    </>
  )
}

function Track() {
  const ties = useMemo(() => {
    const count = Math.floor((TAU * TRACK_RADIUS) / 0.55)
    const mesh = new THREE.InstancedMesh(BOX, mat("#6b4423"), count)
    const o = new THREE.Object3D()
    for (let i = 0; i < count; i++) {
      const a = (i / count) * TAU
      const [x, z] = polar(TRACK_RADIUS, a)
      o.position.set(x, GROUND_HEIGHT + 0.05, z)
      o.rotation.set(0, outwardHeading(a), 0)
      o.scale.set(0.28, 0.1, 1.2)
      o.updateMatrix()
      mesh.setMatrixAt(i, o.matrix)
    }
    mesh.receiveShadow = true
    return mesh
  }, [])
  const rail = useMemo(() => new THREE.TorusGeometry(1, 0.06 / TRACK_RADIUS, 4, 180), [])

  return (
    <>
      <primitive object={ties} />
      {[TRACK_RADIUS - 0.3, TRACK_RADIUS + 0.3].map((r) => (
        <mesh
          key={r}
          geometry={rail}
          material={mat("#9ca3af")}
          scale={[r, r, r * 1.6]}
          position={[0, GROUND_HEIGHT + 0.16, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          receiveShadow
        />
      ))}
    </>
  )
}

const WAGONS = [
  { body: "#60a5fa", cargo: ["#f8fafc", "#2563eb"] },
  { body: "#374151", cargo: ["#4ade80", "#60a5fa"] },
  { body: "#2563eb", cargo: ["#f8fafc", "#4ade80"] },
]

function Wheels({ xs }: { xs: number[] }) {
  return (
    <>
      {xs.flatMap((x) =>
        [-0.42, 0.42].map((z) => <Vox key={`${x}${z}`} p={[x, 0.15, z]} s={[0.34, 0.34, 0.1]} c={DARK} />)
      )}
    </>
  )
}

function Locomotive() {
  return (
    <group>
      <Vox p={[0, 0.3, 0]} s={[1.7, 0.22, 0.8]} c={DARK} />
      <Vox p={[0.3, 0.72, 0]} s={[1.0, 0.62, 0.7]} c="#2563eb" />
      <Vox p={[0.82, 0.72, 0]} s={[0.06, 0.4, 0.4]} c="#fde68a" />
      <Vox p={[-0.45, 0.85, 0]} s={[0.62, 0.9, 0.8]} c="#1d4ed8" />
      <Vox p={[-0.45, 0.98, 0.41]} s={[0.36, 0.3, 0.02]} c="#bae6fd" />
      <Vox p={[-0.45, 0.98, -0.41]} s={[0.36, 0.3, 0.02]} c="#bae6fd" />
      <Vox p={[-0.45, 1.36, 0]} s={[0.78, 0.12, 0.92]} c={DARK} />
      <Vox p={[0.62, 1.2, 0]} s={[0.22, 0.42, 0.22]} c={DARK} />
      <Vox p={[0.95, 0.3, 0]} s={[0.12, 0.3, 0.7]} c="#6b7280" />
      <Wheels xs={[-0.5, 0, 0.5]} />
    </group>
  )
}

function Wagon({ body, cargo }: (typeof WAGONS)[number]) {
  return (
    <group>
      <Vox p={[0, 0.3, 0]} s={[1.1, 0.2, 0.75]} c={DARK} />
      <Vox p={[0, 0.58, 0]} s={[1.1, 0.38, 0.75]} c={body} />
      <Vox p={[-0.25, 0.95, 0]} s={[0.4, 0.38, 0.4]} c={cargo[0]} />
      <Vox p={[0.25, 0.9, 0]} s={[0.34, 0.28, 0.34]} c={cargo[1]} />
      <Wheels xs={[-0.3, 0.3]} />
    </group>
  )
}

const PUFFS = 6
const PUFF_LIFE = 1.6

function Train({ offset }: { offset: number }) {
  const cars = useRef<(THREE.Group | null)[]>([])
  const puffs = useRef<(THREE.Mesh | null)[]>([])
  const puffMaterials = useMemo(
    () => Array.from({ length: PUFFS }, () => new THREE.MeshLambertMaterial({ color: "#f1f5f9", transparent: true })),
    []
  )

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    const head = offset + t * SPEED
    cars.current.forEach((car, i) => {
      if (!car) return
      const a = head - (i === 0 ? 0 : (0.4 + i * 1.3) / TRACK_RADIUS)
      const [x, z] = polar(TRACK_RADIUS, a)
      car.position.set(x, GROUND_HEIGHT, z)
      car.rotation.y = travelHeading(a)
    })
    puffs.current.forEach((puff, i) => {
      if (!puff) return
      const age = ((t + (i / PUFFS) * PUFF_LIFE) % PUFF_LIFE) / PUFF_LIFE
      const born = offset + (t - age * PUFF_LIFE) * SPEED + 0.62 / TRACK_RADIUS
      const [x, z] = polar(TRACK_RADIUS, born)
      puff.position.set(x, GROUND_HEIGHT + 1.5 + age * 1.4, z)
      puff.scale.setScalar(0.22 + age * 0.4)
      puffMaterials[i].opacity = 0.9 * (1 - age)
    })
  })

  return (
    <>
      {[null, ...WAGONS].map((wagon, i) => (
        <group
          key={i}
          ref={(el) => {
            cars.current[i] = el
          }}
        >
          {wagon ? <Wagon {...wagon} /> : <Locomotive />}
        </group>
      ))}
      {puffMaterials.map((m, i) => (
        <mesh
          key={i}
          ref={(el) => {
            puffs.current[i] = el
          }}
          geometry={BOX}
          material={m}
        />
      ))}
    </>
  )
}

function Scenery() {
  const trees = useMemo(() => {
    const out: { key: string; p: V3; sector: number; seed: number }[] = []
    services.forEach((_, sector) => {
      const centre = sectorAngle(sector, COUNT)
      const spots: [number, number][] = [
        [6.5, -0.28],
        [7.6, -0.12],
        [6.8, 0.05],
        [7.7, 0.22],
        [6.4, 0.34],
        [12.9, -0.36],
        [13.5, 0.38],
        [11.4, -0.42],
      ]
      spots.forEach(([r, da], i) => {
        const seed = sector * 31 + i
        const a = centre + da + (hash2(seed, 1) - 0.5) * 0.08
        const [x, z] = polar(r + (hash2(seed, 2) - 0.5) * 0.5, a)
        out.push({ key: `${sector}-${i}`, p: [x, GROUND_HEIGHT, z], sector, seed })
      })
    })
    return out
  }, [])

  return (
    <>
      {trees.map(({ key, p, sector, seed }) => (
        <Tree key={key} kind={services[sector].world.tree} leaf={services[sector].world.leaf} p={p} seed={seed} />
      ))}
    </>
  )
}

function BrandIsland() {
  const cube = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    if (!cube.current) return
    cube.current.rotation.y = clock.elapsedTime * 0.6
    cube.current.position.y = 2.6 + Math.sin(clock.elapsedTime * 1.3) * 0.2
  })
  return (
    <>
      <Vox p={[0, 0.5, 0]} s={[2.4, 1, 2.4]} c="#e8d8a8" />
      <group ref={cube} position={[0, 2.6, 0]}>
        <mesh geometry={BOX} material={mat("#2563eb")} scale={1.3} castShadow />
        <PixelText text="</>" size={0.1} c="#ffffff" p={[0, 0, 0.66]} />
        <group rotation={[0, Math.PI, 0]}>
          <PixelText text="</>" size={0.1} c="#ffffff" p={[0, 0, 0.66]} />
        </group>
      </group>
    </>
  )
}

function Stations({ anchors }: { anchors: RefObject<(THREE.Object3D | null)[]> }) {
  return (
    <>
      {services.map((service, i) => {
        const angle = sectorAngle(i, COUNT)
        const [x, z] = polar(STATION_RADIUS, angle)
        const Station = stations[service.slug]
        return (
          <group key={service.slug} position={[x, GROUND_HEIGHT, z]} rotation={[0, outwardHeading(angle), 0]}>
            <Station />
            <object3D
              position={[0, 4.6, 0]}
              ref={(el) => {
                anchors.current[i] = el
              }}
            />
          </group>
        )
      })}
    </>
  )
}

function CameraRig({ mode }: { mode: RailWorldProps["mode"] }) {
  const { camera, size, invalidate } = useThree()
  useLayoutEffect(() => {
    const cam = camera as THREE.OrthographicCamera
    const [fx, fz] = polar(11.4, FRONT_ANGLE)
    const target = mode === "full" ? new THREE.Vector3(0, 2.4, 0) : new THREE.Vector3(fx, 1.5, fz)
    cam.position.copy(target).addScaledVector(CAMERA_DIRECTION, 60)
    cam.lookAt(target)
    cam.zoom = fitZoom(mode, size.width, size.height)
    cam.updateProjectionMatrix()
    invalidate()
  }, [camera, size, mode, invalidate])
  return null
}

function Rotator({ mode, focus, control, children }: Pick<RailWorldProps, "mode" | "focus" | "control"> & { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null)
  useFrame(({ clock }, delta) => {
    const c = control.current
    if (!group.current || !c) return
    if (mode === "full") {
      if (!c.paused) c.angle += delta * 0.05
      group.current.rotation.y = c.angle
    } else {
      group.current.rotation.y = focusRotation(focus, COUNT) + Math.sin(clock.elapsedTime * 0.25) * 0.04
    }
  })
  return <group ref={group}>{children}</group>
}

function LabelProjector({ anchors, labels }: { anchors: RefObject<(THREE.Object3D | null)[]>; labels: RailWorldProps["labels"] }) {
  const v = useMemo(() => new THREE.Vector3(), [])
  useFrame(({ camera, size }) => {
    anchors.current.forEach((anchor, i) => {
      const el = labels.current?.[i]
      if (!anchor || !el) return
      anchor.getWorldPosition(v)
      // Labels on the far side of the island fade back a little.
      const facing = (v.x * CAMERA_DIRECTION.x + v.z * CAMERA_DIRECTION.z) / STATION_RADIUS
      v.project(camera)
      const x = ((v.x + 1) / 2) * size.width
      const y = ((1 - v.y) / 2) * size.height
      el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%, -100%)`
      el.style.opacity = String(0.6 + 0.4 * Math.max(0, facing + 0.3))
      el.style.zIndex = String(Math.round(100 + facing * 50))
    })
  })
  return null
}

function StepWatcher({ onStep }: { onStep: RailWorldProps["onStep"] }) {
  const last = useRef(-1)
  useTimeline((t) => {
    const { step } = stepAt(t)
    if (step !== last.current) {
      last.current = step
      onStep(step)
    }
  })
  return null
}

export default function RailWorld({ mode, focus, active, reducedMotion, control, labels, fallback, onStep }: RailWorldProps) {
  const anchors = useRef<(THREE.Object3D | null)[]>([])
  const trains = mode === "full" ? [0] : [0, Math.PI]

  return (
    <Canvas
      orthographic
      shadows
      dpr={[1, 2]}
      frameloop={active && !reducedMotion ? "always" : "demand"}
      camera={{ position: [60, 69, 60], zoom: 20, near: 0.1, far: 400 }}
      gl={{ antialias: true, alpha: true }}
      fallback={fallback}
      aria-hidden
    >
      <hemisphereLight args={["#ffffff", "#9fb59a", 1.9]} />
      <directionalLight
        position={[14, 26, 8]}
        intensity={2.2}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-18}
        shadow-camera-right={18}
        shadow-camera-top={18}
        shadow-camera-bottom={-18}
        shadow-camera-near={1}
        shadow-camera-far={80}
        shadow-bias={-0.0006}
      />
      <CameraRig mode={mode} />
      <FixedTimeProvider value={reducedMotion ? FINAL_FRAME : null}>
      <StepWatcher onStep={onStep} />
      <Rotator mode={mode} focus={focus} control={control}>
        <Terrain />
        <Track />
        <Scenery />
        <BrandIsland />
        <Stations anchors={anchors} />
        {trains.map((offset) => (
          <Train key={offset} offset={offset + (mode === "segment" ? sectorAngle(focus, COUNT) - 0.5 : 0)} />
        ))}
      </Rotator>
      </FixedTimeProvider>
      <LabelProjector anchors={anchors} labels={labels} />
    </Canvas>
  )
}
