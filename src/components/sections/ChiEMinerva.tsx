'use client'

import { useRef, useEffect } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { onIdle } from '@/lib/idle'
import { useTranslations } from 'next-intl'

const HUB_CARDS = ['ma', 're', 'st', 'wm'] as const

const PARTNER_PILLS = [
  'legal',
  'tax',
  'banking',
  'insurance',
  'energy',
  'digital',
  'international',
  'uhnwi',
] as const

export function ChiEMinerva() {
  const t = useTranslations('chiEMinerva')
  const sectionRef = useRef<HTMLElement>(null)
  const statementRef = useRef<HTMLDivElement>(null)
  const miracoliRef = useRef<HTMLDivElement>(null)
  const sistemaIntroRef = useRef<HTMLDivElement>(null)
  const hubLabelRef = useRef<HTMLDivElement>(null)
  const hubCardsRef = useRef<HTMLDivElement>(null)
  const partnerLabelRef = useRef<HTMLDivElement>(null)
  const partnerPillsRef = useRef<HTMLDivElement>(null)
  const friendsRef = useRef<HTMLDivElement>(null)
  const targetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    let ctx: ReturnType<typeof gsap.context> | undefined
    const cancelIdle = onIdle(() => {
      if (!sectionRef.current) return
      ctx = gsap.context(() => {
      const fadeUp = { y: 40, opacity: 0, duration: 0.8, ease: 'power2.out' }
      const trigger = (el: Element) => ({
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none none' as const,
        },
      })

      // Statement
      if (statementRef.current) {
        gsap.from(statementRef.current, { ...fadeUp, ...trigger(statementRef.current) })
      }

      // Miracoli
      if (miracoliRef.current) {
        gsap.from(miracoliRef.current, {
          ...fadeUp,
          delay: 0.3,
          ...trigger(miracoliRef.current),
        })
      }

      // Sistema intro
      if (sistemaIntroRef.current) {
        gsap.from(sistemaIntroRef.current, { ...fadeUp, ...trigger(sistemaIntroRef.current) })
      }

      // Hub label + cards
      if (hubLabelRef.current) {
        gsap.from(hubLabelRef.current, { ...fadeUp, ...trigger(hubLabelRef.current) })
      }
      if (hubCardsRef.current) {
        const cards = hubCardsRef.current.querySelectorAll('.hub-card')
        gsap.from(cards, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: hubCardsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        })
      }

      // Partner label + pills
      if (partnerLabelRef.current) {
        gsap.from(partnerLabelRef.current, { ...fadeUp, ...trigger(partnerLabelRef.current) })
      }
      if (partnerPillsRef.current) {
        const pills = partnerPillsRef.current.querySelectorAll('.partner-pill')
        gsap.from(pills, {
          scale: 0.8,
          opacity: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: partnerPillsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        })
      }

      // Friends
      if (friendsRef.current) {
        gsap.from(friendsRef.current, { ...fadeUp, ...trigger(friendsRef.current) })
      }

      // Target
      if (targetRef.current) {
        gsap.from(targetRef.current, { ...fadeUp, ...trigger(targetRef.current) })
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

        {/* ═══════════════════════════════════
            BLOCCO A: Statement
            ═══════════════════════════════════ */}
        <div className="max-w-[1000px] mx-auto text-center mb-20 md:mb-28">
          <div ref={statementRef}>
            <p className="font-serif text-[24px] md:text-[32px] font-medium leading-[1.3] text-white">
              {t('statement.p1')}
            </p>
            <p className="font-serif text-[24px] md:text-[32px] font-medium leading-[1.3] text-white mt-6">
              {t('statement.p2')}
            </p>
          </div>

          <div ref={miracoliRef} className="mt-12 md:mt-16">
            <p className="font-serif text-[24px] md:text-[32px] font-semibold leading-[1.3] text-gold italic">
              {t('statement.miracoli')}
            </p>
            <p className="font-serif text-[20px] md:text-[26px] font-medium leading-[1.4] text-white/80 mt-4">
              {t('statement.miracoliAnswer')}
            </p>
          </div>
        </div>

        {/* ═══════════════════════════════════
            BLOCCO B: Il Sistema Minerva
            ═══════════════════════════════════ */}

        {/* ── Intro confederazione ── */}
        <div ref={sistemaIntroRef} className="text-center mb-16 md:mb-20">
          <span className="block font-sans text-[10px] md:text-[11px] font-semibold tracking-[0.25em] uppercase text-gold mb-4">
            {t('sistemaIntro.label')}
          </span>
          <p className="font-sans text-[16px] md:text-[18px] font-light leading-[1.8] text-white/65 max-w-[800px] mx-auto">
            {t('sistemaIntro.text')}
          </p>
          <div className="h-[1.5px] w-16 bg-gold mx-auto mt-8" />
        </div>

        {/* ── Hub ── */}
        <div ref={hubLabelRef} className="mb-8">
          <span className="block font-sans text-[10px] md:text-[11px] font-semibold tracking-[0.25em] uppercase text-gold mb-4">
            {t('hub.label')}
          </span>
          <p className="font-sans text-base md:text-lg font-light leading-[1.8] text-white/65 max-w-2xl">
            {t('hub.intro')}
          </p>
        </div>

        <div ref={hubCardsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16 md:mb-20">
          {HUB_CARDS.map((key) => (
            <div
              key={key}
              className="hub-card relative p-6 md:p-8 rounded-[16px] border border-white/[0.06] bg-white/[0.02] border-l-[3px] border-l-gold"
            >
              <h3 className="font-serif text-[18px] md:text-[20px] font-semibold text-white mb-2">
                {t(`hub.cards.${key}.title`)}
              </h3>
              <p className="font-sans text-[13px] text-white/55 leading-[1.6]">
                {t(`hub.cards.${key}.desc`)}
              </p>
            </div>
          ))}
        </div>

        {/* ── Partner ── */}
        <div ref={partnerLabelRef} className="mb-8">
          <span className="block font-sans text-[10px] md:text-[11px] font-semibold tracking-[0.25em] uppercase text-gold mb-4">
            {t('partner.label')}
          </span>
          <p className="font-sans text-base md:text-lg font-light leading-[1.8] text-white/65 max-w-2xl">
            {t('partner.intro')}
          </p>
        </div>

        <div ref={partnerPillsRef} className="flex flex-wrap gap-3 mb-16 md:mb-20">
          {PARTNER_PILLS.map((key) => (
            <span
              key={key}
              className="partner-pill relative px-5 py-2.5 font-sans text-[11px] font-semibold tracking-[0.1em] uppercase text-white/70 border border-white/[0.08] rounded-full hover:border-gold/40 hover:text-gold/80 transition-all duration-300 cursor-default group"
            >
              {t(`partner.pills.${key}`)}
              {/* Tooltip */}
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-md bg-navy text-[10px] text-white/80 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 shadow-lg">
                {t(`partner.tooltips.${key}`)}
              </span>
            </span>
          ))}
        </div>

        {/* ── Friends ── */}
        <div
          ref={friendsRef}
          className="relative pl-6 border-l-[3px] border-l-gold/40 mb-20 md:mb-28 max-w-2xl"
        >
          <p className="font-sans text-base md:text-lg font-light leading-[1.8] text-white/65 italic">
            {t('friends.text')}
          </p>
        </div>

        {/* ═══════════════════════════════════
            BLOCCO C: Target
            ═══════════════════════════════════ */}
        <div ref={targetRef} className="text-center">
          <div className="h-[1.5px] w-16 bg-gold/20 mx-auto mb-10" />
          <p className="font-sans text-base md:text-lg font-light leading-[1.8] text-white/50 italic max-w-[750px] mx-auto">
            {t('target')}
          </p>
        </div>

      </div>
    </section>
  )
}
