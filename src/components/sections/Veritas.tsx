'use client'

import { useRef, useState, useEffect } from 'react'

const LETTERS: { letter: string; title: string; desc: string }[] = [
  { letter: 'V', title: 'Visione', desc: "Capacità di leggere il contesto nella sua interezza. Non la singola operazione, ma l'impatto sul sistema complessivo del cliente." },
  { letter: 'E', title: 'Esecuzione', desc: 'Le decisioni devono tradursi in azioni. Minerva non si limita a consigliare. Agisce, anche direttamente, anche con capitale.' },
  { letter: 'R', title: 'Responsabilità', desc: 'Ogni scelta ha conseguenze. Minerva se ne assume il peso, in modo trasparente e continuativo.' },
  { letter: 'I', title: 'Indipendenza', desc: 'Libertà da vincoli esterni. Nessun prodotto da collocare. Le scelte sono fatte esclusivamente nell\u2019interesse del cliente.' },
  { letter: 'T', title: 'Trasparenza', desc: 'Il processo è chiaro, leggibile, tracciabile. Il cliente sa sempre cosa sta accadendo e perché.' },
  { letter: 'A', title: 'Allineamento', desc: 'Minerva opera nella stessa direzione del cliente. Il valore creato è valore reale, non solo teorico.' },
  { letter: 'S', title: 'Selezione', desc: 'Le persone coinvolte fanno la differenza. Solo competenze necessarie, selezionate e vincolate dal Codice.' },
]

function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => setVisible(true), delay); obs.disconnect() }
    }, { threshold: 0.2 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])
  return (
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}>
      {children}
    </div>
  )
}

export function VeritasPage() {
  return (
    <section className="bg-[#0D1520] min-h-screen">
      <div className="px-6 pt-28 md:pt-32 pb-24 max-w-[820px] mx-auto">
        <FadeUp>
          <h1 className="font-serif font-semibold text-white leading-tight text-center" style={{ fontSize: 'clamp(36px, 5vw, 56px)' }}>
            Valori e <span style={{ color: '#C9912B' }}>VERITAS</span>
          </h1>
          <p className="font-sans font-light text-center mt-8 mx-auto" style={{ fontSize: '16px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.75', maxWidth: 700 }}>
            VERITAS nasce dallo studio delle diverse sfere del patrimonio e si traduce in un sistema operativo che guida ogni decisione. Non sono valori dichiarati. Sono principi che vincolano il modo in cui Minerva lavora.
          </p>
        </FadeUp>

        <div className="mt-16 md:mt-20 divide-y divide-white/[0.06]">
          {LETTERS.map((l, i) => (
            <FadeUp key={l.letter} delay={i * 60}>
              <div className="flex items-start gap-6 md:gap-10 py-5 md:py-6">
                <span className="font-serif font-bold leading-none flex-shrink-0" style={{ fontSize: 'clamp(2.6rem, 4.5vw, 3.6rem)', color: '#C9912B', minWidth: '3rem' }}>
                  {l.letter}
                </span>
                <div className="flex-1 pt-1">
                  <h3 className="font-sans font-bold text-white" style={{ fontSize: '17px', letterSpacing: '0.02em' }}>
                    {l.title}
                  </h3>
                  <p className="font-sans font-light mt-1.5" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.65)', lineHeight: '1.65' }}>
                    {l.desc}
                  </p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={200}>
          <p className="font-serif text-white text-center mt-24 md:mt-28 leading-[1.4]" style={{ fontSize: 'clamp(1.3rem, 2vw, 1.7rem)' }}>
            VERITAS non è un modello teorico. È ciò che garantisce che ogni decisione sia coerente. Non nel momento. Nel tempo.
          </p>
        </FadeUp>
      </div>
    </section>
  )
}
