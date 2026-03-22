# Intro Splash — Specifiche

## Il Video Intro

### Ri-esportazione dal progetto originale
Esporta il video con queste impostazioni ESATTE:

| Parametro | Valore | Perché |
|-----------|--------|--------|
| Risoluzione | 1920×1080 (16:9 widescreen) | Full-bleed su desktop senza bande nere |
| Codec | H.264 | Compatibilità browser universale |
| FPS | 30fps (come l'originale) | Mantieni la fluidità |
| Audio | RIMUOVI la traccia audio | I browser bloccano autoplay con audio |
| Durata | Accorcia a 8-9 secondi se possibile | 12s è troppo — il web è impaziente |
| Ultimo frame | Deve essere il logo completo su navy (#1A2744) | Deve fondersi perfettamente con lo sfondo dell'Hero |
| Nome file | `intro-splash.mp4` | |

### Cosa tagliare / modificare nel progetto originale
1. **Mantieni**: il testo "IL TUO PATRIMONIO HA BISOGNO DI QUALCUNO CHE LO GUARDI COME LO GUARDI TU..." con underline dorato
2. **Mantieni**: la transizione alla colonna 3D dorata con raggi di luce (è potentissima)
3. **Mantieni**: il logo finale che si stabilizza
4. **Cambia**: "L'ECCELLENZA SENZA COMPROMESSI" → "ECCELLENZA SENZA COMPROMESSI" (senza L' — coerenza con il sito)
5. **Opzionale**: aggiungi "MULTICLIENT FAMILY OFFICE" sotto il logo finale (come nel brand)
6. **Taglia**: tutto ciò che porta oltre i 9 secondi — l'ultimo frame col logo può durare meno
7. **L'ultimo frame navy deve essere ESATTAMENTE #1A2744** — così quando sfuma nell'Hero la transizione è invisibile

### Compressione dopo l'export
```
HandBrake: Preset "Fast 1080p30" → RF 22 (qualità alta, è l'intro) → Audio: None → MP4
Obiettivo: max 6-8MB
```

---

## Come Funziona Tecnicamente nel Sito

### Componente: `IntroSplash.tsx`

Il componente fa questo:
1. Al primo caricamento del sito → mostra il video a schermo intero (100vw × 100vh)
2. Il video parte in autoplay, muted, senza controlli
3. Quando il video finisce (evento `onEnded`) → fade-out in 1 secondo → rivela l'Hero sotto
4. Salva in `sessionStorage` che l'intro è stata vista → alle visite successive NON si mostra più
5. Il visitatore può SKIPPARE cliccando ovunque o premendo qualsiasi tasto

### Logica (pseudocodice)
```tsx
'use client'
import { useState, useEffect, useRef } from 'react'

export function IntroSplash({ children }: { children: React.ReactNode }) {
  const [showIntro, setShowIntro] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Check if already seen this session
    const seen = sessionStorage.getItem('minerva-intro-seen')
    if (!seen) {
      setShowIntro(true)
    }
  }, [])

  const dismissIntro = () => {
    setFadeOut(true)
    sessionStorage.setItem('minerva-intro-seen', 'true')
    setTimeout(() => setShowIntro(false), 1000) // 1s fade-out
  }

  const handleVideoEnd = () => {
    // Small pause on last frame (logo), then fade
    setTimeout(dismissIntro, 800)
  }

  const handleSkip = () => {
    dismissIntro()
  }

  if (!showIntro) return <>{children}</>

  return (
    <>
      {/* Intro overlay */}
      <div
        className={`fixed inset-0 z-[9999] bg-navy-deep flex items-center justify-center
          transition-opacity duration-1000 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
        onClick={handleSkip}
        onKeyDown={handleSkip}
        role="button"
        tabIndex={0}
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnd}
        >
          <source src="/videos/intro-splash.mp4" type="video/mp4" />
        </video>

        {/* Skip hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 
          text-white/20 text-[10px] font-sans tracking-[0.3em] uppercase
          animate-pulse">
          Clicca per entrare
        </div>
      </div>

      {/* Hero + rest of site underneath (preloads while intro plays) */}
      {children}
    </>
  )
}
```

### Integrazione nel Layout
```tsx
// app/[locale]/layout.tsx
import { IntroSplash } from '@/components/ui/IntroSplash'

export default function Layout({ children }) {
  return (
    <html>
      <body>
        <IntroSplash>
          <Navbar />
          {children}
          <Footer />
        </IntroSplash>
      </body>
    </html>
  )
}
```

### Comportamento
| Situazione | Cosa succede |
|------------|-------------|
| Prima visita | Intro splash → 8-9s video → fade-out 1s → Hero appare |
| Click durante intro | Skip immediato → fade-out → Hero |
| Tasto qualsiasi | Skip immediato → fade-out → Hero |
| Seconda visita (stessa sessione) | NO intro, Hero immediato |
| Nuova sessione (browser chiuso e riaperto) | Intro di nuovo |
| Mobile | Stessa cosa, video object-cover si adatta |

### Performance
- Il sito (Hero + tutto il resto) si PRE-CARICA durante l'intro
- Quando l'intro sfuma, l'Hero è già pronto — nessun caricamento
- L'intro è un bonus, non un blocco: se il video non carica → skip automatico dopo 2s

---

## Flusso Aggiornato Homepage

```
INTRO SPLASH (8-9s, una volta per sessione)
    ↓ fade-out 1s
SCENA 1: HERO — "Eccellenza senza compromessi" + sottotitolo + CTA
    ↓ scroll
SCENA 2: LE 5 SFERE — Il mondo del cliente (5 video full-bleed)
    ↓ scroll  
SCENA 3: IL MONDO È CAMBIATO — 4 step (cambiamento → risposta sbagliata → urgenza → Minerva entra)
    ↓ scroll
SCENA 4: LA REGIA — "Con te, non al posto tuo"
    ↓ scroll
SCENA 5: IL SISTEMA — Hub + Partners + Friends + Tu come parte attiva
    ↓ scroll
SCENA 6: LA PROVA — Numeri + VERITAS
    ↓ scroll
SCENA 7: L'INVITO — CTA gold + Footer
```

### Nota sulla coerenza visiva intro → hero
L'ultimo frame dell'intro mostra il logo su navy. L'Hero ha sfondo navy-deep con video.
La transizione deve essere INVISIBILE: l'intro sfuma → il navy dell'ultimo frame si fonde col navy dell'Hero → il video hero inizia a caricarsi sotto. Il visitatore non deve percepire uno "stacco" — deve sembrare che il sito si "apra" naturalmente dopo l'intro.

Per ottenere questo:
1. L'ultimo frame dell'intro DEVE avere background #1A2744 (navy)
2. L'Hero inizia con sfondo #0D1520 (navy-deep) → il video carica sopra
3. Il fade-out dell'intro + il fade-in del video hero si sovrappongono di 0.5s
