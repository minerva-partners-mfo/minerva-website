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
    <section
      ref={ref}
      className="relative py-4 md:py-8 px-4 md:px-8"
      style={{ background: '#0f1829' }}
    >
      <div className="cards-grid">
        {CARD_KEYS.map((key, i) => (
          <motion.div
            key={key}
            className="card"
            style={{ '--card-img': `url(${CARD_IMAGES[i]})` } as React.CSSProperties}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.6,
              delay: i * 0.08,
              ease: [0.23, 1, 0.32, 1],
            }}
          >
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
          box-shadow:
            0 1px 1px rgba(0,0,0,0.1),
            0 2px 2px rgba(0,0,0,0.1),
            0 4px 4px rgba(0,0,0,0.1),
            0 8px 8px rgba(0,0,0,0.1),
            0 16px 16px rgba(0,0,0,0.1);
        }

        /* ─── Responsive widths: 1 mobile, 2 tablet, 4+3 desktop ─── */
        @media (min-width: 600px) {
          .card {
            width: calc(50% - 0.5rem);
            height: 350px;
          }
        }

        @media (min-width: 900px) {
          .card {
            width: calc(25% - 0.75rem);
          }
        }

        /* ─── Background image (::before) ─── */
        .card:before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 110%;
          background-image: var(--card-img);
          background-size: cover;
          background-position: center;
          transition: transform 1050ms cubic-bezier(0.19, 1, 0.22, 1);
          pointer-events: none;
        }

        /* ─── Gradient overlay (::after) ─── */
        .card:after {
          content: '';
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 200%;
          pointer-events: none;
          background-image: linear-gradient(
            to bottom,
            hsla(0, 0%, 0%, 0) 0%,
            hsla(0, 0%, 0%, 0.009) 11.7%,
            hsla(0, 0%, 0%, 0.034) 22.1%,
            hsla(0, 0%, 0%, 0.072) 31.2%,
            hsla(0, 0%, 0%, 0.123) 39.4%,
            hsla(0, 0%, 0%, 0.182) 46.6%,
            hsla(0, 0%, 0%, 0.249) 53.1%,
            hsla(0, 0%, 0%, 0.320) 58.9%,
            hsla(0, 0%, 0%, 0.394) 64.3%,
            hsla(0, 0%, 0%, 0.468) 69.3%,
            hsla(0, 0%, 0%, 0.540) 74.1%,
            hsla(0, 0%, 0%, 0.607) 78.8%,
            hsla(0, 0%, 0%, 0.668) 83.6%,
            hsla(0, 0%, 0%, 0.721) 88.7%,
            hsla(0, 0%, 0%, 0.762) 94.1%,
            hsla(0, 0%, 0%, 0.790) 100%
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
          padding: 1rem;
          transition: transform 700ms cubic-bezier(0.19, 1, 0.22, 1);
          z-index: 1;
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
          text-shadow: 0 2px 8px rgba(0,0,0,0.6);
        }

        .card-copy {
          font-family: var(--font-dm-sans, 'DM Sans', sans-serif);
          font-size: 0.85rem;
          font-style: italic;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.85);
          text-shadow: 0 1px 6px rgba(0,0,0,0.8);
          max-width: 240px;
        }

        /* ─── Hover effect (desktop only) ─── */
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
