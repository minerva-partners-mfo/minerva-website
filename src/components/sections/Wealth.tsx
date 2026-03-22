'use client'

import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { onIdle } from '@/lib/idle'
import { useTranslations } from 'next-intl'

const CYCLE_KEYS = ['exit', 'liquidita', 'wm', 'reinvestimento', 'opportunita', 'crescita'] as const
const APPROACH_KEYS = ['a1', 'a2', 'a3', 'a4'] as const

/* ── Positions on the circle (6 nodes, evenly spaced, starting top) ── */
function getNodePos(index: number, total: number, cx: number, cy: number, r: number) {
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2 // start at top
  return {
    x: cx + r * Math.cos(angle),
    y: cy + r * Math.sin(angle),
  }
}

function ApproachIcon({ index }: { index: number }) {
  const cls = 'w-8 h-8 text-gold'
  switch (index) {
    case 0: // Continuità
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M23 4v6h-6" /><path d="M1 20v-6h6" /><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" /></svg>)
    case 1: // Visione integrata
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10A15.3 15.3 0 0112 2z" /></svg>)
    case 2: // Trasparenza
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>)
    case 3: // Protezione
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" /><path d="M9 12l2 2 4-4" /></svg>)
    default:
      return null
  }
}

export function WealthPage() {
  const t = useTranslations('wealth')
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const approachRef = useRef<HTMLDivElement>(null)

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

        if (svgRef.current) {
          // Arc draws progressively
          const arc = svgRef.current.querySelector('.cycle-arc')
          if (arc) {
            const el = arc as SVGCircleElement
            const circumference = 2 * Math.PI * 180 // r=180
            gsap.set(el, { strokeDasharray: circumference, strokeDashoffset: circumference })
            gsap.to(el, {
              strokeDashoffset: 0,
              duration: 2,
              ease: 'power1.inOut',
              scrollTrigger: { trigger: svgRef.current, start: 'top 75%', toggleActions: 'play none none none' },
            })
          }

          // Nodes fade in with stagger
          const nodes = svgRef.current.querySelectorAll('.cycle-node')
          gsap.from(nodes, {
            scale: 0, opacity: 0, duration: 0.5, stagger: 0.2, ease: 'back.out(1.5)',
            scrollTrigger: { trigger: svgRef.current, start: 'top 75%', toggleActions: 'play none none none' },
            delay: 0.5,
          })

          // Center text
          const center = svgRef.current.querySelector('.cycle-center')
          if (center) {
            gsap.from(center, {
              scale: 0, opacity: 0, duration: 0.6, ease: 'back.out(2)',
              scrollTrigger: { trigger: svgRef.current, start: 'top 75%', toggleActions: 'play none none none' },
              delay: 1.2,
            })
          }
        }

        // Approach cards
        if (approachRef.current) {
          const cards = approachRef.current.querySelectorAll('.approach-card')
          gsap.from(cards, {
            y: 30, opacity: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out',
            scrollTrigger: { trigger: approachRef.current, start: 'top 85%', toggleActions: 'play none none none' },
          })
        }
      }, section)
    })

    return () => {
      cancelIdle()
      ctx?.revert()
    }
  }, [])

  const CX = 250
  const CY = 250
  const R = 180

  return (
    <section ref={sectionRef} className="relative bg-navy-deep min-h-screen pt-28 md:pt-36 pb-24 md:pb-[140px] px-4 md:px-6">
      <div className="max-w-[1280px] mx-auto">

        {/* ── Header ── */}
        <div ref={headerRef} className="text-center mb-16 md:mb-24">
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

        {/* ── Circular Diagram ── */}
        <div className="mb-20 md:mb-28">
          <svg
            ref={svgRef}
            viewBox="0 0 500 500"
            className="w-full max-w-[500px] mx-auto h-auto"
            fill="none"
          >
            {/* Background ring */}
            <circle cx={CX} cy={CY} r={R} stroke="white" strokeWidth="0.5" opacity="0.06" />

            {/* Animated arc */}
            <circle
              className="cycle-arc"
              cx={CX}
              cy={CY}
              r={R}
              stroke="#C9912B"
              strokeWidth="1.5"
              opacity="0.4"
              fill="none"
              transform={`rotate(-90 ${CX} ${CY})`}
            />

            {/* Directional arrows along the circle */}
            {CYCLE_KEYS.map((_, i) => {
              const midAngle = ((i + 0.5) / CYCLE_KEYS.length) * Math.PI * 2 - Math.PI / 2
              const ax = CX + (R + 0) * Math.cos(midAngle)
              const ay = CY + (R + 0) * Math.sin(midAngle)
              const tangent = midAngle + Math.PI / 2
              return (
                <polygon
                  key={`arrow-${i}`}
                  points={`${ax + 4 * Math.cos(tangent)},${ay + 4 * Math.sin(tangent)} ${ax - 4 * Math.cos(tangent)},${ay - 4 * Math.sin(tangent)} ${ax + 6 * Math.cos(tangent + 0.3)},${ay + 6 * Math.sin(tangent + 0.3)}`}
                  fill="#C9912B"
                  opacity="0.25"
                />
              )
            })}

            {/* 6 Nodes */}
            {CYCLE_KEYS.map((key, i) => {
              const pos = getNodePos(i, CYCLE_KEYS.length, CX, CY, R)
              return (
                <g key={key} className="cycle-node" style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}>
                  <circle cx={pos.x} cy={pos.y} r="32" fill="#0D1520" />
                  <circle cx={pos.x} cy={pos.y} r="32" fill="#C9912B" opacity="0.1" stroke="#C9912B" strokeWidth="1" />
                  <text
                    x={pos.x}
                    y={pos.y + 4}
                    textAnchor="middle"
                    fill="#C9912B"
                    fontSize="9"
                    fontFamily="DM Sans, sans-serif"
                    fontWeight="600"
                  >
                    {t(`cycle.${key}.title`)}
                  </text>
                </g>
              )
            })}

            {/* Center */}
            <g className="cycle-center" style={{ transformOrigin: `${CX}px ${CY}px` }}>
              <circle cx={CX} cy={CY} r="55" fill="#C9912B" opacity="0.08" />
              <circle cx={CX} cy={CY} r="55" fill="none" stroke="#C9912B" strokeWidth="1.5" />
              <text x={CX} y={CY - 6} textAnchor="middle" fill="white" fontSize="10" fontFamily="DM Sans, sans-serif" fontWeight="600">
                {t('center')}
              </text>
              <line x1={CX - 15} y1={CY + 6} x2={CX + 15} y2={CY + 6} stroke="#C9912B" strokeWidth="0.5" opacity="0.4" />
            </g>
          </svg>

          {/* Center description below */}
          <p className="text-center font-sans text-[15px] md:text-base font-light leading-[1.7] text-white/60 max-w-[400px] mx-auto mt-6">
            {t('centerSub')}
          </p>
        </div>

        {/* ── Cycle step descriptions ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-20 md:mb-28">
          {CYCLE_KEYS.map((key) => (
            <div
              key={key}
              className="p-6 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-gold/20 transition-all duration-300"
            >
              <h4 className="font-serif text-[17px] font-semibold text-gold leading-[1.2] mb-2">
                {t(`cycle.${key}.title`)}
              </h4>
              <p className="font-sans text-[13px] md:text-[14px] font-light leading-[1.7] text-white/60">
                {t(`cycle.${key}.desc`)}
              </p>
            </div>
          ))}
        </div>

        {/* ── Approach ── */}
        <div>
          <span className="block font-sans text-[10px] md:text-[11px] font-semibold tracking-[0.25em] uppercase text-gold mb-8">
            {t('approachLabel')}
          </span>
          <div ref={approachRef} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {APPROACH_KEYS.map((key, i) => (
              <div
                key={key}
                className="approach-card flex gap-5 p-6 md:p-8 rounded-xl bg-gold/[0.05] border border-gold/[0.1] hover:border-gold/25 transition-all duration-300"
              >
                <div className="flex-shrink-0 pt-1">
                  <ApproachIcon index={i} />
                </div>
                <div>
                  <h3 className="font-serif text-[18px] md:text-[20px] font-semibold text-white leading-[1.2] mb-2">
                    {t(`approach.${key}.title`)}
                  </h3>
                  <p className="font-sans text-[14px] font-light leading-[1.7] text-white/65">
                    {t(`approach.${key}.desc`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
