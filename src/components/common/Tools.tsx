import type { CSSProperties } from "react"
import { toolGroups, tools, type Tool } from "@/lib/tools"
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

/** Endless scrolling strip of every tool logo. */
export function ToolMarquee() {
  const row = [...tools, ...tools]
  return (
    <div
      className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]"
      aria-hidden
    >
      <div className="flex w-max animate-[marquee_60s_linear_infinite] gap-3 motion-reduce:animate-none hover:[animation-play-state:paused]">
        {row.map((tool, i) => (
          <ToolChip key={`${tool.name}-${i}`} tool={tool} />
        ))}
      </div>
    </div>
  )
}

/** Tools grouped by what they are for. */
export function ToolGrid() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {toolGroups.map((group) => (
        <div key={group.title} className="card p-6">
          <h3 className="font-semibold text-white">{group.title}</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {group.tools.map((tool) => (
              <li key={tool.name}>
                <ToolChip tool={tool} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
