'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

export function ContattiPage() {
  const t = useTranslations('contatti')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    source: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // For now just mailto
    window.location.href = `mailto:info@minervapartners.it?subject=Richiesta%20da%20${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message)}`
  }

  return (
    <div className="bg-[#0D1520] pt-28 pb-20">
      {/* Block 1 — Invitation */}
      <section className="px-6 pb-20">
        <div className="max-w-[700px] mx-auto text-center">
          <h1 className="font-serif text-[36px] md:text-[44px] text-white leading-tight">Il prossimo passo</h1>
          <p className="font-sans text-[16px] md:text-[18px] leading-[1.8] mt-8" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Non chiediamo di firmare nulla. Non chiediamo decisioni oggi. Solo un&apos;ora del Suo tempo. Un caffè, una videochiamata, un incontro nel Suo o nei nostri uffici. Ci racconti la Sua situazione. Noi ascoltiamo. Poi Le diciamo onestamente se possiamo aiutarLa o meno. Se non siamo le persone giuste, glielo diremo. Se lo siamo, Le spiegheremo come. Nessun impegno. Nessuna pressione. Solo una conversazione.
          </p>
        </div>
      </section>

      {/* Block 2 — Form + Direct contacts */}
      <section className="px-6 pb-20">
        <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row gap-10">
          {/* Left: Form */}
          <div className="flex-1 rounded-2xl" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,145,43,0.15)', padding: '40px' }}>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block font-sans text-[13px] mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>Nome e Cognome</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full font-sans text-[15px] text-white rounded-lg outline-none focus:ring-0" style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 16px' }} />
              </div>
              <div>
                <label className="block font-sans text-[13px] mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>Email</label>
                <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full font-sans text-[15px] text-white rounded-lg outline-none" style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 16px' }} />
              </div>
              <div>
                <label className="block font-sans text-[13px] mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>Telefono (opzionale)</label>
                <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full font-sans text-[15px] text-white rounded-lg outline-none" style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 16px' }} />
              </div>
              <div>
                <label className="block font-sans text-[13px] mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>Come possiamo aiutarLa?</label>
                <textarea rows={4} required value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full font-sans text-[15px] text-white rounded-lg outline-none resize-none" style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 16px' }} />
              </div>
              <div>
                <label className="block font-sans text-[13px] mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>Come ci ha conosciuto?</label>
                <select value={formData.source} onChange={(e) => setFormData({...formData, source: e.target.value})} className="w-full font-sans text-[15px] text-white rounded-lg outline-none" style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 16px' }}>
                  <option value="" style={{ backgroundColor: '#1A2744' }}>Seleziona...</option>
                  <option value="ricerca" style={{ backgroundColor: '#1A2744' }}>Ricerca personale</option>
                  <option value="presentazione" style={{ backgroundColor: '#1A2744' }}>Presentazione da un membro</option>
                  <option value="evento" style={{ backgroundColor: '#1A2744' }}>Evento</option>
                  <option value="linkedin" style={{ backgroundColor: '#1A2744' }}>LinkedIn</option>
                  <option value="altro" style={{ backgroundColor: '#1A2744' }}>Altro</option>
                </select>
              </div>
              <button type="submit" className="w-full font-sans text-[14px] font-bold text-white rounded-lg transition-colors hover:opacity-90" style={{ backgroundColor: '#C9912B', padding: '14px 40px' }}>
                INVIA RICHIESTA
              </button>
              <p className="font-sans text-[11px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
                I dati verranno trattati secondo la normativa GDPR. Non condividiamo informazioni con terzi.
              </p>
            </form>
          </div>

          {/* Right: Direct contacts */}
          <div className="md:w-[380px] flex-shrink-0">
            <h3 className="font-serif text-[24px] mb-6" style={{ color: '#C9912B' }}>Oppure, direttamente</h3>

            <div className="space-y-4">
              <div className="rounded-xl" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,145,43,0.1)', padding: '24px' }}>
                <p className="font-sans text-[18px] font-bold text-white">Marco Vittoni</p>
                <p className="font-sans text-[14px] mt-1" style={{ color: '#C9912B' }}>Equity Partner</p>
                <a href="https://linkedin.com/in/marcovittoni" target="_blank" rel="noopener noreferrer" className="block font-sans text-[13px] mt-3 hover:underline" style={{ color: '#C9912B' }}>LinkedIn →</a>
              </div>

              <div className="rounded-xl" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,145,43,0.1)', padding: '24px' }}>
                <p className="font-sans text-[18px] font-bold text-white">Enrico Viganò</p>
                <p className="font-sans text-[14px] mt-1" style={{ color: '#C9912B' }}>Equity Partner</p>
                <a href="https://linkedin.com/in/enricovigano" target="_blank" rel="noopener noreferrer" className="block font-sans text-[13px] mt-3 hover:underline" style={{ color: '#C9912B' }}>LinkedIn →</a>
              </div>
            </div>

            <p className="font-sans text-[14px] italic mt-6" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Se conosce già un membro Minerva, chieda a lui di presentarLa. È il modo migliore.
            </p>
          </div>
        </div>
      </section>

      {/* Block 3 — Location */}
      <section className="px-6 pb-10">
        <div className="max-w-[900px] mx-auto text-center">
          <p className="font-sans text-[15px]" style={{ color: 'rgba(255,255,255,0.6)' }}>
            MINERVA PARTNERS S.r.l.<br />
            Via Roggia Vignola, 9 — 24047 Treviglio (BG)<br />
            Tel. 036349160
          </p>
          <div className="mt-8 rounded-xl overflow-hidden" style={{ border: '1px solid rgba(201,145,43,0.1)' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2791.1!2d9.5906!3d45.5227!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDXCsDMxJzIxLjciTiA5wrAzNScyNi4yIkU!5e0!3m2!1sen!2sit!4v1"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Minerva Partners Location"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
