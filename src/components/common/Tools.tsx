import type { CSSProperties } from "react"
import { tools, type Tool } from "@/lib/tools"
import { cn } from "@/lib/utils"

/** A tool's logo and name. The mark is grey until hover, then takes the brand colour (lifted on very dark marks). */
export function ToolChip({ tool, className }: { tool: Tool; className?: string }) {
  const hex = tool.icon?.hex ?? "60a5fa"
  const dark = parseInt(hex.slice(0, 2), 16) + parseInt(hex.slice(2, 4), 16) + parseInt(hex.slice(4, 6), 16) < 120
  return (
    <span
      className={cn(
        "group inline-flex items-center gap-2 rounded-md border border-gray-800 bg-gray-900 px-3 py-2 text-sm text-gray-300 transition-colors hover:border-blue-600/50 hover:text-white",
        className
      )}
      style={{ "--brand": dark ? "#ffffff" : `#${hex}` } as CSSProperties}
    >
      {tool.icon ? (
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 shrink-0 fill-gray-400 transition-colors group-hover:fill-[var(--brand)]"
          aria-hidden
        >
          <path d={tool.icon.path} />
        </svg>
      ) : (
        <span className="grid h-4 w-4 shrink-0 place-items-center rounded-sm bg-gray-700 text-[9px] font-bold text-white" aria-hidden>
          {tool.name[0]}
        </span>
      )}
      {tool.name}
    </span>
  )
}

/** Endless scrolling strip of tool logos. */
export function ToolMarquee({ items = tools, reverse = false }: { items?: Tool[]; reverse?: boolean }) {
  const row = [...items, ...items]
  return (
    <div
      className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]"
      aria-hidden
    >
      <div
        className={cn(
          "flex w-max animate-[marquee_60s_linear_infinite] gap-3 pr-3 hover:[animation-play-state:paused] motion-reduce:animate-none",
          reverse && "[animation-direction:reverse]"
        )}
      >
        {row.map((tool, i) => (
          <ToolChip key={`${tool.name}-${i}`} tool={tool} />
        ))}
      </div>
    </div>
  )
}

/** Every tool in two rows that scroll in opposite directions. */
export function ToolMarquees({ className }: { className?: string }) {
  const half = Math.ceil(tools.length / 2)
  return (
    <div className={cn("space-y-3", className)}>
      <p className="sr-only">
        Platforms we work with: {tools.map((tool) => tool.name).join(", ")}
      </p>
      <ToolMarquee items={tools.slice(0, half)} />
      <ToolMarquee items={tools.slice(half)} reverse />
    </div>
  )
}
