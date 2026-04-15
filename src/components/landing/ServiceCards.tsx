'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const CARDS = [
  {
    title: 'M&A & Investments',
    text: 'Architetti di operazioni. Deal origination off-market, capital raising, strutturazione club deal. 50+ deal chiusi.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80',
  },
  {
    title: 'Real Estate Advisory',
    text: 'Opportunit\u00e0 fuori dai portali. Value-add residenziale e hospitality, asset trophy, conversioni.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
  },
  {
    title: 'Strategy Consulting',
    text: 'Business and Review Plan, Value Creation, Internazionalizzazione, Advisory M&A, allineamento famiglia-azienda.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80',
  },
  {
    title: 'Wealth Management',
    text: 'Fee-only pura. Asset allocation strategica, private markets, protezione risk/liquidity. Nessuna retrocessione.',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80',
  },
  {
    title: 'Family Advisory',
    text: 'Governance strutturata. Patti di famiglia, Family Office as-a-service, trust e architettura societaria complessa.',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80',
  },
  {
    title: 'Passion Assets',
    text: 'Emozioni. Collectibles, luxury, vintage, supporto nella protezione e nella valorizzazione, lifestyle management e concierge.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80',
  },
  {
    title: 'NextGen \u2194 GenExit',
    text: 'Legacy Planning. Education, programmi NextGen e GenExit, coaching e struttura patrimoniale dinamica.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80',
  },
]

export function ServiceCards() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="relative py-8 md:py-16 px-4 md:px-8"
      style={{ background: '#0f1829' }}
    >
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {CARDS.map((card, i) => (
          <motion.div
            key={card.title}
            className="card-reveal group"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.6,
              delay: i * 0.08,
              ease: [0.23, 1, 0.32, 1],
            }}
          >
            {/* Background image */}
            <div
              className="card-reveal__bg"
              style={{ backgroundImage: `url(${card.image})` }}
            />
            {/* Gradient overlay */}
            <div className="card-reveal__overlay" />
            {/* Content */}
            <div className="card-reveal__content">
              <h3 className="card-reveal__title">{card.title}</h3>
              <p className="card-reveal__text">{card.text}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <style>{`
        .card-reveal {
          position: relative;
          height: 380px;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          border: 1px solid rgba(197, 160, 89, 0.08);
          transition: border-color 0.4s;
        }

        .card-reveal:hover {
          border-color: rgba(197, 160, 89, 0.25);
        }

        .card-reveal__bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          filter: saturate(0.3) brightness(0.5);
          transition: transform 0.7s cubic-bezier(0.19, 1, 0.22, 1),
                      filter 0.7s cubic-bezier(0.19, 1, 0.22, 1);
        }

        .card-reveal:hover .card-reveal__bg {
          transform: scale(1.08);
          filter: saturate(0.5) brightness(0.35);
        }

        .card-reveal__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(10, 15, 28, 0.95) 0%,
            rgba(10, 15, 28, 0.6) 40%,
            rgba(10, 15, 28, 0.1) 100%
          );
          transition: background 0.7s cubic-bezier(0.19, 1, 0.22, 1);
        }

        .card-reveal:hover .card-reveal__overlay {
          background: linear-gradient(
            to top,
            rgba(10, 15, 28, 0.98) 0%,
            rgba(10, 15, 28, 0.75) 50%,
            rgba(10, 15, 28, 0.3) 100%
          );
        }

        .card-reveal__content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 24px 20px;
          transform: translateY(0);
          transition: transform 0.7s cubic-bezier(0.19, 1, 0.22, 1);
        }

        .card-reveal:hover .card-reveal__content {
          transform: translateY(-20px);
        }

        .card-reveal__title {
          font-family: var(--font-cormorant, 'Cormorant Garamond', serif);
          font-size: 20px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.92);
          line-height: 1.25;
          margin: 0 0 10px 0;
          position: relative;
        }

        .card-reveal__title::after {
          content: '';
          display: block;
          width: 30px;
          height: 1.5px;
          background: #C5A059;
          margin-top: 10px;
          transition: width 0.5s cubic-bezier(0.19, 1, 0.22, 1);
        }

        .card-reveal:hover .card-reveal__title::after {
          width: 50px;
        }

        .card-reveal__text {
          font-family: var(--font-dm-sans, 'DM Sans', sans-serif);
          font-size: 13px;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0);
          margin: 0;
          transition: color 0.7s cubic-bezier(0.19, 1, 0.22, 1);
          max-height: 0;
          overflow: hidden;
          transition: color 0.7s cubic-bezier(0.19, 1, 0.22, 1),
                      max-height 0.7s cubic-bezier(0.19, 1, 0.22, 1);
        }

        .card-reveal:hover .card-reveal__text {
          color: rgba(255, 255, 255, 0.6);
          max-height: 200px;
        }

        @media (max-width: 639px) {
          .card-reveal {
            height: 320px;
          }
        }
      `}</style>
    </section>
  )
}
