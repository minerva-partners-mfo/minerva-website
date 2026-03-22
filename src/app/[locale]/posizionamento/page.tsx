import { getPageMetadata } from '@/lib/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return getPageMetadata('posizionamento', locale)
}

import { PosizionamentoPage } from '@/components/sections/Posizionamento'

export default function Posizionamento() {
  return (
    <main>
      <PosizionamentoPage />
    </main>
  )
}
