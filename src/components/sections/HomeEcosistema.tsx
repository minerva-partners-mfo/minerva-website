'use client'

import { useRef, useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

/* ═══════════════════════════════════════════
   Pre-calculated positions — all fixed strings
   ═══════════════════════════════════════════ */

const HUB_POSITIONS = [
  { left: '50%', top: '22%', label: 'M&A &\nInvestments' },
  { left: '78%', top: '50%', label: 'Real Estate\nAdvisory' },
  { left: '50%', top: '78%', label: 'Strategy\nConsulting' },
  { left: '22%', top: '50%', label: 'Wealth\nManagement' },
] as const

const PARTNER_POSITIONS = [
  { left: '68%', top: '18%', label: 'Servizi\nLegali' },
  { left: '88%', top: '38%', label: 'Business\nConsulting' },
  { left: '88%', top: '62%', label: 'Servizi\nBancari' },
  { left: '68%', top: '82%', label: 'Rischi e\nAssicurativo' },
  { left: '32%', top: '82%', label: 'Energy\nManagement' },
  { left: '12%', top: '62%', label: 'Digital\nServices' },
  { left: '12%', top: '38%', label: 'Clienti\nInternazionali' },
  { left: '32%', top: '18%', label: 'UHNWI\nServices' },
] as const

const FRIENDS_POSITIONS = [
  { left: '50%', top: '5%', label: 'Consulente\nstorico' },
  { left: '93%', top: '28%', label: 'Specialista\ndi nicchia' },
  { left: '93%', top: '72%', label: 'Professionista\nintrodotto' },
  { left: '50%', top: '95%', label: 'Competenza\nattivata' },
  { left: '7%', top: '72%', label: 'Private\nBanker' },
  { left: '7%', top: '28%', label: 'Commercialista\ndi fiducia' },
] as const

const ADVISOR_POSITIONS = [
  { left: '38%', top: '3%', label: 'Advisor' },
  { left: '62%', top: '4%', label: 'Cliente' },
  { left: '96%', top: '48%', label: 'Advisor' },
  { left: '95%', top: '55%', label: 'Cliente' },
  { left: '60%', top: '97%', label: 'Advisor' },
  { left: '40%', top: '96%', label: 'Cliente' },
  { left: '4%', top: '48%', label: 'Advisor' },
  { left: '3%', top: '55%', label: 'Cliente' },
] as const

const HUB_SVG = [
  { x: '50', y: '22' },
  { x: '78', y: '50' },
  { x: '50', y: '78' },
  { x: '22', y: '50' },
] as const

const PARTNER_SVG = [
  { x: '68', y: '18' },
  { x: '88', y: '38' },
  { x: '88', y: '62' },
  { x: '68', y: '82' },
  { x: '32', y: '82' },
  { x: '12', y: '62' },
  { x: '12', y: '38' },
  { x: '32', y: '18' },
] as const

export function HomeEcosistema() {
  const t = useTranslations('homeEcosistema')
  const sectionRef = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState(0)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const onScroll = () => {
      const rect = el.getBoundingClientRect()
      const total = el.offsetHeight - window.innerHeight
      if (total <= 0) return
      const pct = Math.max(0, Math.min(1, -rect.top / total))
      setStep(pct < 0.2 ? 0 : pct < 0.4 ? 1 : pct < 0.6 ? 2 : pct < 0.8 ? 3 : 4)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ═══ DIAGRAM ═══ */
  const diagram = (
    <div className="relative w-full mx-auto" style={{ aspectRatio: '1 / 1', maxWidth: '700px', overflow: 'hidden' }}>
      {/* SVG lines */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        <g style={{ opacity: step >= 1 ? '0.2' : '0', transition: 'opacity 0.6s' }}>
          {HUB_SVG.map((h, i) => (
            <line key={`hl${i}`} x1="50" y1="50" x2={h.x} y2={h.y} stroke="#C9912B" strokeWidth="0.2" />
          ))}
        </g>
        <g style={{ opacity: step >= 2 ? '0.08' : '0', transition: 'opacity 0.6s' }}>
          {PARTNER_SVG.map((p, i) => (
            <line key={`pl${i}`} x1="50" y1="50" x2={p.x} y2={p.y} stroke="white" strokeWidth="0.12" strokeDasharray="0.6 0.4" />
          ))}
        </g>
      </svg>

      {/* ADVISOR/CLIENTI — z-5 */}
      {ADVISOR_POSITIONS.map((pos, i) => (
        <div key={`adv${i}`} className="absolute flex flex-col items-center" style={{ zIndex: 5, left: pos.left, top: pos.top, opacity: step >= 4 ? '1' : '0', transform: step >= 4 ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0.5)', transition: 'all 0.6s ease-out' }}>
          <div className="rounded-full" style={{ width: '32px', height: '32px', border: '1px solid rgba(255, 255, 255, 0.12)', backgroundColor: 'transparent' }} />
          <span className="font-sans text-[8px] mt-1" style={{ color: 'rgba(255, 255, 255, 0.25)' }}>{pos.label}</span>
        </div>
      ))}

      {/* FRIENDS — z-5 */}
      {FRIENDS_POSITIONS.map((pos, i) => (
        <div key={`fr${i}`} className="absolute flex items-center justify-center rounded-full" style={{ zIndex: 5, width: '75px', height: '75px', left: pos.left, top: pos.top, border: '1px solid rgba(255, 255, 255, 0.2)', backgroundColor: 'transparent', opacity: step >= 3 ? '1' : '0', transform: step >= 3 ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0.7)', transition: 'all 0.6s ease-out' }}>
          <span className="font-sans text-[11px] text-center leading-tight px-1" style={{ color: 'rgba(255, 255, 255, 0.65)', whiteSpace: 'pre-line' }}>{pos.label}</span>
        </div>
      ))}

      {/* PARTNER — z-10 */}
      {PARTNER_POSITIONS.map((pos, i) => (
        <div key={`pt${i}`} className="absolute flex items-center justify-center rounded-full" style={{ zIndex: 10, width: '95px', height: '95px', left: pos.left, top: pos.top, border: '1px solid rgba(201, 145, 43, 0.3)', backgroundColor: '#1A2744', opacity: step >= 2 ? '1' : '0', transform: step >= 2 ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0.7)', transition: 'all 0.6s ease-out' }}>
          <span className="font-sans text-[13px] font-semibold text-center leading-tight px-1" style={{ color: 'rgba(255, 255, 255, 0.85)', whiteSpace: 'pre-line' }}>{pos.label}</span>
        </div>
      ))}

      {/* HUB — z-15 */}
      {HUB_POSITIONS.map((pos, i) => (
        <div key={`hub${i}`} className="absolute flex items-center justify-center rounded-full" style={{ zIndex: 15, width: '130px', height: '130px', left: pos.left, top: pos.top, border: '2px solid #C9912B', backgroundColor: '#1A2744', opacity: step >= 1 ? '1' : '0', transform: step >= 1 ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0.7)', transition: 'all 0.6s ease-out' }}>
          <span className="font-sans text-[16px] font-bold text-white text-center leading-snug" style={{ whiteSpace: 'pre-line' }}>{pos.label}</span>
        </div>
      ))}

      {/* CENTER — z-20 */}
      <div className="absolute flex items-center justify-center rounded-full" style={{ zIndex: 20, width: '180px', height: '180px', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', border: '3px solid #C9912B', backgroundColor: '#1A2744' }}>
        <span className="font-sans text-[20px] font-bold text-center leading-tight" style={{ color: '#C9912B' }}>IL PATRIMONIO</span>
      </div>
    </div>
  )

  /* ═══ STEP TEXT ═══ */
  const stepText = [
    <div key="s0">
      <h3 className="font-sans text-[30px] font-bold text-white mb-4">AL CENTRO DI TUTTO</h3>
      <p className="font-sans text-[16px] leading-[1.7]" style={{ color: 'rgba(255, 255, 255, 0.75)' }}>Azienda, immobili, finanza, famiglia, passioni, futuro. Il patrimonio non è un numero: è un sistema complesso che ha bisogno di una regia.</p>
    </div>,
    <div key="s1">
      <h3 className="font-sans text-[30px] font-bold mb-1" style={{ color: '#C9912B' }}>MINERVA HUB</h3>
      <p className="font-sans text-[16px] mb-5" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>La regia operativa</p>
      <div className="space-y-5">
        <div><h4 className="font-sans text-[15px] font-semibold" style={{ color: '#C9912B' }}>M&A &amp; Investments</h4><p className="font-sans text-[14px] leading-[1.6]" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Cessione azienda industriale, €35M. Dall&apos;origination al closing in 8 mesi. 12 buyer, 3 LOI, 1 closing al miglior prezzo.</p></div>
        <div><h4 className="font-sans text-[15px] font-semibold" style={{ color: '#C9912B' }}>Real Estate Advisory</h4><p className="font-sans text-[14px] leading-[1.6]" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Portafoglio logistico off-market, 12 unità, yield 6.2%. Risparmio fiscale €400k/anno.</p></div>
      </div>
      <Link href="/hub" className="inline-flex items-center gap-2 mt-5 font-sans text-[14px] transition-colors" style={{ color: '#C9912B' }}>{t('steps.2.link')} <span>→</span></Link>
    </div>,
    <div key="s2">
      <h3 className="font-sans text-[30px] font-bold mb-1" style={{ color: '#C9912B' }}>MINERVA PARTNERS</h3>
      <p className="font-sans text-[16px] mb-4" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Eccellenze selezionate</p>
      <p className="font-sans text-[16px] leading-[1.7] mb-5" style={{ color: 'rgba(255, 255, 255, 0.75)' }}>Ogni Partner ha firmato il Codice Minerva. Indipendenti, ma coordinati dalla regia.</p>
      <div className="space-y-5">
        <div><h4 className="font-sans text-[15px] font-semibold" style={{ color: '#C9912B' }}>Servizi Legali</h4><p className="font-sans text-[14px] leading-[1.6]" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Contrattualistica M&amp;A, due diligence, contenzioso. 20+ anni su operazioni cross-border.</p></div>
        <div><h4 className="font-sans text-[15px] font-semibold" style={{ color: '#C9912B' }}>Consulting &amp; Tax</h4><p className="font-sans text-[14px] leading-[1.6]" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Strutturazione fiscale, transfer pricing. Vantaggio medio €200-500k/anno per cliente.</p></div>
      </div>
      <Link href="/ecosistema/partners" className="inline-flex items-center gap-2 mt-5 font-sans text-[14px] transition-colors" style={{ color: '#C9912B' }}>{t('steps.3.link')} <span>→</span></Link>
    </div>,
    <div key="s3">
      <h3 className="font-sans text-[30px] font-bold mb-1" style={{ color: '#C9912B' }}>MINERVA FRIENDS</h3>
      <p className="font-sans text-[16px] mb-4" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>L&apos;ecosistema esteso</p>
      <div className="space-y-5">
        <div><h4 className="font-sans text-[15px] font-semibold" style={{ color: '#C9912B' }}>MEMORIA</h4><p className="font-sans text-[14px] leading-[1.6]" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Il commercialista di famiglia da 30 anni. Conosce ogni decisione. Non lo sostituiamo: lo integriamo.</p></div>
        <div><h4 className="font-sans text-[15px] font-semibold" style={{ color: '#C9912B' }}>SPECIALIZZAZIONE</h4><p className="font-sans text-[14px] leading-[1.6]" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>L&apos;esperto di energia rinnovabile per un impianto da €5M. Competenza puntuale, attivata quando serve.</p></div>
      </div>
      <Link href="/ecosistema/friends" className="inline-flex items-center gap-2 mt-5 font-sans text-[14px] transition-colors" style={{ color: '#C9912B' }}>{t('steps.4.link')} <span>→</span></Link>
    </div>,
    <div key="s4">
      <h3 className="font-sans text-[30px] font-bold mb-4" style={{ color: '#C9912B' }}>L&apos;ECOSISTEMA COMPLETO</h3>
      <p className="font-sans text-[17px] leading-[1.7]" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Ogni ruolo ha un senso. Ogni connessione genera valore. Il risultato è superiore alla somma delle parti.</p>
    </div>,
  ]

  /* ═══ MOBILE ═══ */
  const mobileDiagram = (
    <div className="relative mx-auto" style={{ width: '320px', height: '320px' }}>
      <div className="absolute flex items-center justify-center rounded-full" style={{ zIndex: 20, width: '100px', height: '100px', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', border: '2px solid #C9912B', backgroundColor: '#1A2744' }}>
        <span className="font-sans text-[11px] font-bold text-center" style={{ color: '#C9912B' }}>IL PATRIMONIO</span>
      </div>
      {HUB_POSITIONS.map((pos, i) => (
        <div key={`mh${i}`} className="absolute flex items-center justify-center rounded-full" style={{ zIndex: 15, width: '70px', height: '70px', left: pos.left, top: pos.top, transform: 'translate(-50%, -50%)', border: '1.5px solid #C9912B', backgroundColor: '#1A2744' }}>
          <span className="font-sans text-[9px] font-bold text-white text-center leading-tight" style={{ whiteSpace: 'pre-line' }}>{pos.label}</span>
        </div>
      ))}
      {PARTNER_POSITIONS.map((pos, i) => (
        <div key={`mp${i}`} className="absolute flex items-center justify-center rounded-full" style={{ zIndex: 10, width: '52px', height: '52px', left: pos.left, top: pos.top, transform: 'translate(-50%, -50%)', border: '1px solid rgba(201, 145, 43, 0.3)', backgroundColor: '#1A2744' }}>
          <span className="font-sans text-[7px] font-semibold text-center leading-tight px-1" style={{ color: 'rgba(255, 255, 255, 0.85)', whiteSpace: 'pre-line' }}>{pos.label}</span>
        </div>
      ))}
    </div>
  )

  return (
    <>
      {/* DESKTOP */}
      <section ref={sectionRef} className="relative hidden md:block bg-[#0D1520]" style={{ height: '400vh' }}>
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <div className="flex w-full items-center" style={{ height: '100%' }}>
            {/* LEFT: diagram 70% */}
            <div className="flex items-center justify-center" style={{ width: '70%', paddingLeft: '5%', paddingRight: '2%', height: '100%' }}>
              {diagram}
            </div>

            {/* RIGHT: text 30% */}
            <div className="flex flex-col justify-center overflow-y-auto" style={{ width: '30%', paddingRight: '32px', height: '100%', maxHeight: '100vh' }}>
              {stepText.map((content, i) => (
                <div key={i} style={{ display: step === i ? 'block' : 'none' }}>
                  {content}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MOBILE */}
      <section className="md:hidden bg-[#0D1520] py-12 px-4">
        {mobileDiagram}
        <div className="mt-10 space-y-10 max-w-[500px] mx-auto">
          {stepText.map((content, i) => (
            <div key={`mob${i}`}>{content}</div>
          ))}
        </div>
      </section>
    </>
  )
}
