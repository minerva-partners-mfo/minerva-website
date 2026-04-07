'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'

export function Footer() {
  const t = useTranslations('footer')

  return (
    <footer className="py-12 md:py-16 px-4 md:px-6" style={{ backgroundColor: '#0D1520' }}>
      <div className="max-w-[1100px] mx-auto">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 mb-10">
          <div className="flex flex-col items-center md:items-start gap-3">
            <Image
              src="/images/logoPNG.png"
              alt="Minerva Partners"
              width={320}
              height={88}
              className="h-20 w-auto object-contain"
              style={{ opacity: 1 }}
              loading="lazy"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <a href="mailto:info@minervapartners.it" className="font-sans text-[12px] text-white hover:text-[#C9912B] transition-colors">info@minervapartners.it</a>
            <a href="https://www.linkedin.com/company/minerva-partners-srl" target="_blank" rel="noopener noreferrer" className="font-sans text-[12px] text-white hover:text-[#C9912B] transition-colors">LinkedIn</a>
          </div>
        </div>

        <div className="h-px bg-white/30 mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-sans text-[12px] text-white/70">© 2026 Minerva Partners S.r.l.</span>
          <div className="flex items-center gap-6">
            <a href="#" className="font-sans text-[12px] text-white/70 hover:text-[#C9912B] transition-colors">{t('privacy')}</a>
            <a href="#" className="font-sans text-[12px] text-white/70 hover:text-[#C9912B] transition-colors">{t('disclaimer')}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
