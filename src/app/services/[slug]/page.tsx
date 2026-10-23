import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import { ContactSection, SectionHeading } from "@/components/common/sections"
import { World } from "@/components/world/World"
import { industries } from "@/lib/industries"
import { JsonLd, serviceSchema } from "@/lib/seo"
import { getServiceIndex, services, stopNumber } from "@/lib/services"

type Params = Promise<{ slug: string }>

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const service = services[getServiceIndex(slug)]
  if (!service) return {}
  return {
    title: `${service.name} in BC & Toronto`,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}/` },
    openGraph: { title: `${service.name} | FrontEndonFront`, description: service.summary },
  }
}

export default async function ServicePage({ params }: { params: Params }) {
  const { slug } = await params
  const index = getServiceIndex(slug)
  if (index < 0) notFound()

  const service = services[index]
  const previous = services[(index - 1 + services.length) % services.length]
  const next = services[(index + 1) % services.length]
  const relatedIndustries = industries.filter((industry) => industry.services.includes(service.slug))
  const Icon = service.icon

  return (
    <>
      <section className="pt-10 sm:pt-14">
        <div className="container-page grid items-center gap-10 lg:grid-cols-[1fr_1.15fr]">
          <div className="animate-rise">
            <nav className="font-pixel text-xs text-muted" aria-label="Breadcrumb">
              <Link href="/services/" className="hover:text-ink">
                Services
              </Link>{" "}
              / Stop {stopNumber(index)} of {stopNumber(services.length - 1)}
            </nav>
            <div className="mt-6 flex items-center gap-3">
              <span
                className="grid h-12 w-12 place-items-center rounded-xl border-2 border-ink"
                style={{ backgroundColor: service.world.ground }}
              >
                <Icon className="h-5 w-5" />
              </span>
              <p className="eyebrow">{service.short}</p>
            </div>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              {service.name}
            </h1>
            <p className="mt-4 text-xl font-medium text-ink-soft text-balance">{service.tagline}</p>
            <p className="mt-4 leading-relaxed text-muted">{service.intro}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact/" className="btn btn-primary">
                Talk to us about {service.short} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="#included" className="btn btn-secondary">
                What&apos;s included
              </Link>
            </div>
          </div>
          <World mode="segment" focus={index} className="voxel-frame h-[340px] sm:h-[460px]" />
        </div>
      </section>

      <section id="included" className="scroll-mt-20 py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading eyebrow="What's included" title={`Everything you get with ${service.short}`} />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {service.deliverables.map((item) => (
              <div key={item.title} className="card p-6">
                <span className="grid h-8 w-8 place-items-center rounded-md bg-leaf text-ink">
                  <Check className="h-4 w-4" />
                </span>
                <h3 className="mt-4 text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-20 text-white sm:py-24">
        <div className="container-page">
          <p className="eyebrow !text-sun">Our approach</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">How we run {service.short}</h2>
          <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {service.approach.map((step, i) => (
              <li key={step.title} className="border-t-2 border-white/20 pt-5">
                <span className="font-pixel text-xs text-sun">0{i + 1}</span>
                <h3 className="mt-2 text-lg font-bold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-page grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="FAQ" title="Common questions" />
            <dl className="mt-8 divide-y divide-line border-y border-line">
              {service.faqs.map((faq) => (
                <div key={faq.q} className="py-5">
                  <dt className="font-semibold">{faq.q}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-muted">{faq.a}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <SectionHeading eyebrow="Industries" title="Where we put it to work" />
            <ul className="mt-8 grid gap-3">
              {relatedIndustries.map((industry) => (
                <li key={industry.slug}>
                  <Link
                    href={`/industries/${industry.slug}/`}
                    className="card card-link flex items-center justify-between p-5"
                  >
                    <span>
                      <span className="block font-bold">{industry.name}</span>
                      <span className="text-sm text-muted">{industry.tagline}</span>
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <nav className="border-t border-line bg-white" aria-label="Other services">
        <div className="container-page grid gap-4 py-10 sm:grid-cols-2">
          <Link href={`/services/${previous.slug}/`} className="card card-link group flex items-center gap-4 p-5">
            <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
            <span>
              <span className="block font-pixel text-xs text-muted">Previous stop</span>
              <span className="font-bold">{previous.name}</span>
            </span>
          </Link>
          <Link
            href={`/services/${next.slug}/`}
            className="card card-link group flex items-center justify-end gap-4 p-5 text-right"
          >
            <span>
              <span className="block font-pixel text-xs text-muted">Next stop</span>
              <span className="font-bold">{next.name}</span>
            </span>
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </nav>

      <ContactSection title={`Let's talk about ${service.short}`} />
      <JsonLd data={serviceSchema(service)} />
    </>
  )
}
