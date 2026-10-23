import Link from "next/link"
import { ArrowRight, MapPin } from "lucide-react"
import { ContactSection, IndustryCard, SectionHeading, ServiceCard } from "@/components/common/sections"
import { MapleLeaf } from "@/components/common/MapleLeaf"
import { World } from "@/components/world/World"
import { clients, processSteps, testimonial } from "@/lib/data"
import { industries } from "@/lib/industries"
import { services } from "@/lib/services"
import { site } from "@/lib/site"

const pillars = [
  {
    title: "One team, one plan",
    text: "Design, development and marketing under one roof, so nothing gets lost between agencies and freelancers.",
  },
  {
    title: "SEO-first, always",
    text: "Every site we build is fast, structured and search-ready, then we keep pushing it up the rankings.",
  },
  {
    title: "Built to measure",
    text: "Tracking on every call, form and sale, so you always know which dollars are working.",
  },
]

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden pt-14 sm:pt-20">
        <div className="container-page">
          <div className="mx-auto max-w-4xl text-center animate-rise">
            <p className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-white px-3 py-1.5 font-pixel text-xs">
              <MapleLeaf className="h-3.5 w-3.5 text-rail" />
              Canadian-owned · BC + Toronto
            </p>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-balance sm:text-6xl lg:text-7xl">
              Marketing, websites and custom software.{" "}
              <span className="text-brand">One line, every stop.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted text-pretty sm:text-xl">
              {site.name} is a full-service digital agency. We handle SEO, Google Ads, full-funnel marketing,
              e-commerce, web development, CRM and custom applications, and design, for construction, retail, real
              estate and automotive businesses across Canada.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/contact/" className="btn btn-primary">
                Book a free consultation <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/services/" className="btn btn-secondary">
                Explore all services
              </Link>
            </div>
          </div>

          <div className="relative mt-14 sm:mt-16">
            <World mode="full" className="voxel-frame h-[380px] sm:h-[560px] lg:h-[640px]" />
            <p className="mt-6 text-center font-pixel text-xs text-muted">
              Every service is a stop on the same loop. Drag to spin the island, tap a stop to step off.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="What we do"
            title="Full service means everything, done by one team"
            intro="Start with one stop or ride the whole line. Each service is strong on its own and even stronger connected to the rest."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, i) => (
              <ServiceCard key={service.slug} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-white py-20 sm:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <SectionHeading
            eyebrow="Why FrontEndonFront"
            title="Strategy, code and campaigns that pull in the same direction"
          />
          <div className="grid gap-6 sm:grid-cols-3">
            {pillars.map((pillar, i) => (
              <div key={pillar.title} className="border-t-2 border-ink pt-5">
                <span className="font-pixel text-xs text-brand">0{i + 1}</span>
                <h3 className="mt-2 text-lg font-bold">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{pillar.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Industries"
              title="We know the businesses we work with"
              intro="Deep experience in four industries where a strong online presence makes an outsized difference."
            />
            <Link href="/industries/" className="btn btn-secondary shrink-0 self-start md:self-auto">
              All industries
            </Link>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((industry) => (
              <IndustryCard key={industry.slug} industry={industry} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper-deep py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading eyebrow="Selected work" title="Trusted by teams from local builders to national brands" />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {clients.map((client) => (
              <article key={client.id} className="card p-6">
                <p className="font-pixel text-xs text-muted">{client.sector}</p>
                <h3 className="mt-2 text-xl font-bold">{client.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{client.description}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {client.services.map((s) => (
                    <li key={s} className="rounded-full bg-brand-soft px-2.5 py-1 text-xs font-medium text-brand-deep">
                      {s}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <figure className="mt-10 rounded-3xl border-2 border-ink bg-white p-8 shadow-[8px_8px_0_var(--color-ink)] sm:p-12">
            <blockquote className="text-xl font-medium leading-relaxed text-balance sm:text-2xl">
              “{testimonial.quote}”
            </blockquote>
            <figcaption className="mt-6 text-sm text-muted">
              <span className="font-semibold text-ink">{testimonial.author}</span>, {testimonial.title},{" "}
              {testimonial.company}
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading eyebrow="How it works" title="From first call to full speed" align="center" />
          <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step) => (
              <li key={step.step} className="relative card p-6">
                <span className="grid h-10 w-10 place-items-center rounded-lg border-2 border-ink bg-sun font-pixel text-sm">
                  {step.step}
                </span>
                <h3 className="mt-5 text-lg font-bold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="pb-20 sm:pb-28">
        <div className="container-page">
          <div className="grid gap-8 rounded-3xl bg-brand p-8 text-white sm:p-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <p className="eyebrow !text-sun">Local to you</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Canadian owned and operated, on the ground in BC and Toronto
              </h2>
              <p className="mt-4 text-white/80">
                We are a Canadian company working with Canadian businesses. Meet us in person in the Lower Mainland or
                the GTA, or work with us remotely from anywhere in the country.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {site.locations.map((location) => (
                <div key={location.id} className="rounded-2xl bg-white/10 p-5">
                  <MapPin className="h-5 w-5 text-sun" />
                  <p className="mt-3 font-bold">{location.name}</p>
                  <p className="text-sm text-white/75">{location.area}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  )
}
