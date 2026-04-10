/**
 * Inline SVG logo — temple icon + "MINERVA PARTNERS" text.
 * Fully transparent background, works on any dark surface.
 */
export function MinervaLogo({
  width = 140,
  showText = true,
  color = '#c5a35a',
  className = '',
  style,
}: {
  width?: number
  showText?: boolean
  color?: string
  className?: string
  style?: React.CSSProperties
}) {
  const h = showText ? width * 0.65 : width * 0.48
  return (
    <svg
      width={width}
      height={h}
      viewBox={showText ? '0 0 300 195' : '0 0 300 145'}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      {/* ── Temple icon ── */}
      <g transform="translate(75, 0)">
        {/* Top bar (architrave) */}
        <rect x="0" y="0" width="150" height="10" fill={color} />

        {/* Greek key meander — left */}
        <rect x="0" y="10" width="10" height="50" fill={color} />
        <rect x="10" y="10" width="22" height="10" fill={color} />
        <rect x="22" y="20" width="10" height="22" fill={color} />
        <rect x="22" y="32" width="20" height="10" fill={color} />

        {/* Greek key meander — right */}
        <rect x="140" y="10" width="10" height="50" fill={color} />
        <rect x="118" y="10" width="22" height="10" fill={color} />
        <rect x="118" y="20" width="10" height="22" fill={color} />
        <rect x="108" y="32" width="20" height="10" fill={color} />

        {/* 5 columns */}
        <rect x="18" y="55" width="11" height="85" fill={color} />
        <rect x="43" y="55" width="11" height="85" fill={color} />
        <rect x="70" y="55" width="11" height="85" fill={color} />
        <rect x="96" y="55" width="11" height="85" fill={color} />
        <rect x="121" y="55" width="11" height="85" fill={color} />
      </g>

      {/* ── Text ── */}
      {showText && (
        <text
          x="150"
          y="172"
          textAnchor="middle"
          fill={color}
          fontFamily="'Playfair Display', 'Georgia', serif"
          fontSize="22"
          fontWeight="600"
          letterSpacing="0.2em"
        >
          MINERVA PARTNERS
        </text>
      )}
    </svg>
  )
}
