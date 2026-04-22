'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { useLocale, useTranslations } from 'next-intl'

export default function CogitoPage() {
  const locale = useLocale()
  const otherLocale = locale === 'it' ? 'en' : 'it'
  const t = useTranslations('cogito')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || loading) return
    setLoading(true)
    try {
      // TODO: wire to /api/cogito/subscribe when Supabase table is ready
      await new Promise((r) => setTimeout(r, 800))
      setSubmitted(true)
    } catch {
      // fail silently
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative" style={{ background: '#0D1520' }}>
      {/* Top bar */}
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

      {/* Hero */}
      <div
        className="flex flex-col items-center justify-center px-6 text-center"
        style={{ minHeight: 'calc(100vh - 80px)', paddingBottom: 80 }}
      >
        {/* Title */}
        <h1
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontWeight: 600,
            fontSize: 'clamp(48px, 8vw, 96px)',
            color: '#C5A059',
            letterSpacing: '0.05em',
            margin: 0,
          }}
        >
          {t('title')}
        </h1>

        {/* Subtitle italic */}
        <p
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontStyle: 'italic',
            fontSize: 24,
            color: 'rgba(255,255,255,0.88)',
            marginTop: 12,
          }}
        >
          {t('subtitle')}
        </p>

        {/* Divider */}
        <div
          className="mx-auto my-12"
          style={{
            width: 60,
            height: 1,
            background: 'linear-gradient(90deg, transparent, #C5A059, transparent)',
          }}
        />

        {/* Manifesto */}
        <p
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: 16,
            lineHeight: 1.8,
            color: 'rgba(255,255,255,0.88)',
            maxWidth: 560,
            margin: '0 auto',
          }}
        >
          {t('manifesto')}
        </p>

        {/* Coming soon badge */}
        <div
          className="mt-10 inline-flex items-center gap-2 px-5 py-2"
          style={{
            border: '1px solid rgba(197,160,89,0.3)',
            borderRadius: 20,
            background: 'rgba(197,160,89,0.06)',
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: '#C5A059', animation: 'pulse 2s ease-in-out infinite' }}
          />
          <span
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'rgba(197,160,89,0.8)',
            }}
          >
            {t('comingSoon')}
          </span>
        </div>

        {/* Newsletter section */}
        <div className="mt-16 w-full max-w-[440px]">
          <h2
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 22,
              fontWeight: 600,
              color: '#C5A059',
              marginBottom: 8,
            }}
          >
            {t('newsletter.title')}
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: 13,
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.5)',
              marginBottom: 20,
            }}
          >
            {t('newsletter.subtitle')}
          </p>

          {submitted ? (
            <p
              style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: 14,
                color: '#C5A059',
                padding: '16px 0',
              }}
            >
              {t('newsletter.success')}
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('newsletter.emailPlaceholder')}
                required
                className="flex-1 outline-none"
                style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontSize: 14,
                  padding: '12px 16px',
                  borderRadius: 8,
                  border: '1px solid rgba(197,160,89,0.2)',
                  background: 'rgba(10,30,46,0.8)',
                  color: 'white',
                }}
              />
              <button
                type="submit"
                disabled={loading}
                style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  padding: '12px 24px',
                  borderRadius: 8,
                  border: 'none',
                  background: 'linear-gradient(135deg, #C5A059, #d4af61)',
                  color: '#0D1520',
                  cursor: loading ? 'wait' : 'pointer',
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {t('newsletter.submit')}
              </button>
            </form>
          )}

          <p
            className="mt-4"
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: 11,
              color: 'rgba(255,255,255,0.3)',
            }}
          >
            {t('newsletter.privacy')}
          </p>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  )
}
