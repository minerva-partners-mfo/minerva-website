'use client'

import {
  LineChart, Line, BarChart, Bar, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'
import { Link } from '@/i18n/navigation'

// ══════════════════════════════════════
// CHART DATA
// ══════════════════════════════════════

const HNWI_DATA = [
  { year: '1960', wealth: 18, population: 12 },
  { year: '1970', wealth: 45, population: 25 },
  { year: '1980', wealth: 120, population: 55 },
  { year: '1990', wealth: 280, population: 90 },
  { year: '2000', wealth: 520, population: 130 },
  { year: '2010', wealth: 780, population: 170 },
  { year: '2020', wealth: 1100, population: 210 },
  { year: '2025', wealth: 1450, population: 240 },
  { year: '2030E', wealth: 1900, population: 275 },
  { year: '2040E', wealth: 2800, population: 323 },
]

const AGING_DATA = [
  { range: '<50 anni', pct: 18 },
  { range: '50-59 anni', pct: 28 },
  { range: '60-69 anni', pct: 32 },
  { range: '70+ anni', pct: 22 },
]

// Country flags mapped to bar index
// barIndex: 0=<50, 1=50-59, 2=60-69, 3=70+
const COUNTRY_FLAGS = [
  { img: '/images/Flag_of_the_United_States.webp', age: 58, barIndex: 1, posInBar: 0.8 },
  { img: '/images/Flag_of_the_United_Kingdom.svg', age: 60, barIndex: 2, posInBar: 0.0 },
  { img: '/images/Flag_of_France.webp', age: 63, barIndex: 2, posInBar: 0.3 },
  { img: '/images/Flag_of_Germany.svg', age: 66, barIndex: 2, posInBar: 0.6 },
  { img: '/images/Flag_of_Italy.svg', age: 67, barIndex: 2, posInBar: 0.7, highlight: true },
  { img: '/images/Flag_of_Japan.png', age: 70, barIndex: 3, posInBar: 0.0 },
]

const MEGATRENDS = [
  { num: '01', title: 'FOREIGN OWNERSHIP TAKEOVER', prob: '80-90%', text: 'PMI controllate da stranieri: 29% \u2192 48% nel 2040' },
  { num: '02', title: 'EMIGRAZIONE HNWI', prob: '70-80%', text: '5.000-8.000 HNWI/anno lasciano l\u2019Italia. Net loss \u20AC10-30 miliardi' },
  { num: '03', title: 'LONGEVIT\u00c0 ESTREMA', prob: '85-95%', text: 'Il 22% dei leader ha 70+ anni. Eredi prendono controllo a 50-55 anni' },
  { num: '04', title: 'NEXT-GEN IMPREPARATI', prob: '75-85%', text: '39% imprenditori crede che nessun erede sar\u00e0 in azienda' },
  { num: '05', title: 'POLITICHE MAL STRUTTURATE', prob: '80-90%', text: 'Governi durata media 1,2 anni. Riforme impossibili' },
  { num: '06', title: 'COLLASSO DEMOGRAFICO', prob: '95%+', text: 'Ratio pensionati/lavoratori: da 3:1 a 1,5:1 nel 2040' },
  { num: '07', title: 'DISRUPTION TECH', prob: '70-80%', text: 'Italia gap -15-20pp vs Germania in automazione' },
  { num: '08', title: 'COMPLIANCE ESG', prob: '80-90%', text: '\u20AC170.000-555.000/anno costi compliance per PMI. EBITDA eroso 2-4pp' },
  { num: '09', title: 'FRAGILIT\u00c0 ENERGETICA', prob: '70-80%', text: 'Carbon price: \u20AC80/ton \u2192 \u20AC150+/ton nel 2040' },
  { num: '10', title: 'CAPITALE SPECULATIVO', prob: '60-70%', text: 'Milano affitti commerciali: +100-200% in 15 anni' },
]

// Custom tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null
  return (
    <div style={{ backgroundColor: '#1A2744', border: '1px solid rgba(201,145,43,0.2)', borderRadius: '8px', padding: '12px 16px' }}>
      <p className="font-sans text-[12px] text-white font-bold">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} className="font-sans text-[11px]" style={{ color: p.color || '#C9912B' }}>
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  )
}

