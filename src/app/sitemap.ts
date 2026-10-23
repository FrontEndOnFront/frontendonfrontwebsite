import type { MetadataRoute } from "next"
import { industries } from "@/lib/industries"
import { services } from "@/lib/services"
import { site } from "@/lib/site"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/services/", "/industries/", "/about/", "/contact/"]
  return [
    ...pages.map((path) => ({ url: `${site.url}${path}`, priority: path === "/" ? 1 : 0.8 })),
    ...services.map((s) => ({ url: `${site.url}/services/${s.slug}/`, priority: 0.9 })),
    ...industries.map((i) => ({ url: `${site.url}/industries/${i.slug}/`, priority: 0.8 })),
  ]
}
