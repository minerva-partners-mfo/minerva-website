'use client'

import { useState, useRef, useEffect } from 'react'
import { Link } from '@/i18n/navigation'

const FLOW: { text: string; href: string }[] = [
  { text: "Tutto parte da un'esigenza concreta.", href: '/problema' },
  { text: "Minerva la analizza nel contesto complessivo del cliente.", href: '/soluzioni' },
  { text: "Definisce uno schema di gioco e individua le competenze necessarie.", href: '/soluzioni' },
  { text: "Attiva le persone giuste — selezionate e vincolate dal Codice Minerva.", href: '/codice' },
  { text: "Il cliente è parte attiva del processo.", href: '/ecosistema' },
  { text: "Minerva agisce ed esegue, anche direttamente quando necessario.", href: '/hub' },
  { text: "Coordina le decisioni nel tempo, in modo coerente e trasparente.", href: '/veritas' },
  { text: "Obiettivo: trasformare le scelte in valore, e il valore in patrimonio.", href: '/next-gen' },
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

export function ComeFunzionaPage() {
  return (
    <div className="bg-[#0D1520] min-h-screen relative">
      <p style={{ position: 'absolute', top: 80, left: 20, fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', fontStyle: 'italic', fontFamily: "'Lora', Georgia, serif", zIndex: 10 }}>
        clicca sulla frase per approfondire
      </p>
      <section className="px-6 pt-24 md:pt-28 pb-20 md:pb-28">
        <div className="max-w-[820px] mx-auto">
          <FadeUp>
            <p className="font-sans text-[12px] uppercase tracking-[0.25em] mb-4 text-center" style={{ color: 'rgba(201,145,43,0.8)' }}>IL MODELLO MINERVA</p>
            <h1 className="font-serif text-[36px] md:text-[52px] text-white leading-[1.1] text-center mb-16 md:mb-20">Come Funziona Minerva</h1>
          </FadeUp>

          {FLOW.map((step, i) => (
            <div key={i}>
              {/* Eredità image just before final step */}
              {i === FLOW.length - 1 && (
                <FadeUp className="my-12 md:my-16">
                  <div className="relative rounded-xl overflow-hidden mx-auto" style={{ aspectRatio: '16/9', maxWidth: 720 }}>
                    <img src="/images/img5.webp" alt="Eredità" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0" style={{ backgroundColor: 'rgba(13,21,32,0.35)' }} />
                  </div>
                </FadeUp>
              )}
              <FadeUp>
                <Link
                  href={step.href}
                  className="block text-center group"
                >
                  <p
                    className="font-serif text-white leading-[1.45] transition-colors group-hover:text-[#C9912B]"
                    style={{ fontSize: 'clamp(1.3rem, 2vw, 1.7rem)' }}
                  >
                    {step.text}
                  </p>
                  <span className="font-sans text-[11px] uppercase tracking-[0.18em] mt-3 inline-block opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#C9912B' }}>
                    Scopri →
                  </span>
                </Link>
              </FadeUp>
              {i < FLOW.length - 1 && <Arrow />}
            </div>
          ))}

        </div>
      </section>
    </div>
  )
}
