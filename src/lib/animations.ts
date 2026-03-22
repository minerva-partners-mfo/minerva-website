export const ANIMATION_DEFAULTS = {
  fadeUp: {
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
  },
  splitText: {
    stagger: 0.12,
    y: 30,
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out',
  },
  lineExpand: {
    width: 0,
    duration: 0.6,
    delay: 0.5,
    ease: 'power1.inOut',
  },
  counter: {
    duration: 2.5,
    ease: 'power1.out',
  },
  clipCircle: {
    from: 'circle(0% at 50% 50%)',
    to: 'circle(75% at 50% 50%)',
    duration: 1.2,
    ease: 'power2.inOut',
  },
  parallax: {
    yPercent: -30,
  },
} as const

export const SCROLL_TRIGGER_DEFAULTS = {
  start: 'top 80%',
  end: 'bottom 20%',
  toggleActions: 'play none none none' as const,
}

export const STICKY_SECTION_DEFAULTS = {
  start: 'top top',
  end: '+=200%',
  pin: true,
  scrub: 1,
}
