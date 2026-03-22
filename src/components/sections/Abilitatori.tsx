'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { gsap } from '@/lib/gsap'
import { onIdle } from '@/lib/idle'
import { useTranslations } from 'next-intl'

const TEASER_KEYS = ['t1', 't2', 't3'] as const
const TEASER_IMAGES: Record<string, string> = {
  t1: '/images/img9.jpg',   // Professionisti tavolo — industrial/business
  t2: '/images/img11.jpg',  // Ufficio lusso quadri — financial services
  t3: '/images/img2.jpg',   // Cortile fiorentino — real estate
}
const FEATURE_KEYS = ['f1', 'f2', 'f3', 'f4', 'f5', 'f6'] as const
const ROLE_KEYS = ['esplora', 'contribuisci', 'investi'] as const
const WHY_KEYS = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7'] as const

function RoleIcon({ type }: { type: string }) {
  const cls = 'w-10 h-10 md:w-12 md:h-12 text-gold'
  switch (type) {
    case 'esplora':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
        </svg>
      )
    case 'contribuisci':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      )
    case 'investi':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M3 3v18h18" /><path d="M7 16l4-8 4 4 6-10" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    default:
      return null
  }
}

export function AbilitatoriPage() {
  const t = useTranslations('abilitatori')
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const bachecaRef = useRef<HTMLDivElement>(null)
  const portaleRef = useRef<HTMLDivElement>(null)
  const coinvRef = useRef<HTMLDivElement>(null)
  const whyRef = useRef<HTMLDivElement>(null)

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
        if (bachecaRef.current) {
          gsap.from(bachecaRef.current, {
            y: 40, opacity: 0, duration: 0.8, ease: 'power2.out',
            scrollTrigger: { trigger: bachecaRef.current, start: 'top 85%', toggleActions: 'play none none none' },
          })
          const cards = bachecaRef.current.querySelectorAll('.teaser-card')
          gsap.from(cards, {
            y: 20, opacity: 0, duration: 0.5, stagger: 0.12, ease: 'power2.out',
            scrollTrigger: { trigger: bachecaRef.current, start: 'top 75%', toggleActions: 'play none none none' },
          })
        }
        if (portaleRef.current) {
          gsap.from(portaleRef.current, {
            y: 40, opacity: 0, duration: 0.8, ease: 'power2.out',
            scrollTrigger: { trigger: portaleRef.current, start: 'top 85%', toggleActions: 'play none none none' },
          })
        }
        if (coinvRef.current) {
          const roles = coinvRef.current.querySelectorAll('.role-card')
          gsap.from(roles, {
            y: 30, opacity: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out',
            scrollTrigger: { trigger: coinvRef.current, start: 'top 85%', toggleActions: 'play none none none' },
          })
        }
        if (whyRef.current) {
          const items = whyRef.current.querySelectorAll('.why-item')
          gsap.from(items, {
            x: -20, opacity: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out',
            scrollTrigger: { trigger: whyRef.current, start: 'top 85%', toggleActions: 'play none none none' },
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

        {/* ── Header ── */}
        <div ref={headerRef} className="text-center mb-20 md:mb-28">
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

        {/* ═══════════════════════════════════
            BLOCCO 1 — La Bacheca
            ═══════════════════════════════════ */}
        <div ref={bachecaRef} className="mb-24 md:mb-32">
          <span className="block font-sans text-[10px] md:text-[11px] font-semibold tracking-[0.25em] uppercase text-gold mb-3">
            {t('bacheca.label')}
          </span>
          <h2 className="font-serif text-[24px] md:text-[36px] font-semibold leading-[1.15] text-white mb-4">
            {t('bacheca.title')}
          </h2>
          <div className="h-[1.5px] w-10 bg-gold/40 mb-6" />
          <p className="font-sans text-[15px] md:text-base font-light leading-[1.8] text-white/65 max-w-[900px] mb-10">
            {t('bacheca.desc')}
          </p>

          {/* Deal teaser cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TEASER_KEYS.map((key) => (
              <div
                key={key}
                className="teaser-card relative rounded-xl border border-white/[0.08] overflow-hidden group hover:border-gold/20 transition-all duration-300 min-h-[260px]"
              >
                {/* Background image */}
                <Image
                  src={TEASER_IMAGES[key]}
                  alt=""
                  fill
                  className="object-cover"
                  quality={40}
                  loading="lazy"
                />
                {/* Navy overlay */}
                <div className="absolute inset-0 bg-navy-deep/75" />

                {/* Blur overlay on hover */}
                <div className="absolute inset-0 backdrop-blur-[2px] bg-navy-deep/20 z-20 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="font-sans text-[11px] font-semibold tracking-wider uppercase text-gold/70">
                    {t('bacheca.blind')}
                  </span>
                </div>

                {/* Content */}
                <div className="relative z-10 p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-[11px] font-semibold tracking-wider uppercase text-gold/60">
                      {t(`bacheca.teasers.${key}.sector`)}
                    </span>
                  </div>
                  <h4 className="font-serif text-[17px] font-semibold text-white/80">
                    {t(`bacheca.teasers.${key}.type`)}
                  </h4>
                  <div className="flex flex-wrap gap-x-4 gap-y-1">
                    <span className="font-sans text-[12px] font-medium text-gold/80">
                      {t(`bacheca.teasers.${key}.size`)}
                    </span>
                    <span className="font-sans text-[12px] font-medium text-gold/80">
                      {t(`bacheca.teasers.${key}.ebitda`)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gold/50" />
                    <span className="font-sans text-[12px] text-white/55">
                      {t(`bacheca.teasers.${key}.status`)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════
            BLOCCO 2 — Il Portale
            ═══════════════════════════════════ */}
        <div ref={portaleRef} className="mb-24 md:mb-32">
          <span className="block font-sans text-[10px] md:text-[11px] font-semibold tracking-[0.25em] uppercase text-gold mb-3">
            {t('portale.label')}
          </span>
          <h2 className="font-serif text-[24px] md:text-[36px] font-semibold leading-[1.15] text-white mb-4">
            {t('portale.title')}
          </h2>
          <div className="h-[1.5px] w-10 bg-gold/40 mb-6" />
          <p className="font-sans text-[15px] md:text-base font-light leading-[1.8] text-white/65 max-w-[900px] mb-10">
            {t('portale.desc')}
          </p>

          {/* Dashboard mockup */}
          <div className="rounded-xl border border-white/[0.08] overflow-hidden">
            {/* Title bar */}
            <div className="flex items-center gap-2 px-5 py-3 bg-white/[0.04] border-b border-white/[0.06]">
              <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <span className="ml-3 font-sans text-[11px] text-white/45 tracking-wider">{t('portale.barTitle')}</span>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 bg-white/[0.02]">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {FEATURE_KEYS.map((key, i) => (
                  <div
                    key={key}
                    className="flex items-start gap-3 p-4 rounded-lg bg-white/[0.03] border border-white/[0.06]"
                  >
                    <span className="flex-shrink-0 w-7 h-7 rounded-md bg-gold/10 border border-gold/20 flex items-center justify-center font-sans text-[11px] font-bold text-gold">
                      {i + 1}
                    </span>
                    <p className="font-sans text-[13px] md:text-[14px] font-light leading-[1.6] text-white/70 pt-0.5">
                      {t(`portale.features.${key}`)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Mock chart area */}
              <div className="mt-6 h-32 rounded-lg bg-white/[0.02] border border-white/[0.04] flex items-center justify-center">
                <svg className="w-full max-w-[400px] h-20 px-8" viewBox="0 0 400 80" fill="none">
                  <path d="M0 60 Q50 55 100 45 T200 30 T300 20 T400 10" stroke="#C9912B" strokeWidth="1.5" opacity="0.3" />
                  <path d="M0 70 Q50 65 100 55 T200 50 T300 40 T400 25" stroke="white" strokeWidth="1" opacity="0.1" />
                  {[0, 100, 200, 300, 400].map((x) => (
                    <line key={x} x1={x} y1="0" x2={x} y2="80" stroke="white" strokeWidth="0.3" opacity="0.05" />
                  ))}
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════
            BLOCCO 3 — Coinvolgimento Attivo
            ═══════════════════════════════════ */}
        <div className="mb-24 md:mb-32">
          <span className="block font-sans text-[10px] md:text-[11px] font-semibold tracking-[0.25em] uppercase text-gold mb-3">
            {t('coinvolgimento.label')}
          </span>
          <h2 className="font-serif text-[24px] md:text-[36px] font-semibold leading-[1.15] text-white mb-4">
            {t('coinvolgimento.title')}
          </h2>
          <div className="h-[1.5px] w-10 bg-gold/40 mb-4" />
          <p className="font-sans text-[16px] md:text-[18px] font-light leading-[1.7] text-white/70 mb-10">
            {t('coinvolgimento.desc')}
          </p>

          <div ref={coinvRef} className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {ROLE_KEYS.map((key) => (
              <div
                key={key}
                className="role-card p-8 rounded-xl bg-gold/[0.06] border border-gold/[0.12] hover:border-gold/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="mb-5">
                  <RoleIcon type={key} />
                </div>
                <h3 className="font-serif text-[22px] font-semibold text-gold leading-[1.2] mb-3">
                  {t(`coinvolgimento.roles.${key}.title`)}
                </h3>
                <p className="font-sans text-[14px] font-light leading-[1.7] text-white/65">
                  {t(`coinvolgimento.roles.${key}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════
            Perché essere cliente attivo
            ═══════════════════════════════════ */}
        <div>
          <span className="block font-sans text-[10px] md:text-[11px] font-semibold tracking-[0.25em] uppercase text-gold mb-8">
            {t('whyLabel')}
          </span>
          <div ref={whyRef} className="space-y-3">
            {WHY_KEYS.map((key, i) => (
              <div
                key={key}
                className="why-item flex items-start gap-4 p-5 rounded-lg bg-white/[0.03] border border-white/[0.06]"
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

      </div>
    </section>
  )
}
