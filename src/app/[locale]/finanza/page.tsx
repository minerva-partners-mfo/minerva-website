import { getPageMetadata } from '@/lib/metadata'
import { FinanzaContent } from './content'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return getPageMetadata('finanza', locale)
}

export default function FinanzaPage() {
  return <main><FinanzaContent /></main>
}
