import { getPageMetadata } from '@/lib/metadata'
import { PerChiPage } from '@/components/sections/PerChi'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return getPageMetadata('per-chi', locale)
}

export default function PerChi() {
  return <main><PerChiPage /></main>
}
