'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export function SoluzioniHeader() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="relative py-12 md:py-16 px-6"
      style={{ background: '#0f1829' }}
    >
      <motion.div
        className="text-center max-w-[900px] mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontWeight: 600,
            fontSize: 'clamp(24px, 5vw, 52px)',
            color: 'rgba(255,255,255,0.92)',
            lineHeight: 1.2,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          Soluzioni su misura, senza limiti
        </h2>
        {/* Gold gradient bar under text */}
        <motion.div
          className="mx-auto mt-5"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
          style={{
            width: 'clamp(120px, 30vw, 280px)',
            height: 2,
            background: 'linear-gradient(90deg, transparent, #C5A059, #d4af61, #C5A059, transparent)',
            transformOrigin: 'center',
          }}
        />
      </motion.div>
    </section>
  )
}
