# Minerva Partners — Design System

## Colors (Tailwind Config)

```js
// tailwind.config.ts extend.colors
colors: {
  navy: {
    DEFAULT: '#1A2744',
    light: '#243256',
    deep: '#0D1520',
    darkest: '#070D17',
  },
  gold: {
    DEFAULT: '#C9912B',
    light: '#D4A94E',
    pale: '#F5ECD7',
    dim: 'rgba(201,145,43,0.15)',
  },
  cream: {
    DEFAULT: '#F8F6F1',
    dark: '#EDE9E0',
  },
}
```

### Usage Rules
| Color | Use For | NEVER Use For |
|-------|---------|---------------|
| navy-deep #0D1520 | Page background, hero bg, deepest sections | Text color |
| navy #1A2744 | Section backgrounds, navbar, card backgrounds | Nothing — it's your workhorse |
| navy-light #243256 | Hover states on navy elements | Primary backgrounds |
| gold #C9912B | CTA buttons, accent lines, icons, labels, borders | Large background areas (except CTA section) |
| gold-light #D4A94E | Hover states on gold elements | Body text |
| gold-dim rgba(201,145,43,0.15) | Subtle card backgrounds, icon containers | Borders |
| cream #F8F6F1 | Light section backgrounds (rare — use sparingly) | Dark mode sections |
| white #FFFFFF | Text on dark backgrounds | Backgrounds (use navy or cream instead) |
| white/50, white/40, white/35 | Subtitles, body text on dark bg, secondary info | Headlines |
| white/10, white/5 | Borders, subtle dividers, glass effects | Text |

## Typography

### Font Loading (next/font/google)
```tsx
import { Playfair_Display, DM_Sans } from 'next/font/google'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})
```

### Type Scale
| Level | Font | Weight | Desktop | Mobile | Line Height | Letter Spacing | Tailwind |
|-------|------|--------|---------|--------|-------------|----------------|----------|
| Display | Playfair | 700 | 80px | 44px | 1.05 | normal | `font-serif text-[80px] md:text-[80px] text-[44px] font-bold leading-[1.05]` |
| H1 | Playfair | 700 | 64px | 36px | 1.1 | normal | `font-serif text-4xl md:text-[64px] font-bold leading-[1.1]` |
| H2 | Playfair | 600 | 48px | 28px | 1.15 | normal | `font-serif text-[28px] md:text-[48px] font-semibold leading-[1.15]` |
| H3 | Playfair | 500 | 32px | 22px | 1.2 | normal | `font-serif text-[22px] md:text-[32px] font-medium leading-[1.2]` |
| H4 | DM Sans | 700 | 22px | 18px | 1.3 | normal | `font-sans text-lg md:text-[22px] font-bold leading-[1.3]` |
| Body | DM Sans | 400 | 16px | 15px | 1.7 | normal | `font-sans text-[15px] md:text-base leading-[1.7]` |
| Body Large | DM Sans | 300 | 18px | 16px | 1.8 | normal | `font-sans text-base md:text-lg font-light leading-[1.8]` |
| Label | DM Sans | 600 | 11px | 10px | 1.4 | 0.25em | `font-sans text-[10px] md:text-[11px] font-semibold tracking-[0.25em] uppercase` |
| Tag | DM Sans | 600 | 10px | 9px | 1.4 | 0.2em | `font-sans text-[9px] md:text-[10px] font-semibold tracking-[0.2em] uppercase` |
| Small | DM Sans | 400 | 13px | 12px | 1.5 | normal | `font-sans text-xs leading-[1.5]` |

### Italic Usage
- Playfair Display Italic: for the word "Eccellenza" in hero, for quotes, for emphasis in H2/H3
- DM Sans Italic: never (use font-weight changes instead)

## Spacing

### Section Padding
```css
/* Standard section */
.section { padding: 120px 24px; } /* desktop */
.section { padding: 80px 16px; }  /* mobile */

/* Tailwind: py-20 md:py-[120px] px-4 md:px-6 */
```

### Content Width
```css
.content { max-width: 1100px; margin: 0 auto; }
/* Tailwind: max-w-[1100px] mx-auto */
```

### Component Spacing
| Element | Value | Tailwind |
|---------|-------|----------|
| Gap between cards | 24px | `gap-6` |
| Gap between sections | 0 (sections are full-bleed) | — |
| Space after headline | 24-32px | `mb-6 md:mb-8` |
| Space after subtitle | 40-48px | `mb-10 md:mb-12` |
| Space between paragraphs | 16px | `space-y-4` |

## Buttons

### Primary (Gold filled)
```tsx
className="px-9 py-3.5 bg-gold text-navy-deep font-sans text-xs font-bold tracking-[0.15em] uppercase rounded-md hover:bg-gold-light hover:shadow-[0_0_30px_rgba(201,145,43,0.3)] transition-all duration-300"
```

