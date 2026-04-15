// MINERVA PARTNERS — Custom Premium Icons
// Stile: linea singola dorata, peso 1.2px, elegante, bespoke

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CARD 1 — M&A & Investments
// Due frecce che convergono = unione, fusione
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const IconMA = ({ color = "#C5A059", size = 22 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 8 L16 16 L6 24" />
    <path d="M26 8 L16 16 L26 24" />
    <line x1="16" y1="16" x2="16" y2="28" />
    <circle cx="16" cy="28" r="2" fill="none" />
  </svg>
);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CARD 2 — Real Estate Advisory
// Arco classico con colonne = architettura, immobili di pregio
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const IconRE = ({ color = "#C5A059", size = 22 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 28 L6 12 Q6 4 16 4 Q26 4 26 12 L26 28" />
    <line x1="6" y1="28" x2="26" y2="28" />
    <line x1="11" y1="28" x2="11" y2="16" />
    <line x1="21" y1="28" x2="21" y2="16" />
    <line x1="11" y1="16" x2="21" y2="16" />
  </svg>
);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CARD 3 — Strategy Consulting
// Bussola = direzione, strategia, orientamento
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const IconStrategy = ({ color = "#C5A059", size = 22 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="16" cy="16" r="12" />
    <circle cx="16" cy="16" r="2" />
    <polygon points="16,6 18,14 16,12 14,14" fill={color} stroke="none" opacity="0.6" />
    <polygon points="16,26 14,18 16,20 18,18" fill="none" />
    <line x1="16" y1="2" x2="16" y2="5" />
    <line x1="16" y1="27" x2="16" y2="30" />
    <line x1="2" y1="16" x2="5" y2="16" />
    <line x1="27" y1="16" x2="30" y2="16" />
  </svg>
);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CARD 4 — Wealth Management
// Bilancia classica = equilibrio, ponderazione, giustizia
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const IconWealth = ({ color = "#C5A059", size = 22 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="16" y1="4" x2="16" y2="26" />
    <line x1="4" y1="10" x2="28" y2="10" />
    <circle cx="16" cy="4" r="1.5" fill={color} stroke="none" />
    <path d="M4 10 L7 20 Q7 22 10 22 Q13 22 13 20 L10 10" fill="none" />
    <path d="M22 10 L19 20 Q19 22 22 22 Q25 22 25 20 L28 10" fill="none" />
    <line x1="12" y1="26" x2="20" y2="26" />
  </svg>
);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CARD 5 — Family Advisory
// Albero con radici e rami = genealogia, crescita, stabilita
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const IconFamily = ({ color = "#C5A059", size = 22 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="16" y1="8" x2="16" y2="24" />
    <path d="M16 8 Q10 4 6 6" />
    <path d="M16 8 Q22 4 26 6" />
    <path d="M16 13 Q11 10 8 12" />
    <path d="M16 13 Q21 10 24 12" />
    <path d="M16 24 Q12 28 8 26" />
    <path d="M16 24 Q20 28 24 26" />
    <circle cx="16" cy="8" r="1" fill={color} stroke="none" />
  </svg>
);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CARD 6 — Passion Assets
// Diamante sfaccettato = pregio, rarita, valore intrinseco
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const IconPassion = ({ color = "#C5A059", size = 22 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="16,3 27,12 16,29 5,12" />
    <line x1="5" y1="12" x2="27" y2="12" />
    <line x1="10" y1="12" x2="16" y2="3" />
    <line x1="22" y1="12" x2="16" y2="3" />
    <line x1="10" y1="12" x2="16" y2="29" />
    <line x1="22" y1="12" x2="16" y2="29" />
  </svg>
);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CARD 7 — NextGen <> GenExit
// Doppio cerchio con frecce = passaggio, continuita, ciclo
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const IconNextGen = ({ color = "#C5A059", size = 22 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="16" r="7" />
    <circle cx="21" cy="16" r="7" />
    <path d="M16 10 L18 12 L16 14" />
    <path d="M16 18 L14 20 L16 22" />
  </svg>
);
