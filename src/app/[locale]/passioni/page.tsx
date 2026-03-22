import { getPageMetadata } from '@/lib/metadata'
import { PassioniContent } from './content'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return getPageMetadata('passioni', locale)
}

export default function PassioniPage() {
  return <main><PassioniContent /></main>
}
