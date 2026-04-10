/**
 * Minerva Partners logo — inline SVG, fully transparent.
 * Temple icon + MINERVA PARTNERS + L'ECCELLENZA SENZA COMPROMESSI
 */
export function MinervaLogo({
  width = 200,
  iconOnly = false,
  color = '#c5a35a',
  className = '',
  style,
}: {
  width?: number
  iconOnly?: boolean
  color?: string
  className?: string
  style?: React.CSSProperties
}) {
  // Icon-only: square aspect ratio
  if (iconOnly) {
    return (
      <svg width={width} height={width} viewBox="0 0 100 100" fill="none" className={className} style={style}>
        <g transform="translate(10, 5)">
          {/* Top bar */}
          <rect x="0" y="0" width="80" height="6" fill={color} />
          {/* Greek key — left */}
          <rect x="0" y="6" width="6" height="30" fill={color} />
          <rect x="6" y="6" width="12" height="6" fill={color} />
          <rect x="12" y="12" width="6" height="12" fill={color} />
          <rect x="12" y="18" width="12" height="6" fill={color} />
          {/* Greek key — right */}
          <rect x="74" y="6" width="6" height="30" fill={color} />
          <rect x="62" y="6" width="12" height="6" fill={color} />
          <rect x="62" y="12" width="6" height="12" fill={color} />
          <rect x="56" y="18" width="12" height="6" fill={color} />
          {/* 5 columns */}
          <rect x="10" y="34" width="7" height="56" fill={color} />
          <rect x="26" y="34" width="7" height="56" fill={color} />
          <rect x="37" y="34" width="7" height="56" fill={color} />
          <rect x="47" y="34" width="7" height="56" fill={color} />
          <rect x="63" y="34" width="7" height="56" fill={color} />
        </g>
      </svg>
    )
  }

  // Full logo with text
  const aspect = 2.4
  const h = width / aspect
  return (
    <svg width={width} height={h} viewBox="0 0 480 200" fill="none" className={className} style={style}>
      {/* Temple icon centered */}
      <g transform="translate(180, 0)">
        {/* Top bar */}
        <rect x="0" y="0" width="120" height="8" fill={color} />
        {/* Greek key — left */}
        <rect x="0" y="8" width="8" height="40" fill={color} />
        <rect x="8" y="8" width="16" height="8" fill={color} />
        <rect x="16" y="16" width="8" height="16" fill={color} />
        <rect x="16" y="24" width="16" height="8" fill={color} />
        {/* Greek key — right */}
        <rect x="112" y="8" width="8" height="40" fill={color} />
        <rect x="96" y="8" width="16" height="8" fill={color} />
        <rect x="96" y="16" width="8" height="16" fill={color} />
        <rect x="88" y="24" width="16" height="8" fill={color} />
        {/* 5 columns */}
        <rect x="14" y="44" width="10" height="74" fill={color} />
        <rect x="34" y="44" width="10" height="74" fill={color} />
        <rect x="55" y="44" width="10" height="74" fill={color} />
        <rect x="76" y="44" width="10" height="74" fill={color} />
        <rect x="96" y="44" width="10" height="74" fill={color} />
      </g>

      {/* MINERVA PARTNERS */}
      <text
        x="240"
        y="148"
        textAnchor="middle"
        fill={color}
        fontFamily="'Playfair Display', Georgia, serif"
        fontSize="26"
        fontWeight="500"
        letterSpacing="8"
      >
        MINERVA PARTNERS
      </text>

      {/* L'ECCELLENZA SENZA COMPROMESSI */}
      <text
        x="240"
        y="175"
        textAnchor="middle"
        fill={color}
        fontFamily="'Playfair Display', Georgia, serif"
        fontSize="11"
        fontWeight="400"
        letterSpacing="4"
        opacity="0.65"
      >
        {"L'ECCELLENZA SENZA COMPROMESSI"}
      </text>
    </svg>
  )
}
