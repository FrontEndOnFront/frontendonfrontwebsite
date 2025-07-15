import { iconContainerVariants } from "@/lib/design-system"
import { Code, Facebook, Twitter, Linkedin, Github } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const socialLinks = [
  { href: "#", icon: Facebook, label: "Facebook" },
  { href: "#", icon: Twitter, label: "Twitter" },
  { href: "#", icon: Linkedin, label: "LinkedIn" },
  { href: "#", icon: Github, label: "GitHub" },
]

const contactInfo = {
  email: "hello@frontendonfront.com",
  phone: "+1 647-382-3188",
  address: {
    line1: "9850 King George Blvd",
    line2: "Unit 300 - 3rd Floor - FrontEndonFront",
    line3: "Surrey, BC V3T 0P9"
  }
}

export function Footer() {
  return (
    <footer className="w-full py-6 bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Brand and Social */}
          <div className="space-y-4 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start space-x-2">
              <div className={cn(iconContainerVariants({ variant: "primary", size: "sm" }))}>
                <Code className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold text-white">FrontEndonFront</span>
            </div>
            <div className="flex gap-6 justify-center lg:justify-start">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <Link 
                    key={social.label}
                    href={social.href} 
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Address */}
          <div className="space-y-4 text-center lg:text-left">
            <h4 className="text-sm font-semibold text-white">Address</h4>
            <address className="text-sm text-gray-400 not-italic">
              {contactInfo.address.line1}
              <br />
              {contactInfo.address.line2}
              <br />
              {contactInfo.address.line3}
            </address>
          </div>

          {/* Service Area */}
          <div className="space-y-4 text-center lg:text-left">
            <h4 className="text-sm font-semibold text-white">Service Area</h4>
            <p className="text-sm text-gray-400">Serving North America</p>
          </div>

          {/* Contact */}
          <div className="space-y-4 text-center lg:text-left">
            <h4 className="text-sm font-semibold text-white">Contact</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <Link 
                href={`mailto:${contactInfo.email}`} 
                className="block hover:text-blue-400 transition-colors w-full sm:w-auto"
              >
                {contactInfo.email}
              </Link>
              <Link 
                href={`tel:${contactInfo.phone}`} 
                className="block hover:text-blue-400 transition-colors w-full sm:w-auto"
              >
                {contactInfo.phone}
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <p className="text-xs text-gray-400">
              © {new Date().getFullYear()} FrontEndonFront. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
} 