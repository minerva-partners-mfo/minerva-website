'use client'
import { useTranslations } from 'next-intl'
import { MosaicPage } from '@/components/sections/MosaicPage'

export function FamigliaContent() {
  const t = useTranslations('famiglia')
  return (
    <MosaicPage
      videoSrc="/videos/sfera-famiglia.mp4"
      headline={t('hero.headline')}
      goldPhrase={t('gold.phrase')}
      goldSubtext={t('gold.subtext')}
      sections={[
        {
          type: 'cards',
          cards: [
            { num: '01', title: 'PASSAGGIO GENERAZIONALE', text: 'Processo strutturato 3-5 anni · Chi entra impara a guidare, chi esce impara a lasciare · Pianificazione successoria integrata · Allineamento aspettative tra generazioni · Definizione tempi, modi, ruoli' },
            { num: '02', title: 'GOVERNANCE FAMILIARE', text: 'Costituzione familiare · Patti di famiglia · Definizione ruoli e responsabilità · Separazione dinamiche affettive e decisioni patrimoniali · Assemblee familiari strutturate · Processi decisionali condivisi' },
            { num: '03', title: 'FAMILY OFFICE PERSONALE', text: 'Un punto di riferimento unico per la famiglia · Coordinamento di tutti i professionisti · Supervisione globale del patrimonio · Reportistica consolidata · Interfaccia unica per ogni esigenza · La regia che mancava' },
            { num: '04', title: 'NEXT GEN <> GEN EXIT', text: 'Programma a due vie · I più giovani: workshop, mentorship, project work su deal reali · I senior: da operativo a strategico · Deep dive intergenerazionali · Finanza comportamentale a due vie · Deal lab misto' },
            { num: '05', title: 'STRUMENTI DI VALORE', text: 'Trust e veicoli di protezione · Holding familiari · Patti parasociali · Architettura societaria · Strumenti di governance avanzata · Ogni pezzo ha un ruolo nel sistema complessivo' },
            { num: '06', title: 'PROTEZIONE PATRIMONIO', text: 'Segregazione patrimoniale · Asset protection · Strutture societarie protettive · Pianificazione fiscale integrata · Coperture assicurative coordinate · Gestione rischi invisibili' },
          ],
        },
        {
          type: 'stats',
          stats: [
            { value: '70%', label: 'non sopravvive alla 2a gen', source: 'AUB Bocconi' },
            { value: '18%', label: 'ha un piano successione', source: 'AUB/ISTAT' },
            { value: '81%', label: 'eredi cambierà consulente', source: 'Capgemini 2025' },
            { value: '+7,4%', label: 'ricavi chi lo fa bene', source: 'AUB 2025' },
          ],
        },
        {
          type: 'concrete',
          title: 'Esempi concreti',
          concrete: [
            { title: 'Governance da zero', text: 'Famiglia con 3 rami e 12 immobili. Nessuna governance. In 6 mesi: costituzione familiare, patto di famiglia, CdA con advisor esterno. Zero conflitti da allora.' },
            { title: 'Inserimento Next Gen', text: 'Imprenditore 68 anni, figlia 32 anni. Inserimento graduale: da osservatrice a membro CdA in 24 mesi. L\'azienda non ha perso un giorno.' },
            { title: 'Family Office personale', text: 'Patrimonio €25M frammentato tra 7 professionisti. Un punto di riferimento Minerva: costo netto inferiore a prima.' },
          ],
        },
        { type: 'differentiator', quote: t('differentiator') },
        { type: 'cta', ctaText: t('cta'), ctaHref: '/contatti' },
      ]}
    />
  )
}
