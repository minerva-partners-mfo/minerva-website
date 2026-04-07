'use client'

import { useRef, useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

/* ════════════════════════════════════════
   DATA
   ════════════════════════════════════════ */

const SECTORS = [
  { key: 's01', img: '/images/settore-financial.png', num: 1 },
  { key: 's02', img: '/images/settore-largoconsumo.png', num: 2 },
  { key: 's03', img: '/images/settore-aerospace.png', num: 3 },
  { key: 's04', img: '/images/settore-industrial.png', num: 4 },
  { key: 's05', img: '/images/settore-chemical.png', num: 5 },
  { key: 's06', img: '/images/settore-tech.png', num: 6 },
  { key: 's07', img: '/images/settore-infrastrutture.png', num: 7 },
  { key: 's08', img: '/images/settore-metallurgia.png', num: 8 },
  { key: 's09', img: '/images/settore-oilandgas.png', num: 9 },
  { key: 's10', img: '/images/settore-packaging.png', num: 10 },
  { key: 's11', img: '/images/settore-trasporti.png', num: 11 },
  { key: 's12', img: '/images/settore-utility.png', num: 12 },
  { key: 's13', img: '/images/settore-agribusiness.png', num: 13 },
  { key: 's14', img: '/images/settore-pharma.png', num: 14 },
  { key: 's15', img: '/images/settore-realestate.png', num: 0 },
  { key: 's16', img: '/images/settore-entertainment.png', num: 0 },
  { key: 's17', img: '/images/settore-sports.png', num: 0 },
  { key: 's18', img: '/images/settore-luxury.png', num: 0 },
]

// Masonry height pattern: tall/short alternating per row
const HEIGHT_PATTERN = [
  360, 280, 360,
  280, 360, 280,
  360, 280, 360,
  280, 360, 280,
  280, 280,
]

const PLAYERS = [
  { key: 'p01' },
  { key: 'p02' },
  { key: 'p03' },
  { key: 'p04' },
  { key: 'p05' },
  { key: 'p06' },
  { key: 'p07' },
]

/* ════════════════════════════════════════
   HELPERS
   ════════════════════════════════════════ */

function FadeIn({ children, delay = 0, className = '', style = {} }: {
  children: React.ReactNode
  delay?: number
  className?: string
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => setVisible(true), delay)
        obs.disconnect()
      }
    }, { threshold: 0.15 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])

  return (
    <div ref={ref} className={className} style={{
      ...style,
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.97)',
      transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
    }}>
      {children}
    </div>
  )
}

/* ════════════════════════════════════════
   SECTOR CARD
   ════════════════════════════════════════ */

function SectorCard({ num, img, t, sKey, desktopHeight, delay }: {
  num: number
  img: string
  t: ReturnType<typeof useTranslations>
  sKey: string
  desktopHeight: number
  delay: number
}) {
  const [hovered, setHovered] = useState(false)
  const [imgError, setImgError] = useState(false)

  return (
    <FadeIn
      delay={delay}
      className="group h-[250px] md:h-[320px]"
    >
      <div
        className="relative overflow-hidden rounded-2xl w-full h-full cursor-default"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {!imgError ? (
          <img
            src={img}
            alt=""
            onError={() => setImgError(true)}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500"
            style={{ transform: hovered ? 'scale(1.08)' : 'scale(1)' }}
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: 'linear-gradient(180deg, #1A2744 0%, rgba(201,145,43,0.15) 100%)' }}
          >
            <span className="font-serif text-[24px] text-white/20">{t(`sectors.${sKey}.title`)}</span>
          </div>
        )}

        <div
          className="absolute inset-0 transition-all duration-500"
          style={{
            background: hovered
              ? 'linear-gradient(to top, rgba(26,39,68,0.6) 0%, transparent 60%)'
              : 'linear-gradient(to top, rgba(26,39,68,0.8) 0%, transparent 50%)',
          }}
        />


        <div className="absolute bottom-0 left-0 right-0" style={{ padding: '28px' }}>
          <h3
            className="font-sans text-[18px] font-bold text-white"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}
          >
            {t(`sectors.${sKey}.title`)}
          </h3>
          <p className="font-sans text-[12px] mt-1" style={{ color: 'rgba(255,255,255,0.6)' }}>
            {t(`sectors.${sKey}.desc`)}
          </p>

          <div
            className="overflow-hidden"
            style={{
              maxHeight: hovered ? '120px' : '0px',
              opacity: hovered ? 1 : 0,
              transition: 'max-height 0.4s ease, opacity 0.3s ease',
            }}
          >
            <p className="font-sans text-[12px] mt-3 leading-[1.6]" style={{ color: 'rgba(255,255,255,0.55)' }}>
              {t(`sectors.${sKey}.hover`)}
            </p>
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 transition-all duration-300"
          style={{ height: '2px', backgroundColor: '#C9912B', opacity: hovered ? 1 : 0 }}
        />
      </div>
    </FadeIn>
  )
}

