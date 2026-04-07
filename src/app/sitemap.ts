import type { MetadataRoute } from 'next'

const BASE_URL = 'https://minervapartners.it'

const pages = [
  '',
  '/hub',
  '/ecosistema',
  '/ecosistema/partners',
  '/ecosistema/friends',
  '/ecosistema/advisors',
  '/soluzioni',
  '/abilitatori',
  '/codice',
  '/trasparenza',
  '/selezione',
  '/eventi',
  '/point-zero',
  '/next-gen',
  '/strategia',
  '/management',
  '/pensiero',
  '/contatti',
  '/problema',
  '/come-funziona',
  '/posizionamento',
  '/settori',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const page of pages) {
    for (const locale of ['it', 'en']) {
      entries.push({
        url: `${BASE_URL}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: page === '' ? 1.0 : 0.8,
      })
    }
  }

  return entries
}
