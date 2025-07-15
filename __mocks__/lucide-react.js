// Mock all lucide-react icons
const React = require('react');

const createMockIcon = (iconName) => {
  const MockIcon = React.forwardRef((props, ref) => {
    return React.createElement('svg', {
      ...props,
      ref,
      'data-lucide': iconName.toLowerCase(),
      role: 'presentation',
    });
  });
  MockIcon.displayName = `Mock${iconName}`;
  return MockIcon;
};

// Export all the icons used in the project
module.exports = {
  Check: createMockIcon('check'),
  Code: createMockIcon('code'),
  ArrowRight: createMockIcon('arrow-right'),
  Menu: createMockIcon('menu'),
  X: createMockIcon('x'),
  Facebook: createMockIcon('facebook'),
  Twitter: createMockIcon('twitter'),
  Linkedin: createMockIcon('linkedin'),
  Github: createMockIcon('github'),
  Cpu: createMockIcon('cpu'),
  Globe: createMockIcon('globe'),
  Zap: createMockIcon('zap'),
  Rocket: createMockIcon('rocket'),
  Calendar: createMockIcon('calendar'),
  Phone: createMockIcon('phone'),
  Mail: createMockIcon('mail'),
  Settings: createMockIcon('settings'),
  Store: createMockIcon('store'),
}; 