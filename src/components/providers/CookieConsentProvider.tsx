'use client'

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import {
  type ConsentState,
  getConsentDefaults,
  getStoredConsent,
  setStoredConsent,
  isConsentExpired,
  isConsentVersionOutdated,
  logConsentAction,
  updateGoogleConsentMode,
} from '@/lib/cookieConsent'

interface CookieConsentContextValue {
  consent: ConsentState
  showBanner: boolean
  showPreferences: boolean
  initialized: boolean
  acceptAll: () => void
  rejectAll: () => void
  savePreferences: (categories: Partial<ConsentState>) => void
  openPreferences: () => void
  closePreferences: () => void
}

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null)

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext)
  if (!ctx) throw new Error('useCookieConsent must be used within CookieConsentProvider')
  return ctx
}

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentState>(getConsentDefaults)
  const [showBanner, setShowBanner] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [initialized, setInitialized] = useState(false)

  // On mount: check stored consent
  useEffect(() => {
    const stored = getStoredConsent()
    if (stored && !isConsentExpired(stored) && !isConsentVersionOutdated(stored)) {
      setConsent(stored)
      updateGoogleConsentMode(stored)
    } else {
      setShowBanner(true)
    }
    setInitialized(true)
  }, [])

  // Body scroll lock — position:fixed technique for iOS Safari compatibility
  useEffect(() => {
    if (!initialized) return
    const isLocked = showBanner || showPreferences

    if (isLocked) {
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.left = '0'
      document.body.style.right = '0'
      document.body.style.overflow = 'hidden'

      return () => {
        const storedY = document.body.style.top
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.left = ''
        document.body.style.right = ''
        document.body.style.overflow = ''
        window.scrollTo(0, parseInt(storedY || '0') * -1)
      }
    }
  }, [showBanner, showPreferences, initialized])

  const persistConsent = useCallback((state: ConsentState, action: 'accept_all' | 'reject_all' | 'save_preferences') => {
    const final = { ...state, timestamp: Date.now(), version: state.version }
    setConsent(final)
    setStoredConsent(final)
    logConsentAction(action, final)
    updateGoogleConsentMode(final)
    setShowBanner(false)
    setShowPreferences(false)
  }, [])

  const acceptAll = useCallback(() => {
    persistConsent({
      necessary: true,
      functional: true,
      analytics: true,
      performance: true,
      marketing: true,
      timestamp: Date.now(),
      version: consent.version,
    }, 'accept_all')
  }, [persistConsent, consent.version])

  const rejectAll = useCallback(() => {
    persistConsent(getConsentDefaults(), 'reject_all')
  }, [persistConsent])

  const savePreferences = useCallback((categories: Partial<ConsentState>) => {
    persistConsent({
      ...consent,
      ...categories,
      necessary: true,
      timestamp: Date.now(),
    }, 'save_preferences')
  }, [persistConsent, consent])

  const openPreferences = useCallback(() => {
    setShowPreferences(true)
  }, [])

  const closePreferences = useCallback(() => {
    setShowPreferences(false)
  }, [])

  // Expose openPreferences globally for footer button
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as Window & { MinervaConsent?: { showPreferences: () => void } }).MinervaConsent = {
        showPreferences: openPreferences,
      }
    }
  }, [openPreferences])

  return (
    <CookieConsentContext.Provider
      value={{
        consent,
        showBanner,
        showPreferences,
        initialized,
        acceptAll,
        rejectAll,
        savePreferences,
        openPreferences,
        closePreferences,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  )
}
