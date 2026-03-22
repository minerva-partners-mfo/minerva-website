'use client'
import { useTranslations } from 'next-intl'
import { MosaicPage } from '@/components/sections/MosaicPage'

export function FinanzaContent() {
  const t = useTranslations('finanza')
  return (
    <MosaicPage
      videoSrc="/videos/sfera-patrimonio.mp4"
      headline={t('hero.headline')}
      goldPhrase={t('gold.phrase')}
      goldSubtext={t('gold.subtext')}
      sections={[
        {
          type: 'cards',
          cards: [
            { num: '01', title: 'INVESTMENT & CAPITAL ADVISORY', text: 'Visione unica tra patrimonio e struttura finanziaria · Asset allocation strategica · Ottimizzazione struttura finanziaria personale e holding · Pianificazione investimenti complessi · Advisory integrato tra asset finanziari e operazioni · Coordinamento con M&A e RE' },
            { num: '02', title: 'PUBLIC & PRIVATE MARKETS', text: 'Equity, fixed income, ETF · Private equity, venture capital, private debt · Club deal e co-investimenti · Opportunità primarie e secondarie · Strategie ibride pubblico/privato' },
            { num: '03', title: 'ALTERNATIVE & OPPORTUNISTIC', text: 'Hedge funds e absolute return · Special situations · Distressed e opportunità tattiche · Commodities e strategie non tradizionali · Investimenti tematici ad alto potenziale' },
            { num: '04', title: 'STRUCTURED FINANCE & ADVANCED SOLUTIONS', text: 'Strumenti ibridi (convertibili, preferred) · Leverage su portafogli e asset · Financing strutturato · Operazioni complesse multi-asset · Soluzioni tailor-made per HNW/UHNW' },
            { num: '05', title: 'PORTFOLIO ENGINEERING & OPTIMIZATION', text: 'Costruzione portafogli multi-asset · Ottimizzazione rischio/rendimento · Ribilanciamenti dinamici · Efficientamento costi e strumenti · Integrazione asset liquidi e illiquidi' },
            { num: '06', title: 'RISK, LIQUIDITY & PROTECTION', text: 'Gestione liquidità strategica · Hedging (tassi, valute, mercati) · Protezione drawdown · Analisi scenari macro · Strategie difensive e di preservazione' },
          ],
        },
        {
          type: 'text',
          title: 'Il modello Fee-Only',
          body: 'Non vendiamo fondi. Retrocessioni restituite al 100%. Il nostro compenso è una fee trasparente, concordata ex-ante.',
        },
        {
          type: 'stats',
          stats: [
            { value: '€1.371 mld', label: 'PB italiano, solo 36%' },
            { value: '80,6%', label: 'consulenza a retrocessioni' },
            { value: '100%', label: 'retrocessioni restituite' },
            { value: '3-4', label: 'inefficienze per cliente' },
          ],
        },
        {
          type: 'concrete',
          title: 'Esempi concreti',
          concrete: [
            { title: 'Efficientamento bancario', text: 'Consolidamento 4 rapporti bancari in 2. Fee ridotte del 40%. Report unico trimestrale.' },
            { title: 'Ribilanciamento portafoglio', text: 'Portafoglio €15M: da 100% equity domestico a multi-asset globale. Volatilità -35%, rendimento +2.1% annuo.' },
            { title: 'Struttura holding', text: 'Ottimizzazione holding: risparmio fiscale annuo €180k. Protezione patrimoniale con trust e segregazione.' },
          ],
        },
        { type: 'differentiator', quote: t('differentiator') },
        { type: 'cta', ctaText: t('cta'), ctaHref: '/contatti' },
      ]}
    />
  )
}
