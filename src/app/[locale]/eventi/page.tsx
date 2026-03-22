import { getPageMetadata } from '@/lib/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return getPageMetadata('eventi', locale)
}

import { EventiPage } from '@/components/sections/Eventi'

export default function Eventi() {
  return (
    <main>
      <EventiPage />
    </main>
  )
}
