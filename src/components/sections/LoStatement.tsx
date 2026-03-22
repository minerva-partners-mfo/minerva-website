'use client'

import { useRef, useLayoutEffect } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

export function LoStatement() {
  const t = useTranslations('loStatement')
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      if (textRef.current) {
        gsap.from(textRef.current, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        })
      }

      if (lineRef.current) {
        gsap.from(lineRef.current, {
          scaleX: 0,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.3,
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        })
      }
    }, section)

    return () => ctx.revert()
  }, [])

  // Split the text to find "Family Office" and make it a link
  const text = t('text')
  const caption = t('imageCaption')

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0D1520]"
    >
      {/* Statement text */}
      <div className="pt-[120px] pb-[60px] px-4 md:px-6">
        <div ref={textRef} className="max-w-[900px] mx-auto text-center">
          <p className="font-serif text-[24px] md:text-[32px] text-white leading-[1.5]">
            {text.split('\n').map((line, i, arr) => {
              // Check if this line contains "Family Office"
              if (line.includes('Family Office')) {
                const parts = line.split('Family Office')
                return (
                  <span key={i}>
                    {parts[0]}
                    <Link
                      href="/pensiero"
                      className="underline decoration-[#C9912B]/50 underline-offset-4 hover:decoration-[#C9912B] transition-all cursor-pointer"
                    >
                      Family Office
                    </Link>
                    {parts[1]}
                    {i < arr.length - 1 && <br />}
                  </span>
                )
              }
              return (
                <span key={i}>
                  {line}
                  {i < arr.length - 1 && <br />}
                </span>
              )
            })}
          </p>

          {/* Caption in warm sand tone */}
          <p className="font-sans text-[15px] md:text-[16px] leading-relaxed mt-8" style={{ color: '#D4C5A0' }}>
            {caption}
          </p>

          <div
            ref={lineRef}
            className="mx-auto mt-10 h-[2px] w-[80px] bg-[#C9912B]"
            style={{ transformOrigin: 'center' }}
          />
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="h-[120px] bg-gradient-to-b from-transparent to-[#0D1520] pointer-events-none" />
    </section>
  )
}
