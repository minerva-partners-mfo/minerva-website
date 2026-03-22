'use client'

import { useRef, useLayoutEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

export function SkinInTheGame() {
  const t = useTranslations('skinInTheGame')
  const sectionRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const els = sectionRef.current!.querySelectorAll('[data-animate]')
      els.forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-[#0D1520] py-20 md:py-[100px] px-6">
      <div className="max-w-[800px] mx-auto text-center">
        {/* Main statement — two lines */}
        <div data-animate className="font-serif text-[24px] md:text-[28px] text-white leading-[1.5]">
          <span className="block">{t('statementLine1')}</span>
          <span className="block mt-2">
            {t('statementLine2pre')}
            <span className="font-bold text-[#C9912B]">{t('statementLine2gold')}</span>
          </span>
        </div>

        {/* skin in the game */}
        <div data-animate className="mt-10 flex items-center justify-center gap-1">
          <span className="text-[#C9912B]/40 text-[36px] leading-none font-serif">&ldquo;</span>
          <span className="font-serif italic text-[20px] md:text-[22px] text-[#C9912B]">
            skin in the game
          </span>
          <span className="text-[#C9912B]/40 text-[36px] leading-none font-serif">&rdquo;</span>
        </div>

        {/* CTA */}
        <div data-animate className="mt-10">
          <Link
            href="/club-deal"
            className="inline-flex items-center gap-2 font-sans text-[14px] text-[#C9912B] hover:underline hover:underline-offset-4 transition-all"
          >
            {t('cta')} <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