/* ════════════════════════════════════════
   PLAYER CARD
   ════════════════════════════════════════ */

function PlayerCard({ pKey, num, t, delay }: {
  pKey: string
  num: number
  t: ReturnType<typeof useTranslations>
  delay: number
}) {
  const [hovered, setHovered] = useState(false)
  const numStr = String(num).padStart(2, '0')

  return (
    <FadeIn delay={delay} className="h-full">
      <div
        className="rounded-[20px] p-8 md:p-9 flex flex-col justify-between cursor-default h-full"
        style={{
          background: hovered
            ? 'linear-gradient(180deg, rgba(201,145,43,0.1) 0%, #0D1520 100%)'
            : 'linear-gradient(180deg, rgba(201,145,43,0.06) 0%, #0D1520 100%)',
          border: hovered ? '1px solid rgba(201,145,43,0.3)' : '1px solid rgba(201,145,43,0.1)',
          transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
          boxShadow: hovered ? '0 12px 40px rgba(0,0,0,0.3)' : 'none',
          transition: 'all 0.4s ease-out',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div>
          <div
            className="flex items-center justify-center rounded-full"
            style={{ width: '44px', height: '44px', backgroundColor: '#C9912B' }}
          >
            <span className="font-sans text-[16px] font-bold text-white">{numStr}</span>
          </div>

          <h3 className="font-serif text-[22px] md:text-[26px] text-white mt-6">
            {t(`players.${pKey}.title`)}
          </h3>
          <p className="font-sans text-[13px] mt-1" style={{ color: '#C9912B' }}>
            {t(`players.${pKey}.subtitle`)}
          </p>
          <p className="font-sans text-[14px] mt-4 leading-[1.7]" style={{ color: 'rgba(255,255,255,0.6)' }}>
            {t(`players.${pKey}.desc`)}
          </p>
        </div>

        <div>
          <div style={{ height: '1px', backgroundColor: 'rgba(201,145,43,0.1)', margin: '20px 0' }} />
          <span
            className="block font-sans text-[10px] font-medium uppercase mb-2"
            style={{ color: '#C9912B', letterSpacing: '0.1em' }}
          >
            {t('players.servicesLabel')}
          </span>
          <p className="font-sans text-[12px] leading-[1.6]" style={{ color: 'rgba(255,255,255,0.45)' }}>
            {t(`players.${pKey}.services`)}
          </p>
        </div>
      </div>
    </FadeIn>
  )
}

/* ════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════ */

export function SettoriPage() {
  const t = useTranslations('settori')

  return (
    <div className="bg-[#0D1520]">

      {/* ═══ I 14 SETTORI ═══ */}
      <section className="pt-24 md:pt-32 pb-16 md:pb-24 px-6">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <h2 className="font-serif text-[28px] md:text-[32px] text-white mb-3">
              {t('sectors.title')}
            </h2>
          </FadeIn>
          <FadeIn delay={150}>
            <p className="font-sans text-[15px] mb-12" style={{ color: 'rgba(255,255,255,0.45)' }}>
              {t('sectors.subtitle')}
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {SECTORS.map((sector, i) => (
              <SectorCard
                key={sector.key}
                num={sector.num}
                img={sector.img}
                t={t}
                sKey={sector.key}
                desktopHeight={320}
                delay={i * 80}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ I 7 PLAYER ═══ */}
      <section className="py-16 md:py-24 px-6 bg-[#0D1520]">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <h2 className="font-serif text-[28px] md:text-[32px] text-white mb-12">
              {t('players.title')}
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-5">
            {PLAYERS.slice(0, 4).map((player, i) => (
              <PlayerCard key={player.key} pKey={player.key} num={i + 1} t={t} delay={i * 120} />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:max-w-[75%] lg:mx-auto">
            {PLAYERS.slice(4).map((player, i) => (
              <PlayerCard key={player.key} pKey={player.key} num={i + 5} t={t} delay={(i + 4) * 120} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
