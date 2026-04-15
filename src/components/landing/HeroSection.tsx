'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

export function HeroSection() {
  const t = useTranslations('landing')
  const words = t('hero.title').split(' ')

  return (
    <section
      className="relative flex flex-col items-center justify-center px-6 overflow-hidden"
      style={{ minHeight: '100vh' }}
    >
      <div className="relative z-10 flex flex-col items-center text-center max-w-[760px]">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
          className="mb-2"
        >
          <Image
            src="/images/logo-minerva.png"
            alt="Minerva Partners"
            width={200}
            height={80}
            className="h-auto object-contain"
            style={{ width: 'clamp(140px, 30vw, 200px)' }}
            priority
          />
        </motion.div>

        {/* ═══ AURA SONAR EFFECT — oro ═══ */}
        <motion.div
          className="relative flex items-center justify-center"
          style={{ width: 280, height: 180, marginBottom: 8 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.6 }}
        >
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
            viewBox="0 0 280 180"
          >
            {/* Sonar waves */}
            <circle cx="140" cy="90" r="12" fill="none" stroke="#C5A059" strokeWidth="0.8" opacity="0.4" className="aura-sonar" />
            <circle cx="140" cy="90" r="12" fill="none" stroke="#C5A059" strokeWidth="0.8" opacity="0.4" className="aura-sonar aura-delay-1" />
            <circle cx="140" cy="90" r="12" fill="none" stroke="#C5A059" strokeWidth="0.8" opacity="0.4" className="aura-sonar aura-delay-2" />

            {/* Outer dashed ring — slow spin */}
            <circle cx="140" cy="90" r="70" fill="none" stroke="rgba(197,160,89,0.1)" strokeWidth="0.8" strokeDasharray="8 16" className="aura-spin-slow" />

            {/* Inner dashed ring — reverse */}
            <circle cx="140" cy="90" r="48" fill="none" stroke="rgba(197,160,89,0.15)" strokeWidth="0.8" strokeDasharray="4 8" className="aura-spin-reverse" />

            {/* Crosshair markers */}
            <g className="aura-spin-slow" style={{ transformOrigin: '140px 90px' }}>
              <line x1="60" y1="90" x2="68" y2="90" stroke="rgba(197,160,89,0.2)" strokeWidth="0.8" />
              <line x1="212" y1="90" x2="220" y2="90" stroke="rgba(197,160,89,0.2)" strokeWidth="0.8" />
              <line x1="140" y1="12" x2="140" y2="20" stroke="rgba(197,160,89,0.2)" strokeWidth="0.8" />
              <line x1="140" y1="160" x2="140" y2="168" stroke="rgba(197,160,89,0.2)" strokeWidth="0.8" />
            </g>

            {/* Beams coming into center */}
            <path d="M 0 30 C 60 30, 80 90, 140 90" fill="none" stroke="rgba(197,160,89,0.06)" strokeWidth="0.8" />
            <path d="M 0 30 C 60 30, 80 90, 140 90" fill="none" stroke="#C5A059" strokeWidth="1" className="aura-beam" opacity="0.4" />

            <path d="M 280 30 C 220 30, 200 90, 140 90" fill="none" stroke="rgba(197,160,89,0.06)" strokeWidth="0.8" />
            <path d="M 280 30 C 220 30, 200 90, 140 90" fill="none" stroke="#C5A059" strokeWidth="1" className="aura-beam aura-beam-2" opacity="0.4" />

            <path d="M 0 150 C 60 150, 80 90, 140 90" fill="none" stroke="rgba(197,160,89,0.06)" strokeWidth="0.8" />
            <path d="M 0 150 C 60 150, 80 90, 140 90" fill="none" stroke="#C5A059" strokeWidth="1" className="aura-beam aura-beam-3" opacity="0.4" />

            <path d="M 280 150 C 220 150, 200 90, 140 90" fill="none" stroke="rgba(197,160,89,0.06)" strokeWidth="0.8" />
            <path d="M 280 150 C 220 150, 200 90, 140 90" fill="none" stroke="#C5A059" strokeWidth="1" className="aura-beam aura-beam-4" opacity="0.4" />

            {/* Core */}
            <circle cx="140" cy="90" r="6" fill="#0a0f1c" stroke="#C5A059" strokeWidth="1.2" />
            <circle cx="140" cy="90" r="3" fill="#C5A059" className="aura-pulse-core" />
          </svg>
        </motion.div>

        {/* Title */}
        <h1
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontWeight: 300,
            fontSize: 'clamp(26px, 4.5vw, 48px)',
            color: 'rgba(255,255,255,0.9)',
            lineHeight: 1.35,
            margin: 0,
          }}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-[0.3em]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.8 + i * 0.07,
                ease: [0.23, 1, 0.32, 1],
              }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.div
          className="subtitle-shimmer"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
          style={{ marginTop: 28 }}
        >
          <span
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: 'clamp(14px, 2.2vw, 20px)',
              fontWeight: 600,
              color: '#C5A059',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
            }}
          >
            {t('hero.subtitle')}
          </span>
        </motion.div>

        {/* Flanking lines */}
        <motion.div
          className="flex items-center gap-4 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1, delay: 2.4 }}
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 2.4 }}
            style={{ width: 60, height: 1, background: 'linear-gradient(90deg, transparent, #C5A059)', transformOrigin: 'right' }}
          />
          <motion.div style={{ width: 4, height: 4, borderRadius: '50%', background: '#C5A059', opacity: 0.6 }} />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 2.4 }}
            style={{ width: 60, height: 1, background: 'linear-gradient(90deg, #C5A059, transparent)', transformOrigin: 'left' }}
          />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="mt-14 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.8 }}
        >
          <motion.span
            style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 9, color: '#C5A059', letterSpacing: '0.25em', textTransform: 'uppercase', opacity: 0.5 }}
          >
            {t('nav.scroll')}
          </motion.span>
          <motion.div
            style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, #C5A059, transparent)', borderRadius: 1, transformOrigin: 'top' }}
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
        /* ═══ Aura sonar + orbit — gold ═══ */
        @keyframes aura-sonar-wave {
          0% { r: 12; opacity: 0.5; stroke-width: 0.8; }
          100% { r: 80; opacity: 0; stroke-width: 0; }
        }
        .aura-sonar { animation: aura-sonar-wave 3s cubic-bezier(0, 0, 0.2, 1) infinite; }
        .aura-delay-1 { animation-delay: 1s; }
        .aura-delay-2 { animation-delay: 2s; }

        @keyframes aura-spin { to { transform: rotate(360deg); } }
        .aura-spin-slow { animation: aura-spin 20s linear infinite; transform-origin: 140px 90px; }
        .aura-spin-reverse { animation: aura-spin 15s linear infinite reverse; transform-origin: 140px 90px; }

        @keyframes aura-beam-flow {
          0% { stroke-dashoffset: 800; }
          100% { stroke-dashoffset: 0; }
        }
        .aura-beam { stroke-dasharray: 60 800; stroke-linecap: round; animation: aura-beam-flow 3s linear infinite; }
        .aura-beam-2 { animation-delay: -0.8s; }
        .aura-beam-3 { animation-delay: -1.5s; }
        .aura-beam-4 { animation-delay: -2.2s; }

        .aura-pulse-core { animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite; }

        /* Shimmer on subtitle */
        .subtitle-shimmer { position: relative; overflow: hidden; }
        .subtitle-shimmer::after {
          content: '';
          position: absolute;
          top: 0; left: -100%; width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          animation: shimmer-pass 4s ease-in-out infinite;
          animation-delay: 3s;
        }
        @keyframes shimmer-pass {
          0% { left: -100%; }
          40%, 100% { left: 200%; }
        }
      `}</style>
    </section>
  )
}
