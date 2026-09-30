import { NextRequest, NextResponse } from 'next/server'
import { sendVolunteerMaterialsEmail } from '@/lib/history-by-her-email'

/**
 * Manual / catch-up send for History by HER materials.
 * Auth: Authorization: Bearer <HISTORY_BY_HER_SEND_SECRET>
 * Body: { "email": "...", "name": "First Last" }
 */
export async function POST(req: NextRequest) {
  const secret = process.env.HISTORY_BY_HER_SEND_SECRET?.trim()
  if (!secret) {
    return NextResponse.json(
      { error: 'HISTORY_BY_HER_SEND_SECRET is not configured' },
      { status: 503 }
    )
  }

  const auth = req.headers.get('authorization') || ''
  const token = auth.startsWith('Bearer ') ? auth.slice(7).trim() : ''
  if (!token || token !== secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = (await req.json()) as { email?: string; name?: string }
    const email = body.email?.trim() || ''
    const name = body.name?.trim() || 'Volunteer'

    if (!email) {
      return NextResponse.json({ error: 'Missing email' }, { status: 400 })
    }

    const result = await sendVolunteerMaterialsEmail({ to: email, name })
    if (!result.ok) {
      return NextResponse.json(
        { error: result.error, skipped: Boolean(result.skipped) },
        { status: result.skipped ? 503 : 502 }
      )
    }

    return NextResponse.json({ ok: true, id: result.id, to: email })
  } catch (err) {
    console.error('[history-by-her/send-materials]', err)
    return NextResponse.json({ error: 'Unable to send materials email' }, { status: 500 })
  }
}
