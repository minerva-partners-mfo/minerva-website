import { getPageMetadata } from '@/lib/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return getPageMetadata('ecosistema/partners', locale)
}

import { EcosistemaPartnersPage } from '@/components/sections/EcosistemaPartners'

export default function Partners() {
  return (
    <main>
      <EcosistemaPartnersPage />
    </main>
  )
}
