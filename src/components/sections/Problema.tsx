'use client'

import { useRef, useEffect, useState } from 'react'
import {
  PieChart, Pie, Cell as PieCell,
  ComposedChart, Bar, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import { Link } from '@/i18n/navigation'

/* ════════════════════════════════════════
   DATA
   ════════════════════════════════════════ */

const DATA_ITEMS = [
  { tema: 'Ricchezza privata', ieri: '$1.200 miliardi', oggi: '$131.000 miliardi', domani: '$292.000 miliardi', desc: 'Ricchezza globale individui ad alto patrimonio', source: 'Capgemini, Credit Suisse' },
  { tema: 'Grandi patrimoni in Italia', ieri: '12.000', oggi: '240.000', domani: '323.000', desc: 'Individui ad alto patrimonio netto in Italia', source: 'Capgemini 2025' },
  { tema: 'Patrimonio bloccato', ieri: '30-40%', oggi: '67%', domani: '75%+', desc: 'Della ricchezza degli imprenditori è in azienda. Illiquida. Concentrata.', source: "Banca d'Italia, AIDAF" },
  { tema: 'Concentrazione top 1%', ieri: '10,5%', oggi: '22,2%', domani: '25%', desc: 'Della ricchezza italiana nelle mani dell\u20191% delle famiglie', source: 'Credit Suisse Global Wealth Report' },
]

const DATA_CONFRONTO = [
  {
    tema: 'TRASFERIMENTO RICCHEZZA',
    pairs: [
      { label: 'Ricchezza globale in trasferimento', value: '$124.000 miliardi', sub: 'entro il 2048' },
      { label: 'Di cui da grandi patrimoni', value: '$62.000 miliardi', sub: 'HNWI e UHNWI' },
      { label: 'Imprese italiane coinvolte', value: '2-2,5 milioni', sub: 'nel prossimo decennio' },
    ],
    source: 'Cerulli Associates 2024',
  },
  {
    tema: 'FAMILY OFFICE ITALIANI',
    pairs: [
      { label: 'Patrimonio gestito', value: '\u20AC850 miliardi', sub: 'oggi' },
      { label: 'Strutture attive', value: '244', sub: 'oggi' },
      { label: 'Strutture previste', value: '533', sub: 'nel 2040 (+118%)' },
    ],
    source: 'AIFI 2025',
  },
]

const PIE_1960 = [
  { name: 'Real Estate', value: 75 },
  { name: 'Depositi', value: 20 },
  { name: 'Gov Bonds', value: 5 },
]
const PIE_1990 = [
  { name: 'Real Estate', value: 68 },
  { name: 'Depositi', value: 18 },
  { name: 'Gov Bonds', value: 12 },
  { name: 'Fondi', value: 2 },
]
const PIE_2025 = [
  { name: 'Real Estate', value: 63 },
  { name: 'Depositi', value: 12 },
  { name: 'Gov Bonds', value: 18 },
  { name: 'Equity', value: 6 },
  { name: 'Fondi/ETF', value: 6 },
  { name: 'Insurance', value: 6 },
  { name: 'Alternative', value: 2 },
]
const PIE_COLORS = ['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.25)', 'rgba(255,255,255,0.4)', 'rgba(201,145,43,0.4)', '#C9912B', 'rgba(201,145,43,0.7)', 'rgba(160,110,20,0.9)']

const PMI_FATE = [
  { year: '2025', italiane: 207, foreign: 0, ebitda: 7.2, foreignPct: 29 },
  { year: '2028', italiane: 195, foreign: 12, ebitda: 6.5, foreignPct: 33 },
  { year: '2030', italiane: 185, foreign: 22, ebitda: 5.8, foreignPct: 37 },
  { year: '2032', italiane: 172, foreign: 35, ebitda: 5.0, foreignPct: 42 },
  { year: '2035', italiane: 155, foreign: 52, ebitda: 4.0, foreignPct: 48 },
  { year: '2038', italiane: 148, foreign: 59, ebitda: 3.2, foreignPct: 51 },
  { year: '2040', italiane: 140, foreign: 65, ebitda: 2.5, foreignPct: 55 },
]

const MEGATRENDS = [
  { title: 'ACQUISIZIONI ESTERE', num: '48-55%', desc: 'delle PMI italiane controllata da stranieri entro 2040. Oggi è il 29%.', extra: 'Cina, Medio Oriente, fondi USA dominano. Via della Seta consolidata. Golden Power insufficiente.' },
  { title: 'EMIGRAZIONE RICCHEZZA', num: '\u20AC10-30 miliardi', desc: "all'anno lasciano l'Italia. 5.000-8.000 grandi patrimoni emigrano.", extra: 'Emirati e Singapore: 0% successioni. Italia: 4-8%. Flat tax \u20AC200.000 non compensa.' },
  { title: 'LONGEVITÀ ESTREMA', num: '22% oltre i 70', desc: 'dei leader aziendali entro il 2040. Eredi prendono controllo a 50-55 anni.', extra: 'Aspettativa di vita 85-88 anni. Aziende gestite da 75enni con CdA senza under-45.' },
  { title: 'FALLIMENTO GENERAZIONALE', num: '30% fallisce', desc: 'entro 5 anni dalla successione. Solo il 13% arriva alla terza generazione.', extra: "39% imprenditori: nessun erede sarà in azienda. Fuga di cervelli: i migliori emigrano." },
  { title: 'TSUNAMI REGOLATORIO', num: '\u20AC250.000 all\u2019anno', desc: 'costo medio conformità per PMI. 8 regolamenti UE simultanei 2025-2027.', extra: 'CSRD + AI Act + NIS2 + EUDR + GDPR + Cyber Resilience + Data Act + REACH.' },
  { title: 'COMPRESSIONE MARGINI', num: '7,2% \u2192 2,5%', desc: 'EBITDA medio PMI: clima (2-3pp) + conformità (2-4pp) + costi strutturali (2-3pp) = insolvenza.', extra: 'Margine 2,5% = zero investimenti in innovazione. Qualsiasi shock esterno diventa fatale.' },
]

const PARADOXES = [
  { front: 'Ricchezza alta', back: 'Liquidità bassa', detail: '67% bloccata in business equity. Vendere = perdere valore. Non vendere = non diversificare.' },
  { front: 'Azienda forte', back: 'Non vendibile bene', detail: 'Senza preparazione: valuation \u2193 20-30%. Il 70% dei mandati M&A non chiude.' },
  { front: 'Figli presenti', back: 'Non coinvolti', detail: "39% imprenditori: nessun erede sarà in azienda. Chi è capace emigra." },
]

/* ════════════════════════════════════════
   SHARED COMPONENTS
   ════════════════════════════════════════ */

function NumberCircle({ num, bg = '#C9912B', size = 32 }: { num: string; bg?: string; size?: number }) {
  return (
    <div className="flex items-center justify-center rounded-full flex-shrink-0" style={{ width: size, height: size, backgroundColor: bg }}>
      <span className="font-sans font-bold text-white" style={{ fontSize: size * 0.39 }}>{num}</span>
    </div>
  )
}

const ChartTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null
  return (
    <div style={{ backgroundColor: '#1A2744', border: '1px solid rgba(201,145,43,0.2)', borderRadius: 8, padding: '12px 16px' }}>
      <p className="font-sans text-[12px] text-white font-bold">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} className="font-sans text-[11px]" style={{ color: p.color || '#C9912B' }}>
          {p.name}: {typeof p.value === 'number' ? p.value.toLocaleString('it-IT') : p.value}%
        </p>
      ))}
    </div>
  )
}

