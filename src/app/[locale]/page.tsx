'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { LandingNavbar } from '@/components/landing/LandingNavbar'
import { HeroSection } from '@/components/landing/HeroSection'
import { SoluzioniHeader } from '@/components/landing/SoluzioniHeader'
import { ServiceCards } from '@/components/landing/ServiceCards'
import { ManifestoSection } from '@/components/landing/ManifestoSection'
import { CTASection } from '@/components/landing/CTASection'
import { LandingFooter } from '@/components/landing/LandingFooter'

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [phase, setPhase] = useState<'logo' | 'shimmer' | 'rise' | 'done'>('logo')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('shimmer'), 1200)
    const t2 = setTimeout(() => setPhase('rise'), 1900)
    const t3 = setTimeout(() => setPhase('done'), 2600)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  return (
    <div className="landing-root" style={{ minHeight: '100vh', position: 'relative' }}>
      {/* ═══ Silk overlay ═══ */}
      <div className="silk-global" />
      <div className="silk-global silk-global--2" />
      <div className="silk-global silk-global--3" />

      {/* ═══ INTRO — logo center → shimmer → rises away ═══ */}
      <AnimatePresence>
        {phase !== 'done' && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center"
            style={{ background: '#0a0f1c' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          >
            <motion.div
              className="relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={
                phase === 'rise'
                  ? { opacity: 0, scale: 0.6, y: -300 }
                  : { opacity: 1, scale: 1, y: 0 }
              }
              transition={{
                duration: phase === 'rise' ? 0.7 : 0.9,
                delay: phase === 'logo' ? 0.3 : 0,
                ease: [0.23, 1, 0.32, 1],
              }}
            >
              <Image
                src="/images/logo-minerva.png"
                alt="Minerva Partners"
                width={320}
                height={160}
                className="h-auto object-contain"
                style={{ width: 'clamp(220px, 45vw, 320px)' }}
                priority
              />
              {(phase === 'shimmer' || phase === 'rise') && (
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ x: '-100%' }}
                  animate={{ x: '250%' }}
                  transition={{ duration: 0.9, ease: 'easeInOut' }}
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(197,160,89,0.5) 50%, transparent 100%)',
                    mixBlendMode: 'overlay',
                  }}
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ CONTENT ═══ */}
      <motion.div
        style={{ position: 'relative', zIndex: 1 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 'done' ? 1 : 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <LandingNavbar onAccedi={() => setModalOpen(true)} />
        <HeroSection />
        <SoluzioniHeader />
        <ServiceCards />
        <ManifestoSection />
        <CTASection
          modalOpen={modalOpen}
          onOpenModal={() => setModalOpen(true)}
          onCloseModal={() => setModalOpen(false)}
        />
        <LandingFooter />
      </motion.div>

      <style>{`
        .landing-root {
          background: #0a0f1c;
        }

        .silk-global {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          opacity: 0.045;
          background:
            radial-gradient(ellipse 80% 50% at 15% 25%, rgba(197,160,89,0.5) 0%, transparent 60%),
            radial-gradient(ellipse 60% 70% at 85% 75%, rgba(197,160,89,0.35) 0%, transparent 55%),
            radial-gradient(ellipse 50% 40% at 50% 50%, rgba(197,160,89,0.2) 0%, transparent 50%);
          animation: silk-1 14s ease-in-out infinite;
        }
        .silk-global--2 {
          opacity: 0.035;
          background:
            radial-gradient(ellipse 70% 60% at 65% 20%, rgba(197,160,89,0.4) 0%, transparent 55%),
            radial-gradient(ellipse 55% 80% at 25% 80%, rgba(212,175,97,0.3) 0%, transparent 50%);
          animation: silk-2 20s ease-in-out infinite;
        }
        .silk-global--3 {
          opacity: 0.02;
          background:
            radial-gradient(ellipse 100% 40% at 40% 60%, rgba(197,160,89,0.5) 0%, transparent 50%),
            radial-gradient(ellipse 60% 60% at 80% 30%, rgba(180,140,60,0.3) 0%, transparent 45%);
          animation: silk-3 25s ease-in-out infinite;
        }

        @keyframes silk-1 {
          0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
          33% { transform: translate(40px, -30px) scale(1.06) rotate(0.5deg); }
          66% { transform: translate(-30px, 20px) scale(0.96) rotate(-0.3deg); }
        }
        @keyframes silk-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-35px, 35px) scale(1.08) rotate(0.8deg); }
        }
        @keyframes silk-3 {
          0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
          40% { transform: translate(25px, 15px) scale(1.04) rotate(-0.5deg); }
          80% { transform: translate(-15px, -25px) scale(0.98) rotate(0.3deg); }
        }
      `}</style>
    </div>
  )
}
