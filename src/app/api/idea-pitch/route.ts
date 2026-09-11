import { NextRequest, NextResponse } from 'next/server'

const GOOGLE_FORM_ACTION =
  'https://docs.google.com/forms/d/e/1FAIpQLSeEfY5Ssd0Ya_YgqveeD5l9WMYiqtb4ks1wjldAajrN7Xd3vA/formResponse'

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { name?: string; idea?: string }
    const name = body.name?.trim() ?? ''
    const idea = body.idea?.trim() ?? ''

    if (!idea) {
      return NextResponse.json({ error: 'Idea is required' }, { status: 400 })
    }

    const params = new URLSearchParams()
    if (name) params.append('entry.363933876', name)
    params.append('entry.956516524', idea)
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
    return NextResponse.json({ error: 'Unable to submit idea' }, { status: 500 })
  }
}
