import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { ok: false, error: 'Email richiesta.' },
        { status: 400 }
      )
    }

    const normalized = email.toLowerCase().trim()

    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', normalized)
      .limit(1)
      .maybeSingle()

    if (error) {
      return NextResponse.json(
        { ok: false, error: 'Errore interno.' },
        { status: 500 }
      )
    }

    if (!data) {
      return NextResponse.json(
        { ok: false, error: 'Accesso non autorizzato.' },
        { status: 403 }
      )
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Errore interno.' },
      { status: 500 }
    )
  }
}
