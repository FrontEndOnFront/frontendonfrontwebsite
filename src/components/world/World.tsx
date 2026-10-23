"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { services, stopNumber } from "@/lib/services"
import { cn } from "@/lib/utils"
import type { WorldControl } from "./RailWorld"

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
      />
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
              <span className="font-pixel text-[10px] text-brand">{stopNumber(i)}</span>
              <span>{service.short}</span>
            </Link>
          )
        )}
      </div>
    </div>
  )
}
