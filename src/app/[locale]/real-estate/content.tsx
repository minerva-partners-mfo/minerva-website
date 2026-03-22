'use client'
import { useTranslations } from 'next-intl'
import { MosaicPage } from '@/components/sections/MosaicPage'

export function RealEstateContent() {
  const t = useTranslations('realEstate')
  return (
    <MosaicPage
      videoSrc="/videos/sfera-casa.mp4"
      headline={t('hero.headline')}
      goldPhrase={t('gold.phrase')}
      goldSubtext={t('gold.subtext')}
      sections={[
        {
          type: 'cards',
          cards: [
            { num: '01', title: 'REAL ESTATE ADVISORY', text: 'Consulenza strategica su asset immobiliari · Acquisizione e dismissione · Advisory per sviluppi · Analisi highest & best use · Riposizionamento asset · Advisory per portafogli' },
            { num: '02', title: 'DEAL ORIGINATION & OFF-MARKET', text: 'Sourcing asset off-market · Accesso a proprietà riservate (famiglie, developer, banche) · Operazioni pre-market · Matching investitori e opportunità · Pipeline esclusiva Minerva' },
            { num: '03', title: 'DEVELOPMENT & VALUE-ADD', text: 'Progetti residenziale, hospitality, mixed-use · Operazioni value-add e repositioning · Change of use (industriale → residenziale/hotel) · Ottimizzazione layout e destinazione · Business plan sviluppo' },
            { num: '04', title: 'CAPITAL RAISING REAL ESTATE', text: 'Equity per progetti immobiliari · Debt advisory · Mezzanine financing · Forward funding e forward purchase · Joint venture con developer e operatori' },
            { num: '05', title: 'VALUATION & UNDERWRITING', text: 'Valutazioni (income, comparables, DCF) · Analisi rendimenti (IRR, cash-on-cash) · Stress test scenari · Analisi rischio (location, tenant, exit) · Underwriting investimento' },
            { num: '06', title: 'DUE DILIGENCE & STRUCTURING', text: 'DD tecnica (urbanistica, catastale) · DD legale e titolarità · Analisi contratti locazione · Strutturazione fiscale (holding, SPV, estero) · Ottimizzazione struttura' },
            { num: '07', title: 'HOSPITALITY & LUXURY', text: 'Hotel, resort, branded residences · Asset trophy · Advisory con operatori e catene · Conversioni (villa → boutique hotel) · Investimenti lifestyle (mare, montagna, città prime)' },
            { num: '08', title: 'EXIT STRATEGY & DISPOSAL', text: 'Pianificazione uscita (timing e strategia) · Vendita a fondi, operatori, privati · Exit parziale o totale · Packaging asset per massimizzare valore' },
            { num: '09', title: 'SPECIAL SITUATIONS', text: 'NPL e UTP immobiliari · Asset distressed o incompleti · Situazioni ereditarie complesse · Disinvestimenti urgenti · Ristrutturazioni finanziarie immobiliari' },
            { num: '10', title: 'DIRECT INVESTMENT & CO-INVESTMENT', text: 'Coinvestimento Minerva nei deal · Allineamento con investitori · Ruolo di sponsor e anchor investor' },
            { num: '11', title: 'PORTFOLIO MANAGEMENT', text: 'Analisi rendimento vs costo opportunità · Ottimizzazione portafoglio come sistema · Integrazione nel patrimonio complessivo' },
          ],
        },
        {
          type: 'examples',
          title: 'Tipologie di operazione',
          examples: [
            { image: '/images/card1.png', text: 'Hotel 4 stelle, destinazione turistica, 85 camere. EV €35-45M' },
            { image: '/images/img9.webp', text: 'Portafoglio logistico, 12 unità, Nord Italia. Yield 6.2%' },
            { image: '/images/img11.webp', text: 'Palazzo storico, centro Milano. Riconversione luxury. €18-25M' },
          ],
        },
        {
          type: 'stats',
          stats: [
            { value: '€35-45M', label: 'deal hospitality' },
            { value: '6.2%', label: 'yield logistica' },
            { value: '12', label: 'unità portafoglio' },
            { value: '€18-25M', label: 'riconversione' },
          ],
        },
        { type: 'differentiator', quote: t('differentiator') },
        { type: 'disclaimer', disclaimer: t('disclaimer') },
        { type: 'cta', ctaText: t('cta'), ctaHref: '/contatti' },
      ]}
    />
  )
}
