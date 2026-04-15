'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

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
  const logoY = scrollProgress * -120

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
        {/* Logo — shrinks and fades on scroll */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
          className="mb-2"
          style={{
            transform: `scale(${logoScale}) translateY(${logoY}px)`,
            opacity: Math.max(0, logoOpacity),
            transition: 'none',
          }}
        >
          <Image
            src="/images/logo-minerva.png"
            alt="Minerva Partners"
            width={220}
            height={88}
            className="h-auto object-contain"
            style={{ width: 'clamp(160px, 35vw, 220px)' }}
            priority
          />
        </motion.div>

        {/* Sonar effect */}
        <motion.div
          className="relative flex items-center justify-center"
          style={{ width: 280, height: 160, marginBottom: 12 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.6 }}
        >
          <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" viewBox="0 0 280 160">
            <circle cx="140" cy="80" r="12" fill="none" stroke="#C5A059" strokeWidth="0.8" opacity="0.4" className="aura-sonar" />
            <circle cx="140" cy="80" r="12" fill="none" stroke="#C5A059" strokeWidth="0.8" opacity="0.4" className="aura-sonar aura-delay-1" />
            <circle cx="140" cy="80" r="12" fill="none" stroke="#C5A059" strokeWidth="0.8" opacity="0.4" className="aura-sonar aura-delay-2" />

            <circle cx="140" cy="80" r="65" fill="none" stroke="rgba(197,160,89,0.08)" strokeWidth="0.6" strokeDasharray="8 16" className="aura-spin-slow" />
            <circle cx="140" cy="80" r="42" fill="none" stroke="rgba(197,160,89,0.12)" strokeWidth="0.6" strokeDasharray="4 8" className="aura-spin-reverse" />

            <path d="M 0 20 C 50 20, 80 80, 140 80" fill="none" stroke="#C5A059" strokeWidth="0.8" className="aura-beam" opacity="0.3" />
            <path d="M 280 20 C 230 20, 200 80, 140 80" fill="none" stroke="#C5A059" strokeWidth="0.8" className="aura-beam aura-beam-2" opacity="0.3" />
            <path d="M 0 140 C 50 140, 80 80, 140 80" fill="none" stroke="#C5A059" strokeWidth="0.8" className="aura-beam aura-beam-3" opacity="0.3" />
            <path d="M 280 140 C 230 140, 200 80, 140 80" fill="none" stroke="#C5A059" strokeWidth="0.8" className="aura-beam aura-beam-4" opacity="0.3" />

            <circle cx="140" cy="80" r="5" fill="#0a0f1c" stroke="#C5A059" strokeWidth="1" />
            <circle cx="140" cy="80" r="2.5" fill="#C5A059" className="aura-pulse-core" />
          </svg>
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
        @keyframes aura-sonar-wave {
          0% { r: 12; opacity: 0.5; stroke-width: 0.8; }
          100% { r: 70; opacity: 0; stroke-width: 0; }
        }
        .aura-sonar { animation: aura-sonar-wave 3s cubic-bezier(0, 0, 0.2, 1) infinite; }
        .aura-delay-1 { animation-delay: 1s; }
        .aura-delay-2 { animation-delay: 2s; }

        @keyframes aura-spin { to { transform: rotate(360deg); } }
        .aura-spin-slow { animation: aura-spin 20s linear infinite; transform-origin: 140px 80px; }
        .aura-spin-reverse { animation: aura-spin 15s linear infinite reverse; transform-origin: 140px 80px; }

        @keyframes aura-beam-flow { 0% { stroke-dashoffset: 800; } 100% { stroke-dashoffset: 0; } }
        .aura-beam { stroke-dasharray: 50 800; stroke-linecap: round; animation: aura-beam-flow 3s linear infinite; }
        .aura-beam-2 { animation-delay: -0.8s; }
        .aura-beam-3 { animation-delay: -1.5s; }
        .aura-beam-4 { animation-delay: -2.2s; }
        .aura-pulse-core { animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite; }

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
