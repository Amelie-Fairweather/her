import { NextRequest, NextResponse } from 'next/server'

const GOOGLE_FORM_ACTION =
  'https://docs.google.com/forms/d/e/1FAIpQLScG0NjWpotCGYTK4mvtLeIRtmxKSOBgRv-F0sbFk-VZbITYmg/formResponse'

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { name?: string; suggestion?: string }
    const name = body.name?.trim() ?? ''
    const suggestion = body.suggestion?.trim() ?? ''

    if (!suggestion) {
      return NextResponse.json({ error: 'Suggestion is required' }, { status: 400 })
    }

    const params = new URLSearchParams()
    if (name) params.append('entry.974992788', name)
    params.append('entry.777559873', suggestion)
    params.append('fvv', '1')
    params.append('pageHistory', '0')

    const res = await fetch(GOOGLE_FORM_ACTION, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
      redirect: 'follow',
    })

    if (!res.ok && res.status !== 302) {
      return NextResponse.json(
        { error: 'Google Form submission failed', status: res.status },
        { status: 502 }
      )
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Unable to submit suggestion' }, { status: 500 })
  }
}
