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
      style={{
        position: 'relative',
        width: 44,
        height: 24,
        flexShrink: 0,
        background: checked ? '#D4AF37' : '#061a28',
        border: checked ? '1px solid #D4AF37' : '1px solid rgba(212,175,55,0.2)',
        borderRadius: 12,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        transition: 'all 200ms ease',
        padding: 0,
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: 2,
          left: checked ? 22 : 2,
          width: 18,
          height: 18,
          background: '#ffffff',
          borderRadius: '50%',
          boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
          transition: 'left 200ms ease',
        }}
      />
    </button>
  )
}
