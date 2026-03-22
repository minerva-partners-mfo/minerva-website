# MINERVA PARTNERS — Website Project

## Identity
- **Company**: Minerva Partners S.r.l. — Multiclient Family Office
- **Tagline**: "Eccellenza senza compromessi"
- **Location**: Via Roggia Vignola, 9 — 24047 Treviglio (BG) Italia
- **Founders**: Marco Vittoni + Enrico Viganò

## Tech Stack
- Next.js 15+ (App Router), TypeScript, Tailwind CSS 4
- GSAP + ScrollTrigger + SplitText, Lenis smooth scroll
- next-intl (IT default + EN), Vercel deployment
- Fonts: Playfair Display + DM Sans (next/font/google)

## Asset Map

### Videos — /public/videos/
| File | Usage |
|------|-------|
| sfera-impresa.mp4 | Homepage Mosaico tessera 1 |
| sfera-immobili.mp4 | Homepage Mosaico tessera 2 |
| sfera-patrimonio.mp4 | Homepage Mosaico tessera 3 |
| sfera-famiglia.mp4 | Homepage Mosaico tessera 4 |
| sfera-vita.mp4 | Homepage Mosaico tessera 5 |
| sfera-futuro.mp4 | Homepage Mosaico tessera 6 |
| intro-splash.mp4 | Homepage Sezione 2 |
| hero.mp4 | Fallback / Posizionamento Italia |
| problema.mp4 | /problema background |
| regia.mp4 | /come-funziona background |
| wall-street.mp4 | /posizionamento blocco 1 |
| geneva.mp4 | /posizionamento blocco 2 |
| london.mp4 | /posizionamento blocco 3 |
| italia.mp4 | /posizionamento blocco 4 |
| singapore.mp4 | /posizionamento blocco 5 |
| eventi.mp4 | /eventi background |
| texture-marble.mp4 | Decorative background |

### Images — /public/images/
| File | Usage |
|------|-------|
| logo.* | Navbar, footer |
| logoPNG.png | Fallback logo |
| marco-vittoni.* | /management |
| enrico-vigano.* | /management |
| firme.* | /pensiero (letter signatures) |
| img1.* | Firma/signing — /codice, /selezione |
| img2.* | Cortile fiorentino — /soluzioni |
| img3.* | Granito texture — background |
| img4.* | Colonna — brand decorative |
| img5.* | 3 gen barca — /next-gen backup |
| img6.* | Studio CF — /hub |
| img7.* | Classe NextGen — /next-gen |
| img8.* | Point Zero — /point-zero |
| img9.* | Professionisti tavolo — /ecosistema, /come-funziona |
| img10.* | Evento Lago Como — /eventi |
| img11.* | Ufficio lusso quadri — /soluzioni, /pensiero |
| time.* | Orologio — /problema, /strategia |
| gennext.* | NextGen — /next-gen |
| room.* | Stanza Minerva — /hub, /codice |
| strategy.* | Strategy/CF — /strategia |

## Homepage Structure (6 Sections)
```
1. IL MOSAICO — 6 video tessere (impresa/immobili/patrimonio/famiglia/vita/futuro)
   → flip: retro mostra servizi corrispondenti su sfondo oro/navy
2. SPLASH MINERVA — Video intro CapCut (NO loop, freeze)
3. CHI È MINERVA — Statement + Hub 4 card + Partner 8 pill + Friends/Tu + Target
4. PERCHÉ È NATA — 6 numeri mercato (trilioni, non abbreviati)
5. COME OPERIAMO — Diagramma SVG hub & spoke animato
6. CTA + FOOTER — Sfondo oro + contatti
```

## Navigation
```
Il Modello
├── Il Problema /problema
├── Come Funziona /come-funziona
├── Posizionamento /posizionamento
└── Settori e Player /settori

Servizi
├── Soluzioni Unified /soluzioni
├── Minerva Hub /hub
├── L'Ecosistema /ecosistema (→ /partners /friends /advisors)
├── Abilitatori /abilitatori
└── Wealth Management /wealth

Fiducia
├── Il Codice Minerva /codice
├── VERITAS /veritas
├── Trasparenza /trasparenza
└── Selezione /selezione

Relazioni e Network
├── Eventi /eventi
├── Point Zero /point-zero
├── Club Deal /club-deal
└── Next Gen <> Gen Exit /next-gen

Chi Siamo
├── Il Pensiero /pensiero
├── Strategia /strategia
├── Management /management
└── Contatti /contatti

[CTA] Area Riservata
```

## CRITICAL RULES

### 1. Video Rules
- ALL videos: autoplay muted playsInline, **NO LOOP**
- Play ONCE then freeze on last frame (video.pause() on onEnded)
- After freeze: subtle navy overlay fades in (opacity 0→0.3, 2s)

### 2. Numbers Display
ALWAYS full numbers with dots as thousand separators:
- ✅ $124 trilioni / €11,7 trilioni (use "trilioni" not T)
- ✅ 450.000
- ❌ 450K, $124T, €11.7T

### 3. Animation Principles
- GSAP + ScrollTrigger for everything
- fadeUp (y:40→0, opacity:0→1, 0.8s, power2.out)
- SplitText for headlines, stagger 0.12s
- useRef + useLayoutEffect, cleanup with ctx.revert()

### 4. Bilingual
- next-intl, Italian default, NEVER hardcode text

### 5. Design
- Dark immersive: navy-deep #0D1520 or navy #1A2744
- Gold #C9912B as accent only — NEVER background except CTA section
- Playfair Display headlines, DM Sans body
- Responsive: 375px, 768px, 1440px
