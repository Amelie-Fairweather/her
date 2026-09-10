'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

function clamp(n: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, n))
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

export default function FounderQuoteParallax() {
  const sectionRef = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)
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
      const total = Math.max(1, rect.height - window.innerHeight)
      const scrolled = clamp(-rect.top / total)
      setProgress(scrolled)
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

  const p = reducedMotion ? 0.85 : progress
  const enter = easeOutCubic(clamp(p / 0.28))
  const deepen = easeOutCubic(clamp((p - 0.15) / 0.45))
  const hold = easeOutCubic(clamp((p - 0.55) / 0.35))

  const photoY = (1 - enter) * 90 - deepen * 28
  const photoScale = 0.82 + enter * 0.18 + deepen * 0.04
  const photoRotate = (1 - enter) * -4 + deepen * 1.5

  const quoteY = (1 - easeOutCubic(clamp((p - 0.08) / 0.35))) * 110 - deepen * 18
  const quoteOpacity = easeOutCubic(clamp((p - 0.05) / 0.3))
  const quoteX = (1 - quoteOpacity) * 36

  const labelOpacity = easeOutCubic(clamp((p - 0.02) / 0.25))
  const orbDrift = (1 - deepen) * 50
  const bgShift = p * 40

  return (
    <section
      ref={sectionRef}
      className="relative z-20 h-[165vh] md:h-[175vh] bg-[#FFFBF3]"
      aria-label="Founder quote"
    >
      <div className="sticky top-0 h-[100dvh] overflow-hidden flex items-center">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: `linear-gradient(180deg, #FFFBF3 0%, #FFE8F0 ${30 + bgShift * 0.2}%, #FFD7E9 ${55 + bgShift * 0.15}%, #FFFBF3 100%)`,
            opacity: 0.85 + hold * 0.15,
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 top-1/4 h-80 w-80 rounded-full bg-[#EB89B5]/25 blur-3xl"
          style={{ transform: `translate3d(${-orbDrift}px, ${orbDrift * 0.35}px, 0)` }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 bottom-1/5 h-96 w-96 rounded-full bg-[#7A2454]/10 blur-3xl"
          style={{ transform: `translate3d(${orbDrift}px, ${-orbDrift * 0.25}px, 0)` }}
        />

        <div className="relative w-full max-w-6xl mx-auto px-5 md:px-10">
          <p
            className="text-center text-[11px] md:text-xs font-bold uppercase tracking-[0.34em] text-[#EB89B5] mb-8 md:mb-12 will-change-transform"
            style={{
              opacity: Math.max(labelOpacity, 0.15),
              transform: `translate3d(0, ${(1 - labelOpacity) * 24}px, 0)`,
            }}
          >
            From the founder
          </p>

          <div className="flex flex-col md:flex-row items-center md:items-center gap-10 md:gap-14 lg:gap-16">
            <div
              className="relative h-52 w-52 sm:h-60 sm:w-60 md:h-72 md:w-72 lg:h-80 lg:w-80 shrink-0 will-change-transform"
              style={{
                opacity: Math.max(enter, 0.2),
                transform: `translate3d(0, ${photoY}px, 0) scale(${photoScale}) rotate(${photoRotate}deg)`,
              }}
            >
              <div className="absolute inset-0 rounded-full bg-[#EB89B5]/30 blur-xl scale-110" />
              <div className="relative h-full w-full overflow-hidden rounded-full border-[5px] border-white shadow-[0_28px_60px_-20px_rgba(122,36,84,0.55)] ring-4 ring-[#EB89B5]/35">
                <Image
                  src="/amelie-fairweather.jpg"
                  alt="Amelie Fairweather, Founder & President of HER"
                  fill
                  className="object-cover object-[center_20%]"
                  sizes="(max-width: 768px) 240px, 320px"
                  priority
                />
              </div>
            </div>

            <blockquote
              className="flex-1 text-center md:text-left will-change-transform"
              style={{
                opacity: Math.max(quoteOpacity, 0.12),
                transform: `translate3d(${quoteX}px, ${quoteY}px, 0)`,
              }}
            >
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-[2.15rem] text-[#7A2454] leading-[1.45] italic font-medium">
                &ldquo;I wish I had learned about women&apos;s history in school. I founded this club because most of
                all, students deserve this education, and this education deserves being required. Women&apos;s history
                is American history, it is human history, and it is our history.&rdquo;
              </p>
              <footer
                className="mt-6 md:mt-8 text-sm md:text-lg font-bold text-[#EB89B5] not-italic tracking-[0.04em]"
                style={{
                  opacity: easeOutCubic(clamp((p - 0.22) / 0.3)),
                  transform: `translate3d(0, ${(1 - easeOutCubic(clamp((p - 0.22) / 0.3))) * 16}px, 0)`,
                }}
              >
                — Amelie Fairweather, Founder &amp; President
              </footer>
            </blockquote>
          </div>

          <div className="mx-auto mt-12 md:mt-16 h-[3px] w-full max-w-xs rounded-full bg-[#EB89B5]/15 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#7A2454] via-[#EB89B5] to-[#FFD7E9]"
              style={{ width: `${easeOutCubic(clamp(p / 0.9)) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
