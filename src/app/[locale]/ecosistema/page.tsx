import { getPageMetadata } from '@/lib/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return getPageMetadata('ecosistema', locale)
}

import { EcosistemaPage } from '@/components/sections/Ecosistema'

export default function Ecosistema() {
  return (
    <main>
      <EcosistemaPage />
    </main>
  )
}
