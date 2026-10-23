import Link from "next/link"
import { cn } from "@/lib/utils"

export function Logo({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <Link href="/" className={cn("group inline-flex items-center gap-2.5", className)} aria-label="FrontEndonFront home">
      <span className="grid h-9 w-9 place-items-center rounded-lg border-2 border-ink bg-brand text-white shadow-[2px_2px_0_var(--color-ink)] transition-transform group-hover:-rotate-6">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M9 8l-4 4 4 4M15 8l4 4-4 4" />
        </svg>
      </span>
      <span className={cn("text-lg font-bold tracking-tight", inverted ? "text-white" : "text-ink")}>
        FrontEndonFront
      </span>
    </Link>
  )
}
