'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

export function IntroSplash({ children }: { children: React.ReactNode }) {
  const [showIntro, setShowIntro] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const dismissedRef = useRef(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const seen = sessionStorage.getItem('minerva-intro-seen')
    if (!seen) {
      setIsMobile(window.innerWidth < 768)
      setShowIntro(true)
    }
  }, [])

  const dismiss = useCallback(() => {
    if (dismissedRef.current) return
    dismissedRef.current = true

    setFadeOut(true)
    sessionStorage.setItem('minerva-intro-seen', 'true')
    setTimeout(() => setShowIntro(false), 1000)
  }, [])

  useEffect(() => {
    if (!showIntro) return

    // Fallback: dismiss after 12s if video stalls
    const fallbackTimer = setTimeout(() => {
      if (!dismissedRef.current) dismiss()
    }, 12000)

    const handleKeyDown = () => dismiss()
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      clearTimeout(fallbackTimer)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [showIntro, dismiss])

  const handleVideoEnd = () => {
    setTimeout(dismiss, 800)
  }

  const handleVideoError = () => {
    dismiss()
  }

  if (!showIntro) return <>{children}</>

  // Pick correct video source based on viewport (media attr is invalid on <source> for <video>)
  const videoSrc = isMobile
    ? '/videos/intro-splash-mobile.mp4'
    : '/videos/intro-splash.mp4'

  return (
    <>
      {/* Intro overlay */}
      <div
        className={`fixed inset-0 z-[9999] bg-navy-deep flex items-center justify-center
          transition-opacity duration-1000 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
        onClick={dismiss}
        role="button"
        tabIndex={0}
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={handleVideoEnd}
          onError={handleVideoError}
          src={videoSrc}
          poster="/images/posters/intro-splash.jpg"
        />

        {/* Skip hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2
          text-white/20 text-[10px] font-sans tracking-[0.3em] uppercase
          animate-pulse">
          Clicca per entrare
        </div>
      </div>

      {/* Site preloads underneath while intro plays */}
      {children}
    </>
  )
}
