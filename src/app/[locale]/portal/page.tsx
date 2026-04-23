'use client'

import { Link } from '@/i18n/navigation'
import { useLocale, useTranslations } from 'next-intl'

const PORTAL_URL = 'https://minerva-portals-7sjramc1a-marcovittoni85s-projects.vercel.app'

export default function PortalPage() {
  const locale = useLocale()
  const otherLocale = locale === 'it' ? 'en' : 'it'
  const t = useTranslations('portal')

  return (
    <div
      className="min-h-screen flex flex-col items-center px-6"
      style={{
        background: 'radial-gradient(ellipse at top, #0a1428 0%, #001220 60%)',
      }}
    >
      {/* Mini header */}
      <header
        className="w-full flex justify-between items-center py-7"
        style={{
          maxWidth: 720,
          borderBottom: '0.5px solid rgba(212,175,55,0.12)',
          marginBottom: 80,
        }}
      >
        <a
          href="https://minervapartners.it"
          style={{
            fontFamily: 'var(--font-dm-sans)',
            color: 'rgba(255,255,255,0.5)',
            fontSize: 11,
            letterSpacing: '0.15em',
            textDecoration: 'none',
          }}
        >
          &larr; {t('back')}
        </a>
        <div className="flex items-center gap-4">
          <span
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 13,
              color: '#D4AF37',
              letterSpacing: '0.3em',
              fontWeight: 500,
            }}
          >
            MINERVA PARTNERS
          </span>
          <Link
            href="/portal"
            locale={otherLocale}
            className="flex items-center justify-center w-8 h-8 rounded-full border border-white/10 hover:border-[#C9912B]/30 transition-all duration-300"
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: '0.1em',
              color: 'rgba(255,255,255,0.8)',
            }}
          >
            {otherLocale.toUpperCase()}
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="w-full text-center flex-1 flex flex-col items-center justify-center" style={{ maxWidth: 720 }}>
        {/* Title */}
        <h1
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(40px, 8vw, 64px)',
            fontWeight: 300,
            color: '#D4AF37',
            letterSpacing: '0.06em',
            lineHeight: 1.15,
            margin: 0,
          }}
        >
          {t('title')}
        </h1>

        {/* Gold line */}
        <div
          className="mx-auto"
          style={{
            width: 60,
            height: 1,
            background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
            margin: '36px auto',
            opacity: 0.6,
          }}
        />

        {/* Subtitle */}
        <p
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: 16,
            lineHeight: 1.85,
            color: 'rgba(255,255,255,0.75)',
            maxWidth: 480,
            margin: '0 auto',
            fontWeight: 300,
          }}
        >
          {t('subtitle')}
        </p>

        {/* CTA button */}
        <a
          href={PORTAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-12 hover:shadow-[0_8px_40px_rgba(212,175,55,0.3)] hover:scale-[1.02] active:scale-[0.98]"
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: 14,
            fontWeight: 600,
            color: '#001220',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            padding: '16px 48px',
            background: 'linear-gradient(135deg, #D4AF37, #E8C84A)',
            borderRadius: 6,
            textDecoration: 'none',
            transition: 'all 0.3s',
          }}
        >
          {t('cta')}
        </a>

        {/* Note */}
        <p
          className="mt-8"
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: 13,
            color: 'rgba(255,255,255,0.4)',
            lineHeight: 1.6,
            maxWidth: 400,
          }}
        >
          {t('note')}
        </p>
      </main>

      {/* Minimal footer */}
      <footer
        className="w-full text-center"
        style={{
          maxWidth: 720,
          padding: '48px 0 32px',
          borderTop: '0.5px solid rgba(212,175,55,0.08)',
          marginTop: 80,
        }}
      >
        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em' }}>
          &copy; 2026 Minerva Partners S.r.l. &mdash;{' '}
          <Link
            href="/privacy-policy"
            style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}
          >
            Privacy
          </Link>
        </p>
      </footer>
    </div>
  )
}