### Secondary (Gold outline)
```tsx
className="px-9 py-3.5 bg-transparent text-gold border-[1.5px] border-gold/30 font-sans text-xs font-semibold tracking-[0.15em] uppercase rounded-md hover:border-gold hover:bg-gold/5 hover:shadow-[0_0_20px_rgba(201,145,43,0.1)] transition-all duration-300"
```

### Ghost (Text only)
```tsx
className="text-gold font-sans text-xs font-semibold tracking-[0.15em] uppercase hover:underline underline-offset-4 transition-all"
```

## Cards

### Standard Dark Card
```tsx
className="relative p-8 md:p-10 rounded-[24px] border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm overflow-hidden group transition-all duration-500 hover:border-white/10"
```

### Gold Highlight on Hover
```css
/* Spotlight effect — add inside card */
.card-spotlight {
  background: radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(201,145,43,0.06), transparent 50%);
  opacity: 0;
  transition: opacity 0.5s;
}
.card:hover .card-spotlight { opacity: 1; }
```

## Navbar

### Structure
- Fixed top, centered pill shape
- Background: transparent → navy-deep/95 + backdrop-blur on scroll
- Logo: Minerva column icon (SVG) + "Minerva" in Playfair 14px
- Links: DM Sans 11px, white/40, hover: gold
- CTA: "Area Riservata" gold filled pill button

### Tailwind
```tsx
className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 py-1.5 pr-1.5 pl-5 rounded-full bg-white/[0.03] backdrop-blur-xl ring-1 ring-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.3)] transition-all duration-500"
// On scroll add: "bg-navy-deep/95"
```

## Animation Specifications

### GSAP Defaults
```ts
// lib/animations.ts
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
    yPercent: -30, // video moves 30% slower
  },
}
```

### ScrollTrigger Standard Config
```ts
scrollTrigger: {
  trigger: element,
  start: 'top 80%',    // for fade-in elements
  end: 'bottom 20%',
  toggleActions: 'play none none none',
}
```

### Sticky Section Config (for multi-step scenes)
```ts
scrollTrigger: {
  trigger: sectionRef,
  start: 'top top',
  end: '+=200%',      // adjust per section
  pin: true,
  scrub: 1,
}
```

### Lenis Smooth Scroll
```ts
// Initialize in layout.tsx
import Lenis from 'lenis'

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  smoothWheel: true,
})

// Connect to GSAP
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)
```

## Video Component Pattern
```tsx
// components/ui/VideoBackground.tsx
'use client'
import { useRef, useEffect } from 'react'

export function VideoBackground({ src, overlay = 'navy' }: { src: string; overlay?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Intersection Observer: preload only when near viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && videoRef.current) {
          videoRef.current.preload = 'auto'
          videoRef.current.play().catch(() => {})
        }
      },
      { rootMargin: '200px' }
    )
    if (videoRef.current) observer.observe(videoRef.current)
    return () => observer.disconnect()
  }, [])

  const overlayClass = overlay === 'navy'
    ? 'bg-gradient-to-r from-navy-deep/80 to-transparent'
    : 'bg-navy-deep/50'

  return (
    <>
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className={`absolute inset-0 ${overlayClass}`} />
    </>
  )
}
```

## Section Component Pattern
```tsx
// components/ui/Section.tsx
export function Section({
  children,
  className = '',
  id,
  dark = true,
}: {
  children: React.ReactNode
  className?: string
  id?: string
  dark?: boolean
}) {
  return (
    <section
      id={id}
      className={`relative min-h-screen flex items-center overflow-hidden
        ${dark ? 'bg-navy-deep' : 'bg-cream'}
        py-20 md:py-[120px] px-4 md:px-6
        ${className}`}
    >
      <div className="relative z-10 w-full max-w-[1100px] mx-auto">
        {children}
      </div>
    </section>
  )
}
```

## Page Template
Every internal page follows this structure:
```tsx
// app/[locale]/pagename/page.tsx
import { useTranslations } from 'next-intl'
import { Section } from '@/components/ui/Section'
import { VideoBackground } from '@/components/ui/VideoBackground'

export default function PageName() {
  const t = useTranslations('pagename')

  return (
    <main>
      {/* Hero Section */}
      <Section className="relative">
        <VideoBackground src="/videos/pagename-hero.mp4" />
        <div className="relative z-10">
          <span className="font-sans text-[11px] font-semibold tracking-[0.25em] uppercase text-gold">
            {t('label')}
          </span>
          <h1 className="font-serif text-4xl md:text-[64px] font-bold leading-[1.1] text-white mt-4">
            {t('headline')}
          </h1>
          <p className="font-sans text-lg font-light text-white/45 leading-[1.8] max-w-xl mt-6">
            {t('subtitle')}
          </p>
        </div>
      </Section>

      {/* Content Sections */}
      <Section>
        {/* ... page-specific content ... */}
      </Section>
    </main>
  )
}
```
