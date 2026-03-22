import { getPageMetadata } from '@/lib/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return getPageMetadata('soluzioni', locale)
}

import { SoluzioniPage } from '@/components/sections/Soluzioni'

export default function Soluzioni() {
  return (
    <main>
      <SoluzioniPage />
    </main>
  )
}
