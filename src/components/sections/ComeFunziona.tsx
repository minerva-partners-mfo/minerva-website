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

const SYSTEM_LAYERS = [
  {
    num: '01',
    title: 'IL TEAM MINERVA — L\u2019HUB',
    subtitle: 'Le 4 competenze core che guidano ogni relazione.',
    items: ['M&A Advisory', 'Real Estate', 'Strategy Consulting', 'Wealth Management'],
    desc: 'L\u2019Hub è il cuore operativo. Ogni membro del team lavora trasversalmente su tutte le dimensioni del patrimonio. Non siamo specialisti in un solo campo: siamo architetti che vedono l\u2019intero sistema e coordinano ogni intervento.',
  },
  {
    num: '02',
    title: 'I PARTNER — 8 AREE SPECIALISTICHE',
    subtitle: 'Attivati quando servono, non prima.',
    items: ['Legal', 'Tax', 'Banking', 'Energy', 'Digital', 'Insurance', 'International', 'UHNWI'],
    desc: 'Professionisti selezionati con il Codice VERITAS. Ogni partner ha firmato il nostro codice etico e remunerativo. Si attivano su richiesta dell\u2019Hub, lavorano in coordinamento, e vengono valutati dopo ogni incarico.',
  },
  {
    num: '03',
    title: 'I FRIENDS + I TUOI ADVISOR + TU',
    subtitle: 'L\u2019ecosistema si allarga. Tu ne fai parte.',
    items: ['Specialisti verticali', 'Advisor di fiducia del cliente', 'Il cliente stesso'],
    desc: 'I Friends portano competenze non convenzionali, connessioni e prospettive laterali. I tuoi advisor di fiducia non vengono sostituiti: vengono integrati nel sistema. E tu, come cliente, non sei uno spettatore. Sei parte attiva della regia.',
  },
]

const VENN_DATA = [
  {
    label: 'NETWORKING',
    text: "Minerva Circle, Point Zero, Next Gen <> Gen Exit. Eventi esclusivi dove imprenditori, professionisti e famiglie si incontrano in un contesto strutturato. Le relazioni migliori nascono qui.",
    tags: [
      { label: 'Minerva Circle', href: '/eventi' },
      { label: 'Point Zero', href: '/point-zero' },
      { label: 'Next Gen <> Gen Exit', href: '/next-gen' },
    ],
  },
  {
    label: 'BACHECA &\nOFF-MARKET',
    text: "Il Portale Minerva: deal che non esistono sul mercato aperto. Cessioni riservate, portafogli privati, opportunit\u00e0 pre-auction. Ogni inserimento è filtrato dall\u2019Investment Committee. L\u2019accesso è riservato ai membri dell\u2019ecosistema.",
    tags: [
      { label: 'Deal M&A', href: '/abilitatori' },
      { label: 'Real Estate', href: '/abilitatori' },
      { label: 'Private Markets', href: '/abilitatori' },
    ],
  },
  {
    label: 'CLUB DEAL',
    text: "Operazioni selezionate dove Minerva investe a fianco dei partecipanti. Skin in the game: il nostro capitale accanto al vostro, stesse condizioni, stesso rischio. Governance chiara, SPV dedicato, IC validation.",
    tags: [
      { label: 'Co-investimento', href: '/club-deal' },
      { label: 'SPV', href: '/club-deal' },
      { label: 'IC Process', href: '/club-deal' },
    ],
  },
]

const DEFAULT_TEXT = 'Networking genera relazioni. Le relazioni generano deal. I deal generano co-investimento. Il ciclo si alimenta da solo.'

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

function NumberCircle({ num }: { num: string }) {
  return (
    <div className="flex items-center justify-center rounded-full flex-shrink-0" style={{ width: 40, height: 40, backgroundColor: '#C9912B' }}>
      <span className="font-sans text-[15px] font-bold text-white">{num}</span>
    </div>
  )
}

/* ════════════════════════════════════════
   MAIN
   ════════════════════════════════════════ */

