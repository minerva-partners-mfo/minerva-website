'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

export function CookieBanner() {
  const t = useTranslations('cookie')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('minerva-cookie-consent')
    if (!consent) setVisible(true)
  }, [])

  const handleAccept = () => {
    localStorage.setItem('minerva-cookie-consent', 'accepted')
    setVisible(false)
  }

  const handleDecline = () => {
    localStorage.setItem('minerva-cookie-consent', 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[60] px-4 pb-4"
      style={{ pointerEvents: 'none' }}
    >
      <div
        className="max-w-[560px] mx-auto rounded-lg border border-white/[0.06] bg-[#0D1520]/95 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.4)] px-5 py-4"
        style={{ pointerEvents: 'auto' }}
      >
        <p className="font-sans text-[13px] text-white/60 leading-6 mb-4">
          {t('banner')}{' '}
          <Link href="/privacy" className="text-[#C9912B] hover:text-[#d4af61] transition-colors underline underline-offset-2">
            {t('policy')}
          </Link>
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={handleAccept}
            className="font-sans text-[11px] font-semibold tracking-[0.1em] uppercase px-5 py-2.5 rounded transition-all duration-300"
            style={{
              color: '#0f1829',
              background: 'linear-gradient(135deg, #C5A059, #d4af61)',
            }}
          >
            {t('accept')}
          </button>
          <button
            onClick={handleDecline}
            className="font-sans text-[11px] font-semibold tracking-[0.1em] uppercase px-5 py-2.5 rounded border border-white/10 text-white/60 hover:text-white/80 hover:border-white/20 transition-all duration-300"
          >
            {t('decline')}
          </button>
        </div>
      </div>
    </div>
  )
}
