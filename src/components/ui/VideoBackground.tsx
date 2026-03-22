'use client'

import { useRef, useEffect, useState } from 'react'

interface VideoBackgroundProps {
  src: string
  overlay?: 'navy' | 'dark'
  poster?: string
}

export function VideoBackground({ src, overlay = 'navy', poster }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [ended, setEnded] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Intersection Observer: preload and play only when near viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && video) {
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
    // Freeze on last frame — NO loop
    if (videoRef.current) {
      videoRef.current.pause()
    }
    setEnded(true)
  }

  const overlayClass =
    overlay === 'navy'
      ? 'bg-gradient-to-r from-navy-deep/80 to-transparent'
      : 'bg-navy-deep/50'

  return (
    <>
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        playsInline
        preload="metadata"
        onEnded={handleEnded}
        poster={poster ?? src.replace('/videos/', '/images/posters/').replace('.mp4', '.jpg')}
      >
        <source src={src} type="video/mp4" />
      </video>

      {/* Base overlay — always visible */}
      <div className={`absolute inset-0 ${overlayClass}`} />

      {/* Post-freeze overlay — fades in after video ends */}
      <div
        className={`absolute inset-0 bg-navy-deep/30 transition-opacity duration-[2000ms] ease-in-out ${
          ended ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </>
  )
}
