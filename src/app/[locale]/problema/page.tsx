import { getPageMetadata } from '@/lib/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return getPageMetadata('problema', locale)
}

import { ProblemaPage } from '@/components/sections/Problema'

export default function Problema() {
  return (
    <main>
      <ProblemaPage />
    </main>
  )
}
