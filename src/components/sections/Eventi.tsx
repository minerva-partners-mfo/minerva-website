'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { gsap } from '@/lib/gsap'
import { onIdle } from '@/lib/idle'
import { useTranslations } from 'next-intl'

const TIPO_KEYS = ['deal', 'fundraising', 'deep', 'dinner'] as const

/* Sample event markers on 12-month timeline (month index 0-11) */
const EVENT_MARKERS = [
  { month: 1, type: 'deal' },
  { month: 2, type: 'deep' },
  { month: 3, type: 'dinner' },
  { month: 4, type: 'fundraising' },
  { month: 5, type: 'deal' },
  { month: 7, type: 'deep' },
  { month: 8, type: 'dinner' },
  { month: 9, type: 'deal' },
  { month: 10, type: 'fundraising' },
  { month: 11, type: 'deal' },
]

function TipoIcon({ type }: { type: string }) {
  const cls = 'w-10 h-10 md:w-12 md:h-12 text-gold'
  switch (type) {
    case 'deal':
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></svg>)
    case 'fundraising':
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M3 3v18h18" /><path d="M7 16l4-8 4 4 6-10" strokeLinecap="round" strokeLinejoin="round" /></svg>)
    case 'deep':
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" /></svg>)
    case 'dinner':
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>)
    default:
      return null
  }
}

export function EventiPage() {
  const t = useTranslations('eventi')
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const chiRef = useRef<SVGSVGElement>(null)

  // Lazy video
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const v = entry.target as HTMLVideoElement
            v.preload = 'auto'
            v.play().catch(() => {})
          }
        })
      },
      { rootMargin: '200px' }
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  // GSAP
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
          const cards = cardsRef.current.querySelectorAll('.evento-card')
          cards.forEach((card, i) => {
            const isEven = i % 2 === 0
            gsap.from(card, {
              x: isEven ? -40 : 40, opacity: 0, duration: 0.7, ease: 'power2.out',
              scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' },
            })
          })
        }
        if (timelineRef.current) {
          const markers = timelineRef.current.querySelectorAll('.timeline-marker')
          gsap.from(markers, {
            scale: 0, opacity: 0, duration: 0.4, stagger: 0.08, ease: 'back.out(1.7)',
            scrollTrigger: { trigger: timelineRef.current, start: 'top 85%', toggleActions: 'play none none none' },
          })
        }
        if (chiRef.current) {
          const rings = chiRef.current.querySelectorAll('.chi-ring')
          gsap.from(rings, {
            scale: 0, opacity: 0, duration: 0.7, stagger: 0.2, ease: 'power2.out',
            scrollTrigger: { trigger: chiRef.current, start: 'top 85%', toggleActions: 'play none none none' },
          })
        }
      }, section)
    })

    return () => {
      cancelIdle()
      ctx?.revert()
    }
  }, [])

  // Read months array
  const mesi: string[] = []
  for (let i = 0; i < 12; i++) {
    mesi.push(t(`mesi.${i}`))
  }

  return (
    <section ref={sectionRef} className="relative bg-navy-deep min-h-screen">

      {/* Hero video */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          muted
          playsInline
          preload="metadata"
          onEnded={(e) => (e.target as HTMLVideoElement).pause()}
          poster="/images/posters/eventi.jpg"
        >
          <source src="/videos/eventi.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-navy-deep/50" />
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

      {/* ── 4 Event Type Cards (zigzag) ── */}
      <div className="px-4 md:px-6 pb-24 md:pb-32">
        <div className="max-w-[1280px] mx-auto">
          <span className="block font-sans text-[10px] md:text-[11px] font-semibold tracking-[0.25em] uppercase text-gold mb-10">
            {t('tipologieLabel')}
          </span>

          <div ref={cardsRef} className="space-y-5">
            {TIPO_KEYS.map((key, i) => {
              const isEven = i % 2 === 0
              return (
                <div
                  key={key}
                  className={`evento-card flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-6 md:gap-8 p-6 md:p-8 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-gold/20 transition-all duration-300`}
                >
                  {/* Icon + Frequency */}
                  <div className="flex-shrink-0 flex md:flex-col items-center md:items-start gap-4 md:gap-3 md:w-40">
                    <TipoIcon type={key} />
                    <span className="font-sans text-[11px] font-semibold tracking-wider uppercase text-gold/60">
                      {t(`tipologie.${key}.freq`)}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="font-serif text-[22px] md:text-[26px] font-semibold text-white leading-[1.2] mb-3">
                      {t(`tipologie.${key}.title`)}
                    </h3>
                    <div className="h-[1.5px] w-8 bg-gold/30 mb-4" />
                    <p className="font-sans text-[14px] md:text-[15px] font-light leading-[1.8] text-white/65">
                      {t(`tipologie.${key}.desc`)}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── 12-Month Timeline ── */}
      <div className="px-4 md:px-6 pb-24 md:pb-32">
        <div className="max-w-[1280px] mx-auto">
          <span className="block font-sans text-[10px] md:text-[11px] font-semibold tracking-[0.25em] uppercase text-gold mb-10">
            {t('calendarioLabel')}
          </span>

          <div ref={timelineRef} className="relative">
            {/* Horizontal line */}
            <div className="absolute top-6 left-0 right-0 h-px bg-white/[0.08]" />

            <div className="grid grid-cols-6 md:grid-cols-12 gap-y-8">
              {mesi.map((mese, i) => {
                const hasEvent = EVENT_MARKERS.find((m) => m.month === i)
                return (
                  <div key={i} className="relative flex flex-col items-center">
                    {/* Marker */}
                    <div className={`timeline-marker relative z-10 w-3 h-3 rounded-full mb-3 ${
                      hasEvent
                        ? 'bg-gold border-2 border-gold/50 shadow-[0_0_8px_rgba(201,145,43,0.3)]'
                        : 'bg-white/10 border border-white/15'
                    }`} />

                    {/* Month label */}
                    <span className={`font-sans text-[10px] md:text-[11px] ${
                      hasEvent ? 'text-gold/70 font-semibold' : 'text-white/45'
                    }`}>
                      {mese}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
