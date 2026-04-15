'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export function HeroSection() {
  const title = 'Il Patrimonio evolve solo quando viene visto nella sua interezza'
  const words = title.split(' ')

  return (
    <section
      className="relative flex flex-col items-center justify-center px-6"
      style={{ minHeight: '100vh', background: '#0f1829' }}
    >
      {/* Pulsing gold glow behind logo */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center" style={{ zIndex: 0 }}>
        <motion.div
          animate={{ opacity: [0.04, 0.14, 0.04] }}
          transition={{ duration: 5, ease: 'easeInOut', repeat: Infinity }}
          style={{
            width: 350,
            height: 350,
            background: 'radial-gradient(circle, rgba(197,160,89,0.15) 0%, transparent 60%)',
            borderRadius: '50%',
            filter: 'blur(50px)',
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-[760px]">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
          className="mb-6"
        >
          <Image
            src="/images/logo-minerva.png"
            alt="Minerva Partners"
            width={200}
            height={80}
            className="h-auto object-contain"
            style={{ width: 'clamp(140px, 30vw, 200px)' }}
            priority
          />
        </motion.div>

        {/* Title — word by word stagger */}
        <h1
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontWeight: 300,
            fontSize: 'clamp(26px, 4.5vw, 48px)',
            color: 'rgba(255,255,255,0.9)',
            lineHeight: 1.35,
            margin: 0,
          }}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-[0.3em]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.8 + i * 0.07,
                ease: [0.23, 1, 0.32, 1],
              }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2 }}
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: 12,
            color: '#C5A059',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            marginTop: 24,
          }}
        >
          Multiclient Family Office
        </motion.p>

        {/* Gold scroll indicator */}
        <motion.div
          className="mt-12 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.6 }}
        >
          <motion.span
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: 9,
              color: '#C5A059',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              opacity: 0.5,
            }}
          >
            Scopri
          </motion.span>
          {/* Animated gold line that pulses downward */}
          <motion.div
            style={{
              width: 1,
              height: 40,
              background: 'linear-gradient(to bottom, #C5A059, transparent)',
              borderRadius: 1,
              transformOrigin: 'top',
            }}
            animate={{
              scaleY: [0.3, 1, 0.3],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            style={{
              width: 5,
              height: 5,
              borderRadius: '50%',
              background: '#C5A059',
            }}
            animate={{
              opacity: [0.15, 0.5, 0.15],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      </div>
    </section>
  )
}
