"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  buttonVariants, 
  badgeVariants, 
  sectionSpacing, 
  containerClasses, 
  gradientBackgrounds,
  iconContainerVariants 
} from "@/lib/design-system"
import { 
  services, 
  processSteps, 
  clients, 
  testimonial, 
  heroFeatures, 
  ctaBenefits 
} from "@/lib/data"
import {
  Check,
  Code,
  ArrowRight,
  Phone,
  Mail,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

// Components
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { FadeInSection } from "@/components/common/FadeInSection"
import { ServiceCard } from "@/components/cards/ServiceCard"
import { ProcessCard } from "@/components/cards/ProcessCard"
import { ClientCard } from "@/components/cards/ClientCard"
import { ContactFormWrapper } from "@/components/forms/ContactFormWrapper"

export default function LandingPage() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-white relative">
      {/* Global Grid Background */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
        <div
          className="absolute inset-0 animate-pulse"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: "120px 120px",
            animation: "grid-move 30s linear infinite",
          }}
        />
      </div>



      <Header />

      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <FadeInSection>
          <section className={cn(sectionSpacing.yLarge, "relative overflow-hidden")}>
            {/* Enhanced Hero Background with Multiple Gradients */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-950/10 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-radial from-blue-900/20 via-transparent to-transparent"></div>
            
            {/* Hero Grid Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
                  `,
                  backgroundSize: "40px 40px",
                }}
              />
            </div>

            <div className={cn(containerClasses, "relative z-10")}>
              <div className="flex flex-col justify-center items-center space-y-8 text-center max-w-4xl mx-auto">
                {/* Logo */}
                <div className="flex flex-col items-center space-y-3">
                  <div className={cn(
                    iconContainerVariants({ variant: "primary", size: "2xl" }),
                    "shadow-lg shadow-blue-600/30 rounded-2xl"
                  )}>
                    <Code className="h-10 w-10" />
                  </div>
                  <span className="text-3xl font-bold text-white tracking-tight">FrontEndonFront</span>
                </div>

                <div className="space-y-2">
                  <Badge className={badgeVariants({ variant: "brand" })}>
                    🚀 Delivering High-Quality, Business-Driven Results Since 2019
                  </Badge>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-white">
                    Transform Your Business With Custom Software Solutions
                  </h1>
                  <p className="max-w-[600px] text-gray-400 md:text-xl mx-auto text-center">
                    From full-stack applications to AI integration, we deliver cutting-edge solutions that drive real
                    business results. Based in The Greater Vancouver Area, serving clients across North America.
                  </p>
                </div>

                <div className="w-full flex justify-center">
                  <Button
                    className={cn(buttonVariants({ variant: "cta", size: "lg" }), "w-full sm:w-auto max-w-md")}
                    onClick={scrollToContact}
                  >
                    Get Free Consultation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 lg:flex lg:flex-wrap lg:justify-center gap-4 text-sm text-gray-400 max-w-2xl mx-auto">
                  {heroFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-1 justify-center lg:justify-start">
                      <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                      <span className="whitespace-nowrap">{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </FadeInSection>

        {/* Clients Section */}
        <FadeInSection>
          <section id="clients" className={cn(sectionSpacing.y, gradientBackgrounds.dark, "border-y border-gray-800")}>
            <div className={containerClasses}>
              <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
                <div className="space-y-2">
                  <Badge className={badgeVariants({ variant: "brand" })}>
                    Trusted By Industry Leaders
                  </Badge>
                  <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl text-white">
                    Powering Digital Transformation for Leading Organizations
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                {clients.map((client, index) => (
                  <FadeInSection key={client.id} delay={index === 0 ? "sm" : index === 1 ? "md" : "lg"}>
                    <ClientCard {...client} />
                  </FadeInSection>
                ))}
              </div>

              <FadeInSection delay="xl">
                <div className="mt-12 text-center">
                  <p className="text-gray-400 max-w-2xl mx-auto">
                    {testimonial.quote}
                  </p>
                  <p className="text-white font-medium mt-4">
                    — {testimonial.author}, {testimonial.title}, {testimonial.company}
                  </p>
                </div>
              </FadeInSection>
            </div>
          </section>
        </FadeInSection>

        {/* Services Section */}
        <FadeInSection>
          <section id="services" className={cn(sectionSpacing.y, gradientBackgrounds.darker)}>
            <div className={containerClasses}>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <Badge className={badgeVariants({ variant: "brand" })}>
                    Our Services
                  </Badge>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
                    Solutions Tailored to Your Business Needs
                  </h2>
                  <p className="max-w-[900px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Our comprehensive suite of software consulting services helps you build, modernize, and scale your
                    digital presence with cutting-edge technology.
                  </p>
                </div>
              </div>

              <div className="mx-auto grid max-w-6xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
                {services.map((service, index) => (
                  <FadeInSection 
                    key={service.id} 
                    delay={index === 0 ? "sm" : index === 1 ? "md" : index === 2 ? "lg" : index === 3 ? "xl" : index === 4 ? "2xl" : "3xl"}
                  >
                    <ServiceCard {...service} />
                  </FadeInSection>
                ))}
              </div>

              <FadeInSection delay="4xl">
                <div className="flex justify-center mt-8">
                  <Button
                    className={cn(buttonVariants({ variant: "cta", size: "lg" }), "w-full sm:w-auto max-w-sm sm:max-w-none")}
                    onClick={scrollToContact}
                  >
                    Discuss Your Project
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </FadeInSection>
            </div>
          </section>
        </FadeInSection>

        {/* Process Section */}
        <FadeInSection>
          <section id="process" className={cn(sectionSpacing.y, gradientBackgrounds.dark, "relative overflow-hidden")}>
            {/* Animated Grid Background */}
            <div className="absolute inset-0 opacity-15">
              <div
                className="absolute inset-0 animate-pulse"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(59, 130, 246, 0.15) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(59, 130, 246, 0.15) 1px, transparent 1px)
                  `,
                  backgroundSize: "40px 40px",
                  animation: "grid-move-small 20s linear infinite",
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(59, 130, 246, 0.08) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(59, 130, 246, 0.08) 1px, transparent 1px)
                  `,
                  backgroundSize: "80px 80px",
                }}
              />
            </div>



            <div className={cn(containerClasses, "relative z-10")}>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <Badge className={badgeVariants({ variant: "brand" })}>
                    Our Process
                  </Badge>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
                    How We Bring Your Vision to Life
                  </h2>
                  <p className="max-w-[900px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Our proven development process ensures transparency, quality, and on-time delivery for every
                    project.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
                {processSteps.map((step, index) => (
                  <FadeInSection 
                    key={step.step} 
                    delay={index === 0 ? "sm" : index === 1 ? "md" : index === 2 ? "lg" : "xl"}
                  >
                    <ProcessCard {...step} />
                  </FadeInSection>
                ))}
              </div>
            </div>
          </section>
        </FadeInSection>

        {/* Contact Section */}
        <FadeInSection>
          <section id="contact" className={cn(sectionSpacing.y, gradientBackgrounds.cta)}>
            <div className={containerClasses}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <FadeInSection delay="sm">
                  <div className="space-y-6">
                    <Badge className={badgeVariants({ variant: "brand" })}>
                      Let's Work Together
                    </Badge>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
                      Ready to Transform Your Business?
                    </h2>
                    <p className="text-gray-400 md:text-xl">
                      Schedule a free consultation with our experts to discuss your project needs and discover how we
                      can help you achieve your goals.
                    </p>

                    <div className="space-y-4">
                      {ctaBenefits.map((benefit, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className={iconContainerVariants({ variant: "secondary", size: "md" })}>
                            <Check className="h-5 w-5" />
                          </div>
                          <p className="text-gray-300">{benefit}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col space-y-3">
                      <div className="flex items-center space-x-3">
                        <Phone className="h-5 w-5 text-blue-400" />
                        <Link href="tel:+1-647-382-3188" className="text-white hover:text-blue-400 transition-colors">
                          +1 647-382-3188
                        </Link>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-blue-400" />
                        <Link href="mailto:hello@frontendonfront.com" className="text-white hover:text-blue-400 transition-colors">
                          hello@frontendonfront.com
                        </Link>
                      </div>
                    </div>
                  </div>
                </FadeInSection>

                <FadeInSection delay="md">
                  <ContactFormWrapper />
                </FadeInSection>
              </div>
            </div>
          </section>
        </FadeInSection>
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  )
}
