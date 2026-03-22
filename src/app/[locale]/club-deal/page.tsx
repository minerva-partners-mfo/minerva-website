import { getPageMetadata } from '@/lib/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return getPageMetadata('clubDeal', locale)
}

import { ClubDealPage } from '@/components/sections/ClubDeal'

export default function ClubDeal() {
  return (
    <main>
      <ClubDealPage />
    </main>
  )
}
