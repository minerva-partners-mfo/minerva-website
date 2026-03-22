'use client'

import { useRef, useLayoutEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { useTranslations } from 'next-intl'

export function Invito() {
  const t = useTranslations('invito')
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.from(contentRef.current.children, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        })
      }
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-[140px] px-4 md:px-6"
      style={{ backgroundColor: '#B8863A' }}
    >
      <div ref={contentRef} className="max-w-[1000px] mx-auto text-center">
        {/* Headline */}
        <h2 className="font-serif text-[28px] md:text-[36px] font-semibold leading-[1.25] text-navy-deep mb-12">
          {t('headline')}
        </h2>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="mailto:info@minervapartners.it"
            className="inline-flex items-center justify-center px-8 py-4 font-sans text-[11px] font-semibold tracking-[0.2em] uppercase bg-navy-deep text-[#C9912B] rounded-full border border-navy-deep/20 hover:bg-navy transition-colors"
          >
            {t('cta1')}
          </a>
          <a
            href="mailto:info@minervapartners.it?subject=Introduzione"
            className="inline-flex items-center justify-center px-8 py-4 font-sans text-[11px] font-semibold tracking-[0.2em] uppercase border border-navy-deep/30 text-navy-deep rounded-full hover:bg-navy-deep/5 transition-colors"
          >
            {t('cta2')}
          </a>
        </div>
      </div>
    </section>
  )
}
