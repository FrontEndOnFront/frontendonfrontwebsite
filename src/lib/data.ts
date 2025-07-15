import { 
  Globe, 
  Cpu, 
  Rocket, 
  Zap, 
  Settings, 
  Store 
} from "lucide-react"

export const services = [
  {
    id: "full-stack",
    icon: Globe,
    title: "Full-Stack Web Applications",
    description: "Custom web applications built with modern frameworks like React, Next.js, and Node.js. Scalable, secure, and optimized for performance."
  },
  {
    id: "ai-consulting",
    icon: Cpu,
    title: "AI Consulting & Integration",
    description: "Superpower your workflows with AI. From automation to intelligent data processing, we help you leverage AI to stay competitive."
  },
  {
    id: "modernization",
    icon: Rocket,
    title: "Software Modernization",
    description: "Behind on your roadmap? We help companies catch up with modern development practices, legacy system upgrades, and technical debt reduction."
  },
  {
    id: "rapid-development",
    icon: Zap,
    title: "Rapid Development",
    description: "From landing pages to complex applications, we deliver high-quality solutions quickly without compromising on quality or security."
  },
  {
    id: "deployment-maintenance",
    icon: Settings,
    title: "Full Service Deployment & Maintenance",
    description: "Complete deployment solutions with ongoing maintenance and support. We ensure your applications run smoothly with 24/7 monitoring and regular updates."
  },
  {
    id: "small-business",
    icon: Store,
    title: "Small Business Solutions",
    description: "Affordable, SEO-optimized websites and e-commerce solutions specifically for small businesses. From landing pages to Shopify stores, we help you establish a professional online presence."
  }
]

export const processSteps = [
  {
    step: 1,
    title: "Discovery",
    description: "We learn about your business, goals, and challenges to define the project scope and requirements."
  },
  {
    step: 2,
    title: "Planning",
    description: "We create a detailed roadmap with timelines, milestones, and deliverables for your project."
  },
  {
    step: 3,
    title: "Development",
    description: "Our expert team builds your solution with regular updates and transparent communication."
  },
  {
    step: 4,
    title: "Launch & Support",
    description: "We ensure a smooth deployment and provide ongoing support to help your business thrive."
  }
]

export const clients = [
  {
    id: "artistic-skylights",
    name: "Artistic Skylights",
    description: "Revamped the quotation management system by integrating real-time AI-powered pricing tools, streamlining operations and significantly accelerating client response times.",
    logoSrc: "https://artisticskylight.com/app/uploads/2019/08/Artistic-logo-color-341x97-c-default.png",
    logoAlt: "Artistic Skylights Logo",
    logoWidth: 120,
    logoHeight: 34
  },
  {
    id: "mec",
    name: "MEC",
    description: "Played a key role in a nationwide rebranding initiative, helping redefine the company's visual identity and customer experience across all touchpoints.",
    logoSrc: "https://www.mec.ca/images/mec-logo.svg",
    logoAlt: "MEC Logo",
    logoWidth: 120,
    logoHeight: 40
  },
  {
    id: "nyu",
    name: "NYU (Pagano Lab)",
    description: "Led a comprehensive rebranding and digital transformation of the Pagano Lab, delivering a full-stack web application and a complete site redesign to enhance research visibility and user engagement.",
    logoSrc: "https://static.wixstatic.com/media/67836e_d1b5a8a08fa843be9d65c1f63dec0465~mv2.png/v1/crop/x_0,y_0,w_303,h_79/fill/w_345,h_89,al_c,lg_1,q_85,enc_avif,quality_auto/Logo.png",
    logoAlt: "NYU Pagano Lab Logo",
    logoWidth: 120,
    logoHeight: 32
  }
]

export const testimonial = {
  quote: "The new AI-powered quotation application has completely transformed how we operate day-to-day. What used to take hours can now be done in minutes, with far greater accuracy and consistency. It's streamlined our workflow, improved customer satisfaction, and given us a real competitive edge.",
  author: "Dino Ferrazano",
  title: "General Manager",
  company: "Artistic Skylights"
}

export const heroFeatures = [
  { text: "Free consultation", icon: "check" },
  { text: "5+ years experience", icon: "check" },
  { text: "North America wide", icon: "check" },
  { text: "Rapid delivery", icon: "check" }
]

export const ctaBenefits = [
  "No commitment required",
  "Transparent pricing and timelines",
  "Tailored solutions for your specific needs"
] 