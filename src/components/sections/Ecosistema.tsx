'use client'

import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { onIdle } from '@/lib/idle'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

/* ------------------------------------------------------------------ */
/*  Pre-calculated positions for concentric-circle ecosystem map       */
/*  Container: 700 x 700, centre 350,350                              */
/* ------------------------------------------------------------------ */

// Ring 2 — HUB nodes (r=140, 4 cardinal positions, 120px diameter)
const HUB_NODES: { x: number; y: number }[] = [
  { x: 350, y: 210 },   // top
  { x: 490, y: 350 },   // right
  { x: 350, y: 490 },   // bottom
  { x: 210, y: 350 },   // left
]

// Ring 3 — PARTNER nodes (r=240, 8 evenly spaced, 90px diameter)
const PARTNER_NODES: { x: number; y: number }[] = [
  { x: 350, y: 110 },   // 0°   (top)
  { x: 520, y: 180 },   // 45°
  { x: 590, y: 350 },   // 90°  (right)
  { x: 520, y: 520 },   // 135°
  { x: 350, y: 590 },   // 180° (bottom)
  { x: 180, y: 520 },   // 225°
  { x: 110, y: 350 },   // 270° (left)
  { x: 180, y: 180 },   // 315°
]

// Ring 4 — FRIENDS nodes (r=300, 6 evenly spaced, 70px diameter)
const FRIEND_NODES: { x: number; y: number }[] = [
  { x: 350, y: 50 },    // 0°
  { x: 610, y: 200 },   // 60°
  { x: 610, y: 500 },   // 120°
  { x: 350, y: 650 },   // 180°
  { x: 90, y: 500 },    // 240°
  { x: 90, y: 200 },    // 300°
]

// Scattered ADVISOR dots (24px, various positions in outer zone)
const ADVISOR_DOTS: { x: number; y: number }[] = [
  { x: 270, y: 42 },
  { x: 440, y: 58 },
  { x: 645, y: 290 },
  { x: 660, y: 420 },
  { x: 460, y: 660 },
  { x: 240, y: 655 },
  { x: 40, y: 310 },
  { x: 55, y: 440 },
]

const LEGEND = [
  { colorCls: 'bg-[#C9912B]', key: 'hub', descKey: 'hubDesc', ctaKey: 'hubCta', href: '/hub' as const },
  { colorCls: 'bg-[#C9912B]/30', key: 'partners', descKey: 'partnersDesc', ctaKey: 'partnersCta', href: '/ecosistema/partners' as const },
  { colorCls: 'bg-white/15', key: 'friends', descKey: 'friendsDesc', ctaKey: 'friendsCta', href: '/ecosistema/friends' as const },
  { colorCls: 'bg-white/10', key: 'advisors', descKey: 'advisorsDesc', ctaKey: 'advisorsCta', href: '/ecosistema/advisors' as const },
] as const

const JOIN_CARDS = [
  { key: 'c1', href: '/ecosistema/partners' as const },
  { key: 'c2', href: '/ecosistema/friends' as const },
  { key: 'c3', href: '/ecosistema/advisors' as const },
  { key: 'c4', href: '/contatti' as const },
] as const

