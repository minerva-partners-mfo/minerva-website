'use client'

import { useState, useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { useCookieConsent } from '@/components/providers/CookieConsentProvider'
import { ConsentToggle } from './ConsentToggle'
import { CATEGORIES, CATEGORY_SERVICES, type ConsentCategory } from '@/lib/cookieConsent'

export function ConsentPreferences() {
  const t = useTranslations('consent')
  const { consent, showPreferences, savePreferences, acceptAll, rejectAll, closePreferences } = useCookieConsent()
  const [localState, setLocalState] = useState({
    functional: consent.functional,
    analytics: consent.analytics,
    performance: consent.performance,
    marketing: consent.marketing,
  })
  const [expanded, setExpanded] = useState<ConsentCategory | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Sync local state when consent changes
  useEffect(() => {
    setLocalState({
      functional: consent.functional,
      analytics: consent.analytics,
      performance: consent.performance,
      marketing: consent.marketing,
    })
  }, [consent])

  // Focus first button + reset scroll on open
  useEffect(() => {
    if (showPreferences) {
      if (scrollRef.current) scrollRef.current.scrollTop = 0
      if (modalRef.current) {
        const firstBtn = modalRef.current.querySelector('button')
        firstBtn?.focus()
      }
    }
  }, [showPreferences])

  if (!showPreferences) return null

  const toggleCategory = (cat: ConsentCategory) => {
    if (cat === 'necessary') return
    setLocalState((prev) => ({ ...prev, [cat]: !prev[cat as keyof typeof prev] }))
  }

  const handleSave = () => {
    savePreferences(localState)
  }

  const handleAcceptAll = () => {
    acceptAll()
  }

  const handleRejectAll = () => {
    rejectAll()
  }

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4 py-4"
      style={{
        background: 'rgba(0, 18, 32, 0.92)',
        backdropFilter: 'blur(20px) saturate(140%)',
        animation: 'consentFadeIn 300ms ease-out',
      }}
      role="dialog"
      aria-modal="true"
      aria-label={t('modal.title')}
    >
      <div
        ref={modalRef}
        className="w-full max-w-[720px] flex flex-col"
        style={{
          maxHeight: '85vh',
          background: '#0a1e2e',
          border: '1px solid rgba(212,175,55,0.2)',
          borderRadius: 16,
          boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 60px rgba(212,175,55,0.08)',
          animation: 'consentSlideUp 300ms ease-out',
        }}
      >
        {/* Header */}
        <div className="px-8 pt-8 pb-4 shrink-0">
          <h2
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(20px, 3.5vw, 26px)',
              fontWeight: 600,
              color: '#D4AF37',
              letterSpacing: '0.02em',
              marginBottom: 12,
            }}
          >
            {t('modal.title')}
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: 13,
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.7)',
              marginBottom: 8,
            }}
          >
            {t('modal.intro')}
          </p>
          <p
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: 12,
              lineHeight: 1.5,
              color: 'rgba(255,255,255,0.45)',
            }}
          >
            {t('modal.introNote')}
          </p>
        </div>

        {/* Categories list - scrollable */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-8 py-4"
          style={{ minHeight: 0, overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch' }}
        >
          {CATEGORIES.map((cat) => {
            const isNecessary = cat === 'necessary'
            const isChecked = isNecessary ? true : localState[cat as keyof typeof localState]
            const isOpen = expanded === cat
            const services = CATEGORY_SERVICES[cat]

            return (
              <div
                key={cat}
                className="mb-3"
                style={{
                  background: '#061a28',
                  border: '1px solid rgba(212,175,55,0.1)',
                  borderRadius: 12,
                  overflow: 'hidden',
                }}
              >
                {/* Category header */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 20, padding: '20px 24px' }}>
                  <div style={{ flex: '1 1 auto', minWidth: 0 }}>
                    <div className="flex items-center gap-3 mb-1">
                      <h3
                        style={{
                          fontFamily: 'var(--font-cormorant)',
                          fontSize: 18,
                          fontWeight: 600,
                          color: '#D4AF37',
                        }}
                      >
                        {t(`modal.categories.${cat}.title`)}
                      </h3>
                      {isNecessary && (
                        <span
                          style={{
                            fontFamily: 'var(--font-dm-sans)',
                            fontSize: 10,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            color: 'rgba(212,175,55,0.7)',
                            background: 'rgba(212,175,55,0.1)',
                            padding: '2px 8px',
                            borderRadius: 4,
                          }}
                        >
                          {t('modal.alwaysActive')}
                        </span>
                      )}
                    </div>
                    <p
                      style={{
                        fontFamily: 'var(--font-dm-sans)',
                        fontSize: 13,
                        lineHeight: 1.5,
                        color: 'rgba(255,255,255,0.6)',
                      }}
                    >
                      {t(`modal.categories.${cat}.description`)}
                    </p>
                  </div>
                  <div style={{ flex: '0 0 auto', paddingTop: 4 }}>
                    <ConsentToggle
                      checked={isChecked}
                      onChange={() => toggleCategory(cat)}
                      disabled={isNecessary}
                      label={t(`modal.categories.${cat}.title`)}
                    />
                  </div>
                </div>

                {/* Expand button */}
                {services.length > 0 && (
                  <>
                    <button
                      onClick={() => setExpanded(isOpen ? null : cat)}
                      className="w-full flex items-center gap-2 px-5 py-2.5 transition-colors hover:bg-white/[0.02]"
                      style={{
                        fontFamily: 'var(--font-dm-sans)',
                        fontSize: 11,
                        letterSpacing: '0.06em',
                        color: 'rgba(212,175,55,0.7)',
                        borderTop: '1px solid rgba(212,175,55,0.06)',
                      }}
                    >
                      <span className={`transition-transform duration-200 text-[10px] ${isOpen ? 'rotate-180' : ''}`}>
                        ▼
                      </span>
                      {isOpen ? t('modal.showLess') : t('modal.showMore')}
                    </button>

                    {/* Service table */}
                    {isOpen && (
                      <div className="px-5 pb-4">
                        <table className="w-full" style={{ borderCollapse: 'collapse' }}>
                          <thead>
                            <tr style={{ background: '#061a28' }}>
                              {['service', 'provider', 'purpose', 'duration'].map((col) => (
                                <th
                                  key={col}
                                  className="text-left"
                                  style={{
                                    fontFamily: 'var(--font-dm-sans)',
                                    fontSize: 11,
                                    fontWeight: 600,
                                    letterSpacing: '0.06em',
                                    textTransform: 'uppercase',
                                    color: 'rgba(255,255,255,0.45)',
                                    padding: '10px 12px',
                                    borderBottom: '1px solid rgba(212,175,55,0.15)',
                                  }}
                                >
                                  {t(`modal.table.${col}`)}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {services.map((svc, i) => (
                              <tr
                                key={svc.name}
                                style={{
                                  background: i % 2 === 1 ? 'rgba(255,255,255,0.02)' : 'transparent',
                                }}
                              >
                                <td style={tdStyle}>
                                  {svc.policyUrl ? (
                                    <a
                                      href={svc.policyUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      style={{ color: '#D4AF37', borderBottom: '1px dotted rgba(212,175,55,0.4)', textDecoration: 'none' }}
                                    >
                                      {svc.name}
                                    </a>
                                  ) : (
                                    svc.name
                                  )}
                                </td>
                                <td style={tdStyle}>{svc.provider}</td>
                                <td style={tdStyle}>{svc.purpose}</td>
                                <td style={tdStyle}>{svc.duration}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </>
                )}
              </div>
            )
          })}
        </div>

        {/* Footer buttons - equal prominence */}
        <div className="px-8 py-5 shrink-0 flex flex-col sm:flex-row gap-3" style={{ borderTop: '1px solid rgba(212,175,55,0.1)' }}>
          <button onClick={handleRejectAll} className="flex-1" style={btnOutlineStyle}>
            {t('modal.rejectAll')}
          </button>
          <button onClick={handleSave} className="flex-1" style={btnOutlineStyle}>
            {t('modal.save')}
          </button>
          <button onClick={handleAcceptAll} className="flex-1" style={btnPrimaryStyle}>
            {t('modal.acceptAll')}
          </button>
        </div>
      </div>
    </div>
  )
}

const tdStyle: React.CSSProperties = {
  fontFamily: 'var(--font-dm-sans)',
  fontSize: 12,
  color: 'rgba(255,255,255,0.6)',
  padding: '10px 12px',
  borderBottom: '1px solid rgba(212,175,55,0.06)',
}

const btnOutlineStyle: React.CSSProperties = {
  fontFamily: 'var(--font-dm-sans)',
  fontSize: 13,
  fontWeight: 500,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  padding: '14px 24px',
  borderRadius: 10,
  background: 'transparent',
  border: '1px solid rgba(212,175,55,0.4)',
  color: 'rgba(255,255,255,0.8)',
  cursor: 'pointer',
}

const btnPrimaryStyle: React.CSSProperties = {
  fontFamily: 'var(--font-dm-sans)',
  fontSize: 13,
  fontWeight: 600,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  padding: '14px 24px',
  borderRadius: 10,
  background: 'linear-gradient(135deg, #D4AF37, #E8C84A)',
  border: 'none',
  color: '#001220',
  cursor: 'pointer',
  boxShadow: '0 4px 20px rgba(212,175,55,0.3)',
}
