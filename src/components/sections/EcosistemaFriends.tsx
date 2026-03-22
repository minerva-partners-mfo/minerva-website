'use client'

import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { onIdle } from '@/lib/idle'
import { useTranslations } from 'next-intl'

const TRIPLE = ['client', 'minerva', 'friend'] as const
const STEPS = ['s1', 's2', 's3', 's4'] as const
const WHY_KEYS = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6'] as const

function TripleIcon({ type }: { type: string }) {
  const cls = 'w-8 h-8 text-gold'
  switch (type) {
    case 'client':
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>)
    case 'minerva':
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>)
    case 'friend':
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>)
    default:
      return null
  }
}

export function EcosistemaFriendsPage() {
  const t = useTranslations('ecosistemaFriends')
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const tripleRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
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
        if (tripleRef.current) {
          const cards = tripleRef.current.querySelectorAll('.triple-card')
          gsap.from(cards, {
            y: 30, opacity: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out',
            scrollTrigger: { trigger: tripleRef.current, start: 'top 85%', toggleActions: 'play none none none' },
          })
        }
        if (timelineRef.current) {
          const steps = timelineRef.current.querySelectorAll('.timeline-step')
          gsap.from(steps, {
            x: -30, opacity: 0, duration: 0.6, stagger: 0.2, ease: 'power2.out',
            scrollTrigger: { trigger: timelineRef.current, start: 'top 85%', toggleActions: 'play none none none' },
          })
        }
        if (whyRef.current) {
          const items = whyRef.current.querySelectorAll('.why-item')
          gsap.from(items, {
            y: 20, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out',
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

        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 md:mb-24">
          <span className="block font-sans text-[10px] md:text-[11px] font-semibold tracking-[0.25em] uppercase text-gold mb-4">
            {t('label')}
          </span>
          <h1 className="font-serif text-[32px] md:text-[48px] font-semibold leading-[1.15] text-white mb-6">
            {t('headline')}
          </h1>
          <p className="font-sans text-[16px] md:text-[18px] font-light leading-[1.7] text-white/70 max-w-[700px] mx-auto mb-8">
            {t('subtitle')}
          </p>
          <div className="h-[1.5px] w-16 bg-gold mx-auto" />
        </div>

        {/* Triple Value */}
        <div className="mb-20 md:mb-28">
          <span className="block font-sans text-[10px] md:text-[11px] font-semibold tracking-[0.25em] uppercase text-gold mb-8">
            {t('tripleLabel')}
          </span>
          <div ref={tripleRef} className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TRIPLE.map((key) => (
              <div
                key={key}
                className="triple-card p-8 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-gold/20 transition-all duration-300"
              >
                <div className="mb-5">
                  <TripleIcon type={key} />
                </div>
                <h3 className="font-serif text-[20px] font-semibold text-gold leading-[1.2] mb-3">
                  {t(`triple.${key}.title`)}
                </h3>
                <p className="font-sans text-[14px] font-light leading-[1.7] text-white/65">
                  {t(`triple.${key}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline: Come si entra */}
        <div className="mb-20 md:mb-28">
          <span className="block font-sans text-[10px] md:text-[11px] font-semibold tracking-[0.25em] uppercase text-gold mb-10">
            {t('stepsLabel')}
          </span>
          <div ref={timelineRef} className="relative pl-8 md:pl-12">
            {/* Vertical line */}
            <div className="absolute left-[11px] md:left-[19px] top-0 bottom-0 w-px bg-gold/20" />

            {STEPS.map((key, i) => (
              <div key={key} className="timeline-step relative mb-10 last:mb-0">
                {/* Dot */}
                <div className="absolute -left-8 md:-left-12 top-1 w-6 h-6 rounded-full bg-gold/10 border-2 border-gold/40 flex items-center justify-center">
                  <span className="font-sans text-[10px] font-bold text-gold">{i + 1}</span>
                </div>
                <h4 className="font-serif text-[18px] md:text-[20px] font-semibold text-white mb-2">
                  {t(`steps.${key}.title`)}
                </h4>
                <p className="font-sans text-[14px] md:text-[15px] font-light leading-[1.7] text-white/65">
                  {t(`steps.${key}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Why join */}
        <div>
          <span className="block font-sans text-[10px] md:text-[11px] font-semibold tracking-[0.25em] uppercase text-gold mb-8">
            {t('whyLabel')}
          </span>
          <div ref={whyRef} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {WHY_KEYS.map((key) => (
              <div
                key={key}
                className="why-item flex items-start gap-3 p-5 rounded-lg bg-white/[0.03] border border-white/[0.06]"
              >
                <svg className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <p className="font-sans text-[14px] md:text-[15px] font-light leading-[1.7] text-white/80">
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
