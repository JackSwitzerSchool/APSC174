/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: false, // For better performance
  },
  // Configure webpack to handle MDX
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': process.cwd(),
    }
    return config
  },
  // Add async rewrites for static files
  async rewrites() {
    return [
      {
        source: '/:path*.pdf',
        destination: '/base/:path*.pdf',
      },
      {
        source: '/:path*.md',
        destination: '/base/:path*.md',
      }
    ]
  }
}

module.exports = nextConfig 