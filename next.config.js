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
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': process.cwd(),
    }
    return config
  },
  async rewrites() {
    return [
      // Handle tutorial PDFs
      {
        source: '/tutorials/QandS/:file*',
        destination: '/tutorials/QandS/:file*',
      },
      // Handle base directory files
      {
        source: '/base/:path*',
        destination: '/base/:path*', 
      }
    ]
  }
}

module.exports = nextConfig 