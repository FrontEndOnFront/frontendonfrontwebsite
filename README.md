# FrontEndonFront Website

A modern, responsive business website built with Next.js, TypeScript, and Tailwind CSS. Features a working mobile navigation, contact form integration, and optimized performance.

## 🚀 Features

- **Modern Tech Stack**: Next.js 15, TypeScript, Tailwind CSS
- **Mobile-First Design**: Responsive design with working hamburger menu
- **Performance Optimized**: Static site generation, optimized images, bundle splitting
- **Accessibility Ready**: ARIA labels, semantic HTML, keyboard navigation
- **Testing Suite**: Jest, React Testing Library with comprehensive coverage
- **CI/CD Pipeline**: GitHub Actions with automated testing and deployment
- **Production Ready**: Security headers, error handling, monitoring ready

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Components**: Custom component library with class-variance-authority
- **Icons**: Lucide React
- **Testing**: Jest + React Testing Library
- **Deployment**: Netlify (static export)
- **CI/CD**: GitHub Actions

## 📦 Installation

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frontendonfrontwebsite
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 🧪 Testing

### Run Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run tests for CI
npm run test:ci
```

### Test Structure
- Unit tests for components in `__tests__` directories
- Testing utilities configured in `jest.setup.js`
- Coverage threshold set to 70% for all metrics

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run type-check   # Run TypeScript checks
npm test             # Run tests
npm run test:coverage # Run tests with coverage
```

### Code Quality

The project uses:
- **ESLint** with custom rules for Next.js, React, and TypeScript
- **TypeScript** for type safety
- **Prettier** for code formatting (configured in your editor)
- **Husky** for pre-commit hooks (optional)

### Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # Reusable components
│   ├── cards/          # Card components
│   ├── common/         # Common components (FadeInSection)
│   ├── forms/          # Form components
│   ├── layout/         # Layout components (Header, Footer)
│   └── ui/             # Base UI components
├── lib/                # Utilities and configuration
│   ├── data.ts         # Static data and content
│   ├── design-system.ts # Design system variants
│   └── utils.ts        # Utility functions
```

## 🌐 Deployment

### Netlify Deployment

The site is configured for static export and optimized for Netlify deployment.

1. **Automatic Deployment**
   - Push to `main` branch triggers production deployment
   - Push to `staging` branch triggers preview deployment
   - Pull requests create deploy previews

2. **Manual Deployment**
   ```bash
   npm run build
   # Deploy the `out` directory to Netlify
   ```

3. **Environment Variables**
   Set these in Netlify dashboard:
   - `NODE_VERSION=20`
   - Any environment variables from `env.example`

### Build Configuration

- **Build Command**: `npm run build`
- **Publish Directory**: `out`
- **Node Version**: 20

## 🔄 CI/CD Pipeline

### GitHub Actions

The CI/CD pipeline runs on:
- **Push to main/staging**: Full test suite + deployment
- **Pull requests**: Tests, linting, security audit, Lighthouse

### Pipeline Jobs

1. **Test**: Run tests on Node.js 18 & 20
2. **Build**: Create production build
3. **Lighthouse**: Performance audit (PRs only)
4. **Security**: npm audit + Snyk scan (PRs only)

### Required Secrets

Set these in GitHub repository settings:
- `LHCI_GITHUB_APP_TOKEN` (optional, for Lighthouse)
- `SNYK_TOKEN` (optional, for security scanning)

## 📊 Performance

### Optimizations

- **Static Site Generation**: Pre-built HTML for fast loading
- **Image Optimization**: WebP/AVIF formats with responsive sizes
- **Bundle Splitting**: Vendor and page-specific chunks
- **Tree Shaking**: Lucide icons imported individually
- **Compression**: Gzip compression enabled
- **Caching**: Long-term caching for static assets

### Monitoring

Ready for integration with:
- Google Analytics / GTM
- Sentry error tracking
- Vercel Analytics
- Core Web Vitals monitoring

## 🔐 Security

### Security Features

- **Content Security Policy**: Prevents XSS attacks
- **Security Headers**: X-Frame-Options, X-Content-Type-Options
- **Form Protection**: Formspree integration with validation
- **Dependency Scanning**: Automated security audits
- **Static Analysis**: ESLint security rules

## 🤝 Contributing

### Development Workflow

1. Create feature branch from `staging`
2. Make changes with tests
3. Run quality checks:
   ```bash
   npm run lint
   npm run type-check
   npm test
   npm run build
   ```
4. Submit pull request to `staging`
5. After review, merge to `staging`
6. Deploy to production via `main` branch

### Commit Convention

Follow conventional commits:
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test additions/changes
- `chore:` Maintenance tasks

## 📝 License

This project is proprietary software of FrontEndonFront.

## 📞 Support

For technical support or questions:
- **Email**: hello@frontendonfront.com
- **Phone**: +1 647-382-3188

---

**Built with ❤️ by FrontEndonFront**
