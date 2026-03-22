import { getPageMetadata } from '@/lib/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return getPageMetadata('codice', locale)
}

import { CodicePage } from '@/components/sections/Codice'

export default function Codice() {
  return (
    <main>
      <CodicePage />
    </main>
  )
}
