import { getPageMetadata } from '@/lib/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return getPageMetadata('ecosistema/friends', locale)
}

import { EcosistemaFriendsPage } from '@/components/sections/EcosistemaFriends'

export default function Friends() {
  return (
    <main>
      <EcosistemaFriendsPage />
    </main>
  )
}
