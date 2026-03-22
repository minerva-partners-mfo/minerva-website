'use client'
import { useTranslations } from 'next-intl'
import { MosaicPage } from '@/components/sections/MosaicPage'

export function PassioniContent() {
  const t = useTranslations('passioni')
  return (
    <MosaicPage
      videoSrc="/videos/sfera-vita.mp4"
      headline={t('hero.headline')}
      goldPhrase={t('gold.phrase')}
      goldSubtext={t('gold.subtext')}
      sections={[
        {
          type: 'cards',
          cards: [
            { num: '01', title: 'COLLEZIONI E OPERE D\'ARTE', text: 'Catalogazione e valutazione · Advisory per acquisizioni · Trust e strutture di protezione · Gestione logistica e assicurativa · Pianificazione successoria delle collezioni' },
            { num: '02', title: 'NAUTICA E AVIAZIONE', text: 'Strutturazione acquisto (leasing, holding, bandiera) · Gestione operativa · Ottimizzazione fiscale · Chartering e revenue management · Compliance normativa' },
            { num: '03', title: 'PROPRIETÀ DI PRESTIGIO', text: 'Villa, casale, chalet, appartamento iconico · Scouting off-market · Gestione e manutenzione · Ristrutturazione luxury · Integrazione nel portafoglio immobiliare' },
            { num: '04', title: 'INVESTIMENTI PASSIONALI', text: 'Vini pregiati, auto d\'epoca, cavalli, orologi · Advisory specializzato per ogni categoria · Valutazione e autenticazione · Storage e logistica · Exit strategy' },
            { num: '05', title: 'FILANTROPIA E LEGACY', text: 'Fondazioni familiari · Impact investing · Donazioni pianificate con ottimizzazione fiscale · Art bonus e mecenatismo · Definizione della legacy familiare' },
          ],
        },
        {
          type: 'text',
          title: 'La nostra filosofia',
          body: 'Le passioni non sono distrazioni dal patrimonio: sono parte integrante. Le trattiamo come il motivo per cui tutto il resto esiste. Con lo stesso rigore analitico che riserviamo agli investimenti finanziari e immobiliari.',
        },
        { type: 'differentiator', quote: t('differentiator') },
        { type: 'cta', ctaText: t('cta'), ctaHref: '/contatti' },
      ]}
    />
  )
}
