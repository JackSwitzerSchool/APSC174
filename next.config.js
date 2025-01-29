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
      // Handle static assets
      {
        source: '/content/assets/:path*',
        destination: '/content/assets/:path*',
      },
      // Handle PDF files
      {
        source: '/content/assets/pdf/:path*',
        destination: '/content/assets/pdf/:path*',
      },
      // Handle images
      {
        source: '/content/assets/images/:path*',
        destination: '/content/assets/images/:path*',
      },
      // Handle markdown files without extension
      {
        source: '/:file((?!notes|tutorials|course-resources).*)',
        destination: '/base/:file',
      },
      // Handle all tutorial content
      {
        source: '/tutorials/:path*',
        destination: '/tutorials/:path*',
      }
    ]
  },
  experimental: {
    // Only use supported experimental features
    mdxRs: true
  }
}

module.exports = nextConfig