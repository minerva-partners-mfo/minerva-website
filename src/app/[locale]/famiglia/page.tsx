import { getPageMetadata } from '@/lib/metadata'
import { FamigliaContent } from './content'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return getPageMetadata('famiglia', locale)
}

export default function FamigliaPage() {
  return <main><FamigliaContent /></main>
}
