import { getPageMetadata } from '@/lib/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return getPageMetadata('hub', locale)
}

import { HubPage } from '@/components/sections/Hub'

export default function Hub() {
  return (
    <main>
      <HubPage />
    </main>
  )
}
