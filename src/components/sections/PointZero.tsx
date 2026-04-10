'use client'

import { useTranslations } from 'next-intl'

export function PointZeroPage() {
  const t = useTranslations('pointZeroSimple')

  return (
    <section
      style={{
        background: '#0D1520',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/logo.png"
        alt="Minerva Partners"
        width={180}
        style={{ opacity: 0.85, height: 'auto', mixBlendMode: 'screen' }}
      />
      <p
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          color: '#fff',
          fontSize: '1.5rem',
          fontWeight: 400,
          textAlign: 'center',
          marginTop: 28,
        }}
      >
        {t('tagline')}
      </p>
    </section>
  )
}
