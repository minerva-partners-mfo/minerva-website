# Minerva Partners — Prompt Video AI Completi

## Regole Generali Per TUTTI i Video

### Impostazioni Obbligatorie
| Parametro | Valore |
|-----------|--------|
| Risoluzione | 1920x1080 (16:9) minimo — 4K se disponibile |
| Durata | 8-10 secondi |
| FPS | 24fps (look cinematografico) |
| Loop | Il primo e l'ultimo frame devono essere simili (per autoplay loop) |
| Persone | MAI loghi, MAI testo sovrapposto, MAI sguardi in camera (tranne famiglia) |
| Tono colore | Sempre caldo/dorato (TRANNE Video 7 che è freddo/grigio) |
| Export | .mp4 H.264 |
| Dimensione finale | Max 8MB dopo compressione |

### Workflow Per Ogni Video
1. Apri il software indicato
2. Seleziona "Text to Video" (o "Image to Video" se indicato)
3. Incolla il prompt ESATTAMENTE come scritto
4. Imposta le settings indicate
5. Genera
6. Guarda il risultato — se non ti piace, rigenera (cambia ogni volta)
7. Genera 3-5 VARIANTI dello stesso prompt
8. Scegli la migliore
9. Scarica in .mp4 (massima qualità)
10. Comprimi con HandBrake (vedi sezione finale)
11. Rinomina come indicato

---

