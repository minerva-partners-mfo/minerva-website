'use client'

export function PointZeroPage() {
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
        style={{ opacity: 0.85, height: 'auto' }}
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
        Dove tutto prende vita
      </p>
    </section>
  )
}
