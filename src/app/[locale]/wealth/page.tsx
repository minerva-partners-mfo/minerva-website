import { getPageMetadata } from '@/lib/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return getPageMetadata('wealth', locale)
}

import { WealthPage } from '@/components/sections/Wealth'

export default function Wealth() {
  return (
    <main>
      <WealthPage />
    </main>
  )
}
