import type { Metadata } from "next"
import { ContactSection, IndustryCard } from "@/components/common/sections"
import { industries } from "@/lib/industries"

export const metadata: Metadata = {
  title: "Industries: Construction, Retail, Real Estate & Automotive Marketing",
  description:
    "Digital marketing, websites and custom software for construction companies, retailers, real estate professionals and automotive businesses in BC and Toronto.",
  alternates: { canonical: "/industries/" },
}

export default function IndustriesPage() {
  return (
    <>
      <section className="py-14 sm:py-20">
        <div className="container-page">
          <div className="max-w-3xl animate-rise">
            <p className="eyebrow">Industries</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-balance sm:text-6xl">
              Built for the industries that build Canada
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              We focus on four industries where we know the buyers, the competition and the software. That focus means
              faster ramp-up and campaigns that work from the start.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {industries.map((industry) => (
              <IndustryCard key={industry.slug} industry={industry} className="sm:p-8" />
            ))}
          </div>
        </div>
      </section>
      <ContactSection />
    </>
  )
}
