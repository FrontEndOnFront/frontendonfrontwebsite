import type { Metadata } from "next"
import { ContactSection, SectionHeading, ServiceCard } from "@/components/common/sections"
import { World } from "@/components/world/World"
import { services } from "@/lib/services"

export const metadata: Metadata = {
  title: "Services: SEO, Google Ads, Marketing, E-commerce, Web Development & Custom Software",
  description:
    "Full-service digital agency services for Canadian businesses: SEO, Google Ads, full-funnel marketing, e-commerce, web development, CRM and custom applications, design and AI automation.",
  alternates: { canonical: "/services/" },
}

export default function ServicesPage() {
  return (
    <>
      <section className="pt-14 sm:pt-20">
        <div className="container-page">
          <div className="max-w-3xl animate-rise">
            <p className="eyebrow">Services</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tighter text-balance sm:text-6xl">
              Eight stops. One team. Everything your business needs online.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              From the first logo sketch to the hundredth Google Ads optimization, we handle every part of your
              digital presence. Pick a stop to see what is included.
            </p>
          </div>
          <World mode="full" className="voxel-frame mt-12 h-[420px] sm:h-[520px]" />
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading eyebrow="All services" title="Choose a stop, or ride the whole line" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, i) => (
              <ServiceCard key={service.slug} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  )
}
