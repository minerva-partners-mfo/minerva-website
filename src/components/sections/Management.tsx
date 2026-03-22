'use client'

import Image from 'next/image'
import { Link } from '@/i18n/navigation'

export function ManagementPage() {
  return (
    <div className="bg-[#0D1520]">
      {/* Hero */}
      <section className="relative h-[50vh] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/img13.png')" }} />
        <div className="absolute inset-0 bg-[#0D1520]/50" />
        <div className="absolute inset-x-0 bottom-0 h-[200px] bg-gradient-to-t from-[#0D1520] to-transparent" />
        <div className="relative z-10 flex items-end h-full pb-16 px-6">
          <div className="max-w-[900px] mx-auto">
            <h1 className="font-serif text-[36px] md:text-[48px] text-white">Management</h1>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="py-16 px-6">
        <div className="max-w-[800px] mx-auto">
          <p className="font-sans text-[16px] md:text-[17px] leading-[1.8]" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Siamo entrambi figli di imprenditori. Marco viene da una famiglia bresciana che opera nella verniciatura industriale da quasi 50 anni. Enrico opera parallelamente nello studio che porta il suo cognome. I problemi che affrontano i clienti li conosciamo. Non perché li abbiamo studiati, perché li abbiamo vissuti. Sappiamo cosa significa vedere un padre lavorare 12 ore al giorno. Sappiamo cosa significa sedersi a tavola e parlare di azienda invece che di vacanze. Sappiamo cosa significa la parola fiducia. Per questo abbiamo fondato Minerva: per offrire ad altri quello che avremmo voluto avere noi.
          </p>
        </div>
      </section>

      {/* Profiles */}
      <section className="py-16 px-6">
        <div className="max-w-[1000px] mx-auto flex flex-col md:flex-row gap-16">
          {/* Marco */}
          <div className="flex-1 flex flex-col items-center md:items-start">
            <Image src="/images/marco.jpg" alt="Marco Vittoni" width={200} height={200} className="rounded-full object-cover" style={{ width: '200px', height: '200px', border: '3px solid #C9912B' }} />
            <h2 className="font-serif text-[28px] text-white mt-6">Marco Vittoni</h2>
            <p className="font-sans text-[16px] mt-1" style={{ color: '#C9912B' }}>Equity Partner</p>
            <p className="font-sans text-[15px] leading-[1.7] mt-4" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Esperto di M&amp;A, corporate finance e advisory in chiave strategico-operativa per PMI e Mid Cap. Opera a fianco di imprenditori, famiglie e investitori istituzionali nelle principali decisioni industriali, finanziarie e patrimoniali. Ha maturato esperienza in diverse banche di investimento in Italia e Svizzera. Ha concluso con successo circa 50 deals aziendali e immobiliari.
            </p>
            <p className="font-sans text-[13px] mt-4" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Laurea in Economia e Management, Università Bocconi. Master presso Universidade Católica Portuguesa, Lisbona.
            </p>
            <a href="https://linkedin.com/in/marcovittoni" target="_blank" rel="noopener noreferrer" className="font-sans text-[13px] mt-3 hover:underline" style={{ color: '#C9912B' }}>LinkedIn →</a>
          </div>

          {/* Enrico */}
          <div className="flex-1 flex flex-col items-center md:items-start">
            <Image src="/images/enrico.jpg" alt="Enrico Viganò" width={200} height={200} className="rounded-full object-cover" style={{ width: '200px', height: '200px', border: '3px solid #C9912B' }} />
            <h2 className="font-serif text-[28px] text-white mt-6">Enrico Viganò</h2>
            <p className="font-sans text-[16px] mt-1" style={{ color: '#C9912B' }}>Equity Partner</p>
            <p className="font-sans text-[15px] leading-[1.7] mt-4" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Dottore Commercialista, operante presso lo Studio Professionale Viganò Srl e Founder di Minerva Partners. Ricopre ruoli di governance come membro del CdA e CFO di Holding di investimento e di SpA, nonché incarichi in collegi sindacali. Specializzato in pianificazione fiscale, strutturazione societaria e advisory patrimoniale per famiglie imprenditoriali.            </p>
            <p className="font-sans text-[13px] mt-4" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Laurea triennale, Università Bocconi. Laurea magistrale EADAP, Università di Bergamo. Esperienza internazionale, Rotterdam School of Management.
            </p>
            <a href="https://linkedin.com/in/enricovigano" target="_blank" rel="noopener noreferrer" className="font-sans text-[13px] mt-3 hover:underline" style={{ color: '#C9912B' }}>LinkedIn →</a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 text-center">
        <Link href="/contatti" className="inline-flex items-center gap-2 font-sans text-[14px] px-8 py-3 rounded-full transition-all duration-300 hover:bg-[#C9912B] hover:text-white" style={{ color: '#C9912B', border: '1px solid #C9912B' }}>
          Vuoi conoscerci? <span>→</span>
        </Link>
      </section>
    </div>
  )
}
