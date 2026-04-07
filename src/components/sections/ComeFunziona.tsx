'use client'

import { useState, useRef, useEffect } from 'react'
import { Link } from '@/i18n/navigation'

/* ════════════════════════════════════════
   DATA
   ════════════════════════════════════════ */

const VERITAS_LETTERS = [
  { letter: 'V', word: 'Valore' },
  { letter: 'E', word: 'Etica' },
  { letter: 'R', word: 'Riservatezza' },
  { letter: 'I', word: 'Indipendenza' },
  { letter: 'T', word: 'Trasparenza' },
  { letter: 'A', word: 'Allineamento' },
  { letter: 'S', word: 'Selezione' },
]

/* ════════════════════════════════════════
   HELPERS
   ════════════════════════════════════════ */

function FadeIn({ children, delay = 0, className = '', style = {} }: { children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => setVisible(true), delay); obs.disconnect() }
    }, { threshold: 0.15 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])
  return (
    <div ref={ref} className={className} style={{ ...style, opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}>
      {children}
    </div>
  )
}

/* ════════════════════════════════════════
   MAIN
   ════════════════════════════════════════ */

export function ComeFunzionaPage() {
  return (
    <div className="bg-[#0D1520]">

      {/* ═══════ HERO — compact ═══════ */}
      <section className="relative overflow-hidden pt-24 md:pt-28 pb-12 md:pb-16">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/tavolo.png')" }} />
        <div className="absolute inset-0 bg-[#0D1520]/75" />
        <div className="absolute inset-x-0 bottom-0 h-[120px] bg-gradient-to-t from-[#0D1520] to-transparent" />
        <div className="relative z-10 px-6">
          <div className="max-w-[1100px] mx-auto">
            <p className="font-sans text-[12px] uppercase tracking-[0.2em] mb-3" style={{ color: 'rgba(201,145,43,0.8)' }}>IL MODELLO MINERVA</p>
            <h1 className="font-serif text-[36px] md:text-[52px] text-white leading-[1.15]">Come funziona Minerva</h1>
          </div>
        </div>
      </section>

      {/* ═══════ FLUSSO 5 STEP ═══════ */}
      <section className="px-6 py-16 md:py-20">
        <div className="max-w-[1100px] mx-auto">
          <FadeIn>
            <h2 className="font-serif text-[28px] md:text-[36px] text-white mb-12 text-center">Il flusso operativo</h2>
          </FadeIn>
          <div className="relative">
            <div className="hidden md:block absolute top-[28px] left-[8%] right-[8%] h-[1px]" style={{ background: 'linear-gradient(to right, transparent, rgba(201,145,43,0.4), transparent)' }} />
            <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-4">
              {[
                { n: '01', t: 'ANALISI', d: "Nasce da un'esigenza concreta" },
                { n: '02', t: 'COMPRENSIONE', d: "Analisi dell'opportunità nell'universo del cliente" },
                { n: '03', t: 'AZIONE', d: 'Viene costruito uno schema con molteplici scenari' },
                { n: '04', t: 'INTEGRAZIONE', d: 'Chi serve, quando serve (anche il cliente se lo vuole)' },
                { n: '05', t: 'COORDINAMENTO', d: 'Minerva supervisiona e funge da regista' },
              ].map((s, i) => (
                <FadeIn key={i} delay={i * 120}>
                  <div className="text-center relative">
                    <div className="w-[56px] h-[56px] rounded-full mx-auto flex items-center justify-center relative z-10" style={{ backgroundColor: '#0D1520', border: '2px solid #C9912B' }}>
                      <span className="font-serif text-[18px] font-bold" style={{ color: '#C9912B' }}>{s.n}</span>
                    </div>
                    <h3 className="font-sans text-[14px] font-bold mt-5 tracking-[0.12em]" style={{ color: '#C9912B' }}>{s.t}</h3>
                    <p className="font-sans text-[13px] mt-3 leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>{s.d}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ STATEMENT ═══════ */}
      <section className="py-20 px-6">
        <div className="max-w-[850px] mx-auto text-center">
          <FadeIn>
            <p className="font-sans text-[18px] md:text-[20px] leading-[1.8] mb-10" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Non siamo una banca. Non siamo un fondo. Non siamo un consulente finanziario. Non vendiamo prodotti. Non gestiamo denaro direttamente. Non abbiamo conflitti di interesse.
            </p>
          </FadeIn>
          <FadeIn delay={300}>
            <p className="font-serif text-[32px] md:text-[42px] font-bold" style={{ color: '#C9912B' }}>
              Siamo la regia. Siamo il tuo dream team.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══════ Full-page break — img66 ═══════ */}
      <section className="relative" style={{ height: '55vh', minHeight: 380 }}>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/img66.png')" }} />
        <div className="absolute inset-0 bg-[#0D1520]/50" />
        <div className="absolute inset-x-0 bottom-0 h-[120px] bg-gradient-to-t from-[#0D1520] to-transparent" />
        <div className="absolute inset-x-0 top-0 h-[120px] bg-gradient-to-b from-[#0D1520] to-transparent" />
      </section>

      {/* ═══════ VERITAS — single row ═══════ */}
      <section className="py-20 md:py-24 px-6">
        <div className="max-w-[1000px] mx-auto text-center">
          <FadeIn>
            <h2 className="font-serif text-[30px] md:text-[36px] text-white mb-5">Il Codice VERITAS</h2>
            <p className="font-sans text-[16px] md:text-[17px] leading-[1.7] mb-5 mx-auto" style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 680 }}>
              Chiunque lavori o abbia a che fare con il nostro ecosistema firma il nostro Codice. Non è un documento formale: è un impegno concreto, basato sul modello <span style={{ color: '#C9912B', fontWeight: 600 }}>VERITAS</span>.
            </p>
            <p className="font-sans text-[14px] mb-16" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Sette principi. Sette lettere. Un codice che governa ogni relazione.
            </p>
          </FadeIn>
          <FadeIn delay={200}>
            <div className="max-w-[640px] mx-auto text-left space-y-5">
              {VERITAS_LETTERS.map((v, i) => (
                <FadeIn key={v.letter} delay={i * 80}>
                  <div className="flex items-baseline gap-6">
                    <span className="font-serif font-bold leading-none" style={{ fontSize: '5rem', color: '#C9912B' }}>{v.letter}</span>
                    <span className="font-serif text-[24px] md:text-[28px]" style={{ color: 'rgba(255,255,255,0.85)' }}>{v.word}</span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════ FRASE FINALE — Doppia vista ═══════ */}
      <section className="relative px-6" style={{ padding: '100px 24px' }}>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/freepik__ultrarealistic-closeup-of-a-luxury-executive-table__12881.png')" }} />
        <div className="absolute inset-0 bg-[#0D1520]/60" />
        <div className="absolute inset-x-0 bottom-0 h-[120px] bg-gradient-to-t from-[#0D1520] to-transparent" />
        <div className="relative z-10 max-w-[1100px] mx-auto">
          <div className="flex flex-col md:flex-row gap-10 md:gap-0">
            {/* Left — Imprenditore */}
            <FadeIn className="flex-1 md:pr-12 md:border-r" style={{ borderColor: 'rgba(201,145,43,0.15)' }}>
              <span className="font-sans text-[11px] uppercase block mb-6" style={{ color: '#C9912B', letterSpacing: '0.15em' }}>PER CHI HA COSTRUITO</span>
              <p className="font-serif text-[26px] md:text-[32px] text-white leading-[1.35]">Non sostituiamo i consulenti di fiducia. <span className="font-bold" style={{ color: '#C9912B' }}>Li facciamo lavorare meglio, insieme.</span></p>
              <p className="font-sans text-[15px] mt-5" style={{ color: 'rgba(255,255,255,0.5)' }}>Il patrimonio merita una regia. Non un altro consulente.</p>
            </FadeIn>
            {/* Divider mobile */}
            <div className="h-[1px] md:hidden" style={{ backgroundColor: 'rgba(201,145,43,0.1)' }} />
            {/* Right — Professionista */}
            <FadeIn delay={400} className="flex-1 md:pl-12">
              <span className="font-sans text-[11px] uppercase block mb-6" style={{ color: '#C9912B', letterSpacing: '0.15em' }}>PER CHI VUOLE FARE DI PIÙ</span>
              <p className="font-serif text-[26px] md:text-[32px] text-white leading-[1.35]">Sei molto di più di un professionista. <span className="font-bold" style={{ color: '#C9912B' }}>Sei parte di un ecosistema che moltiplica il tuo valore.</span></p>
              <p className="font-sans text-[15px] mt-5" style={{ color: 'rgba(255,255,255,0.5)' }}>Opportunità, clienti qualificati, co-investimento. Il tuo lavoro amplificato.</p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════ CTA ═══════ */}
      <section className="bg-[#0D1520] text-center" style={{ padding: '60px 24px' }}>
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

