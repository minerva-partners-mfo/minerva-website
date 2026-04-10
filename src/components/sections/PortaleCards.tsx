'use client'

import { useRef, useLayoutEffect } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { useTranslations } from 'next-intl'

const CARDS = [
  { key: 'hospitality', image: '/images/card1.png' },
  { key: 'energy', image: '/images/card2.png' },
  { key: 'tech', image: '/images/card3.png' },
] as const

export function PortaleCards() {
  const t = useTranslations('portaleCards')
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      if (labelRef.current) {
        gsap.from(labelRef.current, {
          y: 40, opacity: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: labelRef.current, start: 'top 80%', toggleActions: 'play none none none' },
        })
      }
      if (cardsRef.current) {
        gsap.from(cardsRef.current.querySelectorAll('.portale-card'), {
          y: 40, opacity: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 80%', toggleActions: 'play none none none' },
        })
      }
      if (footerRef.current) {
        gsap.from(footerRef.current, {
          y: 40, opacity: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: footerRef.current, start: 'top 90%', toggleActions: 'play none none none' },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-[#0D1520] px-6 pt-[60px] pb-[100px]">
      <div ref={labelRef} className="mb-10 text-center">
        <span className="font-sans text-[12px] uppercase tracking-[0.15em] text-[#C9912B]">
          {t('label')}
        </span>
      </div>

      <div ref={cardsRef} className="mx-auto grid max-w-[1200px] grid-cols-1 gap-6 md:grid-cols-3">
        {CARDS.map((card) => (
          <div
            key={card.key}
            className="portale-card relative h-[380px] overflow-hidden rounded-xl border border-[rgba(201,145,43,0.2)] md:h-[420px]"
            style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.3)' }}
          >
            <div className="relative h-full">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('${card.image}')`,
                  filter: 'blur(8px)',
                  transform: 'scale(1.1)',
                }}
              />
              <div className="absolute inset-0 bg-[#0D1520]/35" />

              <div className="relative z-10 flex h-full flex-col justify-end p-6 md:p-8">
                <span className="mb-3 font-sans text-[10px] uppercase tracking-[0.15em] text-[#C9912B]">
                  {t(`cards.${card.key}.sector`)}
                </span>
                <p className="mb-4 font-sans text-[13px] leading-relaxed text-white/80">
                  {t(`cards.${card.key}.desc`)}
                </p>
                <span className="mb-4 font-serif text-[20px] font-bold text-white">
                  {t(`cards.${card.key}.ev`)}
                </span>
                <span className="inline-flex self-start rounded-full border border-[#C9912B]/30 bg-[#C9912B]/10 px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-wider text-[#C9912B]">
                  {t(`cards.${card.key}.status`)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div ref={footerRef} className="mt-10 text-center">
        <p className="font-sans text-[13px] text-white/50">
          {t('note')}
        </p>
      </div>
    </section>
  )
}
