'use client'

import { useState, useRef, useEffect } from 'react'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'

const FLOW_META: { key: string; href: string; bg: string }[] = [
  { key: 's1', href: '/problema', bg: '/images/time.jpg' },
  { key: 's2', href: '/soluzioni', bg: '/images/img9.webp' },
  { key: 's3', href: '/soluzioni', bg: '/images/strategy.webp' },
  { key: 's4', href: '/codice', bg: '/images/room.jpg' },
  { key: 's5', href: '/ecosistema', bg: '/images/img11.jpg' },
  { key: 's6', href: '/hub', bg: '/images/img3.png' },
  { key: 's7', href: '/veritas', bg: '/images/img8.png' },
  { key: 's8', href: '/next-gen', bg: '/images/img5.webp' },
]

function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => setVisible(true), delay); obs.disconnect() }
    }, { threshold: 0.2 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])
  return (
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(40px)', transition: 'opacity 0.9s ease, transform 0.9s ease' }}>
      {children}
    </div>
  )
}

function Arrow() {
  return (
    <div className="flex justify-center my-4 md:my-6">
      <svg width="2" height="40" viewBox="0 0 2 40">
        <line x1="1" y1="0" x2="1" y2="40" stroke="#C9912B" strokeWidth="1.2" strokeOpacity="0.7" />
      </svg>
    </div>
  )
}

export function ComeFunzionaPage() {
  const t = useTranslations('flow')

  return (
    <div className="bg-[#0D1520] min-h-screen relative">
      <p style={{ position: 'absolute', top: 80, left: 20, fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', fontStyle: 'italic', fontFamily: "'Lora', Georgia, serif", zIndex: 10 }}>
        {t('hint')}
      </p>
      <section className="px-6 pt-24 md:pt-28 pb-20 md:pb-28">
        <div className="max-w-[820px] mx-auto">
          <FadeUp>
            <p className="font-sans text-[12px] uppercase tracking-[0.25em] mb-4 text-center" style={{ color: 'rgba(201,145,43,0.8)' }}>{t('label')}</p>
            <h1 className="font-serif text-[36px] md:text-[52px] text-white leading-[1.1] text-center mb-16 md:mb-20">{t('title')}</h1>
          </FadeUp>

          {FLOW_META.map((step, i) => (
            <div key={i}>
              <FadeUp>
                <Link href={step.href} className="block group">
                  <div
                    style={{
                      position: 'relative',
                      minHeight: 250,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      borderRadius: 12,
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: `url('${step.bg}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: 0.35,
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to bottom, #0D1520 0%, transparent 5%, transparent 95%, #0D1520 100%)',
                      }}
                    />
                    <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '40px 24px' }}>
                      <p
                        className="font-serif text-white leading-[1.45] transition-colors group-hover:text-[#C9912B]"
                        style={{ fontSize: 'clamp(1.3rem, 2vw, 1.7rem)', textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}
                      >
                        {t(step.key)}
                      </p>
                      <span className="font-sans text-[11px] uppercase tracking-[0.18em] mt-3 inline-block opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#C9912B' }}>
                        {t('discover')}
                      </span>
                    </div>
                  </div>
                </Link>
              </FadeUp>
              {i < FLOW_META.length - 1 && <Arrow />}
            </div>
          ))}

        </div>
      </section>
    </div>
  )
}
