/** @type {import('next').NextConfig} */
const nextConfig = {
  
  

  output: 'standalone', // Or 'export' if you want fully static
  trailingSlash: true, // Better compatibility with Netlify
  
  // Image handling
  images: {
    unoptimized: true, 
  },
  
  // Build optimizations
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  typescript: {
    ignoreBuildErrors: true,
  },

  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
};

module.exports = nextConfig;