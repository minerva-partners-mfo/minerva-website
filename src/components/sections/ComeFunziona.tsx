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
    <div className="flex justify-center my-8 md:my-10">
      <svg width="2" height="56" viewBox="0 0 2 56">
        <line x1="1" y1="0" x2="1" y2="56" stroke="#C9912B" strokeWidth="1.2" strokeOpacity="0.7" />
      </svg>
    </div>
  )
}

/* Visual blocks aligned to flow steps (8 entries, one per step) */
function Visual({ step }: { step: number }) {
  // 0,1 → number 5-7 ; 2,3 → impact phrase ; 4 → image ; 5,6 → 3 words ; 7 → final phrase
  if (step === 0) {
    return (
      <FadeUp>
        <div className="text-center md:text-left">
          <span className="font-serif font-bold leading-none block" style={{ fontSize: 'clamp(5rem, 10vw, 9rem)', color: '#C9912B' }}>5–7</span>
          <p className="font-sans text-[14px] md:text-[15px] mt-4 max-w-[360px]" style={{ color: 'rgba(255,255,255,0.6)' }}>
            professionisti brillanti che oggi non si parlano. Minerva li mette allo stesso tavolo.
          </p>
        </div>
      </FadeUp>
    )
  }
  if (step === 2) {
    return (
      <FadeUp>
        <p className="font-serif font-bold leading-[1.2]" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', color: '#C9912B' }}>
          Non il miglior compromesso.<br />Il miglior risultato possibile.
        </p>
      </FadeUp>
    )
  }
  if (step === 4) {
    return (
      <FadeUp>
        <div className="relative rounded-xl overflow-hidden" style={{ aspectRatio: '4/3' }}>
          <img src="/images/img9.webp" alt="Professionisti al tavolo" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(13,21,32,0.35)' }} />
        </div>
      </FadeUp>
    )
  }
  if (step === 5) {
    return (
      <FadeUp>
        <div className="space-y-3">
          {[
            { w: 'ANALISI', o: 0.3 },
            { w: 'EXECUTION', o: 0.6 },
            { w: 'COORDINAMENTO', o: 1.0 },
          ].map((x) => (
            <p key={x.w} className="font-serif font-bold leading-none" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#C9912B', opacity: x.o }}>
              {x.w}
            </p>
          ))}
        </div>
      </FadeUp>
    )
  }
  if (step === 7) {
    return (
      <FadeUp>
        <p className="font-serif text-white leading-[1.3]" style={{ fontSize: 'clamp(1.6rem, 2.6vw, 2rem)' }}>
          Ogni elemento esiste già. L&apos;integrazione no.
        </p>
      </FadeUp>
    )
  }
  return null
}

export function ComeFunzionaPage() {
  return (
    <div className="bg-[#0D1520] min-h-screen">
      <section className="px-6 pt-24 md:pt-28 pb-20 md:pb-28">
        <div className="max-w-[1200px] mx-auto">
          <FadeUp>
            <p className="font-sans text-[12px] uppercase tracking-[0.25em] mb-4 text-center md:text-left" style={{ color: 'rgba(201,145,43,0.8)' }}>IL MODELLO MINERVA</p>
            <h1 className="font-serif text-[36px] md:text-[52px] text-white leading-[1.1] text-center md:text-left mb-16 md:mb-20">Come Funziona Minerva</h1>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {/* LEFT — flow */}
            <div>
              {FLOW.map((line, i) => (
                <div key={i}>
                  <FadeUp>
                    <p className="font-serif text-white leading-[1.45]" style={{ fontSize: 'clamp(1.15rem, 1.7vw, 1.35rem)' }}>
                      {line}
                    </p>
                  </FadeUp>
                  {i < FLOW.length - 1 && <Arrow />}
                </div>
              ))}
            </div>

            {/* RIGHT — visuals */}
            <div className="hidden md:block relative">
              {FLOW.map((_, i) => (
                <div key={i} className="flex items-center" style={{ minHeight: 'calc(1.4em * 1.45 + 56px + 80px)' }}>
                  <Visual step={i} />
                </div>
              ))}
            </div>

            {/* RIGHT mobile — stacked at bottom */}
            <div className="md:hidden space-y-16">
              {[0, 2, 4, 5, 7].map((s) => (
                <div key={s}>
                  <Visual step={s} />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-24 md:mt-32 text-center">
            <p className="font-sans text-[17px] mb-10" style={{ color: 'rgba(255,255,255,0.5)' }}>Il primo passo è una conversazione.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contatti" className="font-sans text-[14px] font-bold text-white rounded-lg transition-colors hover:opacity-90" style={{ backgroundColor: '#C9912B', padding: '16px 40px' }}>
                PARLIAMONE
              </Link>
              <Link href="/problema" className="font-sans text-[14px] rounded-lg transition-all duration-300 hover:bg-white/5" style={{ color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.2)', padding: '16px 40px' }}>
                TORNA AL PROBLEMA
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
