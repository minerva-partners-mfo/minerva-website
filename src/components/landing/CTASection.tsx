'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

type FormStep = 'choice' | 'form' | 'sent'

export function CTASection({ modalOpen, onOpenModal, onCloseModal }: {
  modalOpen: boolean
  onOpenModal: () => void
  onCloseModal: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <>
      <section
        ref={ref}
        className="relative py-24 md:py-32 px-6"
        style={{ background: '#0f1829' }}
      >
        <motion.div
          className="flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          <button
            onClick={onOpenModal}
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: 18,
              fontWeight: 600,
              color: '#0a0f1c',
              letterSpacing: '0.06em',
              padding: '20px 64px',
              background: 'linear-gradient(135deg, #C5A059, #d4af61, #C5A059)',
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer',
              transition: 'all 0.4s',
              boxShadow: '0 4px 30px rgba(197, 160, 89, 0.2)',
            }}
            className="hover:shadow-[0_8px_40px_rgba(197,160,89,0.35)] hover:scale-[1.02] active:scale-[0.98]"
          >
            Richiedi l&apos;accesso
          </button>
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
            L&apos;eccellenza senza compromessi
          </p>
        </motion.div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && <AccessModal onClose={onCloseModal} />}
      </AnimatePresence>
    </>
  )
}

function AccessModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<FormStep>('choice')
  const [viaInvite, setViaInvite] = useState(false)
  const [inviteNote, setInviteNote] = useState('')
  const [form, setForm] = useState({
    nome: '', cognome: '', email: '', telefono: '', ruolo: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Richiesta accesso:', {
      tipo: viaInvite ? 'Tramite invito' : 'Richiesta indipendente',
      inviteNote: viaInvite ? inviteNote : null,
      ...form,
    })
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
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(10, 15, 28, 0.92)', backdropFilter: 'blur(12px)' }}
        onClick={onClose}
      />

      {/* Modal body */}
      <motion.div
        className="relative w-full max-w-[480px] rounded-xl overflow-hidden"
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
        {/* Header */}
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
            {step === 'sent' ? 'Grazie' : 'Richiedi l\'accesso'}
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
          {/* Step: choice */}
          {step === 'choice' && (
            <div className="space-y-3 mt-4">
              <button
                onClick={() => { setViaInvite(false); setStep('form') }}
                className="w-full text-left px-5 py-4 rounded-lg transition-all duration-300 hover:border-[rgba(197,160,89,0.35)]"
                style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontSize: 14,
                  color: 'rgba(255,255,255,0.8)',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(197,160,89,0.12)',
                }}
              >
                Richiesta indipendente
              </button>
              <button
                onClick={() => { setViaInvite(true); setStep('form') }}
                className="w-full text-left px-5 py-4 rounded-lg transition-all duration-300 hover:border-[rgba(197,160,89,0.35)]"
                style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontSize: 14,
                  color: 'rgba(255,255,255,0.8)',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(197,160,89,0.12)',
                }}
              >
                Tramite invito
              </button>
            </div>
          )}

          {/* Step: form */}
          {step === 'form' && (
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              {viaInvite && (
                <div>
                  <label
                    style={{
                      fontFamily: 'var(--font-dm-sans)',
                      fontSize: 11,
                      color: '#C5A059',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      display: 'block',
                      marginBottom: 6,
                    }}
                  >
                    Persona, evento o opportunit&agrave;
                  </label>
                  <textarea
                    value={inviteNote}
                    onChange={(e) => setInviteNote(e.target.value)}
                    rows={3}
                    style={{ ...inputStyle, resize: 'vertical' }}
                    placeholder="Descrivi il contatto o l'evento..."
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <input
                  required
                  placeholder="Nome"
                  value={form.nome}
                  onChange={(e) => setForm({ ...form, nome: e.target.value })}
                  style={inputStyle}
                />
                <input
                  required
                  placeholder="Cognome"
                  value={form.cognome}
                  onChange={(e) => setForm({ ...form, cognome: e.target.value })}
                  style={inputStyle}
                />
              </div>

              <input
                required
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                style={inputStyle}
              />
              <input
                placeholder="Telefono"
                value={form.telefono}
                onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                style={inputStyle}
              />
              <input
                placeholder="Ruolo / Attivit&agrave;"
                value={form.ruolo}
                onChange={(e) => setForm({ ...form, ruolo: e.target.value })}
                style={inputStyle}
              />

              <button
                type="submit"
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
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  marginTop: 8,
                }}
              >
                Invia richiesta
              </button>
            </form>
          )}

          {/* Step: sent */}
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
                La tua richiesta &egrave; stata inviata.<br />
                Ti contatteremo a breve.
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
                Chiudi
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
