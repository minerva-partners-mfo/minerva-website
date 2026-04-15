'use client'

export function ColumnLogo({
  size = 72,
  color = '#C5A059',
  className = '',
}: {
  size?: number
  color?: string
  className?: string
}) {
  return (
    <svg
      width={size}
      height={size * 1.1}
      viewBox="0 0 100 110"
      fill="none"
      className={className}
    >
      <path
        d="M15 25 L15 15 Q15 5 25 5 L75 5 Q85 5 85 15 L85 25"
        stroke={color}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M10 25 L90 25"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line x1="25" y1="28" x2="25" y2="90" stroke={color} strokeWidth="4" strokeLinecap="round" />
      <line x1="40" y1="28" x2="40" y2="90" stroke={color} strokeWidth="4" strokeLinecap="round" />
      <line x1="55" y1="28" x2="55" y2="90" stroke={color} strokeWidth="4" strokeLinecap="round" />
      <line x1="70" y1="28" x2="70" y2="90" stroke={color} strokeWidth="4" strokeLinecap="round" />
      <path d="M8 90 L92 90" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <path d="M5 93 L95 93" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M10 25 Q10 20 15 15" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M90 25 Q90 20 85 15" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  )
}
