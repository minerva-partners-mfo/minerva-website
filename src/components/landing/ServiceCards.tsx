'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslations } from 'next-intl'

const CARD_KEYS = ['ma', 'realEstate', 'strategy', 'wealth', 'family', 'passion', 'nextgen'] as const

const CARD_IMAGES = [
  '/images/sfera-impresa.jpg',
  '/images/sfera-immobili.jpg',
  '/images/strategy.webp',
  '/images/sfera-patrimonio.jpg',
  '/images/sfera-famiglia.jpg',
  '/images/sfera-vita.jpg',
  '/images/sfera-futuro.jpg',
]

export function ServiceCards() {
  const t = useTranslations('landing.cards')
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="land-section px-4 md:px-8">
      <div className="cards-grid">
        {CARD_KEYS.map((key, i) => (
          <motion.div
            key={key}
            className="card"
            style={{ '--card-img': `url(${CARD_IMAGES[i]})` } as React.CSSProperties}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* Gold tint overlay */}
            <div className="card-tint" />
            {/* Gold top border glow on hover */}
            <div className="card-border-glow" />
            <div className="card-content">
              <h2 className="card-title">{t(`${key}.title`)}</h2>
              <p className="card-copy">{t(`${key}.text`)}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <style>{`
        .cards-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1rem;
          max-width: 1200px;
          margin: 0 auto;
          padding: 1rem;
        }

        .card {
          position: relative;
          display: flex;
          align-items: flex-end;
          overflow: hidden;
          padding: 1rem;
          width: 100%;
          text-align: center;
          color: whitesmoke;
          background-color: #0a0f1c;
          border-radius: 10px;
          border: 1px solid rgba(197,160,89,0.06);
          transition: border-color 500ms;
          box-shadow:
            0 2px 4px rgba(0,0,0,0.15),
            0 8px 16px rgba(0,0,0,0.15);
        }

        .card:hover {
          border-color: rgba(197,160,89,0.15);
        }

        @media (min-width: 600px) {
          .card { width: calc(50% - 0.5rem); height: 380px; }
        }
        @media (min-width: 900px) {
          .card { width: calc(25% - 0.75rem); }
        }

        /* ─── Background image — full cover ─── */
        .card:before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: var(--card-img);
          background-size: cover;
          background-position: center;
          transition: transform 1050ms cubic-bezier(0.19, 1, 0.22, 1);
          pointer-events: none;
        }

        /* ─── Gold tint overlay ─── */
        .card-tint {
          position: absolute;
          inset: 0;
          background: rgba(160, 130, 60, 0.08);
          mix-blend-mode: color;
          pointer-events: none;
          z-index: 1;
        }

        /* ─── Top border gold glow on hover ─── */
        .card-border-glow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 80px;
          background: linear-gradient(to bottom, rgba(197,160,89,0.15), transparent);
          opacity: 0;
          transition: opacity 500ms;
          pointer-events: none;
          z-index: 2;
        }
        .card:hover .card-border-glow {
          opacity: 1;
        }

        /* ─── Gradient overlay — covers full card, heavy at bottom ─── */
        .card:after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 200%;
          pointer-events: none;
          z-index: 2;
          background-image: linear-gradient(
            to bottom,
            hsla(0, 0%, 0%, 0) 0%,
            hsla(0, 0%, 0%, 0.01) 8%,
            hsla(0, 0%, 0%, 0.04) 16%,
            hsla(0, 0%, 0%, 0.10) 24%,
            hsla(0, 0%, 0%, 0.18) 32%,
            hsla(0, 0%, 0%, 0.28) 40%,
            hsla(0, 0%, 0%, 0.40) 48%,
            hsla(0, 0%, 0%, 0.54) 56%,
            hsla(0, 0%, 0%, 0.66) 64%,
            hsla(0, 0%, 0%, 0.76) 72%,
            hsla(0, 0%, 0%, 0.84) 80%,
            hsla(0, 0%, 0%, 0.90) 88%,
            hsla(0, 0%, 0%, 0.95) 96%,
            hsla(0, 0%, 0%, 0.98) 100%
          );
          transform: translateY(-50%);
          transition: transform 1400ms cubic-bezier(0.19, 1, 0.22, 1);
        }

        /* ─── Content ─── */
        .card-content {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          padding: 1.5rem 1rem;
          transition: transform 700ms cubic-bezier(0.19, 1, 0.22, 1);
          z-index: 3;
        }

        .card-content > * + * {
          margin-top: 0.75rem;
        }

        .card-title {
          font-family: var(--font-cormorant, 'Cormorant Garamond', serif);
          font-size: 1.3rem;
          font-weight: 600;
          line-height: 1.2;
          color: #C5A059;
          text-shadow: 0 1px 3px rgba(0,0,0,0.9), 0 2px 12px rgba(0,0,0,0.8);
        }

        .card-copy {
          font-family: var(--font-dm-sans, 'DM Sans', sans-serif);
          font-size: 0.85rem;
          font-style: italic;
          line-height: 1.55;
          color: rgba(255, 255, 255, 0.92);
          text-shadow: 0 1px 3px rgba(0,0,0,0.95), 0 2px 10px rgba(0,0,0,0.9);
          max-width: 240px;
        }

        /* ─── Hover: full card coverage (desktop) ─── */
        @media (hover: hover) and (min-width: 600px) {
          .card:after {
            transform: translateY(0);
          }

          .card-content {
            transform: translateY(calc(100% - 4.5rem));
          }

          .card-content > *:not(.card-title) {
            opacity: 0;
            transform: translateY(1rem);
            transition:
              transform 700ms cubic-bezier(0.19, 1, 0.22, 1),
              opacity 700ms cubic-bezier(0.19, 1, 0.22, 1);
          }

          .card:hover,
          .card:focus-within {
            align-items: center;
          }

          .card:hover:before,
          .card:focus-within:before {
            transform: translateY(-4%);
          }

          .card:hover:after,
          .card:focus-within:after {
            transform: translateY(-50%);
          }

          .card:hover .card-content,
          .card:focus-within .card-content {
            transform: translateY(0);
          }

          .card:hover .card-content > *:not(.card-title),
          .card:focus-within .card-content > *:not(.card-title) {
            opacity: 1;
            transform: translateY(0);
            transition-delay: 88ms;
          }

          .card:focus-within:before,
          .card:focus-within:after,
          .card:focus-within .card-content,
          .card:focus-within .card-content > *:not(.card-title) {
            transition-duration: 0s;
          }
        }
      `}</style>
    </section>
  )
}
