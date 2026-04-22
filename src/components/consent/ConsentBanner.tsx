'use client'

import { useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { useCookieConsent } from '@/components/providers/CookieConsentProvider'
import { MinervaLogo } from '@/components/MinervaLogo'

export function ConsentBanner() {
  const t = useTranslations('consent.banner')
  const { showBanner, showPreferences, initialized, acceptAll, rejectAll, openPreferences } = useCookieConsent()
  const cardRef = useRef<HTMLDivElement>(null)

  // Focus trap: focus first button on mount
  useEffect(() => {
    if (showBanner && !showPreferences && cardRef.current) {
      const firstBtn = cardRef.current.querySelector('button')
      firstBtn?.focus()
    }
  }, [showBanner, showPreferences])

  // Don't render until client-side initialization is complete (prevents FOUC / locale mismatch)
  if (!initialized || !showBanner || showPreferences) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
      style={{
        background: 'rgba(0, 18, 32, 0.92)',
        backdropFilter: 'blur(20px) saturate(140%)',
        animation: 'consentFadeIn 400ms ease-out',
      }}
      role="dialog"
      aria-modal="true"
      aria-label={t('title')}
    >
      <style>{`
        @keyframes consentFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes consentSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div
        ref={cardRef}
        className="w-full max-w-[640px]"
        style={{
          background: '#0a1e2e',
          border: '1px solid rgba(212,175,55,0.2)',
          borderRadius: 16,
          boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 60px rgba(212,175,55,0.08)',
          padding: '48px 40px',
          animation: 'consentSlideUp 400ms ease-out',
        }}
      >
        {/* Logo — inline SVG, no async loading flash */}
        <div className="flex justify-center mb-6">
          <MinervaLogo width={48} iconOnly color="#D4AF37" />
        </div>

        {/* Title */}
        <h2
          className="text-center mb-5"
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(22px, 4vw, 28px)',
            fontWeight: 600,
            color: '#D4AF37',
            letterSpacing: '0.02em',
          }}
        >
          {t('title')}
        </h2>

        {/* Body */}
        <p
          className="text-center mb-8"
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: 14,
            lineHeight: 1.6,
            color: 'rgba(255,255,255,0.88)',
          }}
        >
          {t.rich('body', {
            cookiePolicyLink: (chunks) => (
              <a
                href="/cookie-policy"
                style={{
                  color: '#D4AF37',
                  borderBottom: '1px dotted #D4AF37',
                  textDecoration: 'none',
                }}
                className="hover:opacity-80 transition-opacity"
              >
                {chunks}
              </a>
            ),
          })}
        </p>

        {/* Buttons - equal prominence */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={openPreferences}
            className="flex-1 transition-all duration-200 hover:translate-y-[-1px]"
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase' as const,
              padding: '14px 24px',
              borderRadius: 10,
              background: 'transparent',
              border: '1px solid rgba(212,175,55,0.4)',
              color: 'rgba(212,175,55,0.9)',
              cursor: 'pointer',
            }}
          >
            {t('customize')}
          </button>

          <button
            onClick={rejectAll}
            className="flex-1 transition-all duration-200 hover:translate-y-[-1px]"
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase' as const,
              padding: '14px 24px',
              borderRadius: 10,
              background: 'transparent',
              border: '1px solid rgba(212,175,55,0.4)',
              color: 'rgba(255,255,255,0.8)',
              cursor: 'pointer',
            }}
          >
            {t('reject')}
          </button>

          <button
            onClick={acceptAll}
            className="flex-1 transition-all duration-200 hover:translate-y-[-1px]"
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase' as const,
              padding: '14px 24px',
              borderRadius: 10,
              background: 'linear-gradient(135deg, #D4AF37, #E8C84A)',
              border: 'none',
              color: '#001220',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(212,175,55,0.3)',
            }}
          >
            {t('acceptAll')}
          </button>
        </div>
      </div>
    </div>
  )
}
