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
      className="relative py-16 md:py-24 px-6 overflow-hidden"
      style={{ background: '#0a0f1c' }}
    >
      {/* Silk background */}
      <div className="manifesto-silk" />

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

            {/* VERITAS acronimi — forza una riga */}
            <motion.div
              ref={veritasRef}
              className="flex justify-center gap-x-2 md:gap-x-4"
              style={{ flexWrap: 'nowrap', whiteSpace: 'nowrap', overflowX: 'auto' }}
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
                  style={{
                    fontFamily: 'var(--font-dm-sans)',
                    fontSize: 'clamp(11px, 1.4vw, 15px)',
                    color: 'rgba(255,255,255,0.55)',
                    letterSpacing: '0.04em',
                  }}
                >
                  <span style={{ color: '#C5A059', fontWeight: 700, fontSize: '1.3em' }}>
                    {key.toUpperCase()}
                  </span>
                  {t(key)}
                  {i < VERITAS_LETTERS.length - 1 && (
                    <span style={{ color: 'rgba(197,160,89,0.35)', marginLeft: 'clamp(4px, 0.8vw, 10px)' }}>
                      ·
                    </span>
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
        .manifesto-silk {
          position: absolute;
          inset: 0;
          opacity: 0.025;
          background:
            radial-gradient(ellipse 90% 40% at 30% 30%, rgba(197,160,89,0.4), transparent),
            radial-gradient(ellipse 70% 50% at 70% 70%, rgba(197,160,89,0.3), transparent);
          animation: manifesto-flow 18s ease-in-out infinite;
        }
        @keyframes manifesto-flow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -15px) scale(1.03); }
        }

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
