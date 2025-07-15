"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { buttonVariants, iconContainerVariants } from "@/lib/design-system"
import { Code, Menu, X } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const navigationItems = [
  { href: "#services", label: "Services" },
  { href: "#clients", label: "Our Clients" },
  { href: "#process", label: "Process" },
  { href: "#contact", label: "Contact" },
]

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
    setIsMobileMenuOpen(false)
  }

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false)
    // Small delay to allow menu close animation
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-950/95 backdrop-blur supports-[backdrop-filter]:bg-gray-950/60 relative">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className={cn(iconContainerVariants({ variant: "primary", size: "sm" }))}>
              <Code className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold text-white">FrontEndonFront</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors"
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(item.href)
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA + Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <Button
              size="sm"
              className={cn(buttonVariants({ variant: "primary", size: "sm" }), "hidden md:inline-flex")}
              onClick={scrollToContact}
            >
              Get Free Consultation
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-gray-300 hover:bg-gray-800"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Mobile Menu */}
          <div className="fixed top-16 left-0 right-0 bg-gray-950 border-b border-gray-800 z-50 md:hidden animate-in slide-in-from-top duration-200">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
              <nav className="flex flex-col space-y-4">
                {navigationItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-base font-medium text-gray-300 hover:text-blue-400 transition-colors py-2"
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavClick(item.href)
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="pt-4 border-t border-gray-800">
                  <Button
                    className={cn(buttonVariants({ variant: "primary", size: "default" }), "w-full")}
                    onClick={scrollToContact}
                  >
                    Get Free Consultation
                  </Button>
                </div>
              </nav>
            </div>
          </div>
        </>
      )}
    </>
  )
} 