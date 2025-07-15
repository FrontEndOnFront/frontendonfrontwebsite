import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',  // Enable static exports for Netlify
  
  // Image optimization for static export
  images: {
    domains: [
      'artisticskylight.com', 
      'www.mec.ca',
      'static.wixstatic.com'
    ],
    unoptimized: true,  // Required for static export
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Production optimizations
  compress: true,
  poweredByHeader: false,
  
  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: false, // Enable ESLint checks in production builds
  },

  // TypeScript configuration  
  typescript: {
    ignoreBuildErrors: false, // Enable TypeScript checks in production builds
  },

  // Experimental features for performance
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },

  // Environment variables validation
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },

  // Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    // Production optimizations
    if (!dev) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: -10,
            chunks: 'all',
          },
        },
      };
    }

    return config;
  },

  // Bundle size optimizations
  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{member}}',
    },
  },
};

export default nextConfig;
