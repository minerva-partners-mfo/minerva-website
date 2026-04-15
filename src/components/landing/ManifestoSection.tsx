'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const VERITAS = [
  { letter: 'V', word: 'alore' },
  { letter: 'E', word: 'ccellenza' },
  { letter: 'R', word: 'iservatezza' },
  { letter: 'I', word: 'ndipendenza' },
  { letter: 'T', word: 'rasparenza' },
  { letter: 'A', word: 'llineamento' },
  { letter: 'S', word: 'alvaguardia' },
]

function RevealBlock({
  children,
  delay = 0,
}: {
  children: React.ReactNode
  delay?: number
}) {
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
  const veritasRef = useRef<HTMLDivElement>(null)
  const veritasInView = useInView(veritasRef, { once: true, margin: '-80px' })

  return (
    <section
      className="relative py-24 md:py-36 px-6"
      style={{ background: '#0a0f1c' }}
    >
      <div className="max-w-[820px] mx-auto space-y-20 md:space-y-28">
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
            Nasciamo come confederazione di eccellenze, dove ognuno si impegna
            nei confronti dell&apos;altro e del cliente, nell&apos;offrire diversi scenari,
            sostenibili e duraturi.
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
              Tutto quello che facciamo lo svolgiamo nei principi della parola{' '}
              <span style={{ color: '#C5A059', fontWeight: 600, fontStyle: 'normal' }}>
                VERITAS
              </span>
              .
            </p>

            {/* Acronym — all on one row */}
            <motion.div
              ref={veritasRef}
              className="flex flex-wrap justify-center gap-x-3 gap-y-2 md:gap-x-5"
              initial={{ opacity: 0 }}
              animate={veritasInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {VERITAS.map((v, i) => (
                <motion.span
                  key={v.letter}
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
                  <span
                    style={{
                      color: '#C5A059',
                      fontWeight: 700,
                      fontSize: '1.3em',
                    }}
                  >
                    {v.letter}
                  </span>
                  {v.word}
                  {i < VERITAS.length - 1 && (
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
            Non siamo una banca, non siamo un fondo, non siamo una boutique:
            siamo{' '}
            <span style={{ color: '#C5A059', fontWeight: 500 }}>
              abilitatori di valore
            </span>{' '}
            e di relazioni attraverso l&apos;intelligenza collettiva condivisa.
          </p>
        </RevealBlock>
      </div>
    </section>
  )
}
