'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Link } from '@/i18n/navigation'

/* ════════════════════════════════════════
   DATA
   ════════════════════════════════════════ */

const CAROUSEL_BLOCKS = [
  {
    num: '01', video: '/videos/wall-street.mp4',
    title: 'WALL STREET', subtitle: "La disciplina dell'esecuzione",
    points: [
      'Pipeline strutturata: ogni deal ha fasi, owner, deadline. Nessuna operazione resta nel limbo.',
      "Stage gate: l'Investment Committee valida ogni passaggio. Se non supera il gate, si ferma.",
      'Accountability: chi è responsabile del deal è responsabile del risultato. Le fee sono allineate.',
    ],
    result: 'Velocità senza improvvisazione.',
  },
  {
    num: '02', video: '/videos/geneva.mp4',
    title: 'GINEVRA', subtitle: 'La riservatezza come arte',
    points: [
      "NDA automatici: ogni interazione nell'ecosistema è coperta da riservatezza strutturata, non da promesse.",
      'Audit trail: chi ha visto cosa, quando, perché. Ogni accesso alle informazioni è tracciato.',
      'Chinese wall: le informazioni di un cliente non circolano verso un altro. Mai.',
    ],
    result: 'Fiducia costruita su regole, non su parole.',
  },
  {
    num: '03', video: '/videos/london.mp4',
    title: 'LONDRA', subtitle: 'La velocità delle decisioni',
    points: [
      'Workgroup in giorni: quando serve agire, si assembla il team in 48 ore. Non in settimane.',
      "Decision making: chi deve decidere ha l'autorità per farlo. Nessun comitato inutile.",
      'Execution: dalla decisione all\u2019azione il percorso è breve. I professionisti Minerva sono abituati a chiudere.',
    ],
    result: 'Tempo dimezzato, qualità invariata.',
  },
  {
    num: '04', video: '/videos/italy.mp4',
    title: 'ITALIA', subtitle: 'Il valore delle relazioni autentiche',
    points: [
      'Passaparola strutturato: il network cresce per introduzione diretta, non per marketing. Chi entra è garantito da chi lo presenta.',
      'Relazioni profonde: non vendiamo servizi. Costruiamo relazioni che durano 20 anni.',
      'DNA imprenditoriale: siamo figli di imprenditori. I problemi dei clienti li conosciamo perché li abbiamo vissuti.',
    ],
    result: 'Fiducia autentica, non commerciale.',
  },
  {
    num: '05', video: '/videos/singapore.mp4',
    title: 'SINGAPORE', subtitle: 'La visione globale',
    points: [
      "Cross-border: competenze italiane, opportunità internazionali. Il 48% delle PMI sarà straniero nel 2040: servono advisor che parlino entrambe le lingue.",
      'Regulatory arbitrage: conoscere le giurisdizioni per ottimizzare strutture (Italia, Svizzera, Lussemburgo, Dubai).',
      'Network globale: partnership con advisor internazionali per servire clienti ovunque.',
    ],
    result: 'Radici italiane, sguardo globale.',
  },
]