export function EcosistemaPage() {
  const t = useTranslations('ecosistema')
  const sectionRef = useRef<HTMLElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<HTMLDivElement>(null)
  const legendRef = useRef<HTMLDivElement>(null)
  const whyRef = useRef<HTMLDivElement>(null)
  const joinRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    let ctx: ReturnType<typeof gsap.context> | undefined
    const cancelIdle = onIdle(() => {
      if (!sectionRef.current) return
      ctx = gsap.context(() => {
        /* Hero fade-up */
        if (heroRef.current) {
          gsap.from(heroRef.current.querySelectorAll('.hero-anim'), {
            y: 40, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out',
            scrollTrigger: { trigger: heroRef.current, start: 'top 85%', toggleActions: 'play none none none' },
          })
        }

        /* Map — circles scale in, nodes fade */
        if (mapRef.current) {
          gsap.from(mapRef.current.querySelectorAll('.eco-ring'), {
            scale: 0, opacity: 0, duration: 0.8, stagger: 0.18, ease: 'power2.out',
            scrollTrigger: { trigger: mapRef.current, start: 'top 80%', toggleActions: 'play none none none' },
          })
          gsap.from(mapRef.current.querySelectorAll('.eco-node'), {
            scale: 0, opacity: 0, duration: 0.5, stagger: 0.06, delay: 0.5,
            ease: 'back.out(1.4)',
            scrollTrigger: { trigger: mapRef.current, start: 'top 80%', toggleActions: 'play none none none' },
          })
          gsap.from(mapRef.current.querySelectorAll('.eco-dot'), {
            scale: 0, opacity: 0, duration: 0.4, stagger: 0.05, delay: 0.9,
            ease: 'power2.out',
            scrollTrigger: { trigger: mapRef.current, start: 'top 80%', toggleActions: 'play none none none' },
          })
        }

        /* Legend */
        if (legendRef.current) {
          gsap.from(legendRef.current.querySelectorAll('.legend-item'), {
            y: 30, opacity: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out',
            scrollTrigger: { trigger: legendRef.current, start: 'top 90%', toggleActions: 'play none none none' },
          })
        }

        /* Why blocks */
        if (whyRef.current) {
          gsap.from(whyRef.current.querySelectorAll('.why-block'), {
            y: 40, opacity: 0, duration: 0.7, stagger: 0.2, ease: 'power2.out',
            scrollTrigger: { trigger: whyRef.current, start: 'top 85%', toggleActions: 'play none none none' },
          })
        }

        /* Join cards */
        if (joinRef.current) {
          gsap.from(joinRef.current.querySelectorAll('.join-card'), {
            y: 40, opacity: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out',
            scrollTrigger: { trigger: joinRef.current, start: 'top 85%', toggleActions: 'play none none none' },
          })
        }

        /* CTA */
        if (ctaRef.current) {
          gsap.from(ctaRef.current, {
            y: 40, opacity: 0, duration: 0.8, ease: 'power2.out',
            scrollTrigger: { trigger: ctaRef.current, start: 'top 90%', toggleActions: 'play none none none' },
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
    <section ref={sectionRef} className="relative bg-[#0D1520] text-white overflow-hidden">

      {/* ── SECTION 1 — HERO ── */}
      <div ref={heroRef} className="min-h-[60vh] flex items-center justify-center px-4 md:px-6">
        <div className="max-w-[750px] mx-auto text-center py-24 md:py-32">
          <span className="hero-anim block font-sans text-[12px] font-semibold tracking-[0.25em] uppercase text-[#C9912B] mb-5">
            {t('label')}
          </span>
          <h1 className="hero-anim font-serif text-[32px] md:text-[44px] lg:text-[48px] leading-[1.15] text-white mb-1">
            {t('headline1')}
          </h1>
          <h1 className="hero-anim font-serif text-[32px] md:text-[44px] lg:text-[48px] leading-[1.15] text-[#C9912B] font-bold mb-6">
            {t('headline2')}
          </h1>
          <p className="hero-anim font-sans text-[15px] md:text-[17px] font-light leading-[1.7] text-white/55 max-w-[650px] mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </div>

      {/* ── SECTION 2 — ECOSYSTEM MAP ── */}
      <div className="px-4 md:px-6 pb-16 md:pb-24">
        <div ref={mapRef} className="relative w-[80%] max-w-[700px] mx-auto" style={{ aspectRatio: '1 / 1' }}>

          {/* Concentric ring circles (CSS) */}
          {/* Ring 4 — outermost, FRIENDS zone */}
          <div className="eco-ring absolute inset-0 rounded-full border border-white/[0.15]" />
          {/* Ring 3 — PARTNER zone */}
          <div className="eco-ring absolute rounded-full border border-[#C9912B]/30"
            style={{ top: '8.6%', left: '8.6%', width: '82.8%', height: '82.8%' }} />
          {/* Ring 2 — HUB zone */}
          <div className="eco-ring absolute rounded-full border-2 border-[#C9912B]"
            style={{ top: '20%', left: '20%', width: '60%', height: '60%' }} />
          {/* Centre circle — IL PATRIMONIO */}
          <div className="eco-ring absolute rounded-full border-[3px] border-[#C9912B] flex items-center justify-center"
            style={{ top: '35.7%', left: '35.7%', width: '28.6%', height: '28.6%' }}>
            <span className="font-sans text-[10px] md:text-[13px] font-bold tracking-[0.15em] text-white text-center leading-tight px-2">
              {t('map.center')}
            </span>
          </div>

          {/* HUB nodes — 120px → 17.14% of 700 */}
          {HUB_NODES.map((pos, i) => (
            <div key={`hub-${i}`}
              className="eco-node absolute rounded-full border-2 border-[#C9912B] bg-[#0D1520] flex items-center justify-center"
              style={{
                width: '17.14%', height: '17.14%',
                left: `${(pos.x / 700) * 100 - 8.57}%`,
                top: `${(pos.y / 700) * 100 - 8.57}%`,
              }}>
              <span className="font-sans text-[9px] md:text-[12px] font-bold text-[#C9912B] tracking-wider">
                {t(`map.hubNodes.n${i + 1}`)}
              </span>
            </div>
          ))}

          {/* PARTNER nodes — 90px → 12.86% of 700 */}
          {PARTNER_NODES.map((pos, i) => (
            <div key={`partner-${i}`}
              className="eco-node absolute rounded-full border border-[#C9912B]/30 bg-[#0D1520] flex items-center justify-center"
              style={{
                width: '12.86%', height: '12.86%',
                left: `${(pos.x / 700) * 100 - 6.43}%`,
                top: `${(pos.y / 700) * 100 - 6.43}%`,
              }}>
              <span className="font-sans text-[8px] md:text-[11px] font-semibold text-white/70 tracking-wide">
                {t(`map.partnerNodes.n${i + 1}`)}
              </span>
            </div>
          ))}

          {/* FRIEND nodes — 70px → 10% of 700 */}
          {FRIEND_NODES.map((pos, i) => (
            <div key={`friend-${i}`}
              className="eco-node absolute rounded-full border border-white/[0.15] bg-[#0D1520] flex items-center justify-center"
              style={{
                width: '10%', height: '10%',
                left: `${(pos.x / 700) * 100 - 5}%`,
                top: `${(pos.y / 700) * 100 - 5}%`,
              }}>
              <span className="font-sans text-[7px] md:text-[10px] font-medium text-white/50 text-center leading-tight px-1">
                {t(`map.friendNodes.n${i + 1}`)}
              </span>
            </div>
          ))}

          {/* ADVISOR dots — 24px → 3.43% of 700 */}
          {ADVISOR_DOTS.map((pos, i) => (
            <div key={`advisor-${i}`}
              className="eco-dot absolute rounded-full bg-white/10"
              style={{
                width: '3.43%', height: '3.43%',
                left: `${(pos.x / 700) * 100 - 1.71}%`,
                top: `${(pos.y / 700) * 100 - 1.71}%`,
              }}
            />
          ))}
        </div>

        {/* Legend — 4 summary blocks */}
        <div ref={legendRef} className="max-w-[900px] mx-auto mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
          {LEGEND.map((item) => (
            <Link key={item.key} href={item.href}
              className="legend-item group flex flex-col gap-2 p-4 rounded-lg hover:bg-white/[0.03] transition-colors duration-300">
              <div className="flex items-center gap-3">
                <span className={`block w-3 h-3 rounded-full ${item.colorCls} shrink-0`} />
                <span className="font-sans text-[12px] font-bold tracking-[0.15em] text-white/80">
                  {t(`map.${item.key}`)}
                </span>
              </div>
              <p className="font-sans text-[13px] font-light leading-[1.6] text-white/45 pl-6">
                {t(`map.${item.descKey}`)}
              </p>
              <span className="font-sans text-[12px] font-semibold text-[#C9912B] pl-6 group-hover:tracking-wider transition-all duration-300">
                {t(`map.${item.ctaKey}`)}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* ── SECTION 3 — PERCHE FUNZIONA ── */}
      <div ref={whyRef} className="px-4 md:px-6 py-20 md:py-28 border-t border-white/[0.06]">
        <div className="max-w-[1000px] mx-auto">
          <h2 className="font-serif text-[24px] md:text-[28px] text-white mb-12 md:mb-16">
            {t('why.title')}
          </h2>

          {[1, 2, 3].map((n) => (
            <div key={n}
              className="why-block flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-12 py-10 border-b border-white/[0.06] last:border-b-0">
              <div className="flex-1">
                <h3 className="font-serif text-[18px] md:text-[22px] text-[#C9912B] mb-3">
                  {t(`why.b${n}.title`)}
                </h3>
                <p className="font-sans text-[14px] md:text-[15px] font-light leading-[1.7] text-white/55 max-w-[550px]">
                  {t(`why.b${n}.desc`)}
                </p>
              </div>
              <div className="text-right md:min-w-[160px]">
                <span className="block font-serif text-[40px] md:text-[56px] text-[#C9912B] leading-none">
                  {t(`why.b${n}.num`)}
                </span>
                <span className="block font-sans text-[11px] md:text-[13px] font-light text-white/40 mt-1">
                  {t(`why.b${n}.numLabel`)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── SECTION 4 — CHI PUO ENTRARE ── */}
      <div ref={joinRef} className="px-4 md:px-6 py-20 md:py-28 border-t border-white/[0.06]">
        <div className="max-w-[900px] mx-auto">
          <h2 className="font-serif text-[20px] md:text-[24px] text-white mb-10 md:mb-14">
            {t('join.title')}
          </h2>

          <div className="flex flex-col gap-5">
            {JOIN_CARDS.map((card) => (
              <Link key={card.key} href={card.href}
                className="join-card block bg-white/[0.03] border-l-[3px] border-l-[#C9912B] border border-transparent rounded-xl px-6 md:px-8 py-6 md:py-7 hover:border-[#C9912B] transition-all duration-300 group">
                <h3 className="font-sans text-[14px] md:text-[16px] font-bold text-white tracking-wide mb-2">
                  {t(`join.${card.key}.title`)}
                </h3>
                <p className="font-sans text-[13px] md:text-[15px] font-light leading-[1.7] text-white/55 mb-3">
                  {t(`join.${card.key}.desc`)}
                </p>
                <span className="font-sans text-[13px] font-semibold text-[#C9912B] group-hover:tracking-wider transition-all duration-300">
                  {t(`join.${card.key}.cta`)}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── SECTION 5 — CTA ── */}
      <div ref={ctaRef} className="px-4 md:px-6 py-20 md:py-28 text-center border-t border-white/[0.06]">
        <p className="font-sans text-[16px] md:text-[18px] font-light text-white/60 mb-8">
          {t('ctaLine')}
        </p>
        <Link href="/contatti"
          className="inline-block font-sans text-[13px] md:text-[14px] font-bold tracking-[0.2em] uppercase bg-[#C9912B] text-white px-10 py-4 rounded-lg hover:bg-[#C9912B]/90 transition-colors duration-300">
          {t('ctaBtn')}
        </Link>
      </div>
    </section>
  )
}
