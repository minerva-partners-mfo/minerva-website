import { getPageMetadata } from '@/lib/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return getPageMetadata('management', locale)
}

import { ManagementPage } from '@/components/sections/Management'

export default function Management() {
  return (
    <main>
      <ManagementPage />
    </main>
  )
}
