import { getPageMetadata } from '@/lib/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return getPageMetadata('next-gen', locale)
}

import { NextGenPage } from '@/components/sections/NextGen'

export default function NextGen() {
  return (
    <main>
      <NextGenPage />
    </main>
  )
}
