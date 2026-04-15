'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

export function HeroSection() {
  const t = useTranslations('landing')
  const words = t('hero.title').split(' ')

  return (
    <section
      className="relative flex flex-col items-center justify-center px-6 overflow-hidden"
      style={{ minHeight: '100vh', background: '#0f1829' }}
    >
      {/* ═══ Silk / luxury animated background ═══ */}
      <div className="silk-bg" />
      <div className="silk-bg silk-bg--2" />

      {/* Pulsing gold glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center" style={{ zIndex: 1 }}>
        <motion.div
          animate={{ opacity: [0.04, 0.14, 0.04] }}
          transition={{ duration: 5, ease: 'easeInOut', repeat: Infinity }}
          style={{
            width: 400,
            height: 400,
            background: 'radial-gradient(circle, rgba(197,160,89,0.18) 0%, transparent 55%)',
            borderRadius: '50%',
            filter: 'blur(60px)',
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

        {/* Title — word by word */}
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

        {/* Subtitle — GRANDE con shimmer */}
        <motion.div
          className="subtitle-shimmer"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
          style={{ marginTop: 28 }}
        >
          <span
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: 'clamp(14px, 2.2vw, 20px)',
              fontWeight: 600,
              color: '#C5A059',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
            }}
          >
            {t('hero.subtitle')}
          </span>
        </motion.div>

        {/* Flanking gold lines */}
        <motion.div
          className="flex items-center gap-4 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1, delay: 2.4 }}
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 2.4 }}
            style={{
              width: 60,
              height: 1,
              background: 'linear-gradient(90deg, transparent, #C5A059)',
              transformOrigin: 'right',
            }}
          />
          <motion.div
            style={{
              width: 4,
              height: 4,
              borderRadius: '50%',
              background: '#C5A059',
              opacity: 0.6,
            }}
          />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 2.4 }}
            style={{
              width: 60,
              height: 1,
              background: 'linear-gradient(90deg, #C5A059, transparent)',
              transformOrigin: 'left',
            }}
          />
        </motion.div>

        {/* Gold scroll indicator */}
        <motion.div
          className="mt-14 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.8 }}
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
            {t('nav.scroll')}
          </motion.span>
          <motion.div
            style={{
              width: 1,
              height: 40,
              background: 'linear-gradient(to bottom, #C5A059, transparent)',
              borderRadius: 1,
              transformOrigin: 'top',
            }}
            animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            style={{ width: 5, height: 5, borderRadius: '50%', background: '#C5A059' }}
            animate={{ opacity: [0.15, 0.5, 0.15], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>

      <style>{`
        /* ═══ Silk luxury background ═══ */
        .silk-bg {
          position: absolute;
          inset: 0;
          opacity: 0.035;
          background:
            radial-gradient(ellipse 80% 50% at 20% 40%, rgba(197,160,89,0.4), transparent),
            radial-gradient(ellipse 60% 80% at 80% 60%, rgba(197,160,89,0.3), transparent);
          animation: silk-flow 12s ease-in-out infinite;
        }
        .silk-bg--2 {
          opacity: 0.025;
          background:
            radial-gradient(ellipse 70% 60% at 60% 30%, rgba(197,160,89,0.35), transparent),
            radial-gradient(ellipse 50% 70% at 30% 70%, rgba(197,160,89,0.25), transparent);
          animation: silk-flow-2 16s ease-in-out infinite;
        }
        @keyframes silk-flow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.05); }
          66% { transform: translate(-20px, 15px) scale(0.97); }
        }
        @keyframes silk-flow-2 {
          0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
          50% { transform: translate(-25px, 25px) scale(1.08) rotate(1deg); }
        }

        /* ═══ Shimmer on subtitle ═══ */
        .subtitle-shimmer {
          position: relative;
          overflow: hidden;
        }
        .subtitle-shimmer::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 60%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255,255,255,0.15),
            transparent
          );
          animation: shimmer-pass 4s ease-in-out infinite;
          animation-delay: 3s;
        }
        @keyframes shimmer-pass {
          0% { left: -100%; }
          40%, 100% { left: 200%; }
        }
      `}</style>
    </section>
  )
}
