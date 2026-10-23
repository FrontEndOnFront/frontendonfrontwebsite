import {
  si1password,
  siBigcommerce,
  siBrevo,
  siClaude,
  siCloudflare,
  siContentful,
  siDocker,
  siFigma,
  siFirebase,
  siFortinet,
  siGithub,
  siGoogle,
  siGoogleads,
  siGoogleanalytics,
  siGooglebigquery,
  siGooglecloud,
  siGooglegemini,
  siGooglemaps,
  siGooglesearchconsole,
  siGoogletagmanager,
  siGraphql,
  siHubspot,
  siInstagram,
  siJira,
  siMailchimp,
  siMake,
  siMeta,
  siMongodb,
  siNetlify,
  siNextdotjs,
  siNodedotjs,
  siPinterest,
  siPostgresql,
  siPython,
  siQuickbooks,
  siReact,
  siRedis,
  siSanity,
  siSemrush,
  siShopify,
  siSquare,
  siStripe,
  siSupabase,
  siTailwindcss,
  siTeamviewer,
  siTiktok,
  siTypescript,
  siUbiquiti,
  siVercel,
  siWordpress,
  siYoast,
  siYoutube,
  siZapier,
  type SimpleIcon,
} from "simple-icons"

export interface Tool {
  name: string
  /** Brand mark from Simple Icons; tools without one render as a text chip. */
  icon?: SimpleIcon
  /** Service slugs this tool is used for. */
  services: string[]
}

export interface ToolGroup {
  title: string
  tools: Tool[]
}

