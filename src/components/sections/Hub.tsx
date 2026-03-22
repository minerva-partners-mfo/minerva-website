'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { gsap } from '@/lib/gsap'
import { onIdle } from '@/lib/idle'
import { useTranslations } from 'next-intl'

const CARDS = [
  { key: 'ma', icon: 'handshake', variant: 'gold' },
  { key: 're', icon: 'building', variant: 'navy' },
  { key: 'st', icon: 'compass', variant: 'navy' },
  { key: 'wm', icon: 'shield', variant: 'gold' },
] as const

function CardIcon({ type }: { type: string }) {
  const cls = 'w-10 h-10 md:w-12 md:h-12'
  switch (type) {
    case 'handshake':
      return (
        <svg className={cls} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M6 24l8-8 6 4 8-8 8 4 6-6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 32l-8 4v-12" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M34 32l8 4v-12" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M18 28l3 3 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'building':
      return (
        <svg className={cls} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="8" y="6" width="14" height="36" rx="1" />
          <rect x="26" y="16" width="14" height="26" rx="1" />
          <path d="M13 12h4M13 18h4M13 24h4M13 30h4M31 22h4M31 28h4M31 34h4" strokeLinecap="round" />
        </svg>
      )
    case 'compass':
      return (
        <svg className={cls} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="24" cy="24" r="18" />
          <polygon points="20,28 16,32 24,18 28,20 32,16 24,30" fill="currentColor" opacity="0.15" stroke="none" />
          <path d="M20 28l-4 4 8-14 4 2 4-4-8 14-4-2z" />
        </svg>
      )
    case 'shield':
      return (
        <svg className={cls} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M24 4L6 12v12c0 11.1 7.8 21.4 18 24 10.2-2.6 18-12.9 18-24V12L24 4z" />
          <path d="M17 24l5 5 9-10" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    default:
      return null
  }
}

export function HubPage() {
  const t = useTranslations('hub')
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const infraRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    let ctx: ReturnType<typeof gsap.context> | undefined
    const cancelIdle = onIdle(() => {
      if (!sectionRef.current) return
      ctx = gsap.context(() => {
        // Header
        if (headerRef.current) {
          gsap.from(headerRef.current, {
            y: 40, opacity: 0, duration: 0.8, ease: 'power2.out',
            scrollTrigger: { trigger: headerRef.current, start: 'top 85%', toggleActions: 'play none none none' },
          })
        }

        // Cards stagger
        if (cardsRef.current) {
          const cards = cardsRef.current.querySelectorAll('.hub-card')
          gsap.from(cards, {
            y: 50, opacity: 0, duration: 0.7, stagger: 0.15, ease: 'power2.out',
            scrollTrigger: { trigger: cardsRef.current, start: 'top 80%', toggleActions: 'play none none none' },
          })
        }

        // Infographic label
        if (infraRef.current) {
          gsap.from(infraRef.current, {
            y: 40, opacity: 0, duration: 0.8, ease: 'power2.out',
            scrollTrigger: { trigger: infraRef.current, start: 'top 85%', toggleActions: 'play none none none' },
          })
        }

        // SVG lines draw-in
        if (svgRef.current) {
          const lines = svgRef.current.querySelectorAll('.regia-line')
          lines.forEach((line) => {
            const el = line as SVGLineElement | SVGPathElement
            const length = el.getTotalLength?.() || 200
            gsap.set(el, { strokeDasharray: length, strokeDashoffset: length })
            gsap.to(el, {
              strokeDashoffset: 0, duration: 1.2, ease: 'power2.inOut',
              scrollTrigger: { trigger: svgRef.current, start: 'top 80%', toggleActions: 'play none none none' },
            })
          })

          // Icons fade in
          const icons = svgRef.current.querySelectorAll('.regia-icon')
          gsap.from(icons, {
            scale: 0, opacity: 0, duration: 0.5, stagger: 0.12, ease: 'back.out(1.7)',
            scrollTrigger: { trigger: svgRef.current, start: 'top 80%', toggleActions: 'play none none none' },
          })

          // Center pulse
          const center = svgRef.current.querySelector('.regia-center')
          if (center) {
            gsap.from(center, {
              scale: 0, opacity: 0, duration: 0.6, ease: 'back.out(2)',
              scrollTrigger: { trigger: svgRef.current, start: 'top 80%', toggleActions: 'play none none none' },
              delay: 0.8,
            })
          }
        }
      }, section)
    })

    return () => {
      cancelIdle()
      ctx?.revert()
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-navy-deep min-h-screen">

      {/* ── Hero image band ── */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <Image
          src="/images/img6.png"
          alt=""
          fill
          className="object-cover"
          quality={80}
          priority
        />
        <div className="absolute inset-0 bg-navy-deep/60" />
        <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-b from-transparent to-[#0D1520]" />
      </div>

      {/* ── Header ── */}
      <div className="px-4 md:px-6 -mt-20 md:-mt-28 relative z-10">
        <div ref={headerRef} className="max-w-[1280px] mx-auto text-center mb-16 md:mb-24">
          <span className="block font-sans text-[10px] md:text-[11px] font-semibold tracking-[0.25em] uppercase text-gold mb-4">
            {t('label')}
          </span>
          <h1 className="font-serif text-[32px] md:text-[48px] lg:text-[56px] font-semibold leading-[1.1] text-white mb-6">
            {t('headline')}
          </h1>
          <p className="font-sans text-[16px] md:text-[18px] font-light leading-[1.7] text-white/70 max-w-[750px] mx-auto mb-8">
            {t('subtitle')}
          </p>
          <div className="h-[1.5px] w-16 bg-gold mx-auto" />
        </div>
      </div>

      {/* ── 4 Cards 2×2 ── */}
      <div className="px-4 md:px-6 pb-20 md:pb-28">
        <div ref={cardsRef} className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {CARDS.map((card) => {
            const isGold = card.variant === 'gold'
            return (
              <div
                key={card.key}
                className={`hub-card relative border-l-[3px] border-l-gold rounded-xl p-8 md:p-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] ${
                  isGold
                    ? 'bg-gold/[0.08] border border-gold/[0.15] border-l-gold'
                    : 'bg-white/[0.05] border border-white/[0.12] border-l-gold'
                }`}
              >
                <div className={`mb-6 ${isGold ? 'text-gold' : 'text-gold'}`}>
                  <CardIcon type={card.icon} />
                </div>
                <h3 className="font-serif text-[22px] md:text-[26px] font-semibold text-white leading-[1.2] mb-5">
                  {t(`cards.${card.key}.title`)}
                </h3>

                <div className="mb-4">
                  <span className="block font-sans text-[10px] font-semibold tracking-[0.2em] uppercase text-gold/70 mb-2">
                    {t('cosaLabel')}
                  </span>
                  <p className="font-sans text-[14px] md:text-[15px] font-light leading-[1.7] text-white/70">
                    {t(`cards.${card.key}.cosa`)}
                  </p>
                </div>

                <div>
                  <span className="block font-sans text-[10px] font-semibold tracking-[0.2em] uppercase text-gold/70 mb-2">
                    {t('valoreLabel')}
                  </span>
                  <p className="font-sans text-[14px] md:text-[15px] font-light leading-[1.7] text-white/70">
                    {t(`cards.${card.key}.valore`)}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Infographic: 4 icons → REGIA ── */}
      <div className="px-4 md:px-6 pb-24 md:pb-[140px]">
        <div className="max-w-[1100px] mx-auto">
          <div ref={infraRef} className="text-center mb-12">
            <span className="block font-sans text-[10px] md:text-[11px] font-semibold tracking-[0.25em] uppercase text-gold mb-4">
              {t('regiaLabel')}
            </span>
          </div>

          {/* SVG Diagram */}
          <div className="relative">
            {/* Background image subtle */}
            <div className="absolute inset-0 opacity-[0.03] rounded-2xl overflow-hidden">
              <Image
                src="/images/room.jpg"
                alt=""
                fill
                className="object-cover"
                quality={60}
                loading="lazy"
              />
            </div>

            <svg
              ref={svgRef}
              viewBox="0 0 600 380"
              className="w-full max-w-[650px] mx-auto h-auto"
              fill="none"
            >
              {/* REGIA at top — dominant element */}
              <g className="regia-center" transform="translate(300, 65)">
                <circle cx="0" cy="0" r="55" fill="#C9912B" opacity="0.15" />
                <circle cx="0" cy="0" r="55" fill="none" stroke="#C9912B" strokeWidth="2" />
                <circle cx="0" cy="0" r="48" fill="none" stroke="#C9912B" strokeWidth="1" opacity="0.4" />
                <text x="0" y="5" textAnchor="middle" fill="#C9912B" fontSize="16" fontFamily="DM Sans, sans-serif" fontWeight="700" letterSpacing="0.15em">
                  {t('regia')}
                </text>
              </g>

              {/* Lines converging UPWARD to REGIA — inverted pyramid */}
              <line className="regia-line" x1="75" y1="310" x2="265" y2="110" stroke="#C9912B" strokeWidth="1.2" opacity="0.35" />
              <line className="regia-line" x1="225" y1="310" x2="285" y2="110" stroke="#C9912B" strokeWidth="1.2" opacity="0.35" />
              <line className="regia-line" x1="375" y1="310" x2="315" y2="110" stroke="#C9912B" strokeWidth="1.2" opacity="0.35" />
              <line className="regia-line" x1="525" y1="310" x2="335" y2="110" stroke="#C9912B" strokeWidth="1.2" opacity="0.35" />

              {/* 4 service nodes at the bottom — spread horizontally */}
              {/* M&A */}
              <g className="regia-icon" transform="translate(75, 310)">
                <circle cx="0" cy="0" r="36" fill="#C9912B" opacity="0.1" stroke="#C9912B" strokeWidth="1" />
                <text x="0" y="-4" textAnchor="middle" fill="#C9912B" fontSize="10" fontFamily="Playfair Display, serif" fontWeight="600">M&amp;A</text>
                <text x="0" y="10" textAnchor="middle" fill="white" fontSize="7" fontFamily="DM Sans, sans-serif" opacity="0.5">&amp; Investments</text>
              </g>

              {/* Real Estate */}
              <g className="regia-icon" transform="translate(225, 310)">
                <circle cx="0" cy="0" r="36" fill="#C9912B" opacity="0.1" stroke="#C9912B" strokeWidth="1" />
                <text x="0" y="-4" textAnchor="middle" fill="#C9912B" fontSize="9" fontFamily="Playfair Display, serif" fontWeight="600">Real Estate</text>
                <text x="0" y="10" textAnchor="middle" fill="white" fontSize="7" fontFamily="DM Sans, sans-serif" opacity="0.5">Advisory</text>
              </g>

              {/* Strategy */}
              <g className="regia-icon" transform="translate(375, 310)">
                <circle cx="0" cy="0" r="36" fill="#C9912B" opacity="0.1" stroke="#C9912B" strokeWidth="1" />
                <text x="0" y="-4" textAnchor="middle" fill="#C9912B" fontSize="9" fontFamily="Playfair Display, serif" fontWeight="600">Strategy</text>
                <text x="0" y="10" textAnchor="middle" fill="white" fontSize="7" fontFamily="DM Sans, sans-serif" opacity="0.5">Consulting</text>
              </g>

              {/* Wealth Management */}
              <g className="regia-icon" transform="translate(525, 310)">
                <circle cx="0" cy="0" r="36" fill="#C9912B" opacity="0.1" stroke="#C9912B" strokeWidth="1" />
                <text x="0" y="-4" textAnchor="middle" fill="#C9912B" fontSize="9" fontFamily="Playfair Display, serif" fontWeight="600">Wealth</text>
                <text x="0" y="10" textAnchor="middle" fill="white" fontSize="7" fontFamily="DM Sans, sans-serif" opacity="0.5">Management</text>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
