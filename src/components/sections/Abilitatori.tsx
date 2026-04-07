'use client'

import { useRef, useEffect } from 'react'
import { Link } from '@/i18n/navigation'
import { gsap } from '@/lib/gsap'
import { onIdle } from '@/lib/idle'
import { useTranslations } from 'next-intl'

/* ── Constants ── */
const DEAL_KEYS = ['d1', 'd2', 'd3'] as const
const DEAL_GRADIENTS = [
  'linear-gradient(135deg, #1A2744, #2E3A6E)',
  'linear-gradient(135deg, #1A2744, #1A3A2A)',
  'linear-gradient(135deg, #1A2744, #3A2250)',
]

const DASH_KEYS = ['pipeline', 'documenti', 'performance', 'governance'] as const

export function AbilitatoriPage() {
  const t = useTranslations('abilitatori')

  const sectionRef = useRef<HTMLElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const bachecaRef = useRef<HTMLDivElement>(null)
  const portaleRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    let ctx: ReturnType<typeof gsap.context> | undefined
    const cancelIdle = onIdle(() => {
      if (!sectionRef.current) return
      ctx = gsap.context(() => {
        if (heroRef.current) {
          gsap.from(heroRef.current.querySelectorAll('.hero-anim'), {
            y: 40, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out',
            scrollTrigger: { trigger: heroRef.current, start: 'top 85%', toggleActions: 'play none none none' },
          })
        }

        if (bachecaRef.current) {
          gsap.from(bachecaRef.current.querySelectorAll('.bch-anim'), {
            y: 40, opacity: 0, duration: 0.7, stagger: 0.15, ease: 'power2.out',
            scrollTrigger: { trigger: bachecaRef.current, start: 'top 80%', toggleActions: 'play none none none' },
          })
        }

        if (portaleRef.current) {
          gsap.from(portaleRef.current.querySelectorAll('.ptl-anim'), {
            y: 40, opacity: 0, duration: 0.7, stagger: 0.15, ease: 'power2.out',
            scrollTrigger: { trigger: portaleRef.current, start: 'top 80%', toggleActions: 'play none none none' },
          })
        }

        if (ctaRef.current) {
          gsap.from(ctaRef.current, {
            y: 40, opacity: 0, duration: 0.8, ease: 'power2.out',
            scrollTrigger: { trigger: ctaRef.current, start: 'top 90%', toggleActions: 'play none none none' },
          })
        }
      }, section)
    })

    return () => {
      cancelIdle()
      ctx?.revert()
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-screen" style={{ backgroundColor: '#0D1520' }}>

      {/* ════════════════════════════════════════════════════════
          HERO
          ════════════════════════════════════════════════════════ */}
      <div ref={heroRef} className="min-h-[60vh] flex items-center justify-center px-4 md:px-6">
        <div className="max-w-[750px] mx-auto text-center py-24 md:py-32">
          <h1
            className="hero-anim font-serif font-semibold text-white leading-tight mb-4"
            style={{ fontSize: 'clamp(32px, 5vw, 48px)' }}
          >
            {t('headline')}
          </h1>
          <p className="hero-anim font-sans" style={{ fontSize: '17px', color: '#C9912B', lineHeight: '1.6' }}>
            {t('subtitle')}
          </p>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════
          ABILITATORE 01 — LA BACHECA
          ════════════════════════════════════════════════════════ */}
      <div
        ref={bachecaRef}
        className="flex items-center justify-center px-4 md:px-6 py-20 md:py-28"
        style={{ minHeight: '60vh', background: 'linear-gradient(to bottom, #0D1520, rgba(201,145,43,0.04))' }}
      >
        <div className="max-w-[1100px] mx-auto w-full">
          {/* Number */}
          <div className="bch-anim flex items-center justify-center rounded-full mx-auto mb-6" style={{ width: '48px', height: '48px', border: '2px solid #C9912B' }}>
            <span className="font-sans font-bold" style={{ fontSize: '16px', color: '#C9912B' }}>01</span>
          </div>
          <h2 className="bch-anim font-serif font-semibold text-white text-center mb-2" style={{ fontSize: '36px' }}>
            {t('bacheca.title')}
          </h2>
          <p className="bch-anim font-sans text-center mb-8" style={{ fontSize: '16px', color: '#C9912B' }}>
            {t('bacheca.subtitle')}
          </p>
          <p
            className="bch-anim font-sans font-light text-center mx-auto mb-12"
            style={{ fontSize: '16px', color: 'rgba(255,255,255,0.55)', lineHeight: '1.7', maxWidth: '800px' }}
          >
            {t('bacheca.desc')}
          </p>

          {/* Deal cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {DEAL_KEYS.map((key, i) => (
              <div
                key={key}
                className="bch-anim rounded-xl"
                style={{ background: DEAL_GRADIENTS[i], padding: '24px' }}
              >
                <span className="font-sans font-bold uppercase tracking-wider block mb-2" style={{ fontSize: '10px', color: '#C9912B' }}>
                  {t(`bacheca.deals.${key}.tag`)}
                </span>
                <p className="font-sans font-light mb-3" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.65)', lineHeight: '1.6' }}>
                  {t(`bacheca.deals.${key}.desc`)}
                </p>
                <p className="font-serif font-semibold text-white mb-3" style={{ fontSize: '18px' }}>
                  {t(`bacheca.deals.${key}.ev`)}
                </p>
                <span
                  className="inline-block font-sans font-bold uppercase tracking-wider"
                  style={{
                    fontSize: '10px',
                    color: '#C9912B',
                    backgroundColor: 'rgba(201,145,43,0.12)',
                    padding: '4px 10px',
                    borderRadius: '20px',
                  }}
                >
                  {t(`bacheca.deals.${key}.pill`)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════
          ABILITATORE 02 — IL PORTALE
          ════════════════════════════════════════════════════════ */}
      <div
        ref={portaleRef}
        className="flex items-center justify-center px-4 md:px-6 py-20 md:py-28"
        style={{ minHeight: '60vh', background: 'linear-gradient(to bottom, #0D1520, rgba(255,255,255,0.02))' }}
      >
        <div className="max-w-[1100px] mx-auto w-full">
          <div className="ptl-anim flex items-center justify-center rounded-full mx-auto mb-6" style={{ width: '48px', height: '48px', border: '2px solid #C9912B' }}>
            <span className="font-sans font-bold" style={{ fontSize: '16px', color: '#C9912B' }}>02</span>
          </div>
          <h2 className="ptl-anim font-serif font-semibold text-white text-center mb-2" style={{ fontSize: '36px' }}>
            {t('portale.title')}
          </h2>
          <p className="ptl-anim font-sans text-center mb-8" style={{ fontSize: '16px', color: '#C9912B' }}>
            {t('portale.subtitle')}
          </p>
          <p
            className="ptl-anim font-sans font-light text-center mx-auto mb-12"
            style={{ fontSize: '16px', color: 'rgba(255,255,255,0.55)', lineHeight: '1.7', maxWidth: '800px' }}
          >
            {t('portale.desc')}
          </p>

          {/* Dashboard mockup */}
          <div
            className="ptl-anim rounded-xl"
            style={{
              border: '1px solid rgba(255,255,255,0.10)',
              backgroundColor: 'rgba(255,255,255,0.02)',
              padding: '24px',
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {DASH_KEYS.map((key) => (
                <div key={key} className="rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.03)', padding: '16px', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <p className="font-sans font-bold uppercase tracking-wider mb-3" style={{ fontSize: '10px', color: '#C9912B' }}>
                    {t(`portale.dash.${key}.title`)}
                  </p>

                  {key === 'pipeline' && (
                    <div className="space-y-2">
                      {[70, 45, 25].map((w, j) => (
                        <div key={j} className="rounded-sm overflow-hidden" style={{ height: '8px', backgroundColor: 'rgba(255,255,255,0.04)' }}>
                          <div className="h-full rounded-sm" style={{ width: `${w}%`, backgroundColor: 'rgba(201,145,43,0.4)' }} />
                        </div>
                      ))}
                    </div>
                  )}

                  {key === 'documenti' && (
                    <div className="space-y-2">
                      {[1, 2, 3].map((j) => (
                        <div key={j} className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }} />
                          <div className="h-2 rounded-full flex-1" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }} />
                        </div>
                      ))}
                    </div>
                  )}

                  {key === 'performance' && (
                    <div className="flex items-end gap-2" style={{ height: '48px' }}>
                      {[40, 60, 80].map((h, j) => (
                        <div key={j} className="flex-1 rounded-sm" style={{ height: `${h}%`, backgroundColor: 'rgba(201,145,43,0.3)' }} />
                      ))}
                    </div>
                  )}

                  {key === 'governance' && (
                    <div className="space-y-2">
                      {[1, 2].map((j) => (
                        <div key={j} className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ border: '1px solid rgba(201,145,43,0.3)', backgroundColor: 'rgba(201,145,43,0.1)' }} />
                          <div className="h-2 rounded-full" style={{ width: '60%', backgroundColor: 'rgba(255,255,255,0.06)' }} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════
          CTA
          ════════════════════════════════════════════════════════ */}
      <div ref={ctaRef} className="px-4 md:px-6 py-20 md:py-28 text-center" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <Link
          href="/contatti"
          className="inline-flex items-center justify-center font-sans font-bold uppercase tracking-wider text-white transition-opacity hover:opacity-90"
          style={{
            fontSize: '13px',
            backgroundColor: '#C9912B',
            padding: '14px 32px',
            borderRadius: '8px',
            letterSpacing: '0.08em',
          }}
        >
          {t('cta')}
        </Link>
      </div>
    </section>
  )
}
