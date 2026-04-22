import { getLocale, getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

export default async function CookiePolicyPage() {
  const locale = await getLocale()
  const t = await getTranslations('cookiePolicy')
  const isIT = locale === 'it'

  /* ── shared inline styles ── */
  const h2Style: React.CSSProperties = {
    fontFamily: 'var(--font-cormorant)',
    fontSize: 28,
    color: '#C5A059',
    marginTop: 56,
    marginBottom: 16,
  }
  const h3Style: React.CSSProperties = {
    fontFamily: 'var(--font-cormorant)',
    fontSize: 20,
    color: '#ffffff',
    marginTop: 32,
    marginBottom: 12,
  }
  const pStyle: React.CSSProperties = {
    fontFamily: 'var(--font-dm-sans)',
    fontSize: 15,
    lineHeight: 1.75,
    color: 'rgba(255,255,255,0.88)',
    marginBottom: 16,
  }
  const linkStyle: React.CSSProperties = {
    color: '#D4AF37',
    borderBottom: '1px dotted #D4AF37',
    textDecoration: 'none',
  }
  const thStyle: React.CSSProperties = {
    fontFamily: 'var(--font-dm-sans)',
    fontSize: 13,
    padding: '14px 16px',
    textAlign: 'left' as const,
    color: 'rgba(255,255,255,0.88)',
    borderBottom: '1px solid rgba(212,175,55,0.2)',
    backgroundColor: '#061a28',
  }
  const tdStyle: React.CSSProperties = {
    fontFamily: 'var(--font-dm-sans)',
    fontSize: 13,
    padding: '14px 16px',
    color: 'rgba(255,255,255,0.88)',
    borderBottom: '1px solid rgba(212,175,55,0.2)',
  }
  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse' as const,
    border: '1px solid rgba(212,175,55,0.2)',
    marginTop: 16,
    marginBottom: 24,
  }

  const oddRowBg = 'rgba(255,255,255,0.02)'

  return (
    <main
      style={{
        backgroundColor: '#0D1520',
        minHeight: '100vh',
        paddingTop: 96,
        paddingBottom: 64,
        paddingLeft: 16,
        paddingRight: 16,
      }}
    >
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {/* ── Breadcrumb ── */}
        <nav style={{ marginBottom: 32, ...pStyle, fontSize: 13 }}>
          <Link href="/" style={linkStyle}>
            Home
          </Link>{' '}
          <span style={{ color: 'rgba(255,255,255,0.4)', margin: '0 8px' }}>/</span>
          <span style={{ color: 'rgba(255,255,255,0.5)' }}>{t('breadcrumb')}</span>
          <span style={{ color: 'rgba(255,255,255,0.4)', margin: '0 8px' }}>/</span>
          <span style={{ color: 'rgba(255,255,255,0.7)' }}>{t('title')}</span>
        </nav>

        {/* ── Title ── */}
        <h1
          style={{
            fontFamily: 'var(--font-playfair)',
            color: '#C5A059',
            fontSize: 42,
            marginBottom: 8,
          }}
        >
          {t('title')}
        </h1>
        <p style={{ ...pStyle, fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 40 }}>
          {t('lastUpdate')}
        </p>

        {/* ── Intro ── */}
        <p style={pStyle}>
          {isIT
            ? 'La presente Cookie Policy è resa ai sensi del Provvedimento del Garante per la protezione dei dati personali del 10 giugno 2021 ("Linee guida cookie"), dell\'art. 122 del D.Lgs. 196/2003 e dell\'art. 6 GDPR.'
            : 'This Cookie Policy is provided pursuant to the Italian Data Protection Authority\'s Provision of 10 June 2021 ("Cookie Guidelines"), Art. 122 of Legislative Decree 196/2003 and Art. 6 GDPR.'}
        </p>

        {/* ════════════════════════════════════════════
            SECTION 1 — Cosa sono i cookie
        ════════════════════════════════════════════ */}
        <h2 id={isIT ? 'cosa-sono' : 'what'} style={h2Style}>
          {isIT ? '1. Cosa sono i cookie' : '1. What are cookies'}
        </h2>
        <p style={pStyle}>
          {isIT
            ? 'I cookie sono piccoli file di testo che i siti web visitati dall\'utente inviano al suo terminale (computer, tablet, smartphone), dove vengono memorizzati per essere poi ritrasmessi agli stessi siti alla visita successiva. I cookie permettono di memorizzare le preferenze dell\'utente, migliorare l\'esperienza di navigazione e raccogliere informazioni sull\'uso del sito. Oltre ai cookie, sono utilizzate anche altre tecnologie di tracciamento con funzionalità simili (pixel, script, web beacon); ai fini della presente policy, tutti questi strumenti sono compresi nel termine "cookie".'
            : 'Cookies are small text files that websites visited by a user send to their device (computer, tablet, smartphone), where they are stored and then retransmitted to the same sites on subsequent visits. Cookies allow user preferences to be stored, improve the browsing experience, and collect information about site usage. In addition to cookies, other tracking technologies with similar functionality (pixels, scripts, web beacons) are also used; for the purposes of this policy, all of these tools are included in the term "cookies".'}
        </p>

        {/* ════════════════════════════════════════════
            SECTION 2 — Tipologie di cookie utilizzati
        ════════════════════════════════════════════ */}
        <h2 id={isIT ? 'tipologie' : 'types'} style={h2Style}>
          {isIT ? '2. Tipologie di cookie utilizzati' : '2. Types of cookies used'}
        </h2>

        {/* 2.1 — Cookie tecnici */}
        <h3 style={h3Style}>
          {isIT ? '2.1 Cookie tecnici (Necessari)' : '2.1 Technical cookies (Necessary)'}
        </h3>
        <p style={pStyle}>
          {isIT
            ? 'I cookie tecnici sono necessari per il corretto funzionamento del sito e non richiedono il consenso dell\'utente ai sensi dell\'art. 122 comma 1 del D.Lgs. 196/2003.'
            : 'Technical cookies are necessary for the proper functioning of the site and do not require user consent pursuant to Art. 122(1) of Legislative Decree 196/2003.'}
        </p>
        <div style={{ overflowX: 'auto' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>{isIT ? 'Servizio' : 'Service'}</th>
                <th style={thStyle}>{isIT ? 'Finalità' : 'Purpose'}</th>
                <th style={thStyle}>{isIT ? 'Durata' : 'Duration'}</th>
                <th style={thStyle}>{isIT ? 'Titolare' : 'Controller'}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={tdStyle}>Supabase (auth session)</td>
                <td style={tdStyle}>{isIT ? 'Autenticazione utente' : 'User authentication'}</td>
                <td style={tdStyle}>{isIT ? 'Sessione' : 'Session'}</td>
                <td style={tdStyle}>Supabase Inc. (EU)</td>
              </tr>
              <tr style={{ backgroundColor: oddRowBg }}>
                <td style={tdStyle}>Consent cookie Minerva</td>
                <td style={tdStyle}>{isIT ? 'Preferenze cookie' : 'Cookie preferences'}</td>
                <td style={tdStyle}>{isIT ? '6 mesi' : '6 months'}</td>
                <td style={tdStyle}>Minerva Partners</td>
              </tr>
              <tr>
                <td style={tdStyle}>{isIT ? 'Cookie di lingua' : 'Language cookie'}</td>
                <td style={tdStyle}>{isIT ? 'Lingua selezionata' : 'Selected language'}</td>
                <td style={tdStyle}>{isIT ? '12 mesi' : '12 months'}</td>
                <td style={tdStyle}>Minerva Partners</td>
              </tr>
              <tr style={{ backgroundColor: oddRowBg }}>
                <td style={tdStyle}>{isIT ? 'Cookie di sicurezza (CSRF)' : 'Security cookie (CSRF)'}</td>
                <td style={tdStyle}>{isIT ? 'Protezione cross-site' : 'Cross-site protection'}</td>
                <td style={tdStyle}>{isIT ? 'Sessione' : 'Session'}</td>
                <td style={tdStyle}>Minerva Partners</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 2.2 — Cookie analitici */}
        <h3 style={h3Style}>
          {isIT ? '2.2 Cookie analitici' : '2.2 Analytics cookies'}
        </h3>
        <p style={pStyle}>
          {isIT
            ? 'I cookie analitici vengono utilizzati per raccogliere informazioni sull\'uso del sito. Richiedono il consenso dell\'utente e vengono installati solo dopo averlo ottenuto.'
            : 'Analytics cookies are used to collect information about site usage. They require user consent and are only installed after obtaining it.'}
        </p>
        <div style={{ overflowX: 'auto' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>{isIT ? 'Servizio' : 'Service'}</th>
                <th style={thStyle}>{isIT ? 'Titolare' : 'Controller'}</th>
                <th style={thStyle}>{isIT ? 'Luogo' : 'Location'}</th>
                <th style={thStyle}>{isIT ? 'Durata' : 'Duration'}</th>
                <th style={thStyle}>Privacy policy</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={tdStyle}>Google Analytics 4 (IP anon.)</td>
                <td style={tdStyle}>Google Ireland Ltd.</td>
                <td style={tdStyle}>UE/USA (DPF)</td>
                <td style={tdStyle}>{isIT ? '14 mesi' : '14 months'}</td>
                <td style={tdStyle}>
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={linkStyle}>
                    policies.google.com/privacy
                  </a>
                </td>
              </tr>
              <tr style={{ backgroundColor: oddRowBg }}>
                <td style={tdStyle}>Vercel Analytics</td>
                <td style={tdStyle}>Vercel Inc.</td>
                <td style={tdStyle}>USA (DPF)</td>
                <td style={tdStyle}>{isIT ? '12 mesi' : '12 months'}</td>
                <td style={tdStyle}>
                  <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" style={linkStyle}>
                    vercel.com/legal/privacy-policy
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 2.3 — Cookie di marketing */}
        <h3 style={h3Style}>
          {isIT ? '2.3 Cookie di marketing e retargeting' : '2.3 Marketing and retargeting cookies'}
        </h3>
        <p style={pStyle}>
          {isIT
            ? 'I cookie di marketing e retargeting vengono utilizzati per tracciare i visitatori sui siti web e mostrare annunci pertinenti. Richiedono il consenso esplicito dell\'utente.'
            : 'Marketing and retargeting cookies are used to track visitors across websites and display relevant ads. They require explicit user consent.'}
        </p>
        <div style={{ overflowX: 'auto' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>{isIT ? 'Servizio' : 'Service'}</th>
                <th style={thStyle}>{isIT ? 'Titolare' : 'Controller'}</th>
                <th style={thStyle}>{isIT ? 'Luogo' : 'Location'}</th>
                <th style={thStyle}>{isIT ? 'Durata' : 'Duration'}</th>
                <th style={thStyle}>Privacy policy</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={tdStyle}>Meta Pixel</td>
                <td style={tdStyle}>Meta Platforms Ireland Ltd.</td>
                <td style={tdStyle}>UE/USA (DPF)</td>
                <td style={tdStyle}>{isIT ? '13 mesi' : '13 months'}</td>
                <td style={tdStyle}>
                  <a href="https://www.facebook.com/privacy/policy" target="_blank" rel="noopener noreferrer" style={linkStyle}>
                    facebook.com/privacy/policy
                  </a>
                </td>
              </tr>
              <tr style={{ backgroundColor: oddRowBg }}>
                <td style={tdStyle}>LinkedIn Insight Tag</td>
                <td style={tdStyle}>LinkedIn Ireland Unlimited Co.</td>
                <td style={tdStyle}>UE/USA (DPF)</td>
                <td style={tdStyle}>{isIT ? '6 mesi' : '6 months'}</td>
                <td style={tdStyle}>
                  <a href="https://www.linkedin.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" style={linkStyle}>
                    linkedin.com/legal/privacy-policy
                  </a>
                </td>
              </tr>
              <tr>
                <td style={tdStyle}>Google Tag Manager</td>
                <td style={tdStyle}>Google Ireland Ltd.</td>
                <td style={tdStyle}>UE/USA (DPF)</td>
                <td style={tdStyle}>{isIT ? 'Vedi singoli tag' : 'See individual tags'}</td>
                <td style={tdStyle}>
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={linkStyle}>
                    policies.google.com/privacy
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ════════════════════════════════════════════
            SECTION 3 — Gestione del consenso
        ════════════════════════════════════════════ */}
        <h2 id={isIT ? 'consenso' : 'consent'} style={h2Style}>
          {isIT ? '3. Gestione del consenso' : '3. Consent management'}
        </h2>
        <p style={pStyle}>
          {isIT
            ? 'Al primo accesso al sito, un banner informativo presenta all\'utente le categorie di cookie utilizzati. L\'utente può:'
            : 'On first access to the site, an informational banner presents the user with the categories of cookies used. The user can:'}
        </p>
        <ul style={{ ...pStyle, paddingLeft: 24, marginBottom: 16 }}>
          <li style={{ marginBottom: 8 }}>
            {isIT
              ? 'Accettare tutti i cookie cliccando "Accetta tutti"'
              : 'Accept all cookies by clicking "Accept all"'}
          </li>
          <li style={{ marginBottom: 8 }}>
            {isIT
              ? 'Rifiutare tutti i cookie non necessari cliccando "Rifiuta"'
              : 'Reject all non-necessary cookies by clicking "Reject"'}
          </li>
          <li style={{ marginBottom: 8 }}>
            {isIT
              ? 'Personalizzare le proprie preferenze cliccando "Personalizza", selezionando le singole categorie'
              : 'Customize preferences by clicking "Customize", selecting individual categories'}
          </li>
        </ul>
        <p style={pStyle}>
          {isIT
            ? 'Nessun cookie non tecnico viene installato prima che l\'utente abbia espresso il proprio consenso. Il consenso viene registrato e conservato per 6 mesi, trascorsi i quali il banner verrà nuovamente mostrato.'
            : 'No non-technical cookies are installed before the user has given consent. Consent is recorded and retained for 6 months, after which the banner will be shown again.'}
        </p>

        {/* ════════════════════════════════════════════
            SECTION 4 — Revoca del consenso
        ════════════════════════════════════════════ */}
        <h2 id={isIT ? 'revoca' : 'revoke'} style={h2Style}>
          {isIT ? '4. Come modificare o revocare il consenso' : '4. How to modify or revoke consent'}
        </h2>
        <p style={pStyle}>
          {isIT
            ? 'L\'utente può modificare o revocare il consenso in qualsiasi momento cliccando sul link "Preferenze cookie" presente nel footer del sito.'
            : 'The user can modify or revoke consent at any time by clicking the "Cookie preferences" link in the site footer.'}
        </p>
        <p style={pStyle}>
          {isIT
            ? 'Inoltre, è possibile gestire i cookie direttamente dal proprio browser. Di seguito i link alle guide dei principali browser:'
            : 'Additionally, cookies can be managed directly from your browser. Below are links to the guides of major browsers:'}
        </p>
        <ul style={{ ...pStyle, paddingLeft: 24, marginBottom: 16 }}>
          <li style={{ marginBottom: 8 }}>
            <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" style={linkStyle}>
              Google Chrome
            </a>
          </li>
          <li style={{ marginBottom: 8 }}>
            <a href="https://support.mozilla.org/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer" style={linkStyle}>
              Mozilla Firefox
            </a>
          </li>
          <li style={{ marginBottom: 8 }}>
            <a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471" target="_blank" rel="noopener noreferrer" style={linkStyle}>
              Apple Safari
            </a>
          </li>
          <li style={{ marginBottom: 8 }}>
            <a href="https://support.microsoft.com/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" style={linkStyle}>
              Microsoft Edge
            </a>
          </li>
        </ul>

        {/* ════════════════════════════════════════════
            SECTION 5 — Titolare del trattamento
        ════════════════════════════════════════════ */}
        <h2 id={isIT ? 'titolare' : 'controller'} style={h2Style}>
          {isIT ? '5. Titolare del trattamento' : '5. Data controller'}
        </h2>
        <p style={pStyle}>
          <strong>Minerva Partners S.r.l.</strong>
          <br />
          Via Roggia Vignola, 9 — 24047 Treviglio (BG), Italia
          <br />
          P.IVA 04708860160
          <br />
          E-mail:{' '}
          <a href="mailto:info@minervapartners.it" style={linkStyle}>
            info@minervapartners.it
          </a>
        </p>

        {/* ── Back to home ── */}
        <div style={{ marginTop: 64, borderTop: '1px solid rgba(212,175,55,0.15)', paddingTop: 32 }}>
          <Link href="/" style={{ ...linkStyle, fontSize: 14 }}>
            ← {isIT ? 'Torna alla home' : 'Back to home'}
          </Link>
        </div>
      </div>
    </main>
  )
}