// Helpers
function StatCard({ value, label, source }: { value: string; label: string; source?: string }) {
  return (
    <div className="text-center">
      <span className="block font-serif text-[36px] md:text-[48px] font-bold" style={{ color: '#C9912B' }}>{value}</span>
      <span className="block font-sans text-[14px] mt-1" style={{ color: 'rgba(255,255,255,0.6)' }}>{label}</span>
      {source && <span className="block font-sans text-[10px] mt-1" style={{ color: 'rgba(255,255,255,0.25)' }}>{source}</span>}
    </div>
  )
}

function Section({ children }: { children: React.ReactNode }) {
  return <section className="py-16 md:py-20 px-6"><div className="max-w-[1100px] mx-auto">{children}</div></section>
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="font-serif text-[28px] md:text-[32px] text-white mb-4">{children}</h2>
}

function ChartSource({ children }: { children: React.ReactNode }) {
  return <p className="font-sans text-[10px] mt-4 text-center" style={{ color: 'rgba(255,255,255,0.25)' }}>{children}</p>
}

// ══════════════════════════════════════
// FUNNEL DATA for survival
// ══════════════════════════════════════
const FUNNEL = [
  { gen: '1a generazione', sub: 'Fondatore', pct: 100 },
  { gen: '2a generazione', sub: '', pct: 30 },
  { gen: '3a generazione', sub: '', pct: 13 },
  { gen: '4a generazione', sub: '', pct: 4 },
]

