'use client'

import { useRef, useEffect } from 'react'
import { Link } from '@/i18n/navigation'
import { gsap } from '@/lib/gsap'
import { onIdle } from '@/lib/idle'
import { useTranslations } from 'next-intl'

/* ── Constants ── */
const STEP_KEYS = ['s1', 's2', 's3', 's4', 's5'] as const
const CASE_GRADIENTS = [
  'linear-gradient(135deg, #1A2744, #2E3A6E)',
  'linear-gradient(135deg, #1A2744, #1A3A2A)',
  'linear-gradient(135deg, #1A2744, #3A2250)',
]

const PHASES = [
  { label: 'Analisi', key: 'analisi' },
  { label: 'Comprensione', key: 'comprensione' },
  { label: 'Azione', key: 'azione' },
  { label: 'Integrazione', key: 'integrazione' },
  { label: 'Coordinamento', key: 'coordinamento' },
] as const

const CASES: { title: string; phases: Record<string, string> }[] = [
  {
    title: 'Cessione di un\u2019azienda di famiglia',
    phases: {
      analisi: "Un imprenditore vuole cedere l'azienda di famiglia dopo 40 anni di attività.",
      comprensione: 'Minerva analizza il valore reale, la struttura societaria, le implicazioni familiari e fiscali.',
      azione: 'Vengono identificati 12 potenziali acquirenti e costruiti 3 scenari di uscita.',
      integrazione: 'Avvocati, fiscalisti e advisor finanziari lavorano come un unico team coordinato.',
      coordinamento: 'Minerva guida la negoziazione fino al closing, proteggendo il valore e la riservatezza.',
    },
  },
  {
    title: 'Riordino di un patrimonio immobiliare familiare',
    phases: {
      analisi: 'Una famiglia possiede un portafoglio immobiliare frammentato tra più generazioni.',
      comprensione: 'Minerva mappa ogni asset nel contesto patrimoniale complessivo: rendimenti, fiscalità, successione.',
      azione: 'Viene disegnato un piano di ottimizzazione: vendere, riqualificare, consolidare.',
      integrazione: "Specialisti immobiliari, legali e bancari attivati sotto un'unica regia.",
      coordinamento: 'Ogni decisione è coerente con la strategia familiare, non con la singola operazione.',
    },
  },
  {
    title: 'Crescita di un\u2019impresa digitale',
    phases: {
      analisi: 'Un imprenditore digitale cerca capitali per accelerare la crescita senza perdere il controllo.',
      comprensione: 'Minerva valuta il business nel contesto del patrimonio personale e degli obiettivi a lungo termine.',
      azione: 'Vengono strutturate più opzioni: investitori strategici, club deal riservato, linea di credito dedicata.',
      integrazione: 'Il team legale, finanziario e strategico lavora in parallelo con tempi certi.',
      coordinamento: "Minerva rimane al tavolo anche dopo l'operazione, per proteggere il valore creato.",
    },
  },
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
          HERO — full-width tavolo
          ════════════════════════════════════════════════════════ */}
      <div ref={heroRef} className="relative w-full overflow-hidden" style={{ minHeight: '70vh' }}>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/tavolo.png')" }} />
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(13,21,32,0.7)' }} />
        <div className="absolute inset-x-0 bottom-0 h-[160px] bg-gradient-to-t from-[#0D1520] to-transparent" />
        <div className="relative z-10 flex items-center justify-center px-4 md:px-6" style={{ minHeight: '70vh' }}>
          <div className="max-w-[820px] mx-auto text-center pt-24 md:pt-28">
            <h1
              className="hero-anim font-serif font-semibold text-white leading-tight mb-4"
              style={{ fontSize: 'clamp(36px, 6vw, 60px)' }}
            >
              Soluzioni Unified
            </h1>
            <p className="hero-anim font-sans" style={{ fontSize: '17px', color: '#C9912B', lineHeight: '1.6' }}>
              {t('subtitle')}
            </p>
          </div>
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

          <div className="flex flex-col gap-8">
            {CASES.map((c, i) => (
              <div
                key={i}
                className="case-card rounded-xl"
                style={{ background: CASE_GRADIENTS[i], padding: '40px 36px' }}
              >
                <h3 className="font-serif font-semibold text-white mb-8" style={{ fontSize: '24px' }}>
                  {c.title}
                </h3>
                <div className="space-y-6">
                  {PHASES.map((p) => (
                    <div key={p.key}>
                      <span className="font-sans font-bold uppercase tracking-[0.15em] block mb-2" style={{ fontSize: '11px', color: '#C9912B' }}>
                        {p.label}
                      </span>
                      <p className="font-serif" style={{ fontSize: '17px', color: 'rgba(255,255,255,0.9)', lineHeight: '1.55' }}>
                        {c.phases[p.key]}
                      </p>
                    </div>
                  ))}
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
