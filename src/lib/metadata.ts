import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

interface PageMeta {
  titleKey: string
  descKey: string
  namespace: string
}

const PAGE_META: Record<string, PageMeta> = {
  home: { namespace: 'meta', titleKey: 'home.title', descKey: 'home.desc' },
  hub: { namespace: 'meta', titleKey: 'hub.title', descKey: 'hub.desc' },
  ecosistema: { namespace: 'meta', titleKey: 'ecosistema.title', descKey: 'ecosistema.desc' },
  'ecosistema/partners': { namespace: 'meta', titleKey: 'ecosistemaPartners.title', descKey: 'ecosistemaPartners.desc' },
  'ecosistema/friends': { namespace: 'meta', titleKey: 'ecosistemaFriends.title', descKey: 'ecosistemaFriends.desc' },
  'ecosistema/advisors': { namespace: 'meta', titleKey: 'ecosistemaAdvisors.title', descKey: 'ecosistemaAdvisors.desc' },
  soluzioni: { namespace: 'meta', titleKey: 'soluzioni.title', descKey: 'soluzioni.desc' },
  abilitatori: { namespace: 'meta', titleKey: 'abilitatori.title', descKey: 'abilitatori.desc' },
  wealth: { namespace: 'meta', titleKey: 'wealth.title', descKey: 'wealth.desc' },
  codice: { namespace: 'meta', titleKey: 'codice.title', descKey: 'codice.desc' },
  trasparenza: { namespace: 'meta', titleKey: 'trasparenza.title', descKey: 'trasparenza.desc' },
  selezione: { namespace: 'meta', titleKey: 'selezione.title', descKey: 'selezione.desc' },
  eventi: { namespace: 'meta', titleKey: 'eventi.title', descKey: 'eventi.desc' },
  'point-zero': { namespace: 'meta', titleKey: 'pointZero.title', descKey: 'pointZero.desc' },
  'next-gen': { namespace: 'meta', titleKey: 'nextGen.title', descKey: 'nextGen.desc' },
  strategia: { namespace: 'meta', titleKey: 'strategia.title', descKey: 'strategia.desc' },
  management: { namespace: 'meta', titleKey: 'management.title', descKey: 'management.desc' },
  pensiero: { namespace: 'meta', titleKey: 'pensiero.title', descKey: 'pensiero.desc' },
  contatti: { namespace: 'meta', titleKey: 'contatti.title', descKey: 'contatti.desc' },
  problema: { namespace: 'meta', titleKey: 'problema.title', descKey: 'problema.desc' },
  'come-funziona': { namespace: 'meta', titleKey: 'comeFunziona.title', descKey: 'comeFunziona.desc' },
  posizionamento: { namespace: 'meta', titleKey: 'posizionamento.title', descKey: 'posizionamento.desc' },
  settori: { namespace: 'meta', titleKey: 'settori.title', descKey: 'settori.desc' },
  azienda: { namespace: 'meta', titleKey: 'azienda.title', descKey: 'azienda.desc' },
  'real-estate': { namespace: 'meta', titleKey: 'realEstate.title', descKey: 'realEstate.desc' },
  finanza: { namespace: 'meta', titleKey: 'finanza.title', descKey: 'finanza.desc' },
  famiglia: { namespace: 'meta', titleKey: 'famiglia.title', descKey: 'famiglia.desc' },
  passioni: { namespace: 'meta', titleKey: 'passioni.title', descKey: 'passioni.desc' },
  futuro: { namespace: 'meta', titleKey: 'futuro.title', descKey: 'futuro.desc' },
  'per-chi': { namespace: 'meta', titleKey: 'perChi.title', descKey: 'perChi.desc' },
}

export async function getPageMetadata(
  pageKey: string,
  locale: string
): Promise<Metadata> {
  const meta = PAGE_META[pageKey]
  if (!meta) return {}

  const t = await getTranslations({ locale, namespace: meta.namespace })

  return {
    title: t(meta.titleKey),
    description: t(meta.descKey),
    alternates: {
      languages: {
        it: `/it/${pageKey === 'home' ? '' : pageKey}`,
        en: `/en/${pageKey === 'home' ? '' : pageKey}`,
      },
    },
  }
}
