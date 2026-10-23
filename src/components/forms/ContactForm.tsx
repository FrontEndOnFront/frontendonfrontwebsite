import { CalendarCheck } from "lucide-react"
import { industries } from "@/lib/industries"
import { services } from "@/lib/services"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

const field =
  "w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
const label = "mb-1.5 block text-sm font-medium text-gray-300"

export function ContactForm({ className }: { className?: string }) {
  return (
    <form
      action={site.formAction}
      method="POST"
      className={cn(
        "rounded-xl border border-gray-800 bg-gray-900 p-6 text-white shadow-lg sm:p-8",
        className
      )}
    >
      <h3 className="text-xl font-bold">Book your free consultation</h3>
      <p className="mt-1 text-sm text-muted">We reply within one business day.</p>
      <input type="hidden" name="_subject" value="New website enquiry" />

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>
            Full name
          </label>
          <input id="name" name="name" required autoComplete="name" className={field} placeholder="Jordan Lee" />
        </div>
        <div>
          <label htmlFor="company" className={label}>
            Company
          </label>
          <input id="company" name="company" autoComplete="organization" className={field} placeholder="Your company" />
        </div>
        <div>
          <label htmlFor="email" className={label}>
            Email
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" className={field} placeholder="you@company.ca" />
        </div>
        <div>
          <label htmlFor="phone" className={label}>
            Phone
          </label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" className={field} placeholder="(604) 555-0123" />
        </div>
        <div>
          <label htmlFor="service" className={label}>
            What do you need?
          </label>
          <select id="service" name="service" required className={field} defaultValue="">
            <option value="" disabled>
              Choose a service
            </option>
            {services.map((service) => (
              <option key={service.slug}>{service.name}</option>
            ))}
            <option>Full-service: a bit of everything</option>
            <option>Not sure yet</option>
          </select>
        </div>
        <div>
          <label htmlFor="industry" className={label}>
            Industry
          </label>
          <select id="industry" name="industry" className={field} defaultValue="">
            <option value="">Choose an industry</option>
            {industries.map((industry) => (
              <option key={industry.slug}>{industry.name}</option>
            ))}
            <option>Other</option>
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="message" className={label}>
          Project details
        </label>
        <textarea id="message" name="message" rows={4} required className={field} placeholder="Tell us about your goals, timeline and budget…" />
      </div>

      <label className="mt-4 flex items-start gap-2.5 text-sm text-ink-soft">
        <input type="checkbox" name="consent" required className="mt-0.5 h-4 w-4 accent-blue-600" />
        I agree to be contacted about my enquiry.
      </label>

      <button type="submit" className="btn btn-primary mt-6 w-full">
        Book my consultation
        <CalendarCheck className="h-4 w-4" />
      </button>
    </form>
  )
}
