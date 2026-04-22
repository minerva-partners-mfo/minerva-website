'use client'

interface ConsentToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
  label: string
}

export function ConsentToggle({ checked, onChange, disabled, label }: ConsentToggleProps) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className="relative shrink-0 transition-colors duration-200 rounded-full"
      style={{
        width: 44,
        height: 24,
        background: checked ? '#D4AF37' : '#061a28',
        border: checked ? '1px solid #D4AF37' : '1px solid rgba(255,255,255,0.15)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.7 : 1,
      }}
    >
      <span
        className="absolute top-[2px] rounded-full transition-transform duration-200"
        style={{
          width: 18,
          height: 18,
          background: 'white',
          boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
          transform: checked ? 'translateX(22px)' : 'translateX(2px)',
        }}
      />
      {disabled && (
        <span className="absolute inset-0 flex items-center justify-center">
          <svg width="10" height="12" viewBox="0 0 10 12" fill="none" className="relative" style={{ left: checked ? 4 : -4 }}>
            <rect x="1" y="5" width="8" height="6" rx="1" stroke="#D4AF37" strokeWidth="1.2" fill="none" />
            <path d="M3 5V3.5C3 2.12 3.9 1 5 1s2 1.12 2 2.5V5" stroke="#D4AF37" strokeWidth="1.2" fill="none" />
          </svg>
        </span>
      )}
    </button>
  )
}
