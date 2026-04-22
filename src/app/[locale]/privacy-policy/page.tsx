import { getLocale, getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

/* ------------------------------------------------------------------ */
/*  Shared styles                                                      */
/* ------------------------------------------------------------------ */

const style = {
  h2: {
    fontFamily: 'var(--font-cormorant)',
    fontSize: 28,
    fontWeight: 600,
    color: '#C5A059',
    marginTop: 56,
    marginBottom: 16,
  } as React.CSSProperties,
  h3: {
    fontFamily: 'var(--font-cormorant)',
    fontSize: 20,
    fontWeight: 600,
    color: 'white',
    marginTop: 32,
    marginBottom: 10,
  } as React.CSSProperties,
  p: {
    fontFamily: 'var(--font-dm-sans)',
    fontSize: 15,
    lineHeight: 1.75,
    color: 'rgba(255,255,255,0.88)',
    marginBottom: 14,
  } as React.CSSProperties,
  ul: {
    fontFamily: 'var(--font-dm-sans)',
    fontSize: 15,
    color: 'rgba(255,255,255,0.88)',
    paddingLeft: 24,
    lineHeight: 1.75,
    marginBottom: 14,
  } as React.CSSProperties,
  link: {
    color: '#D4AF37',
    borderBottom: '1px dotted #D4AF37',
    textDecoration: 'none',
  } as React.CSSProperties,
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    fontFamily: 'var(--font-dm-sans)',
    fontSize: 13,
    marginTop: 16,
    marginBottom: 20,
  } as React.CSSProperties,
  th: {
    background: '#061a28',
    color: 'rgba(255,255,255,0.88)',
    border: '1px solid rgba(212,175,55,0.2)',
    padding: '14px 16px',
    textAlign: 'left' as const,
    fontWeight: 600,
  } as React.CSSProperties,
  td: {
    border: '1px solid rgba(212,175,55,0.2)',
    padding: '14px 16px',
    color: 'rgba(255,255,255,0.88)',
  } as React.CSSProperties,
}

/* ------------------------------------------------------------------ */
/*  ITALIAN content                                                    */
/* ------------------------------------------------------------------ */

