'use client'

import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { onIdle } from '@/lib/idle'
import { useTranslations } from 'next-intl'

const FLOW_STEPS = ['advisor', 'segnalazione', 'hub', 'execution', 'risultato'] as const
const WHY_KEYS = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6'] as const

export function EcosistemaAdvisorsPage() {
  const t = useTranslations('ecosistemaAdvisors')
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const flowSvgRef = useRef<SVGSVGElement>(null)
  const whyRef = useRef<HTMLDivElement>(null)

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

        if (flowSvgRef.current) {
          // Arrows draw in
          const arrows = flowSvgRef.current.querySelectorAll('.flow-arrow')
          arrows.forEach((arrow) => {
            const el = arrow as SVGLineElement
            const length = el.getTotalLength?.() || 100
            gsap.set(el, { strokeDasharray: length, strokeDashoffset: length })
            gsap.to(el, {
              strokeDashoffset: 0, duration: 0.8, ease: 'power2.inOut',
              scrollTrigger: { trigger: flowSvgRef.current, start: 'top 80%', toggleActions: 'play none none none' },
            })
          })

          // Nodes scale in
          const nodes = flowSvgRef.current.querySelectorAll('.flow-node')
          gsap.from(nodes, {
            scale: 0, opacity: 0, duration: 0.5, stagger: 0.15, ease: 'back.out(1.7)',
            scrollTrigger: { trigger: flowSvgRef.current, start: 'top 80%', toggleActions: 'play none none none' },
          })
        }

        if (whyRef.current) {
          const items = whyRef.current.querySelectorAll('.why-item')
          gsap.from(items, {
            y: 20, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out',
            scrollTrigger: { trigger: whyRef.current, start: 'top 85%', toggleActions: 'play none none none' },
          })
        }
      }, section)
    })

    return () => {
      cancelIdle()
      ctx?.revert()
    }
  }, [])

  // Layout positions for 5 flow nodes (horizontal)
  const positions = [
    { cx: 80, cy: 60 },
    { cx: 230, cy: 60 },
    { cx: 380, cy: 60 },
    { cx: 530, cy: 60 },
    { cx: 680, cy: 60 },
  ]

  return (
    <section ref={sectionRef} className="relative bg-navy-deep min-h-screen pt-28 md:pt-36 pb-24 md:pb-[140px] px-4 md:px-6">
      <div className="max-w-[1280px] mx-auto">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 md:mb-24">
          <span className="block font-sans text-[10px] md:text-[11px] font-semibold tracking-[0.25em] uppercase text-gold mb-4">
            {t('label')}
          </span>
          <h1 className="font-serif text-[32px] md:text-[48px] font-semibold leading-[1.15] text-white mb-6">
            {t('headline')}
          </h1>
          <p className="font-sans text-[16px] md:text-[18px] font-light leading-[1.7] text-white/70 max-w-[700px] mx-auto mb-8">
            {t('subtitle')}
          </p>
          <div className="h-[1.5px] w-16 bg-gold mx-auto" />
        </div>

        {/* Flow Diagram */}
        <div className="mb-20 md:mb-28">
          <span className="block font-sans text-[10px] md:text-[11px] font-semibold tracking-[0.25em] uppercase text-gold mb-10">
            {t('flowLabel')}
          </span>

          <svg ref={flowSvgRef} viewBox="0 0 760 120" className="w-full h-auto max-w-[760px] mx-auto">
            {/* Connecting arrows */}
            {positions.slice(0, -1).map((pos, i) => (
              <line
                key={`arrow-${i}`}
                className="flow-arrow"
                x1={pos.cx + 35}
                y1={pos.cy}
                x2={positions[i + 1].cx - 35}
                y2={positions[i + 1].cy}
                stroke="#C9912B"
                strokeWidth="1.5"
                opacity="0.5"
                markerEnd="url(#arrowhead)"
              />
            ))}

            {/* Arrowhead marker */}
            <defs>
              <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill="#C9912B" opacity="0.5" />
              </marker>
            </defs>

            {/* Nodes */}
            {FLOW_STEPS.map((key, i) => {
              const pos = positions[i]
              const isHub = key === 'hub'
              return (
                <g key={key} className="flow-node" style={{ transformOrigin: `${pos.cx}px ${pos.cy}px` }}>
                  <circle
                    cx={pos.cx}
                    cy={pos.cy}
                    r={isHub ? 35 : 28}
                    fill={isHub ? '#C9912B' : 'none'}
                    opacity={isHub ? 0.15 : 1}
                    stroke="#C9912B"
                    strokeWidth={isHub ? 1.5 : 1}
                  />
                  {!isHub && (
                    <circle cx={pos.cx} cy={pos.cy} r="28" fill="#C9912B" opacity="0.06" />
                  )}
                  <text
                    x={pos.cx}
                    y={pos.cy + 4}
                    textAnchor="middle"
                    fill={isHub ? '#C9912B' : 'white'}
                    fontSize={isHub ? '10' : '9'}
                    fontFamily="DM Sans, sans-serif"
                    fontWeight={isHub ? '700' : '500'}
                    opacity={isHub ? 1 : 0.6}
                  >
                    {t(`flow.${key}`)}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>

        {/* Why join */}
        <div>
          <span className="block font-sans text-[10px] md:text-[11px] font-semibold tracking-[0.25em] uppercase text-gold mb-8">
            {t('whyLabel')}
          </span>
          <div ref={whyRef} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {WHY_KEYS.map((key) => (
              <div
                key={key}
                className="why-item flex items-start gap-3 p-5 rounded-lg bg-white/[0.03] border border-white/[0.06]"
              >
                <svg className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <p className="font-sans text-[14px] md:text-[15px] font-light leading-[1.7] text-white/80">
                  {t(`why.${key}`)}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
