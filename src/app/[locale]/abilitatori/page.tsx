import { getPageMetadata } from '@/lib/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return getPageMetadata('abilitatori', locale)
}

import { AbilitatoriPage } from '@/components/sections/Abilitatori'

export default function Abilitatori() {
  return (
    <main>
      <AbilitatoriPage />
    </main>
  )
}
