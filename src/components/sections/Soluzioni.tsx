'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { gsap } from '@/lib/gsap'
import { onIdle } from '@/lib/idle'
import { useTranslations } from 'next-intl'

/* ── Brick layout ── */
const BRICK_KEYS = [
  // Row 1 — Hub (gold)
  ['ma', 're'],
  ['st', 'wm'],
  // Row 2 — Partner (navy)
  ['legal', 'tax', 'banking', 'insurance'],
  ['energy', 'digital', 'international', 'uhnwi'],
  // Row 3 — Friends (grey) + On-demand (dashed)
  ['specialist', 'advisor', 'ondemand1', 'ondemand2'],
] as const

type BrickType = 'hub' | 'partner' | 'friends' | 'bisogno'

const TYPE_STYLES: Record<BrickType, { bg: string; border: string; hoverBorder: string }> = {
  hub: {
    bg: 'bg-gold/[0.12]',
    border: 'border-gold/30',
    hoverBorder: 'hover:border-gold/60',
  },
  partner: {
    bg: 'bg-navy/60',
    border: 'border-white/[0.12]',
    hoverBorder: 'hover:border-gold/40',
  },
  friends: {
    bg: 'bg-white/[0.06]',
    border: 'border-white/[0.1]',
    hoverBorder: 'hover:border-gold/30',
  },
  bisogno: {
    bg: 'bg-transparent',
    border: 'border-dashed border-white/[0.15]',
    hoverBorder: 'hover:border-gold/30',
  },
}

const LEGEND_KEYS: BrickType[] = ['hub', 'partner', 'friends', 'bisogno']

const LEGEND_DOT: Record<BrickType, string> = {
  hub: 'bg-gold/40 border-gold/60',
  partner: 'bg-navy border-white/20',
  friends: 'bg-white/10 border-white/20',
  bisogno: 'bg-transparent border-dashed border-white/30',
}

