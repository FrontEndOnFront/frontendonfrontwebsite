import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',  // Enable static exports for Netlify
  trailingSlash: true,  // Emit /services/seo/index.html so every page works on static hosting

  // Image optimization for static export
  images: {
    unoptimized: true,  // Required for static export
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
};

export default nextConfig;
