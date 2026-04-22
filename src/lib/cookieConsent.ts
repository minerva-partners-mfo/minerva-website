// Cookie consent types, constants and helpers

export interface ConsentState {
  necessary: true
  functional: boolean
  analytics: boolean
  performance: boolean
  marketing: boolean
  timestamp: number
  version: string
}

export interface ConsentLogEntry {
  timestamp: number
  action: 'accept_all' | 'reject_all' | 'save_preferences'
  version: string
  categories: {
    functional: boolean
    analytics: boolean
    performance: boolean
    marketing: boolean
  }
}

export type ConsentCategory = 'necessary' | 'functional' | 'analytics' | 'performance' | 'marketing'

export const CONSENT_STORAGE_KEY = 'minerva-consent'
export const CONSENT_LOG_KEY = 'minerva-consent-log'
export const CONSENT_VERSION = '1.0'
export const CONSENT_DURATION_MS = 6 * 30 * 24 * 60 * 60 * 1000 // ~6 months

export const CATEGORIES: ConsentCategory[] = ['necessary', 'functional', 'analytics', 'performance', 'marketing']

export interface ServiceInfo {
  name: string
  provider: string
  purpose: string
  duration: string
  policyUrl?: string
}

export const CATEGORY_SERVICES: Record<ConsentCategory, ServiceInfo[]> = {
  necessary: [
    { name: 'Supabase (auth session)', provider: 'Supabase Inc.', purpose: 'auth', duration: 'Session', policyUrl: 'https://supabase.com/privacy' },
    { name: 'Consent cookie', provider: 'Minerva Partners', purpose: 'consent', duration: '6 months' },
    { name: 'Language cookie', provider: 'Minerva Partners', purpose: 'language', duration: '12 months' },
    { name: 'CSRF token', provider: 'Minerva Partners', purpose: 'security', duration: 'Session' },
  ],
  functional: [],
  analytics: [
    { name: 'Google Analytics 4', provider: 'Google Ireland Ltd.', purpose: 'analytics', duration: '14 months', policyUrl: 'https://policies.google.com/privacy' },
    { name: 'Vercel Analytics', provider: 'Vercel Inc.', purpose: 'analytics', duration: '12 months', policyUrl: 'https://vercel.com/legal/privacy-policy' },
  ],
  performance: [],
  marketing: [
    { name: 'Meta Pixel', provider: 'Meta Platforms Ireland Ltd.', purpose: 'marketing', duration: '13 months', policyUrl: 'https://www.facebook.com/privacy/policy' },
    { name: 'LinkedIn Insight Tag', provider: 'LinkedIn Ireland Unlimited Co.', purpose: 'marketing', duration: '6 months', policyUrl: 'https://www.linkedin.com/legal/privacy-policy' },
    { name: 'Google Tag Manager', provider: 'Google Ireland Ltd.', purpose: 'marketing', duration: 'See individual tags', policyUrl: 'https://policies.google.com/privacy' },
  ],
}

export function getConsentDefaults(): ConsentState {
  return {
    necessary: true,
    functional: false,
    analytics: false,
    performance: false,
    marketing: false,
    timestamp: 0,
    version: CONSENT_VERSION,
  }
}

export function getStoredConsent(): ConsentState | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as ConsentState
  } catch {
    return null
  }
}

export function setStoredConsent(state: ConsentState): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(state))
  } catch {
    // localStorage may be unavailable
  }
}

export function isConsentExpired(state: ConsentState): boolean {
  if (!state.timestamp) return true
  return Date.now() - state.timestamp > CONSENT_DURATION_MS
}

export function isConsentVersionOutdated(state: ConsentState): boolean {
  return state.version !== CONSENT_VERSION
}

export function logConsentAction(
  action: ConsentLogEntry['action'],
  state: ConsentState
): void {
  if (typeof window === 'undefined') return
  try {
    const raw = localStorage.getItem(CONSENT_LOG_KEY)
    const log: ConsentLogEntry[] = raw ? JSON.parse(raw) : []
    log.push({
      timestamp: Date.now(),
      action,
      version: CONSENT_VERSION,
      categories: {
        functional: state.functional,
        analytics: state.analytics,
        performance: state.performance,
        marketing: state.marketing,
      },
    })
    localStorage.setItem(CONSENT_LOG_KEY, JSON.stringify(log))
  } catch {
    // fail silently
  }
}

export function updateGoogleConsentMode(state: ConsentState): void {
  if (typeof window === 'undefined') return
  const w = window as Window & { gtag?: (...args: unknown[]) => void }
  if (!w.gtag) return

  w.gtag('consent', 'update', {
    analytics_storage: state.analytics ? 'granted' : 'denied',
    ad_storage: state.marketing ? 'granted' : 'denied',
    ad_user_data: state.marketing ? 'granted' : 'denied',
    ad_personalization: state.marketing ? 'granted' : 'denied',
    functionality_storage: state.functional ? 'granted' : 'denied',
    personalization_storage: state.functional ? 'granted' : 'denied',
    security_storage: 'granted',
  })
}