const INSPIRATIONS = [
  { name: 'R360', year: '2020 \u00b7 USA', text: 'Membership per patrimoni $100M+. Focus su legacy e purpose oltre la ricchezza.', inspired: 'Ha ispirato \u2192 VERITAS', href: '/veritas' },
  { name: 'TIGER 21', year: '1999 \u00b7 Global', text: 'Peer-to-peer learning e deal sharing tra imprenditori. Il valore è nel network, non nel prodotto.', inspired: 'Ha ispirato \u2192 Point Zero', href: '/point-zero' },
  { name: 'Wigmore Association', year: '2011 \u00b7 Global', text: 'Network di 8 multi-family office indipendenti. La prova che il modello federato funziona su scala globale.', inspired: 'Ha ispirato \u2192 La nostra architettura', href: undefined },
  { name: 'Wren Investment Office', year: '2016 \u00b7 UK', text: 'Scalare geograficamente senza aprire uffici, tramite partner selezionati.', inspired: 'Ha ispirato \u2192 Il modello Partner-as-a-Service', href: undefined },
  { name: 'Stonehage Fleming', year: '2014 \u00b7 UK/Global', text: 'Fusione di due giganti. Opera come ecosistema completo: legal, trust, deal. Il benchmark per servizi completi.', inspired: "Ha ispirato \u2192 La completezza dell'ecosistema", href: undefined },
  { name: 'Cresset', year: '2017 \u00b7 USA', text: 'Costruito da zero da clienti per clienti. Focus enorme su Private Markets e deal diretti.', inspired: 'Ha ispirato \u2192 Club Deal Minerva', href: '/club-deal' },
  { name: 'La tradizione svizzera', year: 'Secoli \u00b7 Svizzera', text: "La riservatezza come fondamento, non come opzione. Il segreto bancario è finito. La cultura della discrezione no.", inspired: 'Ha ispirato \u2192 Il Codice Minerva', href: '/codice' },
]

const SCATTER_CLUSTERS = [
  { name: 'Ecosistemi Federati', x: 75, y: 80, w: 22, h: 18, color: 'rgba(201,145,43,0.08)', points: ['Wigmore', 'Stonehage', 'WE Family', 'Pathstone', 'Cresset'] },
  { name: 'Investment & Co-Investment', x: 45, y: 75, w: 22, h: 18, color: 'rgba(255,255,255,0.05)', points: ['Saranac', 'Connection Capital', 'Long Angle', 'TIGER 21', 'R360'] },
  { name: 'Ecosystem Designers', x: 65, y: 35, w: 22, h: 18, color: 'rgba(255,255,255,0.03)', points: ['DIFC', 'FOX', 'IPI', 'Campden'] },
  { name: 'Boutique Advisory', x: 20, y: 30, w: 20, h: 18, color: 'rgba(255,255,255,0.03)', points: ['Kronos', 'V&M', 'PFC'] },
]

const FORMULA_WORDS = ['Disciplina', 'Riservatezza', 'Velocità', 'Relazioni', 'Visione globale']

/* ════════════════════════════════════════
   HELPERS
   ════════════════════════════════════════ */

function FadeIn({ children, delay = 0, className = '', style = {} }: { children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null)
  const [v, setV] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => setV(true), delay); obs.disconnect() }
    }, { threshold: 0.15 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])
  return (
    <div ref={ref} className={className} style={{ ...style, opacity: v ? 1 : 0, transform: v ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}>
      {children}
    </div>
  )
}

function Num({ n, size = 20 }: { n: string; size?: number }) {
  return (
    <span className="inline-flex items-center justify-center rounded-full flex-shrink-0 font-sans font-bold text-white" style={{ width: size, height: size, backgroundColor: '#C9912B', fontSize: size * 0.5 }}>{n}</span>
  )
}

/* ════════════════════════════════════════
   MAIN
   ════════════════════════════════════════ */

