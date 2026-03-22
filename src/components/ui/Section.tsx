export function Section({
  children,
  className = '',
  id,
  dark = true,
}: {
  children: React.ReactNode
  className?: string
  id?: string
  dark?: boolean
}) {
  return (
    <section
      id={id}
      className={`relative min-h-screen flex items-center overflow-hidden
        ${dark ? 'bg-navy-deep' : 'bg-cream'}
        py-20 md:py-[120px] px-4 md:px-6
        ${className}`}
    >
      <div className="relative z-10 w-full max-w-[1100px] mx-auto">
        {children}
      </div>
    </section>
  )
}
