'use client'

import { motion } from 'framer-motion'

function ColonnadeLogo({ size = 80 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="8" y="88" width="84" height="4" rx="1" fill="#C5A059" />
      <rect x="8" y="16" width="84" height="6" rx="1" fill="#C5A059" />
      <path d="M50 4 L88 16 L12 16 Z" fill="#C5A059" opacity="0.8" />
      {[18, 28, 40, 60, 72, 82].map((x) => (
        <rect key={x} x={x - 2} y="22" width="4" height="66" rx="1.5" fill="#C5A059" />
      ))}
    </svg>
  )
}

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
          animate={{ opacity: [0.04, 0.12, 0.04] }}
          transition={{ duration: 5, ease: 'easeInOut', repeat: Infinity }}
          style={{
            width: 400,
            height: 400,
            background: 'radial-gradient(circle, rgba(197,160,89,0.12) 0%, transparent 60%)',
            borderRadius: '50%',
            filter: 'blur(50px)',
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-[760px]">
        {/* Logo SVG */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
          className="mb-10"
        >
          <ColonnadeLogo size={80} />
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
            marginTop: 32,
          }}
        >
          Multiclient Family Office
        </motion.p>

        {/* Scroll arrow */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.25 }}
          transition={{ duration: 0.6, delay: 2.6 }}
        >
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{ color: '#C5A059', fontSize: 22, display: 'block' }}
          >
            &#8595;
          </motion.span>
        </motion.div>
      </div>
    </section>
  )
}
