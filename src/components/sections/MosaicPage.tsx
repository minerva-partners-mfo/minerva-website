'use client'

import { useRef } from 'react'
import { Link } from '@/i18n/navigation'

interface CardData {
  title: string
  text: string
  num?: string
}

interface StatData {
  value: string
  label: string
  source?: string
}

interface Section {
  type: 'cards' | 'text' | 'stats' | 'differentiator' | 'cta' | 'disclaimer' | 'examples' | 'concrete'
  title?: string
  subtitle?: string
  body?: string
  cards?: CardData[]
  stats?: StatData[]
  quote?: string
  ctaText?: string
  ctaHref?: string
  disclaimer?: string
  examples?: { image: string; text: string }[]
  concrete?: { title: string; text: string }[]
}

interface MosaicPageProps {
  videoSrc: string
  headline: string
  goldPhrase?: string
  goldSubtext?: string
  sections: Section[]
}

export function MosaicPage({ videoSrc, headline, goldPhrase, goldSubtext, sections }: MosaicPageProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <div className="bg-[#0D1520]">
      {/* Hero */}
      <section className="relative w-full h-screen overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={(e) => (e.target as HTMLVideoElement).pause()}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#0D1520]/50" />
        <div className="absolute inset-x-0 bottom-0 h-[200px] bg-gradient-to-t from-[#0D1520] to-transparent" />
        <div className="relative z-10 flex items-end h-full pb-24 px-6">
          <div className="max-w-[900px] mx-auto">
            <h1 className="font-serif text-[36px] md:text-[48px] text-white leading-[1.2]">{headline}</h1>
          </div>
        </div>
      </section>

      {/* Gold phrase */}
      {goldPhrase && (
        <section className="py-16 px-6">
          <div className="max-w-[800px] mx-auto text-center">
            <p className="font-serif text-[28px] md:text-[36px] font-bold leading-[1.3]" style={{ color: '#C9912B' }}>
              {goldPhrase}
            </p>
            {goldSubtext && (
              <p className="font-sans text-[16px] mt-6 leading-[1.7]" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                {goldSubtext}
              </p>
            )}
          </div>
        </section>
      )}

      {/* Sections */}
      {sections.map((section, idx) => {
        switch (section.type) {
          case 'cards':
            return (
              <section key={idx} className="py-16 px-6">
                <div className="max-w-[1100px] mx-auto">
                  {section.title && (
                    <h2 className="font-serif text-[28px] md:text-[32px] text-white mb-2">{section.title}</h2>
                  )}
                  {section.subtitle && (
                    <p className="font-sans text-[16px] mb-10" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>{section.subtitle}</p>
                  )}
                  {section.body && (
                    <p className="font-sans text-[16px] leading-[1.7] mb-10" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>{section.body}</p>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {section.cards?.map((card, ci) => (
                      <div key={ci} className="rounded-xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(201, 145, 43, 0.15)', padding: '28px' }}>
                        {card.num && (
                          <div className="flex items-center justify-center rounded-full mb-3" style={{ width: '28px', height: '28px', backgroundColor: '#C9912B' }}>
                            <span className="font-sans text-[12px] font-bold text-white">{card.num}</span>
                          </div>
                        )}
                        <h3 className="font-sans text-[17px] font-semibold mb-3" style={{ color: '#C9912B' }}>{card.title}</h3>
                        <p className="font-sans text-[13px] leading-[1.6]" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>{card.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )
          case 'text':
            return (
              <section key={idx} className="py-12 px-6">
                <div className="max-w-[900px] mx-auto">
                  {section.title && (
                    <h2 className="font-serif text-[28px] md:text-[32px] text-white mb-4">{section.title}</h2>
                  )}
                  {section.body && (
                    <p className="font-sans text-[16px] leading-[1.7]" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>{section.body}</p>
                  )}
                </div>
              </section>
            )
          case 'stats':
            return (
              <section key={idx} className="py-16 px-6">
                <div className="max-w-[1100px] mx-auto flex flex-wrap justify-center gap-12 md:gap-16">
                  {section.stats?.map((stat, si) => (
                    <div key={si} className="text-center">
                      <span className="block font-serif text-[40px] md:text-[48px] font-bold" style={{ color: '#C9912B' }}>{stat.value}</span>
                      <span className="block font-sans text-[13px] mt-1" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>{stat.label}</span>
                      {stat.source && (
                        <span className="block font-sans text-[11px] mt-1" style={{ color: 'rgba(255, 255, 255, 0.3)' }}>{stat.source}</span>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )
          case 'differentiator':
            return (
              <section key={idx} className="py-16 px-6">
                <div className="max-w-[700px] mx-auto pl-6" style={{ borderLeft: '3px solid #C9912B' }}>
                  <p className="font-serif text-[20px] md:text-[24px] italic text-white leading-[1.6]">{section.quote}</p>
                </div>
              </section>
            )
          case 'cta':
            return (
              <section key={idx} className="py-20 px-6">
                <div className="max-w-[600px] mx-auto text-center">
                  <Link
                    href={section.ctaHref || '/contatti'}
                    className="inline-flex items-center gap-2 font-sans text-[14px] px-8 py-3 rounded-full transition-all duration-300 hover:bg-[#C9912B] hover:text-white"
                    style={{ color: '#C9912B', border: '1px solid #C9912B' }}
                  >
                    {section.ctaText} <span>→</span>
                  </Link>
                </div>
              </section>
            )
          case 'disclaimer':
            return (
              <section key={idx} className="pb-8 px-6">
                <div className="max-w-[900px] mx-auto">
                  <p className="font-sans text-[12px] italic" style={{ color: 'rgba(255, 255, 255, 0.3)' }}>{section.disclaimer}</p>
                </div>
              </section>
            )
          case 'examples':
            return (
              <section key={idx} className="py-16 px-6">
                <div className="max-w-[1100px] mx-auto">
                  {section.title && (
                    <h2 className="font-serif text-[28px] md:text-[32px] text-white mb-8">{section.title}</h2>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {section.examples?.map((ex, ei) => (
                      <div key={ei} className="relative h-[280px] rounded-xl overflow-hidden" style={{ border: '1px solid rgba(201, 145, 43, 0.15)' }}>
                        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${ex.image}')`, filter: 'blur(10px)', transform: 'scale(1.1)' }} />
                        <div className="absolute inset-0 bg-[#0D1520]/40" />
                        <div className="relative z-10 flex items-end h-full p-6">
                          <p className="font-sans text-[14px] text-white/80 leading-relaxed">{ex.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )
          case 'concrete':
            return (
              <section key={idx} className="py-16 px-6">
                <div className="max-w-[1100px] mx-auto">
                  {section.title && (
                    <h2 className="font-serif text-[28px] md:text-[32px] text-white mb-8">{section.title}</h2>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {section.concrete?.map((ex, ei) => (
                      <div key={ei} className="rounded-xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderLeft: '3px solid #C9912B', padding: '24px' }}>
                        {ex.title && <h3 className="font-sans text-[15px] font-bold text-white mb-2">{ex.title}</h3>}
                        <p className="font-sans text-[14px] leading-[1.6]" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>{ex.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )
          default:
            return null
        }
      })}
    </div>
  )
}
