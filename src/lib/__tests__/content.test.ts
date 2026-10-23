import { industries } from '../industries'
import { getService, getServiceIndex, services, stopNumber } from '../services'
import { toolGroups, toolsForService } from '../tools'

describe('services content', () => {
  it('has a unique slug for every stop on the loop', () => {
    const slugs = services.map((s) => s.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('covers the full-service offering', () => {
    expect(services.map((s) => s.slug)).toEqual(
      expect.arrayContaining(['seo', 'digital-marketing', 'ecommerce', 'web-development', 'crm-custom-software', 'branding-design', 'it-support'])
    )
  })

  it('gives every service the copy its page needs', () => {
    services.forEach((service) => {
      expect(service.deliverables.length).toBeGreaterThanOrEqual(3)
      expect(service.approach).toHaveLength(4)
      expect(service.faqs.length).toBeGreaterThan(0)
      expect(service.world.ground).toMatch(/^#[0-9a-f]{6}$/i)
    })
  })

  it('looks services up by slug', () => {
    expect(getService('seo')?.name).toBe('Search Engine Optimization')
    expect(getServiceIndex('missing')).toBe(-1)
    expect(stopNumber(3)).toBe('04')
  })
})

describe('industries content', () => {
  it('includes construction, retail, real estate and automotive', () => {
    expect(industries.map((i) => i.slug)).toEqual(['construction', 'retail', 'real-estate', 'automotive'])
  })

  it('only recommends services that exist', () => {
    industries.forEach((industry) => {
      industry.services.forEach((slug) => expect(getService(slug)).toBeDefined())
    })
  })
})

describe('tools content', () => {
  it('only tags tools with services that exist', () => {
    toolGroups.forEach((group) => {
      group.tools.forEach((tool) => {
        expect(tool.services.length).toBeGreaterThan(0)
        tool.services.forEach((slug) => expect(getService(slug)).toBeDefined())
      })
    })
  })

  it('lists tools for every service', () => {
    services.forEach((service) => expect(toolsForService(service.slug).length).toBeGreaterThan(0))
  })
})
