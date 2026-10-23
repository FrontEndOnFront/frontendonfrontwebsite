import Link from "next/link"
import { industries } from "@/lib/industries"
import { services } from "@/lib/services"
import { site } from "@/lib/site"
import { Logo } from "./Logo"
import { MapleLeaf } from "../common/MapleLeaf"

export function Footer() {
  return (
    <footer className="bg-ink text-white/70">
      <div className="container-page grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div className="space-y-4">
          <Logo inverted />
          <p className="max-w-sm text-sm leading-relaxed">
            A full-service digital agency for marketing, websites and custom software. One team, every stop on the line.
          </p>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-xs text-white">
            <MapleLeaf className="h-3.5 w-3.5 text-rail" />
            Canadian-owned and operated
          </p>
        </div>

        <div>
          <h2 className="eyebrow !text-sun">Services</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}/`} className="hover:text-white">
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="eyebrow !text-sun">Industries</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {industries.map((industry) => (
              <li key={industry.slug}>
                <Link href={`/industries/${industry.slug}/`} className="hover:text-white">
                  {industry.name}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link href="/about/" className="hover:text-white">
                About us
              </Link>
            </li>
            <li>
              <Link href="/contact/" className="hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-5 text-sm">
          <h2 className="eyebrow !text-sun">Get in touch</h2>
          <div className="space-y-1">
            <a href={`mailto:${site.email}`} className="block text-white hover:text-sun">
              {site.email}
            </a>
            <a href={site.phoneHref} className="block text-white hover:text-sun">
              {site.phone}
            </a>
          </div>
          {site.locations.map((location) => (
            <div key={location.id}>
              <p className="font-semibold text-white">{location.name}</p>
              <p>{location.area}</p>
              <p className="text-white/50">{location.detail}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col justify-between gap-2 py-6 text-xs text-white/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>Serving British Columbia, Toronto and clients across Canada since {site.founded}.</p>
        </div>
      </div>
    </footer>
  )
}
