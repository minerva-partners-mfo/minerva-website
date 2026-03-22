import { getPageMetadata } from '@/lib/metadata'
import { RealEstateContent } from './content'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return getPageMetadata('real-estate', locale)
}

export default function RealEstatePage() {
  return <main><RealEstateContent /></main>
}
