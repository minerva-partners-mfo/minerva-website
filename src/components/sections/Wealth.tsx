'use client'

import { useRef, useEffect } from 'react'
import { Link } from '@/i18n/navigation'
import { gsap } from '@/lib/gsap'
import { onIdle } from '@/lib/idle'
import { useTranslations } from 'next-intl'

/* ── Constants ── */
const CYCLE_KEYS = ['exit', 'liquidita', 'wm', 'reinvestimento', 'opportunita', 'crescita'] as const
const CYCLE_ANGLES = [270, 330, 30, 90, 150, 210] // 12h, 2h, 4h, 6h, 8h, 10h

const TRAD_KEYS = ['t1', 't2', 't3', 't4', 't5'] as const
const MINERVA_KEYS = ['m1', 'm2', 'm3', 'm4', 'm5'] as const

const CAP_KEYS = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'] as const
const STAT_KEYS = ['s1', 's2', 's3'] as const

export function WealthPage() {
  const t = useTranslations('wealth')

  const sectionRef = useRef<HTMLElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const cycleRef = useRef<HTMLDivElement>(null)
  const compRef = useRef<HTMLDivElement>(null)
  const capsRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
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

        if (cycleRef.current) {
          gsap.from(cycleRef.current.querySelectorAll('.cycle-seg'), {
            scale: 0, opacity: 0, duration: 0.5, stagger: 0.2, ease: 'back.out(1.7)',
            scrollTrigger: { trigger: cycleRef.current, start: 'top 80%', toggleActions: 'play none none none' },
          })
        }

        if (compRef.current) {
          gsap.from(compRef.current.querySelectorAll('.comp-anim'), {
            y: 30, opacity: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out',
            scrollTrigger: { trigger: compRef.current, start: 'top 85%', toggleActions: 'play none none none' },
          })
        }

        if (capsRef.current) {
          gsap.from(capsRef.current.querySelectorAll('.cap-card'), {
            y: 30, opacity: 0, duration: 0.5, stagger: 0.12, ease: 'power2.out',
            scrollTrigger: { trigger: capsRef.current, start: 'top 85%', toggleActions: 'play none none none' },
          })
        }

        if (statsRef.current) {
          gsap.from(statsRef.current.querySelectorAll('.stat-item'), {
            y: 30, opacity: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out',
            scrollTrigger: { trigger: statsRef.current, start: 'top 85%', toggleActions: 'play none none none' },
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
      <div ref={heroRef} className="relative min-h-[70vh] flex items-center justify-center px-4 md:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/tavolo.png')" }} />
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(13,21,32,0.78)' }} />
        <div className="absolute inset-x-0 bottom-0 h-[140px] bg-gradient-to-t from-[#0D1520] to-transparent" />
        <div className="relative z-10 max-w-[820px] mx-auto text-center py-24 md:py-32">
          <h1
            className="hero-anim font-serif font-semibold text-white leading-tight"
            style={{ fontSize: 'clamp(32px, 5vw, 48px)' }}
          >
            {t('headline1')}
          </h1>
          <h1
            className="hero-anim font-serif font-bold leading-tight mb-6"
            style={{ fontSize: 'clamp(32px, 5vw, 48px)', color: '#C9912B' }}
          >
            {t('headline2')}
          </h1>
          <p
            className="hero-anim font-sans font-light mx-auto"
            style={{ fontSize: '17px', color: 'rgba(255,255,255,0.55)', maxWidth: '650px', lineHeight: '1.7' }}
          >
            {t('subtitle')}
          </p>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════
          BLOCCO 1 — IL CICLO
          ════════════════════════════════════════════════════════ */}
      <div className="px-4 md:px-6 py-20 md:py-28" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="max-w-[500px] mx-auto">
          <div ref={cycleRef} className="relative" style={{ width: '100%', paddingBottom: '100%' }}>
            {/* Center label */}
            <div
              className="cycle-seg absolute font-sans font-bold text-center"
              style={{
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: '13px', color: '#C9912B',
                maxWidth: '120px',
              }}
            >
              {t('cycle.center')}
            </div>

            {/* 6 Segments */}
            {CYCLE_KEYS.map((key, i) => {
              const angle = CYCLE_ANGLES[i]
              const rad = (angle * Math.PI) / 180
              const radius = 38 // % of container
              const cx = 50 + radius * Math.cos(rad)
              const cy = 50 + radius * Math.sin(rad)

              return (
                <div
                  key={key}
                  className="cycle-seg absolute flex items-center justify-center text-center"
                  style={{
                    left: `${cx}%`, top: `${cy}%`,
                    transform: 'translate(-50%, -50%)',
                    width: '72px', height: '72px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(201,145,43,0.08)',
                    border: '1px solid rgba(201,145,43,0.25)',
                  }}
                >
                  <span className="font-sans font-bold" style={{ fontSize: '9px', color: '#C9912B', letterSpacing: '0.04em', lineHeight: '1.2' }}>
                    {t(`cycle.${key}`)}
                  </span>
                </div>
              )
            })}

            {/* Arrows SVG overlay */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 400 400"
              fill="none"
            >
              {CYCLE_KEYS.map((_, i) => {
                const a1 = CYCLE_ANGLES[i]
                const a2 = CYCLE_ANGLES[(i + 1) % 6]
                const r = 152
                const cx = 200
                const cy = 200

                const rad1 = ((a1 + 18) * Math.PI) / 180
                const rad2 = ((a2 - 18) * Math.PI) / 180
                const x1 = cx + r * Math.cos(rad1)
                const y1 = cy + r * Math.sin(rad1)
                const x2 = cx + r * Math.cos(rad2)
                const y2 = cy + r * Math.sin(rad2)

                return (
                  <path
                    key={`arc-${i}`}
                    d={`M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`}
                    stroke="#C9912B"
                    strokeWidth="1"
                    opacity="0.3"
                  />
                )
              })}
            </svg>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════
          BLOCCO 2 — CONFRONTO WM TRADIZIONALE vs MINERVA
          ════════════════════════════════════════════════════════ */}
      <div className="px-4 md:px-6 py-20 md:py-28" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div ref={compRef} className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* WM Tradizionale */}
          <div
            className="comp-anim rounded-xl"
            style={{
              backgroundColor: 'rgba(231,76,60,0.04)',
              border: '1px solid rgba(231,76,60,0.12)',
              padding: '32px',
            }}
          >
            <h3 className="font-sans font-bold uppercase tracking-wider mb-5" style={{ fontSize: '13px', color: 'rgba(231,76,60,0.7)' }}>
              {t('compare.trad.title')}
            </h3>
            <ul className="space-y-3">
              {TRAD_KEYS.map((key) => (
                <li key={key} className="flex items-start gap-3">
                  <span className="block mt-1.5 shrink-0" style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'rgba(231,76,60,0.3)' }} />
                  <span className="font-sans font-light" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', lineHeight: '1.6' }}>
                    {t(`compare.trad.items.${key}`)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* WM Minerva */}
          <div
            className="comp-anim rounded-xl"
            style={{
              backgroundColor: 'rgba(201,145,43,0.06)',
              border: '1px solid rgba(201,145,43,0.15)',
              padding: '32px',
            }}
          >
            <h3 className="font-sans font-bold uppercase tracking-wider mb-5" style={{ fontSize: '13px', color: '#C9912B' }}>
              {t('compare.minerva.title')}
            </h3>
            <ul className="space-y-3">
              {MINERVA_KEYS.map((key) => (
                <li key={key} className="flex items-start gap-3">
                  <span className="block mt-1.5 shrink-0" style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'rgba(201,145,43,0.5)' }} />
                  <span className="font-sans font-light" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.65)', lineHeight: '1.6' }}>
                    {t(`compare.minerva.items.${key}`)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════
          BLOCCO 3 — 6 CAPABILITY
          ════════════════════════════════════════════════════════ */}
      <div className="px-4 md:px-6 py-20 md:py-28" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div ref={capsRef} className="max-w-[1100px] mx-auto">
          <h2 className="font-serif font-semibold text-white mb-12" style={{ fontSize: '28px' }}>
            {t('capsTitle')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CAP_KEYS.map((key, i) => (
              <div
                key={key}
                className="cap-card"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(201,145,43,0.12)',
                  padding: '24px',
                  borderRadius: '12px',
                }}
              >
                <div
                  className="flex items-center justify-center rounded-full mb-3"
                  style={{ width: '32px', height: '32px', border: '1.5px solid #C9912B' }}
                >
                  <span className="font-sans font-bold" style={{ fontSize: '13px', color: '#C9912B' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="font-serif font-semibold text-white mb-2" style={{ fontSize: '18px' }}>
                  {t(`caps.${key}.title`)}
                </h3>
                <p className="font-sans font-light" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', lineHeight: '1.6' }}>
                  {t(`caps.${key}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════
          BLOCCO 4 — I NUMERI
          ════════════════════════════════════════════════════════ */}
      <div className="px-4 md:px-6 py-20 md:py-28" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div ref={statsRef} className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {STAT_KEYS.map((key) => (
            <div key={key} className="stat-item text-center">
              <span className="block font-serif font-bold mb-2" style={{ fontSize: '48px', color: '#C9912B', lineHeight: '1' }}>
                {t(`stats.${key}.num`)}
              </span>
              <p className="font-sans font-light mb-1" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)' }}>
                {t(`stats.${key}.desc`)}
              </p>
              <span className="font-sans" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)' }}>
                {t(`stats.${key}.source`)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════
          BLOCCO 5 — QUOTE + CTA
          ════════════════════════════════════════════════════════ */}
      <div ref={ctaRef} className="px-4 md:px-6 py-20 md:py-28 text-center" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <p
          className="font-serif italic text-white mx-auto mb-10"
          style={{ fontSize: 'clamp(18px, 3vw, 24px)', maxWidth: '700px', lineHeight: '1.5' }}
        >
          {t('quote')}
        </p>
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
