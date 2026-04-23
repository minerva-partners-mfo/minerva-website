'use client'

import { useState } from 'react'
import { Link } from '@/i18n/navigation'
import { useLocale, useTranslations } from 'next-intl'

export default function CogitoPage() {
  const locale = useLocale()
  const otherLocale = locale === 'it' ? 'en' : 'it'
  const t = useTranslations('cogito')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(locale === 'it' ? "Inserisci un'email valida" : 'Please enter a valid email')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/cogito/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, locale }),
      })
      if (!res.ok) throw new Error()
      setSubmitted(true)
    } catch {
      setError(locale === 'it' ? 'Errore. Riprova tra poco.' : 'Error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center px-6" style={{ background: 'radial-gradient(ellipse at top, #0a1428 0%, #001220 60%)' }}>
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
          ← minervapartners.it
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
            href="/cogito"
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
      <main className="w-full text-center flex-1" style={{ maxWidth: 720 }}>
        {/* Title */}
        <h1
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(72px, 14vw, 120px)',
            fontWeight: 300,
            color: '#D4AF37',
            letterSpacing: '0.06em',
            lineHeight: 1,
            margin: 0,
          }}
        >
          Cogito
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(18px, 3vw, 26px)',
            fontStyle: 'italic',
            color: 'rgba(255,255,255,0.88)',
            marginTop: 16,
            letterSpacing: '0.04em',
            fontWeight: 300,
          }}
        >
          Ergo sum.
        </p>

        {/* Gold line */}
        <div
          className="mx-auto"
          style={{
            width: 60,
            height: 1,
            background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
            margin: '48px auto',
            opacity: 0.6,
          }}
        />

        {/* Manifesto */}
        <p
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: 16,
            lineHeight: 1.85,
            color: 'rgba(255,255,255,0.88)',
            maxWidth: 520,
            margin: '0 auto',
            fontWeight: 300,
          }}
        >
          {t('manifesto')}
        </p>

        {/* Coming soon badge */}
        <div
          className="inline-flex items-center gap-2 mt-12"
          style={{
            padding: '8px 20px',
            border: '0.5px solid rgba(212,175,55,0.3)',
            borderRadius: 32,
            background: 'rgba(212,175,55,0.06)',
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: '#D4AF37', opacity: 0.7, animation: 'pulse 2s ease-in-out infinite' }}
          />
          <span
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: 10,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#D4AF37',
              opacity: 0.8,
            }}
          >
            {t('comingSoon')}
          </span>
        </div>

        {/* Vertical divider */}
        <div
          className="mx-auto"
          style={{
            width: 1,
            height: 80,
            background: 'linear-gradient(180deg, transparent, rgba(212,175,55,0.2), transparent)',
            margin: '72px auto',
          }}
        />

        {/* Newsletter form */}
        <div style={{ maxWidth: 440, margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(22px, 3.5vw, 30px)',
              fontWeight: 300,
              color: '#fff',
              marginBottom: 12,
            }}
          >
            {t('newsletter.title')}
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: 14,
              color: 'rgba(255,255,255,0.5)',
              lineHeight: 1.6,
              marginBottom: 32,
            }}
          >
            {t('newsletter.subtitle')}
          </p>

          {submitted ? (
            <p
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 18,
                fontStyle: 'italic',
                color: '#D4AF37',
                lineHeight: 1.6,
              }}
            >
              {t('newsletter.success')}
            </p>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="flex gap-2 flex-wrap">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('newsletter.emailPlaceholder')}
                  disabled={loading}
                  className="flex-1 outline-none"
                  style={{
                    minWidth: 260,
                    background: '#0a1e2e',
                    border: '0.5px solid rgba(212,175,55,0.2)',
                    borderRadius: 10,
                    padding: '14px 16px',
                    color: '#fff',
                    fontFamily: 'var(--font-dm-sans)',
                    fontSize: 13,
                  }}
                />
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    background: 'linear-gradient(135deg, #D4AF37, #E8C84A)',
                    color: '#001220',
                    border: 'none',
                    borderRadius: 10,
                    padding: '14px 28px',
                    fontFamily: 'var(--font-dm-sans)',
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.7 : 1,
                    transition: 'all 0.3s',
                  }}
                >
                  {loading ? '...' : t('newsletter.submit')}
                </button>
              </div>
              {error && (
                <p style={{ marginTop: 8, fontSize: 12, color: '#e07070' }}>{error}</p>
              )}
              <p style={{ marginTop: 16, fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.04em' }}>
                {t('newsletter.privacy')}
              </p>
            </form>
          )}
        </div>
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
          © 2026 Minerva Partners S.r.l. —{' '}
          <Link
            href="/privacy-policy"
            style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}
          >
            Privacy
          </Link>
        </p>
      </footer>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
