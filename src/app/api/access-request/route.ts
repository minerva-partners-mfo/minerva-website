import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const body = await request.json()
    const { tipo, inviteNote, nome, cognome, email, telefono, ruolo, messaggio } = body

    if (!nome || !cognome || !email) {
      return NextResponse.json(
        { ok: false, error: 'Nome, cognome e email sono obbligatori.' },
        { status: 400 }
      )
    }

    // ─── 1. Email via Resend ───
    const emailResult = await resend.emails.send({
      from: 'Minerva Partners <noreply@minervapartners.it>',
      to: process.env.ACCESS_REQUEST_EMAIL || 'info@minervapartners.it',
      subject: `Nuova richiesta accesso: ${nome} ${cognome}`,
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f8f6f1; border-radius: 8px;">
          <h2 style="color: #1A2744; margin: 0 0 24px;">Nuova Richiesta di Accesso</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #666; width: 140px;">Tipo</td><td style="padding: 8px 0; color: #1A2744; font-weight: 500;">${tipo || 'Richiesta indipendente'}</td></tr>
            ${inviteNote ? `<tr><td style="padding: 8px 0; color: #666;">Referral</td><td style="padding: 8px 0; color: #1A2744;">${inviteNote}</td></tr>` : ''}
            <tr><td style="padding: 8px 0; color: #666;">Nome</td><td style="padding: 8px 0; color: #1A2744; font-weight: 500;">${nome} ${cognome}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #C9912B;">${email}</a></td></tr>
            ${telefono ? `<tr><td style="padding: 8px 0; color: #666;">Telefono</td><td style="padding: 8px 0; color: #1A2744;">${telefono}</td></tr>` : ''}
            ${ruolo ? `<tr><td style="padding: 8px 0; color: #666;">Ruolo</td><td style="padding: 8px 0; color: #1A2744;">${ruolo}</td></tr>` : ''}
            ${messaggio ? `<tr><td style="padding: 8px 0; color: #666;">Messaggio</td><td style="padding: 8px 0; color: #1A2744;">${messaggio}</td></tr>` : ''}
          </table>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 24px 0;" />
          <p style="color: #999; font-size: 12px; margin: 0;">Inviato dal sito minervapartners.it</p>
        </div>
      `,
    })

    if (emailResult.error) {
      console.error('Resend error:', emailResult.error)
    }

    // ─── 2. Google Sheet via Apps Script webhook ───
    const sheetUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL
    if (sheetUrl) {
      try {
        await fetch(sheetUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            timestamp: new Date().toISOString(),
            tipo: tipo || 'Richiesta indipendente',
            inviteNote: inviteNote || '',
            nome,
            cognome,
            email,
            telefono: telefono || '',
            ruolo: ruolo || '',
            messaggio: messaggio || '',
          }),
        })
      } catch (sheetErr) {
        console.error('Google Sheet webhook error:', sheetErr)
      }
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Access request error:', err)
    return NextResponse.json(
      { ok: false, error: 'Errore interno.' },
      { status: 500 }
    )
  }
}
