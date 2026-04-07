'use client'

import { useState, useRef, useEffect } from 'react'
import { Link } from '@/i18n/navigation'

const FLOW = [
  "Tutto parte da un'esigenza concreta.",
  "Minerva la analizza nel contesto complessivo del cliente.",
  "Definisce uno schema di gioco e individua le competenze necessarie.",
  "Attiva le persone giuste — selezionate e vincolate dal Codice Minerva.",
  "Il cliente è parte attiva del processo.",
  "Minerva agisce ed esegue, anche direttamente quando necessario.",
  "Coordina le decisioni nel tempo, in modo coerente e trasparente.",
  "Obiettivo: trasformare le scelte in valore, e il valore in patrimonio.",
]

const VERITAS_LETTERS = [
  { letter: 'V', word: 'Valore' },
  { letter: 'E', word: 'Etica' },
  { letter: 'R', word: 'Riservatezza' },
  { letter: 'I', word: 'Indipendenza' },
  { letter: 'T', word: 'Trasparenza' },
  { letter: 'A', word: 'Allineamento' },
  { letter: 'S', word: 'Selezione' },
]

function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => setVisible(true), delay); obs.disconnect() }
    }, { threshold: 0.2 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])
  return (
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(40px)', transition: 'opacity 0.9s ease, transform 0.9s ease' }}>
      {children}
    </div>
  )
}

function Arrow() {
  return (
    <FadeUp className="flex justify-center" delay={100}>
      <svg width="2" height="80" viewBox="0 0 2 80" className="my-10 md:my-14">
        <line x1="1" y1="0" x2="1" y2="80" stroke="#C9912B" strokeWidth="1.2" strokeOpacity="0.7" />
      </svg>
    </FadeUp>
  )
}

export function ComeFunzionaPage() {
  return (
    <div className="bg-[#0D1520]">

      {/* HERO con sfondo tavolo */}
      <section className="relative pt-24 md:pt-28 pb-16 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/tavolo.png')" }} />
        <div className="absolute inset-0 bg-[#0D1520]/75" />
        <div className="absolute inset-x-0 bottom-0 h-[140px] bg-gradient-to-t from-[#0D1520] to-transparent" />
        <div className="relative z-10 px-6 max-w-[1100px] mx-auto text-center">
          <p className="font-sans text-[12px] uppercase tracking-[0.25em] mb-4" style={{ color: 'rgba(201,145,43,0.8)' }}>IL MODELLO MINERVA</p>
          <h1 className="font-serif text-[40px] md:text-[60px] text-white leading-[1.1]">Come Funziona Minerva</h1>
        </div>
      </section>

      {/* FLUSSO VERTICALE */}
      <section className="px-6 py-20 md:py-28">
        <div className="max-w-[820px] mx-auto text-center">
          {FLOW.map((line, i) => (
            <div key={i}>
              <FadeUp>
                <p className="font-serif text-white leading-[1.4]" style={{ fontSize: 'clamp(1.5rem, 2.6vw, 2rem)' }}>
                  {line}
                </p>
              </FadeUp>
              {i < FLOW.length - 1 && <Arrow />}
            </div>
          ))}
        </div>
      </section>

      {/* SEPARATORE img66 */}
      <section className="relative" style={{ height: '50vh', minHeight: 340 }}>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/img66.png')" }} />
        <div className="absolute inset-0 bg-[#0D1520]/55" />
        <div className="absolute inset-x-0 top-0 h-[120px] bg-gradient-to-b from-[#0D1520] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[120px] bg-gradient-to-t from-[#0D1520] to-transparent" />
      </section>

      {/* VERITAS minimal */}
      <section className="px-6 py-24 md:py-32">
        <div className="max-w-[820px] mx-auto">
          <FadeUp>
            <h2 className="font-serif text-[32px] md:text-[42px] text-white text-center mb-4">Il Codice VERITAS</h2>
            <p className="font-sans text-[15px] md:text-[16px] text-center mx-auto mb-16" style={{ color: 'rgba(255,255,255,0.55)', maxWidth: 600 }}>
              Sette principi. Sette lettere. Un codice che governa ogni relazione.
            </p>
          </FadeUp>
          <div className="space-y-6 md:space-y-8">
            {VERITAS_LETTERS.map((v, i) => (
              <FadeUp key={v.letter} delay={i * 80}>
                <div className="flex items-baseline gap-6 md:gap-10 justify-start md:justify-center">
                  <span className="font-serif font-bold leading-none flex-shrink-0" style={{ fontSize: 'clamp(3.5rem, 6vw, 5rem)', color: '#C9912B', minWidth: '4rem' }}>{v.letter}</span>
                  <span className="font-serif" style={{ fontSize: 'clamp(1.4rem, 2.2vw, 1.8rem)', color: 'rgba(255,255,255,0.9)' }}>{v.word}</span>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0D1520] text-center" style={{ padding: '60px 24px 100px' }}>
        <p className="font-sans text-[17px] mb-10" style={{ color: 'rgba(255,255,255,0.5)' }}>Il primo passo è una conversazione.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/contatti" className="font-sans text-[14px] font-bold text-white rounded-lg transition-colors hover:opacity-90" style={{ backgroundColor: '#C9912B', padding: '16px 40px' }}>
            PARLIAMONE
          </Link>
          <Link href="/problema" className="font-sans text-[14px] rounded-lg transition-all duration-300 hover:bg-white/5" style={{ color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.2)', padding: '16px 40px' }}>
            TORNA AL PROBLEMA
          </Link>
        </div>
      </section>
    </div>
  )
}
