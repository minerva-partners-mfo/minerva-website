import Image from 'next/image'
import { Link } from '@/i18n/navigation'

export default function InsightPage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{ background: '#0a0f1c' }}
    >
      <Image
        src="/images/logo-minerva.png"
        alt="Minerva Partners"
        width={180}
        height={72}
        className="h-auto object-contain mb-10"
        style={{ width: 'clamp(120px, 30vw, 180px)' }}
      />

      <h1
        style={{
          fontFamily: 'var(--font-cormorant)',
          fontWeight: 600,
          fontSize: 'clamp(32px, 6vw, 56px)',
          color: '#C5A059',
          letterSpacing: '0.04em',
          margin: 0,
          textAlign: 'center',
        }}
      >
        Minerva Insight
      </h1>

      <p
        style={{
          fontFamily: 'var(--font-dm-sans)',
          fontSize: 14,
          color: 'rgba(255,255,255,0.4)',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          marginTop: 16,
          textAlign: 'center',
        }}
      >
        Research &amp; Analysis — Coming Soon
      </p>

      <div
        className="mx-auto mt-8"
        style={{
          width: 60,
          height: 1,
          background: 'linear-gradient(90deg, transparent, #C5A059, transparent)',
        }}
      />

      <Link
        href="/"
        className="mt-12 inline-block hover:border-[rgba(197,160,89,0.4)]"
        style={{
          fontFamily: 'var(--font-dm-sans)',
          fontSize: 12,
          fontWeight: 500,
          color: 'rgba(255,255,255,0.6)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          padding: '10px 28px',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 4,
          textDecoration: 'none',
          transition: 'all 0.3s',
        }}
      >
        Torna alla home
      </Link>
    </div>
  )
}
