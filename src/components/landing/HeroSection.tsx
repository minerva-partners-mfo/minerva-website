'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { RadarOrbit } from './RadarOrbit'

export function HeroSection() {
  const t = useTranslations('landing')
  const words = t('hero.title').split(' ')
  const heroRef = useRef<HTMLElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return
      const rect = heroRef.current.getBoundingClientRect()
      const progress = Math.min(1, Math.max(0, -rect.top / (rect.height * 0.5)))
      setScrollProgress(progress)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (window.innerWidth < 768) return
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouse, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  const logoScale = 1 - scrollProgress * 0.6
  const logoOpacity = 1 - scrollProgress * 1.2

  return (
    <section
      ref={heroRef}
      className="relative flex flex-col items-center justify-center px-6 overflow-hidden land-section"
      style={{ minHeight: '100vh' }}
    >
      {/* Cursor gold glow (desktop) */}
      <div
        className="hidden md:block pointer-events-none fixed z-[5]"
        style={{
          left: mousePos.x - 200,
          top: mousePos.y - 200,
          width: 400,
          height: 400,
          background: 'radial-gradient(circle, rgba(197,160,89,0.06) 0%, transparent 60%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          transition: 'left 0.3s ease-out, top 0.3s ease-out',
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center max-w-[760px]">
        {/* Logo + Radar orbit behind it */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
          className="relative flex items-center justify-center mb-6"
          style={{
            transform: `scale(${logoScale})`,
            opacity: Math.max(0, logoOpacity),
            transition: 'none',
          }}
        >
          {/* Radar — large, behind the logo */}
          <RadarOrbit size={360} />
          <Image
            src="/images/logo-minerva.png"
            alt="Minerva Partners"
            width={220}
            height={88}
            className="h-auto object-contain relative z-10"
            style={{ width: 'clamp(160px, 35vw, 220px)' }}
            priority
          />
        </motion.div>

        {/* Title */}
        <h1 style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: 'clamp(26px, 4.5vw, 48px)', color: 'rgba(255,255,255,0.9)', lineHeight: 1.35, margin: 0 }}>
          {words.map((word, i) => (
            <motion.span key={i} className="inline-block mr-[0.3em]" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.8 + i * 0.07, ease: [0.23, 1, 0.32, 1] }}>
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle with shimmer */}
        <motion.div className="subtitle-shimmer" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 2 }} style={{ marginTop: 28 }}>
          <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 'clamp(14px, 2.2vw, 20px)', fontWeight: 600, color: '#C5A059', letterSpacing: '0.35em', textTransform: 'uppercase' }}>
            {t('hero.subtitle')}
          </span>
        </motion.div>

        {/* Flanking lines */}
        <motion.div className="flex items-center gap-4 mt-4" initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ duration: 1, delay: 2.4 }}>
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 2.4 }} style={{ width: 60, height: 1, background: 'linear-gradient(90deg, transparent, #C5A059)', transformOrigin: 'right' }} />
          <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#C5A059', opacity: 0.6 }} />
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 2.4 }} style={{ width: 60, height: 1, background: 'linear-gradient(90deg, #C5A059, transparent)', transformOrigin: 'left' }} />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div className="mt-14 flex flex-col items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 2.8 }}>
          <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 9, color: '#C5A059', letterSpacing: '0.25em', textTransform: 'uppercase', opacity: 0.5 }}>
            {t('nav.scroll')}
          </span>
          <motion.div
            style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, #C5A059, transparent)', transformOrigin: 'top' }}
            animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            style={{ width: 5, height: 5, borderRadius: '50%', background: '#C5A059' }}
            animate={{ opacity: [0.15, 0.5, 0.15], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>

      <style>{`
        .subtitle-shimmer { position: relative; overflow: hidden; }
        .subtitle-shimmer::after {
          content: ''; position: absolute; top: 0; left: -100%; width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          animation: shimmer-pass 4s ease-in-out infinite; animation-delay: 3s;
        }
        @keyframes shimmer-pass { 0% { left: -100%; } 40%, 100% { left: 200%; } }
      `}</style>
    </section>
  )
}
