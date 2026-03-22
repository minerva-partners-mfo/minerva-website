import { getPageMetadata } from '@/lib/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return getPageMetadata('settori', locale)
}

import { SettoriPage } from '@/components/sections/Settori'

export default function Settori() {
  return (
    <main>
      <SettoriPage />
    </main>
  )
}
