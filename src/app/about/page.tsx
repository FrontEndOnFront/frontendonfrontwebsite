import type { Metadata } from "next"
import { MapPin } from "lucide-react"
import { MapleLeaf } from "@/components/common/MapleLeaf"
import { ContactSection, SectionHeading } from "@/components/common/sections"
import { clients, processSteps } from "@/lib/data"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: "About Us: A Canadian-Owned Digital Agency in BC and Toronto",
  description:
    "FrontEndonFront is a Canadian-owned and operated digital agency serving British Columbia and Toronto since 2019, delivering marketing, web development and custom software.",
  alternates: { canonical: "/about/" },
}

const values = [
  { title: "Developers at heart", text: "We started as engineers, so what we build is fast, secure and properly maintained." },
  { title: "Straight talk", text: "Clear pricing, honest timelines and reporting in plain language." },
  { title: "Long-term partners", text: "Most of our work is ongoing. We grow when our clients grow." },
  { title: "Proudly Canadian", text: "A Canadian team that understands Canadian markets, rules and customers." },
]

export default function AboutPage() {
  return (
    <>
      <section className="py-14 sm:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="animate-rise">
            <p className="eyebrow">About us</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tighter text-balance sm:text-6xl">
              Canadian owned. Canadian operated. Full service.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              {site.name} has been helping businesses grow online since {site.founded}. What started as a custom
              software studio has become a full-service digital agency: we still write the code, and now we also run
              the SEO, the ads and the marketing that bring customers to it.
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              We work with construction companies, retailers, real estate professionals and automotive businesses
              from our home base in Surrey, BC and across the Greater Toronto Area.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-blue-600 p-6 text-white shadow-lg sm:col-span-2">
              <MapleLeaf className="h-10 w-10" />
              <p className="mt-4 text-2xl font-bold">100% Canadian-owned and operated</p>
            </div>
            {site.locations.map((location) => (
              <div key={location.id} className="card p-6">
                <MapPin className="h-5 w-5 text-brand" />
                <p className="mt-3 font-bold">{location.name}</p>
                <p className="text-sm text-muted">{location.area}</p>
                <p className="mt-2 text-xs text-muted">{location.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-gray-900 py-20 sm:py-24">
        <div className="container-page">
          <SectionHeading eyebrow="What we stand for" title="How we work" />
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, i) => (
              <div key={value.title} className="border-t border-gray-800 pt-5">
                <span className="font-pixel text-xs text-brand">0{i + 1}</span>
                <h3 className="mt-2 text-lg font-bold">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-page grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Our process" title="Four steps, no surprises" />
            <ol className="mt-8 space-y-6">
              {processSteps.map((step) => (
                <li key={step.step} className="flex gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-blue-600 font-pixel text-white text-sm">
                    {step.step}
                  </span>
                  <div>
                    <h3 className="font-bold">{step.title}</h3>
                    <p className="mt-1 text-sm text-muted">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <SectionHeading eyebrow="Selected clients" title="Who we have worked with" />
            <ul className="mt-8 space-y-4">
              {clients.map((client) => (
                <li key={client.id} className="card p-5">
                  <p className="font-bold">{client.name}</p>
                  <p className="mt-1 text-sm text-muted">{client.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  )
}
