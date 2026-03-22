# Homepage — 6 Sezioni

## Sezione 1: IL MOSAICO
**Component**: `sections/IlMosaico.tsx`
**Durata scroll**: ~250vh (sticky pin)
**Sfondo**: navy-deep

### Fase 1 — I Video (IL TUO MONDO)
Layout: griglia 3×2 desktop, 2×3 tablet, 1×6 mobile.
6 tessere video, autoplay muted NO loop, freeze on last frame.
Bordo sottile oro/5% tra tessere.

| Posizione | Video | Sfera |
|-----------|-------|-------|
| Top-left | /videos/sfera-impresa.mp4 | L'Impresa |
| Top-center | /videos/sfera-immobili.mp4 | Gli Immobili |
| Top-right | /videos/sfera-patrimonio.mp4 | Il Patrimonio |
| Bottom-left | /videos/sfera-famiglia.mp4 | La Famiglia |
| Bottom-center | /videos/sfera-vita.mp4 | La Vita Che Ami |
| Bottom-right | /videos/sfera-futuro.mp4 | Il Futuro |

Animazione: ScrollTrigger sticky pin.
Tessere: scale-in 0.8→1 + fade 0→1, 0.6s, stagger 0.15s.
Ordine lettura: TL→TC→TR→BL→BC→BR.
Completo: zoom-out 1→0.9, 1.5s.
Label: "IL TUO MONDO" / "YOUR WORLD" — DM Sans 10px, oro/50%, tracking 0.3em.

### Fase 2 — Il Flip (IL NOSTRO IMPEGNO)
Continuando a scrollare, ogni tessera fa un FLIP 3D (come carta che si gira).
Il retro mostra il servizio corrispondente.

| Tessera fronte | Retro — Servizio | Sfondo retro |
|----------------|------------------|-------------|
| L'Impresa | **M&A & Investments** | Oro (Hub) |
| Gli Immobili | **Real Estate Advisory** | Oro (Hub) |
| Il Patrimonio | **Wealth Management** | Oro (Hub) |
| La Famiglia | **Strategy Consulting** | Oro (Hub) |
| La Vita Che Ami | **Partner Services** (8 aree) | Navy + bordo oro |
| Il Futuro | **Friends + Tu** | Navy + bordo oro |

Ogni card retro ha: titolo servizio (Playfair 20px), 1-2 righe descrittive (DM Sans 12px), icona.
Le prime 4: sfondo oro #C9912B, testo navy — Hub = diretto.
Le ultime 2: sfondo navy, bordo oro, testo white — Partner/Friends = attivati.

Animazione flip: rotateY 0→180°, stagger 0.15s, 0.6s each.
Label cambia: "IL TUO MONDO" → "IL NOSTRO IMPEGNO" / "OUR COMMITMENT"

---

## Sezione 2: SPLASH MINERVA
**Component**: `sections/SplashMinerva.tsx`
Video `/videos/intro-splash.mp4` autoplay muted on viewport entry. NO loop, freeze.
Nessun overlay, nessun testo — il video contiene già tutto.
100vh.

---

## Sezione 3: CHI È MINERVA
**Component**: `sections/ChiEMinerva.tsx`
**Sfondo**: navy-deep, nessun video

### BLOCCO A: Statement
Centrato, max-width 800px.

IT:
Minerva Partners non è un semplice Family Office.
È la regia per il tuo patrimonio: consiglia te, coordina i tuoi e i nostri consulenti, rende ogni mossa efficiente. Per te e la tua famiglia nel tempo.

Facciamo miracoli? No.
Facciamo solo ciò che vorresti tu per il tuo patrimonio.

Stile: Playfair 32px, white. "Facciamo miracoli? No." → oro italic.

### BLOCCO B: Il Sistema Minerva

**Parte 1 — Hub**
Intro IT: "Costruiamo soluzioni di eccellenza per qualunque situazione, architettandole ed eseguendole. Le nostre competenze come Hub:"

