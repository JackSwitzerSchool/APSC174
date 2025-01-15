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
      // Handle tutorial PDFs
      {
        source: '/tutorials/QandS/:file*',
        destination: '/tutorials/QandS/:file*',
      },
      // Handle base PDFs and markdown
      {
        source: '/base/:path*',
        destination: '/base/:path*',
      }
    ]
  }
}

module.exports = nextConfig 