import { NextRequest, NextResponse } from 'next/server'

const GOOGLE_FORM_ACTION =
  'https://docs.google.com/forms/d/e/1FAIpQLSc68658Y_eU6atMck6K0z9az5rrOdt2rbpFYfMfmWblTnB7SQ/formResponse'

const FIELD_MAP = {
  fullName: 'entry.478534732',
  contact: 'entry.71762151',
  organization: 'entry.158801146',
  status: 'entry.1740468412',
  about: 'entry.1260981531',
  whySpeak: 'entry.1529614488',
  eventStyle: 'entry.737213103',
  audience: 'entry.1456629322',
  photoConsent: 'entry.316049373',
} as const

type FieldKey = keyof typeof FIELD_MAP

const REQUIRED: FieldKey[] = [
  'fullName',
  'contact',
  'organization',
  'status',
  'about',
  'whySpeak',
  'eventStyle',
  'audience',
  'photoConsent',
]

const PHOTO_OPTIONS = new Set(['Yes', 'No', 'Maybe', 'Photo and recording'])

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<Record<FieldKey, string>>

    for (const key of REQUIRED) {
      const value = body[key]?.trim()
      if (!value) {
        return NextResponse.json({ error: `Missing field: ${key}` }, { status: 400 })
      }
    }

    if (!PHOTO_OPTIONS.has(body.photoConsent!.trim())) {
      return NextResponse.json({ error: 'Invalid photo consent option' }, { status: 400 })
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

    // Google Forms often returns 200 even on success (or a redirect to confirmation)
    if (!res.ok && res.status !== 302) {
      return NextResponse.json(
        { error: 'Google Form submission failed', status: res.status },
        { status: 502 }
      )
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Unable to submit application' }, { status: 500 })
  }
}
