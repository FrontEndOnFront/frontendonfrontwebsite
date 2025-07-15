const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you based on your tsconfig.json paths)
    '^@/(.*)$': '<rootDir>/src/$1',
    // Mock Lucide React icons - comprehensive patterns
    '^lucide-react$': '<rootDir>/__mocks__/lucide-react.js',
    '^lucide-react/(.*)$': '<rootDir>/__mocks__/lucide-react.js',
    '^lucide-react/dist/(.*)$': '<rootDir>/__mocks__/lucide-react.js',
  },
  testEnvironment: 'jest-environment-jsdom',
  transformIgnorePatterns: [
    'node_modules/(?!(lucide-react|@next|next|@swc)/)',
  ],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/**/*.test.{js,jsx,ts,tsx}',
    '!src/**/__tests__/**',
    '!src/app/layout.tsx', // Next.js layout file
    '!src/app/page.tsx', // Main page file - focus on components first
    '!src/lib/data.ts', // Static data file
  ],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 10,
      lines: 15,
      statements: 15,
    },
  },
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.(test|spec).{js,jsx,ts,tsx}',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig) 