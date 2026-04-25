import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { routing } from '@/i18n/routing'

const intlMiddleware = createMiddleware(routing)

export default function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''

  if (hostname.startsWith('cogito.')) {
    const pathname = request.nextUrl.pathname

    // Already on /xx/cogito → let it through
    if (/^\/(it|en)\/cogito/.test(pathname)) {
      return intlMiddleware(request)
    }

    // Let intl middleware handle locale detection first (/ → /en or /it)
    const response = intlMiddleware(request)

    // If intl did a redirect (/ → /en), intercept and change to /en/cogito
    if (response.status === 307 || response.status === 308) {
      const redirectUrl = new URL(response.headers.get('location') || '', request.url)
      const locale = redirectUrl.pathname.replace(/\//g, '') || 'it'
      const rewriteUrl = request.nextUrl.clone()
      rewriteUrl.pathname = `/${locale}/cogito`
      return NextResponse.rewrite(rewriteUrl)
    }

    // If on /it or /en (no redirect, direct hit) → rewrite to /xx/cogito
    if (/^\/(it|en)\/?$/.test(pathname)) {
      const locale = pathname.replace(/\//g, '')
      const url = request.nextUrl.clone()
      url.pathname = `/${locale}/cogito`
      return NextResponse.rewrite(url)
    }

    return response
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: ['/', '/(it|en)/:path*'],
}
