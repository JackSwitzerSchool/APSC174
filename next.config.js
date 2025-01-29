/** @type {import('next').NextConfig} */
const TerserPlugin = require('terser-webpack-plugin')

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
  webpack: (config, { dev, isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': process.cwd(),
    }
    // Only run optimization for production builds
    if (!dev) {
      config.optimization.minimize = true
      config.optimization.minimizer = config.optimization.minimizer || []
      config.optimization.minimizer.push(
        new TerserPlugin({
          terserOptions: {
            compress: true,
            mangle: true
          }
        })
      )
    }
    return config
  },
  async rewrites() {
    return [
      // Static assets should be served directly
      {
        source: '/content/assets/:path*',
        destination: '/content/assets/:path*',
        has: [
          {
            type: 'header',
            key: 'accept',
            value: '(.*)'
          }
        ]
      },
      // Specific handling for images
      {
        source: '/content/assets/images/:file*',
        destination: '/content/assets/images/:file*',
        has: [
          {
            type: 'header',
            key: 'accept',
            value: 'image/(.*)'
          }
        ]
      },
      // Handle markdown files without extension
      {
        source: '/:file((?!notes|tutorials|course-resources|content).*)',
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