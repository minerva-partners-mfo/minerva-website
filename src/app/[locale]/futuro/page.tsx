import { getPageMetadata } from '@/lib/metadata'
import { FuturoContent } from './content'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return getPageMetadata('futuro', locale)
}

export default function FuturoPage() {
  return <main><FuturoContent /></main>
}
