'use client'

import { useRef, useEffect } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { onIdle } from '@/lib/idle'
import { useTranslations } from 'next-intl'

/* ═══════════════════════════════════════════
   Counter config — full numbers, never abbreviated
   ═══════════════════════════════════════════ */

interface Counter {
  key: string
  value: number | null
  prefix: string
  suffix: string
  unit: string
  decimals: number
  labelPrefix?: string
  staticText?: string
  hasSub?: boolean
}

const COUNTERS: Counter[] = [
  { key: 'ricchezza', value: 11286, prefix: '€', suffix: '', unit: 'miliardi', decimals: 0, hasSub: true },
  { key: 'eredi', value: 81, prefix: '', suffix: '%', unit: '', decimals: 0 },
  { key: 'generazionale', value: 70, prefix: '', suffix: '%', unit: '', decimals: 0 },
  { key: 'successione', value: 18, prefix: '', suffix: '%', unit: '', decimals: 0, labelPrefix: 'Solo il ' },
  { key: 'professionisti', value: null, prefix: '', suffix: '', unit: '', decimals: 0, staticText: '5-7 professionisti' },
  { key: 'privatebanking', value: 1371, prefix: '€', suffix: '', unit: 'miliardi', decimals: 0 },
]

function formatNumber(val: number, decimals: number): string {
  if (decimals > 0) {
    const [int, dec] = val.toFixed(decimals).split('.')
    return `${int},${dec}`
  }
  // Dot as thousands separator (Italian style)
  return Math.round(val)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

export function PercheMinerva() {
  const t = useTranslations('percheMinerva')
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([])
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const closingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    let ctx: ReturnType<typeof gsap.context> | undefined
    const cancelIdle = onIdle(() => {
      if (!sectionRef.current) return
      ctx = gsap.context(() => {
      // Headline fadeUp
      if (headlineRef.current) {
        gsap.from(headlineRef.current, {
          y: 40, opacity: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        })
      }

      // Counter cards stagger + count-up
      COUNTERS.forEach((counter, i) => {
        const card = cardRefs.current[i]
        const el = counterRefs.current[i]
        if (!card || !el) return

        // Card fadeUp
        gsap.from(card, {
          y: 30, opacity: 0, duration: 0.6, ease: 'power2.out',
          delay: i * 0.2,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        })

        // Static text counters don't animate
        if (counter.staticText) return

        // Number count-up
        const obj = { val: 0 }
        gsap.to(obj, {
          val: counter.value!,
          duration: 2.5,
          ease: 'power1.out',
          delay: i * 0.2,
          onUpdate: () => {
            if (!el) return
            const formatted = formatNumber(obj.val, counter.decimals)
            const parts = [
              counter.labelPrefix || '',
              counter.prefix,
              formatted,
              counter.suffix,
            ].filter(Boolean).join('')
            el.textContent = counter.unit ? `${parts} ${counter.unit}` : parts
          },
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        })
      })

      // Closing fadeUp
      if (closingRef.current) {
        gsap.from(closingRef.current, {
          y: 40, opacity: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: {
            trigger: closingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
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
    <section
      ref={sectionRef}
      className="relative bg-navy-deep py-24 md:py-[140px] px-4 md:px-6 overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto">

        {/* ── Headline ── */}
        <div ref={headlineRef} className="text-center mb-16 md:mb-20">
          <span className="block font-sans text-[10px] md:text-[11px] font-semibold tracking-[0.25em] uppercase text-gold mb-4">
            {t('label')}
          </span>
          <h2 className="font-serif text-[28px] md:text-[48px] font-semibold leading-[1.15] text-white mb-6">
            {t('headline')}
          </h2>
          <div className="h-[1.5px] w-16 bg-gold mx-auto mb-8" />
          <p className="font-sans text-base md:text-lg font-light leading-[1.8] text-white/65 max-w-[900px] mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* ── Counter Grid 2×3 ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20 md:mb-28">
          {COUNTERS.map((counter, i) => (
            <div
              key={counter.key}
              ref={(el) => { cardRefs.current[i] = el }}
              className="relative p-6 md:p-8 rounded-[16px] border border-white/[0.06] bg-white/[0.02]"
            >
              {/* Number */}
              <span
                ref={(el) => { counterRefs.current[i] = el }}
                className="block font-serif text-[36px] md:text-[44px] font-bold leading-none text-gold mb-4"
              >
                {counter.staticText ?? `${counter.labelPrefix ?? ''}${counter.prefix}0${counter.suffix}`}
              </span>
              {/* Description */}
              <p className="font-sans text-[13px] md:text-sm text-white/70 leading-[1.6] mb-2">
                {t(`counters.${counter.key}.desc`)}
              </p>
              {/* Sub detail (optional) */}
              {counter.hasSub && (
                <p className="font-sans text-[12px] md:text-[13px] text-white/45 leading-[1.5] mb-3 italic">
                  {t(`counters.${counter.key}.sub`)}
                </p>
              )}
              {/* Source */}
              <span className="block font-sans text-[11px] text-white/30 italic">
                {t(`counters.${counter.key}.source`)}
              </span>
            </div>
          ))}
        </div>

        {/* ── Closing ── */}
        <div
          ref={closingRef}
          className="text-center border-t border-b border-gold/10 py-12 md:py-16 max-w-[1000px] mx-auto"
        >
          <p className="font-serif text-[20px] md:text-[24px] font-semibold leading-[1.4] text-gold italic">
            {t('closing')}
          </p>
        </div>

      </div>
    </section>
  )
}
