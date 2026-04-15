'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { RevealSection } from './RevealSection'
import Image from 'next/image'

type Step = 'select' | 'form' | 'confirm'
type Mode = 'independent' | 'invite' | null

export function CTASection() {
  const t = useTranslations('landing.cta')
  const [modalOpen, setModalOpen] = useState(false)
  const [step, setStep] = useState<Step>('select')
  const [mode, setMode] = useState<Mode>(null)
  const [submitted, setSubmitted] = useState(false)

  const openModal = () => {
    setModalOpen(true)
    setStep('select')
    setMode(null)
    setSubmitted(false)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  const selectMode = (m: Mode) => {
    setMode(m)
    setStep('form')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setStep('confirm')
  }

  const inputStyle: React.CSSProperties = {
    background: '#0a1e2e',
    border: '0.5px solid rgba(197,160,89,0.20)',
    borderRadius: 10,
    padding: '12px 14px',
    color: 'white',
    fontFamily: 'var(--font-dm-sans)',
    fontSize: 13,
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
  }

  const labelStyle: React.CSSProperties = {
    fontFamily: 'var(--font-dm-sans)',
    fontSize: 10,
    color: 'rgba(255,255,255,0.50)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: 6,
    display: 'block',
  }

  return (
    <>
      <section
        id="cta-section"
        className="relative px-6 text-center"
        style={{
          paddingTop: 60,
          paddingBottom: 100,
          background: '#0f1829',
        }}
      >
        <RevealSection>
          {/* Pulsing CTA button */}
          <motion.button
            onClick={openModal}
            className="cursor-pointer"
            animate={{
              boxShadow: [
                '0 0 20px rgba(197,160,89,0.1)',
                '0 0 40px rgba(197,160,89,0.2)',
                '0 0 20px rgba(197,160,89,0.1)',
              ],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              background: 'transparent',
              border: '1px solid #C5A059',
              color: '#C5A059',
              padding: '18px 56px',
              borderRadius: 10,
              fontFamily: 'var(--font-cormorant)',
              fontSize: 16,
              fontWeight: 600,
              letterSpacing: '0.1em',
            }}
            whileHover={{
              backgroundColor: '#C5A059',
              color: '#0f1829',
              y: -2,
              boxShadow: '0 10px 40px rgba(197,160,89,0.3)',
            }}
          >
            {t('button')}
          </motion.button>

          <p
            className="mt-5"
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontStyle: 'italic',
              fontSize: 12,
              color: 'rgba(255,255,255,0.50)',
              letterSpacing: '0.08em',
            }}
          >
            {t('tagline')}
          </p>
        </RevealSection>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Overlay */}
            <div
              className="absolute inset-0"
              style={{
                background: 'rgba(0,5,15,0.85)',
                backdropFilter: 'blur(12px)',
              }}
              onClick={closeModal}
            />

            {/* Modal box */}
            <motion.div
              className="relative w-[92%] max-w-[480px] overflow-y-auto"
              style={{
                maxHeight: '90vh',
                background: 'linear-gradient(135deg, #0f1829, #061a28)',
                border: '0.5px solid #C5A059',
                borderRadius: 20,
                padding: '40px 32px',
                boxShadow: '0 40px 80px rgba(0,0,0,0.6)',
              }}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            >
              {/* Header */}
              <div className="flex flex-col items-center mb-8">
                <Image
                  src="/images/logo-minerva.png"
                  alt="Minerva Partners"
                  width={120}
                  height={60}
                  className="h-10 w-auto object-contain"
                />
                <h2
                  className="mt-4"
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontSize: 22,
                    fontWeight: 500,
                    color: 'rgba(255,255,255,0.88)',
                    margin: 0,
                  }}
                >
                  {t('modal.title')}
                </h2>
                {step === 'select' && (
                  <p
                    className="mt-2"
                    style={{
                      fontFamily: 'var(--font-dm-sans)',
                      fontSize: 12,
                      color: 'rgba(255,255,255,0.50)',
                    }}
                  >
                    {t('modal.selectMode')}
                  </p>
                )}
              </div>

              {/* Step 1: Select */}
              {step === 'select' && (
                <div className="flex flex-col gap-3">
                  <button
                    className="text-left cursor-pointer transition-all duration-300"
                    onClick={() => selectMode('independent')}
                    style={{
                      background: '#0a1e2e',
                      border: '0.5px solid rgba(197,160,89,0.20)',
                      borderRadius: 12,
                      padding: '18px 20px',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#C5A059'
                      e.currentTarget.style.boxShadow = '0 0 30px rgba(197,160,89,0.12)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(197,160,89,0.20)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: 17, color: 'rgba(255,255,255,0.88)', fontWeight: 500, margin: 0 }}>
                      {t('modal.independentTitle')}
                    </p>
                    <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 12, color: 'rgba(255,255,255,0.50)', margin: '4px 0 0' }}>
                      {t('modal.independentDesc')}
                    </p>
                  </button>
                  <button
                    className="text-left cursor-pointer transition-all duration-300"
                    onClick={() => selectMode('invite')}
                    style={{
                      background: '#0a1e2e',
                      border: '0.5px solid rgba(197,160,89,0.20)',
                      borderRadius: 12,
                      padding: '18px 20px',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#C5A059'
                      e.currentTarget.style.boxShadow = '0 0 30px rgba(197,160,89,0.12)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(197,160,89,0.20)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: 17, color: 'rgba(255,255,255,0.88)', fontWeight: 500, margin: 0 }}>
                      {t('modal.inviteTitle')}
                    </p>
                    <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 12, color: 'rgba(255,255,255,0.50)', margin: '4px 0 0' }}>
                      {t('modal.inviteDesc')}
                    </p>
                  </button>
                </div>
              )}

              {/* Step 2: Form */}
              {step === 'form' && (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {mode === 'invite' && (
                    <div>
                      <label style={labelStyle}>{t('modal.referralLabel')}</label>
                      <textarea
                        placeholder={t('modal.referralPlaceholder')}
                        rows={2}
                        style={{
                          ...inputStyle,
                          resize: 'none',
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = '#C5A059')}
                        onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(197,160,89,0.20)')}
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label style={labelStyle}>{t('modal.firstName')}</label>
                      <input
                        type="text"
                        required
                        style={inputStyle}
                        onFocus={(e) => (e.currentTarget.style.borderColor = '#C5A059')}
                        onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(197,160,89,0.20)')}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>{t('modal.lastName')}</label>
                      <input
                        type="text"
                        required
                        style={inputStyle}
                        onFocus={(e) => (e.currentTarget.style.borderColor = '#C5A059')}
                        onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(197,160,89,0.20)')}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>Email</label>
                    <input
                      type="email"
                      required
                      style={inputStyle}
                      onFocus={(e) => (e.currentTarget.style.borderColor = '#C5A059')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(197,160,89,0.20)')}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>{t('modal.phone')}</label>
                    <input
                      type="tel"
                      style={inputStyle}
                      onFocus={(e) => (e.currentTarget.style.borderColor = '#C5A059')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(197,160,89,0.20)')}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>{t('modal.role')}</label>
                    <input
                      type="text"
                      placeholder={t('modal.rolePlaceholder')}
                      style={inputStyle}
                      onFocus={(e) => (e.currentTarget.style.borderColor = '#C5A059')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(197,160,89,0.20)')}
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-2 cursor-pointer transition-all duration-300"
                    style={{
                      background: 'linear-gradient(135deg, #C5A059, #D4AF37)',
                      color: '#0f1829',
                      borderRadius: 10,
                      padding: 14,
                      border: 'none',
                      fontFamily: 'var(--font-cormorant)',
                      fontSize: 15,
                      fontWeight: 600,
                      letterSpacing: '0.05em',
                      boxShadow: '0 4px 20px rgba(197,160,89,0.3)',
                      width: '100%',
                    }}
                  >
                    {t('modal.submit')}
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep('select')}
                    className="cursor-pointer"
                    style={{
                      background: 'transparent',
                      border: 'none',
                      fontFamily: 'var(--font-dm-sans)',
                      fontSize: 13,
                      color: 'rgba(255,255,255,0.50)',
                      padding: '8px 0',
                    }}
                  >
                    ← {t('modal.back')}
                  </button>
                </form>
              )}

              {/* Step 3: Confirmation */}
              {step === 'confirm' && (
                <div className="flex flex-col items-center text-center gap-4">
                  <div
                    className="flex items-center justify-center"
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: '50%',
                      border: '1.5px solid #C5A059',
                      color: '#C5A059',
                      fontSize: 24,
                    }}
                  >
                    ✓
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-cormorant)',
                      fontSize: 24,
                      fontWeight: 500,
                      color: 'rgba(255,255,255,0.88)',
                      margin: 0,
                    }}
                  >
                    {t('modal.confirmTitle')}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-dm-sans)',
                      fontSize: 14,
                      color: 'rgba(255,255,255,0.50)',
                    }}
                  >
                    {t('modal.confirmDesc')}
                  </p>
                  <button
                    onClick={closeModal}
                    className="mt-4 cursor-pointer transition-all duration-300"
                    style={{
                      background: 'transparent',
                      border: '0.5px solid rgba(197,160,89,0.20)',
                      color: 'rgba(255,255,255,0.70)',
                      borderRadius: 10,
                      padding: '12px 40px',
                      fontFamily: 'var(--font-dm-sans)',
                      fontSize: 13,
                    }}
                  >
                    {t('modal.close')}
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
