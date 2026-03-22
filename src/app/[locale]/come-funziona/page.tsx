import { getPageMetadata } from '@/lib/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return getPageMetadata('come-funziona', locale)
}

import { ComeFunzionaPage } from '@/components/sections/ComeFunziona'

export default function ComeFunziona() {
  return (
    <main>
      <ComeFunzionaPage />
    </main>
  )
}
