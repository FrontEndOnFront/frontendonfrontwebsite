import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, Check } from "lucide-react"
import { ContactSection, SectionHeading, ServiceCard } from "@/components/common/sections"
import { clients, testimonial } from "@/lib/data"
import { getIndustry, industries } from "@/lib/industries"
import { getServiceIndex, services } from "@/lib/services"

type Params = Promise<{ slug: string }>

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const industry = getIndustry(slug)
  if (!industry) return {}
  return {
    title: `${industry.name} Marketing & Web Development`,
    description: industry.summary,
    alternates: { canonical: `/industries/${industry.slug}/` },
  }
}

export default async function IndustryPage({ params }: { params: Params }) {
  const { slug } = await params
  const industry = getIndustry(slug)
  if (!industry) notFound()

  const Icon = industry.icon
  const caseStudy = clients.find((client) => client.id === industry.caseStudy)
  const recommended = industry.services.map((s) => getServiceIndex(s)).filter((i) => i >= 0)

  return (
    <>
      <section className="py-14 sm:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div className="animate-rise">
            <nav className="font-pixel text-xs text-muted" aria-label="Breadcrumb">
              <Link href="/industries/" className="hover:text-ink">
                Industries
              </Link>{" "}
              / {industry.name}
            </nav>
            <span className="mt-6 grid h-14 w-14 place-items-center rounded-xl bg-blue-600/20 text-blue-400">
              <Icon className="h-6 w-6" />
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tighter text-balance sm:text-6xl">{industry.name}</h1>
            <p className="mt-4 text-xl font-medium text-ink-soft text-balance">{industry.tagline}</p>
            <p className="mt-4 max-w-2xl leading-relaxed text-muted">{industry.intro}</p>
            <Link href="/contact/" className="btn btn-primary mt-8">
              Get a free {industry.short} marketing review <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="rounded-xl border border-gray-800 bg-gray-900 p-6 shadow-lg sm:p-8">
            <p className="eyebrow">What we build</p>
            <ul className="mt-5 space-y-3">
              {industry.builds.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-blue-600/20 text-blue-400">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-gray-900 py-20 sm:py-24">
        <div className="container-page">
          <SectionHeading eyebrow="The problems we solve" title={`What holds ${industry.short} businesses back`} />
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {industry.challenges.map((challenge, i) => (
              <div key={challenge.title} className="border-t border-gray-800 pt-5">
                <span className="font-pixel text-xs text-blue-400">0{i + 1}</span>
                <h3 className="mt-2 text-lg font-bold">{challenge.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{challenge.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="Recommended route"
            title="The services we usually start with"
            intro="Every business is different, but this is the route that tends to deliver results fastest in your industry."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {recommended.map((i) => (
              <ServiceCard key={services[i].slug} service={services[i]} index={i} />
            ))}
          </div>
        </div>
      </section>

      {caseStudy && (
        <section className="pb-20 sm:pb-28">
          <div className="container-page">
            <div className="rounded-xl border border-blue-600/30 bg-gradient-to-br from-blue-950/60 to-gray-900 p-8 text-white sm:p-12">
              <p className="eyebrow !text-sun">Client story · {caseStudy.name}</p>
              <p className="mt-4 max-w-3xl text-xl leading-relaxed sm:text-2xl">{caseStudy.description}</p>
              {caseStudy.id === "artistic-skylights" && (
                <blockquote className="mt-8 border-l-4 border-blue-600 pl-5 text-white/85">
                  “{testimonial.quote}”
                  <footer className="mt-3 text-sm text-white/70">
                    {testimonial.author}, {testimonial.title}, {testimonial.company}
                  </footer>
                </blockquote>
              )}
            </div>
          </div>
        </section>
      )}

      <ContactSection title={`Let's grow your ${industry.short} business`} />
    </>
  )
}