const PieTooltipContent = ({ active, payload }: any) => {
  if (!active || !payload?.[0]) return null
  const d = payload[0]
  return (
    <div style={{ backgroundColor: '#1A2744', border: '1px solid rgba(201,145,43,0.2)', borderRadius: 8, padding: '10px 14px' }}>
      <p className="font-sans text-[12px] text-white font-bold">{d.name}</p>
      <p className="font-sans text-[11px]" style={{ color: '#C9912B' }}>{d.value}%</p>
    </div>
  )
}

function formatNumber(n: number): string {
  if (n === 22.2) return '22,2'
  return Math.floor(n).toLocaleString('it-IT')
}

function AnimatedCounter({ target, suffix = '', prefix = '', className = '', style = {} }: {
  target: number; suffix?: string; prefix?: string; className?: string; style?: React.CSSProperties
}) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started) {
        setStarted(true)
        const steps = 60
        const inc = target / steps
        let cur = 0
        const iv = setInterval(() => {
          cur += inc
          if (cur >= target) { setCount(target); clearInterval(iv) }
          else setCount(cur)
        }, 2000 / steps)
      }
    }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [target, started])

  return <span ref={ref} className={className} style={style}>{prefix}{formatNumber(count)}{suffix}</span>
}

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
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
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}>
      {children}
    </div>
  )
}

function ScaleIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => setVisible(true), delay); obs.disconnect() }
    }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])
  return (
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? 'scale(1)' : 'scale(0.5)', transition: 'opacity 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
      {children}
    </div>
  )
}

/* Confronto datum — single value with slide-in animation */
function ConfrontoDatum({ label, value, sub, index, parentIndex }: {
  label: string; value: string; sub: string; index: number; parentIndex: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !visible) {
        setTimeout(() => setVisible(true), parentIndex * 300 + index * 200)
        obs.disconnect()
      }
    }, { threshold: 0.2 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [index, parentIndex, visible])

  return (
    <div ref={ref} className="flex items-baseline gap-4 transition-all duration-700" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateX(0)' : 'translateX(-30px)' }}>
      <span className="font-serif text-[28px] md:text-[34px] font-bold leading-none flex-shrink-0" style={{ color: '#C9912B' }}>{value}</span>
      <div className="min-w-0">
        <p className="font-sans text-[13px]" style={{ color: 'rgba(255,255,255,0.6)' }}>{label}</p>
        <p className="font-sans text-[11px]" style={{ color: 'rgba(255,255,255,0.25)' }}>{sub}</p>
      </div>
    </div>
  )
}

