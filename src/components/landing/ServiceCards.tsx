'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const CARDS = [
  {
    title: 'M&A & Investments',
    text: 'Architetti di operazioni. Deal origination off-market, capital raising, strutturazione club deal. 50+ deal chiusi.',
    img: '/images/sfera-impresa.jpg',
  },
  {
    title: 'Real Estate Advisory',
    text: 'Opportunit\u00e0 fuori dai portali. Value-add residenziale e hospitality, asset trophy, conversioni.',
    img: '/images/sfera-immobili.jpg',
  },
  {
    title: 'Strategy Consulting',
    text: 'Business and Review Plan, Value Creation, Internazionalizzazione, Advisory M&A, allineamento famiglia-azienda.',
    img: '/images/strategy.webp',
  },
  {
    title: 'Wealth Management',
    text: 'Fee-only pura. Asset allocation strategica, private markets, protezione risk/liquidity. Nessuna retrocessione.',
    img: '/images/sfera-patrimonio.jpg',
  },
  {
    title: 'Family Advisory',
    text: 'Governance strutturata. Patti di famiglia, Family Office as-a-service, trust e architettura societaria complessa.',
    img: '/images/sfera-famiglia.jpg',
  },
  {
    title: 'Passion Assets',
    text: 'Emozioni. Collectibles, luxury, vintage, supporto nella protezione e nella valorizzazione, lifestyle management e concierge.',
    img: '/images/sfera-vita.jpg',
  },
  {
    title: 'NextGen \u2194 GenExit',
    text: 'Legacy Planning. Education, programmi NextGen e GenExit, coaching e struttura patrimoniale dinamica.',
    img: '/images/sfera-futuro.jpg',
  },
]

export function ServiceCards() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="relative py-4 md:py-8 px-4 md:px-8"
      style={{ background: '#0f1829' }}
    >
      <div className="page-content">
        {CARDS.map((card, i) => (
          <motion.div
            key={card.title}
            className="card"
            style={{ '--card-img': `url(${card.img})` } as React.CSSProperties}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.6,
              delay: i * 0.08,
              ease: [0.23, 1, 0.32, 1],
            }}
          >
            <div className="content">
              <h2 className="title">{card.title}</h2>
              <p className="copy">{card.text}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <style>{`
        :root {
          --d: 700ms;
          --e: cubic-bezier(0.19, 1, 0.22, 1);
        }

        .page-content {
          display: grid;
          grid-gap: 1rem;
          padding: 1rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        @media (min-width: 600px) {
          .page-content {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 900px) {
          .page-content {
            grid-template-columns: repeat(4, 1fr);
          }
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

        @media (min-width: 600px) {
          .card {
            height: 350px;
          }
        }

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
          transition: transform calc(var(--d) * 1.5) var(--e);
          pointer-events: none;
        }

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
          transition: transform calc(var(--d) * 2) var(--e);
        }

        .content {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          padding: 1rem;
          transition: transform var(--d) var(--e);
          z-index: 1;
        }

        .content > * + * {
          margin-top: 1rem;
        }

        .title {
          font-family: var(--font-cormorant, 'Cormorant Garamond', serif);
          font-size: 1.3rem;
          font-weight: 600;
          line-height: 1.2;
        }

        .copy {
          font-family: var(--font-dm-sans, 'DM Sans', sans-serif);
          font-size: 0.95rem;
          font-style: italic;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.75);
        }

        /* ─── Hover effect (desktop only) ─── */
        @media (hover: hover) and (min-width: 600px) {
          .card:after {
            transform: translateY(0);
          }

          .content {
            transform: translateY(calc(100% - 4.5rem));
          }

          .content > *:not(.title) {
            opacity: 0;
            transform: translateY(1rem);
            transition:
              transform var(--d) var(--e),
              opacity var(--d) var(--e);
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

          .card:hover .content,
          .card:focus-within .content {
            transform: translateY(0);
          }

          .card:hover .content > *:not(.title),
          .card:focus-within .content > *:not(.title) {
            opacity: 1;
            transform: translateY(0);
            transition-delay: calc(var(--d) / 8);
          }

          .card:focus-within:before,
          .card:focus-within:after,
          .card:focus-within .content,
          .card:focus-within .content > *:not(.title) {
            transition-duration: 0s;
          }
        }
      `}</style>
    </section>
  )
}
