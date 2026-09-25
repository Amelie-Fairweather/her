'use client'

import { useEffect, useState } from 'react'
import type { HistoryByHerStats } from '@/lib/historyByHerStats'

type Variant = 'banner' | 'page' | 'card'

function formatNumber(n: number) {
  return n.toLocaleString('en-US')
}

export default function HistoryByHerImpactStats({
  variant = 'page',
}: {
  variant?: Variant
}) {
  const [stats, setStats] = useState<HistoryByHerStats | null>(null)

  useEffect(() => {
    let cancelled = false

    const load = () => {
      fetch('/api/history-by-her/stats', { cache: 'no-store' })
        .then((res) => res.json())
        .then((data: HistoryByHerStats) => {
          if (!cancelled) setStats(data)
        })
        .catch(() => {
          if (!cancelled) {
            // Verified baseline if the request fails
            setStats({
              bookmarks: 1000,
              educationalInstitutions: 11,
              responses: 0,
              updatedAt: null,
              live: false,
              reason: 'client_fallback_baseline',
            })
          }
        })
    }

    load()
    // Refresh periodically so add/delete on the sheet shows up
    const id = window.setInterval(load, 30_000)
    return () => {
      cancelled = true
      window.clearInterval(id)
    }
  }, [])

  const bookmarks = stats?.bookmarks ?? 0
  const locations = stats?.educationalInstitutions ?? 0

  if (variant === 'banner') {
    return (
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 sm:gap-x-8 md:gap-x-10">
        <p className="leading-none">
          <span className="font-bold tabular-nums text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
            {formatNumber(bookmarks)}
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
            {formatNumber(locations)}
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
          <strong className="tabular-nums text-[#EB89B5]">{formatNumber(bookmarks)}</strong>{' '}
          bookmarks donated
        </span>
        <span className="text-[#EB89B5]/35" aria-hidden>
          ·
        </span>
        <span>
          <strong className="tabular-nums text-[#EB89B5]">{formatNumber(locations)}</strong>{' '}
          locations
        </span>
      </div>
    )
  }

  return (
    <div className="relative z-[1]">
      <div className="grid grid-cols-2 gap-4 md:gap-8 max-w-2xl mx-auto">
        <div className="rounded-3xl bg-white border border-[#EB89B5]/20 px-4 py-7 md:px-8 md:py-10 text-center shadow-lg shadow-[#EB89B5]/10">
          <p className="text-4xl md:text-6xl font-bold tabular-nums text-[#EB89B5] leading-none">
            {formatNumber(bookmarks)}
          </p>
          <p className="mt-3 text-xs md:text-sm font-bold uppercase tracking-[0.18em] text-[#7A2454]">
            Bookmarks donated
          </p>
        </div>
        <div className="rounded-3xl bg-white border border-[#EB89B5]/20 px-4 py-7 md:px-8 md:py-10 text-center shadow-lg shadow-[#EB89B5]/10">
          <p className="text-4xl md:text-6xl font-bold tabular-nums text-[#EB89B5] leading-none">
            {formatNumber(locations)}
          </p>
          <p className="mt-3 text-xs md:text-sm font-bold uppercase tracking-[0.18em] text-[#7A2454]">
            Locations
          </p>
        </div>
      </div>
    </div>
  )
}
