import { NextResponse } from 'next/server'
import {
  EMPTY_HISTORY_BY_HER_STATS,
  type HistoryByHerStats,
} from '@/lib/historyByHerStats'

export const revalidate = 60

/**
 * Corrected baselines when some report-form rows were wrong/incomplete.
 * New submissions still increase the public totals:
 *   display = BASELINE_DISPLAY + max(0, liveSheetSum - SHEET_BASELINE)
 *
 * Bookmarks verified: 650 + 90 + 90 + 100 = 930 → show 1,000
 * Sheet summed to 1430 at that moment (includes bad rows).
 * Locations corrected to 11 when sheet showed 9.
 */
const BOOKMARKS_DISPLAY_BASELINE = 1000
const BOOKMARKS_SHEET_BASELINE = 1430
const LOCATIONS_DISPLAY_BASELINE = 11
const LOCATIONS_SHEET_BASELINE = 9

function toNonNegInt(value: unknown): number {
  const n = typeof value === 'number' ? value : Number(value)
  if (!Number.isFinite(n)) return 0
  return Math.max(0, Math.round(n))
}

type FetchResult =
  | { ok: true; stats: HistoryByHerStats }
  | { ok: false; reason: string }

async function fetchFromAppsScript(url: string): Promise<FetchResult> {
  try {
    const res = await fetch(url, {
      headers: {
        Accept: 'application/json,text/plain,*/*',
        'User-Agent': 'HEREducationBot/1.0 (+https://hereducation.org)',
      },
      redirect: 'follow',
      next: { revalidate: 60 },
    })

    const text = await res.text()
    if (!res.ok) {
      return { ok: false, reason: `apps_script_http_${res.status}` }
    }

    // Apps Script sometimes returns HTML login / permission pages
    if (text.trimStart().startsWith('<')) {
      return {
        ok: false,
        reason:
          'apps_script_returned_html_not_json_redeploy_webapp_as_Anyone_access',
      }
    }

    let data: Record<string, unknown>
    try {
      data = JSON.parse(text) as Record<string, unknown>
    } catch {
      return { ok: false, reason: 'apps_script_invalid_json' }
    }

    return {
      ok: true,
      stats: {
        bookmarks: toNonNegInt(data.bookmarks),
        educationalInstitutions: toNonNegInt(data.educationalInstitutions),
        responses: toNonNegInt(data.responses),
        updatedAt: typeof data.updatedAt === 'string' ? data.updatedAt : null,
        live: true,
        reason: 'apps_script',
      },
    }
  } catch (err) {
    return {
      ok: false,
      reason: `apps_script_fetch_error_${err instanceof Error ? err.name : 'unknown'}`,
    }
  }
}

/** Parse a published Google Sheet CSV and sum Places + Bookmarks columns. */
async function fetchFromPublishedCsv(url: string): Promise<FetchResult> {
  try {
    const res = await fetch(url, {
      headers: { Accept: 'text/csv' },
      redirect: 'follow',
      next: { revalidate: 60 },
    })
    if (!res.ok) {
      return { ok: false, reason: `csv_http_${res.status}` }
    }

    const text = await res.text()
    const rows = parseCsv(text)
    if (rows.length < 2) {
      return {
        ok: true,
        stats: {
          ...EMPTY_HISTORY_BY_HER_STATS,
          live: true,
          updatedAt: new Date().toISOString(),
          reason: 'csv_empty',
        },
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
      ok: true,
      stats: {
        bookmarks,
        educationalInstitutions: places,
        responses,
        updatedAt: new Date().toISOString(),
        live: true,
        reason: 'csv',
      },
    }
  } catch (err) {
    return {
      ok: false,
      reason: `csv_fetch_error_${err instanceof Error ? err.name : 'unknown'}`,
    }
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

function applyBaselines(stats: HistoryByHerStats): HistoryByHerStats {
  // Already adjusted upstream (e.g. production mirrored in local dev)
  if (stats.reason?.includes('baseline_adjusted')) return stats

  const liveBookmarks = stats.bookmarks
  const liveLocations = stats.educationalInstitutions

  return {
    ...stats,
    bookmarks:
      BOOKMARKS_DISPLAY_BASELINE + Math.max(0, liveBookmarks - BOOKMARKS_SHEET_BASELINE),
    educationalInstitutions:
      LOCATIONS_DISPLAY_BASELINE + Math.max(0, liveLocations - LOCATIONS_SHEET_BASELINE),
    live: true,
    reason: `${stats.reason || 'live'}+baseline_adjusted`,
  }
}

export async function GET() {
  try {
    const appsScriptUrl = process.env.HISTORY_BY_HER_STATS_URL?.trim()
    const csvUrl = process.env.HISTORY_BY_HER_SHEET_CSV_URL?.trim()

    if (!appsScriptUrl && !csvUrl) {
      // Local `npm run dev` has no Vercel env vars — mirror production totals.
      const isLocalDev = process.env.NODE_ENV !== 'production' || !process.env.VERCEL
      if (isLocalDev) {
        try {
          const prod = await fetch('https://www.hereducation.org/api/history-by-her/stats', {
            cache: 'no-store',
            headers: { Accept: 'application/json' },
          })
          if (prod.ok) {
            const data = (await prod.json()) as HistoryByHerStats
            if (data?.live) {
              return NextResponse.json({
                ...data,
                reason: `dev_fallback_production+${data.reason || 'live'}`,
              })
            }
          }
        } catch {
          // fall through
        }
      }
      return NextResponse.json(
        applyBaselines({
          ...EMPTY_HISTORY_BY_HER_STATS,
          bookmarks: BOOKMARKS_SHEET_BASELINE,
          educationalInstitutions: LOCATIONS_SHEET_BASELINE,
          live: true,
          reason: 'missing_env_using_baseline',
        })
      )
    }

    const reasons: string[] = []

    if (appsScriptUrl) {
      const result = await fetchFromAppsScript(appsScriptUrl)
      if (result.ok) return NextResponse.json(applyBaselines(result.stats))
      reasons.push(result.reason)
    }

    if (csvUrl) {
      const result = await fetchFromPublishedCsv(csvUrl)
      if (result.ok) return NextResponse.json(applyBaselines(result.stats))
      reasons.push(result.reason)
    }

    return NextResponse.json(
      applyBaselines({
        ...EMPTY_HISTORY_BY_HER_STATS,
        bookmarks: BOOKMARKS_SHEET_BASELINE,
        educationalInstitutions: LOCATIONS_SHEET_BASELINE,
        live: true,
        reason: reasons.join('|') || 'feed_failed_using_baseline',
      })
    )
  } catch {
    return NextResponse.json({
      ...EMPTY_HISTORY_BY_HER_STATS,
      reason: 'unhandled_error',
    })
  }
}
