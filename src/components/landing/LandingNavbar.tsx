'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

function ColonnadeLogo({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="8" y="88" width="84" height="4" rx="1" fill="#C5A059" />
      <rect x="8" y="16" width="84" height="6" rx="1" fill="#C5A059" />
      <path d="M50 4 L88 16 L12 16 Z" fill="#C5A059" opacity="0.8" />
      {[18, 28, 40, 60, 72, 82].map((x) => (
        <rect key={x} x={x - 2} y="22" width="4" height="66" rx="1.5" fill="#C5A059" />
      ))}
    </svg>
  )
}

export function LandingNavbar({ onAccedi }: { onAccedi: () => void }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(15, 24, 41, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled
          ? '1px solid rgba(197, 160, 89, 0.08)'
          : '1px solid transparent',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 flex items-center justify-between h-16 md:h-[72px]">
        <div className="flex items-center gap-3">
          <ColonnadeLogo size={30} />
          <span
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 14,
              fontWeight: 600,
              color: '#C5A059',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            Minerva Partners
          </span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#"
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
            className="hidden sm:block hover:text-white hover:border-white/20"
          >
            Cogito / Insight
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
            Accedi
          </button>
        </div>
      </div>
    </motion.nav>
  )
}
