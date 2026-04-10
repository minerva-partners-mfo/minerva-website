'use client'

import { useRef, useEffect } from 'react'
import { Link } from '@/i18n/navigation'
import { gsap } from '@/lib/gsap'
import { onIdle } from '@/lib/idle'
import { useTranslations } from 'next-intl'

/* ── Constants ── */

const PYRAMID_BOXES = ['box01', 'box02', 'box03', 'box04'] as const

const S01_CAPS = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'] as const
const S01_FUNNEL = ['s1', 's2', 's3', 's4', 's5'] as const
const FUNNEL_WIDTHS = ['100%', '80%', '60%', '40%', '20%']

const S02_CAPS = ['c1', 'c2', 'c3', 'c4', 'c5'] as const
const S02_DEALS = ['d1', 'd2', 'd3'] as const
const DEAL_GRADIENTS = [
  'linear-gradient(135deg, #2C2C2E 0%, #5A5A5C 50%, #E5E5E7 100%)',
  'linear-gradient(135deg, #1A2744 0%, #2E5090 60%, #C9912B 100%)',
  'linear-gradient(135deg, #1A2744 0%, #B8860B 55%, #C9912B 100%)',
]

const S03_CAPS = ['c1', 'c2', 'c3', 'c4'] as const
const S03_BARS = ['b1', 'b2', 'b3', 'b4'] as const
const BAR_WIDTHS = ['60%', '80%', '45%', '70%']
const BAR_COLORS = [
  'rgba(201,145,43,0.4)',
  'rgba(231,76,60,0.2)',
  'rgba(201,145,43,0.6)',
  'rgba(201,145,43,0.8)',
]

const S04_CAPS = ['c1', 'c2', 'c3', 'c4', 'c5'] as const
const CYCLE_KEYS = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'] as const
const CYCLE_ANGLES = [270, 330, 30, 90, 150, 210] // clock: 12h, 2h, 4h, 6h, 8h, 10h

/* ── Subcomponents ── */

function GoldCircle({ num }: { num: string }) {
  return (
    <span
      className="inline-flex items-center justify-center w-8 h-8 rounded-full border-2 font-sans text-[13px] font-bold"
      style={{ borderColor: '#C9912B', color: '#C9912B' }}
    >
      {num}
    </span>
  )
}

function MiniCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div
      className="bg-white/[0.02] rounded-lg"
      style={{ padding: '12px 16px', borderLeft: '2px solid rgba(201,145,43,0.3)' }}
    >
      <p className="font-sans text-[13px] font-bold text-white/80 leading-tight">{title}</p>
      <p className="font-sans text-[12px] text-white/50 leading-snug mt-1">{desc}</p>
    </div>
  )
}

/* ── Main Component ── */

