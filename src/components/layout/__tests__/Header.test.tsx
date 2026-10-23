import { fireEvent, render, screen, within } from '@testing-library/react'
import { Header } from '../Header'
import { Footer } from '../Footer'

describe('Header', () => {
  it('renders the logo and main navigation', () => {
    render(<Header />)
    expect(screen.getByLabelText('FrontEndonFront home')).toHaveAttribute('href', '/')
    const nav = screen.getByRole('navigation', { name: 'Main' })
    for (const label of ['Services', 'Industries', 'About', 'Contact']) {
      expect(within(nav).getByRole('link', { name: label })).toBeInTheDocument()
    }
    expect(within(nav).getByRole('link', { name: /Automotive/ })).toHaveAttribute('href', '/industries/automotive/')
  })

  it('toggles the mobile menu', () => {
    render(<Header />)
    const toggle = screen.getByRole('button', { name: 'Toggle mobile menu' })
    expect(screen.queryByRole('navigation', { name: 'Mobile' })).not.toBeInTheDocument()
    fireEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('navigation', { name: 'Mobile' })).toBeInTheDocument()
  })
})

describe('Footer', () => {
  it('shows Canadian ownership and both regions', () => {
    render(<Footer />)
    expect(screen.getByText('Canadian-owned and operated')).toBeInTheDocument()
    expect(screen.getByText('British Columbia')).toBeInTheDocument()
    expect(screen.getByText('Toronto')).toBeInTheDocument()
  })
})
