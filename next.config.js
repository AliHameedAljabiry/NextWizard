/** @type {import('next').NextConfig} */
const nextConfig = {
  // Netlify-specific optimizations
  output: 'standalone', // Or 'export' if you want fully static
  trailingSlash: true, // Better compatibility with Netlify
  
  // Image handling
  images: {
    unoptimized: true, // Required for Netlify if not using Next.js image optimization
    domains: ['avatars.githubusercontent.com', 'lh3.googleusercontent.com'], // Add your OAuth provider domains
  },
  
  // Build optimizations
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  typescript: {
    ignoreBuildErrors: true,
  },

  // Enable SWC minification (better for Netlify)
  swcMinify: true,
  
  // Remove the turbopack section entirely - it's for dev only
};

module.exports = nextConfig;