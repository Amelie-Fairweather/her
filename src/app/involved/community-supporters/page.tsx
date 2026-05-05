'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect } from 'react'

const supportersImages = [
  '/community-supporters/02.png',
  '/community-supporters/03.png',
  '/community-supporters/04.png',
  '/community-supporters/05.png',
  '/community-supporters/07.png',
  '/community-supporters/08.png',
  '/community-supporters/10.png',
  '/community-supporters/11.png',
  '/community-supporters/12.png',
]

export default function CommunitySupportersPage() {
  useEffect(() => {
    let raf = 0
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-supporter-section]'))
    const layers = Array.from(document.querySelectorAll<HTMLElement>('[data-supporter-layer]'))

    const update = () => {
      const vh = window.innerHeight || 1
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i]
        const layer = layers[i]
        if (!layer) continue

        const r = section.getBoundingClientRect()
        // progress: -1 (below) -> 0 (center) -> 1 (above)
        const raw = (r.top + r.height / 2 - vh / 2) / (vh / 2)
        const p = Math.max(-1, Math.min(1, raw))
        const a = Math.abs(p)

        // Crossfade: center section is strongest
        const opacity = Math.max(0, Math.min(1, 1 - a * 1.1))
        layer.style.opacity = String(opacity)

        // Scroll-driven parallax: layer drifts slightly opposite scroll direction
        layer.style.transform = `translate3d(0, ${p * -36}px, 0) scale(${1 - a * 0.06})`
      }
      raf = 0
    }

    const onScroll = () => {
      if (raf) return
      raf = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      if (raf) window.cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#F8C7DC]">
      <div className="fixed top-4 left-4 z-20">
        <Link
          href="/involved"
          className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur px-4 py-2 text-sm font-semibold text-[#7A2454] shadow-lg ring-1 ring-white/60 hover:bg-white transition-colors"
        >
          <span aria-hidden="true">←</span>
          Back
        </Link>
      </div>

      <div className="fixed top-4 right-4 z-20 rounded-full bg-white/70 backdrop-blur px-3 py-2 text-xs font-semibold text-[#7A2454] shadow-lg ring-1 ring-white/60">
        Scroll
      </div>

      {/* Fixed stage: images do NOT scroll down the page */}
      <div className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center px-4 py-10">
        <div className="relative w-full max-w-xl md:max-w-2xl">
          <div className="relative w-full" style={{ aspectRatio: '3 / 4' }}>
            {supportersImages.map((src, idx) => (
              <div
                key={src}
                data-supporter-layer
                className="absolute inset-0 will-change-transform"
                style={{
                  opacity: idx === 0 ? 1 : 0,
                  transform: 'translate3d(0, 0, 0) scale(1)',
                  transition: 'opacity 260ms ease-out',
                }}
              >
                <Image
                  src={src}
                  alt={`Community supporter ${idx + 1}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 900px"
                  priority={idx < 2}
                />
              </div>
            ))}
          </div>
          <div className="mt-6 text-center text-[#7A2454]/80 text-sm font-semibold tracking-tight">
            Scroll
          </div>
        </div>
      </div>

      {/* Scroll driver: the page scrolls, sections drive the stage */}
      <main className="relative z-10 mx-auto max-w-5xl px-4">
        <section className="min-h-screen flex items-center justify-center">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-[#7A2454] tracking-tight">
              Our Sponsors
            </h1>
            <p className="mt-4 text-base md:text-lg text-[#7A2454]/80">
              Scroll to meet adults in Vermont&apos;s community who have supported us.
            </p>
          </div>
        </section>
        {supportersImages.map((src) => (
          <section key={src} data-supporter-section className="h-[120vh] md:h-[125vh]" />
        ))}
        <div className="h-[30vh]" />
      </main>
    </div>
  )
}

