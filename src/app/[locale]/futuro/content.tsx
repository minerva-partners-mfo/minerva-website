'use client'
import { useTranslations } from 'next-intl'
import { MosaicPage } from '@/components/sections/MosaicPage'

export function FuturoContent() {
  const t = useTranslations('futuro')
  return (
    <MosaicPage
      videoSrc="/videos/sfera-futuro.mp4"
      headline={t('hero.headline')}
      goldPhrase={t('gold.phrase')}
      goldSubtext={t('gold.subtext')}
      sections={[
        {
          type: 'cards',
          cards: [
            { num: '01', title: 'PIANIFICAZIONE SUCCESSORIA INTEGRATA', text: 'Non un testamento: un progetto · Analisi situazione attuale e mapping eredi · Definizione strategia di trasferimento · Coordinamento aspetti legali, fiscali e finanziari · Timeline e milestones' },
            { num: '02', title: 'TRUST E VEICOLI DI PROTEZIONE', text: 'Architettura trust su misura · Holding familiari multi-generazionali · Fondazioni · Veicoli di segregazione patrimoniale · Compliance internazionale' },
            { num: '03', title: 'NEXT GEN <> GEN EXIT', text: 'Programma a due vie · Workshop e mentorship per la nuova generazione · Accompagnamento del senior da operativo a strategico · Deal lab intergenerazionale' },
            { num: '04', title: 'WEALTH TRANSFER STRATEGY', text: 'Quanto, come e quando trasferire · Donazioni strutturate · Patti di famiglia · Cessioni intergenerazionali · Ottimizzazione fiscale del trasferimento' },
            { num: '05', title: 'LEGACY E CONTINUITÀ', text: 'Valori, reputazione, significato · Definizione della legacy familiare · Filantropia strutturata · Continuità del nome e della missione · Custodire significa proteggere, far crescere, trasmettere' },
          ],
        },
        {
          type: 'stats',
          stats: [
            { value: '$83.500 mld', label: 'in trasferimento globale' },
            { value: '2-2,5M', label: 'imprese coinvolte' },
            { value: '70%', label: 'non sopravvive alla 2a gen' },
            { value: '+7,4%', label: 'chi lo fa bene' },
          ],
        },
        {
          type: 'text',
          title: 'La nostra visione',
          body: 'Custodire significa proteggere, far crescere, trasmettere e dare significato. Il trasferimento patrimoniale non è un evento ma un processo che dura anni. Lo accompagniamo con una regia che integra aspetti legali, fiscali, finanziari e — soprattutto — familiari.',
        },
        { type: 'differentiator', quote: t('differentiator') },
        { type: 'cta', ctaText: t('cta'), ctaHref: '/contatti' },
      ]}
    />
  )
}
