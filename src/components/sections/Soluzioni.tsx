'use client'

import { useRef, useEffect } from 'react'
import { Link } from '@/i18n/navigation'
import { gsap } from '@/lib/gsap'
import { onIdle } from '@/lib/idle'
import { useTranslations } from 'next-intl'

/* ── Constants ── */
const STEP_KEYS = ['s1', 's2', 's3', 's4', 's5'] as const
const CASE_KEYS = ['c1', 'c2', 'c3'] as const
const CASE_GRADIENTS = [
  'linear-gradient(135deg, #1A2744, #2E3A6E)',
  'linear-gradient(135deg, #1A2744, #1A3A2A)',
  'linear-gradient(135deg, #1A2744, #3A2250)',
]

export function SoluzioniPage() {
  const t = useTranslations('soluzioni')

  const sectionRef = useRef<HTMLElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const casesRef = useRef<HTMLDivElement>(null)
  const dualRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    let ctx: ReturnType<typeof gsap.context> | undefined
    const cancelIdle = onIdle(() => {
      if (!sectionRef.current) return
      ctx = gsap.context(() => {
        /* Hero */
        if (heroRef.current) {
          gsap.from(heroRef.current.querySelectorAll('.hero-anim'), {
            y: 40, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out',
            scrollTrigger: { trigger: heroRef.current, start: 'top 85%', toggleActions: 'play none none none' },
          })
        }

        /* Timeline steps */
        if (timelineRef.current) {
          gsap.from(timelineRef.current.querySelectorAll('.tl-step'), {
            y: 30, opacity: 0, duration: 0.6, stagger: 0.18, ease: 'power2.out',
            scrollTrigger: { trigger: timelineRef.current, start: 'top 80%', toggleActions: 'play none none none' },
          })
          const line = timelineRef.current.querySelector('.tl-line')
          if (line) {
            gsap.from(line, {
              scaleX: 0, duration: 1.2, ease: 'power2.inOut',
              scrollTrigger: { trigger: timelineRef.current, start: 'top 80%', toggleActions: 'play none none none' },
            })
          }
        }

        /* Case studies */
        if (casesRef.current) {
          gsap.from(casesRef.current.querySelectorAll('.case-card'), {
            y: 40, opacity: 0, duration: 0.7, stagger: 0.2, ease: 'power2.out',
            scrollTrigger: { trigger: casesRef.current, start: 'top 80%', toggleActions: 'play none none none' },
          })
        }

        /* Dual view */
        if (dualRef.current) {
          gsap.from(dualRef.current.querySelectorAll('.dual-card'), {
            y: 30, opacity: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out',
            scrollTrigger: { trigger: dualRef.current, start: 'top 85%', toggleActions: 'play none none none' },
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
    <section ref={sectionRef} className="relative min-h-screen" style={{ backgroundColor: '#0D1520' }}>

      {/* ════════════════════════════════════════════════════════
          HERO
          ════════════════════════════════════════════════════════ */}
      <div ref={heroRef} className="min-h-[60vh] flex items-center justify-center px-4 md:px-6">
        <div className="max-w-[750px] mx-auto text-center py-24 md:py-32">
          <h1
            className="hero-anim font-serif font-semibold text-white leading-tight mb-4"
            style={{ fontSize: 'clamp(32px, 5vw, 48px)' }}
          >
            {t('headline')}
          </h1>
          <p className="hero-anim font-sans" style={{ fontSize: '17px', color: '#C9912B', lineHeight: '1.6' }}>
            {t('subtitle')}
          </p>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════
          BLOCCO 1 — Dal problema alla soluzione (Timeline)
          ════════════════════════════════════════════════════════ */}
      <div className="px-4 md:px-6 py-20 md:py-28" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="max-w-[1100px] mx-auto">
          <h2 className="font-serif font-semibold text-white text-center mb-14" style={{ fontSize: '28px' }}>
            {t('timelineTitle')}
          </h2>

          <div ref={timelineRef} className="relative">
            {/* Horizontal line (desktop) */}
            <div
              className="tl-line hidden md:block absolute top-[24px] left-0 right-0 h-px origin-left"
              style={{ backgroundColor: 'rgba(201,145,43,0.2)' }}
            />

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4">
              {STEP_KEYS.map((key, i) => (
                <div key={key} className="tl-step relative">
                  {/* Numbered circle */}
                  <div
                    className="flex items-center justify-center rounded-full mb-4 mx-auto md:mx-0"
                    style={{
                      width: '48px',
                      height: '48px',
                      border: '2px solid #C9912B',
                      backgroundColor: 'rgba(201,145,43,0.08)',
                    }}
                  >
                    <span className="font-sans font-bold" style={{ fontSize: '14px', color: '#C9912B' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="font-serif font-semibold text-white mb-2 text-center md:text-left" style={{ fontSize: '18px' }}>
                    {t(`steps.${key}.title`)}
                  </h3>
                  <p
                    className="font-sans font-light text-center md:text-left"
                    style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', lineHeight: '1.7' }}
                  >
                    {t(`steps.${key}.desc`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════
          BLOCCO 2 — Esempi di soluzioni integrate
          ════════════════════════════════════════════════════════ */}
      <div className="px-4 md:px-6 py-20 md:py-28" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div ref={casesRef} className="max-w-[1100px] mx-auto">
          <h2 className="font-serif font-semibold text-white mb-12" style={{ fontSize: '28px' }}>
            {t('casesTitle')}
          </h2>

          <div className="flex flex-col gap-6">
            {CASE_KEYS.map((key, i) => (
              <div
                key={key}
                className="case-card rounded-xl"
                style={{ background: CASE_GRADIENTS[i], padding: '32px' }}
              >
                <h3 className="font-serif font-semibold text-white mb-4" style={{ fontSize: '22px' }}>
                  {t(`cases.${key}.title`)}
                </h3>

                <div className="space-y-4">
                  <div>
                    <span className="font-sans font-bold uppercase tracking-wider mb-1 block" style={{ fontSize: '10px', color: '#C9912B' }}>
                      {t('caseLabels.situazione')}
                    </span>
                    <p className="font-sans font-light" style={{ fontSize: '15px', color: 'rgba(255,255,255,0.65)', lineHeight: '1.7' }}>
                      {t(`cases.${key}.situazione`)}
                    </p>
                  </div>

                  <div>
                    <span className="font-sans font-bold uppercase tracking-wider mb-1 block" style={{ fontSize: '10px', color: '#C9912B' }}>
                      {t('caseLabels.soluzione')}
                    </span>
                    <p className="font-sans font-light" style={{ fontSize: '15px', color: 'rgba(255,255,255,0.65)', lineHeight: '1.7' }}>
                      {t(`cases.${key}.soluzione`)}
                    </p>
                  </div>

                  <div
                    className="rounded-lg mt-2"
                    style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '12px 16px' }}
                  >
                    <p className="font-sans" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.50)' }}>
                      {t(`cases.${key}.team`)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════
          BLOCCO 3 — Doppia vista
          ════════════════════════════════════════════════════════ */}
      <div className="px-4 md:px-6 py-20 md:py-28" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div ref={dualRef} className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            className="dual-card rounded-xl"
            style={{
              backgroundColor: 'rgba(201,145,43,0.06)',
              border: '1px solid rgba(201,145,43,0.15)',
              padding: '32px',
              borderRadius: '12px',
            }}
          >
            <h3 className="font-sans font-bold uppercase tracking-wider mb-3" style={{ fontSize: '12px', color: '#C9912B' }}>
              {t('dual.left.label')}
            </h3>
            <p className="font-sans font-light" style={{ fontSize: '15px', color: 'rgba(255,255,255,0.65)', lineHeight: '1.7' }}>
              {t('dual.left.desc')}
            </p>
          </div>
          <div
            className="dual-card rounded-xl"
            style={{
              backgroundColor: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              padding: '32px',
              borderRadius: '12px',
            }}
          >
            <h3 className="font-sans font-bold uppercase tracking-wider mb-3" style={{ fontSize: '12px', color: '#C9912B' }}>
              {t('dual.right.label')}
            </h3>
            <p className="font-sans font-light" style={{ fontSize: '15px', color: 'rgba(255,255,255,0.65)', lineHeight: '1.7' }}>
              {t('dual.right.desc')}
            </p>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════
          CTA
          ════════════════════════════════════════════════════════ */}
      <div ref={ctaRef} className="px-4 md:px-6 py-20 md:py-28 text-center" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <Link
          href="/contatti"
          className="inline-flex items-center justify-center font-sans font-bold uppercase tracking-wider text-white transition-opacity hover:opacity-90"
          style={{
            fontSize: '13px',
            backgroundColor: '#C9912B',
            padding: '14px 32px',
            borderRadius: '8px',
            letterSpacing: '0.08em',
          }}
        >
          {t('cta')}
        </Link>
      </div>
    </section>
  )
}