export function SoluzioniPage() {
  const t = useTranslations('soluzioni')
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const schemaRef = useRef<HTMLDivElement>(null)
  const clientRef = useRef<HTMLDivElement>(null)
  const [expanded, setExpanded] = useState<string | null>(null)

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
        if (schemaRef.current) {
          const bricks = schemaRef.current.querySelectorAll('.brick')
          gsap.from(bricks, {
            scale: 0.9, opacity: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out',
            scrollTrigger: { trigger: schemaRef.current, start: 'top 80%', toggleActions: 'play none none none' },
          })
        }
        if (clientRef.current) {
          gsap.from(clientRef.current, {
            y: 40, opacity: 0, duration: 0.8, ease: 'power2.out',
            scrollTrigger: { trigger: clientRef.current, start: 'top 85%', toggleActions: 'play none none none' },
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
        <Image src="/images/img2.png" alt="" fill className="object-cover" quality={80} priority />
        <div className="absolute inset-0 bg-navy-deep/60" />
        <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-b from-transparent to-[#0D1520]" />
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
          <p className="font-sans text-[16px] md:text-[18px] font-light leading-[1.7] text-white/70 max-w-[750px] mx-auto mb-8">
            {t('subtitle')}
          </p>
          <div className="h-[1.5px] w-16 bg-gold mx-auto" />
        </div>
      </div>

      {/* Brick Schema */}
      <div className="px-4 md:px-6 pb-20 md:pb-28">
        <div className="max-w-[1280px] mx-auto">

          {/* Legend */}
          <div className="flex flex-wrap gap-4 md:gap-6 mb-8">
            <span className="block w-full font-sans text-[10px] md:text-[11px] font-semibold tracking-[0.25em] uppercase text-gold mb-2">
              {t('schemaLabel')}
            </span>
            {LEGEND_KEYS.map((key) => (
              <div key={key} className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-sm border ${LEGEND_DOT[key]}`} />
                <span className="font-sans text-[12px] text-white/60">{t(`legend.${key}`)}</span>
              </div>
            ))}
          </div>

          {/* Bricks grid */}
          <div ref={schemaRef} className="space-y-3">
            {BRICK_KEYS.map((row, rowIdx) => {
              const isHubRow = rowIdx < 2
              return (
                <div
                  key={rowIdx}
                  className={`grid gap-3 ${
                    isHubRow
                      ? 'grid-cols-1 md:grid-cols-2'
                      : 'grid-cols-2 md:grid-cols-4'
                  }`}
                >
                  {row.map((key) => {
                    const brickType = t(`bricks.${key}.type`) as BrickType
                    const style = TYPE_STYLES[brickType] || TYPE_STYLES.bisogno
                    const isExpanded = expanded === key

                    return (
                      <button
                        key={key}
                        onClick={() => setExpanded(isExpanded ? null : key)}
                        className={`brick group relative text-left border rounded-lg transition-all duration-300 ${style.bg} ${style.border} ${style.hoverBorder} ${
                          isExpanded ? 'ring-1 ring-gold/40' : ''
                        } ${isHubRow ? 'p-6 md:p-8' : 'p-4 md:p-5'}`}
                      >
                        {/* Title */}
                        <h3 className={`font-serif font-semibold text-white leading-[1.2] mb-1 ${
                          isHubRow ? 'text-[18px] md:text-[22px]' : 'text-[14px] md:text-[16px]'
                        }`}>
                          {t(`bricks.${key}.title`)}
                        </h3>

                        {/* Tooltip on hover (desktop) — brief type label */}
                        <span className={`inline-block font-sans text-[10px] font-semibold tracking-wider uppercase ${
                          brickType === 'hub' ? 'text-gold/60' : 'text-white/50'
                        }`}>
                          {t(`legend.${brickType}`).split(':')[0].trim()}
                        </span>

                        {/* Expanded detail */}
                        <div className={`overflow-hidden transition-all duration-300 ${
                          isExpanded ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-0'
                        }`}>
                          <div className="h-px w-8 bg-gold/30 mb-3" />
                          <p className="font-sans text-[13px] md:text-[14px] font-light leading-[1.7] text-white/70">
                            {t(`bricks.${key}.desc`)}
                          </p>
                        </div>

                        {/* Expand indicator */}
                        <svg
                          className={`absolute top-4 right-4 w-4 h-4 text-white/40 transition-transform duration-300 ${
                            isExpanded ? 'rotate-45' : ''
                          }`}
                          viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"
                        >
                          <path d="M8 3v10M3 8h10" />
                        </svg>
                      </button>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Client Dual Role */}
      <div className="px-4 md:px-6 pb-24 md:pb-[140px]">
        <div ref={clientRef} className="max-w-[1280px] mx-auto">

          {/* Background image band */}
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0">
              <Image src="/images/img11.jpg" alt="" fill className="object-cover" quality={75} loading="lazy" />
              <div className="absolute inset-0 bg-navy-deep/80" />
            </div>

            <div className="relative z-10 p-8 md:p-12 lg:p-16">
              <span className="block font-sans text-[10px] md:text-[11px] font-semibold tracking-[0.25em] uppercase text-gold mb-4">
                {t('clientLabel')}
              </span>
              <h2 className="font-serif text-[24px] md:text-[36px] font-semibold leading-[1.15] text-white mb-6">
                {t('clientHeadline')}
              </h2>
              <div className="h-[1.5px] w-10 bg-gold/40 mb-6" />
              <p className="font-sans text-[15px] md:text-base font-light leading-[1.8] text-white/65 max-w-[900px] mb-10">
                {t('clientText')}
              </p>

              {/* Two role cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="p-6 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                  <div className="mb-4">
                    <svg className="w-8 h-8 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-[18px] md:text-[20px] font-semibold text-gold leading-[1.2] mb-3">
                    {t('clientRole1.title')}
                  </h3>
                  <p className="font-sans text-[14px] font-light leading-[1.7] text-white/65">
                    {t('clientRole1.desc')}
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-gold/[0.06] border border-gold/[0.15]">
                  <div className="mb-4">
                    <svg className="w-8 h-8 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-[18px] md:text-[20px] font-semibold text-gold leading-[1.2] mb-3">
                    {t('clientRole2.title')}
                  </h3>
                  <p className="font-sans text-[14px] font-light leading-[1.7] text-white/65">
                    {t('clientRole2.desc')}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
