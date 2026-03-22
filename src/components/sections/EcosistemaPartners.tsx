'use client'

import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { onIdle } from '@/lib/idle'
import { useTranslations } from 'next-intl'

const CATEGORIES = [
  { key: 'legal', icon: 'scale' },
  { key: 'tax', icon: 'calculator' },
  { key: 'banking', icon: 'bank' },
  { key: 'insurance', icon: 'shield' },
  { key: 'energy', icon: 'bolt' },
  { key: 'digital', icon: 'chip' },
  { key: 'international', icon: 'globe' },
  { key: 'uhnwi', icon: 'diamond' },
] as const

const WHY_KEYS = ['p1', 'p2', 'p3', 'p4', 'p5'] as const

function CatIcon({ type }: { type: string }) {
  const cls = 'w-8 h-8 text-gold'
  switch (type) {
    case 'scale':
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M12 3v18M3 7l4.5 9h9L21 7" /><circle cx="7.5" cy="16" r="2.5" /><circle cx="16.5" cy="16" r="2.5" /></svg>)
    case 'calculator':
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="4" y="2" width="16" height="20" rx="2" /><path d="M8 6h8M8 10h2M14 10h2M8 14h2M14 14h2M8 18h2M14 18h2" /></svg>)
    case 'bank':
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M3 21h18M3 10h18M12 3l9 7H3l9-7zM5 10v8M9 10v8M15 10v8M19 10v8" /></svg>)
    case 'shield':
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" /><path d="M9 12l2 2 4-4" /></svg>)
    case 'bolt':
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>)
    case 'chip':
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="6" y="6" width="12" height="12" rx="1" /><path d="M9 1v5M15 1v5M9 18v5M15 18v5M1 9h5M1 15h5M18 9h5M18 15h5" /></svg>)
    case 'globe':
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><circle cx="12" cy="12" r="10" /><ellipse cx="12" cy="12" rx="4" ry="10" /><path d="M2 12h20" /></svg>)
    case 'diamond':
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M6 3h12l4 7-10 12L2 10l4-7zM2 10h20M12 22l4-12M12 22l-4-12M8 3l-2 7M16 3l2 7" /></svg>)
    default:
      return null
  }
}

export function EcosistemaPartnersPage() {
  const t = useTranslations('ecosistemaPartners')
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const whyRef = useRef<HTMLDivElement>(null)
  const slaRef = useRef<HTMLDivElement>(null)

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
        if (gridRef.current) {
          const cards = gridRef.current.querySelectorAll('.partner-cat')
          gsap.from(cards, {
            y: 30, opacity: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out',
            scrollTrigger: { trigger: gridRef.current, start: 'top 85%', toggleActions: 'play none none none' },
          })
        }
        if (whyRef.current) {
          gsap.from(whyRef.current, {
            y: 40, opacity: 0, duration: 0.8, ease: 'power2.out',
            scrollTrigger: { trigger: whyRef.current, start: 'top 85%', toggleActions: 'play none none none' },
          })
        }
        if (slaRef.current) {
          gsap.from(slaRef.current, {
            y: 40, opacity: 0, duration: 0.8, ease: 'power2.out',
            scrollTrigger: { trigger: slaRef.current, start: 'top 85%', toggleActions: 'play none none none' },
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
    <section ref={sectionRef} className="relative bg-navy-deep min-h-screen pt-28 md:pt-36 pb-24 md:pb-[140px] px-4 md:px-6">
      <div className="max-w-[1280px] mx-auto">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 md:mb-24">
          <span className="block font-sans text-[10px] md:text-[11px] font-semibold tracking-[0.25em] uppercase text-gold mb-4">
            {t('label')}
          </span>
          <h1 className="font-serif text-[32px] md:text-[48px] font-semibold leading-[1.15] text-white mb-6">
            {t('headline')}
          </h1>
          <p className="font-sans text-[16px] md:text-[18px] font-light leading-[1.7] text-white/70 max-w-[700px] mx-auto mb-8">
            {t('subtitle')}
          </p>
          <div className="h-[1.5px] w-16 bg-gold mx-auto" />
        </div>

        {/* 8 Category Cards */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20 md:mb-28">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.key}
              className="partner-cat p-6 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-gold/20 transition-all duration-300"
            >
              <div className="mb-4">
                <CatIcon type={cat.icon} />
              </div>
              <h3 className="font-serif text-[17px] font-semibold text-white leading-[1.2] mb-2">
                {t(`categories.${cat.key}.title`)}
              </h3>
              <p className="font-sans text-[13px] font-light leading-[1.6] text-white/60">
                {t(`categories.${cat.key}.desc`)}
              </p>
            </div>
          ))}
        </div>

        {/* Why become a Partner */}
        <div ref={whyRef} className="mb-20 md:mb-28">
          <span className="block font-sans text-[10px] md:text-[11px] font-semibold tracking-[0.25em] uppercase text-gold mb-8">
            {t('whyLabel')}
          </span>
          <div className="space-y-4">
            {WHY_KEYS.map((key, i) => (
              <div
                key={key}
                className="flex items-start gap-4 p-5 rounded-lg bg-white/[0.03] border border-white/[0.06]"
              >
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center font-sans text-[13px] font-semibold text-gold">
                  {i + 1}
                </span>
                <p className="font-sans text-[15px] font-light leading-[1.7] text-white/80 pt-1">
                  {t(`why.${key}`)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* SLA & Scorecard */}
        <div ref={slaRef} className="p-8 md:p-10 rounded-xl bg-gold/[0.06] border border-gold/[0.15]">
          <span className="block font-sans text-[10px] md:text-[11px] font-semibold tracking-[0.25em] uppercase text-gold mb-4">
            {t('slaLabel')}
          </span>
          <p className="font-sans text-[15px] md:text-base font-light leading-[1.8] text-white/70">
            {t('sla')}
          </p>
        </div>

      </div>
    </section>
  )
}
