'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { LandingNavbar } from '@/components/landing/LandingNavbar'
import { HeroSection } from '@/components/landing/HeroSection'
import { FluidCards } from '@/components/landing/FluidCards'
import { ManifestoSection } from '@/components/landing/ManifestoSection'
import { CTASection } from '@/components/landing/CTASection'
import { LandingFooter } from '@/components/landing/LandingFooter'

export default function HomePage() {
  const [phase, setPhase] = useState<'logo' | 'shimmer' | 'rise' | 'done'>('logo')

  useEffect(() => {
    // T=300ms: logo appears (handled by framer-motion initial)
    const t1 = setTimeout(() => setPhase('shimmer'), 1300) // after logo fade-in (1s)
    const t2 = setTimeout(() => setPhase('rise'), 2000)    // shimmer done, logo rises
    const t3 = setTimeout(() => setPhase('done'), 2800)    // rise complete, show content
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  return (
    <div style={{ background: '#0f1829', minHeight: '100vh' }}>
      {/* ═══ INTRO OVERLAY — logo center → shimmer → rises away ═══ */}
      <AnimatePresence>
        {phase !== 'done' && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center"
            style={{ background: '#0f1829' }}
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
                duration: phase === 'rise' ? 0.8 : 1,
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
              {/* Shimmer */}
              {(phase === 'shimmer' || phase === 'rise') && (
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ x: '-100%' }}
                  animate={{ x: '250%' }}
                  transition={{ duration: 1, ease: 'easeInOut' }}
                  style={{
                    background:
                      'linear-gradient(90deg, transparent 0%, rgba(197,160,89,0.5) 50%, transparent 100%)',
                    mixBlendMode: 'overlay',
                  }}
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ NAVBAR — appears after intro ═══ */}
      <LandingNavbar visible={phase === 'done'} />

      {/* ═══ CONTENT — fades in after intro ═══ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 'done' ? 1 : 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <HeroSection started={phase === 'done'} />
        <FluidCards />
        <ManifestoSection />
        <CTASection />
        <LandingFooter />
      </motion.div>
    </div>
  )
}
