import { render, screen } from '@testing-library/react'
import { Globe } from 'lucide-react'
import { ServiceCard } from '../ServiceCard'

describe('ServiceCard Component', () => {
  const mockProps = {
    icon: Globe,
    title: 'Full-Stack Web Applications',
    description: 'Custom web applications built with modern frameworks like React, Next.js, and Node.js. Scalable, secure, and optimized for performance.',
  }

  it('renders the service card with all props', () => {
    render(<ServiceCard {...mockProps} />)
    
    expect(screen.getByText(mockProps.title)).toBeInTheDocument()
    expect(screen.getByText(mockProps.description)).toBeInTheDocument()
  })

  it('renders the icon correctly', () => {
    render(<ServiceCard {...mockProps} />)
    
    // Check that the icon container is present
    const iconContainer = screen.getByRole('presentation').closest('.bg-blue-600')
    expect(iconContainer).toBeInTheDocument()
  })

  it('applies custom className when provided', () => {
    const customClass = 'custom-test-class'
    const { container } = render(<ServiceCard {...mockProps} className={customClass} />)
    
    expect(container.firstChild).toHaveClass(customClass)
  })

  it('has proper semantic structure', () => {
    render(<ServiceCard {...mockProps} />)
    
    // Check for heading
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(mockProps.title)
    
    // Check that description is in a paragraph
    const description = screen.getByText(mockProps.description)
    expect(description.tagName.toLowerCase()).toBe('p')
  })

  it('has proper CSS classes for styling', () => {
    const { container } = render(<ServiceCard {...mockProps} />)
    
    const card = container.firstChild as HTMLElement
    expect(card).toHaveClass('rounded-xl', 'border', 'bg-card')
    
    // Check for flex layout classes
    expect(card).toHaveClass('h-full', 'flex', 'flex-col')
  })

  it('centers the title and description text', () => {
    render(<ServiceCard {...mockProps} />)
    
    const title = screen.getByRole('heading', { level: 3 })
    const description = screen.getByText(mockProps.description)
    
    expect(title).toHaveClass('text-center')
    expect(description).toHaveClass('text-center')
  })
}) 