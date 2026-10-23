import { Building2, Car, HardHat, Store, type LucideIcon } from "lucide-react"

export interface Industry {
  slug: string
  name: string
  /** Lowercase noun for use mid-sentence, e.g. "real estate". */
  short: string
  tagline: string
  summary: string
  intro: string
  icon: LucideIcon
  challenges: { title: string; text: string }[]
  builds: string[]
  /** Service slugs most relevant to this industry, in the order we usually recommend them. */
  services: string[]
  /** Client id from data.ts to feature as proof, when we have one. */
  caseStudy?: string
}

export const industries: Industry[] = [
  {
    slug: "construction",
    name: "Construction & Trades",
    short: "construction",
    tagline: "Win more bids and look like the biggest builder in town.",
    summary:
      "Websites, local SEO, Google Ads and quoting software for general contractors, trades, manufacturers and home improvement companies.",
    intro:
      "Construction buyers search locally, compare portfolios and want a fast, accurate quote. We help contractors, trades and building-product companies show off their work, rank in every service area and turn estimates around in minutes.",
    icon: HardHat,
    challenges: [
      { title: "Leads dry up between projects", text: "Local SEO and Google Local Services Ads keep the phone ringing year-round." },
      { title: "Quoting takes too long", text: "Custom estimating tools turn hours of spreadsheet work into minutes." },
      { title: "Your work deserves a better showcase", text: "Project galleries and case studies that prove quality to new clients." },
    ],
    builds: [
      "Project portfolio websites",
      "Service-area landing pages",
      "Online quote and estimate tools",
      "Job and lead tracking CRMs",
      "Recruiting pages for trades",
      "Vehicle and job-site signage",
    ],
    services: ["seo", "google-ads", "crm-custom-software", "web-development", "branding-design"],
    caseStudy: "artistic-skylights",
  },
  {
    slug: "retail",
    name: "Retail & E-commerce",
    short: "retail",
    tagline: "Bring the in-store experience online, and bring online shoppers in-store.",
    summary:
      "Shopify stores, Google Shopping, social and email marketing for independent retailers and growing Canadian brands.",
    intro:
      "Retail is won on convenience and brand. We build online stores that sync with your inventory, run Shopping and social campaigns that bring buyers back, and design brand experiences that hold up against the national chains.",
    icon: Store,
    challenges: [
      { title: "Competing with big-box retailers", text: "A sharp brand and local SEO help you win the shoppers near you." },
      { title: "Online and in-store stock out of sync", text: "Inventory integrations keep your POS and store in step." },
      { title: "One-time buyers", text: "Email flows and loyalty programs turn first orders into repeat customers." },
    ],
    builds: [
      "Shopify and headless stores",
      "Google Shopping and Performance Max",
      "Email and SMS automation",
      "Loyalty and rewards programs",
      "POS and inventory integrations",
      "Brand refreshes and packaging",
    ],
    services: ["ecommerce", "google-ads", "digital-marketing", "branding-design", "seo"],
    caseStudy: "mec",
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    short: "real estate",
    tagline: "Stand out in a market where every listing looks the same.",
    summary:
      "Agent and brokerage websites, listing integrations, lead generation and CRMs for realtors, developers and property managers.",
    intro:
      "Real estate is a relationship business that now starts online. We build fast agent, team and pre-sale websites, run targeted ad campaigns for listings and developments, and connect everything to a CRM so no lead goes cold.",
    icon: Building2,
    challenges: [
      { title: "Leads from portals you do not own", text: "Your own site and SEO bring buyers and sellers directly to you." },
      { title: "Slow follow-up", text: "CRM automation and AI assistants reply to every enquiry within minutes." },
      { title: "Pre-sales need buzz fast", text: "Launch sites and paid campaigns that fill a registration list." },
    ],
    builds: [
      "Agent and brokerage websites",
      "Listing and MLS® integrations",
      "Pre-sale and development launch sites",
      "Neighbourhood guide content",
      "Lead nurture CRMs",
      "Property management portals",
    ],
    services: ["web-development", "seo", "google-ads", "crm-custom-software", "ai-automation"],
  },
  {
    slug: "automotive",
    name: "Automotive",
    short: "automotive",
    tagline: "Fill the service bays and move more inventory.",
    summary:
      "Websites, inventory feeds, Google Ads and CRM for dealerships, repair shops, detailers and auto parts retailers.",
    intro:
      "Car buyers and service customers do their research online first. We help dealerships, independent shops and parts retailers show up for local searches, keep inventory and pricing up to date across channels, and book more appointments with less admin.",
    icon: Car,
    challenges: [
      { title: "Empty service bays midweek", text: "Online booking, reminders and local ads keep the schedule full." },
      { title: "Inventory spread across platforms", text: "Feeds that sync your stock to your site, Google and marketplaces." },
      { title: "Generic dealer templates", text: "A custom site that reflects your brand and your reviews." },
    ],
    builds: [
      "Dealership and shop websites",
      "Vehicle and parts inventory feeds",
      "Online service booking",
      "Google Vehicle Ads and local campaigns",
      "Customer and service CRMs",
      "Review and reputation programs",
    ],
    services: ["google-ads", "seo", "web-development", "ecommerce", "crm-custom-software"],
  },
]

export function getIndustry(slug: string) {
  return industries.find((industry) => industry.slug === slug)
}
