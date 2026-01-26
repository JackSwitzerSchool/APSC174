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
    unoptimized: false,
  },
  async rewrites() {
    return [
      // Handle markdown files without extension
      {
        source: '/:file((?!notes|tutorials|course-resources|content|assets).*)',
        destination: '/base/:file',
      },
      // Handle tutorial content
      {
        source: '/tutorials/:path*',
        destination: '/tutorials/:path*',
      }
    ]
  },
  // Configure static asset handling
  async headers() {
    return [
      {
        source: '/content/assets/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          }
        ],
      }
    ]
  },
  experimental: {
    // Only use supported experimental features
    mdxRs: true
  }
}

module.exports = nextConfig