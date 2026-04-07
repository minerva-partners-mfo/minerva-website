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
const MOTIVI_KEYS = ['m1', 'm2', 'm3'] as const
const WHY_KEYS = ['w1', 'w2', 'w3', 'w4', 'w5', 'w6'] as const
const STEP_KEYS = ['s1', 's2', 's3', 's4'] as const

export function EcosistemaFriendsPage() {
  const t = useTranslations('ecosistemaFriends')

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

        {/* ── BLOCK 1 — 3 MOTIVI ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 md:mb-28">
          {MOTIVI_KEYS.map((key, i) => (
            <FadeIn key={key} delay={i * 120}>
              <div className="bg-white/[0.03] border-t-[3px] border-[#C9912B] p-8 rounded-xl h-full">
                <h3 className="font-serif text-[22px] font-semibold text-[#C9912B] leading-[1.2] mb-4">
                  {t(`motivi.${key}.title`)}
                </h3>
                <p className="font-sans text-[15px] font-light leading-[1.7] text-white/65">
                  {t(`motivi.${key}.desc`)}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

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
