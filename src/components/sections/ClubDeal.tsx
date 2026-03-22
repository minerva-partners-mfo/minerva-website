'use client'

import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { onIdle } from '@/lib/idle'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

const STEP_KEYS = ['s1', 's2', 's3', 's4', 's5'] as const
const VANTAGGIO_KEYS = ['v1', 'v2', 'v3', 'v4', 'v5', 'v6'] as const

export function ClubDealPage() {
  const t = useTranslations('clubDeal')
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)
  const vantaggiRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

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
        if (stepsRef.current) {
          const steps = stepsRef.current.querySelectorAll('.cd-step')
          gsap.from(steps, {
            y: 30, opacity: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out',
            scrollTrigger: { trigger: stepsRef.current, start: 'top 85%', toggleActions: 'play none none none' },
          })
        }
        if (vantaggiRef.current) {
          const items = vantaggiRef.current.querySelectorAll('.cd-vantaggio')
          gsap.from(items, {
            y: 20, opacity: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out',
            scrollTrigger: { trigger: vantaggiRef.current, start: 'top 85%', toggleActions: 'play none none none' },
          })
        }
        if (ctaRef.current) {
          gsap.from(ctaRef.current, {
            y: 30, opacity: 0, duration: 0.8, ease: 'power2.out',
            scrollTrigger: { trigger: ctaRef.current, start: 'top 85%', toggleActions: 'play none none none' },
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
      className="relative bg-navy-deep min-h-screen pt-28 md:pt-36 pb-24 md:pb-[140px] px-4 md:px-6"
    >
      <div className="max-w-[1280px] mx-auto">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 md:mb-24">
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

        {/* Intro */}
        <div className="max-w-[900px] mx-auto mb-20 md:mb-28">
          <p className="font-sans text-[15px] md:text-base font-light leading-[1.8] text-white/65">
            {t('intro')}
          </p>
        </div>

        {/* Process steps */}
        <div className="mb-20 md:mb-28">
          <span className="block font-sans text-[10px] md:text-[11px] font-semibold tracking-[0.25em] uppercase text-gold mb-10">
            {t('processLabel')}
          </span>

          <div ref={stepsRef} className="relative pl-10 md:pl-14">
            <div className="absolute left-[15px] md:left-[23px] top-0 bottom-0 w-px bg-gradient-to-b from-gold/20 via-gold/40 to-gold/20" />

            {STEP_KEYS.map((key, i) => (
              <div key={key} className="cd-step relative mb-8 last:mb-0">
                <div className="absolute -left-10 md:-left-14 top-1 w-6 h-6 rounded-full border-2 bg-gold/10 border-gold/40 flex items-center justify-center">
                  <span className="font-sans text-[10px] font-bold text-gold">{i + 1}</span>
                </div>
                <div className="p-5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                  <h3 className="font-serif text-[17px] md:text-[19px] font-semibold text-white/90 leading-[1.2] mb-2">
                    {t(`steps.${key}.title`)}
                  </h3>
                  <p className="font-sans text-[13px] md:text-[14px] font-light leading-[1.7] text-white/60">
                    {t(`steps.${key}.desc`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vantaggi */}
        <div className="mb-20 md:mb-28">
          <span className="block font-sans text-[10px] md:text-[11px] font-semibold tracking-[0.25em] uppercase text-gold mb-8">
            {t('vantaggiLabel')}
          </span>

          <div ref={vantaggiRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {VANTAGGIO_KEYS.map((key) => (
              <div
                key={key}
                className="cd-vantaggio flex items-start gap-3 p-5 rounded-lg bg-white/[0.03] border border-white/[0.06]"
              >
                <span className="w-2 h-2 rounded-full bg-gold/50 mt-1.5 shrink-0" />
                <p className="font-sans text-[14px] font-light leading-[1.6] text-white/70">
                  {t(`vantaggi.${key}`)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="text-center">
          <p className="font-serif text-[20px] md:text-[24px] font-semibold leading-[1.4] text-gold italic mb-8">
            {t('closing')}
          </p>
          <Link
            href="/contatti"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-navy-deep font-sans text-[11px] font-bold tracking-[0.2em] uppercase rounded-full hover:bg-gold-light hover:shadow-[0_0_20px_rgba(201,145,43,0.3)] transition-all duration-300"
          >
            {t('cta')}
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  )
}
