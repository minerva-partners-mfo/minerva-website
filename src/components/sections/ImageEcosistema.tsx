'use client'

import { useTranslations } from 'next-intl'

export function ImageEcosistema() {
  const t = useTranslations('imageEcosistema')

  return (
    <section className="relative min-h-[60vh] overflow-hidden flex items-center justify-center">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/img9.webp')" }}
      />
      {/* Dark overlay 80% */}
      <div className="absolute inset-0 bg-[#0D1520]/80" />
      {/* Gradient bottom → navy-deep */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(13,21,32,0.3) 0%, transparent 30%, transparent 60%, #0D1520 100%)',
        }}
      />

      {/* Text content */}
      <div className="relative z-10 px-6 py-24 text-center max-w-[800px] mx-auto">
        {/* Line 1 */}
        <h2
          className="font-serif text-[26px] md:text-[32px] text-white font-bold leading-snug"
          style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}
        >
          {t('line1')}
        </h2>

        {/* Line 2 */}
        <p
          className="font-serif text-[20px] md:text-[24px] text-white/80 leading-relaxed mt-4"
          style={{ textShadow: '0 2px 16px rgba(0,0,0,0.7)' }}
        >
          {t('line2')}
        </p>

        {/* Line 3 */}
        <p
          className="font-sans text-[14px] md:text-[16px] text-white/60 leading-relaxed mt-6"
          style={{ textShadow: '0 1px 10px rgba(0,0,0,0.5)' }}
        >
          {t('line3')}
        </p>
      </div>
    </section>
  )
}
