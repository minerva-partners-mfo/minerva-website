'use client'

import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { useLocale } from 'next-intl'

export default function CogitoPage() {
  const locale = useLocale()
  const otherLocale = locale === 'it' ? 'en' : 'it'

  return (
    <div
      className="min-h-screen relative"
      style={{ background: '#0D1520' }}
    >
      {/* Top bar: logo left, IT/EN right */}
      <div className="flex items-center justify-between px-6 md:px-10 pt-6">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo-minerva.png"
            alt="Minerva Partners"
            width={160}
            height={44}
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>

        <Link
          href="/cogito"
          locale={otherLocale}
          className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 hover:border-[#C9912B]/30 transition-all duration-300"
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.1em',
            color: 'rgba(255,255,255,0.8)',
          }}
        >
          {locale === 'it' ? 'EN' : 'IT'}
        </Link>
      </div>

      {/* Centered content */}
      <div className="flex flex-col items-center justify-center px-6" style={{ minHeight: 'calc(100vh - 80px)' }}>
        <h1
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontWeight: 600,
            fontSize: 'clamp(36px, 7vw, 64px)',
            color: '#C5A059',
            letterSpacing: '0.04em',
            margin: 0,
            textAlign: 'center',
          }}
        >
          Minerva Cogito
        </h1>

        <div
          className="mx-auto mt-8"
          style={{
            width: 60,
            height: 1,
            background: 'linear-gradient(90deg, transparent, #C5A059, transparent)',
          }}
        />
      </div>
    </div>
  )
}
