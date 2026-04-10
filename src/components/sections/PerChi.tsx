'use client'

import { Link } from '@/i18n/navigation'

const PROFILES = [
  {
    img: '/images/img15.png',
    title: "L'imprenditore che deve pensare al futuro",
    situation: "Ha costruito un'azienda di successo. Il fatturato cresce, i dipendenti aumentano, il patrimonio si è diversificato tra immobili, investimenti finanziari e partecipazioni. Ma il tempo è sempre meno. E le domande aumentano: chi coordina tutto? Chi pensa alla successione? Chi protegge ciò che ha costruito?",
    label: 'Cosa facciamo',
    action: "Diventiamo il punto di riferimento unico per tutto il patrimonio. Coordiniamo i professionisti esistenti, colmiamo i gap, creiamo una strategia integrata che tenga insieme azienda, famiglia e patrimonio personale.",
  },
  {
    img: '/images/img30.png',
    title: "L'imprenditore che ha venduto",
    situation: "Ha ceduto l'azienda. L'operazione è andata bene. Ma ora si trova con una liquidità importante e un mondo nuovo da navigare: come investire? Come strutturare il patrimonio? Come proteggere i figli? Come trovare un nuovo scopo?",
    label: 'Cosa facciamo',
    action: "Accompagniamo la transizione post-exit. Strutturiamo il patrimonio, selezioniamo i gestori, pianifichiamo la successione, creiamo opportunità di re-investimento attraverso il nostro deal flow esclusivo.",
  },
  {
    img: '/images/img21.png',
    title: 'La famiglia con patrimonio complesso',
    situation: "Il patrimonio si è accumulato nel tempo: immobili, aziende, investimenti finanziari, collezioni, proprietà all'estero. Ogni pezzo ha il suo professionista. Ma nessuno ha la visione d'insieme. Le decisioni si prendono a compartimenti stagni.",
    label: 'Cosa facciamo',
    action: "Creiamo la cabina di regia che manca. Mappiamo tutto il patrimonio, identifichiamo inefficienze e rischi, coordiniamo ogni professionista verso un obiettivo comune. Una famiglia, una strategia.",
  },
  {
    img: '/images/img13.png',
    title: 'Il professionista di successo',
    situation: "Medico, avvocato, manager, consulente. Ha un reddito elevato e un patrimonio in crescita, ma non ha il tempo né le competenze per gestirlo in modo strutturato. Si affida alla banca di turno, sperando che basti.",
    label: 'Cosa facciamo',
    action: "Offriamo la stessa qualità di advisory che le grandi famiglie hanno sempre avuto. Ottimizziamo la fiscalità, proteggiamo il patrimonio, pianifichiamo il futuro. Senza conflitti di interesse.",
  },
  {
    img: '/images/img19.png',
    title: "Chi arriva dall'estero",
    situation: "Imprenditori e famiglie che si trasferiscono in Italia o che hanno patrimonio distribuito tra più Paesi. Fiscalità complessa, normative diverse, esigenze di compliance cross-border.",
    label: 'Cosa facciamo',
    action: "Coordiniamo la dimensione internazionale. Strutture fiscali ottimizzate, trust e fondazioni, gestione multi-giurisdizionale. Con partner specializzati in ogni Paese.",
  },
  {
    img: '/images/img16.png',
    title: "L'erede che ha ricevuto il testimone",
    situation: "Ha ereditato un patrimonio importante. Forse un'azienda, forse degli immobili, forse entrambi. Si sente la responsabilità sulle spalle, ma non sa da dove cominciare. I professionisti del padre non sempre sono i suoi.",
    label: 'Cosa facciamo',
    action: "Accompagniamo la nuova generazione. Facciamo chiarezza sul patrimonio ricevuto, costruiamo il team di professionisti giusto, definiamo una strategia che sia sua — non quella di chi c'era prima.",
  },
]

export function PerChiPage() {
  return (
    <div className="bg-[#0D1520]">
      {/* Header */}
      <section className="pt-32 md:pt-40 pb-16 md:pb-20 px-6">
        <div className="max-w-[900px] mx-auto text-center">
          <span className="block font-sans text-[10px] font-semibold tracking-[0.25em] uppercase mb-4" style={{ color: '#C9912B' }}>Per chi lavoriamo</span>
          <h1 className="font-serif text-[32px] md:text-[48px] font-semibold leading-[1.15] text-white mb-6">Minerva non è per tutti.</h1>
          <div className="h-[1.5px] w-16 mx-auto mb-8" style={{ backgroundColor: '#C9912B' }} />
          <p className="font-sans text-[16px] md:text-[18px] leading-[1.8]" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Lavoriamo con imprenditori, famiglie e professionisti che hanno un patrimonio complesso e la volontà di gestirlo con metodo. Non cerchiamo clienti. Cerchiamo relazioni di lungo periodo.
          </p>
        </div>
      </section>

      {/* 6 Alternating Profile Sections */}
      {PROFILES.map((profile, i) => {
        const isEven = i % 2 === 0
        return (
          <section key={i} className="py-12 md:py-20 px-6">
            <div className={`max-w-[1100px] mx-auto flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-12 items-center`}>
              {/* Image */}
              <div className="w-full md:w-1/2">
                <div className="relative h-[350px] md:h-[400px] rounded-xl overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url('${profile.img}')` }}>
                  <div className="absolute inset-0 bg-[#0D1520]/20" />
                </div>
              </div>
              {/* Text */}
              <div className="w-full md:w-1/2">
                <h2 className="font-serif text-[24px] md:text-[28px] font-semibold leading-[1.2] text-white mb-4">{profile.title}</h2>
                <p className="font-sans text-[15px] md:text-[16px] leading-[1.8] mb-6" style={{ color: 'rgba(255,255,255,0.65)' }}>
                  {profile.situation}
                </p>
                <span className="block font-sans text-[10px] font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: '#C9912B' }}>{profile.label}</span>
                <p className="font-sans text-[15px] md:text-[16px] leading-[1.8]" style={{ color: 'rgba(255,255,255,0.8)' }}>
                  {profile.action}
                </p>
              </div>
            </div>
          </section>
        )
      })}

      {/* CTA */}
    </div>
  )
}