/* Single data item — 3 fields: ieri / oggi / domani */
function DataItem({ item, index }: { item: typeof DATA_ITEMS[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !visible) {
        setTimeout(() => setVisible(true), index * 150)
        obs.disconnect()
      }
    }, { threshold: 0.2 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [index, visible])

  return (
    <div
      ref={ref}
      className="transition-all duration-700"
      style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)' }}
    >
      <p className="font-sans text-[13px] font-bold uppercase mb-4" style={{ color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em' }}>{item.tema}</p>
      <div className="grid grid-cols-3 gap-3">
        <div>
          <span className="font-sans text-[10px] uppercase block mb-1" style={{ color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em' }}>Ieri</span>
          <span className="font-serif text-[22px] md:text-[26px] font-bold block leading-tight" style={{ color: 'rgba(255,255,255,0.35)' }}>{item.ieri}</span>
        </div>
        <div>
          <span className="font-sans text-[10px] uppercase block mb-1" style={{ color: 'rgba(201,145,43,0.6)', letterSpacing: '0.1em' }}>Oggi</span>
          <span className="font-serif text-[22px] md:text-[26px] font-bold block leading-tight" style={{ color: '#C9912B' }}>{item.oggi}</span>
        </div>
        <div>
          <span className="font-sans text-[10px] uppercase block mb-1" style={{ color: 'rgba(231,76,60,0.5)', letterSpacing: '0.1em' }}>Domani</span>
          <span className="font-serif text-[22px] md:text-[26px] font-bold block leading-tight" style={{ color: '#E74C3C' }}>{item.domani}</span>
        </div>
      </div>
      <div className="mt-3 h-[1px]" style={{ background: 'linear-gradient(to right, rgba(255,255,255,0.05), rgba(201,145,43,0.15), rgba(231,76,60,0.1))' }} />
      <p className="font-sans text-[13px] mt-3" style={{ color: 'rgba(255,255,255,0.5)' }}>{item.desc}</p>
      <p className="font-sans text-[10px] mt-1" style={{ color: 'rgba(255,255,255,0.2)' }}>{item.source}</p>
    </div>
  )
}

/* ════════════════════════════════════════
   HERO PHOTOS
   ════════════════════════════════════════ */

const HERO_PHOTOS: { src: string; fallbackGradient: string; label: string; desc: string }[] = [
  { src: '/images/franchi-60.jpg', fallbackGradient: 'linear-gradient(135deg, #8B7355, #5C4A32)', label: "ANNI '60", desc: 'Il boom economico. Si costruiva dal nulla, con coraggio e fatica.' },
  { src: '/images/franchi-80.jpg', fallbackGradient: 'linear-gradient(135deg, #2E5090, #C9912B)', label: "ANNI '80", desc: "L'espansione. Capitali, immobili, il Made in Italy industriale. Il patrimonio nasceva." },
  { src: '/images/foto 3.png', fallbackGradient: 'linear-gradient(135deg, #1A2744, #0D1520)', label: 'ANNI 2020', desc: 'La complessità. Globalizzazione, regolamentazione, tech. I vecchi modelli non bastano più.' },
  { src: '/images/foto 4.png', fallbackGradient: 'linear-gradient(135deg, #0D1520, rgba(201,145,43,0.2))', label: 'OGGI', desc: 'Il bivio. Chi evolve sopravvive. Chi resta fermo perde il valore di una vita.' },
]

function HeroPhoto({ photo }: { photo: typeof HERO_PHOTOS[number] }) {
  const [hovered, setHovered] = useState(false)
  const [imgError, setImgError] = useState(false)
  return (
    <div className="relative overflow-hidden rounded-lg" style={{ aspectRatio: '4/3' }} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      {imgError ? (
        <div className="absolute inset-0 flex items-center justify-center" style={{ background: photo.fallbackGradient }}>
          <span className="font-serif text-[28px] text-white/40">{photo.label}</span>
        </div>
      ) : (
        <img src={photo.src} alt={photo.label} onError={() => setImgError(true)} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[400ms]" style={{ transform: hovered ? 'scale(1.05)' : 'scale(1)' }} />
      )}
      <div className="absolute inset-0 transition-opacity duration-[400ms]" style={{ backgroundColor: '#0D1520', opacity: hovered ? 0.15 : 0.25 }} />
      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10">
        <span className="font-sans text-[12px] text-white uppercase rounded" style={{ letterSpacing: '0.15em', backgroundColor: 'rgba(0,0,0,0.4)', padding: '4px 14px' }}>{photo.label}</span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex justify-center z-10 pb-3 px-2">
        <span className="font-sans text-[11px] text-center rounded" style={{ color: 'rgba(255,255,255,0.8)', backgroundColor: 'rgba(0,0,0,0.5)', padding: '8px 16px' }}>{photo.desc}</span>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════
   CONFRONTO ROW
   ════════════════════════════════════════ */

function ConfrontoRow({ num, leftTitle, leftText, rightTitle, rightText, rightSource, rightExtra }: {
  num: string
  leftTitle: string; leftText: string
  rightTitle: string; rightText: string; rightSource?: string
  rightExtra?: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  return (
    <FadeIn>
      <div
        className="cursor-pointer select-none"
        onClick={() => setOpen((v) => !v)}
      >
        {/* Titles row — always visible */}
        <div className="grid grid-cols-1 md:grid-cols-2 py-5">
          <div className="flex items-center gap-3 pr-6 md:pr-10 md:border-r" style={{ borderColor: 'rgba(201,145,43,0.15)' }}>
            <NumberCircle num={num} />
            <h4 className="font-sans text-[16px] font-bold" style={{ color: 'rgba(255,255,255,0.5)' }}>{leftTitle}</h4>
          </div>
          <div className="flex items-center gap-3 pl-0 md:pl-10 mt-2 md:mt-0">
            <NumberCircle num={num} />
            <h4 className="font-sans text-[16px] font-bold text-white flex-1">{rightTitle}</h4>
            <svg
              width="20" height="20" viewBox="0 0 20 20"
              className="flex-shrink-0 transition-transform duration-300"
              style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
            >
              <path d="M5 8 L10 13 L15 8" stroke="#C9912B" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Expandable content */}
        <div
          style={{
            maxHeight: open ? 1200 : 0,
            overflow: 'hidden',
            transition: 'max-height 0.5s ease',
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 pb-6">
            <div className="pr-6 md:pr-10 md:border-r" style={{ borderColor: 'rgba(201,145,43,0.15)', backgroundColor: 'rgba(255,255,255,0.01)' }}>
              <p className="font-sans text-[14px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>{leftText}</p>
            </div>
            <div className="pl-0 md:pl-10 mt-4 md:mt-0" style={{ backgroundColor: 'rgba(201,145,43,0.02)' }}>
              <p className="font-sans text-[14px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>{rightText}</p>
              {rightSource && <p className="font-sans text-[10px] mt-2" style={{ color: 'rgba(255,255,255,0.2)' }}>Fonti: {rightSource}</p>}
              {rightExtra}
            </div>
          </div>
        </div>
      </div>
      <div className="h-[1px]" style={{ background: 'linear-gradient(to right, transparent, rgba(201,145,43,0.1), transparent)' }} />
    </FadeIn>
  )
}

/* ════════════════════════════════════════
   MAIN
   ════════════════════════════════════════ */

export function ProblemaPage() {
  const [hoveredTrend, setHoveredTrend] = useState<number | null>(null)
  const [goldPhraseVisible, setGoldPhraseVisible] = useState(false)
  const [bigCountStarted, setBigCountStarted] = useState(false)
  const [oneInFourVisible, setOneInFourVisible] = useState(false)
  const bigCountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const t = setTimeout(() => setGoldPhraseVisible(true), 1200)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const el = bigCountRef.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !bigCountStarted) {
        setBigCountStarted(true)
        setTimeout(() => setOneInFourVisible(true), 3000)
      }
    }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [bigCountStarted])

  return (
    <div className="bg-[#0D1520]">

      {/* ═══════ S1: HERO ═══════ */}
      <section className="pt-24 md:pt-28 min-h-[90vh] flex flex-col md:flex-row">
        <div className="w-full md:w-[45%] flex items-center justify-center px-8 md:px-16 py-16 md:py-0">
          <div style={{ maxWidth: 500 }}>
            <h1 className="font-serif text-[36px] md:text-[44px] text-white leading-[1.3]">Quando il sistema cambia,</h1>
            <p className="font-serif text-[36px] md:text-[44px] font-bold leading-[1.3] mt-1" style={{ color: '#C9912B' }}>anche tu devi evolvere.</p>
            <p className="font-sans text-[17px] italic leading-[1.5] transition-opacity duration-700" style={{ color: '#C9912B', marginTop: 40, paddingLeft: 16, borderLeft: '2px solid rgba(201,145,43,0.4)', opacity: goldPhraseVisible ? 1 : 0 }}>
              Il costo del restare immobili e non agire è troppo elevato oggi.
            </p>
          </div>
        </div>
        <div className="w-full md:w-[55%] grid grid-cols-2 gap-2 p-2 md:p-4 self-center">
          {HERO_PHOTOS.map((photo, i) => <HeroPhoto key={i} photo={photo} />)}
        </div>
      </section>

      {/* ═══════ S2: DATI ═══════ */}
      <section className="px-6 bg-[#0D1520]" style={{ padding: '100px 24px' }}>
        <div className="max-w-[1200px] mx-auto">
          <h2 className="font-serif text-[32px] text-white mb-12">I numeri di un sistema che cambia</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-14">
            {DATA_ITEMS.map((item, i) => <DataItem key={i} item={item} index={i} />)}
          </div>

          {/* Confronto cards — dati a confronto con effetto */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-14 pt-14" style={{ borderTop: '1px solid rgba(201,145,43,0.1)' }}>
            {DATA_CONFRONTO.map((card, ci) => (
              <FadeIn key={ci} delay={ci * 200}>
                <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(201,145,43,0.12)', background: 'linear-gradient(135deg, rgba(201,145,43,0.04) 0%, rgba(13,21,32,1) 100%)' }}>
                  <div className="px-6 pt-6 pb-4">
                    <p className="font-sans text-[11px] font-bold uppercase" style={{ color: 'rgba(201,145,43,0.5)', letterSpacing: '0.15em' }}>{card.tema}</p>
                  </div>
                  <div className="px-6 pb-6 space-y-5">
                    {card.pairs.map((p, pi) => (
                      <ConfrontoDatum key={pi} label={p.label} value={p.value} sub={p.sub} index={pi} parentIndex={ci} />
                    ))}
                  </div>
                  <div className="px-6 py-3" style={{ backgroundColor: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                    <p className="font-sans text-[10px]" style={{ color: 'rgba(255,255,255,0.2)' }}>{card.source}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ S3: CONFRONTO PASSATO vs OGGI ═══════ */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-[1100px] mx-auto">

          {/* Headers */}
          <div className="grid grid-cols-1 md:grid-cols-2 mb-14">
            <div className="pr-6 md:pr-10 md:border-r pb-6 md:pb-0" style={{ borderColor: 'rgba(201,145,43,0.15)' }}>
              <span className="font-serif text-[40px] md:text-[48px] block" style={{ color: 'rgba(255,255,255,0.4)' }}>IERI</span>
              <span className="font-sans text-[18px] block mt-2" style={{ color: 'rgba(255,255,255,0.3)' }}>Il modello che ha creato ricchezza</span>
            </div>
            <div className="pl-0 md:pl-10">
              <span className="font-serif text-[40px] md:text-[48px] font-bold block" style={{ color: '#C9912B' }}>OGGI E NEL BREVE PERIODO</span>
              <span className="font-sans text-[18px] block mt-2" style={{ color: 'rgba(201,145,43,0.5)' }}>Il modello che deve proteggerla</span>
            </div>
          </div>

          {/* Row 1 — Geoeconomia */}
          <ConfrontoRow
            num="01"
            leftTitle="MERCATI LOCALI"
            leftText="L'imprenditore conosceva i suoi clienti per nome. L'esportazione era un'eccezione (15% PIL). I concorrenti erano nella stessa provincia. I fornitori a un'ora di macchina."
            rightTitle="COMPETIZIONE GLOBALE"
            rightText="Il 40% delle PMI è orientata all'esportazione. Catene di fornitura interrotte 3-6 mesi all'anno. Costi spedizione da €2.000 a €15.000 per container con 10 giorni di preavviso. Prezzo carbonio UE da €80 a €150+ per tonnellata. Il 29% delle PMI è già controllato da stranieri. Sarà il 48-55% nel 2040."
            rightSource="Eurostat, ISTAT, EU ETS 2025"
          />

          {/* Row 2 — Margini e patrimonio */}
          <ConfrontoRow
            num="02"
            leftTitle="MARGINI ALTI, PATRIMONIO SEMPLICE"
            leftText="Margini EBITDA 12-18%. L'azienda generava cassa. Il patrimonio era l'azienda stessa. Il conto corrente bastava. Nessuna commistione da gestire perché c'era solo l'azienda."
            rightTitle="MARGINI COMPRESSI, PATRIMONIO COMPLESSO"
            rightText="EBITDA medio PMI: 7,2% oggi, verso il 2,5% nel 2040. Clima (2-3pp), conformità normativa (2-4pp), costi strutturali (2-3pp) erodono tutto. Nel frattempo il patrimonio si è ramificato: azienda, immobili, finanza, partecipazioni, polizze, previdenza. Ma i flussi aziendali e quelli personali restano mescolati. Nessuno li separa, nessuno li ottimizza come sistema."
            rightSource="AUB Bocconi, AIPB 2025"
          />

          {/* Row 3 — Servizi e intermediari */}
          <ConfrontoRow
            num="03"
            leftTitle="LA BANCA E IL COMMERCIALISTA"
            leftText="Due interlocutori. La banca dava il credito. Il commercialista faceva il bilancio. Fine. Costi contenuti, tempo dedicato: quasi zero. L'imprenditore gestiva l'azienda, il resto si gestiva da solo."
            rightTitle="5-7 PROFESSIONISTI, ZERO COORDINAMENTO"
            rightText="Commercialista, avvocato, private banker, assicuratore, consulente immobiliare, notaio, fiscalista. Ognuno bravo nel suo campo. Ma si parlano tra loro? Sanno cosa fa l'altro? Il risultato:"
            rightSource="AIPB, ABI 2025"
            rightExtra={
              <div className="mt-5 space-y-3">
                {[
                  { tag: '+ COSTI', text: 'Due due-diligence per la stessa operazione. Tre pareri legali per lo stesso problema.' },
                  { tag: '+ TEMPO', text: "L'imprenditore diventa il coordinatore involontario. Tempo tolto all'azienda, alla famiglia, a sé stesso." },
                  { tag: '+ DISTRAZIONI', text: 'Decisioni incoerenti. Gap assicurativi. Fiscalità non ottimizzata. Successione rimandata.' },
                ].map((b, i) => (
                  <div key={i} className="rounded-lg" style={{ backgroundColor: 'rgba(231,76,60,0.08)', borderLeft: '2px solid #E74C3C', padding: '12px 16px' }}>
                    <span className="font-sans text-[16px] font-bold block" style={{ color: '#E74C3C' }}>{b.tag}</span>
                    <span className="font-sans text-[12px] block mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>{b.text}</span>
                  </div>
                ))}
                <p className="font-sans text-[14px] italic mt-4" style={{ color: 'rgba(255,255,255,0.5)', borderLeft: '2px solid #C9912B', paddingLeft: 16 }}>
                  E questo incide sul resto del patrimonio: immobili non ottimizzati, investimenti frammentati, rischi non mappati, famiglia non preparata.
                </p>
              </div>
            }
          />

          {/* Row 4 — Competizione per talenti */}
          <ConfrontoRow
            num="04"
            leftTitle="MANODOPERA ABBONDANTE"
            leftText="L'Italia aveva 56 milioni di abitanti in crescita. Trovare lavoratori non era un problema. Le competenze si trasmettevano in azienda."
            rightTitle="CARENZA DI COMPETENZE ESTREMA"
            rightText="30-40% dei ruoli nelle PMI manifatturiere resterà scoperto entro il 2027-2030. I baby boomer vanno in pensione. La GenZ ha il 48% di incidenza di ansia o depressione. Formare un operaio specializzato costa €20.000-40.000 e richiede 2-3 anni. Trovare un tornitore CNC sotto i 30 anni è quasi impossibile."
            rightSource="Confindustria, Eurostat 2025"
          />

          {/* Row 5 — Regolamentazione */}
          <ConfrontoRow
            num="05"
            leftTitle="POCHE REGOLE, MOLTA LIBERTÀ"
            leftText="Normative semplici. La burocrazia esisteva ma non bloccava. Si poteva costruire rapidamente."
            rightTitle="TSUNAMI REGOLATORIO"
            rightText="8 regolamenti UE simultanei tra 2025 e 2027: CSRD, AI Act, NIS2, EUDR, GDPR, Cyber Resilience Act, EU Data Act, REACH. Costo medio per PMI: €170.000-555.000 all'anno. Media: €250.000. Cumulativo in 5 anni: €1.250.000. Capitale che esce dall'innovazione per entrare nella conformità."
            rightSource="EU Commission, OECD 2025"
          />

          {/* Row 6 — Macro */}
          <ConfrontoRow
            num="06"
            leftTitle="STABILITÀ"
            leftText="Inflazione alta ma prevedibile. Cambi fissi. Geopolitica bipolare ma stabile. L'imprenditore pianificava a 10 anni."
            rightTitle="VOLATILITÀ PERMANENTE"
            rightText="Tassi da 0% a 4-5% in 18 mesi. Inflazione 5-8% (2022-2024). Guerre commerciali, sanzioni, rilocalizzazione. Il 32% delle aziende italiane ha già riavvicinato la produzione nel 2024. Il 45% lo farà nel 2025. L'esportazione italiana perde quote verso Est Europa e Nord Africa."
            rightSource="Confindustria, SACE 2025"
          />

          {/* CONCLUSIONE */}
          <div className="text-center" style={{ padding: '60px 0' }}>
            <FadeIn>
              <p className="font-sans text-[20px]" style={{ color: 'rgba(255,255,255,0.6)' }}>
                Tutto questo ha portato a una situazione
              </p>
            </FadeIn>
            <ScaleIn delay={300}>
              <p className="font-serif text-[48px] md:text-[56px] font-bold mt-4" style={{ color: '#E74C3C' }}>
                INSOSTENIBILE
              </p>
            </ScaleIn>
            <FadeIn delay={600}>
              <p className="font-sans text-[16px] mt-8 mx-auto" style={{ color: 'rgba(255,255,255,0.5)', maxWidth: 700 }}>
                Per gestire questa complessità l&apos;imprenditore si ritrova con 5-7 professionisti che non si parlano.
                Costa di più, ci vuole più tempo, genera più distrazioni.
                E nel frattempo il patrimonio, quello per cui ha lavorato una vita, resta frammentato.
              </p>
            </FadeIn>
          </div>

          {/* ASSET ALLOCATION — 3 TORTE */}
          <div className="mt-8">
            <h3 className="font-serif text-[24px] md:text-[28px] text-white mb-8">Come è cambiata l&apos;allocazione del patrimonio</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { data: PIE_1960, label: '1960', source: 'Banca d\u2019Italia' },
                { data: PIE_1990, label: '1990', source: 'Banca d\u2019Italia' },
                { data: PIE_2025, label: '2025', source: 'AIPB, Consob, Intesa Sanpaolo Survey 2024' },
              ].map((pie, pi) => (
                <div key={pi} className="text-center">
                  <div style={{ width: '100%', height: 250 }}>
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie
                          data={pie.data}
                          cx="50%"
                          cy="50%"
                          outerRadius={90}
                          innerRadius={30}
                          dataKey="value"
                          stroke="#0D1520"
                          strokeWidth={1}
                          animationBegin={pi * 300}
                          animationDuration={1200}
                        >
                          {pie.data.map((_, i) => (
                            <PieCell key={i} fill={PIE_COLORS[i] || PIE_COLORS[PIE_COLORS.length - 1]} />
                          ))}
                        </Pie>
                        <Tooltip content={<PieTooltipContent />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="font-sans text-[14px] font-bold mt-2" style={{ color: 'rgba(255,255,255,0.4)' }}>{pie.label}</p>
                  <p className="font-sans text-[9px] mt-1" style={{ color: 'rgba(255,255,255,0.2)' }}>{pie.source}</p>
                </div>
              ))}
            </div>
            <p className="font-sans text-[15px] italic text-center mt-8" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Dal mattone a un sistema complesso. Ma chi coordina le 7 classi di investimento?
            </p>
          </div>

        </div>
      </section>

      {/* ═══════ S4: MEGA-TREND ═══════ */}
      <section className="py-20 px-6" style={{ background: 'linear-gradient(180deg, #0D1520 0%, rgba(139,58,58,0.03) 100%)' }}>
        <div className="max-w-[1100px] mx-auto">
          <h2 className="font-serif text-[30px] md:text-[36px] text-white mb-2">6 forze che convergono</h2>
          <p className="font-sans text-[16px] mb-10" style={{ color: 'rgba(255,255,255,0.45)' }}>Ognuna da sola è gestibile. Insieme ridisegnano il mercato.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {MEGATRENDS.map((t, i) => (
              <div
                key={i}
                className="rounded-xl cursor-pointer transition-all duration-300"
                style={{
                  backgroundColor: hoveredTrend === i ? 'rgba(139,58,58,0.08)' : 'rgba(255,255,255,0.02)',
                  borderLeft: `3px solid ${hoveredTrend === i ? '#E74C3C' : '#8B3A3A'}`,
                  borderRadius: 12, padding: 32,
                  transform: hoveredTrend === i ? 'translateY(-4px)' : 'translateY(0)',
                  boxShadow: hoveredTrend === i ? '0 8px 32px rgba(0,0,0,0.3)' : 'none',
                }}
                onMouseEnter={() => setHoveredTrend(i)}
                onMouseLeave={() => setHoveredTrend(null)}
              >
                <div className="flex items-center gap-3 mb-4">
                  <NumberCircle num={String(i + 1).padStart(2, '0')} bg="#8B3A3A" />
                  <h4 className="font-sans text-[17px] font-bold text-white">{t.title}</h4>
                </div>
                <span className="font-serif text-[36px] md:text-[44px] font-bold block leading-none" style={{ color: '#C9912B' }}>{t.num}</span>
                <p className="font-sans text-[14px] mt-2" style={{ color: 'rgba(255,255,255,0.6)' }}>{t.desc}</p>
                <div style={{ maxHeight: hoveredTrend === i ? 120 : 0, overflow: 'hidden', transition: 'max-height 0.4s ease' }}>
                  <p className="font-sans text-[12px] mt-3 pt-3" style={{ color: 'rgba(255,255,255,0.4)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>{t.extra}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ S5: LE 207.000 PMI ═══════ */}
      <section className="px-6 bg-[#0D1520]" style={{ padding: '80px 24px' }}>
        <div className="max-w-[1100px] mx-auto">
          <FadeIn>
            <h2 className="font-serif text-[30px] md:text-[36px] text-white">Oggi ci sono circa 207.000 PMI di medie dimensioni in Italia.</h2>
            <p className="font-sans text-[14px] mt-2" style={{ color: 'rgba(255,255,255,0.3)' }}>(PMI con 20-249 dipendenti)</p>
            <p className="font-sans text-[11px] mt-1" style={{ color: 'rgba(255,255,255,0.2)' }}>Fonte: ISTAT, Eurostat, Cerved 2025</p>
            <p className="font-sans text-[17px] mt-4 mb-10" style={{ color: 'rgba(255,255,255,0.55)' }}>{'\u20AC'}3.500 miliardi di fatturato complessivo. L&apos;85% è a controllo familiare.</p>
          </FadeIn>

          <div style={{ width: '100%', height: 350 }}>
            <ResponsiveContainer>
              <ComposedChart data={PMI_FATE}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="year" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} />
                <YAxis yAxisId="left" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} label={{ value: 'Migliaia PMI', angle: -90, position: 'insideLeft', style: { fill: 'rgba(255,255,255,0.3)', fontSize: 10 } }} />
                <YAxis yAxisId="right" orientation="right" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} label={{ value: '%', angle: 90, position: 'insideRight', style: { fill: 'rgba(255,255,255,0.3)', fontSize: 10 } }} domain={[0, 60]} />
                <Tooltip content={<ChartTooltip />} />
                <Legend wrapperStyle={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }} />
                <Bar yAxisId="left" dataKey="italiane" stackId="a" fill="rgba(255,255,255,0.55)" name="Italiane indipendenti" />
                <Bar yAxisId="left" dataKey="foreign" stackId="a" fill="rgba(255,255,255,0.15)" name="Controllate da stranieri" />
                <Line yAxisId="right" type="monotone" dataKey="ebitda" stroke="rgba(255,255,255,0.5)" strokeWidth={2} strokeDasharray="6 3" dot={false} name="EBITDA %" />
                <Line yAxisId="right" type="monotone" dataKey="foreignPct" stroke="#E74C3C" strokeWidth={2} dot={false} name="Controllo estero %" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Big counter + arrow + 1 su 4 */}
          <div ref={bigCountRef} className="text-center mt-16">
            <AnimatedCounter target={52000} className="font-serif font-bold block leading-none" style={{ fontSize: 72, color: '#E74C3C' }} />
            <p className="font-sans text-[18px] md:text-[20px] mt-4" style={{ color: 'rgba(255,255,255,0.65)' }}>
              PMI su 207.000 chiuderanno o saranno vendute forzatamente entro il 2040.
            </p>

            {/* Animated arrow */}
            <div className="my-8 flex justify-center">
              <svg width="24" height="60" viewBox="0 0 24 60" style={{ animation: 'arrowBounce 2s ease-in-out infinite' }}>
                <path d="M12 0 L12 52 M4 44 L12 52 L20 44" stroke="#C9912B" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <style>{`@keyframes arrowBounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(10px); } }`}</style>

            <div className="transition-all duration-700" style={{ opacity: oneInFourVisible ? 1 : 0, transform: oneInFourVisible ? 'scale(1)' : 'scale(0.6)' }}>
              <span className="font-serif font-bold block leading-none" style={{ fontSize: 96, color: '#E74C3C' }}>1 su 4</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ S6: FLIP CARDS ═══════ */}
      <section className="py-16 px-6">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="font-serif text-[32px] text-white mb-8 text-center">Tre paradossi</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PARADOXES.map((p, i) => (
              <div key={i} className="group" style={{ perspective: 1000, height: 280 }}>
                <div className="relative w-full h-full transition-transform duration-[600ms] ease-in-out" style={{ transformStyle: 'preserve-3d' }}>
                  <div className="absolute inset-0 rounded-xl flex flex-col items-center justify-center group-hover:[transform:rotateY(180deg)] transition-transform duration-[600ms] ease-in-out" style={{ backfaceVisibility: 'hidden', backgroundColor: '#0D1520', border: '1px solid rgba(201,145,43,0.15)' }}>
                    <NumberCircle num={String(i + 1).padStart(2, '0')} size={36} />
                    <p className="font-serif text-[26px] text-white mt-4">{p.front}</p>
                  </div>
                  <div className="absolute inset-0 rounded-xl flex flex-col items-center justify-center px-6 group-hover:[transform:rotateY(0deg)] [transform:rotateY(-180deg)] transition-transform duration-[600ms] ease-in-out" style={{ backfaceVisibility: 'hidden', backgroundColor: '#1A2744' }}>
                    <p className="font-serif text-[26px]" style={{ color: '#C9912B' }}>{p.back}</p>
                    <p className="font-sans text-[14px] text-center mt-4" style={{ color: 'rgba(255,255,255,0.6)' }}>{p.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ S7: FRASE FINALE ═══════ */}
      <section className="relative px-6" style={{ padding: '120px 24px' }}>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/img39.png')" }} />
        <div className="absolute inset-0 bg-[#0D1520]/60" />
        <div className="relative z-10 max-w-[800px] mx-auto text-center">
          <FadeIn>
            <p className="font-serif text-[30px] md:text-[36px] text-white leading-[1.4]">
              Oggi serve costruire modelli che preservino nel tempo la qualità della vita,
            </p>
          </FadeIn>
          <FadeIn delay={800}>
            <p className="font-serif text-[30px] md:text-[36px] font-bold leading-[1.4] mt-2" style={{ color: '#C9912B' }}>
              per noi e per chi verrà dopo.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══════ S8: CTA ═══════ */}
      <section className="bg-[#0D1520] text-center" style={{ padding: '80px 24px' }}>
        <p className="font-sans text-[18px] mb-10" style={{ color: 'rgba(255,255,255,0.55)' }}>Se questo è il problema, serve un approccio diverso.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/come-funziona" className="font-sans text-[14px] font-bold text-white rounded-lg transition-colors hover:opacity-90" style={{ backgroundColor: '#C9912B', padding: '16px 40px' }}>SCOPRI MINERVA</Link>
          <Link href="/contatti" className="font-sans text-[14px] rounded-lg transition-all duration-300 hover:bg-[#C9912B] hover:text-white" style={{ color: '#C9912B', border: '1px solid #C9912B', padding: '16px 40px' }}>PARLA CON NOI</Link>
        </div>
      </section>
    </div>
  )
}
