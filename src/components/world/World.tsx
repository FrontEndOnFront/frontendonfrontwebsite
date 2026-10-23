"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { services, stopNumber } from "@/lib/services"
import { cn } from "@/lib/utils"
import type { WorldControl } from "./RailWorld"
import { STEP_COUNT, STEP_SECONDS } from "./timeline"

function WorldLoading() {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <span className="font-pixel text-sm text-ink/50 animate-pulse">Laying track…</span>
    </div>
  )
}

const RailWorld = dynamic(() => import("./RailWorld"), { ssr: false, loading: WorldLoading })

function StopList({ focus }: { focus?: number }) {
  return (
    <ol className="absolute inset-0 grid content-center gap-2 p-6 sm:grid-cols-2">
      {services.map((service, i) => (
        <li key={service.slug} className={cn("font-pixel text-sm", i === focus && "text-brand")}>
          {stopNumber(i)} · {service.name}
        </li>
      ))}
    </ol>
  )
}

/** "Step 2 of 4: Fix the foundation", kept in sync with the station's animation. */
function StepCaption({ service, step, animate }: { service: (typeof services)[number]; step: number; animate: boolean }) {
  return (
    <div className="pointer-events-none absolute left-3 right-3 top-3 sm:right-auto sm:w-80" aria-live="polite">
      <div className="rounded-lg border border-gray-700 bg-gray-950/85 p-3 shadow-lg backdrop-blur-sm">
        <p className="font-pixel text-[11px] text-blue-400">
          Step {step + 1} of {STEP_COUNT}
        </p>
        <p className="mt-0.5 font-semibold text-white">{service.approach[step]?.title}</p>
        <p className="mt-0.5 text-xs leading-snug text-gray-400">{service.approach[step]?.text}</p>
        <div className="mt-2.5 grid grid-cols-4 gap-1">
          {service.approach.map((s, i) => (
            <span key={s.title} className="h-1 overflow-hidden rounded-full bg-gray-800">
              {i < step && <span className="block h-full bg-blue-600" />}
              {i === step && (
                <span
                  key={step}
                  className="block h-full origin-left bg-blue-400"
                  style={animate ? { animation: `step-fill ${STEP_SECONDS}s linear both` } : undefined}
                />
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReduced(query.matches)
    update()
    query.addEventListener("change", update)
    return () => query.removeEventListener("change", update)
  }, [])
  return reduced
}

interface WorldProps {
  mode: "full" | "segment"
  /** Index of the service to centre on in segment mode. */
  focus?: number
  className?: string
}

/**
 * The FrontEndonFront rail world: a voxel island with a train looping past one stop per service.
 * "full" shows the whole loop and slowly spins (drag to turn it); "segment" zooms in on a single stop.
 */
export function World({ mode, focus = 0, className }: WorldProps) {
  const container = useRef<HTMLDivElement>(null)
  const labels = useRef<(HTMLElement | null)[]>([])
  const control = useRef<WorldControl>({ angle: 0, paused: false })
  const drag = useRef<{ x: number; id: number } | null>(null)
  const [active, setActive] = useState(false)
  const [step, setStep] = useState(0)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const el = container.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { threshold: 0.05 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const draggable = mode === "full" && !reducedMotion

  return (
    <div
      ref={container}
      className={cn("relative overflow-hidden select-none", draggable && "cursor-grab active:cursor-grabbing", className)}
      style={{ touchAction: "pan-y" }}
      onPointerDown={(e) => {
        if (!draggable || (e.target as HTMLElement).closest("a")) return
        drag.current = { x: e.clientX, id: e.pointerId }
        control.current.paused = true
      }}
      onPointerMove={(e) => {
        if (!drag.current || drag.current.id !== e.pointerId) return
        control.current.angle += (e.clientX - drag.current.x) * 0.006
        drag.current.x = e.clientX
      }}
      onPointerUp={() => {
        drag.current = null
        control.current.paused = false
      }}
      onPointerLeave={() => {
        drag.current = null
        control.current.paused = false
      }}
    >
      <RailWorld
        mode={mode}
        focus={focus}
        active={active}
        reducedMotion={reducedMotion}
        control={control}
        labels={labels}
        fallback={<StopList focus={mode === "segment" ? focus : undefined} />}
        onStep={setStep}
      />
      {mode === "segment" && <StepCaption service={services[focus]} step={step} animate={!reducedMotion} />}
      <div className="pointer-events-none absolute inset-0">
        {services.map((service, i) =>
          mode === "segment" && i === focus ? null : (
            <Link
              key={service.slug}
              href={`/services/${service.slug}/`}
              ref={(el) => {
                labels.current[i] = el
              }}
              onMouseEnter={() => (control.current.paused = true)}
              onMouseLeave={() => (control.current.paused = false)}
              className="world-label pointer-events-auto absolute left-0 top-0 opacity-0"
            >
              <span className="font-pixel text-[10px] text-blue-400">{stopNumber(i)}</span>
              <span>{service.short}</span>
              {mode === "full" && (
                <span className="hidden font-normal text-gray-400 sm:inline">· {service.approach[step]?.title}</span>
              )}
            </Link>
          )
        )}
      </div>
    </div>
  )
}
