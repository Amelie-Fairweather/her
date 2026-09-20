import { NextRequest, NextResponse } from 'next/server'

const GOOGLE_FORM_ACTION =
  'https://docs.google.com/forms/d/e/1FAIpQLSdPaht-67KRVxMnvEUkMudD2PZvqMvFTC0qJosfZFSksuvZFw/formResponse'

const FIELD_MAP = {
  fullName: 'entry.1597598244',
  email: 'entry.791016042',
  location: 'entry.1555170564',
  honorVolunteer: 'entry.1563456325',
  shareMedia: 'entry.1114990212',
} as const

type FieldKey = keyof typeof FIELD_MAP

const REQUIRED: FieldKey[] = ['fullName', 'email', 'location', 'honorVolunteer', 'shareMedia']
const YES_NO = new Set(['Yes', 'No'])

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<Record<FieldKey, string>>

    for (const key of REQUIRED) {
      const value = body[key]?.trim()
      if (!value) {
        return NextResponse.json({ error: `Missing field: ${key}` }, { status: 400 })
      }
    }

    if (!YES_NO.has(body.honorVolunteer!.trim()) || !YES_NO.has(body.shareMedia!.trim())) {
      return NextResponse.json({ error: 'Invalid yes/no option' }, { status: 400 })
    }

    const params = new URLSearchParams()
    for (const key of REQUIRED) {
      params.append(FIELD_MAP[key], body[key]!.trim())
    }
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
    return NextResponse.json({ error: 'Unable to submit volunteer form' }, { status: 500 })
  }
}
