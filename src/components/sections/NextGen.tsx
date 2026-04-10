'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { gsap } from '@/lib/gsap'
import { onIdle } from '@/lib/idle'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

const BENEFICI_KEYS = ['b1', 'b2', 'b3', 'b4', 'b5', 'b6'] as const
const LIVELLI_KEYS = ['intro', 'develop', 'accelerate'] as const
const EXIT_KEYS = ['s1', 's2', 's3'] as const
const DEEP_KEYS = ['d1', 'd2', 'd3'] as const

export function NextGenPage() {
  const t = useTranslations('nextGen')
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const dualRef = useRef<HTMLDivElement>(null)
  const quoteRef = useRef<HTMLDivElement>(null)
  const beneficiRef = useRef<HTMLDivElement>(null)
  const livelliRef = useRef<HTMLDivElement>(null)
  const exitRef = useRef<HTMLDivElement>(null)
  const deepRef = useRef<HTMLDivElement>(null)
  const partnerRef = useRef<HTMLDivElement>(null)

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
        if (dualRef.current) {
          const cols = dualRef.current.querySelectorAll('.dual-col')
          gsap.from(cols, {
            y: 40, opacity: 0, duration: 0.7, stagger: 0.2, ease: 'power2.out',
            scrollTrigger: { trigger: dualRef.current, start: 'top 85%', toggleActions: 'play none none none' },
          })
        }
        if (quoteRef.current) {
          gsap.from(quoteRef.current, {
            opacity: 0, duration: 1, ease: 'power2.out',
            scrollTrigger: { trigger: quoteRef.current, start: 'top 90%', toggleActions: 'play none none none' },
          })
        }
        if (beneficiRef.current) {
          const cards = beneficiRef.current.querySelectorAll('.beneficio-card')
          gsap.from(cards, {
            y: 30, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out',
            scrollTrigger: { trigger: beneficiRef.current, start: 'top 85%', toggleActions: 'play none none none' },
          })
        }
        if (livelliRef.current) {
          const steps = livelliRef.current.querySelectorAll('.livello-step')
          gsap.from(steps, {
            x: -40, opacity: 0, duration: 0.6, stagger: 0.2, ease: 'power2.out',
            scrollTrigger: { trigger: livelliRef.current, start: 'top 85%', toggleActions: 'play none none none' },
          })
        }
        if (exitRef.current) {
          const steps = exitRef.current.querySelectorAll('.exit-step')
          gsap.from(steps, {
            y: 30, opacity: 0, duration: 0.6, stagger: 0.2, ease: 'power2.out',
            scrollTrigger: { trigger: exitRef.current, start: 'top 85%', toggleActions: 'play none none none' },
          })
        }
        if (deepRef.current) {
          const cards = deepRef.current.querySelectorAll('.deep-card')
          gsap.from(cards, {
            y: 30, opacity: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out',
            scrollTrigger: { trigger: deepRef.current, start: 'top 85%', toggleActions: 'play none none none' },
          })
        }
        if (partnerRef.current) {
          gsap.from(partnerRef.current, {
            y: 40, opacity: 0, duration: 0.8, ease: 'power2.out',
            scrollTrigger: { trigger: partnerRef.current, start: 'top 85%', toggleActions: 'play none none none' },
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
        <Image src="/images/img7.png" alt="" fill className="object-cover" quality={80} priority />
        <div className="absolute inset-0 bg-navy-deep/60" />
        <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-b from-transparent to-[#0D1520]" />
      </div>

      {/* Header */}
      <div className="px-4 md:px-6 -mt-20 md:-mt-28 relative z-10">
        <div ref={headerRef} className="max-w-[1100px] mx-auto text-center mb-16 md:mb-24">
          <span className="block font-sans text-[10px] md:text-[11px] font-semibold tracking-[0.25em] uppercase text-gold mb-6">
            {t('label')}
          </span>
          <h1 className="font-serif text-[32px] md:text-[52px] lg:text-[60px] font-semibold leading-[1.1] text-white mb-6">
            {t('headline')}
          </h1>
          <p className="font-sans text-[16px] md:text-[18px] font-light leading-[1.7] text-white/70 max-w-[700px] mx-auto mb-8">
            {t('subtitle')}
          </p>
          <div className="h-[1.5px] w-16 bg-gold mx-auto" />
        </div>
      </div>

      {/* ═══ BLOCCO 1: Il Doppio Approccio ═══ */}
      <div className="px-4 md:px-6 pb-8 md:pb-12">
        <div className="max-w-[1280px] mx-auto">
          <p className="font-sans text-[15px] md:text-base font-light leading-[1.8] text-white/65 max-w-[900px] mb-10">
            {t('intro')}
          </p>

          <div ref={dualRef} className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
            {/* Next Gen */}
            <div className="dual-col p-8 md:p-10 rounded-xl bg-white/[0.03] border border-white/[0.06] border-l-[3px] border-l-gold">
              <span className="block font-sans text-[11px] font-bold tracking-[0.2em] text-gold mb-1">
                {t('nextGen.title')}
              </span>
              <span className="block font-sans text-[12px] text-white/50 mb-5">
                {t('nextGen.sub')}
              </span>
              <p className="font-sans text-[14px] md:text-[15px] font-light leading-[1.8] text-white/70">
                {t('nextGen.text')}
              </p>
            </div>

            {/* Gen Exit */}
            <div className="dual-col p-8 md:p-10 rounded-xl bg-white/[0.03] border border-white/[0.06] border-l-[3px] border-l-white/20">
              <span className="block font-sans text-[11px] font-bold tracking-[0.2em] text-white/80 mb-1">
                {t('genExit.title')}
              </span>
              <span className="block font-sans text-[12px] text-white/50 mb-5">
                {t('genExit.sub')}
              </span>
              <p className="font-sans text-[14px] md:text-[15px] font-light leading-[1.8] text-white/70">
                {t('genExit.text')}
              </p>
            </div>
          </div>

          {/* Quote */}
          <div ref={quoteRef} className="text-center py-6">
            <p className="font-serif text-[18px] md:text-[22px] italic text-gold/80 leading-[1.5]">
              {t('dialogoQuote')}
            </p>
          </div>
        </div>
      </div>

      {/* ═══ BLOCCO 2: Benefici ═══ */}
      <div className="px-4 md:px-6 pb-24 md:pb-32">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="font-serif text-[24px] md:text-[36px] font-semibold leading-[1.15] text-white mb-10">
            {t('beneficiLabel')}
          </h2>

          <div ref={beneficiRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFICI_KEYS.map((key) => (
              <div
                key={key}
                className="beneficio-card p-6 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-gold/20 transition-all duration-300"
              >
                <h3 className="font-serif text-[17px] md:text-[19px] font-semibold text-gold leading-[1.2] mb-3">
                  {t(`benefici.${key}.title`)}
                </h3>
                <p className="font-sans text-[13px] md:text-[14px] font-light leading-[1.7] text-white/60">
                  {t(`benefici.${key}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ BLOCCO 3: I 3 Livelli Next Gen ═══ */}
      <div className="px-4 md:px-6 pb-24 md:pb-32">
        <div className="max-w-[1280px] mx-auto">
          <span className="block font-sans text-[10px] md:text-[11px] font-semibold tracking-[0.25em] uppercase text-gold mb-10">
            {t('livelliLabel')}
          </span>

          {/* Horizontal path */}
          <div ref={livelliRef} className="relative">
            {/* Connecting line (desktop) */}
            <div className="hidden md:block absolute top-[52px] left-0 right-0 h-px bg-gold/15" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {LIVELLI_KEYS.map((key, i) => (
                <div key={key} className="livello-step relative">
                  {/* Step number */}
                  <div className="flex items-center gap-3 mb-5">
                    <span className="w-10 h-10 rounded-full bg-gold/10 border-2 border-gold/30 flex items-center justify-center font-sans text-[14px] font-bold text-gold relative z-10">
                      {i + 1}
                    </span>
                    <div>
                      <span className="block font-sans text-[12px] font-bold tracking-[0.15em] text-gold">
                        {t(`livelli.${key}.title`)}
                      </span>
                      <span className="block font-sans text-[11px] text-white/50">
                        {t(`livelli.${key}.eta`)}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 rounded-xl bg-gold/[0.05] border border-gold/[0.1]">
                    <p className="font-sans text-[13px] md:text-[14px] font-light leading-[1.7] text-white/65">
                      {t(`livelli.${key}.desc`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
