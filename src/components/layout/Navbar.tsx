'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'

export function Navbar() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const pathname = usePathname()
  const otherLocale = locale === 'it' ? 'en' : 'it'
  const isHome = pathname === '/' || pathname === '/cogito'
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (isHome) return null

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0D1520]/95 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.3)]'
          : 'bg-[#0D1520]/95 backdrop-blur-md'
      }`}
      style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 flex items-center justify-between h-16 md:h-[72px]">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/images/logo-minerva.png"
            alt="Minerva Partners"
            width={160}
            height={44}
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Cogito */}
          <a
            href="https://cogito.minervapartners.it"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[11px] font-semibold tracking-[0.12em] uppercase text-white/70 hover:text-[#C9912B] transition-colors duration-300"
          >
            {t('cogito')}
          </a>

          {/* Accedi */}
          <a
            href="/portal"
            className="font-sans text-[10px] font-semibold tracking-[0.1em] uppercase transition-all duration-300 hover:border-[#c5a35a]"
            style={{
              color: '#c5a35a',
              border: '1px solid rgba(197,163,90,0.3)',
              padding: '6px 16px',
              background: 'transparent',
              borderRadius: 4,
              textDecoration: 'none',
            }}
          >
            {t('access')}
          </a>

          {/* Lang switch */}
          <Link
            href={pathname}
            locale={otherLocale}
            className="flex items-center justify-center w-8 h-8 rounded-full border border-white/10 font-sans text-[10px] font-semibold tracking-wider text-white/80 hover:text-white hover:border-[#C9912B]/30 transition-all duration-300"
          >
            {t('langSwitch')}
          </Link>
        </div>
      </div>
    </nav>
  )
}
