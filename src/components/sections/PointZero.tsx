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
      <img src="/images/logo-gold.svg" alt="" width={140} style={{ height: 'auto' }} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/Progetto senza titolo (4).svg"
        alt="Minerva Partners"
        width={260}
        style={{ height: 'auto', marginTop: 10, filter: 'sepia(1) saturate(3) hue-rotate(10deg) brightness(0.85)' }}
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
