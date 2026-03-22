import { getPageMetadata } from '@/lib/metadata'
import { IlMosaico } from '@/components/sections/IlMosaico'
import { ImageEcosistema } from '@/components/sections/ImageEcosistema'
import { HomeEcosistema } from '@/components/sections/HomeEcosistema'
import { LaForza } from '@/components/sections/LaForza'
import { PortaleCards } from '@/components/sections/PortaleCards'
import { SkinInTheGame } from '@/components/sections/SkinInTheGame'
import { Invito } from '@/components/sections/Invito'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return getPageMetadata('home', locale)
}

export default function HomePage() {
  return (
    <main>
      <IlMosaico />
      <div className="perf-defer">
        <ImageEcosistema />
      </div>
      <HomeEcosistema />
      <div className="perf-defer">
        <LaForza />
      </div>
      <div className="perf-defer">
        <PortaleCards />
      </div>
      <div className="perf-defer">
        <SkinInTheGame />
      </div>
      <div className="perf-defer">
        <Invito />
      </div>
    </main>
  )
}
