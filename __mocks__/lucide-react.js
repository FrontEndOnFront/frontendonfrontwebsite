const React = require('react')

// Mock component for all Lucide icons
const MockIcon = ({ children, ...props }) => (
  React.createElement('svg', {
    'data-testid': 'lucide-icon',
    ...props
  }, children || React.createElement('rect', { width: '24', height: '24' }))
)

// Create a proxy to handle any icon import dynamically
const createIconMock = (name) => {
  const IconComponent = React.forwardRef((props, ref) => (
    React.createElement(MockIcon, {
      'data-testid': `lucide-${name.toLowerCase()}`,
      ref,
      ...props
    })
  ))
  IconComponent.displayName = name
  return IconComponent
}

// Common icons that might be used in the app
const commonIcons = [
  'Globe', 'Code', 'Smartphone', 'Database', 'Server', 'Cloud',
  'Monitor', 'Cpu', 'HardDrive', 'Wifi', 'Lock', 'Shield',
  'Users', 'Mail', 'Phone', 'MapPin', 'Calendar', 'Clock',
  'ChevronDown', 'ChevronUp', 'ChevronLeft', 'ChevronRight',
  'Menu', 'X', 'Home', 'Info', 'Settings', 'Search',
  'Plus', 'Minus', 'Edit', 'Delete', 'Save', 'Download',
  'Upload', 'Share', 'Star', 'Heart', 'ThumbsUp', 'Eye'
]

// Create mock exports for common icons
const mockExports = {}
commonIcons.forEach(iconName => {
  mockExports[iconName] = createIconMock(iconName)
})

// Use Proxy to handle any missing icons dynamically
const lucideReactMock = new Proxy(mockExports, {
  get(target, prop) {
    if (typeof prop === 'string' && prop in target) {
      return target[prop]
    }
    if (typeof prop === 'string' && prop.charAt(0).toUpperCase() === prop.charAt(0)) {
      // Likely an icon name (starts with uppercase)
      const icon = createIconMock(prop)
      target[prop] = icon // Cache it
      return icon
    }
    return undefined
  }
})

module.exports = lucideReactMock 