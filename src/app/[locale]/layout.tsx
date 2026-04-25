import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Playfair_Display, DM_Sans, Cormorant_Garamond } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider'
import { CookieConsentProvider } from '@/components/providers/CookieConsentProvider'

import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CookieConsent } from '@/components/layout/CookieBanner'
import '../globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0D1520',
}

export const metadata: Metadata = {
  title: {
    default: 'Minerva Partners — Multiclient Family Office',
    template: '%s | Minerva Partners',
  },
  description:
    'Eccellenza senza compromessi. Il tuo patrimonio ha bisogno di qualcuno che lo guardi come lo guardi tu.',
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
  },
  openGraph: {
    type: 'website',
    siteName: 'Minerva Partners',
    title: 'Minerva Partners — Multiclient Family Office',
    description: 'Eccellenza senza compromessi. Il tuo patrimonio ha bisogno di qualcuno che lo guardi come lo guardi tu.',
    locale: 'it_IT',
    alternateLocale: ['en_US'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Minerva Partners — Multiclient Family Office',
    description: 'Eccellenza senza compromessi. Il tuo patrimonio ha bisogno di qualcuno che lo guardi come lo guardi tu.',
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL('https://minervapartners.it'),
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as 'it' | 'en')) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale} className={`${playfair.variable} ${dmSans.variable} ${cormorant.variable}`}>
      <body>
        <Script id="gcm-defaults" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'analytics_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'functionality_storage': 'denied',
              'personalization_storage': 'denied',
              'security_storage': 'granted',
              'wait_for_update': 500
            });
          `}
        </Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HKESFFK4FK"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HKESFFK4FK');
          `}
        </Script>
        <NextIntlClientProvider messages={messages}>
          <CookieConsentProvider>
            <Navbar />
            <SmoothScrollProvider>
              {children}
              <Footer />
            </SmoothScrollProvider>
            <CookieConsent />
          </CookieConsentProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
