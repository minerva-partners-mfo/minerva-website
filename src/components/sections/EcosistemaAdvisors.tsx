'use client'

import { useRef, useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

/* ── FadeIn helper (IntersectionObserver) ── */
function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => setVisible(true), delay); obs.disconnect() }
    }, { threshold: 0.15 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(30px)',
      transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
    }}>{children}</div>
  )
}

/* ── Constants ── */
const FLOW_KEYS = ['s1', 's2', 's3', 's4', 's5'] as const
const WHY_KEYS = ['w1', 'w2', 'w3', 'w4', 'w5', 'w6'] as const
const STEP_KEYS = ['s1', 's2', 's3', 's4'] as const

export function EcosistemaAdvisorsPage() {
  const t = useTranslations('ecosistemaAdvisors')

  return (
    <section className="relative bg-[#0D1520] min-h-screen pt-[160px] pb-24 md:pb-[140px] px-4 md:px-6">
      <div className="max-w-[1280px] mx-auto">

        {/* ── HERO ── */}
        <FadeIn className="text-center mb-20 md:mb-28">
          <h1 className="font-serif text-[32px] md:text-[48px] font-semibold leading-[1.15] text-white mb-6">
            {t('headline')}
          </h1>
          <p className="font-serif text-[20px] md:text-[24px] font-normal leading-[1.4] text-[#C9912B]">
            {t('subtitle')}
          </p>
        </FadeIn>

        {/* ── BLOCK 1 — THE ROLE ── */}
        <FadeIn className="mb-12 md:mb-16">
          <p className="font-sans text-[17px] font-light leading-[1.8] text-white/65 max-w-[900px] mx-auto text-center">
            {t('role')}
          </p>
        </FadeIn>

        {/* Flow Diagram */}
        <FadeIn className="mb-20 md:mb-28">
          {/* Desktop: horizontal */}
          <div className="hidden md:flex items-center justify-center gap-0">
            {FLOW_KEYS.map((key, i) => (
              <div key={key} className="flex items-center">
                {/* Circle */}
                <div className="w-[80px] h-[80px] rounded-full border border-[#C9912B] flex items-center justify-center text-center px-1">
                  <span className="font-sans text-[11px] font-medium leading-[1.3] text-white">
                    {t(`flow.${key}`)}
                  </span>
                </div>
                {/* Arrow between circles */}
                {i < FLOW_KEYS.length - 1 && (
                  <div className="flex items-center mx-2">
                    <div className="w-8 h-px bg-[#C9912B]/50" />
                    <svg className="w-2.5 h-2.5 text-[#C9912B]/50 -ml-px" viewBox="0 0 10 10" fill="currentColor">
                      <polygon points="0,0 10,5 0,10" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile: vertical */}
          <div className="flex md:hidden flex-col items-center gap-0">
            {FLOW_KEYS.map((key, i) => (
              <div key={key} className="flex flex-col items-center">
                {/* Circle */}
                <div className="w-[80px] h-[80px] rounded-full border border-[#C9912B] flex items-center justify-center text-center px-1">
                  <span className="font-sans text-[11px] font-medium leading-[1.3] text-white">
                    {t(`flow.${key}`)}
                  </span>
                </div>
                {/* Arrow between circles */}
                {i < FLOW_KEYS.length - 1 && (
                  <div className="flex flex-col items-center my-2">
                    <div className="w-px h-6 bg-[#C9912B]/50" />
                    <svg className="w-2.5 h-2.5 text-[#C9912B]/50 -mt-px" viewBox="0 0 10 10" fill="currentColor">
                      <polygon points="0,0 10,0 5,10" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </FadeIn>

        {/* ── BLOCK 2 — WHY (6 items) ── */}
        <FadeIn className="mb-20 md:mb-28">
          <h2 className="font-serif text-[24px] md:text-[28px] font-semibold text-white mb-10">
            {t('whyTitle')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {WHY_KEYS.map((key, i) => (
              <FadeIn key={key} delay={i * 80}>
                <div className="bg-white/[0.03] p-6 rounded-xl h-full">
                  <h4 className="font-sans text-[14px] font-bold text-[#C9912B] mb-2">
                    {t(`whyItems.${key}.title`)}
                  </h4>
                  <p className="font-sans text-[14px] font-light leading-[1.7] text-white/60">
                    {t(`whyItems.${key}.desc`)}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>

        {/* ── BLOCK 3 — HOW TO JOIN (Timeline) ── */}
        <FadeIn className="mb-20 md:mb-28">
          <h2 className="font-serif text-[24px] md:text-[28px] font-semibold text-white mb-10">
            {t('howTitle')}
          </h2>
          <div className="relative pl-10 md:pl-14">
            {/* Vertical gold line */}
            <div className="absolute left-[15px] md:left-[23px] top-0 bottom-0 w-px bg-[#C9912B]/25" />

            {STEP_KEYS.map((key, i) => (
              <FadeIn key={key} delay={i * 150} className="relative mb-10 last:mb-0">
                {/* Numbered circle */}
                <div className="absolute -left-10 md:-left-14 top-1 w-8 h-8 rounded-full border-2 border-[#C9912B]/40 bg-[#C9912B]/10 flex items-center justify-center">
                  <span className="font-sans text-[11px] font-bold text-[#C9912B]">{i + 1}</span>
                </div>
                <h4 className="font-serif text-[18px] md:text-[20px] font-semibold text-white mb-2">
                  {t(`steps.${key}.title`)}
                </h4>
                <p className="font-sans text-[14px] md:text-[15px] font-light leading-[1.7] text-white/65">
                  {t(`steps.${key}.desc`)}
                </p>
              </FadeIn>
            ))}
          </div>
        </FadeIn>

        {/* ── CTA ── */}
        <FadeIn className="text-center">
          <Link
            href="/contatti"
            className="inline-block bg-[#C9912B] text-white font-sans text-[15px] font-semibold tracking-wide px-10 py-4 rounded-lg hover:bg-[#b07f24] transition-colors duration-300"
          >
            {t('cta')}
          </Link>
        </FadeIn>

      </div>
    </section>
  )
}
