"use client"

import { Button } from "@/components/ui/button"
import { buttonVariants } from "@/lib/design-system"
import { Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

const serviceOptions = [
  "Full-Stack Web Application",
  "AI Consulting & Integration", 
  "Software Modernization",
  "Rapid Development",
  "Small Business Solutions",
  "Deployment & Maintenance",
  "Other"
]

interface ContactFormProps {
  className?: string
}

export function ContactForm({ className }: ContactFormProps) {
  return (
    <div className={cn("bg-gray-900 p-8 rounded-xl border border-gray-800", className)}>
      <h3 className="text-xl font-bold text-white mb-6">Schedule Your Free Consultation</h3>
      <form 
        action="https://formspree.io/f/mqababed"
        method="POST"
        className="space-y-4"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-300">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              required
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="John Smith"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="company" className="text-sm font-medium text-gray-300">
              Company
            </label>
            <input
              id="company"
              name="company"
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Your Company"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="john@example.com"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium text-gray-300">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="(123) 456-7890"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="service" className="text-sm font-medium text-gray-300">
            Service Interested In
          </label>
          <select
            id="service"
            name="service"
            required
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="">Select a service...</option>
            {serviceOptions.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium text-gray-300">
            Project Details
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Tell us about your project..."
          ></textarea>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="consent"
            name="consent"
            required
            className="w-4 h-4 border-gray-700 rounded text-blue-600 focus:ring-blue-600"
          />
          <label htmlFor="consent" className="text-sm text-gray-300">
            I agree to be contacted about my inquiry
          </label>
        </div>

        <Button 
          type="submit" 
          className={cn(buttonVariants({ variant: "primary", size: "lg" }), "w-full")}
        >
          Schedule Consultation
          <Calendar className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </div>
  )
} 