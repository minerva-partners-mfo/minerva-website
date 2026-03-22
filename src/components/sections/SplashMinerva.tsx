'use client'

import { useRef, useEffect } from 'react'

export function SplashMinerva() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.preload = 'auto'
          video.play().catch(() => {})
        }
      },
      { rootMargin: '200px' }
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  const handleEnded = () => {
    videoRef.current?.pause()
  }

  return (
    <section
      ref={sectionRef}
      className="relative h-screen bg-navy-deep overflow-hidden -mt-px"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        playsInline
        preload="metadata"
        onEnded={handleEnded}
        poster="/images/posters/intro-splash.jpg"
      >
        <source src="/videos/intro-splash.mp4" type="video/mp4" />
      </video>
    </section>
  )
}
