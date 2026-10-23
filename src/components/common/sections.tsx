import Link from "next/link"
import { ArrowRight, ArrowUpRight, Check } from "lucide-react"
import { ctaBenefits } from "@/lib/data"
import type { Industry } from "@/lib/industries"
import { stopNumber, type Service } from "@/lib/services"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"
import { ContactForm } from "../forms/ContactForm"

interface SectionHeadingProps {
  eyebrow: string
  title: React.ReactNode
  intro?: React.ReactNode
  align?: "left" | "center"
  className?: string
}

export function SectionHeading({ eyebrow, title, intro, align = "left", className }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold tracking-tighter text-balance sm:text-4xl lg:text-5xl">{title}</h2>
      {intro && <p className="mt-4 text-lg leading-relaxed text-muted text-pretty">{intro}</p>}
    </div>
  )
}

export function ServiceCard({ service, index, className }: { service: Service; index: number; className?: string }) {
  const Icon = service.icon
  return (
    <Link
      href={`/services/${service.slug}/`}
      className={cn("card card-link group flex flex-col p-6", className)}
    >
      <span className="self-end font-pixel text-xs text-muted">Stop {stopNumber(index)}</span>
      <span className="mx-auto grid h-12 w-12 place-items-center rounded-lg bg-blue-600 text-white">
        <Icon className="h-6 w-6" />
      </span>
      <h3 className="mt-4 text-center text-xl font-bold text-white">{service.name}</h3>
      <p className="mt-2 flex-1 text-center text-gray-400">{service.summary}</p>
      <span className="mt-6 inline-flex items-center justify-center gap-1 text-sm font-semibold text-blue-400">
        Explore {service.short}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  )
}

export function IndustryCard({ industry, className }: { industry: Industry; className?: string }) {
  const Icon = industry.icon
  return (
    <Link href={`/industries/${industry.slug}/`} className={cn("card card-link group flex flex-col p-6", className)}>
      <span className="grid h-12 w-12 place-items-center rounded-xl bg-blue-600/20 text-blue-400">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="mt-6 text-xl font-bold">{industry.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{industry.summary}</p>
      <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-ink">
        See how we help
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
    </Link>
  )
}

export function ContactSection({ title = "Ready to get on board?" }: { title?: string }) {
  return (
    <section id="contact" className="border-t border-gray-800 bg-gradient-to-b from-gray-900 to-gray-950 py-20 text-white sm:py-28">
      <div className="container-page grid items-start gap-12 lg:grid-cols-2">
        <div className="space-y-6">
          <p className="eyebrow !text-sun">Let&apos;s work together</p>
          <h2 className="text-3xl font-bold tracking-tighter text-balance sm:text-5xl">{title}</h2>
          <p className="text-lg text-white/70">
            Book a free consultation with our team. Tell us where you want to go and we will map the route: which
            services, in what order, and what it will cost.
          </p>
          <ul className="space-y-3">
            {ctaBenefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-3 text-white/90">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-blue-600/20 text-blue-400">
                  <Check className="h-4 w-4" />
                </span>
                {benefit}
              </li>
            ))}
          </ul>
          <div className="space-y-1 pt-2 text-lg">
            <a href={site.phoneHref} className="block font-semibold hover:text-sun">
              {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="block font-semibold hover:text-sun">
              {site.email}
            </a>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  )
}
