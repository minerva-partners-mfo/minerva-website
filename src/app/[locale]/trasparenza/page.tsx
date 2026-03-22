import { getPageMetadata } from '@/lib/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return getPageMetadata('trasparenza', locale)
}

import { TrasparenzaPage } from '@/components/sections/Trasparenza'

export default function Trasparenza() {
  return (
    <main>
      <TrasparenzaPage />
    </main>
  )
}
