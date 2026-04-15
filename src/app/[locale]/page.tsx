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
    <div style={{ background: '#0f1829', minHeight: '100vh' }}>
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
  )
}
