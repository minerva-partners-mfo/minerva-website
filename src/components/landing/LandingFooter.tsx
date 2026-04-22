'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { useCookieConsent } from '@/components/providers/CookieConsentProvider'

export function LandingFooter() {
  const t = useTranslations('landing.footer')
  const { openPreferences } = useCookieConsent()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.footer
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      className="px-6 py-12 md:py-16"
      style={{
        background: 'transparent',
        borderTop: '1px solid rgba(197,160,89,0.06)',
      }}
    >
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <a
          href="mailto:info@minervapartners.it"
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: 13,
            color: 'rgba(255,255,255,0.45)',
            textDecoration: 'none',
            transition: 'color 0.3s',
          }}
          className="hover:text-white/70"
        >
          info@minervapartners.it
        </a>

        <div className="flex items-center gap-4 flex-wrap justify-center">
          <Link
            href="/privacy-policy"
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: 11,
              color: 'rgba(255,255,255,0.3)',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            className="hover:text-[#D4AF37]"
          >
            {t('privacy')}
          </Link>
          <span style={{ color: 'rgba(255,255,255,0.15)' }}>|</span>
          <Link
            href="/cookie-policy"
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: 11,
              color: 'rgba(255,255,255,0.3)',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            className="hover:text-[#D4AF37]"
          >
            {t('cookie')}
          </Link>
          <span style={{ color: 'rgba(255,255,255,0.15)' }}>|</span>
          <button
            onClick={openPreferences}
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: 11,
              color: 'rgba(255,255,255,0.3)',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'color 0.2s',
            }}
            className="hover:text-[#D4AF37]"
          >
            Preferenze cookie
          </button>
        </div>
      </div>
    </motion.footer>
  )
}
