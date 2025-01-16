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
      // Handle markdown files without extension
      {
        source: '/:file((?!notes|tutorials|course-resources).*)',
        destination: '/base/:file',
      },
      // Keep tutorials path
      {
        source: '/tutorials/QandS/:file*',
        destination: '/tutorials/QandS/:file*',
      }
    ]
  }
}

module.exports = nextConfig 