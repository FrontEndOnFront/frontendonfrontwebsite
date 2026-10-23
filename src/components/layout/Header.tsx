"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, Menu, X } from "lucide-react"
import { industries } from "@/lib/industries"
import { services, stopNumber } from "@/lib/services"
import { navigation } from "@/lib/site"
import { cn } from "@/lib/utils"
import { Logo } from "./Logo"

const menus: Record<string, { href: string; label: string; badge?: string }[]> = {
  "/services/": services.map((s, i) => ({ href: `/services/${s.slug}/`, label: s.name, badge: stopNumber(i) })),
  "/industries/": industries.map((ind) => ({ href: `/industries/${ind.slug}/`, label: ind.name })),
}

export function Header() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => setOpen(false), [pathname])

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {navigation.map((item) => {
            const submenu = menus[item.href]
            const current = pathname?.startsWith(item.href)
            return (
              <div key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-paper-deep hover:text-ink",
                    current && "text-ink"
                  )}
                  aria-current={current ? "page" : undefined}
                >
                  {item.label}
                  {submenu && <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />}
                </Link>
                {submenu && (
                  <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-all group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                    <ul className="w-72 rounded-2xl border-2 border-ink bg-white p-2 shadow-[6px_6px_0_var(--color-ink)]">
                      {submenu.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-ink-soft hover:bg-brand-soft hover:text-ink"
                          >
                            {link.badge && <span className="font-pixel text-[10px] text-brand">{link.badge}</span>}
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/contact/" className="btn btn-primary hidden !px-4 !py-2 md:inline-flex">
            Free consultation
          </Link>
          <button
            type="button"
            className="rounded-lg border-2 border-ink bg-white p-2 md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle mobile menu"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-line bg-paper md:hidden" aria-label="Mobile">
          <div className="container-page space-y-6 py-6">
            {navigation.map((item) => (
              <div key={item.href}>
                <Link href={item.href} className="text-lg font-semibold">
                  {item.label}
                </Link>
                {menus[item.href] && (
                  <ul className="mt-2 grid grid-cols-1 gap-1 sm:grid-cols-2">
                    {menus[item.href].map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} className="flex items-center gap-2 py-1.5 text-sm text-muted">
                          {link.badge && <span className="font-pixel text-[10px] text-brand">{link.badge}</span>}
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            <Link href="/contact/" className="btn btn-primary w-full">
              Book a free consultation
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}
