'use client'

/**
 * RadarOrbit — cerchi concentrici gold stile radar/orbita
 * size: diametro in px
 */
export function RadarOrbit({ size = 300 }: { size?: number }) {
  const c = size / 2
  const r1 = size * 0.15
  const r2 = size * 0.27
  const r3 = size * 0.38
  const r4 = size * 0.48

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      className="radar-orbit"
      style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }}
    >
      {/* Cerchi concentrici tratteggiati */}
      <circle cx={c} cy={c} r={r1} stroke="#C5A059" strokeWidth="0.5" strokeDasharray="3 6" opacity="0.18" />
      <circle cx={c} cy={c} r={r2} stroke="#C5A059" strokeWidth="0.5" strokeDasharray="5 10" opacity="0.12" />
      <circle cx={c} cy={c} r={r3} stroke="#C5A059" strokeWidth="0.5" strokeDasharray="4 12" opacity="0.09" />
      <circle cx={c} cy={c} r={r4} stroke="#C5A059" strokeWidth="0.5" strokeDasharray="6 14" opacity="0.06" />

      {/* Croce — linee verticale e orizzontale */}
      <line x1={c} y1={c - r4} x2={c} y2={c + r4} stroke="#C5A059" strokeWidth="0.5" opacity="0.08" />
      <line x1={c - r4} y1={c} x2={c + r4} y2={c} stroke="#C5A059" strokeWidth="0.5" opacity="0.08" />

      {/* Linea diagonale rotante */}
      <line
        x1={c}
        y1={c - r4}
        x2={c}
        y2={c + r4}
        stroke="#C5A059"
        strokeWidth="0.8"
        opacity="0.15"
        className="radar-sweep"
        style={{ transformOrigin: `${c}px ${c}px` }}
      />

      {/* Piccoli tick marks sui cerchi */}
      {[0, 90, 180, 270].map((deg) => {
        const rad = (deg * Math.PI) / 180
        return (
          <line
            key={deg}
            x1={c + Math.cos(rad) * (r2 - 4)}
            y1={c + Math.sin(rad) * (r2 - 4)}
            x2={c + Math.cos(rad) * (r2 + 4)}
            y2={c + Math.sin(rad) * (r2 + 4)}
            stroke="#C5A059"
            strokeWidth="0.8"
            opacity="0.15"
          />
        )
      })}

      {/* Dot al centro */}
      <circle cx={c} cy={c} r="2" fill="#C5A059" opacity="0.25" />

      <style>{`
        .radar-sweep {
          animation: radar-rotate 20s linear infinite;
        }
        @keyframes radar-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </svg>
  )
}
