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
  const [drift, setDrift] = useState(0)
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
      // Fire while the section is still mostly below the fold
      const raw = (vh * 1.65 - rect.top) / (vh * 0.7)
      setProgress(clamp(raw))

      // Continuous parallax: how far section center is from viewport center
      const mid = rect.top + rect.height / 2
      setDrift(clamp((vh * 0.5 - mid) / vh, -1, 1))
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
  const d = reducedMotion ? 0 : drift

  const enter = easeOutCubic(clamp(p / 0.16))
  const deepen = easeOutCubic(clamp((p - 0.08) / 0.45))
  const quoteIn = easeOutCubic(clamp(p / 0.18))
  const labelIn = easeOutCubic(clamp(p / 0.12))
  const attribIn = easeOutCubic(clamp((p - 0.02) / 0.18))

  // Entrance + ongoing layered drift (photo slower, quote faster)
  const photoY = (1 - enter) * 36 - deepen * 18 + d * 36
  const photoX = d * -14
  const photoScale = 0.94 + enter * 0.06 + deepen * 0.02
  const photoRotate = (1 - enter) * -1.5 + d * 2

  const quoteY = (1 - quoteIn) * 28 - deepen * 12 + d * 56
  const quoteX = (1 - quoteIn) * 14 + d * 18

  const orbDrift = (1 - deepen) * 40 + d * 30
  const bgShift = deepen * 10 + d * 8

  return (
    <section
      ref={sectionRef}
      className="relative z-20 overflow-hidden bg-[#FFFBF3] py-16 md:py-24 pb-16 md:pb-24"
      aria-label="Founder quote"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 will-change-transform"
        style={{
          background: `linear-gradient(180deg, #FFFBF3 0%, #FFE8F0 ${40 + bgShift}%, #FFD7E9 ${58 + bgShift * 0.6}%, #FFFBF3 100%)`,
          opacity: 0.88 + deepen * 0.1,
          transform: `translate3d(0, ${d * -24}px, 0) scale(${1.04 + Math.abs(d) * 0.02})`,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-[#EB89B5]/25 blur-3xl will-change-transform"
        style={{ transform: `translate3d(${-orbDrift}px, ${orbDrift * 0.4 + d * 20}px, 0)` }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 bottom-1/5 h-80 w-80 rounded-full bg-[#7A2454]/10 blur-3xl will-change-transform"
        style={{ transform: `translate3d(${orbDrift}px, ${-orbDrift * 0.3 + d * -16}px, 0)` }}
      />

      <div className="relative w-full max-w-6xl mx-auto px-5 md:px-10">
        <p
          className="text-center text-[11px] md:text-xs font-bold uppercase tracking-[0.34em] text-[#EB89B5] mb-8 md:mb-10 will-change-transform"
          style={{
            opacity: Math.max(labelIn, 0.45),
            transform: `translate3d(0, ${(1 - labelIn) * 16 + d * 16}px, 0)`,
          }}
        >
          From the founder
        </p>

        <div className="flex flex-col md:flex-row items-center md:items-center gap-10 md:gap-14 lg:gap-16">
          <div
            className="relative h-52 w-52 sm:h-60 sm:w-60 md:h-72 md:w-72 lg:h-80 lg:w-80 shrink-0 will-change-transform"
            style={{
              opacity: Math.max(enter, 0.5),
              transform: `translate3d(${photoX}px, ${photoY}px, 0) scale(${photoScale}) rotate(${photoRotate}deg)`,
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
              opacity: Math.max(quoteIn, 0.4),
              transform: `translate3d(${quoteX}px, ${quoteY}px, 0)`,
            }}
          >
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-[2.15rem] text-[#7A2454] leading-[1.45] italic font-medium">
              &ldquo;I wish I had learned about women&apos;s history in school. I founded Her Education Required
              because most of all, students deserve this education, and this education deserves being required.
              Women&apos;s history is American history, it is human history, and it is our history.&rdquo;
            </p>
            <footer
              className="mt-6 md:mt-8 text-sm md:text-lg font-bold text-[#EB89B5] not-italic tracking-[0.04em] will-change-transform"
              style={{
                opacity: Math.max(attribIn, 0.35),
                transform: `translate3d(0, ${(1 - attribIn) * 12 + d * 24}px, 0)`,
              }}
            >
              — Amelie Fairweather, Founder &amp; President
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  )
}
