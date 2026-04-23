'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'

type FormStep = 'choice' | 'form' | 'sent'

export function CTASection({ modalOpen, onOpenModal, onCloseModal, initialTypology }: {
  modalOpen: boolean
  onOpenModal: (typology: 'self-initiated' | 'referral') => void
  onCloseModal: () => void
  initialTypology?: 'self-initiated' | 'referral'
}) {
  const t = useTranslations('landing.cta')
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const btnBase: React.CSSProperties = {
    fontFamily: 'var(--font-dm-sans)',
    fontSize: 16,
    fontWeight: 600,
    color: '#0a0f1c',
    letterSpacing: '0.06em',
    padding: '18px 44px',
    background: 'linear-gradient(135deg, #C5A059, #d4af61, #C5A059)',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    transition: 'all 0.4s',
    boxShadow: '0 4px 30px rgba(197, 160, 89, 0.2)',
    position: 'relative',
    overflow: 'hidden',
  }

  return (
    <>
      <section
        ref={ref}
        className="relative land-section px-6"
      >
        <motion.div
          className="flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => onOpenModal('self-initiated')}
              className="cta-shimmer-btn hover:shadow-[0_8px_40px_rgba(197,160,89,0.35)] hover:scale-[1.02] active:scale-[0.98]"
              style={btnBase}
            >
              <span style={{ position: 'relative', zIndex: 1 }}>{t('btnSpontaneous')}</span>
            </button>
            <button
              onClick={() => onOpenModal('referral')}
              className="cta-shimmer-btn hover:shadow-[0_8px_40px_rgba(197,160,89,0.35)] hover:scale-[1.02] active:scale-[0.98]"
              style={btnBase}
            >
              <span style={{ position: 'relative', zIndex: 1 }}>{t('btnReferral')}</span>
            </button>
          </div>
          <p
            className="mt-6"
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontStyle: 'italic',
              fontSize: 16,
              color: 'rgba(255,255,255,0.5)',
              letterSpacing: '0.04em',
              margin: '24px 0 0',
            }}
          >
            {t('tagline')}
          </p>
        </motion.div>
      </section>

      <AnimatePresence>
        {modalOpen && <AccessModal onClose={onCloseModal} initialTypology={initialTypology} />}
      </AnimatePresence>
    </>
  )
}

