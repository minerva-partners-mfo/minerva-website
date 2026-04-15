'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

export function LandingNavbar({ visible }: { visible: boolean }) {
  const t = useTranslations('landing')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToAccess = () => {
    document.getElementById('cta-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-[100]"
      initial={{ opacity: 0, y: -20 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      style={{
        background: 'rgba(15, 24, 41, 0.95)',
        backdropFilter: 'blur(8px)',
        borderBottom: scrolled
          ? '0.5px solid rgba(197,160,89,0.08)'
          : '0.5px solid transparent',
        boxShadow: scrolled
          ? '0 1px 20px rgba(197,160,89,0.04)'
          : 'none',
        transition: 'border-bottom 0.3s, box-shadow 0.3s',
      }}
    >
      <div className="flex items-center justify-between mx-auto px-5 md:px-10 py-3 md:py-4 max-w-[1400px]">
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <Image
            src="/images/logo-minerva.png"
            alt="Minerva Partners"
            width={160}
            height={44}
            className="h-10 w-auto object-contain"
            priority
          />
        </div>

        {/* Right: Access button */}
        <button
          onClick={scrollToAccess}
          className="transition-all duration-300 cursor-pointer"
          style={{
            border: '0.5px solid #C5A059',
            color: '#C5A059',
            padding: '9px 24px',
            borderRadius: 8,
            fontFamily: 'var(--font-dm-sans)',
            fontSize: 11,
            letterSpacing: '0.12em',
            textTransform: 'uppercase' as const,
            background: 'transparent',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget
            el.style.background = '#C5A059'
            el.style.color = '#0f1829'
            el.style.boxShadow = '0 0 30px rgba(197,160,89,0.3)'
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget
            el.style.background = 'transparent'
            el.style.color = '#C5A059'
            el.style.boxShadow = 'none'
          }}
        >
          {t('nav.access')}
        </button>
      </div>
    </motion.nav>
  )
}
