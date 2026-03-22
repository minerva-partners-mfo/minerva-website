'use client'

import { useRef, useEffect } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { onIdle } from '@/lib/idle'
import { useTranslations } from 'next-intl'

/* ═══════════════════════════════════════════
   Layout constants — SVG coordinate space
   ═══════════════════════════════════════════ */

const CX = 500
const CY = 500
const CENTER_R = 170
const HUB_R = 270
const HUB_NODE_R = 65
const PARTNER_R = 385
const PARTNER_NODE_R = 38
const FRIENDS_R = 470

function polar(angle: number, radius: number) {
  const rad = (angle * Math.PI) / 180
  return { x: CX + radius * Math.cos(rad), y: CY + radius * Math.sin(rad) }
}

const HUB_NODES = [
  { key: 'ma', angle: -90 },
  { key: 're', angle: 0 },
  { key: 'st', angle: 90 },
  { key: 'wm', angle: 180 },
] as const

const PARTNER_NODES = [
  { key: 'legal', angle: -112.5 },
  { key: 'tax', angle: -67.5 },
  { key: 'banking', angle: -22.5 },
  { key: 'energy', angle: 22.5 },
  { key: 'digital', angle: 67.5 },
  { key: 'insurance', angle: 112.5 },
  { key: 'international', angle: 157.5 },
  { key: 'uhnwi', angle: 202.5 },
] as const

