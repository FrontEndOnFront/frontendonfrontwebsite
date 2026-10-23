import type { Metadata } from "next"
import { ContactSection } from "@/components/common/sections"

export const metadata: Metadata = {
  title: "Contact Us: Book a Free Consultation",
  description:
    "Book a free consultation with FrontEndonFront for SEO, Google Ads, marketing, e-commerce, web development or custom software. Serving BC, Toronto and all of Canada.",
  alternates: { canonical: "/contact/" },
}

export default function ContactPage() {
  return (
    <>
      <h1 className="sr-only">Contact FrontEndonFront</h1>
      <ContactSection title="Tell us where you want to go. We will map the route." />
    </>
  )
}
