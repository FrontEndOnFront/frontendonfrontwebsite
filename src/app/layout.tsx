import type { Metadata, Viewport } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { JsonLd, organizationSchema } from "@/lib/seo"
import { site } from "@/lib/site"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "FrontEndonFront | Digital Marketing, Web Development & Custom Software in BC and Toronto",
    template: "%s | FrontEndonFront",
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "digital agency BC",
    "digital marketing Toronto",
    "SEO Vancouver",
    "SEO Toronto",
    "Google Ads agency",
    "web development Surrey",
    "e-commerce development Canada",
    "custom CRM development",
    "construction marketing",
    "real estate websites",
    "automotive marketing",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: site.url,
    siteName: site.name,
    title: "FrontEndonFront | Full-service digital agency in BC and Toronto",
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/logo.svg", shortcut: "/logo.svg", apple: "/logo.svg" },
}

export const viewport: Viewport = {
  themeColor: "#030712",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-CA"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className="relative flex min-h-screen flex-col">
        {/* The original site's animated blue grid, behind everything. */}
        <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.04]" aria-hidden>
          <div
            className="absolute -inset-[60px] animate-[grid-move_30s_linear_infinite]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(59,130,246,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.6) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] btn btn-secondary">
          Skip to content
        </a>
        <Header />
        <main id="main" className="relative z-10 flex-1">
          {children}
        </main>
        <Footer />
        <JsonLd data={organizationSchema()} />
      </body>
    </html>
  )
}