export function ComeOperiamo() {
  const t = useTranslations('comeOperiamo')
  const sectionRef = useRef<HTMLDivElement>(null)

  // Text step refs
  const text1Ref = useRef<HTMLDivElement>(null)
  const text2Ref = useRef<HTMLDivElement>(null)
  const text3Ref = useRef<HTMLDivElement>(null)
  const text4Ref = useRef<HTMLDivElement>(null)
  const text5Ref = useRef<HTMLDivElement>(null)

  // SVG element refs
  const centerRef = useRef<SVGGElement>(null)
  const hubGroupRef = useRef<SVGGElement>(null)
  const hubLinesRef = useRef<SVGGElement>(null)
  const partnerGroupRef = useRef<SVGGElement>(null)
  const partnerLinesRef = useRef<SVGGElement>(null)
  const partnerRingRef = useRef<SVGCircleElement>(null)
  const friendsRingRef = useRef<SVGCircleElement>(null)
  const friendsDotsRef = useRef<SVGGElement>(null)
  const youGlowRef = useRef<SVGCircleElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    let ctx: ReturnType<typeof gsap.context> | undefined
    const cancelIdle = onIdle(() => {
      if (!sectionRef.current) return
      ctx = gsap.context(() => {
      const textSteps = [text1Ref, text2Ref, text3Ref, text4Ref, text5Ref]
        .map((r) => r.current)
        .filter(Boolean) as HTMLDivElement[]

      // ── Initial states ──
      // Use svgOrigin for SVG elements (GSAP requires this instead of transformOrigin)
      gsap.set(centerRef.current, { scale: 0, svgOrigin: `${CX} ${CY}`, zIndex: 10 })
      gsap.set([hubGroupRef.current, hubLinesRef.current], { opacity: 0 })
      gsap.set([partnerGroupRef.current, partnerLinesRef.current, partnerRingRef.current], { opacity: 0 })
      gsap.set([friendsRingRef.current, friendsDotsRef.current], { opacity: 0 })
      gsap.set(youGlowRef.current, { opacity: 0 })
      textSteps.forEach((el, i) => {
        if (i > 0) gsap.set(el, { opacity: 0, y: 30 })
      })

      // Hub nodes start at scale 0 — each node is translated to its position,
      // so scale from its own local origin (0,0 in its translated space)
      if (hubGroupRef.current) {
        const hubNodes = hubGroupRef.current.querySelectorAll('.hub-node')
        hubNodes.forEach((node, i) => {
          const pos = hubPositions[i]
          gsap.set(node, { scale: 0, svgOrigin: `${pos.x} ${pos.y}` })
        })
      }
      // Partner nodes start at scale 0
      if (partnerGroupRef.current) {
        const partnerNodes = partnerGroupRef.current.querySelectorAll('.partner-node')
        partnerNodes.forEach((node, i) => {
          const pos = partnerPositions[i]
          gsap.set(node, { scale: 0, svgOrigin: `${pos.x} ${pos.y}` })
        })
      }

      // Hub lines: stroke-dashoffset setup
      if (hubLinesRef.current) {
        hubLinesRef.current.querySelectorAll('line').forEach((line) => {
          const len = Math.hypot(
            parseFloat(line.getAttribute('x2')!) - parseFloat(line.getAttribute('x1')!),
            parseFloat(line.getAttribute('y2')!) - parseFloat(line.getAttribute('y1')!)
          )
          gsap.set(line, { strokeDasharray: len, strokeDashoffset: len })
        })
      }
      // Partner lines: stroke-dashoffset setup
      if (partnerLinesRef.current) {
        partnerLinesRef.current.querySelectorAll('line').forEach((line) => {
          const len = Math.hypot(
            parseFloat(line.getAttribute('x2')!) - parseFloat(line.getAttribute('x1')!),
            parseFloat(line.getAttribute('y2')!) - parseFloat(line.getAttribute('y1')!)
          )
          gsap.set(line, { strokeDasharray: len, strokeDashoffset: len })
        })
      }

      // Friends ring dashoffset
      if (friendsRingRef.current) {
        const circ = 2 * Math.PI * FRIENDS_R
        gsap.set(friendsRingRef.current, { strokeDasharray: '12 8', strokeDashoffset: circ })
      }

      // ── Master timeline ──
      const master = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=400%',
          pin: true,
          scrub: 1,
          pinSpacing: true,
        },
      })

      // ── Step 1: Center (0 → 0.18) ──
      master
        .to(centerRef.current, { scale: 1, duration: 0.08, ease: 'back.out(1.7)', svgOrigin: `${CX} ${CY}` }, 0)
        .from(text1Ref.current, { opacity: 0, y: 30, duration: 0.06 }, 0.02)
        .to(text1Ref.current, { opacity: 0, duration: 0.04 }, 0.16)

      // ── Step 2: Hub (0.2 → 0.38) ──
      master
        .to(hubGroupRef.current, { opacity: 1, duration: 0.01 }, 0.2)
        .to(hubLinesRef.current, { opacity: 1, duration: 0.01 }, 0.2)

      if (hubLinesRef.current) {
        master.to(hubLinesRef.current.querySelectorAll('line'), {
          strokeDashoffset: 0, duration: 0.06, stagger: 0.015, ease: 'power1.inOut',
        }, 0.2)
      }
      if (hubGroupRef.current) {
        master.to(hubGroupRef.current.querySelectorAll('.hub-node'), {
          scale: 1, duration: 0.05, stagger: 0.015, ease: 'back.out(1.7)',
        }, 0.23)
      }
      master
        .to(text2Ref.current, { opacity: 1, y: 0, duration: 0.06 }, 0.22)
        .to(text2Ref.current, { opacity: 0, duration: 0.04 }, 0.36)

      // ── Step 3: Partners (0.4 → 0.58) ──
      master
        .to(partnerRingRef.current, { opacity: 0.15, duration: 0.06 }, 0.4)
        .to(partnerLinesRef.current, { opacity: 1, duration: 0.01 }, 0.4)

      if (partnerLinesRef.current) {
        master.to(partnerLinesRef.current.querySelectorAll('line'), {
          strokeDashoffset: 0, duration: 0.05, stagger: 0.01, ease: 'power1.inOut',
        }, 0.41)
      }
      if (partnerGroupRef.current) {
        master.to(partnerGroupRef.current, { opacity: 1, duration: 0.01 }, 0.4)
        master.to(partnerGroupRef.current.querySelectorAll('.partner-node'), {
          scale: 1, duration: 0.04, stagger: 0.01, ease: 'back.out(1.7)',
        }, 0.43)
      }
      master
        .to(text3Ref.current, { opacity: 1, y: 0, duration: 0.06 }, 0.42)
        .to(text3Ref.current, { opacity: 0, duration: 0.04 }, 0.56)

      // ── Step 4: Friends (0.6 → 0.78) ──
      master.to(friendsRingRef.current, {
        opacity: 1, strokeDashoffset: 0, duration: 0.1, ease: 'power1.inOut',
      }, 0.6)
      master.to(friendsDotsRef.current, { opacity: 1, duration: 0.06 }, 0.64)
      master
        .to(text4Ref.current, { opacity: 1, y: 0, duration: 0.06 }, 0.62)
        .to(text4Ref.current, { opacity: 0, duration: 0.04 }, 0.76)

      // ── Step 5: YOU (0.8 → 1) ──
      master.to(youGlowRef.current, {
        opacity: 0.3, duration: 0.08, ease: 'power1.inOut',
      }, 0.8)
      master.to(text5Ref.current, { opacity: 1, y: 0, duration: 0.08 }, 0.82)
    }, section)
    })

    return () => {
      cancelIdle()
      ctx?.revert()
    }
  }, [])

  const hubPositions = HUB_NODES.map((n) => ({ ...n, ...polar(n.angle, HUB_R) }))
  const partnerPositions = PARTNER_NODES.map((n) => ({ ...n, ...polar(n.angle, PARTNER_R) }))
  const friendsDots = Array.from({ length: 8 }, (_, i) => polar(i * 45 - 90, FRIENDS_R))

  return (
    <div ref={sectionRef} className="relative h-screen overflow-hidden bg-navy-deep">
      <div className="h-full flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-16 px-4 md:px-6 max-w-[1300px] mx-auto">

        {/* ── SVG Diagram ── */}
        <div className="relative w-[85vw] max-w-[400px] lg:w-full lg:max-w-[750px] shrink-0">
          <svg viewBox="0 0 1000 1000" className="w-full h-auto">

            {/* Outer glow ring (Step 5) */}
            <circle
              ref={youGlowRef}
              cx={CX} cy={CY} r={FRIENDS_R + 25}
              fill="none" stroke="#C9912B" strokeWidth="2" opacity="0"
              filter="url(#glow)"
            />

            {/* Friends ring (Step 4) */}
            <circle
              ref={friendsRingRef}
              cx={CX} cy={CY} r={FRIENDS_R}
              fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" opacity="0"
            />

            {/* Friends pulsing dots (Step 4) */}
            <g ref={friendsDotsRef} opacity="0">
              {friendsDots.map((pos, i) => (
                <circle key={i} cx={pos.x} cy={pos.y} r="6" fill="#C9912B" opacity="0.4">
                  <animate
                    attributeName="opacity" values="0.3;0.7;0.3"
                    dur="2.5s" repeatCount="indefinite" begin={`${i * 0.3}s`}
                  />
                  <animate
                    attributeName="r" values="5;8;5"
                    dur="2.5s" repeatCount="indefinite" begin={`${i * 0.3}s`}
                  />
                </circle>
              ))}
            </g>

            {/* Partner ring background (Step 3) */}
            <circle
              ref={partnerRingRef}
              cx={CX} cy={CY} r={PARTNER_R}
              fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" opacity="0"
            />

            {/* Partner lines (Step 3) */}
            <g ref={partnerLinesRef} opacity="0">
              {partnerPositions.map((p) => (
                <line
                  key={p.key} x1={CX} y1={CY} x2={p.x} y2={p.y}
                  stroke="rgba(255,255,255,0.06)" strokeWidth="1"
                  strokeDasharray="4 4"
                />
              ))}
            </g>

            {/* Partner nodes (Step 3) */}
            <g ref={partnerGroupRef} opacity="0">
              {partnerPositions.map((p) => (
                <g key={p.key} className="partner-node" transform={`translate(${p.x},${p.y})`}>
                  <circle
                    r={PARTNER_NODE_R}
                    fill="rgba(255,255,255,0.02)"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="1"
                  />
                  <text
                    textAnchor="middle" dy="0.35em"
                    className="fill-white/50 font-sans font-semibold uppercase"
                    style={{ fontSize: '9px', letterSpacing: '0.08em' }}
                  >
                    {t(`partners.${p.key}`)}
                  </text>
                </g>
              ))}
            </g>

            {/* Hub lines (Step 2) */}
            <g ref={hubLinesRef} opacity="0">
              {hubPositions.map((h) => (
                <line
                  key={h.key} x1={CX} y1={CY} x2={h.x} y2={h.y}
                  stroke="#C9912B" strokeWidth="1.5" opacity="0.5"
                />
              ))}
            </g>

            {/* Hub nodes (Step 2) */}
            <g ref={hubGroupRef} opacity="0">
              {hubPositions.map((h) => {
                const lines = t(`hub.${h.key}`).split('\n')
                return (
                  <g key={h.key} className="hub-node" transform={`translate(${h.x},${h.y})`}>
                    <circle
                      r={HUB_NODE_R}
                      fill="rgba(201,145,43,0.1)"
                      stroke="#C9912B"
                      strokeWidth="1.5"
                    />
                    {lines.length === 1 ? (
                      <text
                        textAnchor="middle" dy="0.35em"
                        className="fill-white font-serif font-bold uppercase"
                        style={{ fontSize: '10px', letterSpacing: '0.06em' }}
                      >
                        {lines[0]}
                      </text>
                    ) : (
                      <>
                        <text
                          textAnchor="middle" dy="-0.2em"
                          className="fill-white font-serif font-bold uppercase"
                          style={{ fontSize: '10px', letterSpacing: '0.06em' }}
                        >
                          {lines[0]}
                        </text>
                        <text
                          textAnchor="middle" dy="1.1em"
                          className="fill-white font-serif font-bold uppercase"
                          style={{ fontSize: '10px', letterSpacing: '0.06em' }}
                        >
                          {lines[1]}
                        </text>
                      </>
                    )}
                  </g>
                )
              })}
            </g>

            {/* Center (Step 1) — largest, most prominent element */}
            <g ref={centerRef}>
              {/* Soft radial glow behind center */}
              <circle cx={CX} cy={CY} r={CENTER_R + 30} fill="none" stroke="#C9912B" strokeWidth="1" opacity="0.08" />
              {/* Outer glow halo */}
              <circle cx={CX} cy={CY} r={CENTER_R + 12} fill="none" stroke="#C9912B" strokeWidth="2" opacity="0.2" />
              {/* Main circle with thick gold border */}
              <circle cx={CX} cy={CY} r={CENTER_R} fill="rgba(201,145,43,0.12)" stroke="#C9912B" strokeWidth="3" />
              {/* Inner ring — double border effect */}
              <circle cx={CX} cy={CY} r={CENTER_R - 10} fill="none" stroke="#C9912B" strokeWidth="1.5" opacity="0.6" />
              <text
                x={CX} y={CY - 14} textAnchor="middle"
                className="fill-gold font-sans font-bold uppercase"
                style={{ fontSize: '20px', letterSpacing: '0.2em' }}
              >
                {t('center.line1')}
              </text>
              <text
                x={CX} y={CY + 20} textAnchor="middle"
                className="fill-gold font-sans font-bold uppercase"
                style={{ fontSize: '20px', letterSpacing: '0.2em' }}
              >
                {t('center.line2')}
              </text>
            </g>

            {/* Defs */}
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          </svg>
        </div>

        {/* ── Text column ── */}
        <div className="relative flex-1 min-h-[200px] lg:min-h-[280px] flex items-center w-full">
          {[text1Ref, text2Ref, text3Ref, text4Ref, text5Ref].map((ref, i) => (
            <div key={i} ref={ref} className="absolute inset-0 flex items-center">
              <div className="w-full">
                <span className="block font-sans text-[10px] md:text-[11px] font-semibold tracking-[0.25em] uppercase text-gold mb-3 lg:mb-4">
                  {t(`steps.${i + 1}.label`)}
                </span>
                <h2 className="font-serif text-[20px] md:text-[28px] lg:text-[40px] font-semibold leading-[1.15] text-white mb-3 lg:mb-5">
                  {t(`steps.${i + 1}.headline`)}
                </h2>
                <p className="font-sans text-[13px] md:text-[15px] lg:text-base font-light leading-[1.7] text-white/65 max-w-lg">
                  {t(`steps.${i + 1}.text`)}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
