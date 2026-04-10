'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { gsap } from '@/lib/gsap'
import { onIdle } from '@/lib/idle'
import { useTranslations } from 'next-intl'


export function NextGenPage() {
  const t = useTranslations('nextGen')
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const dualRef = useRef<HTMLDivElement>(null)
  const quoteRef = useRef<HTMLDivElement>(null)

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
          <p className="font-sans text-[15px] md:text-base font-light leading-[1.8] text-white/65 mb-10">
            {t('intro').split('Chi entra deve imparare').map((part, i) =>
              i === 0 ? <span key={i}>{part}<br />Chi entra deve imparare</span> : <span key={i}>{part}</span>
            )}
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
          <div ref={quoteRef} className="text-center py-10">
            <p className="font-serif italic text-gold/80 leading-[1.5]" style={{ fontSize: '1.3rem' }}>
              {t('dialogoQuote')}
            </p>
            <p className="font-sans text-white" style={{ fontSize: '1.15rem', fontWeight: 400, marginTop: 40, textAlign: 'center' }}>
              {t('contactShort')}
            </p>
          </div>
        </div>
      </div>

    </section>
  )
}
