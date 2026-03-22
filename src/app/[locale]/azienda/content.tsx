'use client'
import { useTranslations } from 'next-intl'
import { MosaicPage } from '@/components/sections/MosaicPage'

export function AziendaContent() {
  const t = useTranslations('azienda')
  return (
    <MosaicPage
      videoSrc="/videos/sfera-impresa.mp4"
      headline={t('hero.headline')}
      goldPhrase={t('gold.phrase')}
      goldSubtext={t('gold.subtext')}
      sections={[
        {
          type: 'cards',
          cards: [
            { num: '01', title: 'M&A ADVISORY', text: 'Sell-side advisory (cessione totale/parziale) · Buy-side advisory (ricerca target + negoziazione) · Merger e integrazioni industriali · Carve-out e spin-off · Joint venture e alleanze strategiche · Fairness opinion e valuation advisory' },
            { num: '02', title: 'DEAL ORIGINATION & OFF-MARKET', text: 'Sourcing opportunità off-market · Proprietary deal flow (network Minerva) · Matching imprenditori e investitori · Club deal origination · Accesso a opportunità riservate (pre-auction)' },
            { num: '03', title: 'CAPITAL RAISING', text: 'Equity fundraising (minoranza/maggioranza) · Debt advisory (banche, fondi, private debt) · Mezzanine e strumenti ibridi · Structured finance · Bridge financing · Club deal structuring' },
            { num: '04', title: 'PRIVATE MARKETS & CLUB DEALS', text: 'Strutturazione club deal · Coordinamento investitori HNW/UHNW · SPV setup (holding veicolo) · Governance e patti parasociali · Allocation quote investitori · Monitoring post-investimento' },
            { num: '05', title: 'STRATEGIC INVESTMENTS ADVISORY', text: 'Strategia di crescita per linee esterne · Identificazione target industriali · Analisi sinergie industriali e finanziarie · Entry strategy nuovi mercati · Partnership strategiche' },
            { num: '06', title: 'VALUATION & FINANCIAL ANALYSIS', text: 'Business valuation (DCF, multipli, LBO) · Asset-based valuation · Purchase price allocation (PPA) · Financial modelling avanzato · Sensitivity e scenario analysis' },
            { num: '07', title: 'DUE DILIGENCE COORDINATION', text: 'Coordinamento DD finanziaria, legale, fiscale · Vendor due diligence · Commercial due diligence · Technical e ESG due diligence · Data room management' },
            { num: '08', title: 'STRUCTURING & DEAL ENGINEERING', text: 'Strutturazione operazioni complesse · LBO, MBO, MBI · Earn-out e deferred payments · Preferred equity e convertibili · Sale & lease-back · Tax-efficient structuring' },
            { num: '09', title: 'NEGOTIATION & EXECUTION', text: 'Supporto negoziazione SPA e SHA · Definizione termini economici · Gestione controparti multiple · Closing management' },
            { num: '10', title: 'POST-DEAL & VALUE CREATION', text: 'PMI e integrazione post-acquisizione · Monitoring KPI · Supporto governance · Exit strategy planning · Preparazione a exit (secondary, IPO, trade sale)' },
            { num: '11', title: 'SPECIAL SITUATIONS & OPPORTUNISTIC', text: 'Distressed M&A · Turnaround situations · Tensione finanziaria · Opportunità da discontinuità (successioni, crisi, carve-out)' },
            { num: '12', title: 'STRATEGY CONSULTING', text: 'Analisi strategica e posizionamento · Ottimizzazione operativa (processi, costi, margini) · Business plan pre-fundraising e pre-M&A · Allineamento obiettivi aziendali, patrimoniali e familiari' },
          ],
        },
        {
          type: 'stats',
          stats: [
            { value: '~50', label: 'operazioni chiuse' },
            { value: '€5M-€100M+', label: 'range deal' },
            { value: '14', label: 'settori coperti' },
            { value: '6', label: 'fasi IC' },
          ],
        },
        {
          type: 'concrete',
          title: 'Esempi concreti',
          concrete: [
            { title: 'Cessione gruppo industriale', text: 'Macchinari, Nord Italia. 12 buyer contattati, 3 LOI, closing al miglior prezzo in 8 mesi. EV €35M.' },
            { title: 'Acquisizione buy-side per fondo PE', text: 'Target nel packaging, EBITDA €4M, multiplo 6.5x. DD coordinata in 45 giorni.' },
            { title: 'Ristrutturazione PMI alimentare', text: 'In difficoltà. Margine EBITDA da 8% a 14% in 18 mesi. Attratti 2 fondi PE.' },
          ],
        },
        { type: 'differentiator', quote: t('differentiator') },
        { type: 'disclaimer', disclaimer: t('disclaimer') },
        { type: 'cta', ctaText: t('cta'), ctaHref: '/contatti' },
      ]}
    />
  )
}