## VIDEO 0: INTRO SPLASH (GIÀ ESISTENTE — DA RI-ESPORTARE)
**Scena**: 0 — Brand Reveal (one time per session)
**File desktop**: `intro-splash.mp4`
**File mobile**: `intro-splash-mobile.mp4`
**Software**: IL TUO PROGETTO ORIGINALE (After Effects / Premiere / altro)
**Durata**: 8 secondi ideali (taglia se l'originale è più lungo)
**Obiettivo**: Brand reveal cinematico. L'unico momento in cui Minerva "si presenta" prima di parlare del cliente.

### Cosa ri-esportare
Il video originale è 1080×1080 (quadrato). Serve:

**Versione Desktop (16:9)**:
- Risoluzione: 1920×1080
- Adatta la composizione: centra la colonna, allarga lo sfondo navy ai lati
- RIMUOVI la traccia audio
- Codec: H.264, ~8-12 Mbps (poi comprimi con HandBrake a <5MB)

**Versione Mobile (9:16)**:
- Risoluzione: 1080×1920
- La colonna resta centrata, c'è più spazio sopra e sotto
- Stesse specifiche audio/codec

### Sequenza ideale (8 secondi)
| Secondo | Cosa succede |
|---------|-------------|
| 0-1 | Nero → fade in |
| 1-3 | "Eccellenza senza compromessi." reveal + linea dorata |
| 3-4 | Testo sfuma, buio |
| 4-7 | Colonna 3D dorata emerge con raggi luce |
| 7-8 | Colonna si stabilizza → fade to navy |

### Testo nel video
CAMBIA "IL TUO PATRIMONIO HA BISOGNO DI QUALCUNO CHE LO GUARDI COME LO GUARDI TU..." 
IN → "Eccellenza senza compromessi."
(Il sottotitolo "Il tuo patrimonio..." apparirà nell'Hero DOPO lo splash — non serve due volte)

TOGLI la riga finale "L'ECCELLENZA SENZA COMPROMESSI" — è ridondante col testo iniziale.

### Naming
- `public/videos/intro-splash.mp4` (desktop)
- `public/videos/intro-splash-mobile.mp4` (mobile)

---

## VIDEO 1: HERO
**Scena**: 1 — Il Tuo Mondo
**File**: `hero.mp4`
**Software**: Runway Gen-4.5
**Durata**: 10 secondi
**Obiettivo**: Il video più importante. Deve comunicare: impero, legacy, Italia, calore, ambizione. Il visitatore deve pensare "questo è il mio mondo".

### Settings Runway
```
Model: Gen-4.5 Turbo
Aspect Ratio: 16:9 (Widescreen)
Duration: 10 seconds
Camera Motion: Slow dolly forward
Motion Amount: Low (smooth, lento)
Style: Cinematic
```

### Prompt Principale
```
Slow aerial drone shot at golden hour, Italian Lombardy landscape, rolling vineyard-covered hills, elegant historic stone villa with warm lit windows in middle distance, modern precision manufacturing facility partially visible behind tall cypress trees, warm amber sunlight casting long shadows across green fields, sense of empire legacy and generational wealth, cinematic color grading with warm amber tones, no people visible, shallow depth of field on villa, 4K, photorealistic, subtle organic film grain, seamless 10 second loop, camera slowly drifting forward
```

### Prompt Alternativa A (se il primo non funziona bene)
```
Cinematic slow drone push-in toward grand Italian country estate at golden hour, stone facade villa surrounded by formal Italian gardens, distant hills with vineyards, warm golden light flooding the scene from low sun angle, cypress tree lined driveway leading to estate, atmosphere of quiet power and established wealth, no people, muted warm color palette with deep shadows, photorealistic, 4K, 10 seconds, very gentle forward camera movement
```

### Prompt Alternativa B (più astratto/emotivo)
```
Extreme slow motion golden hour light rays streaming through tall arched windows of Italian palazzo interior, dust particles floating in warm amber light beams, marble floor reflecting golden glow, classical columns in soft focus background, no people, atmosphere of timeless elegance and quiet authority, shallow depth of field, warm rich cinematic color grading, 4K photorealistic, 10 seconds, static camera with subtle light movement
```

---

## VIDEO 2: SFERA IMPRESA
**Scena**: 2 — Le 5 Sfere (01/05)
**File**: `sfera-impresa.mp4`
**Software**: Runway Gen-4.5
**Durata**: 8 secondi
**Obiettivo**: Stabilimento industriale elegante — la bellezza della manifattura italiana. Non freddo/corporate — caldo e orgoglioso. L'imprenditore deve pensare "questa è la mia azienda".

### Settings Runway
```
Model: Gen-4.5 Turbo
Aspect Ratio: 16:9
Duration: 8 seconds
Camera Motion: Slow orbit right
Motion Amount: Low
Style: Cinematic
```

### Prompt Principale
```
Aerial slow drone orbit shot over modern Italian precision manufacturing facility, clean geometric glass and steel architecture with warm wood accents, CNC machinery and robotic arms visible through floor-to-ceiling windows, warm golden morning light streaming into the production floor, subtle steam rising from ventilation, workers in professional attire visible at distance but not focal point, no company logos or text anywhere, industrial beauty and Italian craftsmanship atmosphere, warm amber cinematic color grading, 4K photorealistic, 8 seconds seamless
```

### Prompt Alternativa
```
Cinematic interior tracking shot through modern Italian factory floor, precision metal parts being machined by CNC equipment, warm overhead lighting mixing with natural light from high windows, sparks gently flying in slow motion from welding station in background, clean organized space reflecting pride in craftsmanship, no logos, warm industrial atmosphere, shallow depth of field, amber color grading, 4K, 8 seconds, slow smooth dolly right
```

---

## VIDEO 3: SFERA IMMOBILI
**Scena**: 2 — Le 5 Sfere (02/05)
**File**: `sfera-immobili.mp4`
**Software**: Runway Gen-4.5
**Durata**: 8 secondi
**Obiettivo**: Villa italiana da sogno. Heritage, storia, valore. L'imprenditore deve pensare "qui c'è la mia storia".

### Settings Runway
```
Model: Gen-4.5 Turbo
Aspect Ratio: 16:9
Duration: 8 seconds
Camera Motion: Slow push-in (approaching)
Motion Amount: Low
Style: Cinematic
```

### Prompt Principale
```
Slow drone approach to grand Italian countryside stone villa estate, warm honey-colored ancient stone facade with subtle climbing wisteria, manicured Italian geometric box hedge gardens, tall dark cypress trees framing the entrance, infinity pool in foreground reflecting golden sunset sky and villa, gentle warm breeze moving tree leaves, no people, Tuscan-Lombard architectural style, golden hour warm cinematic light with deep amber tones, 4K photorealistic, 8 seconds, slow continuous approach toward villa entrance
```

### Prompt Alternativa
```
Cinematic aerial shot slowly descending toward historic Italian villa complex, terracotta roof tiles, stone courtyard with central fountain, formal gardens with geometric patterns, olive groves and vineyard rows extending into rolling hills beyond, warm late afternoon golden light, long shadows creating depth, atmosphere of generations of family history, no people, warm saturated color grading, 4K, 8 seconds
```

---

## VIDEO 4: SFERA PATRIMONIO FINANZIARIO
**Scena**: 2 — Le 5 Sfere (03/05)
**File**: `sfera-patrimonio.mp4`
**Software**: Luma Ray3
**Durata**: 8 secondi
**Obiettivo**: Concentrazione, finanza, precisione. Dettaglio intimo. L'imprenditore deve pensare "il mio mondo di numeri e decisioni".

### Settings Luma
```
Model: Ray3
Mode: Hi-Fi
Aspect Ratio: 16:9
Duration: 8 seconds
```

### Prompt Principale
```
Extreme close-up cinematic shot, mature businessman hands carefully reviewing financial portfolio allocation charts on large curved ultrawide monitor, luxury Patek Philippe style watch visible on left wrist, dark polished mahogany desk surface with leather desk pad, small crystal whiskey glass with amber liquid catching warm light, single brass desk lamp providing warm golden side lighting from the left, very shallow depth of field with beautiful bokeh on background bookshelves, multiple portfolio charts and asset allocation graphs visible on screen in soft focus, atmosphere of quiet concentrated high-stakes analysis, warm rich amber color grading, photorealistic, 4K, 8 seconds, very subtle slow camera slide to the right
```

### Prompt Alternativa
```
Close-up detail shot from above looking down at elegant mahogany desk, male hands holding vintage fountain pen reviewing printed financial statements, luxury watch catching desk lamp light, leather portfolio folder open beside documents, warm amber light from single source, scattered charts showing portfolio diversification, atmosphere of meticulous private wealth review, shallow DOF, warm tones, 4K photorealistic, 8 seconds, static camera with subtle pen movement
```

---

## VIDEO 5: SFERA FAMIGLIA
**Scena**: 2 — Le 5 Sfere (04/05)
**File**: `sfera-famiglia.mp4`
**Software**: Kling 2.6
**Durata**: 8 secondi
**Obiettivo**: Il video più emotivo. Tre generazioni. Calore, autenticità, connessione. L'imprenditore deve pensare "la mia famiglia, il mio vero patrimonio".

### Settings Kling
```
Model: Kling 2.6 Standard
Aspect Ratio: 16:9
Duration: 8 seconds
Motion: Medium-Low
```

### Prompt Principale
```
Three generations of Italian family gathered at elegant long rustic wooden dinner table on villa stone terrace at golden sunset, elderly grandfather 75 years old in cream linen shirt smiling warmly, father 50 years old in navy casual linen blazer gesturing while telling story, young adult son 25 and daughter 22 laughing naturally, vine-covered ancient stone pergola overhead filtering warm sunset light, lit candle candelabra on table, wine glasses and Italian dishes, genuine warm animated family conversation with natural gestures, no posing no looking at camera, warm intimate cinematic lighting, shallow depth of field focused on faces, 4K photorealistic, 8 seconds, slow subtle dolly movement right to left
```

### Prompt Alternativa
```
Warm cinematic shot of multigenerational Italian family walking together through private vineyard at golden hour, elderly patriarch arm-in-arm with grandson, father and daughter walking behind in conversation, gentle laughter, tall cypress trees and vine rows creating depth, warm amber backlight from setting sun creating silhouettes and lens flares, natural intimate family moment, no posing, soft warm color grading, 4K, 8 seconds, camera following slowly from side
```

---

## VIDEO 6: SFERA VITA CHE AMI
**Scena**: 2 — Le 5 Sfere (05/05)
**File**: `sfera-vita.mp4`
**Software**: Runway Gen-4.5
**Durata**: 8 secondi
**Obiettivo**: Libertà, passione, Mediterraneo. Il motivo per cui si lavora una vita. L'imprenditore deve pensare "questo è ciò per cui faccio tutto".

### Settings Runway
```
Model: Gen-4.5 Turbo
Aspect Ratio: 16:9
Duration: 8 seconds
Camera Motion: Tracking side shot
Motion Amount: Low
Style: Cinematic
```

### Prompt Principale
```
Slow cinematic aerial tracking shot of classic luxury wooden sailing yacht with white sails cutting through deep blue Mediterranean water, golden hour warm sunlight sparkling on gentle waves creating thousands of light reflections, distant Italian Amalfi coastline with pastel colored villages on cliffs visible in soft focus background, white canvas sails full of gentle wind, clean wooden deck, gentle wake trail behind yacht, no people visible on deck, absolute feeling of freedom elegance and earned reward, warm rich cinematic color grading with deep blues and warm golds, 4K photorealistic, 8 seconds, camera tracking alongside yacht at same speed
```

### Prompt Alternativa A (Auto d'epoca)
```
Cinematic tracking shot of classic vintage dark blue Porsche 911 driving along Italian coastal road at golden hour, Mediterranean sea visible below, stone retaining wall and wild flowers along road edge, warm sunlight creating dramatic shadows and highlights on car body, winding road ahead disappearing around cliff, no visible driver focus on car movement, sense of adventure and refined taste, warm saturated cinematic color grading, 4K, 8 seconds, camera tracking from front quarter angle
```

### Prompt Alternativa B (Montagna)
```
Slow cinematic aerial shot of lone figure standing on mountain peak at golden sunrise, Italian Dolomites dramatic rock formations in background, sea of clouds below, figure in silhouette arms slightly open embracing the vista, warm golden rim light on figure, atmosphere of achievement solitude and perspective, warm amber color grading with cool blue shadows, 4K photorealistic, 8 seconds, very slow orbit around figure
```

---

## VIDEO 7: IL PROBLEMA
**Scena**: 3 — Il Mondo È Cambiato
**File**: `problema.mp4`
**Software**: Kling 2.6
**Durata**: 8 secondi
**Obiettivo**: CONTRASTO TOTALE con tutto il resto. Freddo, grigio, solitudine decisionale. L'imprenditore deve pensare "sì, conosco questa sensazione".

### Settings Kling
```
Model: Kling 2.6 Standard
Aspect Ratio: 16:9
Duration: 8 seconds
Motion: Very Low (quasi statico)
```

### Prompt Principale
```
Single businessman 55 years old in perfectly tailored dark charcoal suit standing completely alone at massive floor-to-ceiling window on 40th floor of modern office tower, cold overcast grey-blue winter morning light flooding the room, blurred modern cityscape far below with tiny cars and buildings in muted grey tones, man with back to camera in contemplative still posture hands clasped behind back, subtle ghostly reflection of his silhouette in the glass, large empty glass desk behind him with scattered documents multiple phones and unopened folders suggesting overwhelm, atmosphere of corporate isolation weight of decisions and quiet frustration, cool strongly desaturated blue-grey color grading with no warm tones at all, 4K photorealistic, 8 seconds, very very slow zoom in toward his shoulders
```

### Prompt Alternativa (più astratto, senza persona)
```
Cinematic overhead shot of large glass conference table in cold modern office, scattered documents folders reports from different consulting firms with different colored covers, multiple mobile phones, cold harsh fluorescent overhead lighting, no people visible only their mess of paperwork, atmosphere of fragmentation overwhelm and lack of coordination, cool blue-grey desaturated color grading, 4K, 8 seconds, very slow zoom out revealing more and more scattered papers
```

---

## VIDEO 8: LA REGIA
**Scena**: 4 — Con Te Non Al Posto Tuo
**File**: `regia.mp4`
**Software**: Runway Gen-4.5
**Durata**: 10 secondi
**Obiettivo**: L'OPPOSTO della Scena 3. Calore, ordine, fiducia, competenza condivisa. Due professionisti che lavorano INSIEME. Il passaggio dal freddo al caldo è il messaggio.

### Settings Runway
```
Model: Gen-4.5 Turbo
Aspect Ratio: 16:9
Duration: 10 seconds
Camera Motion: Very slow push-in
Motion Amount: Very Low
Style: Cinematic
```

### Prompt Principale
```
Two professional men aged 40-50 in smart business attire having calm focused private conversation seated at elegant round walnut table in Italian private study, warm golden ambient light from polished brass desk lamp creating intimate atmosphere, dark wood floor-to-ceiling bookshelves filled with leather-bound books behind them, Chesterfield leather armchairs, architectural blueprints and neatly organized financial documents spread between them on table, both men leaning slightly forward engaged in productive discussion, atmosphere of deep mutual trust shared strategic purpose and quiet confidence, very slow subtle camera push-in creating intimacy, shallow depth of field with beautiful warm bokeh on bookshelves, rich warm amber color grading emphasizing golden tones, 4K photorealistic, 10 seconds
```

### Prompt Alternativa
```
Cinematic medium shot of two men in business casual at private club setting, dark wood paneled room, green banker lamp on side table, one man explaining something with calm hand gestures while other listens intently and nods, single malt whiskey glasses on small table between leather chairs, warm fireplace glow from side, atmosphere of exclusive trusted counsel and shared understanding, intimate warm lighting, shallow DOF, rich amber tones, 4K, 10 seconds, static camera with natural movement of subjects
```

---

## VIDEO 9 (OPZIONALE): EVENTI / NETWORKING
**File**: `eventi.mp4`
**Software**: Kling 2.6
**Durata**: 8 secondi
**Obiettivo**: Per la pagina Eventi e per possibili usi nella homepage. Networking elegante, non corporate generico.

### Prompt Principale
```
Elegant evening networking event on Italian villa terrace overlooking lake at blue hour, small group of 8-10 well-dressed professionals in sophisticated casual attire having animated conversation, warm string lights overhead, wine glasses in hands, soft warm ambient lighting mixing with blue twilight sky, candlelit tables in background, atmosphere of exclusive curated gathering not generic conference, genuine laughter and engaged discussion, warm cinematic color grading, 4K, 8 seconds, slow pan across the group from left to right
```

---

## VIDEO 10 (OPZIONALE): TEXTURE / ABSTRACT
**File**: `texture-marble.mp4`
**Software**: Runway Gen-4.5
**Durata**: 10 secondi
**Obiettivo**: Background sottile per sezioni senza video principale. Quasi statico, elegante.

### Prompt Principale
```
Extreme slow cinematic pan across surface of warm Italian Carrara marble with subtle gold veining, very soft diffused warm lighting creating gentle shadows in the stone texture, macro lens extreme detail of stone grain and crystal structure, minimal movement almost static, atmosphere of timeless luxury material, warm cream and subtle gold tones, 4K, 10 seconds, seamless loop, nearly imperceptible camera drift to the right
```

---

## IMMAGINI STATICHE (Midjourney v7)

Per sfondi, texture, e immagini nelle pagine interne dove il video non serve.

### Account
- Vai su midjourney.com → Sign Up → piano Basic ($10/mese)
- Genera immagini nella chat Discord o nella web interface

### Immagine 1: Colonne neoclassiche (per sfondo VERITAS)
```
/imagine Neoclassical fluted marble column detail, dark navy blue background, dramatic golden side lighting creating sharp defined shadows, single column centered, architectural photography, minimal clean composition, warm gold light on cool stone, 8K --ar 16:9 --v 7 --s 200
```

### Immagine 2: Texture marmo (per sfondo sezioni)
```
/imagine Italian Carrara marble surface texture extreme close-up, warm cream base with delicate gold and grey veining, soft diffused studio lighting, luxury material photography flat lay, 8K --ar 16:9 --v 7 --s 150
```

### Immagine 3: Architettura palazzo (per CTA/about)
```
/imagine Grand Italian palazzo courtyard at golden hour, symmetrical arched colonnade, warm travertine stone, central fountain, formal geometry, warm amber light, architectural photography, no people, timeless elegance, 8K --ar 16:9 --v 7 --s 200
```

### Immagine 4: Dettaglio contratto/firma (per Codice Minerva)
```
/imagine Close-up of vintage fountain pen signing elegant document on dark mahogany desk, warm golden desk lamp light, wax seal stamp visible nearby, leather desk pad, atmosphere of formality and commitment, luxury stationery, 8K --ar 16:9 --v 7 --s 150
```

### Immagine 5: Skyline astratto (per Strategia)
```
/imagine Abstract minimal geometric skyline of Milan Italy, dark navy background, buildings rendered as simple golden wireframe outlines, clean modern data visualization aesthetic, subtle grid overlay, dark and elegant, 8K --ar 16:9 --v 7 --s 250
```

---

## COMPRESSIONE VIDEO PER IL WEB

### Opzione A: HandBrake (gratuito, desktop)
1. Scarica da handbrake.fr → installa
2. Apri HandBrake → Open Source → seleziona il video
3. Impostazioni:
   - Preset: "Fast 1080p30"
   - Video Codec: H.264 (x264)
   - Quality RF: 23 (buon compromesso qualità/peso)
   - Audio: None (rimuovi traccia audio — i video sono muti sul sito)
   - Format: MP4
4. Start Encode
5. Il file risultante dovrebbe essere 3-8MB
6. Se ancora >8MB: alza RF a 26

### Opzione B: Online (senza installazione)
1. Vai su freeconvert.com/video-compressor
2. Carica il video
3. Target size: 8MB
4. Output format: MP4
5. Compress → Download

### Opzione C: FFmpeg (se hai già FFmpeg installato)
```bash
ffmpeg -i input.mp4 -c:v libx264 -crf 23 -preset fast -an -movflags +faststart output.mp4
```

### Naming Convention
Dopo la compressione, rinomina ogni file:
```
hero.mp4
sfera-impresa.mp4
sfera-immobili.mp4
sfera-patrimonio.mp4
sfera-famiglia.mp4
sfera-vita.mp4
problema.mp4
regia.mp4
eventi.mp4 (opzionale)
texture-marble.mp4 (opzionale)
```

Mettili tutti nella cartella: `public/videos/` del progetto Next.js.

---

## RIEPILOGO COSTI VIDEO

| Software | Costo | Video che genera |
|----------|-------|------------------|
| Runway Gen-4.5 ($12/mese) | ~$24 per 2 mesi | Hero, Impresa, Immobili, Vita, Regia, Texture = 6 video |
| Kling 2.6 ($7/mese) | ~$14 per 2 mesi | Famiglia, Problema, Eventi = 3 video |
| Luma Ray3 ($8/mese) | ~$16 per 2 mesi | Patrimonio = 1 video (+ backup per altri) |
| Midjourney ($10/mese) | ~$10 per 1 mese | 5+ immagini statiche |
| **Totale** | **~$64** | **10 video + 5 immagini** |

Genera 3-5 varianti per prompt = ~40-50 generazioni totali.
Budget crediti sufficiente con i piani indicati.
