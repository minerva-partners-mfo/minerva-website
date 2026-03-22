import { getPageMetadata } from '@/lib/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return getPageMetadata('selezione', locale)
}

import { SelezionePage } from '@/components/sections/Selezione'

export default function Selezione() {
  return (
    <main>
      <SelezionePage />
    </main>
  )
}
