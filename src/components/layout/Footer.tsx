'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { usePathname } from '@/i18n/navigation'

export function Footer() {
  const t = useTranslations('footer')
  const pathname = usePathname()

  if (pathname === '/') return null

  return (
    <footer className="py-12 md:py-16 px-4 md:px-6" style={{ backgroundColor: '#1A2744' }}>
      <div className="max-w-[1100px] mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 mb-10">
          <Image
            src="/images/Progetto senza titolo (1).png"
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
          <div className="flex items-center gap-6">
            <a href="#" className="font-sans text-[12px] text-white/90 hover:text-[#C9912B] transition-colors">{t('privacy')}</a>
            <a href="#" className="font-sans text-[12px] text-white/90 hover:text-[#C9912B] transition-colors">{t('disclaimer')}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
