import { NextResponse } from 'next/server'
import {
  EMPTY_HISTORY_BY_HER_STATS,
  type HistoryByHerStats,
} from '@/lib/historyByHerStats'

export const revalidate = 60

function toNonNegInt(value: unknown): number {
  const n = typeof value === 'number' ? value : Number(value)
  if (!Number.isFinite(n)) return 0
  return Math.max(0, Math.round(n))
}

async function fetchFromAppsScript(url: string): Promise<HistoryByHerStats | null> {
  const res = await fetch(url, {
    headers: { Accept: 'application/json' },
    next: { revalidate: 60 },
  })
  if (!res.ok) return null

  const data = (await res.json()) as Record<string, unknown>
  return {
    bookmarks: toNonNegInt(data.bookmarks),
    educationalInstitutions: toNonNegInt(data.educationalInstitutions),
    responses: toNonNegInt(data.responses),
    updatedAt: typeof data.updatedAt === 'string' ? data.updatedAt : null,
    live: true,
  }
}

/** Parse a published Google Sheet CSV and sum Places + Bookmarks columns. */
async function fetchFromPublishedCsv(url: string): Promise<HistoryByHerStats | null> {
  const res = await fetch(url, {
    headers: { Accept: 'text/csv' },
    next: { revalidate: 60 },
  })
  if (!res.ok) return null

  const text = await res.text()
  const rows = parseCsv(text)
  if (rows.length < 2) {
    return {
      ...EMPTY_HISTORY_BY_HER_STATS,
      live: true,
      updatedAt: new Date().toISOString(),
    }
  }

  const headers = rows[0].map((h) => h.toLowerCase().replace(/\s+/g, ' ').trim())
  const bookmarkCol = findCol(headers, ['bookmark'])
  const placesCol = findCol(headers, [
    'places you donated',
    'number of places',
    'places',
  ])

  let bookmarks = 0
  let places = 0
  let responses = 0

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i]
    if (!row.some((cell) => cell.trim())) continue
    responses++
    if (bookmarkCol >= 0) bookmarks += parseLooseNumber(row[bookmarkCol])
    if (placesCol >= 0) places += parseLooseNumber(row[placesCol])
  }

  return {
    bookmarks,
    educationalInstitutions: places,
    responses,
    updatedAt: new Date().toISOString(),
    live: true,
  }
}

function findCol(headers: string[], keywords: string[]): number {
  for (const needle of keywords) {
    const idx = headers.findIndex((h) => h.includes(needle))
    if (idx >= 0) return idx
  }
  return -1
}

function parseLooseNumber(value: string): number {
  const match = String(value || '')
    .replace(/,/g, '')
    .match(/-?\d+(\.\d+)?/)
  if (!match) return 0
  const n = Number(match[0])
  return Number.isFinite(n) ? Math.max(0, Math.round(n)) : 0
}

/** Minimal CSV parser that handles quoted fields. */
function parseCsv(text: string): string[][] {
  const rows: string[][] = []
  let row: string[] = []
  let cell = ''
  let inQuotes = false

  for (let i = 0; i < text.length; i++) {
    const ch = text[i]
    const next = text[i + 1]

    if (inQuotes) {
      if (ch === '"' && next === '"') {
        cell += '"'
        i++
      } else if (ch === '"') {
        inQuotes = false
      } else {
        cell += ch
      }
      continue
    }

    if (ch === '"') {
      inQuotes = true
    } else if (ch === ',') {
      row.push(cell)
      cell = ''
    } else if (ch === '\n') {
      row.push(cell)
      rows.push(row)
      row = []
      cell = ''
    } else if (ch !== '\r') {
      cell += ch
    }
  }

  if (cell.length || row.length) {
    row.push(cell)
    rows.push(row)
  }

  return rows
}

export async function GET() {
  try {
    const appsScriptUrl = process.env.HISTORY_BY_HER_STATS_URL?.trim()
    const csvUrl = process.env.HISTORY_BY_HER_SHEET_CSV_URL?.trim()

    if (appsScriptUrl) {
      const stats = await fetchFromAppsScript(appsScriptUrl)
      if (stats) return NextResponse.json(stats)
    }

    if (csvUrl) {
      const stats = await fetchFromPublishedCsv(csvUrl)
      if (stats) return NextResponse.json(stats)
    }

    return NextResponse.json(EMPTY_HISTORY_BY_HER_STATS)
  } catch {
    return NextResponse.json(EMPTY_HISTORY_BY_HER_STATS)
  }
}
