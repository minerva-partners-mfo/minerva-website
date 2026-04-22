'use client'

import { ConsentBanner } from '@/components/consent/ConsentBanner'
import { ConsentPreferences } from '@/components/consent/ConsentPreferences'
import { ConsentScripts } from '@/components/consent/ConsentScripts'

export function CookieConsent() {
  return (
    <>
      <ConsentBanner />
      <ConsentPreferences />
      <ConsentScripts />
    </>
  )
}
