'use client'

const LETTER_SECTIONS = [
  { key: 'architettura', title: "L'ARCHITETTURA", text: "Abbiamo costruito un ecosistema dove confluiscono eccellenze selezionate: il nostro Hub operativo (M&A, Real Estate, Strategy, Wealth Management), Partner indipendenti che hanno firmato il nostro Codice, e Friends che portano competenze, connessioni e prospettive non convenzionali." },
  { key: 'marketplace', title: 'IL MARKETPLACE RISERVATO', text: "Ogni membro dell'ecosistema accede a un portale dove circolano opportunità riservate: deal off-market, co-investimenti, mandati, connessioni. La qualità è garantita dal processo di selezione e dal vaglio dell'Investment Committee." },
  { key: 'codice', title: 'IL CODICE MINERVA', text: "Ogni professionista che entra nell'ecosistema sottoscrive il Codice Minerva: eccellenza, trasparenza, riservatezza, indipendenza, allineamento di interessi. Non è un documento decorativo. È il fondamento su cui si costruisce la fiducia." },
  { key: 'skin', title: 'SKIN IN THE GAME', text: "Quando proponiamo un'opportunità, il nostro primo investitore siamo noi. Il nostro capitale accanto al vostro, negli stessi deal, con le stesse condizioni. Questo è il livello di allineamento che offriamo." },
  { key: 'custodia', title: 'CUSTODIA E CONTINUITÀ', text: "Il patrimonio non è solo denaro. È valori, reputazione, relazioni, competenze. Custodirlo significa proteggerlo, farlo crescere, trasmetterlo e dargli significato. Le decisioni che contano non appartengono al breve, ma alla continuità." },
] as const

export function PensieroPage() {
  return (
    <div className="bg-[#0D1520]">
      {/* Hero */}
      <section className="relative h-[50vh] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/img11.jpg')" }} />
        <div className="absolute inset-0 bg-[#0D1520]/40" />
        <div className="absolute inset-x-0 bottom-0 h-[200px] bg-gradient-to-t from-[#0D1520] to-transparent" />
        <div className="relative z-10 flex flex-col items-start justify-end h-full pb-16 px-6">
          <div className="max-w-[900px] mx-auto w-full">
            <span className="font-sans text-[11px] uppercase block mb-3" style={{ color: '#C9912B', letterSpacing: '0.2em' }}>LETTERA APERTA</span>
            <h1 className="font-serif text-[36px] md:text-[48px] text-white">Il Pensiero</h1>
          </div>
        </div>
      </section>

      {/* The Letter — parchment rectangle */}
      <section className="px-4 md:px-6">
        <div
          style={{
            maxWidth: '850px',
            margin: '0 auto',
            padding: '60px 60px 48px',
            backgroundImage: 'url(/images/pergame.avif)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
            position: 'relative',
          }}
        >
          {/* Lighten overlay */}
          <div style={{ position: 'absolute', inset: '0', backgroundColor: 'rgba(255,255,255,0.15)', pointerEvents: 'none' }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
          <p className="font-serif text-[20px] italic mb-10" style={{ color: '#000000' }}>Gentile Lettore,</p>

          <p className="font-sans text-[15px] leading-[1.9] mb-8" style={{ color: '#0a0a0a' }}>
            Minerva Partners nasce da una convinzione: il patrimonio, nella sua complessità, merita una regia unica, indipendente e profondamente allineata con gli interessi di chi lo ha costruito.
          </p>

          <p className="font-sans text-[15px] leading-[1.9] mb-8" style={{ color: '#0a0a0a' }}>
            Non siamo una banca. Non siamo un fondo. Non siamo l&apos;ennesimo consulente da aggiungere alla lista. Siamo il punto di riferimento che coordina tutto: l&apos;azienda, gli immobili, la finanza, la famiglia, le passioni, il futuro.
          </p>

          {LETTER_SECTIONS.map((section) => (
            <div key={section.key} style={{ marginTop: '36px' }}>
              <h3 className="font-sans text-[13px] font-bold uppercase mb-3" style={{ color: '#8B6914', letterSpacing: '0.1em' }}>{section.title}</h3>
              <p className="font-sans text-[15px] leading-[1.9]" style={{ color: '#0a0a0a' }}>{section.text}</p>
            </div>
          ))}

          <p className="font-serif text-[18px] italic" style={{ color: '#000000', marginTop: '60px' }}>Con stima,</p>

          {/* Signatures + names */}
          <div style={{ display: 'flex', gap: '48px', justifyContent: 'flex-start', marginTop: '32px' }}>
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/firma_marco_transparent.png" alt="Firma Marco Vittoni" style={{ maxWidth: '160px', height: 'auto' }} />
              <p className="font-sans text-[13px] font-semibold" style={{ color: '#0a0a0a', marginTop: '4px' }}>Marco Vittoni</p>
            </div>
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/firma_enrico_transparent.png" alt="Firma Enrico Viganò" style={{ maxWidth: '160px', height: 'auto' }} />
              <p className="font-sans text-[13px] font-semibold" style={{ color: '#0a0a0a', marginTop: '4px' }}>Enrico Viganò</p>
            </div>
          </div>
          <p className="font-sans text-[12px]" style={{ color: '#666666', marginTop: '8px' }}>Minerva Partners</p>
          </div>{/* close z-1 wrapper */}
        </div>
      </section>
    </div>
  )
}
