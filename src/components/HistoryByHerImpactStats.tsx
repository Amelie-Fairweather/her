'use client'

import { useEffect, useState } from 'react'
import type { HistoryByHerStats } from '@/lib/historyByHerStats'

type Variant = 'banner' | 'page' | 'card'

const CACHE_KEY = 'her:history-by-her-stats'

function formatNumber(n: number) {
  return n.toLocaleString('en-US')
}

function readCachedStats(): HistoryByHerStats | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = sessionStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const data = JSON.parse(raw) as HistoryByHerStats
    if ((data.bookmarks ?? 0) > 0 || (data.educationalInstitutions ?? 0) > 0) return data
  } catch {
    // ignore
  }
  return null
}

function writeCachedStats(data: HistoryByHerStats) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(data))
  } catch {
    // ignore
  }
}

export default function HistoryByHerImpactStats({
  variant = 'page',
}: {
  variant?: Variant
}) {
  const [stats, setStats] = useState<HistoryByHerStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const cached = readCachedStats()
    if (cached) {
      setStats(cached)
      setLoading(false)
    }

    let cancelled = false
    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), 30000)

    fetch('/api/history-by-her/stats', {
      cache: 'no-store',
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data: HistoryByHerStats) => {
        if (cancelled) return
        if ((data.bookmarks ?? 0) > 0 || (data.educationalInstitutions ?? 0) > 0) {
          setStats(data)
          writeCachedStats(data)
        }
        // If feed failed, keep whatever we already showed (cache) — never force 1000/11
      })
      .catch(() => {
        // Keep cached live numbers on timeout / network error
      })
      .finally(() => {
        window.clearTimeout(timeout)
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
      controller.abort()
      window.clearTimeout(timeout)
    }
  }, [])

  const bookmarks = stats?.bookmarks
  const locations = stats?.educationalInstitutions
  const showPlaceholder = loading && stats == null

  const bookmarksLabel = showPlaceholder ? '—' : formatNumber(bookmarks ?? 0)
  const locationsLabel = showPlaceholder ? '—' : formatNumber(locations ?? 0)

  if (variant === 'banner') {
    return (
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 sm:gap-x-8 md:gap-x-10">
        <p className="leading-none">
          <span className="font-bold tabular-nums text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
            {bookmarksLabel}
          </span>{' '}
          <span className="text-white/90 text-base sm:text-lg md:text-xl lg:text-2xl font-semibold">
            bookmarks donated
          </span>
        </p>
        <span className="hidden sm:inline text-white/40 text-3xl md:text-4xl" aria-hidden>
          ·
        </span>
        <p className="leading-none">
          <span className="font-bold tabular-nums text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
            {locationsLabel}
          </span>{' '}
          <span className="text-white/90 text-base sm:text-lg md:text-xl lg:text-2xl font-semibold">
            locations
          </span>
        </p>
      </div>
    )
  }

  if (variant === 'card') {
    return (
      <div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs md:text-sm text-[#7A2454]/80">
        <span>
          <strong className="tabular-nums text-[#EB89B5]">{bookmarksLabel}</strong> bookmarks donated
        </span>
        <span className="text-[#EB89B5]/35" aria-hidden>
          ·
        </span>
        <span>
          <strong className="tabular-nums text-[#EB89B5]">{locationsLabel}</strong> locations
        </span>
      </div>
    )
  }

  return (
    <div className="relative z-[1]">
      <div className="grid grid-cols-2 gap-4 md:gap-8 max-w-2xl mx-auto">
        <div className="rounded-3xl bg-white border border-[#EB89B5]/20 px-4 py-7 md:px-8 md:py-10 text-center shadow-lg shadow-[#EB89B5]/10">
          <p className="text-4xl md:text-6xl font-bold tabular-nums text-[#EB89B5] leading-none">
            {bookmarksLabel}
          </p>
          <p className="mt-3 text-xs md:text-sm font-bold uppercase tracking-[0.18em] text-[#7A2454]">
            Bookmarks donated
          </p>
        </div>
        <div className="rounded-3xl bg-white border border-[#EB89B5]/20 px-4 py-7 md:px-8 md:py-10 text-center shadow-lg shadow-[#EB89B5]/10">
          <p className="text-4xl md:text-6xl font-bold tabular-nums text-[#EB89B5] leading-none">
            {locationsLabel}
          </p>
          <p className="mt-3 text-xs md:text-sm font-bold uppercase tracking-[0.18em] text-[#7A2454]">
            Locations
          </p>
        </div>
      </div>
    </div>
  )
}
