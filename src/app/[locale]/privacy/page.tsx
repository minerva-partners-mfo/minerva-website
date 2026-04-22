import { useTranslations } from 'next-intl'

export default function PrivacyPage() {
  const t = useTranslations('privacy')

  const sections = ['controller', 'data', 'purpose', 'legal', 'retention', 'rights', 'cookies'] as const

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 md:px-6" style={{ background: '#0D1520' }}>
      <div className="max-w-[760px] mx-auto">
        <h1
          className="mb-2"
          style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: 'clamp(28px, 5vw, 42px)',
            fontWeight: 600,
            color: '#C5A059',
            letterSpacing: '0.02em',
          }}
        >
          {t('title')}
        </h1>

        <p className="font-sans text-[12px] text-white/40 tracking-wider uppercase mb-8">
          {t('lastUpdated')}
        </p>

        <p className="font-sans text-[15px] leading-7 text-white/70 mb-10">
          {t('intro')}
        </p>

        {sections.map((key) => (
          <div key={key} className="mb-8">
            <h2
              className="mb-3"
              style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: 16,
                fontWeight: 600,
                color: 'white',
                letterSpacing: '0.02em',
              }}
            >
              {t(`sections.${key}.title`)}
            </h2>
            <p className="font-sans text-[14px] leading-7 text-white/60">
              {t(`sections.${key}.text`)}
            </p>
          </div>
        ))}

        <div className="h-px bg-white/10 mt-12 mb-6" />
        <p className="font-sans text-[12px] text-white/30">
          © 2026 Minerva Partners S.r.l. — Via Roggia Vignola 9, 24047 Treviglio (BG), Italia
        </p>
      </div>
    </div>
  )
}
