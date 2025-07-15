import { render, screen } from '@testing-library/react'
import { ServiceCard } from '../ServiceCard'
import React from 'react'

// Create a proper mock icon that matches the LucideIcon type
const MockIcon = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>((props, ref) => (
  <svg {...props} ref={ref} data-testid="mock-icon" role="presentation" />
))
MockIcon.displayName = 'MockIcon'

describe('ServiceCard Component', () => {
  const mockProps = {
    icon: MockIcon as any, // Type assertion to match LucideIcon
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
    
    // Check that the mock icon is present
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument()
    expect(screen.getByRole('presentation')).toBeInTheDocument()
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
    
    // Check for description text
    expect(screen.getByText(mockProps.description)).toBeInTheDocument()
  })

  it('has proper CSS classes for styling', () => {
    const { container } = render(<ServiceCard {...mockProps} />)
    
    const card = container.firstChild as HTMLElement
    expect(card).toHaveClass('rounded-xl', 'border')
    
    // Check icon container has proper classes (accounting for mocked design system)
    const iconContainer = screen.getByRole('presentation').parentElement
    expect(iconContainer).toHaveClass('mocked-classes', 'mx-auto') // Updated to match mocked classes
  })

  it('centers the title and description text', () => {
    render(<ServiceCard {...mockProps} />)
    
    const title = screen.getByRole('heading', { level: 3 })
    const description = screen.getByText(mockProps.description)
    
    expect(title).toHaveClass('text-center')
    expect(description).toHaveClass('text-center')
  })
}) 