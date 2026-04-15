'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

export function LandingNavbar({ onAccedi }: { onAccedi: () => void }) {
  const t = useTranslations('landing.nav')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 300)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: scrolled ? 'rgba(10, 15, 28, 0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(197, 160, 89, 0.08)' : '1px solid transparent',
        transition: 'background 0.6s, backdrop-filter 0.6s, border-bottom 0.6s',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 flex items-center justify-between h-16 md:h-[72px]">
        {/* Logo — fades in when scrolled past hero */}
        <div
          className="flex items-center gap-2"
          style={{
            opacity: scrolled ? 1 : 0,
            transform: scrolled ? 'translateY(0)' : 'translateY(-10px)',
            transition: 'opacity 0.5s ease, transform 0.5s ease',
          }}
        >
          <Image
            src="/images/logo-minerva.png"
            alt="Minerva Partners"
            width={120}
            height={36}
            className="h-8 w-auto object-contain"
            priority
          />
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#"
            className="hidden sm:block hover:text-white hover:border-white/20"
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: 11,
              fontWeight: 500,
              color: 'rgba(255,255,255,0.6)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '7px 16px',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 4,
              transition: 'all 0.3s',
              textDecoration: 'none',
            }}
          >
            {t('cogito')}
          </a>
          <button
            onClick={onAccedi}
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: 11,
              fontWeight: 600,
              color: '#0f1829',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '7px 20px',
              background: 'linear-gradient(135deg, #C5A059, #d4af61)',
              borderRadius: 4,
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s',
            }}
          >
            {t('access')}
          </button>
        </div>
      </div>
    </motion.nav>
  )
}
