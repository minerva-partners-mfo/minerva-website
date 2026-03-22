import { type ComponentPropsWithoutRef } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'px-9 py-3.5 bg-gold text-navy-deep font-sans text-xs font-bold tracking-[0.15em] uppercase rounded-md hover:bg-gold-light hover:shadow-[0_0_30px_rgba(201,145,43,0.3)] transition-all duration-300',
  secondary:
    'px-9 py-3.5 bg-transparent text-gold border-[1.5px] border-gold/30 font-sans text-xs font-semibold tracking-[0.15em] uppercase rounded-md hover:border-gold hover:bg-gold/5 hover:shadow-[0_0_20px_rgba(201,145,43,0.1)] transition-all duration-300',
  ghost:
    'text-gold font-sans text-xs font-semibold tracking-[0.15em] uppercase hover:underline underline-offset-4 transition-all',
}

export function Button({
  variant = 'primary',
  className = '',
  children,
  ...props
}: {
  variant?: ButtonVariant
  className?: string
  children: React.ReactNode
} & ComponentPropsWithoutRef<'button'>) {
  return (
    <button
      className={`${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
