import { render, screen } from '@testing-library/react'
import { ContactSection, IndustryCard, SectionHeading, ServiceCard } from '../sections'
import { MapleLeaf } from '../MapleLeaf'
import { industries } from '@/lib/industries'
import { services } from '@/lib/services'

describe('shared sections', () => {
  it('renders a section heading with eyebrow and intro', () => {
    render(<SectionHeading eyebrow="Services" title="Everything" intro="One team" align="center" />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Everything')
    expect(screen.getByText('Services')).toBeInTheDocument()
    expect(screen.getByText('One team')).toBeInTheDocument()
  })

  it('links a service card to its stop', () => {
    render(<ServiceCard service={services[3]} index={3} />)
    expect(screen.getByRole('link')).toHaveAttribute('href', `/services/${services[3].slug}/`)
    expect(screen.getByText('Stop 04')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(services[3].name)
  })

  it('links an industry card to its page', () => {
    const automotive = industries.find((i) => i.slug === 'automotive')!
    render(<IndustryCard industry={automotive} />)
    expect(screen.getByRole('link')).toHaveAttribute('href', '/industries/automotive/')
  })

  it('renders the contact form with required fields', () => {
    render(<ContactSection title="Ready?" />)
    expect(screen.getByRole('heading', { name: 'Ready?' })).toBeInTheDocument()
    expect(screen.getByLabelText('Full name')).toBeRequired()
    expect(screen.getByLabelText('Email')).toHaveAttribute('type', 'email')
    expect(screen.getByLabelText('What do you need?')).toBeRequired()
    expect(screen.getByRole('button', { name: /book my consultation/i })).toHaveAttribute('type', 'submit')
  })

  it('draws the pixel maple leaf', () => {
    const { container } = render(<MapleLeaf />)
    expect(container.querySelectorAll('rect').length).toBeGreaterThan(40)
  })
})
