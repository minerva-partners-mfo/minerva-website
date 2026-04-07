'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'

const NAV_GROUPS = [
  {
    key: 'modello',
    items: [
      { key: 'problema', href: '/problema' },
      { key: 'comeFunziona', href: '/come-funziona' },
      { key: 'posizionamento', href: '/posizionamento' },
      { key: 'settori', href: '/settori' },
    ],
  },
  {
    key: 'servizi',
    items: [
      { key: 'soluzioni', href: '/soluzioni' },
      { key: 'hub', href: '/hub' },
      { key: 'ecosistema', href: '/ecosistema' },
      { key: 'abilitatori', href: '/abilitatori' },
    ],
  },
  {
    key: 'fiducia',
    items: [
      { key: 'codice', href: '/codice' },
      { key: 'veritas', href: '/veritas' },
      { key: 'selezione', href: '/selezione' },
    ],
  },
  {
    key: 'relazioni',
    items: [
      { key: 'eventi', href: '/eventi' },
      { key: 'pointZero', href: '/point-zero' },
      { key: 'clubDeal', href: '/club-deal' },
      { key: 'nextGen', href: '/next-gen' },
    ],
  },
  {
    key: 'chiSiamo',
    items: [
      { key: 'pensiero', href: '/pensiero' },
      { key: 'strategia', href: '/strategia' },
      { key: 'management', href: '/management' },
      { key: 'contatti', href: '/contatti' },
    ],
  },
] as const

export function Navbar() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const pathname = usePathname()
  const otherLocale = locale === 'it' ? 'en' : 'it'
  const [scrolled, setScrolled] = useState(false)
  const [openGroup, setOpenGroup] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleGroupEnter = useCallback((key: string) => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    setOpenGroup(key)
  }, [])

  const handleGroupLeave = useCallback(() => {
    closeTimerRef.current = setTimeout(() => setOpenGroup(null), 150)
  }, [])

  const closeMobile = useCallback(() => {
    setMobileOpen(false)
    setMobileExpanded(null)
  }, [])

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0D1520] backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.3)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 flex items-center justify-between h-16 md:h-[72px]">

          {/* Logo — image only, no text */}
          <Link href="/" className="relative flex items-center shrink-0" onClick={closeMobile}>
            <Image
              src="/images/logoPNG.png"
              alt="Minerva Partners"
              width={140}
              height={38}
              className="h-9 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_GROUPS.map((group) => (
              <div
                key={group.key}
                className="relative"
                onMouseEnter={() => handleGroupEnter(group.key)}
                onMouseLeave={handleGroupLeave}
              >
                <button
                  className={`relative px-3.5 py-2 font-sans text-[11px] font-semibold tracking-[0.12em] uppercase transition-colors duration-300 ${
                    openGroup === group.key ? 'text-[#C9912B]' : 'text-white hover:text-[#C9912B]'
                  }`}
                >
                  {t(`groups.${group.key}`)}
                  <span
                    className={`absolute bottom-0.5 left-3.5 right-3.5 h-[1.5px] bg-[#C9912B] transition-transform duration-300 origin-left ${
                      openGroup === group.key ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </button>

                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-200 ${
                    openGroup === group.key
                      ? 'opacity-100 translate-y-0 pointer-events-auto'
                      : 'opacity-0 -translate-y-1 pointer-events-none'
                  }`}
                >
                  <div className="min-w-[220px] rounded-lg border border-white/[0.06] bg-[#0D1520]/95 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.4)] py-2">
                    {group.items.map((item) => (
                      <Link
                        key={item.key}
                        href={item.href}
                        className="group flex items-center gap-3 px-5 py-2.5 transition-colors duration-200 hover:bg-white/[0.03]"
                        onClick={() => setOpenGroup(null)}
                      >
                        <span className="w-1 h-1 rounded-full bg-transparent group-hover:bg-[#C9912B] transition-colors duration-200" />
                        <span className="font-sans text-[12px] text-white/70 group-hover:text-white transition-colors duration-200">
                          {t(`items.${item.key}`)}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <Link
              href={pathname}
              locale={otherLocale}
              className="hidden lg:flex items-center justify-center w-8 h-8 rounded-full border border-white/10 font-sans text-[10px] font-semibold tracking-wider text-white/80 hover:text-white hover:border-[#C9912B]/30 transition-all duration-300"
            >
              {t('langSwitch')}
            </Link>

            <Link
              href="/contatti"
              className="hidden lg:block px-5 py-2 bg-[#C9912B] text-[#0D1520] font-sans text-[10px] font-bold tracking-[0.15em] uppercase rounded-full hover:bg-[#D4A94E] hover:shadow-[0_0_20px_rgba(201,145,43,0.3)] transition-all duration-300"
            >
              {t('cta')}
            </Link>

            <button
              className="lg:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-[5px]"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={t('menuLabel')}
            >
              <span className={`w-5 h-[1.5px] bg-white/60 transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
              <span className={`w-5 h-[1.5px] bg-white/60 transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`w-5 h-[1.5px] bg-white/60 transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#0D1520]/98 backdrop-blur-lg transition-opacity duration-300 lg:hidden ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="pt-20 px-6 pb-8 h-full overflow-y-auto">
          {NAV_GROUPS.map((group) => (
            <div key={group.key} className="border-b border-white/[0.06] last:border-0">
              <button
                className="w-full flex items-center justify-between py-4"
                onClick={() => setMobileExpanded(mobileExpanded === group.key ? null : group.key)}
              >
                <span className="font-sans text-[11px] font-semibold tracking-[0.2em] uppercase text-[#C9912B]">
                  {t(`groups.${group.key}`)}
                </span>
                <span className={`text-white/20 text-xs transition-transform duration-200 ${mobileExpanded === group.key ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${mobileExpanded === group.key ? 'max-h-[400px] pb-3' : 'max-h-0'}`}>
                {group.items.map((item) => (
                  <Link key={item.key} href={item.href} className="block pl-4 py-2.5 font-sans text-[13px] text-white/40 hover:text-white/80 transition-colors" onClick={closeMobile}>
                    {t(`items.${item.key}`)}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <div className="mt-8">
            <Link href="/contatti" className="block text-center px-6 py-3.5 bg-[#C9912B] text-[#0D1520] font-sans text-[11px] font-bold tracking-[0.15em] uppercase rounded-md" onClick={closeMobile}>
              {t('cta')}
            </Link>
          </div>
          <div className="mt-4 flex justify-center">
            <Link href={pathname} locale={otherLocale} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 font-sans text-[11px] font-semibold tracking-wider text-white/80 hover:text-white hover:border-[#C9912B]/30 transition-all duration-300" onClick={closeMobile}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9912B]/50" />
              {t('langSwitch')}
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
