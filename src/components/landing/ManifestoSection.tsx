'use client'

import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { motion, useInView } from 'framer-motion'

function GoldDivider() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <div ref={ref} className="flex justify-center py-10">
      <motion.div
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        style={{
          width: 1,
          height: 60,
          background:
            'linear-gradient(180deg, transparent, #C5A059, transparent)',
          opacity: 0.3,
          transformOrigin: 'center',
        }}
      />
    </div>
  )
}

function WordReveal({
  text,
  className,
  style,
  highlightWords,
  highlightStyle,
}: {
  text: string
  className?: string
  style?: React.CSSProperties
  highlightWords?: string
  highlightStyle?: React.CSSProperties
}) {
  const ref = useRef<HTMLParagraphElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const words = text.split(' ')

  // Find highlight range
  const hlWords = highlightWords?.split(' ') || []
  let hlStart = -1
  if (hlWords.length > 0) {
    for (let i = 0; i <= words.length - hlWords.length; i++) {
      if (hlWords.every((hw, j) => words[i + j].replace(/[^a-zA-Zàèìòù]/g, '') === hw)) {
        hlStart = i
        break
      }
    }
  }

  return (
    <p ref={ref} className={className} style={style}>
      {words.map((word, i) => {
        const isHighlighted = hlStart >= 0 && i >= hlStart && i < hlStart + hlWords.length
        return (
          <motion.span
            key={i}
            className="inline-block mr-[0.25em]"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.5,
              delay: i * 0.06,
              ease: [0.23, 1, 0.32, 1],
            }}
            style={isHighlighted ? highlightStyle : undefined}
          >
            {word}
          </motion.span>
        )
      })}
    </p>
  )
}

const VERITAS_WORDS = [
  { letter: 'V', rest: 'alore' },
  { letter: 'E', rest: 'ccellenza' },
  { letter: 'R', rest: 'iservatezza' },
  { letter: 'I', rest: 'ndipendenza' },
  { letter: 'T', rest: 'rasparenza' },
  { letter: 'A', rest: 'llineamento' },
  { letter: 'S', rest: 'alvaguardia' },
]

export function ManifestoSection() {
  const t = useTranslations('landing.manifesto')
  const veritasRef = useRef<HTMLDivElement>(null)
  const veritasInView = useInView(veritasRef, { once: true, margin: '-60px' })

  return (
    <section
      className="relative py-20 md:py-28 px-6 overflow-hidden"
      style={{ background: '#0f1829' }}
    >
      {/* Subtle grid pattern — 2-3% opacity */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(197,160,89,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(197,160,89,0.025) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-[680px] mx-auto relative z-10">
        <GoldDivider />

        {/* Quote 1 — italic, word by word */}
        <WordReveal
          text={t('quote1')}
          className="text-center"
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(19px, 3.5vw, 26px)',
            color: 'rgba(255,255,255,0.88)',
            lineHeight: 1.6,
            maxWidth: 620,
            margin: '0 auto',
          }}
        />

        {/* VERITAS */}
        <motion.div
          ref={veritasRef}
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={veritasInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          <p
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: 10,
              color: 'rgba(255,255,255,0.50)',
              letterSpacing: '0.3em',
              textTransform: 'uppercase' as const,
              marginBottom: 20,
            }}
          >
            {t('principlesLabel')}
          </p>

          <div className="flex flex-wrap justify-center items-center gap-y-3">
            {VERITAS_WORDS.map((w, i) => (
              <motion.span
                key={w.letter}
                className="flex items-center"
                initial={{ opacity: 0, y: 8 }}
                animate={veritasInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.4,
                  delay: 0.3 + i * 0.1,
                  ease: [0.23, 1, 0.32, 1],
                }}
              >
                {i > 0 && (
                  <span
                    className="mx-2.5"
                    style={{
                      color: '#C5A059',
                      opacity: 0.2,
                      fontSize: 8,
                    }}
                  >
                    ◆
                  </span>
                )}
                <span>
                  <span
                    style={{
                      fontFamily: 'var(--font-cormorant)',
                      fontSize: 22,
                      fontWeight: 700,
                      color: '#C5A059',
                    }}
                  >
                    {w.letter}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-cormorant)',
                      fontSize: 15,
                      fontWeight: 300,
                      color: 'rgba(255,255,255,0.70)',
                    }}
                  >
                    ·{w.rest}
                  </span>
                </span>
              </motion.span>
            ))}
          </div>
        </motion.div>

        <GoldDivider />

        {/* Quote 2 — word by word, "abilitatori di valore" highlighted */}
        <WordReveal
          text={t('quote2raw')}
          className="text-center"
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontWeight: 300,
            fontSize: 'clamp(19px, 3.5vw, 26px)',
            color: 'rgba(255,255,255,0.88)',
            lineHeight: 1.6,
            maxWidth: 540,
            margin: '0 auto',
          }}
          highlightWords="abilitatori di valore"
          highlightStyle={{ color: '#C5A059', fontWeight: 500 }}
        />
      </div>
    </section>
  )
}
