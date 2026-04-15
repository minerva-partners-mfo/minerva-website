'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslations } from 'next-intl'

const VERITAS_LETTERS = ['v', 'e', 'r', 'i', 't', 'a', 's'] as const

function RevealBlock({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function ManifestoSection() {
  const t = useTranslations('landing.manifesto')
  const veritasRef = useRef<HTMLDivElement>(null)
  const veritasInView = useInView(veritasRef, { once: true, margin: '-80px' })

  return (
    <section
      className="relative py-16 md:py-24 px-6"
      style={{ background: '#0a0f1c' }}
    >
      <div className="max-w-[820px] mx-auto space-y-14 md:space-y-20">
        {/* Quote 1 */}
        <RevealBlock>
          <p
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: 'clamp(22px, 3.5vw, 32px)',
              color: 'rgba(255,255,255,0.85)',
              lineHeight: 1.6,
              textAlign: 'center',
              margin: 0,
            }}
          >
            {t('quote1')}
          </p>
        </RevealBlock>

        {/* VERITAS */}
        <RevealBlock delay={0.1}>
          <div className="text-center">
            <p
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontStyle: 'italic',
                fontWeight: 300,
                fontSize: 'clamp(18px, 2.5vw, 24px)',
                color: 'rgba(255,255,255,0.7)',
                lineHeight: 1.6,
                margin: '0 0 32px 0',
              }}
            >
              {t('veritasIntro')}{' '}
              <span style={{ color: '#C5A059', fontWeight: 600, fontStyle: 'normal' }}>
                {t('veritasWord')}
              </span>
              .
            </p>

            <motion.div
              ref={veritasRef}
              className="flex flex-wrap justify-center gap-x-3 gap-y-2 md:gap-x-5"
              initial={{ opacity: 0 }}
              animate={veritasInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {VERITAS_LETTERS.map((key, i) => (
                <motion.span
                  key={key}
                  className="whitespace-nowrap"
                  initial={{ opacity: 0, y: 10 }}
                  animate={veritasInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
                  style={{
                    fontFamily: 'var(--font-dm-sans)',
                    fontSize: 'clamp(12px, 1.6vw, 15px)',
                    color: 'rgba(255,255,255,0.55)',
                    letterSpacing: '0.04em',
                  }}
                >
                  <span style={{ color: '#C5A059', fontWeight: 700, fontSize: '1.3em' }}>
                    {key.toUpperCase()}
                  </span>
                  {t(key)}
                  {i < VERITAS_LETTERS.length - 1 && (
                    <span style={{ color: 'rgba(197,160,89,0.3)', marginLeft: 'clamp(6px, 1.2vw, 14px)' }}>
                      &middot;
                    </span>
                  )}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </RevealBlock>

        {/* Quote 3 */}
        <RevealBlock delay={0.1}>
          <p
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: 'clamp(22px, 3.5vw, 32px)',
              color: 'rgba(255,255,255,0.85)',
              lineHeight: 1.6,
              textAlign: 'center',
              margin: 0,
            }}
          >
            {t('quote2pre')}
            <span style={{ color: '#C5A059', fontWeight: 500 }}>
              {t('quote2gold')}
            </span>
            {t('quote2post')}
          </p>
        </RevealBlock>
      </div>
    </section>
  )
}
