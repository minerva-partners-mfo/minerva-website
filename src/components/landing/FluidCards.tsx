'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

const CARD_KEYS = ['ma', 'realEstate', 'strategy', 'wealth', 'family', 'passion', 'nextgen']

// Sphere images mapped to each card
const CARD_IMAGES = [
  '/images/sfera-impresa.jpg',    // M&A
  '/images/sfera-immobili.jpg',   // Real Estate
  '/images/strategy.webp',        // Strategy
  '/images/sfera-patrimonio.jpg', // Wealth
  '/images/sfera-famiglia.jpg',   // Family
  '/images/sfera-vita.jpg',       // Passion Assets
  '/images/sfera-futuro.jpg',     // NextGen
]

export function FluidCards() {
  const t = useTranslations('landing.cards')
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6"
      style={{ background: '#0f1829' }}
    >
      {/* Section title */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      >
        <p
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: 10,
            color: '#C5A059',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          {t('sectionTitle')}
        </p>
        <div
          className="mx-auto mt-4"
          style={{ width: 30, height: 0.5, background: '#C5A059', opacity: 0.3 }}
        />
      </motion.div>

      {/* ═══ STACKING CARDS — CodePen effect ═══ */}
      <div className="sc-container">
        {CARD_KEYS.map((key, i) => (
          <motion.div
            key={key}
            className="sc-card"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* Sphere image */}
            <div className="sc-image">
              <Image
                src={CARD_IMAGES[i]}
                alt={t(`${key}.title`)}
                fill
                sizes="220px"
                className="object-cover"
                style={{ filter: 'saturate(0.35) sepia(0.15) brightness(0.55)' }}
              />
              {/* Gradient fade to card bg */}
              <div className="sc-image-fade" />
              {/* Gold tint overlay */}
              <div className="sc-image-tint" />
            </div>

            {/* Title */}
            <h3 className="sc-title">{t(`${key}.title`)}</h3>

            {/* Subtitle */}
            <p className="sc-subtitle">{t(`${key}.subtitle`)}</p>

            {/* Gold bar */}
            <div className="sc-bar">
              <div className="sc-emptybar" />
              <div className="sc-filledbar" />
            </div>

            {/* Description — visible on hover */}
            <p className="sc-desc">{t(`${key}.text`)}</p>

            {/* Top accent line */}
            <div className="sc-accent" />
          </motion.div>
        ))}
      </div>

      {/* ═══ CSS for the stacking effect ═══ */}
      <style>{`
        .sc-container {
          display: flex;
          justify-content: center;
          align-items: center;
          max-width: 1100px;
          margin: 0 auto;
          padding: 20px 0;
        }

        .sc-card {
          position: relative;
          left: 0;
          display: flex;
          flex-direction: column;
          height: 380px;
          width: 200px;
          min-width: 200px;
          background: linear-gradient(160deg, #0d2235, #081420);
          border-radius: 14px;
          box-shadow: -1rem 0 3rem rgba(0,0,0,0.55);
          transition: 0.4s ease-out;
          overflow: hidden;
          border: 0.5px solid rgba(197,160,89,0.12);
          cursor: pointer;
        }

        .sc-card:not(:first-child) {
          margin-left: -50px;
        }

        .sc-card:hover {
          transform: translateY(-20px);
          transition: 0.4s ease-out;
          border-color: rgba(197,160,89,0.35);
          box-shadow:
            -1rem 0 3rem rgba(0,0,0,0.55),
            0 0 40px rgba(197,160,89,0.08);
        }

        .sc-card:hover ~ .sc-card {
          position: relative;
          left: 50px;
          transition: 0.4s ease-out;
        }

        /* ── Image ── */
        .sc-image {
          position: relative;
          width: 100%;
          height: 170px;
          flex-shrink: 0;
          overflow: hidden;
        }

        .sc-image-fade {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            transparent 30%,
            #081420 100%
          );
        }

        .sc-image-tint {
          position: absolute;
          inset: 0;
          background: rgba(197,160,89,0.06);
          mix-blend-mode: overlay;
        }

        /* ── Title ── */
        .sc-title {
          position: absolute;
          top: 150px;
          left: 18px;
          right: 18px;
          margin: 0;
          font-family: var(--font-cormorant, 'Cormorant Garamond', serif);
          font-size: 17px;
          font-weight: 600;
          color: rgba(255,255,255,0.9);
          line-height: 1.2;
        }

        /* ── Subtitle ── */
        .sc-subtitle {
          position: absolute;
          top: 180px;
          left: 18px;
          right: 18px;
          margin: 0;
          font-family: var(--font-dm-sans, 'DM Sans', sans-serif);
          font-size: 11px;
          color: rgba(197,160,89,0.6);
          letter-spacing: 0.02em;
          transition: 0.3s ease-out;
        }

        /* ── Gold bar ── */
        .sc-bar {
          position: absolute;
          top: 210px;
          left: 18px;
          height: 1.5px;
          width: 120px;
        }

        .sc-emptybar {
          background: rgba(197,160,89,0.12);
          width: 100%;
          height: 100%;
          border-radius: 2px;
        }

        .sc-filledbar {
          position: absolute;
          top: 0;
          width: 0;
          height: 100%;
          border-radius: 2px;
          background: linear-gradient(90deg, #C5A059, #d4af61, #e0c080);
          transition: 0.6s ease-out;
        }

        .sc-card:hover .sc-filledbar {
          width: 100px;
          transition: 0.4s ease-out;
        }

        /* ── Description ── */
        .sc-desc {
          position: absolute;
          top: 224px;
          left: 18px;
          right: 18px;
          margin: 0;
          font-family: var(--font-dm-sans, 'DM Sans', sans-serif);
          font-size: 11px;
          line-height: 1.65;
          color: rgba(255,255,255,0);
          transition: 0.4s ease-out;
          display: -webkit-box;
          -webkit-line-clamp: 6;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .sc-card:hover .sc-desc {
          color: rgba(255,255,255,0.5);
          transition: 0.4s ease-out 0.1s;
        }

        /* ── Top accent ── */
        .sc-accent {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #C5A059, transparent);
          opacity: 0;
          transition: 0.4s ease-out;
        }

        .sc-card:hover .sc-accent {
          opacity: 0.7;
        }

        /* ═══ MOBILE — horizontal scroll ═══ */
        @media (max-width: 900px) {
          .sc-container {
            justify-content: flex-start;
            overflow-x: auto;
            padding: 20px 16px;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }

          .sc-container::-webkit-scrollbar {
            display: none;
          }

          .sc-card {
            height: 340px;
            width: 180px;
            min-width: 180px;
          }

          .sc-card:not(:first-child) {
            margin-left: -35px;
          }

          .sc-card:hover ~ .sc-card {
            left: 35px;
          }
        }

        @media (max-width: 480px) {
          .sc-card {
            height: 300px;
            width: 160px;
            min-width: 160px;
          }

          .sc-card:not(:first-child) {
            margin-left: -30px;
          }

          .sc-card:hover ~ .sc-card {
            left: 30px;
          }

          .sc-image {
            height: 130px;
          }

          .sc-title {
            top: 115px;
            font-size: 15px;
          }

          .sc-subtitle {
            top: 142px;
            font-size: 10px;
          }

          .sc-bar {
            top: 168px;
          }

          .sc-desc {
            top: 182px;
            font-size: 10px;
            -webkit-line-clamp: 5;
          }
        }
      `}</style>
    </section>
  )
}
