import { getPageMetadata } from '@/lib/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const meta = await getPageMetadata('next-gen', locale)
  return { ...meta, title: 'NextGen <> GenExit' }
}

import { NextGenPage } from '@/components/sections/NextGen'

export default function NextGen() {
  return (
    <main>
      <NextGenPage />
    </main>
  )
}