4 card: M&A & Investments, Real Estate Advisory, Strategy Consulting, Wealth Management.
Sfondo white/[0.03], bordo white/[0.06], bordo sinistro oro 3px.

**Parte 2 — Partner**
Intro IT: "Per tutto ciò che riteniamo più rilevante oggi, ci affidiamo ai migliori professionisti che la pensano come noi e condividono i nostri stessi valori."

8 pill: Servizi Legali, Business Consulting & Tax, Servizi Bancari, Rischi e Assicurativo, Energy Management, Digital Services, Clienti Internazionali, UHNWI Services.

**Parte 3 — Friends e Tu**
IT: "E quando abbiamo bisogno di altro — specializzazioni particolari, o tu vuoi che un tuo consulente di fiducia venga integrato nell'ecosistema — siamo sempre pronti a metterci in gioco e a farlo entrare in squadra. Per te."

### BLOCCO C: Target
IT: "Per famiglie imprenditoriali che cercano qualcuno che guardi il patrimonio come lo guardano loro."

---

## Sezione 4: PERCHÉ È NATA MINERVA
**Component**: `sections/PercheMinerva.tsx`

### Titolo
IT: "Un problema che non riguarda solo l'Italia."

### Sottotitolo
IT: "Il più grande trasferimento di ricchezza della storia è in corso. $124 trilioni entro il 2048. E la maggior parte delle famiglie non è pronta."

### I Numeri (griglia 2×3 desktop)

| Cifra | IT | Fonte |
|-------|----|----|
| $124 trilioni | Ricchezza globale in trasferimento entro il 2048 | Cerulli Associates 2024 |
| 450.000 aziende/anno | Trasferite ogni anno in Europa — di cui 150.000 a rischio chiusura | Commissione Europea |
| 125.000 / anno | Solo in Germania: 1 imprenditore su 3 ha più di 60 anni | KfW Research 2023 |
| 99% | Delle aziende italiane sono PMI. Danno lavoro al 78% della forza lavoro. Oltre il 70% non sopravvive alla seconda generazione | ISTAT, Osservatorio AUB |
| 71% | In Francia, delle aziende sono familiari. Stesse fragilità, stessa urgenza | Bpifrance |
| €11,7 trilioni | Ricchezza privata italiana — terza in Europa. Chi la custodisce? | Banca d'Italia |

### Chiusura
IT: "Non è vendere o non vendere. È progettare una serie intelligente di liquidity events nel tempo, allineati a famiglia, azienda e capitale."

---

## Sezione 5: COME OPERIAMO
**Component**: `sections/ComeOperiamo.tsx`

Titolo IT: "Un modello a confederazione. Attorno a te."
Sottotitolo IT: "Non un catalogo di servizi. Un sistema che si assembla attorno alla tua complessità."

Diagramma SVG hub & spoke, sticky ScrollTrigger, 5 step:
1. Centro: "TUO PATRIMONIO" — 150px, bordo oro doppio
2. Hub: 4 nodi 120-130px oro — M&A, Real Estate, Strategy, Wealth Management
3. Partner: 8 nodi 70-80px white/10 — Legal, Tax, Banking, Energy, Digital, Insurance, Int'l, UHNWI
4. Friends: cerchio esterno tratteggiato
5. TU PARTE ATTIVA

---

## Sezione 6: CTA + FOOTER
**Component**: `sections/CtaFooter.tsx`

Sfondo oro pieno #C9912B.
Headline IT: "Il tuo patrimonio merita lo stesso sguardo con cui lo guardi tu."
Bottone 1: "SCRIVICI PER SAPERNE DI PIÙ" — navy su oro
Bottone 2: "FATTI INTRODURRE" — bordo navy/30

Footer navy-deep: Logo | Via Roggia Vignola, 9 — 24047 Treviglio (BG) | 036349160 | info@minervapartners.it | LinkedIn | © 2026 Minerva Partners S.r.l.
