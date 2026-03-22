import { getPageMetadata } from '@/lib/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return getPageMetadata('point-zero', locale)
}

import { PointZeroPage } from '@/components/sections/PointZero'

export default function PointZero() {
  return (
    <main>
      <PointZeroPage />
    </main>
  )
}
