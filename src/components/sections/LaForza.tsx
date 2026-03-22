'use client'

import { useRef, useLayoutEffect } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

const blocks = [
  {
    key: 'eventi',
    image: '/images/img10.png',
    href: '/eventi' as const,
  },
  {
    key: 'miglioramento',
    image: '/images/strategy.webp',
    href: '/strategia' as const,
  },
  {
    key: 'condivisione',
    image: '/images/room.jpg',
    href: '/abilitatori' as const,
  },
] as const

export function LaForza() {
  const t = useTranslations('laForza')
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const blocksRef = useRef<(HTMLAnchorElement | null)[]>([])

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          y: 40, opacity: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 80%', toggleActions: 'play none none none' },
        })
      }

      const blockElements = blocksRef.current.filter(Boolean)
      if (blockElements.length === 3) {
        const directions = [
          { x: -60, y: 0 },
          { x: 0, y: 60 },
          { x: 60, y: 0 },
        ]
        blockElements.forEach((el, i) => {
          gsap.from(el!, {
            x: directions[i].x, y: directions[i].y, opacity: 0,
            duration: 0.6, delay: i * 0.2, ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none none' },
          })
        })
      }
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0D1520] pt-[100px] pb-[80px] px-4 md:px-6"
    >
      <h2
        ref={titleRef}
        className="text-center font-serif text-[32px] md:text-[40px] text-white mb-[60px]"
        style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
      >
        {t('title')}
      </h2>

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {blocks.map((block, i) => (
          <Link
            key={block.key}
            href={block.href}
            ref={(el: HTMLAnchorElement | null) => { blocksRef.current[i] = el }}
            className="group relative h-[350px] md:h-[400px] rounded-lg overflow-hidden block border-b-2 border-[#C9912B]/30 hover:border-[#C9912B] transition-all duration-500"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] ease-out scale-[1.02] group-hover:scale-[1.05] group-hover:duration-300"
              style={{ backgroundImage: `url('${block.image}')` }}
            />
            <div className="absolute inset-0 bg-[#0D1520]/55 group-hover:bg-[#0D1520]/40 transition-all duration-500" />

            <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
              <h3
                className="font-serif text-[22px] md:text-[26px] font-bold text-[#C9912B] uppercase tracking-wider transition-transform duration-500 group-hover:-translate-y-1"
                style={{ textShadow: '0 2px 12px rgba(0,0,0,0.6)' }}
              >
                {t(`blocks.${block.key}.title`)}
              </h3>
              <p
                className="font-sans text-[16px] text-white max-w-[280px] mt-4 leading-relaxed"
                style={{ textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}
              >
                {t(`blocks.${block.key}.desc`)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