export function HubPage() {
  const t = useTranslations('hub')

  const sectionRef = useRef<HTMLElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const pyramidRef = useRef<HTMLDivElement>(null)
  const pyramidSvgRef = useRef<SVGSVGElement>(null)
  const s01Ref = useRef<HTMLDivElement>(null)
  const s01FunnelRef = useRef<HTMLDivElement>(null)
  const s02Ref = useRef<HTMLDivElement>(null)
  const s03Ref = useRef<HTMLDivElement>(null)
  const s03BarsRef = useRef<HTMLDivElement>(null)
  const s04Ref = useRef<HTMLDivElement>(null)
  const s04CycleRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    let ctx: ReturnType<typeof gsap.context> | undefined
    const cancelIdle = onIdle(() => {
      if (!sectionRef.current) return
      ctx = gsap.context(() => {
        /* ── Hero ── */
        if (heroRef.current) {
          gsap.from(heroRef.current.querySelectorAll('.hero-anim'), {
            y: 40, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out',
            scrollTrigger: { trigger: heroRef.current, start: 'top 85%', toggleActions: 'play none none none' },
          })
        }

        /* ── Pyramid ── */
        if (pyramidRef.current) {
          const regia = pyramidRef.current.querySelector('.pyramid-regia')
          const boxes = pyramidRef.current.querySelectorAll('.pyramid-box')

          if (regia) {
            gsap.from(regia, {
              y: 30, opacity: 0, duration: 0.7, ease: 'power2.out',
              scrollTrigger: { trigger: pyramidRef.current, start: 'top 80%', toggleActions: 'play none none none' },
            })
          }

          // SVG lines draw
          if (pyramidSvgRef.current) {
            const lines = pyramidSvgRef.current.querySelectorAll('.pyr-line')
            lines.forEach((line) => {
              const el = line as SVGLineElement
              const length = el.getTotalLength?.() || 200
              gsap.set(el, { strokeDasharray: length, strokeDashoffset: length })
              gsap.to(el, {
                strokeDashoffset: 0, duration: 0.8, ease: 'power2.inOut',
                scrollTrigger: { trigger: pyramidRef.current, start: 'top 80%', toggleActions: 'play none none none' },
                delay: 0.4,
              })
            })
          }

          gsap.from(boxes, {
            y: 40, opacity: 0, duration: 0.6, stagger: 0.2, ease: 'power2.out',
            scrollTrigger: { trigger: pyramidRef.current, start: 'top 80%', toggleActions: 'play none none none' },
            delay: 0.8,
          })
        }

        /* ── Service 01 ── */
        if (s01Ref.current) {
          gsap.from(s01Ref.current.querySelectorAll('.s01-anim'), {
            y: 40, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power2.out',
            scrollTrigger: { trigger: s01Ref.current, start: 'top 80%', toggleActions: 'play none none none' },
          })
        }
        if (s01FunnelRef.current) {
          gsap.from(s01FunnelRef.current.querySelectorAll('.funnel-step'), {
            y: -30, opacity: 0, duration: 0.5, stagger: 0.2, ease: 'power2.out',
            scrollTrigger: { trigger: s01FunnelRef.current, start: 'top 85%', toggleActions: 'play none none none' },
          })
        }

        /* ── Service 02 ── */
        if (s02Ref.current) {
          gsap.from(s02Ref.current.querySelectorAll('.s02-anim'), {
            y: 40, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power2.out',
            scrollTrigger: { trigger: s02Ref.current, start: 'top 80%', toggleActions: 'play none none none' },
          })
        }

        /* ── Service 03 ── */
        if (s03Ref.current) {
          gsap.from(s03Ref.current.querySelectorAll('.s03-anim'), {
            y: 40, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power2.out',
            scrollTrigger: { trigger: s03Ref.current, start: 'top 80%', toggleActions: 'play none none none' },
          })
        }
        if (s03BarsRef.current) {
          const bars = s03BarsRef.current.querySelectorAll('.bar-fill')
          bars.forEach((bar) => {
            gsap.from(bar, {
              width: 0, duration: 1, ease: 'power2.out',
              scrollTrigger: { trigger: s03BarsRef.current, start: 'top 85%', toggleActions: 'play none none none' },
            })
          })
        }

        /* ── Service 04 ── */
        if (s04Ref.current) {
          gsap.from(s04Ref.current.querySelectorAll('.s04-anim'), {
            y: 40, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power2.out',
            scrollTrigger: { trigger: s04Ref.current, start: 'top 80%', toggleActions: 'play none none none' },
          })
        }
        if (s04CycleRef.current) {
          gsap.from(s04CycleRef.current.querySelectorAll('.cycle-seg'), {
            scale: 0, opacity: 0, duration: 0.5, stagger: 0.15, ease: 'back.out(1.7)',
            scrollTrigger: { trigger: s04CycleRef.current, start: 'top 85%', toggleActions: 'play none none none' },
          })
        }

        /* ── Footer CTA ── */
        if (footerRef.current) {
          gsap.from(footerRef.current, {
            y: 40, opacity: 0, duration: 0.8, ease: 'power2.out',
            scrollTrigger: { trigger: footerRef.current, start: 'top 90%', toggleActions: 'play none none none' },
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
    <section ref={sectionRef} className="relative min-h-screen" style={{ backgroundColor: '#0D1520' }}>

      {/* ════════════════════════════════════════════════════════
          SECTION 1 — HERO con due sfere COORDINA / AGISCE
          ════════════════════════════════════════════════════════ */}
      <div className="relative overflow-hidden pt-24 md:pt-28 pb-20 md:pb-28">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/freepik_imagine-group-of-abstract_2717946232.png')" }} />
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(13,21,32,0.82)' }} />
        <div className="absolute inset-x-0 bottom-0 h-[160px] bg-gradient-to-t from-[#0D1520] to-transparent" />

        <div ref={heroRef} className="relative z-10 px-4 md:px-6 max-w-[1100px] mx-auto text-center">
          <span
            className="hero-anim inline-block font-sans font-bold uppercase tracking-[0.2em] mb-6"
            style={{ fontSize: '12px', color: '#C9912B', border: '1px solid rgba(201,145,43,0.5)', padding: '8px 18px', borderRadius: 4 }}
          >
            MINERVA HUB
          </span>
          <h1 className="hero-anim font-serif font-semibold text-white leading-tight mx-auto" style={{ fontSize: 'clamp(32px, 5vw, 52px)', maxWidth: 900 }}>
            Eseguire quattro servizi e orchestrare la regia
          </h1>

          <div className="hero-anim mt-14 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 justify-items-center">
            {[
              { title: 'COORDINA', desc: 'Orchestra le competenze, allinea le decisioni, governa il processo.' },
              { title: 'AGISCE', desc: "Esegue in prima persona quando l'operazione lo richiede." },
            ].map((sphere) => (
              <div
                key={sphere.title}
                className="rounded-full flex flex-col items-center justify-center text-center p-10"
                style={{
                  width: 'min(86vw, 320px)',
                  height: 'min(86vw, 320px)',
                  border: '1px solid rgba(201,145,43,0.5)',
                  background: 'radial-gradient(circle at center, rgba(201,145,43,0.1) 0%, rgba(13,21,32,0.6) 70%)',
                  boxShadow: '0 0 60px rgba(201,145,43,0.08)',
                }}
              >
                <span className="font-serif font-bold tracking-[0.08em]" style={{ fontSize: 'clamp(28px, 3.4vw, 38px)', color: '#C9912B' }}>
                  {sphere.title}
                </span>
                <p className="font-sans font-light mt-4 max-w-[230px]" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.78)', lineHeight: '1.55' }}>
                  {sphere.desc}
                </p>
              </div>
            ))}
          </div>

          <p className="hero-anim font-sans mt-14 mx-auto" style={{ fontSize: '15px', color: 'rgba(255,255,255,0.65)', maxWidth: 560 }}>
            Non solo regia. Anche execution diretta nelle aree chiave.
          </p>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════
          SECTION 2 — PYRAMID
          ════════════════════════════════════════════════════════ */}
      <div className="px-4 md:px-6 py-20 md:py-28" style={{ backgroundColor: '#0D1520' }}>
        <div ref={pyramidRef} className="max-w-[960px] mx-auto">
          <h2
            className="font-serif font-semibold text-white text-center mb-12"
            style={{ fontSize: '32px' }}
          >
            {t('pyramid.title')}
          </h2>

          {/* REGIA box */}
          <div className="flex justify-center mb-8">
            <div
              className="pyramid-regia text-center"
              style={{
                border: '2px solid #C9912B',
                backgroundColor: 'rgba(201,145,43,0.08)',
                borderRadius: '12px',
                padding: '20px 40px',
              }}
            >
              <span className="font-serif font-bold" style={{ fontSize: '22px', color: '#C9912B' }}>
                {t('pyramid.regia')}
              </span>
            </div>
          </div>

          {/* SVG connecting lines */}
          <div className="flex justify-center mb-4">
            <svg
              ref={pyramidSvgRef}
              viewBox="0 0 800 60"
              className="w-full max-w-[800px]"
              style={{ height: '60px' }}
              fill="none"
            >
              {/* Lines from center top to 4 bottom positions */}
              <line className="pyr-line" x1="400" y1="0" x2="100" y2="60" stroke="#C9912B" strokeWidth="1.2" opacity="0.2" />
              <line className="pyr-line" x1="400" y1="0" x2="300" y2="60" stroke="#C9912B" strokeWidth="1.2" opacity="0.2" />
              <line className="pyr-line" x1="400" y1="0" x2="500" y2="60" stroke="#C9912B" strokeWidth="1.2" opacity="0.2" />
              <line className="pyr-line" x1="400" y1="0" x2="700" y2="60" stroke="#C9912B" strokeWidth="1.2" opacity="0.2" />
            </svg>
          </div>

          {/* 4 Boxes */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {PYRAMID_BOXES.map((key) => (
              <div
                key={key}
                className="pyramid-box text-center"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(201,145,43,0.15)',
                  borderRadius: '12px',
                  padding: '24px',
                }}
              >
                <span
                  className="inline-flex items-center justify-center rounded-full font-sans font-bold mb-3"
                  style={{
                    width: '32px',
                    height: '32px',
                    fontSize: '13px',
                    color: '#C9912B',
                    border: '1.5px solid #C9912B',
                  }}
                >
                  {t(`pyramid.${key}.num`)}
                </span>
                <h3 className="font-serif font-semibold text-white mb-1" style={{ fontSize: '20px' }}>
                  {t(`pyramid.${key}.title`)}
                </h3>
                <p className="font-sans" style={{ fontSize: '12px', color: '#C9912B' }}>
                  {t(`pyramid.${key}.sub`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════
          SECTION 3 — 4 SERVICES IN DETAIL
          ════════════════════════════════════════════════════════ */}

      {/* ── SERVICE 01 — M&A (text left, funnel right) ── */}
      <div
        ref={s01Ref}
        className="px-4 md:px-6 py-16 md:py-24"
        style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
      >
        <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row gap-10 lg:gap-16">
          {/* Text 55% */}
          <div className="lg:w-[55%]">
            <div className="s01-anim mb-4">
              <GoldCircle num="01" />
            </div>
            <h3 className="s01-anim font-serif font-semibold text-white mb-2" style={{ fontSize: '36px' }}>
              {t('s01.title')}
            </h3>
            <p className="s01-anim font-sans mb-4" style={{ fontSize: '16px', color: '#C9912B' }}>
              {t('s01.subtitle')}
            </p>
            <p
              className="s01-anim font-sans font-light mb-8"
              style={{ fontSize: '16px', color: 'rgba(255,255,255,0.65)', lineHeight: '1.7' }}
            >
              {t('s01.desc')}
            </p>

            {/* 6 mini-cards 2x3 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {S01_CAPS.map((c) => (
                <div key={c} className="s01-anim">
                  <MiniCard title={t(`s01.caps.${c}.title`)} desc={t(`s01.caps.${c}.desc`)} />
                </div>
              ))}
            </div>
          </div>

          {/* Visual 45% — Funnel */}
          <div className="lg:w-[45%] flex flex-col items-center justify-center" ref={s01FunnelRef}>
            <div className="w-full max-w-[380px] space-y-3">
              {S01_FUNNEL.map((s, i) => (
                <div
                  key={s}
                  className="funnel-step flex items-center justify-center rounded-lg font-sans font-bold text-white"
                  style={{
                    width: FUNNEL_WIDTHS[i],
                    height: '48px',
                    fontSize: '13px',
                    background: 'linear-gradient(135deg, #C9912B, #9A6F1E)',
                    borderRadius: '8px',
                    margin: '0 auto',
                    letterSpacing: '0.06em',
                  }}
                >
                  {t(`s01.funnel.${s}`)}
                </div>
              ))}
            </div>
            <p className="font-sans mt-4 text-center" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)' }}>
              {t('s01.funnelNote')}
            </p>
          </div>
        </div>
      </div>

      {/* ── SERVICE 02 — Real Estate (INVERTED: visual left, text right) ── */}
      <div
        ref={s02Ref}
        className="px-4 md:px-6 py-16 md:py-24"
        style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
      >
        <div className="max-w-[1280px] mx-auto flex flex-col-reverse lg:flex-row gap-10 lg:gap-16">
          {/* Visual 45% — Deal Cards */}
          <div className="lg:w-[45%] flex flex-col gap-4 justify-center">
            {S02_DEALS.map((d, i) => (
              <div
                key={d}
                className="s02-anim rounded-xl"
                style={{
                  background: DEAL_GRADIENTS[i],
                  padding: '24px',
                }}
              >
                <span
                  className="inline-block font-sans font-bold uppercase tracking-wider mb-2"
                  style={{ fontSize: '10px', color: '#C9912B' }}
                >
                  {t(`s02.deals.${d}.tag`)}
                </span>
                <p
                  className="font-sans font-light mb-2"
                  style={{ fontSize: '14px', color: 'rgba(255,255,255,0.65)', lineHeight: '1.6' }}
                >
                  {t(`s02.deals.${d}.desc`)}
                </p>
                <p className="font-serif font-semibold text-white" style={{ fontSize: '18px' }}>
                  {t(`s02.deals.${d}.ev`)}
                </p>
              </div>
            ))}
          </div>

          {/* Text 55% */}
          <div className="lg:w-[55%]">
            <div className="s02-anim mb-4">
              <GoldCircle num="02" />
            </div>
            <h3 className="s02-anim font-serif font-semibold text-white mb-2" style={{ fontSize: '36px' }}>
              {t('s02.title')}
            </h3>
            <p className="s02-anim font-sans mb-4" style={{ fontSize: '16px', color: '#C9912B' }}>
              {t('s02.subtitle')}
            </p>
            <p
              className="s02-anim font-sans font-light mb-8"
              style={{ fontSize: '16px', color: 'rgba(255,255,255,0.65)', lineHeight: '1.7' }}
            >
              {t('s02.desc')}
            </p>

            {/* 5 mini-cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {S02_CAPS.map((c) => (
                <div key={c} className="s02-anim">
                  <MiniCard title={t(`s02.caps.${c}.title`)} desc={t(`s02.caps.${c}.desc`)} />
                </div>
              ))}
            </div>

            {/* Disclaimer */}
            <p
              className="s02-anim font-sans italic"
              style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)' }}
            >
              {t('s02.disclaimer')}
            </p>
          </div>
        </div>
      </div>

      {/* ── SERVICE 03 — Strategy (text left, bars right) ── */}
      <div
        ref={s03Ref}
        className="px-4 md:px-6 py-16 md:py-24"
        style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
      >
        <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row gap-10 lg:gap-16">
          {/* Text 55% */}
          <div className="lg:w-[55%]">
            <div className="s03-anim mb-4">
              <GoldCircle num="03" />
            </div>
            <h3 className="s03-anim font-serif font-semibold text-white mb-2" style={{ fontSize: '36px' }}>
              {t('s03.title')}
            </h3>
            <p className="s03-anim font-sans mb-4" style={{ fontSize: '16px', color: '#C9912B' }}>
              {t('s03.subtitle')}
            </p>
            <p
              className="s03-anim font-sans font-light mb-8"
              style={{ fontSize: '16px', color: 'rgba(255,255,255,0.65)', lineHeight: '1.7' }}
            >
              {t('s03.desc')}
            </p>

            {/* 4 mini-cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {S03_CAPS.map((c) => (
                <div key={c} className="s03-anim">
                  <MiniCard title={t(`s03.caps.${c}.title`)} desc={t(`s03.caps.${c}.desc`)} />
                </div>
              ))}
            </div>
          </div>

          {/* Visual 45% — Horizontal Bars */}
          <div className="lg:w-[45%] flex flex-col justify-center" ref={s03BarsRef}>
            <div className="space-y-4 w-full">
              {S03_BARS.map((b, i) => (
                <div key={b}>
                  <p className="font-sans font-bold text-white/60 mb-1" style={{ fontSize: '12px', letterSpacing: '0.08em' }}>
                    {t(`s03.bars.${b}`)}
                  </p>
                  <div
                    className="rounded-md overflow-hidden"
                    style={{ height: '28px', backgroundColor: 'rgba(255,255,255,0.04)' }}
                  >
                    <div
                      className="bar-fill h-full rounded-md"
                      style={{
                        width: BAR_WIDTHS[i],
                        backgroundColor: BAR_COLORS[i],
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="font-sans mt-5" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)' }}>
              {t('s03.barsNote')}
            </p>
          </div>
        </div>
      </div>

      {/* ── SERVICE 04 — Wealth Management (INVERTED: cycle left, text right) ── */}
      <div
        ref={s04Ref}
        className="px-4 md:px-6 py-16 md:py-24"
        style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
      >
        <div className="max-w-[1280px] mx-auto flex flex-col-reverse lg:flex-row gap-10 lg:gap-16">
          {/* Visual 45% — Circular Diagram */}
          <div className="lg:w-[45%] flex items-center justify-center" ref={s04CycleRef}>
            <div className="relative" style={{ width: '300px', height: '300px' }}>
              {/* Center label */}
              <div
                className="cycle-seg absolute font-sans font-bold text-center"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontSize: '14px',
                  color: '#C9912B',
                }}
              >
                {t('s04.cycle.center')}
              </div>

              {/* 6 Segments */}
              {CYCLE_KEYS.map((key, i) => {
                const angle = CYCLE_ANGLES[i]
                const rad = (angle * Math.PI) / 180
                const radius = 120
                const x = 150 + radius * Math.cos(rad)
                const y = 150 + radius * Math.sin(rad)

                return (
                  <div
                    key={key}
                    className="cycle-seg absolute flex items-center justify-center text-center"
                    style={{
                      left: `${x}px`,
                      top: `${y}px`,
                      transform: 'translate(-50%, -50%)',
                      width: '72px',
                      height: '72px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(201,145,43,0.08)',
                      border: '1px solid rgba(201,145,43,0.25)',
                    }}
                  >
                    <span className="font-sans font-bold" style={{ fontSize: '9px', color: '#C9912B', letterSpacing: '0.04em', lineHeight: '1.2' }}>
                      {t(`s04.cycle.${key}`)}
                    </span>
                  </div>
                )
              })}

              {/* Arrows between segments (clockwise arcs via SVG) */}
              <svg
                className="absolute inset-0"
                width="300"
                height="300"
                viewBox="0 0 300 300"
                fill="none"
              >
                {CYCLE_KEYS.map((_, i) => {
                  const a1 = CYCLE_ANGLES[i]
                  const a2 = CYCLE_ANGLES[(i + 1) % 6]
                  const midAngle = a1 + ((a2 - a1 + 360) % 360) / 2
                  const rad1 = ((a1 + (a2 > a1 ? 15 : 20)) * Math.PI) / 180
                  const rad2 = ((a2 - (a2 > a1 ? 15 : 20)) * Math.PI) / 180
                  const r = 120
                  const x1 = 150 + r * Math.cos(rad1)
                  const y1 = 150 + r * Math.sin(rad1)
                  const x2 = 150 + r * Math.cos(rad2)
                  const y2 = 150 + r * Math.sin(rad2)

                  // Arrow head direction
                  const arrowRad = rad2
                  const arrowLen = 6
                  const ax = x2 - arrowLen * Math.cos(arrowRad - 0.5)
                  const ay = y2 - arrowLen * Math.sin(arrowRad - 0.5)
                  const bx = x2 - arrowLen * Math.cos(arrowRad + 0.5)
                  const by = y2 - arrowLen * Math.sin(arrowRad + 0.5)

                  return (
                    <g key={`arrow-${i}`}>
                      <path
                        d={`M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`}
                        stroke="#C9912B"
                        strokeWidth="1"
                        opacity="0.3"
                        fill="none"
                      />
                      <polygon
                        points={`${x2},${y2} ${ax},${ay} ${bx},${by}`}
                        fill="#C9912B"
                        opacity="0.3"
                      />
                    </g>
                  )
                })}
              </svg>
            </div>
          </div>

          {/* Text 55% */}
          <div className="lg:w-[55%]">
            <div className="s04-anim mb-4">
              <GoldCircle num="04" />
            </div>
            <h3 className="s04-anim font-serif font-semibold text-white mb-2" style={{ fontSize: '36px' }}>
              {t('s04.title')}
            </h3>
            <p className="s04-anim font-sans mb-4" style={{ fontSize: '16px', color: '#C9912B' }}>
              {t('s04.subtitle')}
            </p>
            <p
              className="s04-anim font-sans font-light mb-8"
              style={{ fontSize: '16px', color: 'rgba(255,255,255,0.65)', lineHeight: '1.7' }}
            >
              {t('s04.desc')}
            </p>

            {/* 5 mini-cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {S04_CAPS.map((c) => (
                <div key={c} className="s04-anim">
                  <MiniCard title={t(`s04.caps.${c}.title`)} desc={t(`s04.caps.${c}.desc`)} />
                </div>
              ))}
            </div>

            {/* Highlight box */}
            <div
              className="s04-anim"
              style={{
                backgroundColor: 'rgba(201,145,43,0.08)',
                padding: '16px',
                borderRadius: '8px',
              }}
            >
              <p className="font-sans font-light" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.65)', lineHeight: '1.6' }}>
                {t('s04.highlight').split(t('s04.highlightAccent')).map((part, i, arr) =>
                  i < arr.length - 1 ? (
                    <span key={i}>
                      {part}
                      <span style={{ color: '#C9912B', fontWeight: 700 }}>{t('s04.highlightAccent')}</span>
                    </span>
                  ) : (
                    <span key={i}>{part}</span>
                  )
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════
          SECTION 4 — FOOTER CTA
          ════════════════════════════════════════════════════════ */}
      <div
        ref={footerRef}
        className="px-4 md:px-6 py-16 md:py-24 text-center"
        style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
      >
        <p
          className="font-sans italic mb-10 max-w-[700px] mx-auto"
          style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)' }}
        >
          {t('footer.disclaimer')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
<Link
            href="/ecosistema"
            className="inline-flex items-center justify-center font-sans font-bold uppercase tracking-wider transition-opacity hover:opacity-90"
            style={{
              fontSize: '13px',
              color: '#C9912B',
              border: '2px solid #C9912B',
              padding: '14px 32px',
              borderRadius: '8px',
              letterSpacing: '0.08em',
            }}
          >
            {t('footer.cta2')}
          </Link>
        </div>
      </div>
    </section>
  )
}