// Platforms the team works in, grouped by the service they power. These are tools, not clients:
// never present them as client logos.
export const toolGroups: ToolGroup[] = [
  {
    title: "SEO & analytics",
    tools: [
      { name: "Google Search", icon: siGoogle, services: ["seo"] },
      { name: "Search Console", icon: siGooglesearchconsole, services: ["seo"] },
      { name: "Google Analytics", icon: siGoogleanalytics, services: ["seo", "digital-marketing", "ecommerce"] },
      { name: "Google Business Profile", services: ["seo"] },
      { name: "Google Maps", icon: siGooglemaps, services: ["seo"] },
      { name: "Semrush", icon: siSemrush, services: ["seo"] },
      { name: "Yoast SEO", icon: siYoast, services: ["seo"] },
    ],
  },
  {
    title: "Digital marketing & Google Ads",
    tools: [
      { name: "Google Ads", icon: siGoogleads, services: ["digital-marketing"] },
      { name: "Tag Manager", icon: siGoogletagmanager, services: ["digital-marketing", "seo"] },
      { name: "YouTube Ads", icon: siYoutube, services: ["digital-marketing"] },
      { name: "Meta Ads", icon: siMeta, services: ["digital-marketing"] },
      { name: "Instagram", icon: siInstagram, services: ["digital-marketing"] },
      { name: "TikTok", icon: siTiktok, services: ["digital-marketing"] },
      { name: "LinkedIn", services: ["digital-marketing"] },
      { name: "Pinterest", icon: siPinterest, services: ["digital-marketing"] },
      { name: "Mailchimp", icon: siMailchimp, services: ["digital-marketing", "ecommerce"] },
      { name: "Brevo", icon: siBrevo, services: ["digital-marketing"] },
      { name: "BigQuery", icon: siGooglebigquery, services: ["digital-marketing"] },
    ],
  },
  {
    title: "E-commerce & payments",
    tools: [
      { name: "Shopify", icon: siShopify, services: ["ecommerce"] },
      { name: "WooCommerce", services: ["ecommerce"] },
      { name: "BigCommerce", icon: siBigcommerce, services: ["ecommerce"] },
      { name: "Stripe", icon: siStripe, services: ["ecommerce", "web-development", "crm-custom-software"] },
      { name: "Square", icon: siSquare, services: ["ecommerce"] },
    ],
  },
  {
    title: "Web development",
    tools: [
      { name: "Next.js", icon: siNextdotjs, services: ["web-development"] },
      { name: "React", icon: siReact, services: ["web-development", "crm-custom-software"] },
      { name: "TypeScript", icon: siTypescript, services: ["web-development", "crm-custom-software"] },
      { name: "Node.js", icon: siNodedotjs, services: ["web-development", "crm-custom-software"] },
      { name: "Python", icon: siPython, services: ["crm-custom-software", "ai-automation"] },
      { name: "GraphQL", icon: siGraphql, services: ["web-development", "crm-custom-software"] },
      { name: "Tailwind CSS", icon: siTailwindcss, services: ["web-development", "branding-design"] },
      { name: "WordPress", icon: siWordpress, services: ["web-development", "seo"] },
      { name: "Sanity", icon: siSanity, services: ["web-development"] },
      { name: "Contentful", icon: siContentful, services: ["web-development"] },
      { name: "GitHub", icon: siGithub, services: ["web-development", "crm-custom-software"] },
    ],
  },
  {
    title: "Cloud, hosting & databases",
    tools: [
      { name: "AWS", services: ["web-development", "crm-custom-software", "ai-automation"] },
      { name: "Google Cloud", icon: siGooglecloud, services: ["web-development", "crm-custom-software", "ai-automation"] },
      { name: "Microsoft Azure", services: ["crm-custom-software"] },
      { name: "Firebase", icon: siFirebase, services: ["web-development", "crm-custom-software"] },
      { name: "Vercel", icon: siVercel, services: ["web-development"] },
      { name: "Netlify", icon: siNetlify, services: ["web-development"] },
      { name: "Cloudflare", icon: siCloudflare, services: ["web-development"] },
      { name: "Docker", icon: siDocker, services: ["web-development", "crm-custom-software"] },
      { name: "MongoDB", icon: siMongodb, services: ["web-development", "crm-custom-software"] },
      { name: "PostgreSQL", icon: siPostgresql, services: ["web-development", "crm-custom-software"] },
      { name: "MySQL", services: ["web-development", "crm-custom-software"] },
      { name: "Redis", icon: siRedis, services: ["crm-custom-software"] },
      { name: "Supabase", icon: siSupabase, services: ["crm-custom-software"] },
    ],
  },
  {
    title: "CRM & automation",
    tools: [
      { name: "HubSpot", icon: siHubspot, services: ["crm-custom-software"] },
      { name: "Salesforce", services: ["crm-custom-software"] },
      { name: "Zoho", services: ["crm-custom-software"] },
      { name: "Zapier", icon: siZapier, services: ["crm-custom-software", "ai-automation"] },
      { name: "Make", icon: siMake, services: ["crm-custom-software", "ai-automation"] },
      { name: "QuickBooks", icon: siQuickbooks, services: ["crm-custom-software"] },
      { name: "Jira", icon: siJira, services: ["crm-custom-software", "web-development"] },
    ],
  },
  {
    title: "IT support & security",
    tools: [
      { name: "Microsoft 365", services: ["it-support"] },
      { name: "Google Workspace", services: ["it-support"] },
      { name: "Windows", services: ["it-support"] },
      { name: "macOS", services: ["it-support"] },
      { name: "Ubiquiti", icon: siUbiquiti, services: ["it-support"] },
      { name: "Cisco", services: ["it-support"] },
      { name: "Fortinet", icon: siFortinet, services: ["it-support"] },
      { name: "1Password", icon: si1password, services: ["it-support"] },
      { name: "Veeam", services: ["it-support"] },
      { name: "Synology", services: ["it-support"] },
      { name: "TeamViewer", icon: siTeamviewer, services: ["it-support"] },
      { name: "Zoom", services: ["it-support"] },
      { name: "Dell", services: ["it-support"] },
    ],
  },
  {
    title: "AI",
    tools: [
      { name: "Claude", icon: siClaude, services: ["ai-automation"] },
      { name: "OpenAI", services: ["ai-automation"] },
      { name: "Google Gemini", icon: siGooglegemini, services: ["ai-automation"] },
    ],
  },
  {
    title: "Brand & design",
    tools: [
      { name: "Figma", icon: siFigma, services: ["branding-design", "web-development"] },
      { name: "Adobe Creative Cloud", services: ["branding-design"] },
      { name: "Canva", services: ["branding-design", "digital-marketing"] },
    ],
  },
]

/** Every tool once, in group order. */
export const tools = toolGroups
  .flatMap((group) => group.tools)
  .filter((tool, i, all) => all.findIndex((t) => t.icon === tool.icon && t.name === tool.name) === i)

export function toolsForService(slug: string) {
  return tools.filter((tool) => tool.services.includes(slug))
}