function PrivacyIT() {
  return (
    <>
      <p style={style.p}>
        La presente Privacy Policy è resa ai sensi dell&apos;art. 13 del Regolamento (UE) 2016/679
        (&ldquo;GDPR&rdquo;) e del D.Lgs. 196/2003 (&ldquo;Codice Privacy&rdquo;) come modificato
        dal D.Lgs. 101/2018. Si applica esclusivamente al trattamento dei dati personali raccolti
        attraverso il sito minervapartners.it.
      </p>

      {/* 1 --------------------------------------------------------- */}
      <h2 id="titolare" style={style.h2}>1. Titolare del Trattamento</h2>
      <p style={style.p}>
        <strong>Minerva Partners S.r.l.</strong><br />
        Via Roggia Vignola 9, 24047 Treviglio (BG) — Italia<br />
        P.IVA 04708860160<br />
        E-mail:{' '}
        <a href="mailto:info@minervapartners.it" style={style.link}>info@minervapartners.it</a><br />
        PEC:{' '}
        <a href="mailto:minervapartners@lamiapec.it" style={style.link}>minervapartners@lamiapec.it</a>
      </p>

      {/* 2 --------------------------------------------------------- */}
      <h2 id="modalita" style={style.h2}>2. Modalità di trattamento</h2>
      <p style={style.p}>
        I dati personali sono trattati nel rispetto dei principi di liceità, correttezza,
        trasparenza, limitazione delle finalità, minimizzazione, esattezza, limitazione della
        conservazione, integrità e riservatezza, conformemente all&apos;art. 5 GDPR.
      </p>
      <p style={style.p}>
        Il trattamento avviene con strumenti elettronici e, ove necessario, cartacei, con misure
        tecniche e organizzative adeguate a garantire la sicurezza dei dati. L&apos;infrastruttura
        tecnologica si avvale di Vercel (hosting, regione UE) e Supabase (database, regione UE).
      </p>

      {/* 3 --------------------------------------------------------- */}
      <h2 id="tipologie" style={style.h2}>3. Tipologie di dati trattati</h2>

      <h3 style={style.h3}>a) Dati di navigazione</h3>
      <p style={style.p}>
        I sistemi informatici acquisiscono, nel normale funzionamento, alcuni dati personali la
        cui trasmissione è implicita nell&apos;uso dei protocolli di comunicazione Internet
        (indirizzi IP, tipo di browser, sistema operativo, URL di provenienza, pagine visitate,
        data e ora della visita).
      </p>

      <h3 style={style.h3}>b) Dati forniti volontariamente</h3>
      <p style={style.p}>
        L&apos;invio facoltativo di messaggi tramite i moduli di contatto o la richiesta di accesso
        all&apos;area riservata comporta l&apos;acquisizione dei dati inseriti dall&apos;utente
        (nome, cognome, e-mail, telefono, messaggio, e eventuali altri dati comunicati).
      </p>

      <h3 style={style.h3}>c) Cookie</h3>
      <p style={style.p}>
        Per informazioni dettagliate sui cookie utilizzati da questo sito, si prega di consultare
        la nostra{' '}
        <Link href="/cookie-policy" style={style.link}>Cookie Policy</Link>.
      </p>

      {/* 4 --------------------------------------------------------- */}
      <h2 id="finalita" style={style.h2}>4. Finalità e basi giuridiche</h2>
      <table style={style.table}>
        <thead>
          <tr>
            <th style={style.th}>Finalità</th>
            <th style={style.th}>Base giuridica</th>
            <th style={style.th}>Obbligatorietà</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={style.td}>Risposta a richieste di contatto e informazioni</td>
            <td style={style.td}>Art. 6.1.b — esecuzione di misure precontrattuali</td>
            <td style={style.td}>Necessaria</td>
          </tr>
          <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
            <td style={style.td}>Gestione candidature e richieste di accesso</td>
            <td style={style.td}>Art. 6.1.b — esecuzione di misure precontrattuali</td>
            <td style={style.td}>Necessaria</td>
          </tr>
          <tr>
            <td style={style.td}>Adempimento di obblighi di legge e regolamentari</td>
            <td style={style.td}>Art. 6.1.c — obbligo legale</td>
            <td style={style.td}>Obbligatoria</td>
          </tr>
          <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
            <td style={style.td}>Difesa di un diritto in sede giudiziaria</td>
            <td style={style.td}>Art. 6.1.f — legittimo interesse</td>
            <td style={style.td}>Necessaria</td>
          </tr>
          <tr>
            <td style={style.td}>Analisi statistiche anonime e aggregate</td>
            <td style={style.td}>Art. 6.1.a — consenso</td>
            <td style={style.td}>Facoltativa</td>
          </tr>
          <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
            <td style={style.td}>Marketing diretto e invio comunicazioni promozionali</td>
            <td style={style.td}>Art. 6.1.a — consenso</td>
            <td style={style.td}>Facoltativa</td>
          </tr>
        </tbody>
      </table>

      {/* 5 --------------------------------------------------------- */}
      <h2 id="destinatari" style={style.h2}>5. Destinatari dei dati</h2>
      <p style={style.p}>I dati personali potranno essere comunicati a:</p>
      <ul style={style.ul}>
        <li>Personale autorizzato di Minerva Partners S.r.l., in qualità di soggetti incaricati del trattamento</li>
        <li>Fornitori di servizi tecnologici (Vercel Inc., Supabase Inc., Resend Inc.) in qualità di responsabili del trattamento ex art. 28 GDPR</li>
        <li>Autorità pubbliche, ove richiesto per legge</li>
      </ul>
      <p style={style.p}>
        I dati non sono oggetto di diffusione né di cessione a terzi per finalità di marketing.
      </p>

      {/* 6 --------------------------------------------------------- */}
      <h2 id="trasferimento" style={style.h2}>6. Trasferimento dei dati extra-UE</h2>
      <p style={style.p}>
        Alcuni fornitori di servizi tecnologici hanno sede negli Stati Uniti d&apos;America. Il
        trasferimento dei dati avviene sulla base del EU-US Data Privacy Framework (DPF) o, in
        alternativa, delle Clausole Contrattuali Standard (SCC) approvate dalla Commissione
        Europea, ai sensi degli artt. 45-49 GDPR.
      </p>

      {/* 7 --------------------------------------------------------- */}
      <h2 id="conservazione" style={style.h2}>7. Periodo di conservazione</h2>
      <table style={style.table}>
        <thead>
          <tr>
            <th style={style.th}>Categoria di dati</th>
            <th style={style.th}>Periodo di conservazione</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={style.td}>Dati raccolti tramite moduli di contatto</td>
            <td style={style.td}>24 mesi dalla raccolta</td>
          </tr>
          <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
            <td style={style.td}>Dati contrattuali e fiscali</td>
            <td style={style.td}>10 anni (obblighi civilistici e fiscali)</td>
          </tr>
          <tr>
            <td style={style.td}>Log di navigazione</td>
            <td style={style.td}>12 mesi</td>
          </tr>
          <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
            <td style={style.td}>Dati trattati sulla base del consenso</td>
            <td style={style.td}>Fino alla revoca del consenso</td>
          </tr>
          <tr>
            <td style={style.td}>Dati per la tutela di diritti</td>
            <td style={style.td}>Per il tempo strettamente necessario</td>
          </tr>
        </tbody>
      </table>

      {/* 8 --------------------------------------------------------- */}
      <h2 id="diritti" style={style.h2}>8. Diritti dell&apos;interessato</h2>
      <p style={style.p}>
        Ai sensi degli artt. 15-22 del GDPR, l&apos;interessato ha il diritto di:
      </p>
      <ul style={style.ul}>
        <li>Accedere ai propri dati personali (art. 15)</li>
        <li>Ottenere la rettifica dei dati inesatti (art. 16)</li>
        <li>Ottenere la cancellazione dei dati (&ldquo;diritto all&apos;oblio&rdquo;, art. 17)</li>
        <li>Ottenere la limitazione del trattamento (art. 18)</li>
        <li>Ricevere i dati in formato strutturato e leggibile da dispositivo automatico — portabilità (art. 20)</li>
        <li>Opporsi al trattamento (art. 21)</li>
        <li>Revocare il consenso in qualsiasi momento, senza pregiudicare la liceità del trattamento effettuato prima della revoca (art. 7)</li>
        <li>Proporre reclamo all&apos;autorità di controllo (Garante per la protezione dei dati personali — <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" style={style.link}>www.garanteprivacy.it</a>)</li>
      </ul>
      <p style={style.p}>
        Per esercitare i propri diritti, l&apos;interessato può inviare una richiesta a{' '}
        <a href="mailto:info@minervapartners.it" style={style.link}>info@minervapartners.it</a>.
      </p>

      {/* 9 --------------------------------------------------------- */}
      <h2 id="automatizzati" style={style.h2}>9. Processi decisionali automatizzati</h2>
      <p style={style.p}>
        Minerva Partners S.r.l. non effettua alcun processo decisionale automatizzato, inclusa la
        profilazione, di cui all&apos;art. 22, paragrafi 1 e 4 del GDPR.
      </p>

      {/* 10 -------------------------------------------------------- */}
      <h2 id="modifiche" style={style.h2}>10. Modifiche</h2>
      <p style={style.p}>
        Minerva Partners S.r.l. si riserva il diritto di modificare, aggiornare o integrare la
        presente Privacy Policy in qualsiasi momento. Le modifiche saranno pubblicate su questa
        pagina con indicazione della data di ultimo aggiornamento. Si invita l&apos;utente a
        consultare periodicamente questa pagina.
      </p>
    </>
  )
}

