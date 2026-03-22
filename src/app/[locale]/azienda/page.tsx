import { getPageMetadata } from '@/lib/metadata'
import { AziendaContent } from './content'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return getPageMetadata('azienda', locale)
}

export default function AziendaPage() {
  return <main><AziendaContent /></main>
}
