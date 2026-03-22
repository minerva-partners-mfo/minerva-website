'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { gsap } from '@/lib/gsap'
import { onIdle } from '@/lib/idle'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

const PREVIEWS = [
  { key: 'partners', href: '/ecosistema/partners', icon: 'handshake' },
  { key: 'friends', href: '/ecosistema/friends', icon: 'users' },
  { key: 'advisors', href: '/ecosistema/advisors', icon: 'signal' },
] as const

function PreviewIcon({ type }: { type: string }) {
  const cls = 'w-8 h-8 text-gold'
  switch (type) {
    case 'handshake':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
        </svg>
      )
    case 'users':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      )
    case 'signal':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      )
    default:
      return null
  }
}

export function EcosistemaPage() {
  const t = useTranslations('ecosistema')
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

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

        // Concentric rings scale in
        if (svgRef.current) {
          const rings = svgRef.current.querySelectorAll('.eco-ring')
          gsap.from(rings, {
            scale: 0, opacity: 0, duration: 0.8, stagger: 0.2, ease: 'power2.out',
            scrollTrigger: { trigger: svgRef.current, start: 'top 80%', toggleActions: 'play none none none' },
          })
          const labels = svgRef.current.querySelectorAll('.eco-label')
          gsap.from(labels, {
            opacity: 0, duration: 0.5, stagger: 0.15, delay: 0.6,
            scrollTrigger: { trigger: svgRef.current, start: 'top 80%', toggleActions: 'play none none none' },
          })
        }

        // Preview cards
        if (cardsRef.current) {
          const cards = cardsRef.current.querySelectorAll('.eco-card')
          gsap.from(cards, {
            y: 40, opacity: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out',
            scrollTrigger: { trigger: cardsRef.current, start: 'top 85%', toggleActions: 'play none none none' },
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
    <section ref={sectionRef} className="relative bg-navy-deep min-h-screen">

      {/* Hero image */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <Image src="/images/img9.webp" alt="" fill className="object-cover" quality={80} priority />
        <div className="absolute inset-0 bg-navy-deep/60" />
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

      {/* Concentric Circles Map */}
      <div className="px-4 md:px-6 pb-20 md:pb-28">
        <div className="max-w-[900px] mx-auto">
          <svg ref={svgRef} viewBox="0 0 700 700" className="w-full h-auto">
            {/* Outermost ring — Advisors (pure origination, most external) */}
            <circle className="eco-ring" cx="350" cy="350" r="320" fill="none" stroke="white" strokeWidth="0.5" opacity="0.12" style={{ transformOrigin: '350px 350px' }} />
            <circle className="eco-ring" cx="350" cy="350" r="320" fill="white" opacity="0.01" style={{ transformOrigin: '350px 350px' }} />
            <text className="eco-label" x="350" y="48" textAnchor="middle" fill="white" fontSize="13" fontFamily="DM Sans, sans-serif" fontWeight="600" opacity="0.5">
              {t('rings.advisors')}
            </text>
            <text className="eco-label" x="350" y="65" textAnchor="middle" fill="white" fontSize="9" fontFamily="DM Sans, sans-serif" opacity="0.35">
              {t('rings.advisorsDesc')}
            </text>

            {/* Second ring — Friends (specialised, flexible, no exclusivity) */}
            <circle className="eco-ring" cx="350" cy="350" r="240" fill="none" stroke="#C9912B" strokeWidth="0.6" opacity="0.2" style={{ transformOrigin: '350px 350px' }} />
            <circle className="eco-ring" cx="350" cy="350" r="240" fill="#C9912B" opacity="0.02" style={{ transformOrigin: '350px 350px' }} />
            <text className="eco-label" x="350" y="128" textAnchor="middle" fill="#C9912B" fontSize="12" fontFamily="DM Sans, sans-serif" fontWeight="600" opacity="0.7">
              {t('rings.friends')}
            </text>
            <text className="eco-label" x="350" y="145" textAnchor="middle" fill="white" fontSize="9" fontFamily="DM Sans, sans-serif" opacity="0.35">
              {t('rings.friendsDesc')}
            </text>

            {/* Third ring — Partners (closest to Hub, exclusive pre-emption) */}
            <circle className="eco-ring" cx="350" cy="350" r="160" fill="none" stroke="#C9912B" strokeWidth="1" opacity="0.35" style={{ transformOrigin: '350px 350px' }} />
            <circle className="eco-ring" cx="350" cy="350" r="160" fill="#C9912B" opacity="0.04" style={{ transformOrigin: '350px 350px' }} />
            <text className="eco-label" x="350" y="208" textAnchor="middle" fill="#C9912B" fontSize="12" fontFamily="DM Sans, sans-serif" fontWeight="600">
              {t('rings.partners')}
            </text>
            <text className="eco-label" x="350" y="225" textAnchor="middle" fill="white" fontSize="9" fontFamily="DM Sans, sans-serif" opacity="0.4">
              {t('rings.partnersDesc')}
            </text>

            {/* Inner ring — Hub */}
            <circle className="eco-ring" cx="350" cy="350" r="90" fill="none" stroke="#C9912B" strokeWidth="1.5" opacity="0.6" style={{ transformOrigin: '350px 350px' }} />
            <circle className="eco-ring" cx="350" cy="350" r="90" fill="#C9912B" opacity="0.06" style={{ transformOrigin: '350px 350px' }} />
            <text className="eco-label" x="350" y="278" textAnchor="middle" fill="#C9912B" fontSize="13" fontFamily="DM Sans, sans-serif" fontWeight="700">
              {t('rings.hub')}
            </text>

            {/* Center — Client */}
            <circle className="eco-ring" cx="350" cy="350" r="40" fill="#C9912B" opacity="0.15" style={{ transformOrigin: '350px 350px' }} />
            <circle className="eco-ring" cx="350" cy="350" r="40" fill="none" stroke="#C9912B" strokeWidth="2" style={{ transformOrigin: '350px 350px' }} />
            <text className="eco-label" x="350" y="348" textAnchor="middle" fill="white" fontSize="10" fontFamily="DM Sans, sans-serif" fontWeight="700">
              {t('rings.client')}
            </text>

            {/* Client description — below the diagram */}
            <text className="eco-label" x="350" y="690" textAnchor="middle" fill="white" fontSize="10" fontFamily="DM Sans, sans-serif" opacity="0.4" fontStyle="italic">
              {t('rings.clientDesc')}
            </text>
          </svg>
        </div>
      </div>

      {/* 3 Preview Cards */}
      <div className="px-4 md:px-6 pb-24 md:pb-[140px]">
        <div ref={cardsRef} className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
          {PREVIEWS.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="eco-card group block p-8 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-gold/30 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="mb-5">
                <PreviewIcon type={item.icon} />
              </div>
              <h3 className="font-serif text-[22px] font-semibold text-white leading-[1.2] mb-3">
                {t(`preview.${item.key}.title`)}
              </h3>
              <p className="font-sans text-[14px] font-light leading-[1.7] text-white/65 mb-5">
                {t(`preview.${item.key}.desc`)}
              </p>
              <span className="font-sans text-[13px] font-semibold text-gold group-hover:tracking-wider transition-all duration-300">
                {t('cta')} →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
