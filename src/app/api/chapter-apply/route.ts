import { NextRequest, NextResponse } from 'next/server'

const GOOGLE_FORM_ACTION =
  'https://docs.google.com/forms/d/e/1FAIpQLScl9lSLS7BoaZrzdaRLzNmgUGkz6qUg93UZzjDRgaH3VydfJA/formResponse'

const FIELD_MAP = {
  nameGrade: 'entry.1216833645',
  schoolTownState: 'entry.545009334',
  coLeaders: 'entry.1562859370',
  contact: 'entry.608028062',
  howHeard: 'entry.1343404890',
  whyHer: 'entry.674639551',
  meetingTimes: 'entry.2056114650',
} as const

type FieldKey = keyof typeof FIELD_MAP

const REQUIRED: FieldKey[] = [
  'nameGrade',
  'schoolTownState',
  'contact',
  'howHeard',
  'meetingTimes',
]

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<Record<FieldKey, string>>

    for (const key of REQUIRED) {
      const value = body[key]?.trim()
      if (!value) {
        return NextResponse.json({ error: `Missing field: ${key}` }, { status: 400 })
      }
    }

    const params = new URLSearchParams()
    for (const key of Object.keys(FIELD_MAP) as FieldKey[]) {
      const value = body[key]?.trim()
      if (value) params.append(FIELD_MAP[key], value)
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
    return NextResponse.json({ error: 'Unable to submit application' }, { status: 500 })
  }
}
