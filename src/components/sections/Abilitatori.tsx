'use client'

import { useRef, useEffect, useState } from 'react'

const BLOCKS: {
  title: string
  subtitle: string
  text: string
  visual: 'image' | 'temple'
  image?: string
}[] = [
  {
    title: 'Minerva Board',
    subtitle: 'Il Portale delle Opportunità',
    text: "Una bacheca digitale ultra-riservata dedicata a operazioni off-market e portafogli inaccessibili al mercato pubblico. L'accesso è selettivo, garantendo un controllo assoluto e tracciabile sulla sicurezza delle informazioni strategiche tramite NDA digitali.",
    visual: 'image',
    image: '/images/room.jpg',
  },
  {
    title: 'Wealth Engine',
    subtitle: 'Aggregatore di Eccellenze',
    text: "Il motore industriale e finanziario che fonde capitali pazienti e competenze iperspecializzate. Coordiniamo dinamicamente le risorse per strutturare Club Deal proprietari e ottimizzare la finanza d'impresa, mantenendo un focus ossessivo sull'execution e sulla generazione di risultati tangibili.",
    visual: 'temple',
  },
  {
    title: 'Minerva Platform',
    subtitle: 'Intelligenza Predittiva',
    text: 'Non ci limitiamo a leggere i bilanci passati. La nostra piattaforma avanzata supporta il decision making strategico proiettando scenari futuri. Eseguiamo stress test patrimoniali e forniamo letture macroeconomiche precise per anticipare i movimenti del mercato prima che si verifichino.',
    visual: 'image',
    image: '/images/img6.png',
  },
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

function TempleVisual() {
  return (
    <div className="relative w-full rounded-xl overflow-hidden flex items-center justify-center" style={{ aspectRatio: '4/3', background: 'radial-gradient(circle at center, rgba(201,145,43,0.08) 0%, #0D1520 70%)', border: '1px solid rgba(201,145,43,0.2)' }}>
      <svg viewBox="0 0 400 300" className="w-[80%] h-[80%]" fill="none">
        <defs>
          <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E0B45A" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#C9912B" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        {/* Pediment (triangle) */}
        <path d="M60 110 L200 30 L340 110 Z" stroke="url(#goldGrad)" strokeWidth="1.5" fill="none" />
        <line x1="60" y1="110" x2="340" y2="110" stroke="url(#goldGrad)" strokeWidth="1.5" />
        {/* Architrave */}
        <line x1="55" y1="125" x2="345" y2="125" stroke="url(#goldGrad)" strokeWidth="1" opacity="0.7" />
        {/* 6 columns */}
        {[80, 130, 180, 220, 270, 320].map((x) => (
          <g key={x}>
            <line x1={x} y1="130" x2={x} y2="240" stroke="url(#goldGrad)" strokeWidth="1.2" />
            <line x1={x - 6} y1="130" x2={x + 6} y2="130" stroke="url(#goldGrad)" strokeWidth="1.2" />
            <line x1={x - 6} y1="240" x2={x + 6} y2="240" stroke="url(#goldGrad)" strokeWidth="1.2" />
          </g>
        ))}
        {/* Base */}
        <line x1="50" y1="245" x2="350" y2="245" stroke="url(#goldGrad)" strokeWidth="1.5" />
        <line x1="40" y1="255" x2="360" y2="255" stroke="url(#goldGrad)" strokeWidth="1" opacity="0.6" />
        {/* Connection lines (wireframe) */}
        <line x1="200" y1="30" x2="200" y2="270" stroke="#C9912B" strokeWidth="0.5" strokeDasharray="3 4" opacity="0.4" />
        <line x1="60" y1="110" x2="340" y2="110" stroke="#C9912B" strokeWidth="0.5" strokeDasharray="3 4" opacity="0.4" />
        {/* Glow nodes */}
        {[80, 200, 320].map((x) => (
          <circle key={x} cx={x} cy="110" r="3" fill="#C9912B">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="3s" repeatCount="indefinite" />
          </circle>
        ))}
      </svg>
    </div>
  )
}

function Block({ block, index }: { block: typeof BLOCKS[number]; index: number }) {
  const reversed = index % 2 === 1
  const visual = block.visual === 'temple' ? (
    <TempleVisual />
  ) : (
    <div className="relative w-full rounded-xl overflow-hidden" style={{ aspectRatio: '4/3', border: '1px solid rgba(201,145,43,0.15)' }}>
      <img src={block.image} alt={block.title} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(13,21,32,0.4)' }} />
    </div>
  )

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center ${reversed ? 'md:[&>*:first-child]:order-2' : ''}`}>
      <FadeUp>
        <div>
          <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: 'rgba(201,145,43,0.7)' }}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <h2 className="font-serif font-bold mt-3 leading-[1.1]" style={{ fontSize: 'clamp(34px, 4.5vw, 52px)', color: '#C9912B' }}>
            {block.title}
          </h2>
          <p className="font-serif text-white mt-2" style={{ fontSize: 'clamp(18px, 2vw, 22px)' }}>
            {block.subtitle}
          </p>
          <p className="font-sans font-light mt-6" style={{ fontSize: '16px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.75' }}>
            {block.text}
          </p>
        </div>
      </FadeUp>
      <FadeUp delay={150}>{visual}</FadeUp>
    </div>
  )
}

export function AbilitatoriPage() {
  return (
    <section className="relative min-h-screen" style={{ backgroundColor: '#0D1520' }}>
      <div className="px-6 pt-28 md:pt-32 pb-12 max-w-[1200px] mx-auto text-center">
        <FadeUp>
          <p className="font-sans text-[12px] uppercase tracking-[0.25em]" style={{ color: 'rgba(201,145,43,0.8)' }}>GLI ABILITATORI</p>
          <h1 className="font-serif font-semibold text-white leading-tight mt-4" style={{ fontSize: 'clamp(36px, 5vw, 56px)' }}>
            Gli strumenti che rendono possibile la regia
          </h1>
        </FadeUp>
      </div>

      <div className="px-6 max-w-[1200px] mx-auto">
        {BLOCKS.map((b, i) => (
          <div key={i}>
            <div className="py-20 md:py-28">
              <Block block={b} index={i} />
            </div>
            {i < BLOCKS.length - 1 && (
              <div className="h-[1px] w-full" style={{ background: 'linear-gradient(to right, transparent, rgba(201,145,43,0.3), transparent)' }} />
            )}
          </div>
        ))}
      </div>

      <div className="h-24" />
    </section>
  )
}
