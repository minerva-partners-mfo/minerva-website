'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'

export function Footer() {
  const t = useTranslations('footer')
  const pathname = usePathname()

  if (pathname === '/') return null

  return (
    <footer className="py-12 md:py-16 px-4 md:px-6" style={{ backgroundColor: '#131E33' }}>
      <div className="max-w-[1100px] mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 mb-10">
          <Image
            src="/images/logo-minerva.png"
            alt="Minerva Partners"
            width={280}
            height={78}
            className="h-20 w-auto object-contain bg-transparent"
            loading="lazy"
          />
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <a href="mailto:info@minervapartners.it" className="font-sans text-[12px] text-white/90 hover:text-[#C9912B] transition-colors">info@minervapartners.it</a>
            <a href="https://www.linkedin.com/company/minerva-partners-srl" target="_blank" rel="noopener noreferrer" className="font-sans text-[12px] text-white/90 hover:text-[#C9912B] transition-colors">LinkedIn</a>
          </div>
        </div>
        <div className="h-px bg-white/30 mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-sans text-[12px] text-white/90">© 2026 Minerva Partners S.r.l.</span>
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
            <Link href="/privacy-policy" className="font-sans text-[11px] text-white/50 hover:text-[#D4AF37] transition-colors">{t('privacy')}</Link>
            <span className="text-white/20">|</span>
            <Link href="/cookie-policy" className="font-sans text-[11px] text-white/50 hover:text-[#D4AF37] transition-colors">{t('cookiePolicy')}</Link>
            <span className="text-white/20">|</span>
            <button
              onClick={() => {
                const w = window as Window & { MinervaConsent?: { showPreferences: () => void } }
                w.MinervaConsent?.showPreferences()
              }}
              className="font-sans text-[11px] text-white/50 hover:text-[#D4AF37] transition-colors bg-transparent border-none cursor-pointer p-0"
            >
              {t('cookiePreferences')}
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
