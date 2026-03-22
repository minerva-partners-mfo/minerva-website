import { getPageMetadata } from '@/lib/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return getPageMetadata('ecosistema/advisors', locale)
}

import { EcosistemaAdvisorsPage } from '@/components/sections/EcosistemaAdvisors'

export default function Advisors() {
  return (
    <main>
      <EcosistemaAdvisorsPage />
    </main>
  )
}
