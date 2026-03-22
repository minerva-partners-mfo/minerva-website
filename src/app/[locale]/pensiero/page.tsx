import { getPageMetadata } from '@/lib/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return getPageMetadata('pensiero', locale)
}

import { PensieroPage } from '@/components/sections/Pensiero'

export default function Pensiero() {
  return (
    <main>
      <PensieroPage />
    </main>
  )
}
