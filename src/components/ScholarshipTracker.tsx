'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'

const GOFUNDME_URL =
  'https://www.gofundme.com/f/support-scholarships-and-womens-history-education'

const SHARE_MESSAGE =
  "Hey! Donate today to the HER Education Required Scholarship Fund — we're raising money for need-based scholarships for high school girls who are advocating for women's history in schools. Every gift helps a young woman pursue higher education while strengthening this student-led movement: https://www.gofundme.com/f/support-scholarships-and-womens-history-education"

type FundStats = {
  raised: number
  goal: number
  donors: number
  live?: boolean
}

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

function DonationPie({ raised, goal }: { raised: number; goal: number }) {
  const pct = goal > 0 ? Math.min(raised / goal, 1) : 0
  const size = 220
  const stroke = 28
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const raisedLength = circumference * pct
  const remainingLength = circumference - raisedLength

  return (
    <div className="relative mx-auto w-[220px] h-[220px]">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90" aria-hidden="true">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#FFEAF4"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#EB89B5"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${raisedLength} ${remainingLength}`}
          className="transition-[stroke-dasharray] duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <p className="text-3xl font-bold text-[#7A2454] leading-none">
          {Math.round(pct * 100)}%
        </p>
        <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#EB89B5]">
          funded
        </p>
      </div>
    </div>
  )
}

function openSmsShare() {
  const body = encodeURIComponent(SHARE_MESSAGE)
  const isApple = /iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent)
  const href = isApple ? `sms:&body=${body}` : `sms:?body=${body}`
  window.location.href = href
}

export default function ScholarshipTracker({
  showDetailsLink = true,
}: {
  showDetailsLink?: boolean
}) {
  const [stats, setStats] = useState<FundStats>({
    raised: 0,
    goal: 10000,
    donors: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        const res = await fetch('/api/gofundme', { cache: 'no-store' })
        if (!res.ok) return
        const data = (await res.json()) as FundStats
        if (!cancelled) {
          setStats({
            raised: Number(data.raised) || 0,
            goal: Number(data.goal) || 10000,
            donors: Number(data.donors) || 0,
            live: data.live,
          })
        }
      } catch {
        // keep fallback zeros / previous values
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    const interval = window.setInterval(load, 60_000)
    return () => {
      cancelled = true
      window.clearInterval(interval)
    }
  }, [])

  const remaining = useMemo(
    () => Math.max(stats.goal - stats.raised, 0),
    [stats.goal, stats.raised]
  )

  return (
    <section className="mt-10 md:mt-14 max-w-3xl mx-auto px-2 md:px-0">
      <div className="rounded-[2rem] border-2 border-[#EB89B5]/40 bg-white/90 shadow-lg shadow-[#EB89B5]/15 px-6 py-8 md:px-10 md:py-10">
        <div className="text-center mb-6 md:mb-8">
          <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.18em] text-[#EB89B5] mb-2">
            Scholarship Fund
          </p>
          <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#7A2454] leading-tight">
            Help fund scholarships for high school girls
          </h3>
          <p className="mt-3 text-sm md:text-base text-gray-700 max-w-xl mx-auto">
            We&apos;re raising need-based scholarships for HER members. Track our live progress,
            donate on GoFundMe, or share the campaign with a friend.
          </p>
        </div>

        <DonationPie raised={stats.raised} goal={stats.goal} />

        <div className="mt-6 grid grid-cols-3 gap-3 text-center">
          <div className="rounded-2xl bg-[#FFF6FB] px-2 py-3">
            <p className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.12em] text-[#EB89B5]">
              Raised
            </p>
            <p className="mt-1 text-base md:text-xl font-bold text-[#7A2454]">
              {loading && stats.raised === 0 ? '—' : currency.format(stats.raised)}
            </p>
          </div>
          <div className="rounded-2xl bg-[#FFF6FB] px-2 py-3">
            <p className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.12em] text-[#EB89B5]">
              Goal
            </p>
            <p className="mt-1 text-base md:text-xl font-bold text-[#7A2454]">
              {currency.format(stats.goal)}
            </p>
          </div>
          <div className="rounded-2xl bg-[#FFF6FB] px-2 py-3">
            <p className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.12em] text-[#EB89B5]">
              Donors
            </p>
            <p className="mt-1 text-base md:text-xl font-bold text-[#7A2454]">
              {loading && stats.donors === 0 ? '—' : stats.donors.toLocaleString()}
            </p>
          </div>
        </div>

        <p className="mt-4 text-center text-sm text-gray-600">
          {currency.format(remaining)} still needed to reach our scholarship goal
        </p>

        <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
          <a
            href={GOFUNDME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center min-h-[52px] px-6 rounded-none bg-[#EB89B5] text-white text-sm md:text-base font-bold tracking-[0.08em] uppercase shadow-md shadow-[#EB89B5]/25 border-2 border-[#EB89B5] transition-all duration-300 hover:bg-[#7A2454] hover:border-[#7A2454]"
          >
            Donate on GoFundMe
          </a>
          <button
            type="button"
            onClick={openSmsShare}
            className="inline-flex items-center justify-center min-h-[52px] px-6 rounded-none bg-white text-[#EB89B5] text-sm md:text-base font-bold tracking-[0.08em] uppercase border-2 border-[#EB89B5] transition-all duration-300 hover:bg-[#FFD7E9] hover:text-[#7A2454]"
          >
            Share via Messages
          </button>
        </div>

        {showDetailsLink ? (
          <p className="mt-5 text-center text-sm text-gray-600">
            Learn more about eligibility and how to apply on our{' '}
            <Link href="/scholarship" className="font-semibold text-[#EB89B5] underline-offset-2 hover:underline">
              Scholarship Fund page
            </Link>
            .
          </p>
        ) : null}
      </div>
    </section>
  )
}
