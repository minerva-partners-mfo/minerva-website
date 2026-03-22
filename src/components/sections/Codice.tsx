'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { gsap } from '@/lib/gsap'
import { onIdle } from '@/lib/idle'
import { useTranslations } from 'next-intl'

const CARD_KEYS = ['etico', 'remunerativo', 'operativo'] as const
const POINT_KEYS = ['p1', 'p2', 'p3'] as const
const SANZIONE_KEYS = ['s1', 's2', 's3', 's4'] as const

const CARD_STYLES: Record<string, { border: string; accent: string; iconBg: string }> = {
  etico: { border: 'border-l-gold', accent: 'text-gold', iconBg: 'bg-gold/10 border-gold/20' },
  remunerativo: { border: 'border-l-white/30', accent: 'text-white/90', iconBg: 'bg-white/5 border-white/10' },
  operativo: { border: 'border-l-white/15', accent: 'text-white/70', iconBg: 'bg-white/[0.03] border-white/[0.08]' },
}

function CardIcon({ type }: { type: string }) {
  const cls = 'w-10 h-10 md:w-12 md:h-12'
  switch (type) {
    case 'etico':
      return (
        <svg className={`${cls} text-gold`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" />
          <path d="M12 8v4M12 16h.01" strokeLinecap="round" />
        </svg>
      )
    case 'remunerativo':
      return (
        <svg className={`${cls} text-white/80`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M3 3v18h18" /><path d="M7 17V9M11 17V5M15 17v-4M19 17v-8" strokeLinecap="round" />
        </svg>
      )
    case 'operativo':
      return (
        <svg className={`${cls} text-white/60`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 8l2 2 4-4M9 14l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    default:
      return null
  }
}

export function CodicePage() {
  const t = useTranslations('codice')
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const firmaRef = useRef<HTMLDivElement>(null)
  const sanzioniRef = useRef<HTMLDivElement>(null)

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
        if (cardsRef.current) {
          const cards = cardsRef.current.querySelectorAll('.codice-card')
          gsap.from(cards, {
            y: 50, opacity: 0, duration: 0.7, stagger: 0.2, ease: 'power2.out',
            scrollTrigger: { trigger: cardsRef.current, start: 'top 80%', toggleActions: 'play none none none' },
          })
        }
        if (firmaRef.current) {
          gsap.from(firmaRef.current, {
            scale: 0.95, opacity: 0, duration: 0.8, ease: 'power2.out',
            scrollTrigger: { trigger: firmaRef.current, start: 'top 85%', toggleActions: 'play none none none' },
          })
        }
        if (sanzioniRef.current) {
          const items = sanzioniRef.current.querySelectorAll('.sanzione-step')
          gsap.from(items, {
            y: 30, opacity: 0, duration: 0.5, stagger: 0.15, ease: 'power2.out',
            scrollTrigger: { trigger: sanzioniRef.current, start: 'top 85%', toggleActions: 'play none none none' },
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
          {/* Opening line */}
          <p className="font-sans text-[16px] md:text-[18px] text-gold italic mb-8">
            {t('opening')}
          </p>
          <span className="block font-sans text-[10px] md:text-[11px] font-semibold tracking-[0.25em] uppercase text-gold mb-4">
            {t('label')}
          </span>
          <h1 className="font-serif text-[28px] md:text-[44px] lg:text-[52px] font-semibold leading-[1.1] text-white mb-6">
            {t('headline')}
          </h1>
          <p className="font-sans text-[16px] md:text-[18px] font-light leading-[1.7] text-white/70 max-w-[800px] mx-auto mb-8">
            {t('subtitle')}
          </p>
          <div className="h-[1.5px] w-16 bg-gold mx-auto" />
        </div>
      </div>

      {/* 3 Code Cards */}
      <div className="px-4 md:px-6 pb-20 md:pb-28">
        <div ref={cardsRef} className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          {CARD_KEYS.map((key) => {
            const style = CARD_STYLES[key]
            return (
              <div
                key={key}
                className={`codice-card border-l-[3px] ${style.border} rounded-xl bg-white/[0.03] border border-white/[0.06] ${style.border} overflow-hidden`}
              >
                <div className="p-8 md:p-9">
                  {/* Icon */}
                  <div className="mb-6">
                    <CardIcon type={key} />
                  </div>

                  {/* Title */}
                  <h2 className={`font-serif text-[24px] md:text-[28px] font-semibold leading-[1.15] mb-3 ${style.accent}`}>
                    {t(`cards.${key}.title`)}
                  </h2>
                  <p className="font-sans text-[14px] font-light leading-[1.7] text-white/60 mb-8">
                    {t(`cards.${key}.intro`)}
                  </p>

                  {/* 3 Points */}
                  <div className="space-y-5">
                    {POINT_KEYS.map((pk) => (
                      <div key={pk}>
                        <h4 className="font-sans text-[13px] font-semibold text-white/90 mb-1">
                          {t(`cards.${key}.points.${pk}.title`)}
                        </h4>
                        <p className="font-sans text-[13px] font-light leading-[1.7] text-white/55">
                          {t(`cards.${key}.points.${pk}.desc`)}
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

      {/* "Tutti firmano" band */}
      <div className="px-4 md:px-6 pb-20 md:pb-28">
        <div ref={firmaRef} className="max-w-[1100px] mx-auto relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0">
            <Image src="/images/room.jpg" alt="" fill className="object-cover" quality={60} loading="lazy" />
            <div className="absolute inset-0 bg-navy-deep/85" />
          </div>
          <div className="relative z-10 py-16 md:py-20 px-8 md:px-16 text-center">
            <div className="h-[1.5px] w-10 bg-gold mx-auto mb-8" />
            <p className="font-serif text-[24px] md:text-[36px] lg:text-[42px] font-semibold leading-[1.15] text-gold">
              {t('firma')}
            </p>
          </div>
        </div>
      </div>

      {/* Sanctions Scale */}
      <div className="px-4 md:px-6 pb-24 md:pb-[140px]">
        <div className="max-w-[1000px] mx-auto">
          <span className="block font-sans text-[10px] md:text-[11px] font-semibold tracking-[0.25em] uppercase text-gold mb-3">
            {t('sanzioniLabel')}
          </span>
          <p className="font-sans text-[15px] md:text-base font-light leading-[1.8] text-white/65 mb-10">
            {t('sanzioniIntro')}
          </p>

          <div ref={sanzioniRef} className="relative pl-10 md:pl-14">
            {/* Vertical gradient line */}
            <div className="absolute left-[15px] md:left-[23px] top-0 bottom-0 w-px bg-gradient-to-b from-gold/20 via-gold/40 to-red-500/60" />

            {SANZIONE_KEYS.map((key, i) => {
              const severity = i / (SANZIONE_KEYS.length - 1) // 0 to 1
              const dotColor = severity < 0.5
                ? 'bg-gold/20 border-gold/40'
                : severity < 0.75
                  ? 'bg-gold/30 border-gold/50'
                  : 'bg-red-500/20 border-red-500/50'

              return (
                <div key={key} className="sanzione-step relative mb-8 last:mb-0">
                  {/* Dot */}
                  <div className={`absolute -left-10 md:-left-14 top-1 w-6 h-6 rounded-full border-2 flex items-center justify-center ${dotColor}`}>
                    <span className="font-sans text-[10px] font-bold text-white/70">{i + 1}</span>
                  </div>

                  <div className={`p-5 rounded-lg border transition-all duration-300 ${
                    i === SANZIONE_KEYS.length - 1
                      ? 'bg-red-500/[0.04] border-red-500/[0.15]'
                      : 'bg-white/[0.03] border-white/[0.06]'
                  }`}>
                    <h4 className={`font-serif text-[17px] md:text-[19px] font-semibold leading-[1.2] mb-2 ${
                      i === SANZIONE_KEYS.length - 1 ? 'text-red-400/80' : 'text-white/90'
                    }`}>
                      {t(`sanzioni.${key}.title`)}
                    </h4>
                    <p className="font-sans text-[13px] md:text-[14px] font-light leading-[1.7] text-white/60">
                      {t(`sanzioni.${key}.desc`)}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
