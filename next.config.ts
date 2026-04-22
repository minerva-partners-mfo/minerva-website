import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

const nextConfig: NextConfig = {
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
