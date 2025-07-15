import '@testing-library/jest-dom'
import React from 'react'

// Add custom jest matchers from jest-dom
expect.extend({})

// Mock problematic dependencies that cause import issues
jest.mock('@radix-ui/react-slot', () => ({
  Slot: ({ children, ...props }) => React.createElement('div', props, children),
}))

jest.mock('class-variance-authority', () => ({
  cva: jest.fn(() => jest.fn(() => 'mocked-classes')),
}))

// Global mocks for components that cause import issues
jest.mock('next/link', () => {
  return function MockLink({ children, ...props }) {
    return React.createElement('a', props, children)
  }
})

jest.mock('@/components/ui/button', () => ({
  Button: ({ children, ...props }) => React.createElement('button', props, children),
}))

// Mock next/router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: '',
      asPath: '/',
      push: jest.fn(),
      pop: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn().mockResolvedValue(undefined),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
      isFallback: false,
    }
  },
}))

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    }
  },
  useSearchParams() {
    return new URLSearchParams()
  },
  usePathname() {
    return '/'
  },
}))

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {
    return null
  }
  disconnect() {
    return null
  }
  unobserve() {
    return null
  }
}

// Mock scrollIntoView
Object.defineProperty(window, 'scrollTo', {
  value: jest.fn(),
  writable: true
})

Object.defineProperty(Element.prototype, 'scrollIntoView', {
  value: jest.fn(),
  writable: true
})

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
}) 