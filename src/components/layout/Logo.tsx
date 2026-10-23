import Link from "next/link"
import { cn } from "@/lib/utils"

export function Logo({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <Link href="/" className={cn("group inline-flex items-center gap-2.5", className)} aria-label="FrontEndonFront home">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-blue-600 text-white transition-transform group-hover:-rotate-6">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M9 8l-4 4 4 4M15 8l4 4-4 4" />
        </svg>
      </span>
      <span className={cn("text-xl font-bold", inverted ? "text-white" : "text-white")}>
        FrontEndonFront
      </span>
    </Link>
  )
}
