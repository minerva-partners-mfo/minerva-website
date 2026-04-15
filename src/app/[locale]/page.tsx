'use client'

import { useState } from 'react'
import { LandingNavbar } from '@/components/landing/LandingNavbar'
import { HeroSection } from '@/components/landing/HeroSection'
import { SoluzioniHeader } from '@/components/landing/SoluzioniHeader'
import { ServiceCards } from '@/components/landing/ServiceCards'
import { ManifestoSection } from '@/components/landing/ManifestoSection'
import { CTASection } from '@/components/landing/CTASection'
import { LandingFooter } from '@/components/landing/LandingFooter'

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="landing-root" style={{ minHeight: '100vh', position: 'relative' }}>
      {/* ═══ Silk overlay — uniforme su tutta la pagina ═══ */}
      <div className="silk-global" />
      <div className="silk-global silk-global--2" />
      <div className="silk-global silk-global--3" />

      <div style={{ position: 'relative', zIndex: 1 }}>
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
      </div>

      <style>{`
        .landing-root {
          background: #0a0f1c;
        }

        /* ═══ SILK — 3 layer sovrapposti, oro e navy ═══ */
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
