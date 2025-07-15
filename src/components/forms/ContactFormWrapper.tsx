"use client"

import dynamic from 'next/dynamic'

const ContactForm = dynamic(() => import('./ContactForm').then(mod => ({ default: mod.ContactForm })), {
  ssr: false,
  loading: () => (
    <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
      <h3 className="text-xl font-bold text-white mb-6">Schedule Your Free Consultation</h3>
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <div className="h-4 bg-gray-700 rounded animate-pulse"></div>
            <div className="h-10 bg-gray-800 rounded animate-pulse"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-700 rounded animate-pulse"></div>
            <div className="h-10 bg-gray-800 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <div className="h-4 bg-gray-700 rounded animate-pulse"></div>
            <div className="h-10 bg-gray-800 rounded animate-pulse"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-700 rounded animate-pulse"></div>
            <div className="h-10 bg-gray-800 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-700 rounded animate-pulse"></div>
          <div className="h-10 bg-gray-800 rounded animate-pulse"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-700 rounded animate-pulse"></div>
          <div className="h-24 bg-gray-800 rounded animate-pulse"></div>
        </div>
        <div className="h-12 bg-blue-600 rounded animate-pulse"></div>
      </div>
    </div>
  )
})

interface ContactFormWrapperProps {
  className?: string
}

export function ContactFormWrapper({ className }: ContactFormWrapperProps) {
  return <ContactForm className={className} />
} 