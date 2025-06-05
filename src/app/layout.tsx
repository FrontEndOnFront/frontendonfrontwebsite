import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FrontEndonFront - Custom Software Solutions',
  description: 'Transform your business with custom software solutions. From full-stack applications to AI integration, we deliver cutting-edge solutions that drive real business results.',
  generator: 'Next.js',
  icons: {
    icon: [
      { url: '/logo.svg', type: 'image/svg+xml' },
    ],
    shortcut: ['/logo.svg'],
    apple: [
      { url: '/logo.svg' }
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
