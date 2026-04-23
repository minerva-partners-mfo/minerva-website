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
      initial={{ opacity: 0, y: 30 }}
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
      className="relative land-section px-6"
    >

      <div className="relative z-10 max-w-[820px] mx-auto space-y-14 md:space-y-20">
        {/* Quote 1 — su due righe naturali */}
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
              maxWidth: 700,
              marginLeft: 'auto',
              marginRight: 'auto',
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
              <span className="veritas-word">
                {t('veritasWord')}
              </span>
              .
            </p>

            {/* VERITAS acronimi — wrap su mobile */}
            <motion.div
              ref={veritasRef}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '6px 12px',
                maxWidth: '100%',
                padding: '0 16px',
                overflow: 'visible',
                boxSizing: 'border-box',
              }}
              initial={{ opacity: 0 }}
              animate={veritasInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {VERITAS_LETTERS.map((key, i) => (
                <motion.span
                  key={key}
                  initial={{ opacity: 0, y: 10 }}
                  animate={veritasInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
                  style={{ whiteSpace: 'nowrap', fontFamily: "var(--font-cormorant, 'Cormorant Garamond', Georgia, serif)" }}
                >
                  <span style={{ color: '#D4AF37', fontWeight: 700, fontSize: 'clamp(15px, 2vw, 20px)' }}>
                    {key.toUpperCase()}
                  </span>
                  <span style={{ color: 'rgba(255,255,255,0.88)', fontWeight: 300, fontSize: 'clamp(13px, 1.6vw, 17px)' }}>
                    {t(key)}
                  </span>
                  {i < VERITAS_LETTERS.length - 1 && (
                    <span style={{ color: 'rgba(212,175,55,0.25)', margin: '0 6px', fontSize: 9 }}>·</span>
                  )}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </RevealBlock>

        {/* Quote 3 — a capo prima di "attraverso" */}
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
            {t('quote2mid')}
            <br />
            {t('quote2end')}
          </p>
        </RevealBlock>
      </div>

      <style>{`
        .veritas-word {
          color: #C5A059;
          font-weight: 600;
          font-style: normal;
          position: relative;
        }
        .veritas-word::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, #C5A059, transparent);
          opacity: 0.4;
        }
      `}</style>
    </section>
  )
}