// ══════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════
export function StrategiaPage() {
  return (
    <div className="bg-[#0D1520]">
      {/* Hero */}
      <section className="relative h-[50vh] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/strategy.webp')" }} />
        <div className="absolute inset-0 bg-[#0D1520]/50" />
        <div className="absolute inset-x-0 bottom-0 h-[200px] bg-gradient-to-t from-[#0D1520] to-transparent" />
        <div className="relative z-10 flex flex-col items-start justify-end h-full pb-16 px-6">
          <div className="max-w-[900px] mx-auto w-full">
            <h1 className="font-serif text-[36px] md:text-[48px] text-white">Strategia</h1>
            <p className="font-sans text-[18px] mt-2" style={{ color: 'rgba(255,255,255,0.6)' }}>Dove va il mercato. Dove siamo noi.</p>
          </div>
        </div>
      </section>

      {/* ═══ S1: CONTEXT ═══ */}
      <Section>
        <SectionTitle>Il contesto: una ricchezza enorme ma frammentata</SectionTitle>
        <p className="font-serif text-[24px] md:text-[28px] text-white mb-10">La ricchezza c&apos;è, e cresce. Ma chi la gestisce?</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatCard value="€11.286 miliardi" label="Ricchezza netta famiglie italiane" source="Banca d'Italia 2023" />
          <StatCard value="240.000" label="HNWI in Italia (2025). Saranno 323.000 nel 2040." source="Capgemini 2025" />
          <StatCard value="64-67%" label="Ricchezza HNWI in business equity. Illiquida, concentrata." />
          <StatCard value="€1.371 miliardi" label="Gestiti dal Private Banking. Solo il 36% del mercato." source="AIPB Q3 2025" />
        </div>
      </Section>

      {/* ═══ CHART 1: HNWI GROWTH ═══ */}
      <Section>
        <h3 className="font-sans text-[14px] uppercase tracking-wider mb-6" style={{ color: '#C9912B' }}>HNWI Italia: ricchezza e popolazione 1960-2040E</h3>
        <div style={{ width: '100%', height: '400px' }}>
          <ResponsiveContainer>
            <LineChart data={HNWI_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="year" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} />
              <YAxis yAxisId="left" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} label={{ value: 'Wealth (USD mld)', angle: -90, position: 'insideLeft', style: { fill: 'rgba(255,255,255,0.3)', fontSize: 10 } }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} label={{ value: 'Popolazione (migliaia)', angle: 90, position: 'insideRight', style: { fill: 'rgba(255,255,255,0.3)', fontSize: 10 } }} />
              <Tooltip content={<CustomTooltip />} />
              <Line yAxisId="left" type="monotone" dataKey="wealth" stroke="#C9912B" strokeWidth={2} dot={{ fill: '#C9912B', r: 4 }} name="Wealth (USD mld)" />
              <Line yAxisId="right" type="monotone" dataKey="population" stroke="#C9912B" strokeWidth={2} strokeDasharray="5 5" dot={{ fill: '#C9912B', r: 3 }} name="Popolazione (migliaia)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <ChartSource>Elaborazione Minerva Partners su dati Capgemini, Banca d&apos;Italia, Credit Suisse</ChartSource>
      </Section>

      {/* ═══ S2: STRUCTURAL PROBLEM ═══ */}
      <Section>
        <SectionTitle>5-7 professionisti. Zero coordinamento.</SectionTitle>
        <p className="font-sans text-[16px] leading-[1.7] mb-10" style={{ color: 'rgba(255,255,255,0.7)' }}>
          Un imprenditore italiano con patrimonio significativo ha mediamente 5-7 professionisti che non si parlano tra loro. Ognuno ottimizza il proprio pezzetto, nessuno vede il quadro.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatCard value="81%" label="Degli eredi cambierà consulente entro 1-2 anni" source="Capgemini 2025" />
          <StatCard value="70%" label="Delle aziende familiari non sopravvive alla 2a gen" source="AUB Bocconi" />
          <StatCard value="18%" label="Ha un piano di successione strutturato" source="AUB/ISTAT" />
          <StatCard value="80,6%" label="Consulenza ancora a retrocessioni" source="AIPB 2025" />
        </div>
      </Section>

      {/* ═══ S3: GREAT TRANSFER ═══ */}
      <Section>
        <SectionTitle>€83.500 miliardi in movimento</SectionTitle>
        <p className="font-sans text-[16px] leading-[1.7] mb-10" style={{ color: 'rgba(255,255,255,0.7)' }}>
          Nei prossimi 20 anni, il più grande trasferimento di ricchezza della storia. In Italia, 2-2,5 milioni di imprese affronteranno un passaggio generazionale.
        </p>

        {/* Aging chart with country flags on bars */}
        <h3 className="font-sans text-[14px] uppercase tracking-wider mb-6" style={{ color: '#C9912B' }}>Età dei leader di aziende familiari italiane</h3>
        <div className="relative" style={{ width: '100%', height: '340px' }}>
          <ResponsiveContainer>
            <BarChart data={AGING_DATA} layout="vertical" margin={{ right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis type="number" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} domain={[0, 40]} />
              <YAxis type="category" dataKey="range" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} width={100} />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="pct"
                name="%"
                radius={[0, 4, 4, 0]}
                label={({ x, y, width, height, index }: any) => {
                  const flags = COUNTRY_FLAGS.filter((f) => f.barIndex === index)
                  if (flags.length === 0) return null
                  const flagH = height * 0.65
                  const flagW = flagH * 1.5
                  const flagY = y + (height - flagH) / 2
                  return (
                    <g>
                      {flags.map((f, fi) => {
                        const flagX = x + width * f.posInBar
                        return (
                          <g key={fi}>
                            <image href={f.img} x={flagX} y={flagY} width={flagW} height={flagH} preserveAspectRatio="xMidYMid meet" />
                            <text x={flagX + flagW + 4} y={flagY + flagH / 2 + 4} fontSize={12} fill={f.highlight ? '#C9912B' : 'rgba(255,255,255,0.7)'} fontWeight={f.highlight ? 'bold' : 'normal'} fontFamily="sans-serif">
                              {f.age}
                            </text>
                          </g>
                        )
                      })}
                    </g>
                  )
                }}
              >
                {AGING_DATA.map((_, i) => (
                  <Cell key={i} fill={i === 3 ? '#C9912B' : i === 2 ? 'rgba(201,145,43,0.5)' : 'rgba(255,255,255,0.15)'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="font-sans text-[11px] text-center mt-2" style={{ color: 'rgba(255,255,255,0.35)' }}>
          Bandiere: età media imprenditore al passaggio generazionale per paese
        </p>
        <p className="font-sans text-[13px] mt-2 text-center" style={{ color: 'rgba(255,255,255,0.4)' }}>
          Il 54% dei leader ha più di 60 anni. Solo il 18% ha pianificato. La finestra si sta chiudendo.
        </p>
        <ChartSource>Osservatorio AUB Bocconi 2025</ChartSource>

        {/* Funnel: Generational Survival */}
        <h3 className="font-sans text-[14px] uppercase tracking-wider mb-8 mt-20" style={{ color: '#C9912B' }}>Sopravvivenza imprese familiari per generazione</h3>
        <div className="max-w-[700px] mx-auto">
          {FUNNEL.map((d, i) => {
            const widthPct = Math.max(d.pct, 8)
            return (
              <div key={i} className="flex flex-col items-center mb-1">
                {/* Trapezoid bar */}
                <div
                  className="relative flex items-center justify-center"
                  style={{
                    width: `${widthPct}%`,
                    height: '70px',
                    backgroundColor: i === 0 ? '#C9912B' : `rgba(201, 145, 43, ${0.15 + d.pct / 200})`,
                    borderRadius: '6px',
                    transition: 'all 0.3s',
                  }}
                >
                  <span className="font-serif text-[28px] md:text-[36px] font-bold" style={{ color: i === 0 ? 'white' : '#C9912B' }}>
                    {d.pct}%
                  </span>
                </div>
                {/* Label */}
                <div className="flex items-center gap-2 mt-2 mb-4">
                  <span className="font-sans text-[13px] font-semibold" style={{ color: 'rgba(255,255,255,0.7)' }}>{d.gen}</span>
                  {d.sub && <span className="font-sans text-[11px]" style={{ color: 'rgba(255,255,255,0.4)' }}>({d.sub})</span>}
                </div>
                {/* Arrow down (except last) */}
                {i < FUNNEL.length - 1 && (
                  <div className="mb-1" style={{ width: '0', height: '0', borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '8px solid rgba(201,145,43,0.3)' }} />
                )}
              </div>
            )
          })}
        </div>
        <p className="font-sans text-[14px] mt-8 text-center" style={{ color: 'rgba(255,255,255,0.6)' }}>
          Ma chi lo fa bene: <span style={{ color: '#C9912B' }}>+7,4% ricavi, +3,5% ROE, +11,5% investimenti</span>
        </p>
        <ChartSource>Osservatorio AUB Bocconi 2025, Family Business Review, Williams Group</ChartSource>
      </Section>

      {/* ═══ S4: MARKET TRENDS ═══ */}
      <Section>
        <SectionTitle>4 trend che cambiano tutto</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {[
            { n: '1', title: 'CONCENTRAZIONE', text: 'Il top 1% delle famiglie italiane possiede il 22,2% della ricchezza (era 10,5% nel 1960). Arriverà al 25% nel 2040. Il target non è "tutti i ricchi": sono imprenditori con patrimoni complessi.' },
            { n: '2', title: 'ACCELERAZIONE SUCCESSORIA', text: 'Il tasso di passaggio è salito dall\u20191,5% al 2,1% annuo. 50.000-100.000 imprese affronteranno la transizione nei prossimi 3 anni.' },
            { n: '3', title: 'LA NEXTGEN VUOLE ALTRO', text: '81% degli eredi cambierà consulente. Vogliono digitale, ESG, one-stop-shop. Il modello regia unica è esattamente ciò che cercano.' },
            { n: '4', title: 'FOREIGN OWNERSHIP', text: '29% delle PMI mid-market è già controllata da stranieri (2025). Sarà il 48% nel 2040. Servono advisor bilingui.' },
          ].map((t) => (
            <div key={t.n} className="rounded-xl" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,145,43,0.15)', padding: '28px' }}>
              <span className="font-serif text-[48px] font-bold block leading-none" style={{ color: '#C9912B' }}>{t.n}</span>
              <h4 className="font-sans text-[16px] font-bold text-white mt-3">{t.title}</h4>
              <p className="font-sans text-[14px] leading-[1.6] mt-2" style={{ color: 'rgba(255,255,255,0.6)' }}>{t.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══ S5: 10 MEGATRENDS ═══ */}
      <Section>
        <SectionTitle>10 forze che stanno trasformando il mercato</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          {MEGATRENDS.map((t) => (
            <div key={t.num} className="flex gap-4 rounded-xl" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,145,43,0.1)', padding: '20px' }}>
              <div className="flex-shrink-0 flex items-center justify-center rounded-full" style={{ width: '36px', height: '36px', backgroundColor: '#C9912B' }}>
                <span className="font-sans text-[12px] font-bold text-white">{t.num}</span>
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-sans text-[14px] font-bold text-white">{t.title}</h4>
                  <span className="font-sans text-[11px] px-2 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(201,145,43,0.15)', color: '#C9912B' }}>{t.prob}</span>
                </div>
                <p className="font-sans text-[13px] mt-1" style={{ color: 'rgba(255,255,255,0.55)' }}>{t.text}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="py-20 px-6 text-center">
        <Link href="/contatti" className="inline-flex items-center gap-2 font-sans text-[14px] px-8 py-3 rounded-full transition-all duration-300 hover:bg-[#C9912B] hover:text-white" style={{ color: '#C9912B', border: '1px solid #C9912B' }}>
          Vuoi far parte della strategia? <span>→</span>
        </Link>
      </section>
    </div>
  )
}
