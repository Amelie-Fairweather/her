'use client'

import { useEffect, useRef, useState } from 'react'

const impactStats = [
  {
    value: 100,
    suffix: '+',
    label: 'Chapters',
    detail: 'Student-led clubs in schools worldwide',
  },
  {
    value: 27,
    suffix: '',
    label: 'States',
    detail: 'Across the United States and growing',
  },
  {
    value: 9,
    suffix: '',
    label: 'Countries',
    detail: 'An expanding international network',
  },
  {
    value: 1000,
    suffix: '+',
    label: 'Youth volunteers',
    detail: 'Students advocating for women’s history',
  },
]

function clamp(n: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, n))
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

function easeOutQuint(t: number) {
  return 1 - Math.pow(1 - t, 5)
}

function useCountUp(target: number, active: boolean, durationMs = 2000, delayMs = 0) {
  const [n, setN] = useState(0)
  const doneRef = useRef(false)

  useEffect(() => {
    if (!active || doneRef.current) return

    let frame = 0
    const delayId = window.setTimeout(() => {
      const start = performance.now()
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / durationMs)
        setN(Math.round(target * easeOutCubic(t)))
        if (t < 1) {
          frame = requestAnimationFrame(tick)
        } else {
          doneRef.current = true
          setN(target)
        }
      }
      frame = requestAnimationFrame(tick)
    }, delayMs)

    return () => {
      window.clearTimeout(delayId)
      cancelAnimationFrame(frame)
    }
  }, [active, target, durationMs, delayMs])

  return n
}

function StatCard({
  value,
  suffix,
  label,
  detail,
  index,
  cardP,
  countActive,
  reducedMotion,
}: {
  value: number
  suffix: string
  label: string
  detail: string
  index: number
  cardP: number
  countActive: boolean
  reducedMotion: boolean
}) {
  const n = useCountUp(value, countActive || reducedMotion, 2200, index * 160)
  const reveal = Math.max(cardP, 0.12)
  const y = (1 - cardP) * (40 + index * 10)
  const rotate = (1 - cardP) * (index % 2 === 0 ? -2 : 2)
  const x = (1 - cardP) * (index % 2 === 0 ? -12 : 12)

  return (
    <article
      className="group relative overflow-hidden rounded-[1.75rem] bg-white border border-[#EB89B5]/15 px-5 py-9 md:px-6 md:py-11 text-center shadow-[0_24px_60px_-32px_rgba(122,36,84,0.55)] will-change-transform"
      style={{
        opacity: reveal,
        transform: `translate3d(${x}px, ${y}px, 0) rotate(${rotate}deg) scale(${0.94 + cardP * 0.06})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFD7E9]/35 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="absolute -bottom-10 left-1/2 h-28 w-28 -translate-x-1/2 rounded-full bg-[#EB89B5]/20 blur-2xl transition-transform duration-700 group-hover:scale-125" />

      <div className="relative text-5xl sm:text-6xl md:text-[4.25rem] font-bold tabular-nums tracking-tight text-[#7A2454] leading-none">
        {n.toLocaleString()}
        <span className="text-[#EB89B5]">{suffix}</span>
      </div>

      <div className="relative mt-5 mx-auto h-px w-10 bg-[#EB89B5]/40" />

      <div className="relative mt-4 text-[11px] sm:text-xs font-bold uppercase tracking-[0.3em] text-[#EB89B5]">
        {label}
      </div>
      <p className="relative mt-3 text-xs sm:text-sm text-[#7A2454]/65 leading-snug max-w-[13.5rem] mx-auto">
        {detail}
      </p>
    </article>
  )
}

export default function ImpactStats() {
  const sectionRef = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)
  const [countActive, setCountActive] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const onChange = () => setReducedMotion(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    let frame = 0
    const update = () => {
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight || 1
      const raw = (vh * 0.85 - rect.top) / (vh * 0.75)
      const next = clamp(raw)
      setProgress(next)
      if (next > 0.28) setCountActive(true)
      frame = 0
    }

    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  const p = reducedMotion ? 1 : progress
  const titleIn = easeOutCubic(clamp((p - 0.05) / 0.4))
  const lineIn = easeOutCubic(clamp((p - 0.1) / 0.4))
  const orbDrift = (1 - p) * 40

  return (
    <section
      ref={sectionRef}
      className="relative z-10 w-full mt-0 mb-8 md:mb-12 overflow-visible bg-transparent"
    >
      <div
        className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#EB89B5]/20 blur-3xl"
        style={{ transform: `translate3d(${-orbDrift}px, ${orbDrift * 0.5}px, 0)` }}
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-[#FFD7E9]/40 blur-3xl"
        style={{ transform: `translate3d(${orbDrift}px, ${-orbDrift * 0.4}px, 0)` }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-16 md:pt-24 pb-16 md:pb-24">
        <div
          className="text-center mb-12 md:mb-16 will-change-transform"
          style={{
            opacity: Math.max(titleIn, 0.2),
            transform: `translate3d(0, ${(1 - titleIn) * 40}px, 0) scale(${0.97 + titleIn * 0.03})`,
          }}
        >
          <div className="inline-flex items-center gap-3 mb-5">
            <span
              className="h-px w-8 md:w-12 bg-[#EB89B5]/70 origin-right"
              style={{ transform: `scaleX(${Math.max(lineIn, 0.25)})` }}
            />
            <p className="text-[11px] md:text-xs font-bold uppercase tracking-[0.34em] text-[#EB89B5]">
              The movement in numbers
            </p>
            <span
              className="h-px w-8 md:w-12 bg-[#EB89B5]/70 origin-left"
              style={{ transform: `scaleX(${Math.max(lineIn, 0.25)})` }}
            />
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#7A2454] tracking-tight leading-[1.05]">
            Growing every
            <span className="block text-[#EB89B5]">school year</span>
          </h2>
          <p className="mt-5 text-sm md:text-lg text-[#7A2454]/70 max-w-xl mx-auto leading-relaxed">
            From one classroom to a global youth network — here&apos;s where HER stands today.
          </p>
        </div>

        <div className="mx-auto mb-10 md:mb-12 h-[3px] w-full max-w-md rounded-full bg-[#EB89B5]/15 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#7A2454] via-[#EB89B5] to-[#FFD7E9]"
            style={{ width: `${easeOutCubic(clamp((p - 0.05) / 0.6)) * 100}%` }}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {impactStats.map((stat, index) => {
            const start = 0.12 + index * 0.07
            const cardP = easeOutQuint(clamp((p - start) / 0.4))

            return (
              <StatCard
                key={stat.label}
                {...stat}
                index={index}
                cardP={cardP}
                countActive={countActive}
                reducedMotion={reducedMotion}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
