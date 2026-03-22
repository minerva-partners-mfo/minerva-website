'use client'

import { useRef, useLayoutEffect, useCallback } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

/* ═══════════════════════════════════════════
   Tile definitions
   ═══════════════════════════════════════════ */

const TILES = [
  {
    key: 'azienda',
    video: '/videos/sfera-impresa.mp4',
    href: '/azienda',
  },
  {
    key: 'realEstate',
    video: '/videos/sfera-casa.mp4',
    href: '/real-estate',
  },
  {
    key: 'finanza',
    video: '/videos/sfera-patrimonio.mp4',
    href: '/finanza',
  },
  {
    key: 'famiglia',
    video: '/videos/sfera-famiglia.mp4',
    href: '/famiglia',
  },
  {
    key: 'passioni',
    video: '/videos/sfera-vita.mp4',
    href: '/passioni',
  },
  {
    key: 'futuro',
    video: '/videos/sfera-futuro.mp4',
    href: '/futuro',
  },
] as const

/** Entrance animation order: center tiles first (1,4), then outer (0,2,3,5) */
const ENTRANCE_ORDER = [1, 4, 0, 2, 3, 5]

export function IlMosaico() {
  const t = useTranslations('ilMosaico')
  const sectionRef = useRef<HTMLDivElement>(null)
  const tilesRef = useRef<(HTMLDivElement | null)[]>([])
  const videosRef = useRef<(HTMLVideoElement | null)[]>([])
  const overlaysRef = useRef<(HTMLDivElement | null)[]>([])
  const labelsRef = useRef<(HTMLSpanElement | null)[]>([])

  /* ── Entrance animation ── */
  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Set initial state: fully black (overlay 100%), labels hidden, clip-path closed
      TILES.forEach((_, i) => {
        const overlay = overlaysRef.current[i]
        const label = labelsRef.current[i]
        const tileInner = tilesRef.current[i]?.querySelector<HTMLDivElement>('[data-tile-inner]')

        if (overlay) gsap.set(overlay, { opacity: 1 })
        if (label) gsap.set(label, { opacity: 0 })
        if (tileInner) gsap.set(tileInner, { clipPath: 'circle(0% at 50% 50%)' })
      })

      // Build the entrance timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 90%',
          once: true,
        },
      })

      ENTRANCE_ORDER.forEach((tileIndex, orderIndex) => {
        const tileInner = tilesRef.current[tileIndex]?.querySelector<HTMLDivElement>('[data-tile-inner]')
        const overlay = overlaysRef.current[tileIndex]
        const label = labelsRef.current[tileIndex]
        const offset = orderIndex * 0.3

        if (tileInner) {
          tl.to(
            tileInner,
            {
              clipPath: 'circle(75% at 50% 50%)',
              duration: 0.8,
              ease: 'power2.out',
            },
            offset
          )
        }

        if (overlay) {
          tl.to(
            overlay,
            {
              opacity: 0.4,
              duration: 0.6,
              ease: 'power2.out',
            },
            offset + 0.2
          )
        }

        if (label) {
          tl.to(
            label,
            {
              opacity: 1,
              duration: 0.3,
              ease: 'power2.out',
            },
            offset + 0.6
          )
        }
      })
    }, section)

    return () => ctx.revert()
  }, [])

  /* ── Hover handlers ── */
  const handleMouseEnter = useCallback((index: number) => {
    const video = videosRef.current[index]
    const overlay = overlaysRef.current[index]
    if (video) {
      video.loop = true
      video.currentTime = 0
      video.play().catch(() => {})
    }
    if (overlay) {
      gsap.to(overlay, { opacity: 0.3, duration: 0.5, ease: 'power2.out' })
    }
  }, [])

  const handleMouseLeave = useCallback((index: number) => {
    const video = videosRef.current[index]
    const overlay = overlaysRef.current[index]
    if (video) {
      video.loop = false
      video.pause()
    }
    if (overlay) {
      gsap.to(overlay, { opacity: 0.4, duration: 0.5, ease: 'power2.out' })
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-screen h-screen overflow-hidden pt-16 md:pt-[72px]"
    >
      <div className="grid grid-cols-2 grid-rows-3 lg:grid-cols-3 lg:grid-rows-2 w-full h-full">
        {TILES.map((tile, i) => (
          <Link
            key={tile.key}
            href={tile.href}
            ref={(el: HTMLAnchorElement | null) => {
              tilesRef.current[i] = el as unknown as HTMLDivElement | null
            }}
            className="relative block overflow-hidden group"
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseLeave={() => handleMouseLeave(i)}
          >
            <div>
              {/* Inner wrapper for clip-path reveal */}
              <div
                data-tile-inner
                className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-105"
                style={{ clipPath: 'circle(0% at 50% 50%)' }}
              >
                {/* Video background */}
                <video
                  ref={(el) => {
                    videosRef.current[i] = el
                  }}
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  muted
                  playsInline
                  preload="auto"
                  onEnded={(e) => {
                    const vid = e.target as HTMLVideoElement
                    if (!vid.loop) vid.pause()
                  }}
                >
                  <source src={tile.video} type="video/mp4" />
                </video>

                {/* Navy overlay */}
                <div
                  ref={(el) => {
                    overlaysRef.current[i] = el
                  }}
                  className="absolute inset-0 bg-[#0D1520]"
                  style={{ opacity: 1 }}
                />
              </div>

              {/* Gold label — always on top */}
              <span
                ref={(el) => {
                  labelsRef.current[i] = el
                }}
                className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
                style={{ opacity: 0 }}
              >
                <span
                  className="font-serif text-[28px] uppercase text-[#C9912B] px-6 py-2 rounded"
                  style={{
                    letterSpacing: '0.15em',
                    textShadow: '0 2px 12px rgba(0,0,0,0.7), 0 0 40px rgba(0,0,0,0.3)',
                    backgroundColor: 'rgba(0,0,0,0.25)',
                  }}
                >
                  {t(`tiles.${tile.key}`)}
                </span>
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Bottom gradient fade → navy-deep */}
      <div className="absolute inset-x-0 bottom-0 h-[120px] bg-gradient-to-t from-[#0D1520] to-transparent pointer-events-none z-20" />
    </section>
  )
}
