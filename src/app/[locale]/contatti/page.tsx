import { getPageMetadata } from '@/lib/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return getPageMetadata('contatti', locale)
}

import { ContattiPage } from '@/components/sections/Contatti'

export default function Contatti() {
  return (
    <main>
      <ContattiPage />
    </main>
  )
}