function AccessModal({ onClose, initialTypology }: { onClose: () => void; initialTypology?: 'self-initiated' | 'referral' }) {
  const t = useTranslations('landing.cta.modal')
  const [step, setStep] = useState<FormStep>('form')
  const [sending, setSending] = useState(false)
  const [formData, setFormData] = useState({
    typology: (initialTypology || '') as '' | 'self-initiated' | 'referral',
    name: '',
    email: '',
    phone: '',
    profile: '',
    referralFrom: '',
    message: '',
  })

  const set = (field: string, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.typology) return
    if (formData.typology === 'referral' && formData.referralFrom.trim().length < 2) return
    setSending(true)
    try {
      await fetch('/api/access-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tipo: formData.typology,
          inviteNote: formData.typology === 'referral' ? formData.referralFrom : null,
          nome: formData.name,
          email: formData.email,
          telefono: formData.phone,
          ruolo: formData.profile,
          messaggio: formData.message || null,
        }),
      })
    } catch {
      // silent — show confirmation anyway
    }
    setSending(false)
    setStep('sent')
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    fontFamily: 'var(--font-dm-sans)',
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(197,160,89,0.15)',
    borderRadius: 6,
    outline: 'none',
    transition: 'border-color 0.3s',
  }

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(10, 15, 28, 0.92)', backdropFilter: 'blur(12px)' }}
        onClick={onClose}
      />

      <motion.div
        className="relative w-full max-w-[480px] rounded-xl overflow-hidden max-h-[90vh] overflow-y-auto"
        style={{
          background: 'linear-gradient(180deg, #101c2e, #0a1220)',
          border: '1px solid rgba(197,160,89,0.12)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        }}
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      >
        <div className="flex items-center justify-between px-6 pt-6 pb-2">
          <h3
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 22,
              fontWeight: 600,
              color: 'rgba(255,255,255,0.9)',
              margin: 0,
            }}
          >
            {step === 'sent' ? t('confirmTitle') : t('title')}
          </h3>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(255,255,255,0.3)',
              fontSize: 20,
              cursor: 'pointer',
              padding: 4,
            }}
          >
            &#10005;
          </button>
        </div>

        <div className="px-6 pb-6">
          {step === 'form' && (
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              {/* Typology label */}
              <p
                style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontSize: 12,
                  color: 'rgba(255,255,255,0.5)',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  margin: '0 0 -4px',
                }}
              >
                {t('typologyLabel')}
              </p>

              {/* Typology radio cards */}
              <div style={{ display: 'flex', gap: 8 }}>
                {(['self-initiated', 'referral'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => set('typology', type)}
                    className="transition-all duration-200"
                    style={{
                      flex: 1,
                      fontFamily: 'var(--font-dm-sans)',
                      fontSize: 13,
                      textAlign: 'center',
                      padding: '16px 12px',
                      borderRadius: 10,
                      cursor: 'pointer',
                      background: formData.typology === type ? 'rgba(212,175,55,0.08)' : '#0a1e2e',
                      border: formData.typology === type ? '1px solid #D4AF37' : '0.5px solid rgba(212,175,55,0.2)',
                      color: formData.typology === type ? '#D4AF37' : 'rgba(255,255,255,0.7)',
                      boxShadow: formData.typology === type ? '0 0 20px rgba(212,175,55,0.15)' : 'none',
                    }}
                  >
                    {type === 'self-initiated' ? t('selfInitiated') : t('referral')}
                  </button>
                ))}
              </div>

              {/* Conditional referral field */}
              {formData.typology === 'referral' && (
                <div>
                  <p
                    style={{
                      fontFamily: 'var(--font-dm-sans)',
                      fontSize: 12,
                      color: 'rgba(255,255,255,0.5)',
                      letterSpacing: '0.04em',
                      margin: '0 0 6px',
                    }}
                  >
                    {t('referralLabel')}
                  </p>
                  <input
                    required
                    value={formData.referralFrom}
                    onChange={(e) => set('referralFrom', e.target.value)}
                    placeholder={t('referralPlaceholder')}
                    style={inputStyle}
                  />
                </div>
              )}

              {/* Name */}
              <input
                required
                placeholder={t('name')}
                value={formData.name}
                onChange={(e) => set('name', e.target.value)}
                style={inputStyle}
              />

              {/* Email */}
              <input
                required
                type="email"
                placeholder={t('email')}
                value={formData.email}
                onChange={(e) => set('email', e.target.value)}
                style={inputStyle}
              />

              {/* Phone */}
              <input
                placeholder={t('phone')}
                value={formData.phone}
                onChange={(e) => set('phone', e.target.value)}
                style={inputStyle}
              />

              {/* Profile */}
              <input
                placeholder={t('profile')}
                value={formData.profile}
                onChange={(e) => set('profile', e.target.value)}
                style={inputStyle}
              />

              {/* Message */}
              <textarea
                placeholder={t('messagePlaceholder')}
                value={formData.message}
                onChange={(e) => set('message', e.target.value)}
                rows={3}
                style={{
                  ...inputStyle,
                  resize: 'vertical',
                  minHeight: 72,
                }}
              />

              <button
                type="submit"
                disabled={!formData.typology || sending}
                className="w-full hover:brightness-110 active:scale-[0.98]"
                style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#0a0f1c',
                  padding: '14px',
                  background: 'linear-gradient(135deg, #C5A059, #d4af61)',
                  border: 'none',
                  borderRadius: 6,
                  cursor: !formData.typology || sending ? 'not-allowed' : 'pointer',
                  opacity: !formData.typology ? 0.5 : 1,
                  transition: 'all 0.3s',
                  marginTop: 8,
                }}
              >
                {sending ? '...' : t('submit')}
              </button>
            </form>
          )}

          {step === 'sent' && (
            <div className="text-center py-8">
              <p
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontStyle: 'italic',
                  fontSize: 18,
                  color: 'rgba(255,255,255,0.75)',
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {t('confirmDesc')}
              </p>
              <button
                onClick={onClose}
                className="mt-6"
                style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontSize: 13,
                  color: '#C5A059',
                  background: 'none',
                  border: '1px solid rgba(197,160,89,0.25)',
                  borderRadius: 6,
                  padding: '10px 28px',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                }}
              >
                {t('close')}
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