export function PosizionamentoPage() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [activeSlide, setActiveSlide] = useState(0)
  const [minervaVisible, setMinervaVisible] = useState(false)
  const scatterRef = useRef<HTMLDivElement>(null)

  const scrollTo = useCallback((idx: number) => {
    const el = carouselRef.current
    if (!el) return
    const child = el.children[idx] as HTMLElement
    if (!child) return
    el.scrollTo({ left: child.offsetLeft - (el.offsetWidth - child.offsetWidth) / 2, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    const el = carouselRef.current
    if (!el) return
    const children = Array.from(el.children) as HTMLElement[]
    const observers: IntersectionObserver[] = []
    children.forEach((child, i) => {
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          setActiveSlide(i)
        }
      }, { root: el, threshold: 0.5 })
      obs.observe(child)
      observers.push(obs)
    })
    return () => observers.forEach(obs => obs.disconnect())
  }, [])

  useEffect(() => {
    const el = scatterRef.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => setMinervaVisible(true), 2000); obs.disconnect() }
    }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div className="bg-[#0D1520]">

      {/* ═══════ S1: HERO ═══════ */}
      <section className="relative pt-24 overflow-hidden" style={{ minHeight: '70vh' }}>
        <video className="absolute inset-0 w-full h-full object-cover" autoPlay muted playsInline preload="auto" onEnded={(e) => (e.target as HTMLVideoElement).pause()}>
          <source src="/videos/wall-street.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#0D1520]/55" />
        <div className="absolute inset-x-0 bottom-0 h-[200px] bg-gradient-to-t from-[#0D1520] to-transparent" />
        <div className="relative z-10 flex items-center justify-center px-6" style={{ minHeight: '70vh' }}>
          <div className="max-w-[700px] text-center">
            <p className="font-sans text-[12px] uppercase tracking-[0.2em] mb-6" style={{ color: '#C9912B' }}>POSIZIONAMENTO</p>
            <FadeIn>
              <h1 className="font-serif text-[36px] md:text-[48px] text-white leading-[1.2]">Non abbiamo inventato nulla.</h1>
            </FadeIn>
            <FadeIn delay={500}>
              <p className="font-serif text-[36px] md:text-[48px] font-bold leading-[1.2] mt-1" style={{ color: '#C9912B' }}>Abbiamo distillato il meglio.</p>
            </FadeIn>
            <FadeIn delay={800}>
              <p className="font-sans text-[17px] mt-6 mx-auto" style={{ color: 'rgba(255,255,255,0.55)', maxWidth: 600 }}>
                Abbiamo studiato chi fa questo mestiere ai massimi livelli nel mondo. Poi abbiamo costruito qualcosa di diverso.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════ S2: CAROUSEL — 5 modelli ═══════ */}
      <section className="py-20 bg-[#0D1520]">
        <div className="max-w-[1200px] mx-auto px-6 mb-10">
          <h2 className="font-serif text-[28px] md:text-[32px] text-white">Cinque scuole. Un solo metodo.</h2>
        </div>

        {/* Desktop carousel */}
        <div className="hidden md:block relative">
          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto px-6"
            style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none' }}
          >
            {CAROUSEL_BLOCKS.map((block, i) => (
              <div
                key={i}
                className="relative flex-shrink-0 rounded-xl overflow-hidden"
                style={{ width: '80vw', maxWidth: 1100, height: '70vh', minHeight: 500, scrollSnapAlign: 'center' }}
              >
                <video className="absolute inset-0 w-full h-full object-cover" autoPlay muted playsInline preload="auto" onEnded={(e) => (e.target as HTMLVideoElement).pause()}>
                  <source src={block.video} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-[#0D1520]/50" />
                <div className="relative z-10 flex h-full">
                  <div className="flex-1 flex flex-col justify-end p-10">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center justify-center rounded-full" style={{ width: 36, height: 36, backgroundColor: '#C9912B' }}>
                        <span className="font-sans text-[14px] font-bold text-white">{block.num}</span>
                      </div>
                    </div>
                    <h3 className="font-serif text-[32px] md:text-[40px] font-bold" style={{ color: '#C9912B' }}>{block.title}</h3>
                    <p className="font-sans text-[14px] mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>{block.subtitle}</p>
                  </div>
                  <div className="w-[40%] flex items-center p-6">
                    <div className="rounded-2xl p-8" style={{ backgroundColor: 'rgba(13,21,32,0.85)' }}>
                      <p className="font-sans text-[13px] uppercase tracking-wider mb-5" style={{ color: '#C9912B' }}>Cosa abbiamo preso:</p>
                      <div className="space-y-4">
                        {block.points.map((pt, pi) => (
                          <div key={pi} className="flex gap-3 items-start">
                            <Num n={String(pi + 1).padStart(2, '0')} />
                            <p className="font-sans text-[14px] leading-[1.7]" style={{ color: 'rgba(255,255,255,0.65)' }}>{pt}</p>
                          </div>
                        ))}
                      </div>
                      <p className="font-sans text-[13px] italic mt-6" style={{ color: '#C9912B' }}>Il risultato: {block.result}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Arrows — hidden at boundaries */}
          {activeSlide > 0 && (
            <button onClick={() => scrollTo(activeSlide - 1)} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center transition-colors hover:border-[#C9912B]" style={{ border: '1px solid rgba(255,255,255,0.15)', backgroundColor: 'rgba(13,21,32,0.7)' }}>
              <svg width="20" height="20" viewBox="0 0 20 20"><path d="M12 4 L6 10 L12 16" stroke="white" strokeWidth="1.5" fill="none" /></svg>
            </button>
          )}
          {activeSlide < 4 && (
            <button onClick={() => scrollTo(activeSlide + 1)} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center transition-colors hover:border-[#C9912B]" style={{ border: '1px solid rgba(255,255,255,0.15)', backgroundColor: 'rgba(13,21,32,0.7)' }}>
              <svg width="20" height="20" viewBox="0 0 20 20"><path d="M8 4 L14 10 L8 16" stroke="white" strokeWidth="1.5" fill="none" /></svg>
            </button>
          )}

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {CAROUSEL_BLOCKS.map((_, i) => (
              <button key={i} onClick={() => scrollTo(i)} className="w-2.5 h-2.5 rounded-full transition-colors" style={{ backgroundColor: activeSlide === i ? '#C9912B' : 'rgba(255,255,255,0.2)' }} />
            ))}
          </div>
        </div>

        {/* Mobile: stacked */}
        <div className="md:hidden space-y-8 px-6">
          {CAROUSEL_BLOCKS.map((block, i) => (
            <div key={i} className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(201,145,43,0.15)' }}>
              <div className="relative h-[200px]">
                <video className="absolute inset-0 w-full h-full object-cover" autoPlay muted playsInline preload="auto" onEnded={(e) => (e.target as HTMLVideoElement).pause()}>
                  <source src={block.video} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-[#0D1520]/50" />
                <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2">
                  <div className="flex items-center justify-center rounded-full" style={{ width: 28, height: 28, backgroundColor: '#C9912B' }}>
                    <span className="font-sans text-[11px] font-bold text-white">{block.num}</span>
                  </div>
                  <span className="font-serif text-[24px] font-bold" style={{ color: '#C9912B' }}>{block.title}</span>
                </div>
              </div>
              <div className="p-6" style={{ backgroundColor: 'rgba(13,21,32,0.95)' }}>
                <p className="font-sans text-[12px] uppercase tracking-wider mb-4" style={{ color: '#C9912B' }}>Cosa abbiamo preso:</p>
                <div className="space-y-3">
                  {block.points.map((pt, pi) => (
                    <div key={pi} className="flex gap-2 items-start">
                      <Num n={String(pi + 1).padStart(2, '0')} size={18} />
                      <p className="font-sans text-[13px] leading-[1.6]" style={{ color: 'rgba(255,255,255,0.6)' }}>{pt}</p>
                    </div>
                  ))}
                </div>
                <p className="font-sans text-[12px] italic mt-4" style={{ color: '#C9912B' }}>Il risultato: {block.result}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════ S3: ISPIRAZIONI — 7 card ═══════ */}
      <section className="py-20 px-6 bg-[#0D1520]">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <h2 className="font-serif text-[28px] md:text-[32px] text-white mb-2">I modelli che ci hanno ispirato</h2>
            <p className="font-sans text-[15px] mb-12" style={{ color: 'rgba(255,255,255,0.45)' }}>Non li abbiamo copiati. Li abbiamo studiati per capire cosa funziona e perché.</p>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {INSPIRATIONS.slice(0, 4).map((c, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="rounded-2xl p-7 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]" style={{ backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(201,145,43,0.1)' }}>
                  <p className="font-sans text-[10px] mb-3" style={{ color: 'rgba(255,255,255,0.3)' }}>{c.year}</p>
                  <h4 className="font-serif text-[20px] md:text-[22px] font-bold mb-2" style={{ color: '#C9912B' }}>{c.name}</h4>
                  <p className="font-sans text-[13px] leading-[1.6] mb-4" style={{ color: 'rgba(255,255,255,0.55)' }}>{c.text}</p>
                  {c.href ? (
                    <Link href={c.href} className="font-sans text-[11px] italic transition-colors hover:text-[#C9912B]" style={{ color: 'rgba(201,145,43,0.5)' }}>{c.inspired}</Link>
                  ) : (
                    <span className="font-sans text-[11px] italic" style={{ color: 'rgba(201,145,43,0.4)' }}>{c.inspired}</span>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
            {INSPIRATIONS.slice(4).map((c, i) => (
              <FadeIn key={i} delay={(i + 4) * 100}>
                <div className="rounded-2xl p-7 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]" style={{ backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(201,145,43,0.1)' }}>
                  <p className="font-sans text-[10px] mb-3" style={{ color: 'rgba(255,255,255,0.3)' }}>{c.year}</p>
                  <h4 className="font-serif text-[20px] md:text-[22px] font-bold mb-2" style={{ color: '#C9912B' }}>{c.name}</h4>
                  <p className="font-sans text-[13px] leading-[1.6] mb-4" style={{ color: 'rgba(255,255,255,0.55)' }}>{c.text}</p>
                  {c.href ? (
                    <Link href={c.href} className="font-sans text-[11px] italic transition-colors hover:text-[#C9912B]" style={{ color: 'rgba(201,145,43,0.5)' }}>{c.inspired}</Link>
                  ) : (
                    <span className="font-sans text-[11px] italic" style={{ color: 'rgba(201,145,43,0.4)' }}>{c.inspired}</span>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ S4: SCATTER — Dove si posiziona Minerva ═══════ */}
      <section className="py-20 px-6" style={{ backgroundColor: 'rgba(201,145,43,0.02)' }}>
        <div className="max-w-[1100px] mx-auto">
          <FadeIn>
            <h2 className="font-serif text-[28px] md:text-[32px] text-white mb-2">Dove si posiziona Minerva</h2>
            <p className="font-sans text-[15px] mb-1" style={{ color: 'rgba(255,255,255,0.45)' }}>Analisi su 50 piattaforme globali. 4 cluster strategici. 7 archetipi identificati.</p>
            <p className="font-sans text-[11px] mb-12" style={{ color: 'rgba(255,255,255,0.2)' }}>Analisi comparativa Minerva Partners, 2025</p>
          </FadeIn>

          {/* Desktop scatter */}
          <div ref={scatterRef} className="hidden md:block relative mx-auto rounded-xl" style={{ aspectRatio: '16/10', maxWidth: 900, border: '1px solid rgba(255,255,255,0.06)', backgroundColor: 'rgba(255,255,255,0.01)' }}>
            {/* Axis labels */}
            <span className="absolute bottom-2 left-1/2 -translate-x-1/2 font-sans text-[10px]" style={{ color: 'rgba(255,255,255,0.3)' }}>AMPIEZZA SERVIZI &rarr;</span>
            <span className="absolute left-3 top-1/2 -translate-y-1/2 font-sans text-[10px] -rotate-90 origin-center" style={{ color: 'rgba(255,255,255,0.3)' }}>MODELLO &rarr;</span>
            <span className="absolute bottom-2 left-3 font-sans text-[9px]" style={{ color: 'rgba(255,255,255,0.15)' }}>Specialista</span>
            <span className="absolute bottom-2 right-3 font-sans text-[9px]" style={{ color: 'rgba(255,255,255,0.15)' }}>Integrato</span>
            <span className="absolute top-2 left-3 font-sans text-[9px]" style={{ color: 'rgba(255,255,255,0.15)' }}>Advisory + Deal + Community</span>
            <span className="absolute bottom-8 left-3 font-sans text-[9px]" style={{ color: 'rgba(255,255,255,0.15)' }}>Advisory puro</span>

            {/* Clusters */}
            {SCATTER_CLUSTERS.map((cl, ci) => (
              <div key={ci} className="absolute rounded-lg" style={{ left: `${cl.x}%`, top: `${100 - cl.y - cl.h}%`, width: `${cl.w}%`, height: `${cl.h}%`, backgroundColor: cl.color, transform: 'translate(-50%, 0)' }}>
                <span className="absolute top-1 left-2 font-sans text-[8px] uppercase" style={{ color: 'rgba(255,255,255,0.25)', letterSpacing: '0.05em' }}>{cl.name}</span>
                <div className="flex flex-wrap gap-1 p-2 pt-4">
                  {cl.points.map((p, pi) => (
                    <span key={pi} className="w-2 h-2 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.35)' }} title={p} />
                  ))}
                </div>
              </div>
            ))}

            {/* MINERVA dot */}
            <div
              className="absolute z-10 transition-all duration-1000"
              style={{
                left: '78%', top: '12%', transform: 'translate(-50%, -50%)',
                opacity: minervaVisible ? 1 : 0,
                scale: minervaVisible ? '1' : '0',
              }}
            >
              <div className="relative">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#C9912B', boxShadow: '0 0 20px rgba(201,145,43,0.4)' }} />
                <div className="absolute inset-0 rounded-full" style={{ backgroundColor: '#C9912B', animation: 'scatterPulse 2s ease-in-out infinite' }} />
                <span className="absolute left-6 top-1/2 -translate-y-1/2 font-sans text-[12px] font-bold whitespace-nowrap" style={{ color: '#C9912B' }}>MINERVA</span>
              </div>
            </div>
            <style>{`@keyframes scatterPulse { 0%, 100% { opacity: 0.6; transform: scale(1); } 50% { opacity: 0; transform: scale(2.5); } }`}</style>
          </div>

          {/* Mobile: cluster cards */}
          <div className="md:hidden space-y-4">
            {SCATTER_CLUSTERS.map((cl, i) => (
              <div key={i} className="rounded-xl p-5" style={{ backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="font-sans text-[12px] font-bold text-white mb-1">{cl.name}</p>
                <p className="font-sans text-[11px]" style={{ color: 'rgba(255,255,255,0.4)' }}>{cl.points.join(' \u00b7 ')}</p>
              </div>
            ))}
            <div className="rounded-xl p-5" style={{ backgroundColor: 'rgba(201,145,43,0.08)', border: '2px solid #C9912B' }}>
              <p className="font-sans text-[14px] font-bold" style={{ color: '#C9912B' }}>MINERVA</p>
              <p className="font-sans text-[12px] mt-1" style={{ color: 'rgba(255,255,255,0.6)' }}>Ibrido unico: Advisory + Deal + Community con partner indipendenti.</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="font-sans text-[16px]" style={{ color: 'rgba(255,255,255,0.55)' }}>La maggior parte delle piattaforme è solo una delle tre: Advisory, Deal o Community.</p>
            <p className="font-serif text-[22px] md:text-[24px] font-bold mt-3" style={{ color: '#C9912B' }}>Minerva le unisce tutte. Questo è il blue ocean.</p>
          </div>
        </div>
      </section>

      {/* ═══════ S5: LA FORMULA ═══════ */}
      <section className="py-20 px-6 bg-[#0D1520]">
        <div className="max-w-[900px] mx-auto text-center">
          <FadeIn>
            <h2 className="font-serif text-[24px] md:text-[28px] text-white mb-10">La formula Minerva</h2>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4 mb-8">
              {FORMULA_WORDS.map((w, i) => (
                <span key={i} className="contents">
                  <span className="font-sans text-[15px] md:text-[16px]" style={{ color: 'rgba(255,255,255,0.6)' }}>{w}</span>
                  {i < FORMULA_WORDS.length - 1 && <span className="font-serif text-[22px] md:text-[24px] font-bold" style={{ color: '#C9912B' }}>+</span>}
                </span>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={400}>
            <div className="flex justify-center mb-8">
              <svg width="24" height="48" viewBox="0 0 24 48" style={{ animation: 'formulaArrow 2s ease-in-out infinite' }}>
                <path d="M12 0 L12 40 M4 32 L12 40 L20 32" stroke="#C9912B" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              </svg>
            </div>
            <style>{`@keyframes formulaArrow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(6px); } }`}</style>
          </FadeIn>

          <FadeIn delay={600}>
            <div className="rounded-2xl mx-auto" style={{ backgroundColor: 'rgba(201,145,43,0.08)', border: '1px solid rgba(201,145,43,0.2)', padding: '28px 48px', maxWidth: 700 }}>
              <p className="font-serif text-[24px] md:text-[28px] font-bold" style={{ color: '#C9912B' }}>UN ECOSISTEMA CHE NON ESISTE ALTROVE</p>
              <p className="font-sans text-[15px] mt-4" style={{ color: 'rgba(255,255,255,0.55)' }}>
                Indipendente. Fee-only. Con skin in the game. Dove ogni professionista ha firmato un codice. E dove il primo investitore siamo noi.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════ S6: FRASE FINALE — Doppia vista ═══════ */}
      <section className="relative px-6" style={{ padding: '100px 24px' }}>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/img31.png')" }} />
        <div className="absolute inset-0 bg-[#0D1520]/55" />
        <div className="absolute inset-x-0 bottom-0 h-[120px] bg-gradient-to-t from-[#0D1520] to-transparent" />
        <div className="relative z-10 max-w-[1100px] mx-auto">
          <div className="flex flex-col md:flex-row gap-10 md:gap-0">
            <FadeIn className="flex-1 md:pr-12 md:border-r" style={{ borderColor: 'rgba(201,145,43,0.15)' }}>
              <span className="font-sans text-[11px] uppercase block mb-5" style={{ color: '#C9912B', letterSpacing: '0.15em' }}>SE HAI COSTRUITO</span>
              <p className="font-serif text-[24px] md:text-[28px] text-white leading-[1.4]">Il tuo patrimonio merita un sistema, non un altro consulente.</p>
              <p className="font-sans text-[14px] mt-4" style={{ color: 'rgba(255,255,255,0.45)' }}>Ci sono piattaforme che gestiscono soldi. Ci sono boutique che fanno deal. Ci sono club che fanno networking. Minerva fa tutte e tre le cose, coordinate.</p>
              <Link href="/contatti" className="font-sans text-[14px] inline-block mt-5 transition-opacity hover:opacity-80" style={{ color: '#C9912B' }}>Parliamone &rarr;</Link>
            </FadeIn>
            <div className="h-[1px] md:hidden" style={{ backgroundColor: 'rgba(201,145,43,0.1)' }} />
            <FadeIn delay={500} className="flex-1 md:pl-12">
              <span className="font-sans text-[11px] uppercase block mb-5" style={{ color: '#C9912B', letterSpacing: '0.15em' }}>SE VUOI CRESCERE</span>
              <p className="font-serif text-[24px] md:text-[28px] text-white leading-[1.4]">Il tuo valore merita un ecosistema, non un altro cliente.</p>
              <p className="font-sans text-[14px] mt-4" style={{ color: 'rgba(255,255,255,0.45)' }}>Ci sono network che promettono lead. Ci sono piattaforme che vendono contatti. Minerva offre deal flow qualificato, co-investimento e un codice che protegge la tua reputazione.</p>
              <Link href="/contatti" className="font-sans text-[14px] inline-block mt-5 transition-opacity hover:opacity-80" style={{ color: '#C9912B' }}>Entra nell&apos;ecosistema &rarr;</Link>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  )
}