/* ------------------------------------------------------------------ */
/*  ENGLISH content                                                    */
/* ------------------------------------------------------------------ */

function PrivacyEN() {
  return (
    <>
      <p style={style.p}>
        This Privacy Policy is provided pursuant to Art. 13 of Regulation (EU) 2016/679
        (&ldquo;GDPR&rdquo;) and Italian Legislative Decree 196/2003 (&ldquo;Privacy Code&rdquo;)
        as amended by Legislative Decree 101/2018. It applies exclusively to the processing of
        personal data collected through the website minervapartners.it.
      </p>

      {/* 1 --------------------------------------------------------- */}
      <h2 id="controller" style={style.h2}>1. Data Controller</h2>
      <p style={style.p}>
        <strong>Minerva Partners S.r.l.</strong><br />
        Via Roggia Vignola 9, 24047 Treviglio (BG) — Italy<br />
        VAT No. 04708860160<br />
        Email:{' '}
        <a href="mailto:info@minervapartners.it" style={style.link}>info@minervapartners.it</a><br />
        Certified email (PEC):{' '}
        <a href="mailto:minervapartners@lamiapec.it" style={style.link}>minervapartners@lamiapec.it</a>
      </p>

      {/* 2 --------------------------------------------------------- */}
      <h2 id="methods" style={style.h2}>2. Processing Methods</h2>
      <p style={style.p}>
        Personal data are processed in accordance with the principles of lawfulness, fairness,
        transparency, purpose limitation, data minimisation, accuracy, storage limitation,
        integrity, and confidentiality, as set out in Art. 5 GDPR.
      </p>
      <p style={style.p}>
        Processing is carried out using electronic and, where necessary, paper-based tools, with
        appropriate technical and organisational measures to ensure data security. The technological
        infrastructure relies on Vercel (hosting, EU region) and Supabase (database, EU region).
      </p>

      {/* 3 --------------------------------------------------------- */}
      <h2 id="categories" style={style.h2}>3. Categories of Data Processed</h2>

      <h3 style={style.h3}>a) Browsing data</h3>
      <p style={style.p}>
        The IT systems acquire, during normal operation, certain personal data whose transmission is
        implicit in the use of Internet communication protocols (IP addresses, browser type,
        operating system, referring URL, pages visited, date and time of visit).
      </p>

      <h3 style={style.h3}>b) Data provided voluntarily</h3>
      <p style={style.p}>
        The voluntary submission of messages via contact forms or requests for access to the
        reserved area entails the acquisition of data entered by the user (name, surname, email,
        phone, message, and any other data communicated).
      </p>

      <h3 style={style.h3}>c) Cookies</h3>
      <p style={style.p}>
        For detailed information on the cookies used by this site, please refer to our{' '}
        <Link href="/cookie-policy" style={style.link}>Cookie Policy</Link>.
      </p>

      {/* 4 --------------------------------------------------------- */}
      <h2 id="purposes" style={style.h2}>4. Purposes and Legal Bases</h2>
      <table style={style.table}>
        <thead>
          <tr>
            <th style={style.th}>Purpose</th>
            <th style={style.th}>Legal basis</th>
            <th style={style.th}>Mandatory</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={style.td}>Responding to contact and information requests</td>
            <td style={style.td}>Art. 6.1.b — performance of pre-contractual measures</td>
            <td style={style.td}>Required</td>
          </tr>
          <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
            <td style={style.td}>Managing applications and access requests</td>
            <td style={style.td}>Art. 6.1.b — performance of pre-contractual measures</td>
            <td style={style.td}>Required</td>
          </tr>
          <tr>
            <td style={style.td}>Compliance with legal and regulatory obligations</td>
            <td style={style.td}>Art. 6.1.c — legal obligation</td>
            <td style={style.td}>Mandatory</td>
          </tr>
          <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
            <td style={style.td}>Defence of a right in legal proceedings</td>
            <td style={style.td}>Art. 6.1.f — legitimate interest</td>
            <td style={style.td}>Required</td>
          </tr>
          <tr>
            <td style={style.td}>Anonymous and aggregate statistical analysis</td>
            <td style={style.td}>Art. 6.1.a — consent</td>
            <td style={style.td}>Optional</td>
          </tr>
          <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
            <td style={style.td}>Direct marketing and promotional communications</td>
            <td style={style.td}>Art. 6.1.a — consent</td>
            <td style={style.td}>Optional</td>
          </tr>
        </tbody>
      </table>

      {/* 5 --------------------------------------------------------- */}
      <h2 id="recipients" style={style.h2}>5. Data Recipients</h2>
      <p style={style.p}>Personal data may be disclosed to:</p>
      <ul style={style.ul}>
        <li>Authorised personnel of Minerva Partners S.r.l., as persons in charge of processing</li>
        <li>Technology service providers (Vercel Inc., Supabase Inc., Resend Inc.) acting as data processors pursuant to Art. 28 GDPR</li>
        <li>Public authorities, where required by law</li>
      </ul>
      <p style={style.p}>
        Data are not disseminated nor transferred to third parties for marketing purposes.
      </p>

      {/* 6 --------------------------------------------------------- */}
      <h2 id="transfers" style={style.h2}>6. International Data Transfers</h2>
      <p style={style.p}>
        Certain technology service providers are based in the United States of America. Data
        transfers are carried out on the basis of the EU-US Data Privacy Framework (DPF) or,
        alternatively, Standard Contractual Clauses (SCCs) approved by the European Commission,
        pursuant to Arts. 45-49 GDPR.
      </p>

      {/* 7 --------------------------------------------------------- */}
      <h2 id="retention" style={style.h2}>7. Retention Period</h2>
      <table style={style.table}>
        <thead>
          <tr>
            <th style={style.th}>Data category</th>
            <th style={style.th}>Retention period</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={style.td}>Data collected via contact forms</td>
            <td style={style.td}>24 months from collection</td>
          </tr>
          <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
            <td style={style.td}>Contractual and tax data</td>
            <td style={style.td}>10 years (civil and tax obligations)</td>
          </tr>
          <tr>
            <td style={style.td}>Browsing logs</td>
            <td style={style.td}>12 months</td>
          </tr>
          <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
            <td style={style.td}>Data processed on the basis of consent</td>
            <td style={style.td}>Until consent is withdrawn</td>
          </tr>
          <tr>
            <td style={style.td}>Data for the protection of rights</td>
            <td style={style.td}>For the time strictly necessary</td>
          </tr>
        </tbody>
      </table>

      {/* 8 --------------------------------------------------------- */}
      <h2 id="rights" style={style.h2}>8. Data Subject Rights</h2>
      <p style={style.p}>
        Under Arts. 15-22 of the GDPR, the data subject has the right to:
      </p>
      <ul style={style.ul}>
        <li>Access their personal data (Art. 15)</li>
        <li>Rectify inaccurate data (Art. 16)</li>
        <li>Obtain erasure of data (&ldquo;right to be forgotten&rdquo;, Art. 17)</li>
        <li>Obtain restriction of processing (Art. 18)</li>
        <li>Receive data in a structured, machine-readable format — portability (Art. 20)</li>
        <li>Object to processing (Art. 21)</li>
        <li>Withdraw consent at any time, without affecting the lawfulness of processing carried out prior to withdrawal (Art. 7)</li>
        <li>Lodge a complaint with the supervisory authority (Garante per la protezione dei dati personali — <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" style={style.link}>www.garanteprivacy.it</a>)</li>
      </ul>
      <p style={style.p}>
        To exercise these rights, the data subject may send a request to{' '}
        <a href="mailto:info@minervapartners.it" style={style.link}>info@minervapartners.it</a>.
      </p>

      {/* 9 --------------------------------------------------------- */}
      <h2 id="automated" style={style.h2}>9. Automated Decision-Making</h2>
      <p style={style.p}>
        Minerva Partners S.r.l. does not carry out any automated decision-making, including
        profiling, as referred to in Art. 22(1) and (4) of the GDPR.
      </p>

      {/* 10 -------------------------------------------------------- */}
      <h2 id="changes" style={style.h2}>10. Changes</h2>
      <p style={style.p}>
        Minerva Partners S.r.l. reserves the right to modify, update, or supplement this Privacy
        Policy at any time. Changes will be published on this page with an indication of the last
        update date. Users are encouraged to review this page periodically.
      </p>
    </>
  )
}

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default async function PrivacyPolicyPage() {
  const locale = await getLocale()
  const t = await getTranslations('privacyPolicy')

  const isIT = locale === 'it'

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 md:px-6" style={{ background: '#0D1520' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {/* Breadcrumb */}
        <nav
          className="mb-8"
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: 13,
            color: 'rgba(255,255,255,0.45)',
            letterSpacing: '0.04em',
          }}
        >
          <Link href="/" style={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}>
            Home
          </Link>
          {' / '}
          <span>{t('breadcrumb')}</span>
          {' / '}
          <span style={{ color: 'rgba(255,255,255,0.7)' }}>{t('title')}</span>
        </nav>

        {/* Title */}
        <h1
          className="mb-2"
          style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: 'clamp(28px, 5vw, 42px)',
            fontWeight: 600,
            color: '#C5A059',
            letterSpacing: '0.02em',
          }}
        >
          {t('title')}
        </h1>

        {/* Last update */}
        <p
          className="mb-10"
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: 12,
            color: 'rgba(255,255,255,0.4)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          {t('lastUpdate')}
        </p>

        {/* Legal content */}
        {isIT ? <PrivacyIT /> : <PrivacyEN />}

        {/* Footer divider */}
        <div className="h-px bg-white/10 mt-12 mb-6" />
        <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>
          &copy; 2026 Minerva Partners S.r.l. — Via Roggia Vignola 9, 24047 Treviglio (BG), Italia
        </p>
      </div>
    </div>
  )
}