export function ComeFunzionaPage() {
  return (
    <div className="bg-[#0D1520]">

      {/* ═══════ HERO — Full-page freepik entry ═══════ */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/freepik__wide-detail-shot-senza-persone-di-una-sala-riunion__12882.png')" }} />
        <div className="absolute inset-0 bg-[#0D1520]/55" />
        <div className="absolute inset-x-0 bottom-0 h-[250px] bg-gradient-to-t from-[#0D1520] to-transparent" />
        <div className="relative z-10 flex items-end h-full pb-24 px-6">
          <div className="max-w-[900px] mx-auto">
            <p className="font-sans text-[12px] uppercase tracking-[0.2em] mb-4" style={{ color: 'rgba(201,145,43,0.7)' }}>IL MODELLO MINERVA</p>
            <h1 className="font-serif text-[40px] md:text-[56px] text-white leading-[1.15]">Come funziona Minerva</h1>
          </div>
        </div>
      </section>

      {/* ═══════ STATEMENT ═══════ */}
      <section className="py-24 px-6">
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

      {/* ═══════ IL SISTEMA MINERVA — Expanded ═══════ */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-[1100px] mx-auto">
          <FadeIn>
            <h2 className="font-serif text-[32px] md:text-[40px] text-white mb-4 text-center">Il sistema Minerva</h2>
            <p className="font-sans text-[17px] md:text-[18px] text-center mb-6 mx-auto" style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 700 }}>
              Tre cerchi concentrici. Ognuno con un ruolo preciso. Insieme formano un sistema che vede, coordina e protegge ogni dimensione del patrimonio.
            </p>
          </FadeIn>

          {/* Concentric circles diagram */}
          <FadeIn delay={200}>
            <div className="relative flex items-center justify-center mx-auto mb-16" style={{ height: 440, maxWidth: 440 }}>
              {/* Outer */}
              <div className="absolute rounded-full border border-dashed flex items-center justify-center" style={{ width: 420, height: 420, borderColor: 'rgba(255,255,255,0.15)' }}>
                <span className="absolute top-5 font-sans text-[11px] font-semibold tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>I Friends + Tu</span>
              </div>
              {/* Middle */}
              <div className="absolute rounded-full flex items-center justify-center" style={{ width: 280, height: 280, backgroundColor: 'rgba(201,145,43,0.07)', border: '1px solid rgba(201,145,43,0.2)' }}>
                <span className="absolute top-5 font-sans text-[11px] font-semibold tracking-[0.2em] uppercase" style={{ color: 'rgba(201,145,43,0.6)' }}>I Partner</span>
              </div>
              {/* Inner */}
              <div className="absolute rounded-full flex items-center justify-center" style={{ width: 150, height: 150, backgroundColor: '#C9912B' }}>
                <span className="font-sans text-[11px] font-bold tracking-[0.15em] uppercase text-center leading-tight" style={{ color: '#0D1520' }}>Il Team<br />Minerva</span>
              </div>
            </div>
          </FadeIn>

          {/* 3 layers — detailed */}
          <div className="space-y-16">
            {SYSTEM_LAYERS.map((layer, i) => (
              <FadeIn key={i} delay={i * 150}>
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="flex items-center gap-4 md:w-[380px] flex-shrink-0">
                    <NumberCircle num={layer.num} />
                    <div>
                      <h3 className="font-serif text-[22px] md:text-[26px] text-white leading-tight">{layer.title}</h3>
                      <p className="font-sans text-[14px] mt-1" style={{ color: 'rgba(201,145,43,0.7)' }}>{layer.subtitle}</p>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="font-sans text-[15px] md:text-[16px] leading-[1.7]" style={{ color: 'rgba(255,255,255,0.6)' }}>{layer.desc}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {layer.items.map((item, ii) => (
                        <span key={ii} className="font-sans text-[11px] px-3 py-1 rounded-full" style={{ color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}>{item}</span>
                      ))}
                    </div>
                  </div>
                </div>
                {i < SYSTEM_LAYERS.length - 1 && (
                  <div className="h-[1px] mt-16" style={{ background: 'linear-gradient(to right, transparent, rgba(201,145,43,0.1), transparent)' }} />
                )}
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ Full-page break — freepik financial reports ═══════ */}
      <section className="relative" style={{ height: '55vh', minHeight: 380 }}>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/freepik__macro-shot-of-highend-printed-financial-reports-an__12880.png')" }} />
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
            <div className="flex justify-between items-start max-w-[900px] mx-auto">
              {VERITAS_LETTERS.map((v, i) => (
                <div key={v.letter} className="text-center flex-1">
                  <div className="w-[56px] h-[56px] md:w-[76px] md:h-[76px] rounded-full flex items-center justify-center mx-auto mb-4" style={{ border: '2px solid #C9912B', backgroundColor: 'rgba(201,145,43,0.08)' }}>
                    <span className="font-serif text-[26px] md:text-[34px] font-bold" style={{ color: '#C9912B' }}>{v.letter}</span>
                  </div>
                  <span className="font-sans text-[14px] md:text-[16px] font-semibold block" style={{ color: 'rgba(255,255,255,0.6)' }}>{v.word}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════ LE POSSIBILITÀ — Venn ═══════ */}
      <VennSection />

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

/* ════════════════════════════════════════
   VENN SECTION
   ════════════════════════════════════════ */

function VennSection() {
  const [hovered, setHovered] = useState<number | null>(null)
  const [circlesVisible, setCirclesVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setCirclesVisible(true); obs.disconnect() }
    }, { threshold: 0.2 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const active = hovered !== null ? VENN_DATA[hovered] : null

  return (
    <section className="px-6 bg-[#0D1520]" style={{ padding: '80px 24px' }}>
      <div className="max-w-[900px] mx-auto">
        <FadeIn>
          <h2 className="font-serif text-[30px] md:text-[36px] text-white text-center mb-3">
            Cosa si apre quando entri nell&apos;ecosistema
          </h2>
          <p className="font-sans text-[16px] text-center mb-14" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Tre dimensioni che si alimentano a vicenda.
          </p>
        </FadeIn>

        {/* Desktop */}
        <div ref={ref} className="hidden md:block relative mx-auto" style={{ width: 560, height: 420 }}>
          {[
            { idx: 0, style: { top: 20, left: 0 }, label: 'NETWORKING' },
            { idx: 1, style: { top: 20, right: 0 }, label: 'BACHECA &\nOFF-MARKET' },
            { idx: 2, style: { bottom: 0, left: '50%' }, label: 'CLUB DEAL' },
          ].map((c) => (
            <div
              key={c.idx}
              className="absolute rounded-full flex items-center justify-center cursor-pointer transition-all duration-500"
              style={{
                width: 280, height: 280, ...c.style,
                transform: c.idx === 2
                  ? (circlesVisible ? 'translateX(-50%) scale(1)' : 'translateX(-50%) scale(0)')
                  : (circlesVisible ? 'scale(1)' : 'scale(0)'),
                border: `2px solid ${hovered === c.idx ? '#C9912B' : 'rgba(201,145,43,0.4)'}`,
                backgroundColor: hovered === c.idx ? 'rgba(201,145,43,0.1)' : 'rgba(201,145,43,0.06)',
                boxShadow: hovered === c.idx ? '0 0 40px rgba(201,145,43,0.15)' : 'none',
                opacity: circlesVisible ? 1 : 0,
                transitionDelay: `${c.idx * 0.3}s`,
              }}
              onMouseEnter={() => setHovered(c.idx)}
              onMouseLeave={() => setHovered(null)}
            >
              <span className="font-serif text-[18px] md:text-[20px] font-bold text-center whitespace-pre-line" style={{ color: '#C9912B' }}>{c.label}</span>
            </div>
          ))}

          {/* Center */}
          <div className="absolute flex items-center justify-center pointer-events-none" style={{ width: 80, height: 30, top: '50%', left: '50%', transform: 'translate(-50%, -20px)', opacity: circlesVisible ? 1 : 0, transition: 'opacity 0.5s ease 0.9s' }}>
            <span className="font-sans text-[10px] uppercase" style={{ color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em' }}>L&apos;ECOSISTEMA</span>
          </div>
          <div className="absolute rounded-full pointer-events-none" style={{ width: 60, height: 60, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'rgba(201,145,43,0.15)', animation: circlesVisible ? 'vennPulse 4s ease-in-out infinite' : 'none', opacity: circlesVisible ? 1 : 0, transition: 'opacity 0.5s ease 0.9s' }} />
          <style>{`@keyframes vennPulse { 0%, 100% { opacity: 0.15; } 50% { opacity: 0.25; } }`}</style>
        </div>

        {/* Mobile */}
        <div className="md:hidden space-y-8">
          {VENN_DATA.map((d, i) => (
            <div key={i} className="rounded-xl p-6" style={{ border: '2px solid rgba(201,145,43,0.3)', backgroundColor: 'rgba(201,145,43,0.06)' }}>
              <span className="font-serif text-[20px] font-bold block mb-3 whitespace-pre-line" style={{ color: '#C9912B' }}>{d.label}</span>
              <p className="font-sans text-[14px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>{d.text}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {d.tags.map((tag, ti) => (
                  <Link key={ti} href={tag.href} className="font-sans text-[11px] px-3 py-1 rounded-full transition-colors hover:bg-[rgba(201,145,43,0.15)]" style={{ color: '#C9912B', border: '1px solid rgba(201,145,43,0.3)' }}>{tag.label}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Hover text */}
        <div className="hidden md:block mt-12 text-center" style={{ minHeight: 120 }}>
          <div className="transition-opacity duration-300" style={{ opacity: active ? 0 : 1, position: active ? 'absolute' : 'relative', pointerEvents: active ? 'none' : 'auto' }}>
            <p className="font-sans text-[16px] italic mx-auto" style={{ color: 'rgba(255,255,255,0.5)', maxWidth: 600 }}>{DEFAULT_TEXT}</p>
          </div>
          {VENN_DATA.map((d, i) => (
            <div key={i} className="transition-opacity duration-300" style={{ opacity: hovered === i ? 1 : 0, position: hovered === i ? 'relative' : 'absolute', pointerEvents: hovered === i ? 'auto' : 'none' }}>
              <p className="font-sans text-[15px] leading-relaxed mx-auto" style={{ color: 'rgba(255,255,255,0.65)', maxWidth: 600 }}>{d.text}</p>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {d.tags.map((tag, ti) => (
                  <Link key={ti} href={tag.href} className="font-sans text-[11px] px-3 py-1 rounded-full transition-colors hover:bg-[rgba(201,145,43,0.15)]" style={{ color: '#C9912B', border: '1px solid rgba(201,145,43,0.3)' }}>{tag.label}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
