import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function POST(req: NextRequest) {
  try {
    const { email, locale } = await req.json()

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    const supabase = getSupabase()

    const { error } = await supabase
      .from('cogito_newsletter_subscribers')
      .upsert(
        { email: email.toLowerCase().trim(), locale: locale || 'it' },
        { onConflict: 'email', ignoreDuplicates: true }
      )

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Cogito subscribe error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
