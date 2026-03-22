'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { gsap } from '@/lib/gsap'
import { onIdle } from '@/lib/idle'
import { useTranslations } from 'next-intl'

const CRITERI_KEYS = ['c1', 'c2', 'c3', 'c4', 'c5'] as const
const FUNNEL_KEYS = ['s1', 's2', 's3', 's4'] as const

function CriterioIcon({ index }: { index: number }) {
  const cls = 'w-8 h-8 text-gold'
  switch (index) {
    case 0: // Track record
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><path d="M22 4L12 14.01l-3-3" strokeLinecap="round" strokeLinejoin="round" /></svg>)
    case 1: // Integrità
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>)
    case 2: // Complementarità
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>)
    case 3: // Allineamento
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /></svg>)
    case 4: // Contribuire
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>)
    default:
      return null
  }
}

export function SelezionePage() {
  const t = useTranslations('selezione')
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const criteriRef = useRef<HTMLDivElement>(null)
  const funnelRef = useRef<HTMLDivElement>(null)
  const exitRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    let ctx: ReturnType<typeof gsap.context> | undefined
    const cancelIdle = onIdle(() => {
      if (!sectionRef.current) return
      ctx = gsap.context(() => {
        if (headerRef.current) {
          gsap.from(headerRef.current, {
            y: 40, opacity: 0, duration: 0.8, ease: 'power2.out',
            scrollTrigger: { trigger: headerRef.current, start: 'top 85%', toggleActions: 'play none none none' },
          })
        }
        if (criteriRef.current) {
          const cards = criteriRef.current.querySelectorAll('.criterio-card')
          gsap.from(cards, {
            y: 40, opacity: 0, rotation: (i: number) => (i - 2) * 2,
            duration: 0.6, stagger: 0.12, ease: 'power2.out',
            scrollTrigger: { trigger: criteriRef.current, start: 'top 80%', toggleActions: 'play none none none' },
          })
        }
        if (funnelRef.current) {
          const steps = funnelRef.current.querySelectorAll('.funnel-step')
          gsap.from(steps, {
            y: 30, opacity: 0, duration: 0.6, stagger: 0.2, ease: 'power2.out',
            scrollTrigger: { trigger: funnelRef.current, start: 'top 85%', toggleActions: 'play none none none' },
          })
          const line = funnelRef.current.querySelector('.funnel-line')
          if (line) {
            gsap.from(line, {
              scaleY: 0, duration: 1.2, ease: 'power2.inOut', transformOrigin: 'top center',
              scrollTrigger: { trigger: funnelRef.current, start: 'top 85%', toggleActions: 'play none none none' },
            })
          }
        }
        if (exitRef.current) {
          gsap.from(exitRef.current, {
            scale: 0.95, opacity: 0, duration: 0.8, ease: 'power2.out',
            scrollTrigger: { trigger: exitRef.current, start: 'top 85%', toggleActions: 'play none none none' },
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
    <section ref={sectionRef} className="relative bg-navy-deep min-h-screen">

      {/* Hero image */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <Image src="/images/img1.png" alt="" fill className="object-cover" quality={80} priority />
        <div className="absolute inset-0 bg-navy-deep/60" />
      </div>

      {/* Header */}
      <div className="px-4 md:px-6 -mt-20 md:-mt-28 relative z-10">
        <div ref={headerRef} className="max-w-[1100px] mx-auto text-center mb-16 md:mb-24">
          <span className="block font-sans text-[10px] md:text-[11px] font-semibold tracking-[0.25em] uppercase text-gold mb-4">
            {t('label')}
          </span>
          <h1 className="font-serif text-[28px] md:text-[44px] lg:text-[52px] font-semibold leading-[1.1] text-white mb-6">
            {t('headline')}
          </h1>
          <p className="font-sans text-[16px] md:text-[18px] font-light leading-[1.7] text-white/70 max-w-[780px] mx-auto mb-8">
            {t('subtitle')}
          </p>
          <div className="h-[1.5px] w-16 bg-gold mx-auto" />
        </div>
      </div>

      {/* ── 5 Criteria Cards (arc layout) ── */}
      <div className="px-4 md:px-6 pb-24 md:pb-32">
        <div className="max-w-[1280px] mx-auto">
          <span className="block font-sans text-[10px] md:text-[11px] font-semibold tracking-[0.25em] uppercase text-gold mb-10">
            {t('criteriLabel')}
          </span>

          <div ref={criteriRef} className="flex flex-col md:flex-row md:items-end gap-4 md:gap-5">
            {CRITERI_KEYS.map((key, i) => {
              // Arc effect: middle card tallest, edges shorter
              const arcOffset = Math.abs(i - 2)
              const extraPad = arcOffset === 0 ? 'md:pb-12' : arcOffset === 1 ? 'md:pb-6' : 'md:pb-0'

              return (
                <div
                  key={key}
                  className={`criterio-card flex-1 p-6 md:p-7 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-gold/25 transition-all duration-300 ${extraPad}`}
                >
                  <div className="mb-4">
                    <CriterioIcon index={i} />
                  </div>
                  <h3 className="font-serif text-[17px] md:text-[19px] font-semibold text-white leading-[1.2] mb-3">
                    {t(`criteri.${key}.title`)}
                  </h3>
                  <p className="font-sans text-[13px] font-light leading-[1.7] text-white/60">
                    {t(`criteri.${key}.desc`)}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Vertical Funnel ── */}
      <div className="px-4 md:px-6 pb-24 md:pb-32">
        <div className="max-w-[750px] mx-auto">
          <span className="block font-sans text-[10px] md:text-[11px] font-semibold tracking-[0.25em] uppercase text-gold mb-10">
            {t('funnelLabel')}
          </span>

          <div ref={funnelRef} className="relative">
            {/* Vertical line */}
            <div className="funnel-line absolute left-[19px] top-0 bottom-0 w-px bg-gold/25" />

            {FUNNEL_KEYS.map((key, i) => {
              // Funnel narrowing: progressively narrower width
              const width = ['w-full', 'w-[92%]', 'w-[84%]', 'w-[76%]'][i]

              return (
                <div key={key} className={`funnel-step relative pl-12 mb-8 last:mb-0 ${width}`}>
                  {/* Node */}
                  <div className="absolute left-0 top-2 w-10 h-10 rounded-full bg-gold/10 border-2 border-gold/30 flex items-center justify-center">
                    <span className="font-sans text-[13px] font-bold text-gold">{i + 1}</span>
                  </div>

                  <div className="p-6 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <h4 className="font-serif text-[18px] md:text-[20px] font-semibold text-white mb-2">
                      {t(`funnel.${key}.title`)}
                    </h4>
                    <p className="font-sans text-[14px] font-light leading-[1.7] text-white/65">
                      {t(`funnel.${key}.desc`)}
                    </p>
                  </div>

                  {/* Arrow between steps */}
                  {i < FUNNEL_KEYS.length - 1 && (
                    <div className="absolute left-[15px] -bottom-5">
                      <svg className="w-3 h-5 text-gold/30" viewBox="0 0 12 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M6 0v16M2 12l4 5 4-5" />
                      </svg>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── "Chi non contribuisce, esce." ── */}
      <div className="px-4 md:px-6 pb-24 md:pb-[140px]">
        <div ref={exitRef} className="max-w-[1000px] mx-auto p-10 md:p-14 rounded-2xl bg-red-500/[0.04] border border-red-500/[0.12] text-center">
          <div className="h-[1.5px] w-10 bg-gold mx-auto mb-8" />
          <p className="font-serif text-[24px] md:text-[36px] lg:text-[42px] font-semibold leading-[1.15] text-white mb-6">
            {t('exitHeadline')}
          </p>
          <p className="font-sans text-[15px] md:text-base font-light leading-[1.8] text-white/60 max-w-[700px] mx-auto">
            {t('exitText')}
          </p>
        </div>
      </div>
    </section>
  )
}
