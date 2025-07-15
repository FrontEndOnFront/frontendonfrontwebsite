import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Header } from '../Header'

// Mock scrollIntoView behavior for testing
const mockScrollIntoView = jest.fn()
Object.defineProperty(Element.prototype, 'scrollIntoView', {
  value: mockScrollIntoView,
  writable: true,
})

describe('Header Component', () => {
  beforeEach(() => {
    mockScrollIntoView.mockClear()
  })

  it('renders the company logo and name', () => {
    render(<Header />)
    
    expect(screen.getByText('FrontEndonFront')).toBeInTheDocument()
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('renders desktop navigation links', () => {
    render(<Header />)
    
    expect(screen.getByRole('link', { name: 'Services' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Our Clients' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Process' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument()
  })

  it('renders the CTA button in desktop view', () => {
    render(<Header />)
    
    expect(screen.getByRole('button', { name: 'Get Free Consultation' })).toBeInTheDocument()
  })

  it('renders mobile menu toggle button', () => {
    render(<Header />)
    
    expect(screen.getByRole('button', { name: 'Toggle mobile menu' })).toBeInTheDocument()
  })

  it('opens mobile menu when hamburger is clicked', async () => {
    const user = userEvent.setup()
    render(<Header />)
    
    const menuButton = screen.getByRole('button', { name: 'Toggle mobile menu' })
    await user.click(menuButton)
    
    // Mobile menu should be visible with navigation links
    await waitFor(() => {
      expect(screen.getAllByRole('link', { name: 'Services' })).toHaveLength(2) // Desktop + Mobile
      expect(screen.getAllByRole('link', { name: 'Our Clients' })).toHaveLength(2)
    })
  })

  it('closes mobile menu when backdrop is clicked', async () => {
    const user = userEvent.setup()
    render(<Header />)
    
    // Open mobile menu
    const menuButton = screen.getByRole('button', { name: 'Toggle mobile menu' })
    await user.click(menuButton)
    
    // Click backdrop
    const backdrop = document.querySelector('[class*="bg-black/50"]')
    if (backdrop) {
      await user.click(backdrop)
    }
    
    // Menu should close - only desktop links remain
    await waitFor(() => {
      expect(screen.getAllByRole('link', { name: 'Services' })).toHaveLength(1)
    })
  })

  it('scrolls to contact section when CTA button is clicked', async () => {
    const user = userEvent.setup()
    
    // Mock getElementById to return a mock element
    const mockElement = { scrollIntoView: mockScrollIntoView }
    jest.spyOn(document, 'getElementById').mockReturnValue(mockElement as any)
    
    render(<Header />)
    
    const ctaButton = screen.getByRole('button', { name: 'Get Free Consultation' })
    await user.click(ctaButton)
    
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })
  })

  it('handles navigation link clicks correctly', async () => {
    const user = userEvent.setup()
    
    // Mock querySelector to return a mock element
    const mockElement = { scrollIntoView: mockScrollIntoView }
    jest.spyOn(document, 'querySelector').mockReturnValue(mockElement as any)
    
    render(<Header />)
    
    const servicesLink = screen.getByRole('link', { name: 'Services' })
    await user.click(servicesLink)
    
    // Should scroll to services section
    await waitFor(() => {
      expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })
    })
  })

  it('shows X icon when mobile menu is open', async () => {
    const user = userEvent.setup()
    render(<Header />)
    
    const menuButton = screen.getByRole('button', { name: 'Toggle mobile menu' })
    
    // Initially should show hamburger menu
    expect(menuButton.querySelector('[data-lucide="menu"]')).toBeInTheDocument()
    
    // Click to open menu
    await user.click(menuButton)
    
    // Should now show X icon
    await waitFor(() => {
      expect(menuButton.querySelector('[data-lucide="x"]')).toBeInTheDocument()
    })
  })
}) 