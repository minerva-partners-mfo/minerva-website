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

function LinkCard({ href, src, label, sub }: { href: string; src: string; label: string; sub: string }) {
  return (
    <Link href={href} className="block group relative rounded-xl overflow-hidden" style={{ aspectRatio: '16/10', border: '1px solid rgba(201,145,43,0.2)' }}>
      <img src={src} alt={label} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(13,21,32,0.2) 0%, rgba(13,21,32,0.85) 100%)' }} />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="font-sans text-[10px] uppercase tracking-[0.18em] mb-1" style={{ color: '#C9912B' }}>{sub}</p>
        <p className="font-serif text-[20px] md:text-[22px] text-white leading-tight">{label}</p>
        <span className="font-sans text-[11px] mt-2 inline-block" style={{ color: 'rgba(255,255,255,0.7)' }}>Scopri →</span>
      </div>
    </Link>
  )
}

function ChartCosti() {
  // Simple bar comparison: 5-7 advisor (frammentato) vs Minerva (unificato)
  return (
    <div className="rounded-xl p-6" style={{ border: '1px solid rgba(201,145,43,0.15)', backgroundColor: 'rgba(255,255,255,0.02)' }}>
      <p className="font-sans text-[10px] uppercase tracking-[0.15em] mb-4" style={{ color: 'rgba(201,145,43,0.8)' }}>Costo del non coordinamento</p>
      {[
        { l: 'Frammentato', v: 100, c: '#E74C3C', val: '5–7 advisor' },
        { l: 'Coordinato', v: 38, c: '#C9912B', val: 'Regia Minerva' },
      ].map((b) => (
        <div key={b.l} className="mb-4 last:mb-0">
          <div className="flex justify-between text-[11px] font-sans mb-1.5">
            <span style={{ color: 'rgba(255,255,255,0.6)' }}>{b.l}</span>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>{b.val}</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
            <div className="h-full rounded-full" style={{ width: `${b.v}%`, backgroundColor: b.c, transition: 'width 1.2s ease' }} />
          </div>
        </div>
      ))}
      <p className="font-sans text-[10px] mt-4" style={{ color: 'rgba(255,255,255,0.3)' }}>Tempo, costi, distrazioni — tutto cresce con la frammentazione.</p>
    </div>
  )
}

function ChartRegia() {
  // Donut: 4 dimensioni del patrimonio coordinate
  const segs = [
    { c: '#C9912B', label: 'Impresa' },
    { c: 'rgba(201,145,43,0.75)', label: 'Immobili' },
    { c: 'rgba(201,145,43,0.5)', label: 'Finanza' },
    { c: 'rgba(201,145,43,0.3)', label: 'Famiglia' },
  ]
  const r = 60
  const C = 2 * Math.PI * r
  const seg = C / 4
  return (
    <div className="rounded-xl p-6" style={{ border: '1px solid rgba(201,145,43,0.15)', backgroundColor: 'rgba(255,255,255,0.02)' }}>
      <p className="font-sans text-[10px] uppercase tracking-[0.15em] mb-4" style={{ color: 'rgba(201,145,43,0.8)' }}>Una sola regia, ogni dimensione</p>
      <div className="flex items-center gap-5">
        <svg width="140" height="140" viewBox="0 0 160 160">
          <circle cx="80" cy="80" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="20" />
          {segs.map((s, i) => (
            <circle
              key={i}
              cx="80" cy="80" r={r}
              fill="none"
              stroke={s.c}
              strokeWidth="20"
              strokeDasharray={`${seg - 4} ${C - seg + 4}`}
              strokeDashoffset={-i * seg}
              transform="rotate(-90 80 80)"
            />
          ))}
          <text x="80" y="86" textAnchor="middle" className="font-serif" fontSize="22" fill="#C9912B" fontWeight="bold">4</text>
        </svg>
        <div className="space-y-2">
          {segs.map((s) => (
            <div key={s.label} className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: s.c }} />
              <span className="font-sans text-[12px]" style={{ color: 'rgba(255,255,255,0.65)' }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
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
  if (step === 1) {
    return (
      <FadeUp>
        <div className="relative rounded-xl overflow-hidden" style={{ aspectRatio: '4/3' }}>
          <img src="/images/img46.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(13,21,32,0.3)' }} />
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
  if (step === 3) {
    return <FadeUp><LinkCard href="/codice" src="/images/room.jpg" label="Il Codice Minerva" sub="Selezione & Etica" /></FadeUp>
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
  if (step === 6) {
    return (
      <FadeUp>
        <div className="relative rounded-xl overflow-hidden" style={{ aspectRatio: '4/3' }}>
          <img src="/images/img5.webp" alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(13,21,32,0.3)' }} />
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
            <div className="hidden md:flex flex-col gap-16 justify-around">
              {[0, 1, 2, 3, 4, 5, 6, 7].map((s) => {
                const v = <Visual step={s} />
                return v ? <div key={s} className="w-full">{v}</div> : null
              })}
            </div>

            {/* RIGHT mobile — stacked at bottom */}
            <div className="md:hidden space-y-16">
              {[0, 1, 2, 3, 4, 5, 6, 7].map((s) => (
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
