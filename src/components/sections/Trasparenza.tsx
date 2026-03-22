'use client'

import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { onIdle } from '@/lib/idle'
import { useTranslations } from 'next-intl'

const BLOCK_KEYS = ['fee', 'audit', 'nda', 'dichiarazione'] as const
const DETAIL_KEYS = ['d1', 'd2', 'd3', 'd4'] as const

function BlockIcon({ type }: { type: string }) {
  const cls = 'w-12 h-12 md:w-14 md:h-14 text-gold'
  switch (type) {
    case 'fee':
      return (
        <svg className={cls} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="24" cy="24" r="20" />
          <path d="M24 12v24M18 18c0-2.21 2.69-4 6-4s6 1.79 6 4-2.69 4-6 4-6 1.79-6 4 2.69 4 6 4 6-1.79 6-4" strokeLinecap="round" />
        </svg>
      )
    case 'audit':
      return (
        <svg className={cls} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="8" y="6" width="32" height="36" rx="3" />
          <path d="M16 16h16M16 24h16M16 32h10" strokeLinecap="round" />
          <circle cx="36" cy="36" r="8" fill="#0D1520" stroke="currentColor" strokeWidth="1.5" />
          <path d="M34 36l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'nda':
      return (
        <svg className={cls} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="10" y="4" width="28" height="36" rx="2" />
          <path d="M18 14h12M18 20h12M18 26h8" strokeLinecap="round" />
          <path d="M14 44l6-8h8l6 8" strokeLinejoin="round" />
          <path d="M24 36v-4" />
          <circle cx="24" cy="36" r="2" fill="currentColor" />
        </svg>
      )
    case 'dichiarazione':
      return (
        <svg className={cls} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M24 4L6 12v12c0 11.1 7.8 21.4 18 24 10.2-2.6 18-12.9 18-24V12L24 4z" />
          <path d="M24 16v8M24 28h.02" strokeLinecap="round" />
        </svg>
      )
    default:
      return null
  }
}

export function TrasparenzaPage() {
  const t = useTranslations('trasparenza')
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const blocksRef = useRef<HTMLDivElement>(null)

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
        if (blocksRef.current) {
          const blocks = blocksRef.current.querySelectorAll('.trasp-block')
          gsap.from(blocks, {
            y: 50, opacity: 0, duration: 0.7, stagger: 0.2, ease: 'power2.out',
            scrollTrigger: { trigger: blocksRef.current, start: 'top 80%', toggleActions: 'play none none none' },
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
          <h1 className="font-serif text-[28px] md:text-[44px] lg:text-[52px] font-semibold leading-[1.1] text-white mb-6">
            {t('headline')}
          </h1>
          <p className="font-sans text-[16px] md:text-[18px] font-light leading-[1.7] text-white/70 max-w-[750px] mx-auto mb-8">
            {t('subtitle')}
          </p>
          <div className="h-[1.5px] w-16 bg-gold mx-auto" />
        </div>

        {/* 4 Blocks */}
        <div ref={blocksRef} className="space-y-6">
          {BLOCK_KEYS.map((key, i) => {
            const isEven = i % 2 === 0
            return (
              <div
                key={key}
                className={`trasp-block flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 md:gap-12 p-8 md:p-10 lg:p-12 rounded-2xl border transition-all duration-300 ${
                  i === 0
                    ? 'bg-gold/[0.05] border-gold/[0.12]'
                    : 'bg-white/[0.03] border-white/[0.06]'
                }`}
              >
                {/* Icon + Title + Desc */}
                <div className="lg:w-1/2">
                  <div className="mb-5">
                    <BlockIcon type={key} />
                  </div>
                  <h2 className="font-serif text-[24px] md:text-[32px] font-semibold leading-[1.15] text-white mb-4">
                    {t(`blocks.${key}.title`)}
                  </h2>
                  <div className="h-[1.5px] w-10 bg-gold/40 mb-5" />
                  <p className="font-sans text-[15px] md:text-base font-light leading-[1.8] text-white/65">
                    {t(`blocks.${key}.desc`)}
                  </p>
                </div>

                {/* 4 Detail points */}
                <div className="lg:w-1/2 flex items-center">
                  <div className="space-y-3 w-full">
                    {DETAIL_KEYS.map((dk) => (
                      <div
                        key={dk}
                        className="flex items-start gap-3 p-4 rounded-lg bg-white/[0.03] border border-white/[0.05]"
                      >
                        <svg className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <p className="font-sans text-[13px] md:text-[14px] font-light leading-[1.6] text-white/70">
                          {t(`blocks.${key}.details.${dk}`)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
