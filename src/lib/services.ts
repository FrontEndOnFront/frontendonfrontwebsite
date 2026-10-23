import {
  Bot,
  CodeXml,
  Megaphone,
  MousePointerClick,
  Palette,
  Search,
  ShoppingCart,
  Workflow,
  type LucideIcon,
} from "lucide-react"

export type TreeKind = "round" | "pine" | "snowpine" | "cactus" | "rock" | "crystal"

export interface Service {
  slug: string
  name: string
  short: string
  tagline: string
  summary: string
  intro: string
  icon: LucideIcon
  deliverables: { title: string; text: string }[]
  approach: { title: string; text: string }[]
  faqs: { q: string; a: string }[]
  /** Look of this service's stop on the rail world: ground colour, foliage colour and tree style. */
  world: { ground: string; leaf: string; tree: TreeKind }
}

// The order here is the order of the stops around the rail loop.
export const services: Service[] = [
  {
    slug: "branding-design",
    name: "Brand & Web Design",
    short: "Design",
    tagline: "A brand people remember, and a site they enjoy using.",
    summary:
      "Logos, brand systems and UI/UX design that make you look like the leader in your market, on every screen and every sign.",
    intro:
      "Design is the first stop because everything else depends on it. We build brand identities and interface designs that are distinctive, consistent and made to convert, so your ads, your website and your job-site signage all tell the same story.",
    icon: Palette,
    deliverables: [
      { title: "Brand identity", text: "Logo, colour, type and voice, packaged in a brand guide your whole team can use." },
      { title: "Website UI/UX", text: "Wireframes and high-fidelity designs built around how your customers actually buy." },
      { title: "Design systems", text: "Reusable components so every new page and campaign stays on brand." },
      { title: "Marketing creative", text: "Ad sets, social templates, brochures and pitch decks." },
      { title: "Signage & print", text: "Vehicle wraps, job-site boards, storefront and showroom graphics." },
      { title: "Rebrands", text: "Refresh an established name without losing the trust you have built." },
    ],
    approach: [
      { title: "Discover", text: "Workshops with your team and research on your competitors and customers." },
      { title: "Direction", text: "Two or three creative routes, presented with real-world mockups." },
      { title: "Refine", text: "We iterate on the chosen route until it is right." },
      { title: "Roll out", text: "Final files, a brand guide and templates handed over, fully yours." },
    ],
    faqs: [
      { q: "How long does a brand identity take?", a: "Most identities take three to six weeks, depending on how many applications (signage, vehicles, print) are included." },
      { q: "Do I own the final files?", a: "Yes. You receive every source file and full ownership of the work." },
      { q: "Can you design only, and leave development to my team?", a: "Absolutely. We hand off Figma files and a design system that any development team can build from." },
    ],
    world: { ground: "#b7e08c", leaf: "#f48fb8", tree: "round" },
  },
  {
    slug: "web-development",
    name: "Web Development",
    short: "Web Dev",
    tagline: "Fast, secure websites and web apps, built to rank and built to last.",
    summary:
      "Custom websites and web applications on modern frameworks like Next.js and React. Fast, accessible, easy to update and SEO-ready from day one.",
    intro:
      "We are developers first. Every site we ship is hand-built on a modern stack, scores well on Core Web Vitals and comes with a content system your team can actually use. From a ten-page contractor site to a full customer portal, we build it properly the first time.",
    icon: CodeXml,
    deliverables: [
      { title: "Custom websites", text: "Hand-built on Next.js and React, with no bloated page builders." },
      { title: "Web applications", text: "Customer portals, quoting tools, booking systems and dashboards." },
      { title: "CMS setup", text: "Edit pages, listings and blog posts yourself without calling a developer." },
      { title: "Performance & accessibility", text: "Core Web Vitals and WCAG best practices built in, not bolted on." },
      { title: "Integrations", text: "Connect your CRM, payments, inventory, maps and analytics." },
      { title: "Hosting & care plans", text: "Deployment, monitoring, backups and updates handled for you." },
    ],
    approach: [
      { title: "Scope", text: "We map the pages, features and integrations into a clear, fixed plan." },
      { title: "Build", text: "Short sprints with a live preview link so you see progress every week." },
      { title: "Test", text: "Speed, SEO, accessibility and cross-device testing before launch." },
      { title: "Launch & support", text: "A smooth launch with redirects handled, then ongoing care." },
    ],
    faqs: [
      { q: "Do you use WordPress?", a: "We pick the right tool for the job. Most of our builds use Next.js with a headless CMS, which is faster and more secure, but we also support WordPress and Shopify." },
      { q: "Will my site be mobile friendly?", a: "Every site is designed and tested mobile-first across phones, tablets and desktops." },
      { q: "Can you take over an existing site?", a: "Yes. We regularly audit, modernize and maintain sites built by other teams." },
    ],
    world: { ground: "#cdc8bc", leaf: "#7aa95c", tree: "rock" },
  },
  {
    slug: "ecommerce",
    name: "E-commerce",
    short: "E-commerce",
    tagline: "Online stores that sell, ship and scale.",
    summary:
      "Shopify and custom e-commerce builds with product feeds, payments, shipping and inventory connected, so you can sell online without the headaches.",
    intro:
      "Whether you are moving a storefront online, selling parts and accessories, or launching a direct-to-consumer brand, we build stores that load fast, convert well and plug into the systems you already run.",
    icon: ShoppingCart,
    deliverables: [
      { title: "Shopify stores", text: "Custom themes and apps on Shopify and Shopify Plus." },
      { title: "Custom storefronts", text: "Headless commerce when you need full control over the experience." },
      { title: "Catalogue & feeds", text: "Product data cleaned up and synced to Google Shopping and Meta." },
      { title: "Payments & shipping", text: "Canadian payment, tax and shipping rules configured correctly." },
      { title: "Inventory sync", text: "Keep online and in-store stock in step with your POS or ERP." },
      { title: "Conversion optimization", text: "Checkout, product page and cart improvements backed by data." },
    ],
    approach: [
      { title: "Audit", text: "Review your products, margins, fulfilment and current platform." },
      { title: "Design the store", text: "Category, product and checkout flows designed for your buyers." },
      { title: "Build & migrate", text: "Products, customers and orders moved over with SEO protected." },
      { title: "Grow", text: "Shopping ads, email flows and testing to lift revenue after launch." },
    ],
    faqs: [
      { q: "Shopify or custom?", a: "Shopify suits most retailers. We recommend custom or headless when you need complex pricing, B2B ordering or deep integrations." },
      { q: "Can you migrate my existing store?", a: "Yes, including products, customers, order history and 301 redirects so you keep your rankings." },
      { q: "Do you handle Canadian taxes and shipping?", a: "We configure GST/HST/PST, duties and Canadian carriers as part of every build." },
    ],
    world: { ground: "#92d36c", leaf: "#3f9b4a", tree: "round" },
  },
  {
    slug: "seo",
    name: "Search Engine Optimization",
    short: "SEO",
    tagline: "Get found first by the customers already searching for you.",
    summary:
      "Technical, local and content SEO that moves you up Google for the searches that bring in real leads, across BC, Toronto and beyond.",
    intro:
      "We are big believers in SEO. It is the channel that keeps paying you back. We fix the technical foundations, build out local visibility in your service areas, and publish content that answers what your buyers are asking, then report on rankings, traffic and leads every month.",
    icon: Search,
    deliverables: [
      { title: "Technical SEO", text: "Site speed, crawlability, schema markup and indexation issues fixed." },
      { title: "Local SEO", text: "Google Business Profile, citations and location pages for each city you serve." },
      { title: "Keyword strategy", text: "The searches that actually lead to calls, quotes and sales." },
      { title: "Content", text: "Service pages, guides and blog posts written for people and search engines." },
      { title: "Link building", text: "Earned links and local partnerships that build authority." },
      { title: "Reporting", text: "Monthly rankings, traffic and lead reports in plain language." },
    ],
    approach: [
      { title: "Audit", text: "A full technical, content and competitor audit of your site." },
      { title: "Fix the foundation", text: "Resolve technical issues and set up tracking properly." },
      { title: "Build authority", text: "Publish content, earn links and grow your local presence." },
      { title: "Measure & repeat", text: "Monthly reporting and a refreshed plan each quarter." },
    ],
    faqs: [
      { q: "How long until I see results?", a: "Technical fixes can show impact within weeks. Competitive keywords usually take three to six months of consistent work." },
      { q: "Do you guarantee first place on Google?", a: "No honest agency can. We commit to the work, the transparency and the metrics that matter: traffic and leads." },
      { q: "Can you do SEO for several cities?", a: "Yes. We build location pages and local profiles for each area you serve, from the Fraser Valley to the GTA." },
    ],
    world: { ground: "#7fca5d", leaf: "#2f8a3e", tree: "pine" },
  },
  {
    slug: "google-ads",
    name: "Google Ads & PPC",
    short: "Google Ads",
    tagline: "Paid campaigns that bring in leads today, not someday.",
    summary:
      "Google Search, Performance Max, Shopping and YouTube campaigns managed for cost per lead, not vanity clicks.",
    intro:
      "SEO builds long-term value; Google Ads puts you at the top of the page this afternoon. We build and manage campaigns around your real margins, track every call and form, and keep cutting wasted spend so each dollar works harder.",
    icon: MousePointerClick,
    deliverables: [
      { title: "Search campaigns", text: "Tightly themed ad groups on the keywords your buyers use." },
      { title: "Performance Max & Shopping", text: "Product and lead campaigns that use Google's full inventory." },
      { title: "Local service ads", text: "Get Google Guaranteed and appear above everyone else for local trades." },
      { title: "Conversion tracking", text: "Calls, forms and sales tracked accurately with GA4 and tag manager." },
      { title: "Landing pages", text: "Fast, focused pages built to turn clicks into enquiries." },
      { title: "Remarketing", text: "Bring back visitors who were close to booking or buying." },
    ],
    approach: [
      { title: "Account audit", text: "We review what is working and where budget is being wasted." },
      { title: "Tracking first", text: "Proper conversion tracking before we spend a dollar more." },
      { title: "Launch", text: "Campaigns built around your margins, areas and service calendar." },
      { title: "Optimize weekly", text: "Bids, keywords, ads and pages refined every week." },
    ],
    faqs: [
      { q: "What budget do I need?", a: "It depends on your market. We will estimate a realistic budget from keyword costs in your area before you commit." },
      { q: "Do I keep my Google Ads account?", a: "Always. The account and all its data belong to you." },
      { q: "Can ads and SEO work together?", a: "Yes, and they should. Ad data shows which keywords convert, which guides where SEO effort goes." },
    ],
    world: { ground: "#ecd59c", leaf: "#4f9a52", tree: "cactus" },
  },
  {
    slug: "digital-marketing",
    name: "Full-Service Marketing",
    short: "Marketing",
    tagline: "One plan across every channel, run by one team.",
    summary:
      "Social media, email, content and reporting tied together into one growth plan, so you stop juggling freelancers.",
    intro:
      "Full-service means you get one accountable team and one plan. We map out the channels that fit your customers, then run social, email, content and paid campaigns together, with a single dashboard showing what each dollar returns.",
    icon: Megaphone,
    deliverables: [
      { title: "Marketing strategy", text: "A clear 12-month plan with goals, channels and budget." },
      { title: "Social media", text: "Content, community management and paid social on Meta, LinkedIn and TikTok." },
      { title: "Email & automation", text: "Newsletters, nurture sequences and win-back flows." },
      { title: "Content production", text: "Photo, video and written content for every channel." },
      { title: "Reviews & reputation", text: "Systems to earn more five-star reviews and respond to every one." },
      { title: "Analytics", text: "One dashboard that ties leads and sales back to their source." },
    ],
    approach: [
      { title: "Plan", text: "Goals, audiences, channels and a calendar everyone agrees on." },
      { title: "Produce", text: "We create the content and campaigns in-house." },
      { title: "Distribute", text: "Publish and promote across the right channels at the right time." },
      { title: "Report", text: "Monthly reviews of what worked and what we change next." },
    ],
    faqs: [
      { q: "Do I have to buy every service?", a: "No. Most clients start with two or three channels and add more as results come in." },
      { q: "Who will I work with?", a: "A dedicated lead who coordinates design, development and marketing for you." },
      { q: "How do you report results?", a: "A live dashboard plus a monthly call covering leads, sales and next steps." },
    ],
    world: { ground: "#dcb46c", leaf: "#e8742b", tree: "round" },
  },
  {
    slug: "crm-custom-software",
    name: "CRM & Custom Applications",
    short: "CRM & Apps",
    tagline: "Software shaped around how your business actually works.",
    summary:
      "Custom CRMs, quoting tools, portals and internal apps that replace spreadsheets and connect your sales, operations and marketing.",
    intro:
      "Off-the-shelf software rarely fits a growing business perfectly. We design and build CRMs, quoting systems, client portals and internal tools that match your workflow, or set up and extend platforms like HubSpot so your team actually uses them.",
    icon: Workflow,
    deliverables: [
      { title: "Custom CRM", text: "Track leads, jobs and customers in a system built for your pipeline." },
      { title: "CRM setup & integration", text: "HubSpot, Salesforce and Zoho configured, cleaned up and connected." },
      { title: "Quoting & estimating tools", text: "Accurate quotes in minutes instead of hours." },
      { title: "Client & dealer portals", text: "Secure logins for customers, trades or partners." },
      { title: "Internal dashboards", text: "Live operations data your managers can act on." },
      { title: "Mobile & field apps", text: "Tools your crews and reps can use on site." },
    ],
    approach: [
      { title: "Map the workflow", text: "We shadow your team and document how work really flows." },
      { title: "Prototype", text: "Clickable prototypes to validate before writing production code." },
      { title: "Build in phases", text: "Ship the most valuable features first, then expand." },
      { title: "Train & support", text: "Onboarding, documentation and long-term maintenance." },
    ],
    faqs: [
      { q: "Should I build a custom CRM or use HubSpot?", a: "If a platform fits 80% of your needs, we will set it up and extend it. Custom makes sense when your process is your competitive edge." },
      { q: "Who owns the code?", a: "You do. We hand over the source code, documentation and access." },
      { q: "Can it connect to my existing tools?", a: "Yes. We integrate with accounting, ERP, email, calendars and most systems with an API." },
    ],
    world: { ground: "#eef3f8", leaf: "#2f6e5a", tree: "snowpine" },
  },
  {
    slug: "ai-automation",
    name: "AI & Automation",
    short: "AI",
    tagline: "Put the repetitive work on autopilot.",
    summary:
      "AI assistants, smart quoting and workflow automation that save your team hours every week and keep leads from slipping through.",
    intro:
      "AI is only useful when it solves a real problem. We find the repetitive work in your sales and operations, like answering common questions, drafting quotes or moving data between systems, and automate it safely.",
    icon: Bot,
    deliverables: [
      { title: "AI assistants", text: "Website and internal chat assistants trained on your own content." },
      { title: "Smart quoting", text: "AI-assisted pricing and estimating, like the tool we built for Artistic Skylights." },
      { title: "Workflow automation", text: "Connect forms, CRM, email and spreadsheets so data moves by itself." },
      { title: "Document processing", text: "Pull data from invoices, plans and forms automatically." },
      { title: "Lead follow-up", text: "Instant, personal responses to every enquiry, day or night." },
      { title: "AI strategy", text: "A practical roadmap of where AI will pay off in your business." },
    ],
    approach: [
      { title: "Find the hours", text: "Identify the tasks that eat the most time." },
      { title: "Pilot", text: "Automate one workflow and measure the time saved." },
      { title: "Scale", text: "Roll out what works across the business." },
      { title: "Monitor", text: "Keep a human in the loop and improve accuracy over time." },
    ],
    faqs: [
      { q: "Is my data safe?", a: "We design every solution with privacy in mind and keep your data in accounts you control." },
      { q: "Will AI replace my staff?", a: "Our goal is to remove busywork so your people spend more time on customers and craft." },
      { q: "Where should we start?", a: "Usually with lead follow-up or quoting, where the time saved is easiest to measure." },
    ],
    world: { ground: "#93dbc6", leaf: "#7c6cf0", tree: "crystal" },
  },
]

export function getService(slug: string) {
  return services.find((service) => service.slug === slug)
}

export function getServiceIndex(slug: string) {
  return services.findIndex((service) => service.slug === slug)
}

/** Zero-padded stop number, e.g. "04". */
export function stopNumber(index: number) {
  return String(index + 1).padStart(2, "0")
}
