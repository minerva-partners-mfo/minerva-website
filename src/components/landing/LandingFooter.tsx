'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslations } from 'next-intl'

export function LandingFooter() {
  const t = useTranslations('landing.footer')
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.footer
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      className="px-6 py-12 md:py-16"
      style={{
        background: '#0a0f1c',
        borderTop: '1px solid rgba(197,160,89,0.06)',
      }}
    >
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <a
          href="mailto:info@minervapartners.it"
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: 13,
            color: 'rgba(255,255,255,0.45)',
            textDecoration: 'none',
            transition: 'color 0.3s',
          }}
          className="hover:text-white/70"
        >
          info@minervapartners.it
        </a>

        <div className="flex items-center gap-6">
          <a
            href="#"
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: 12,
              color: 'rgba(255,255,255,0.3)',
              textDecoration: 'none',
              transition: 'color 0.3s',
            }}
            className="hover:text-white/50"
          >
            {t('privacy')}
          </a>
          <a
            href="#"
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: 12,
              color: 'rgba(255,255,255,0.3)',
              textDecoration: 'none',
              transition: 'color 0.3s',
            }}
            className="hover:text-white/50"
          >
            {t('cookie')}
          </a>
        </div>
      </div>
    </motion.footer>
  )
}
