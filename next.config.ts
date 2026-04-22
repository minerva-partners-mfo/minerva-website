import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' },
        ],
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/board',
        destination: 'https://portal-minerva.vercel.app',
      },
      {
        source: '/board/:path*',
        destination: 'https://portal-minerva.vercel.app/:path*',
      },
    ]
  },
}

export default withNextIntl(nextConfig)
