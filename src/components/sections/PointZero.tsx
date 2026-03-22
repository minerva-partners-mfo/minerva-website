'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { gsap } from '@/lib/gsap'
import { onIdle } from '@/lib/idle'
import { useTranslations } from 'next-intl'

const REGOLE_KEYS = ['r1', 'r2', 'r3', 'r4'] as const
const CRITERI_KEYS = ['c1', 'c2', 'c3', 'c4', 'c5'] as const

function RegoleIcon({ index }: { index: number }) {
  const cls = 'w-8 h-8 text-gold'
  switch (index) {
    case 0: // Riservatezza
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>)
    case 1: // Contribuzione
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></svg>)
    case 2: // No selling
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><circle cx="12" cy="12" r="10" /><path d="M4.93 4.93l14.14 14.14" /></svg>)
    case 3: // Onestà
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>)
    default:
      return null
  }
}

export function PointZeroPage() {
  const t = useTranslations('pointZero')
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const hotSeatRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const regoleRef = useRef<HTMLDivElement>(null)
  const criteriRef = useRef<HTMLDivElement>(null)
  const membriRef = useRef<HTMLDivElement>(null)

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
        if (hotSeatRef.current) {
          gsap.from(hotSeatRef.current, {
            y: 40, opacity: 0, duration: 0.8, ease: 'power2.out',
            scrollTrigger: { trigger: hotSeatRef.current, start: 'top 85%', toggleActions: 'play none none none' },
          })
        }
        // Hot seat SVG chairs
        if (svgRef.current) {
          const chairs = svgRef.current.querySelectorAll('.chair')
          gsap.from(chairs, {
            scale: 0, opacity: 0, duration: 0.4, stagger: 0.08, ease: 'back.out(1.5)',
            scrollTrigger: { trigger: svgRef.current, start: 'top 80%', toggleActions: 'play none none none' },
          })
          const center = svgRef.current.querySelector('.hot-center')
          if (center) {
            gsap.from(center, {
              scale: 0, opacity: 0, duration: 0.6, ease: 'back.out(2)', delay: 0.8,
              scrollTrigger: { trigger: svgRef.current, start: 'top 80%', toggleActions: 'play none none none' },
            })
          }
        }
        if (regoleRef.current) {
          const cards = regoleRef.current.querySelectorAll('.regola-card')
          gsap.from(cards, {
            y: 30, opacity: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out',
            scrollTrigger: { trigger: regoleRef.current, start: 'top 85%', toggleActions: 'play none none none' },
          })
        }
        if (criteriRef.current) {
          const items = criteriRef.current.querySelectorAll('.criterio-item')
          gsap.from(items, {
            x: -20, opacity: 0, duration: 0.4, stagger: 0.1, ease: 'power2.out',
            scrollTrigger: { trigger: criteriRef.current, start: 'top 85%', toggleActions: 'play none none none' },
          })
        }
        if (membriRef.current) {
          gsap.from(membriRef.current, {
            scale: 0.95, opacity: 0, duration: 0.8, ease: 'power2.out',
            scrollTrigger: { trigger: membriRef.current, start: 'top 85%', toggleActions: 'play none none none' },
          })
        }
      }, section)
    })

    return () => {
      cancelIdle()
      ctx?.revert()
    }
  }, [])

  // Generate chair positions in a circle
  const CHAIR_COUNT = 12
  const chairPositions = Array.from({ length: CHAIR_COUNT }, (_, i) => {
    const angle = (i / CHAIR_COUNT) * Math.PI * 2 - Math.PI / 2
    return {
      x: 200 + 140 * Math.cos(angle),
      y: 200 + 140 * Math.sin(angle),
    }
  })

  return (
    <section ref={sectionRef} className="relative bg-navy-deep min-h-screen">

      {/* Hero image */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <Image src="/images/img8.png" alt="" fill className="object-cover" quality={80} priority />
        <div className="absolute inset-0 bg-navy-deep/60" />
        <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-b from-transparent to-[#0D1520]" />
      </div>

      {/* Header */}
      <div className="px-4 md:px-6 -mt-20 md:-mt-28 relative z-10">
        <div ref={headerRef} className="max-w-[1100px] mx-auto text-center mb-16 md:mb-24">
          <span className="block font-sans text-[10px] md:text-[11px] font-semibold tracking-[0.25em] uppercase text-gold mb-6">
            {t('label')}
          </span>
          <h1 className="font-serif text-[56px] md:text-[80px] lg:text-[96px] font-semibold leading-[1] text-gold mb-6">
            {t('headline')}
          </h1>
          <p className="font-sans text-[16px] md:text-[18px] font-light leading-[1.7] text-white/70 max-w-[700px] mx-auto mb-4">
            {t('subtitle')}
          </p>
          <p className="font-sans text-[13px] font-semibold tracking-wider uppercase text-white/45 mb-8">
            {t('format')}
          </p>
          <div className="h-[1.5px] w-16 bg-gold mx-auto" />
        </div>
      </div>

      {/* ── Hot Seat ── */}
      <div className="px-4 md:px-6 pb-24 md:pb-32">
        <div className="max-w-[1280px] mx-auto">
          <div ref={hotSeatRef} className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">

            {/* SVG Chair Circle */}
            <div className="w-full lg:w-1/2">
              <svg
                ref={svgRef}
                viewBox="0 0 400 400"
                className="w-full max-w-[400px] mx-auto h-auto"
                fill="none"
              >
                {/* Outer guide circle */}
                <circle cx="200" cy="200" r="160" stroke="white" strokeWidth="0.3" opacity="0.06" />

                {/* Chairs */}
                {chairPositions.map((pos, i) => (
                  <g key={i} className="chair" style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}>
                    <circle cx={pos.x} cy={pos.y} r="16" fill="#C9912B" fillOpacity="0.08" stroke="#C9912B" strokeWidth="0.8" strokeOpacity="0.3" />
                    <circle cx={pos.x} cy={pos.y} r="6" fill="#C9912B" fillOpacity="0.2" />
                  </g>
                ))}

                {/* Center — Hot Seat */}
                <g className="hot-center" style={{ transformOrigin: '200px 200px' }}>
                  <circle cx="200" cy="200" r="30" fill="#C9912B" fillOpacity="0.15" />
                  <circle cx="200" cy="200" r="30" fill="none" stroke="#C9912B" strokeWidth="1.5" />
                  <text x="200" y="196" textAnchor="middle" fill="#C9912B" fontSize="8" fontFamily="DM Sans, sans-serif" fontWeight="700" letterSpacing="0.1em">
                    {t('hotSeatSvgTop')}
                  </text>
                  <text x="200" y="208" textAnchor="middle" fill="#C9912B" fontSize="8" fontFamily="DM Sans, sans-serif" fontWeight="700" letterSpacing="0.1em">
                    {t('hotSeatSvgBottom')}
                  </text>
                </g>
              </svg>
            </div>

            {/* Text */}
            <div className="w-full lg:w-1/2">
              <span className="block font-sans text-[10px] md:text-[11px] font-semibold tracking-[0.25em] uppercase text-gold mb-4">
                {t('hotSeatLabel')}
              </span>
              <p className="font-sans text-[15px] md:text-base font-light leading-[1.8] text-white/70 mb-6">
                {t('hotSeatDesc')}
              </p>
              <span className="inline-block font-sans text-[11px] font-semibold tracking-wider uppercase text-white/40 border border-white/10 rounded-full px-4 py-1.5">
                {t('hotSeatNote')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 4 Regole ── */}
      <div className="px-4 md:px-6 pb-24 md:pb-32">
        <div className="max-w-[1280px] mx-auto">
          <span className="block font-sans text-[10px] md:text-[11px] font-semibold tracking-[0.25em] uppercase text-gold mb-10">
            {t('regoleLabel')}
          </span>

          <div ref={regoleRef} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {REGOLE_KEYS.map((key, i) => (
              <div
                key={key}
                className="regola-card p-7 md:p-8 rounded-xl bg-white/[0.04] border border-white/[0.08] border-l-[3px] border-l-gold hover:border-gold/20 transition-all duration-300"
              >
                <div className="mb-4">
                  <RegoleIcon index={i} />
                </div>
                <h3 className="font-serif text-[20px] md:text-[22px] font-semibold text-white leading-[1.2] mb-3">
                  {t(`regole.${key}.title`)}
                </h3>
                <p className="font-sans text-[14px] font-light leading-[1.7] text-white/60">
                  {t(`regole.${key}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Criteri di ammissione ── */}
      <div className="px-4 md:px-6 pb-20 md:pb-28">
        <div className="max-w-[1000px] mx-auto">
          <span className="block font-sans text-[10px] md:text-[11px] font-semibold tracking-[0.25em] uppercase text-gold mb-8">
            {t('criteriLabel')}
          </span>

          <div ref={criteriRef} className="space-y-3">
            {CRITERI_KEYS.map((key, i) => (
              <div
                key={key}
                className="criterio-item flex items-start gap-4 p-5 rounded-lg bg-white/[0.03] border border-white/[0.06]"
              >
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center font-sans text-[12px] font-bold text-gold">
                  {i + 1}
                </span>
                <p className="font-sans text-[14px] md:text-[15px] font-light leading-[1.7] text-white/70 pt-0.5">
                  {t(`criteri.${key}`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Max 12-15 ── */}
      <div className="px-4 md:px-6 pb-24 md:pb-[140px]">
        <div ref={membriRef} className="max-w-[900px] mx-auto p-10 md:p-14 rounded-2xl bg-gold/[0.06] border border-gold/[0.12] text-center">
          <p className="font-serif text-[28px] md:text-[36px] font-semibold leading-[1.15] text-gold mb-4">
            {t('membriLabel')}
          </p>
          <div className="h-[1.5px] w-10 bg-gold/30 mx-auto mb-6" />
          <p className="font-sans text-[15px] md:text-base font-light leading-[1.8] text-white/65 max-w-[650px] mx-auto">
            {t('membriDesc')}
          </p>
        </div>
      </div>
    </section>
  )
}
