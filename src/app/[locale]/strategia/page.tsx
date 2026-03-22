import { getPageMetadata } from '@/lib/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return getPageMetadata('strategia', locale)
}

import { StrategiaPage } from '@/components/sections/Strategia'

export default function Strategia() {
  return (
    <main>
      <StrategiaPage />
    </main>
  )
}
