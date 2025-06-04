"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Check,
  Code,
  ArrowRight,
  Menu,
  Facebook,
  Twitter,
  Linkedin,
  Github,
  Cpu,
  Globe,
  Zap,
  Rocket,
  Calendar,
  Phone,
  Mail,
  Settings,
  Store,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

// Custom hook for intersection observer
function useIntersectionObserver(options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
        ...options,
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  return [ref, isIntersecting]
}

// Fade in component
function FadeInSection({ children, className = "", delay = 0 }) {
  const [ref, isIntersecting] = useIntersectionObserver()

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-950/95 backdrop-blur supports-[backdrop-filter]:bg-gray-950/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-lg">
              <Code className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">FrontEndonFront</span>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#services" className="text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors">
              Services
            </Link>
            <Link href="#clients" className="text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors">
              Our Clients
            </Link>
            <Link href="#process" className="text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors">
              Process
            </Link>
            <Link href="#contact" className="text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors">
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white hidden md:inline-flex"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Get Free Consultation
            </Button>
            <Button variant="ghost" size="sm" className="md:hidden text-gray-300 hover:bg-gray-800">
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section - Optimized for Conversion */}
        <FadeInSection>
          <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-gray-950 to-gray-900">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col justify-center items-center space-y-8 text-center max-w-4xl mx-auto">
                {/* Logo */}
                <div className="flex flex-col items-center space-y-3">
                  <div className="flex items-center justify-center w-20 h-20 bg-blue-600 rounded-2xl shadow-lg shadow-blue-600/30">
                    <Code className="h-10 w-10 text-white" />
                  </div>
                  <span className="text-3xl font-bold text-white tracking-tight">FrontEndonFront</span>
                </div>

                <div className="space-y-2">
                  <Badge variant="secondary" className="w-fit bg-blue-600/20 text-blue-400 border-blue-600/30">
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
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button
                    size="lg"
                    className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    Get Free Consultation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Check className="h-4 w-4 text-green-400" />
                    <span>Free consultation</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Check className="h-4 w-4 text-green-400" />
                    <span>5+ years experience</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Check className="h-4 w-4 text-green-400" />
                    <span>North America wide</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Check className="h-4 w-4 text-green-400" />
                    <span>Rapid delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </FadeInSection>

        {/* Trusted By Section */}
        <FadeInSection>
          <section id="clients" className="w-full py-12 md:py-16 bg-gray-950 border-y border-gray-800">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
                <div className="space-y-2">
                  <Badge variant="secondary" className="bg-blue-600/20 text-blue-400 border-blue-600/30">
                    Trusted By Industry Leaders
                  </Badge>
                  <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl text-white">
                    Powering Digital Transformation for Leading Organizations
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                {/* Artistic Skylights */}
                <FadeInSection delay={100}>
                  <div className="flex flex-col items-center space-y-4 p-6 bg-gray-900 rounded-xl border border-gray-800 hover:border-blue-600/50 transition-all h-full min-h-[400px]">
                    <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center p-4">
                      <Image
                        src="https://artisticskylight.com/app/uploads/2019/08/Artistic-logo-color-341x97-c-default.png"
                        width="120"
                        height="34"
                        alt="Artistic Skylights Logo"
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-white">Artistic Skylights</h3>
                    <p className="text-gray-400 text-center flex-1">
                      Revamped the quotation management system by integrating real-time AI-powered pricing tools,
                      streamlining operations and significantly accelerating client response times.
                    </p>
                  </div>
                </FadeInSection>

                {/* MEC */}
                <FadeInSection delay={200}>
                  <div className="flex flex-col items-center space-y-4 p-6 bg-gray-900 rounded-xl border border-gray-800 hover:border-blue-600/50 transition-all h-full min-h-[400px]">
                    <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center p-4">
                      <Image
                        src="https://www.mec.ca/images/mec-logo.svg"
                        width="120"
                        height="40"
                        alt="MEC Logo"
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-white">MEC</h3>
                    <p className="text-gray-400 text-center flex-1">
                      Played a key role in a nationwide rebranding initiative, helping redefine the company's visual
                      identity and customer experience across all touchpoints.
                    </p>
                  </div>
                </FadeInSection>

                {/* NYU */}
                <FadeInSection delay={300}>
                  <div className="flex flex-col items-center space-y-4 p-6 bg-gray-900 rounded-xl border border-gray-800 hover:border-blue-600/50 transition-all h-full min-h-[400px]">
                    <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center p-4">
                      <Image
                        src="https://static.wixstatic.com/media/67836e_d1b5a8a08fa843be9d65c1f63dec0465~mv2.png/v1/crop/x_0,y_0,w_303,h_79/fill/w_345,h_89,al_c,lg_1,q_85,enc_avif,quality_auto/Logo.png"
                        width="120"
                        height="32"
                        alt="NYU Pagano Lab Logo"
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-white">NYU (Pagano Lab)</h3>
                    <p className="text-gray-400 text-center flex-1">
                      Led a comprehensive rebranding and digital transformation of the Pagano Lab, delivering a
                      full-stack web application and a complete site redesign to enhance research visibility and user
                      engagement.
                    </p>
                  </div>
                </FadeInSection>
              </div>

              <FadeInSection delay={400}>
                <div className="mt-12 text-center">
                  <p className="text-gray-400 max-w-2xl mx-auto">
                    The new AI-powered quotation application has completely transformed how we operate day-to-day. What
                    used to take hours can now be done in minutes, with far greater accuracy and consistency. It's
                    streamlined our workflow, improved customer satisfaction, and given us a real competitive edge.
                  </p>
                  <p className="text-white font-medium mt-4">— Dino Ferrazano, General Manager, Artistic Skylights</p>
                </div>
              </FadeInSection>
            </div>
          </section>
        </FadeInSection>

        {/* Services Section */}
        <FadeInSection>
          <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-gray-900">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <Badge variant="secondary" className="bg-blue-600/20 text-blue-400 border-blue-600/30">
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
                <FadeInSection delay={100}>
                  <Card className="bg-gray-950 border-gray-800 p-6 hover:border-blue-600/50 transition-all h-full flex flex-col">
                    <CardContent className="space-y-4 flex-1 flex flex-col">
                      <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg mx-auto">
                        <Globe className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white text-center">Full-Stack Web Applications</h3>
                      <p className="text-gray-400 text-center flex-1">
                        Custom web applications built with modern frameworks like React, Next.js, and Node.js. Scalable,
                        secure, and optimized for performance.
                      </p>
                    </CardContent>
                  </Card>
                </FadeInSection>

                <FadeInSection delay={200}>
                  <Card className="bg-gray-950 border-gray-800 p-6 hover:border-blue-600/50 transition-all h-full flex flex-col">
                    <CardContent className="space-y-4 flex-1 flex flex-col">
                      <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg mx-auto">
                        <Cpu className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white text-center">AI Consulting & Integration</h3>
                      <p className="text-gray-400 text-center flex-1">
                        Superpower your workflows with AI. From automation to intelligent data processing, we help you
                        leverage AI to stay competitive.
                      </p>
                    </CardContent>
                  </Card>
                </FadeInSection>

                <FadeInSection delay={300}>
                  <Card className="bg-gray-950 border-gray-800 p-6 hover:border-blue-600/50 transition-all h-full flex flex-col">
                    <CardContent className="space-y-4 flex-1 flex flex-col">
                      <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg mx-auto">
                        <Rocket className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white text-center">Software Modernization</h3>
                      <p className="text-gray-400 text-center flex-1">
                        Behind on your roadmap? We help companies catch up with modern development practices, legacy
                        system upgrades, and technical debt reduction.
                      </p>
                    </CardContent>
                  </Card>
                </FadeInSection>

                <FadeInSection delay={400}>
                  <Card className="bg-gray-950 border-gray-800 p-6 hover:border-blue-600/50 transition-all h-full flex flex-col">
                    <CardContent className="space-y-4 flex-1 flex flex-col">
                      <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg mx-auto">
                        <Zap className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white text-center">Rapid Development</h3>
                      <p className="text-gray-400 text-center flex-1">
                        From landing pages to complex applications, we deliver high-quality solutions quickly without
                        compromising on quality or security.
                      </p>
                    </CardContent>
                  </Card>
                </FadeInSection>

                <FadeInSection delay={500}>
                  <Card className="bg-gray-950 border-gray-800 p-6 hover:border-blue-600/50 transition-all h-full flex flex-col">
                    <CardContent className="space-y-4 flex-1 flex flex-col">
                      <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg mx-auto">
                        <Settings className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white text-center">
                        Full Service Deployment & Maintenance
                      </h3>
                      <p className="text-gray-400 text-center flex-1">
                        Complete deployment solutions with ongoing maintenance and support. We ensure your applications
                        run smoothly with 24/7 monitoring and regular updates.
                      </p>
                    </CardContent>
                  </Card>
                </FadeInSection>

                <FadeInSection delay={600}>
                  <Card className="bg-gray-950 border-gray-800 p-6 hover:border-blue-600/50 transition-all h-full flex flex-col">
                    <CardContent className="space-y-4 flex-1 flex flex-col">
                      <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg mx-auto">
                        <Store className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white text-center">Small Business Solutions</h3>
                      <p className="text-gray-400 text-center flex-1">
                        Affordable, SEO-optimized websites and e-commerce solutions specifically for small businesses.
                        From landing pages to Shopify stores, we help you establish a professional online presence.
                      </p>
                    </CardContent>
                  </Card>
                </FadeInSection>
              </div>

              <FadeInSection delay={700}>
                <div className="flex justify-center mt-8">
                  <Button
                    size="lg"
                    className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
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
          <section id="process" className="w-full py-12 md:py-24 lg:py-32 bg-gray-950 relative overflow-hidden">
            {/* Grid Background */}
            <div className="absolute inset-0 opacity-15">
              <div
                className="absolute inset-0 animate-pulse"
                style={{
                  backgroundImage: `
        linear-gradient(rgba(59, 130, 246, 0.15) 1px, transparent 1px),
        linear-gradient(90deg, rgba(59, 130, 246, 0.15) 1px, transparent 1px)
      `,
                  backgroundSize: "40px 40px",
                  animation: "grid-move 20s linear infinite",
                }}
              ></div>
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `
        linear-gradient(rgba(59, 130, 246, 0.08) 1px, transparent 1px),
        linear-gradient(90deg, rgba(59, 130, 246, 0.08) 1px, transparent 1px)
      `,
                  backgroundSize: "80px 80px",
                }}
              ></div>
            </div>

            <style jsx>{`
              @keyframes grid-move {
                0% {
                  transform: translate(0, 0);
                }
                100% {
                  transform: translate(40px, 40px);
                }
              }
            `}</style>

            <div className="container px-4 md:px-6 relative z-10">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <Badge variant="secondary" className="bg-blue-600/20 text-blue-400 border-blue-600/30">
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

              <div className="grid md:grid-cols-4 gap-8 mt-12">
                <FadeInSection delay={100}>
                  <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-800 relative overflow-hidden group hover:bg-gray-900/90 transition-all duration-300">
                    <div className="absolute top-0 left-0 w-full h-1 bg-blue-600"></div>
                    <CardContent className="pt-8">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4 text-white font-bold">
                        1
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">Discovery</h3>
                      <p className="text-gray-400">
                        We learn about your business, goals, and challenges to define the project scope and
                        requirements.
                      </p>
                    </CardContent>
                  </Card>
                </FadeInSection>

                <FadeInSection delay={200}>
                  <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-800 relative overflow-hidden group hover:bg-gray-900/90 transition-all duration-300">
                    <div className="absolute top-0 left-0 w-full h-1 bg-blue-600"></div>
                    <CardContent className="pt-8">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4 text-white font-bold">
                        2
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">Planning</h3>
                      <p className="text-gray-400">
                        We create a detailed roadmap with timelines, milestones, and deliverables for your project.
                      </p>
                    </CardContent>
                  </Card>
                </FadeInSection>

                <FadeInSection delay={300}>
                  <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-800 relative overflow-hidden group hover:bg-gray-900/90 transition-all duration-300">
                    <div className="absolute top-0 left-0 w-full h-1 bg-blue-600"></div>
                    <CardContent className="pt-8">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4 text-white font-bold">
                        3
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">Development</h3>
                      <p className="text-gray-400">
                        Our expert team builds your solution with regular updates and transparent communication.
                      </p>
                    </CardContent>
                  </Card>
                </FadeInSection>

                <FadeInSection delay={400}>
                  <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-800 relative overflow-hidden group hover:bg-gray-900/90 transition-all duration-300">
                    <div className="absolute top-0 left-0 w-full h-1 bg-blue-600"></div>
                    <CardContent className="pt-8">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4 text-white font-bold">
                        4
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">Launch & Support</h3>
                      <p className="text-gray-400">
                        We ensure a smooth deployment and provide ongoing support to help your business thrive.
                      </p>
                    </CardContent>
                  </Card>
                </FadeInSection>
              </div>
            </div>
          </section>
        </FadeInSection>

        {/* Final CTA Section */}
        <FadeInSection>
          <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-gray-900 to-gray-950">
            <div className="container px-4 md:px-6">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <FadeInSection delay={100}>
                  <div className="space-y-6">
                    <Badge variant="secondary" className="bg-blue-600/20 text-blue-400 border-blue-600/30">
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
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-10 h-10 bg-blue-600/20 rounded-full">
                          <Check className="h-5 w-5 text-blue-400" />
                        </div>
                        <p className="text-gray-300">No commitment required</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-10 h-10 bg-blue-600/20 rounded-full">
                          <Check className="h-5 w-5 text-blue-400" />
                        </div>
                        <p className="text-gray-300">Transparent pricing and timelines</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-10 h-10 bg-blue-600/20 rounded-full">
                          <Check className="h-5 w-5 text-blue-400" />
                        </div>
                        <p className="text-gray-300">Tailored solutions for your specific needs</p>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-3">
                      <div className="flex items-center space-x-3">
                        <Phone className="h-5 w-5 text-blue-400" />
                        <Link href="tel:+1-647-382-3188" className="text-white hover:text-blue-400">
                          +1 647-382-3188
                        </Link>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-blue-400" />
                        <Link href="mailto:hello@frontendonfront.com" className="text-white hover:text-blue-400">
                          hello@frontendonfront.com
                        </Link>
                      </div>
                    </div>
                  </div>
                </FadeInSection>

                <FadeInSection delay={200}>
                  <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
                    <h3 className="text-xl font-bold text-white mb-6">Schedule Your Free Consultation</h3>
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium text-gray-300">
                            Full Name
                          </label>
                          <input
                            id="name"
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                            placeholder="John Smith"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="company" className="text-sm font-medium text-gray-300">
                            Company
                          </label>
                          <input
                            id="company"
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                            placeholder="Your Company"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium text-gray-300">
                            Email
                          </label>
                          <input
                            id="email"
                            type="email"
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                            placeholder="john@example.com"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="phone" className="text-sm font-medium text-gray-300">
                            Phone
                          </label>
                          <input
                            id="phone"
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                            placeholder="(123) 456-7890"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="service" className="text-sm font-medium text-gray-300">
                          Service Interested In
                        </label>
                        <select
                          id="service"
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                        >
                          <option>Full-Stack Web Application</option>
                          <option>AI Consulting & Integration</option>
                          <option>Software Modernization</option>
                          <option>Rapid Development</option>
                          <option>Small Business Solutions</option>
                          <option>Deployment & Maintenance</option>
                          <option>Other</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium text-gray-300">
                          Project Details
                        </label>
                        <textarea
                          id="message"
                          rows={4}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                          placeholder="Tell us about your project..."
                        ></textarea>
                      </div>

                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="consent"
                          className="w-4 h-4 border-gray-700 rounded text-blue-600 focus:ring-blue-600"
                        />
                        <label htmlFor="consent" className="text-sm text-gray-300">
                          I agree to be contacted about my inquiry
                        </label>
                      </div>

                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12">
                        Schedule Consultation
                        <Calendar className="ml-2 h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                </FadeInSection>
              </div>
            </div>
          </section>
        </FadeInSection>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 bg-gray-900 border-t border-gray-800">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-lg">
                  <Code className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">FrontEndonFront</span>
              </div>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-400 hover:text-blue-400">
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-blue-400">
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-blue-400">
                  <Linkedin className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-blue-400">
                  <Github className="h-5 w-5" />
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-white">Address</h4>
              <p className="text-sm text-gray-400">
                9850 King George Blvd
                <br />
                Unit 300 - 3rd Floor - FrontEndonFront
                <br />
                Surrey, BC V3T 0P9
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-white">Service Area</h4>
              <p className="text-sm text-gray-400">Serving North America</p>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-white">Contact</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <Link href="mailto:hello@frontendonfront.com" className="block hover:text-blue-400">
                  hello@frontendonfront.com
                </Link>
                <Link href="tel:+1-647-382-3188" className="block hover:text-blue-400">
                  +1 647-382-3188
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
              <p className="text-xs text-gray-400">
                © {new Date().getFullYear()} FrontEndonFront. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
