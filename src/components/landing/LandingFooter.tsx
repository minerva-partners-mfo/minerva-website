'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'

export function LandingFooter() {
  const t = useTranslations('landing.footer')

  return (
    <footer
      style={{
        borderTop: '0.5px solid rgba(197,160,89,0.12)',
        padding: '36px 24px',
        background: '#0f1829',
      }}
    >
      <div className="flex flex-col items-center gap-4">
        <Image
          src="/images/logo-minerva.png"
          alt="Minerva Partners"
          width={120}
          height={60}
          className="h-8 w-auto object-contain opacity-60"
        />

        <span
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 11,
            color: 'rgba(197,160,89,0.5)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase' as const,
          }}
        >
          MINERVA PARTNERS SRL
        </span>

        <div className="flex items-center gap-3 flex-wrap justify-center">
          <a
            href="mailto:info@minervapartners.it"
            className="transition-colors duration-200 hover:!text-[#C5A059]"
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: 11,
              color: 'rgba(255,255,255,0.50)',
              textDecoration: 'none',
            }}
          >
            info@minervapartners.it
          </a>
          <span style={{ color: 'rgba(255,255,255,0.20)' }}>|</span>
          <a
            href="#"
            className="transition-colors duration-200 hover:!text-[#C5A059]"
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: 11,
              color: 'rgba(255,255,255,0.50)',
              textDecoration: 'none',
            }}
          >
            {t('privacy')}
          </a>
          <span style={{ color: 'rgba(255,255,255,0.20)' }}>|</span>
          <a
            href="#"
            className="transition-colors duration-200 hover:!text-[#C5A059]"
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: 11,
              color: 'rgba(255,255,255,0.50)',
              textDecoration: 'none',
            }}
          >
            {t('cookie')}
          </a>
        </div>
      </div>
    </footer>
  )
}
