import type { Service } from "./services"
import { site } from "./site"

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${site.url}/#organization`,
    name: site.name,
    url: site.url,
    logo: `${site.url}/logo.svg`,
    description: site.description,
    email: site.email,
    telephone: site.phone,
    foundingDate: String(site.founded),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "British Columbia" },
      { "@type": "City", name: "Vancouver" },
      { "@type": "City", name: "Surrey" },
      { "@type": "City", name: "Toronto" },
      { "@type": "Country", name: "Canada" },
    ],
    knowsAbout: [
      "Search engine optimization",
      "Google Ads",
      "Digital marketing",
      "E-commerce",
      "Web development",
      "CRM development",
      "Custom software",
      "Brand design",
    ],
  }
}

export function serviceSchema(service: Service) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.name,
      description: service.summary,
      url: `${site.url}/services/${service.slug}/`,
      provider: { "@id": `${site.url}/#organization` },
      areaServed: ["British Columbia", "Toronto", "Canada"],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: service.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
    },
  ]
}
