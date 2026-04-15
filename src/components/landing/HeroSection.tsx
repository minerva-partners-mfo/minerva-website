'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

export function HeroSection({ started }: { started: boolean }) {
  const t = useTranslations('landing')
  const heroText = t('hero.title')
  const words = heroText.split(' ')

  return (
    <section
      className="relative flex flex-col items-center justify-center px-6"
      style={{
        minHeight: '100vh',
        background: '#0f1829',
        paddingTop: 100,
      }}
    >
      {/* Pulsing radial glow — the "breath" of the page */}
      <div
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
        style={{ zIndex: 0 }}
      >
        <motion.div
          animate={{ opacity: [0.06, 0.12, 0.06] }}
          transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}
          style={{
            width: 500,
            height: 500,
            background:
              'radial-gradient(circle, rgba(197,160,89,0.08) 0%, transparent 65%)',
            borderRadius: '50%',
            filter: 'blur(40px)',
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-[720px]">
        {/* H1 — word by word reveal, stagger 80ms */}
        <h1
          className="max-w-[680px]"
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontWeight: 300,
            fontSize: 'clamp(28px, 5vw, 48px)',
            color: 'rgba(255,255,255,0.88)',
            lineHeight: 1.35,
          }}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-[0.3em]"
              initial={{ opacity: 0, y: 14 }}
              animate={started ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.2 + i * 0.08,
                ease: [0.23, 1, 0.32, 1],
              }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle with flanking gold lines */}
        <motion.div
          className="flex items-center gap-4 mt-8"
          initial={{ opacity: 0 }}
          animate={started ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.span
            initial={{ scaleX: 0 }}
            animate={started ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 1.2 }}
            style={{
              width: 40,
              height: 0.5,
              background: '#C5A059',
              display: 'block',
              transformOrigin: 'right',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: 11,
              color: '#C5A059',
              letterSpacing: '0.3em',
              textTransform: 'uppercase' as const,
              whiteSpace: 'nowrap',
            }}
          >
            {t('hero.subtitle')}
          </span>
          <motion.span
            initial={{ scaleX: 0 }}
            animate={started ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 1.2 }}
            style={{
              width: 40,
              height: 0.5,
              background: '#C5A059',
              display: 'block',
              transformOrigin: 'left',
            }}
          />
        </motion.div>

        {/* Arrow — float loop, barely visible */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={started ? { opacity: 0.3 } : {}}
          transition={{ duration: 0.6, delay: 1.8 }}
        >
          <motion.span
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              color: '#C5A059',
              fontSize: 24,
              display: 'block',
            }}
          >
            ↓
          </motion.span>
        </motion.div>
      </div>
    </section>
  )
}
