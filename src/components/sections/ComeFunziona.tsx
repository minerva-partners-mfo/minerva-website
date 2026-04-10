'use client'

import { useState, useRef, useEffect } from 'react'
import { Link } from '@/i18n/navigation'

const FLOW: { text: string; href: string; bg: string }[] = [
  { text: "Tutto parte da un'esigenza concreta.", href: '/problema', bg: '/images/time.jpg' },
  { text: "Minerva la analizza nel contesto complessivo del cliente.", href: '/soluzioni', bg: '/images/img9.webp' },
  { text: "Definisce uno schema di gioco e individua le competenze necessarie.", href: '/soluzioni', bg: '/images/strategy.webp' },
  { text: "Attiva le persone giuste — selezionate e vincolate dal Codice Minerva.", href: '/codice', bg: '/images/room.jpg' },
  { text: "Il cliente è parte attiva del processo.", href: '/ecosistema', bg: '/images/img11.jpg' },
  { text: "Minerva agisce ed esegue, anche direttamente quando necessario.", href: '/hub', bg: '/images/img3.png' },
  { text: "Coordina le decisioni nel tempo, in modo coerente e trasparente.", href: '/veritas', bg: '/images/img8.png' },
  { text: "Obiettivo: trasformare le scelte in valore, e il valore in patrimonio.", href: '/next-gen', bg: '/images/img5.webp' },
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
    <div className="flex justify-center my-4 md:my-6">
      <svg width="2" height="40" viewBox="0 0 2 40">
        <line x1="1" y1="0" x2="1" y2="40" stroke="#C9912B" strokeWidth="1.2" strokeOpacity="0.7" />
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
              <FadeUp>
                <Link href={step.href} className="block group">
                  <div
                    style={{
                      position: 'relative',
                      minHeight: 250,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      borderRadius: 12,
                    }}
                  >
                    {/* Background image */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: `url('${step.bg}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: 0.12,
                      }}
                    />
                    {/* Gradient overlay to blend edges into navy */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to bottom, #0D1520 0%, transparent 20%, transparent 80%, #0D1520 100%)',
                      }}
                    />
                    {/* Text */}
                    <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '40px 24px' }}>
                      <p
                        className="font-serif text-white leading-[1.45] transition-colors group-hover:text-[#C9912B]"
                        style={{ fontSize: 'clamp(1.3rem, 2vw, 1.7rem)' }}
                      >
                        {step.text}
                      </p>
                      <span className="font-sans text-[11px] uppercase tracking-[0.18em] mt-3 inline-block opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#C9912B' }}>
                        Scopri →
                      </span>
                    </div>
                  </div>
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
