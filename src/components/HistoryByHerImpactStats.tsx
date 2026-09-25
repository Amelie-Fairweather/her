'use client'

import { useEffect, useRef, useState } from 'react'
import type { HistoryByHerStats } from '@/lib/historyByHerStats'

type Variant = 'banner' | 'page' | 'card'

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

function useCountUp(target: number, active: boolean, durationMs = 1400) {
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!active) {
      setN(0)
      return
    }
    if (target <= 0) {
      setN(0)
      return
    }

    let frame = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs)
      setN(Math.round(target * easeOutCubic(t)))
      if (t < 1) frame = requestAnimationFrame(tick)
      else setN(target)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [active, target, durationMs])

  return n
}

function formatNumber(n: number) {
  return n.toLocaleString('en-US')
}

export default function HistoryByHerImpactStats({
  variant = 'page',
}: {
  variant?: Variant
}) {
  const [stats, setStats] = useState<HistoryByHerStats | null>(null)
  // Banner sits above the fold — start visible so we never stay stuck at 0
  const [visible, setVisible] = useState(variant === 'banner' || variant === 'card')
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cancelled = false
    fetch('/api/history-by-her/stats', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data: HistoryByHerStats) => {
        if (!cancelled) setStats(data)
      })
      .catch(() => {
        if (!cancelled) {
          setStats({
            bookmarks: 0,
            educationalInstitutions: 0,
            responses: 0,
            updatedAt: null,
            live: false,
          })
        }
      })
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (variant === 'banner' || variant === 'card') return
    const el = rootRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.15 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [variant])

  const bookmarks = stats?.bookmarks ?? 0
  const locations = stats?.educationalInstitutions ?? 0
  const ready = !!stats && visible
  const bookmarksDisplay = useCountUp(bookmarks, ready)
  const locationsDisplay = useCountUp(locations, ready)
  // Show final number immediately if animation hasn't started yet but we have data
  const showBookmarks = ready ? bookmarksDisplay : bookmarks
  const showLocations = ready ? locationsDisplay : locations

  if (variant === 'banner') {
    return (
      <div
        ref={rootRef}
        className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 sm:gap-x-8 md:gap-x-10"
      >
        <p className="leading-none">
          <span className="font-bold tabular-nums text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
            {formatNumber(showBookmarks)}
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
            {formatNumber(showLocations)}
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
      <div
        ref={rootRef}
        className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs md:text-sm text-[#7A2454]/80"
      >
        <span>
          <strong className="tabular-nums text-[#EB89B5]">{formatNumber(showBookmarks)}</strong>{' '}
          bookmarks donated
        </span>
        <span className="text-[#EB89B5]/35" aria-hidden>
          ·
        </span>
        <span>
          <strong className="tabular-nums text-[#EB89B5]">{formatNumber(showLocations)}</strong>{' '}
          locations
        </span>
      </div>
    )
  }

  return (
    <div ref={rootRef} className="relative z-[1]">
      <div className="grid grid-cols-2 gap-4 md:gap-8 max-w-2xl mx-auto">
        <div className="rounded-3xl bg-white border border-[#EB89B5]/20 px-4 py-7 md:px-8 md:py-10 text-center shadow-lg shadow-[#EB89B5]/10">
          <p className="text-4xl md:text-6xl font-bold tabular-nums text-[#EB89B5] leading-none">
            {formatNumber(showBookmarks)}
          </p>
          <p className="mt-3 text-xs md:text-sm font-bold uppercase tracking-[0.18em] text-[#7A2454]">
            Bookmarks donated
          </p>
        </div>
        <div className="rounded-3xl bg-white border border-[#EB89B5]/20 px-4 py-7 md:px-8 md:py-10 text-center shadow-lg shadow-[#EB89B5]/10">
          <p className="text-4xl md:text-6xl font-bold tabular-nums text-[#EB89B5] leading-none">
            {formatNumber(showLocations)}
          </p>
          <p className="mt-3 text-xs md:text-sm font-bold uppercase tracking-[0.18em] text-[#7A2454]">
            Locations
          </p>
        </div>
      </div>
    </div>
  )
}
