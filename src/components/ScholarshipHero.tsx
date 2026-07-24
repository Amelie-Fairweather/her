'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const SLIDES = [
  { src: '/17.JPG', alt: 'HER students speaking on a panel' },
  { src: '/scholarship-group-icecream.png', alt: 'HER students together enjoying ice cream' },
  { src: '/scholarship-group-sunset.png', alt: 'HER students posing at sunset' },
  { src: '/14.JPG', alt: 'HER students together' },
  { src: '/get-involved-top-group.jpg', alt: 'HER group gathering' },
  { src: '/county-06-group.jpg', alt: 'HER community group photo' },
  { src: '/event1.JPG', alt: 'HER event' },
  { src: '/county-09-applause.jpg', alt: 'HER audience applause' },
  { src: '/11.JPG', alt: 'HER students' },
  { src: '/inclub.jpeg', alt: 'HER club meeting' },
  { src: '/event6.jpg', alt: 'HER community event' },
  { src: '/sbhs-group-extra.png', alt: 'HER chapter students' },
]

const SLIDE_MS = 5500

export default function ScholarshipHero() {
  const [index, setIndex] = useState(0)
  const [offsetY, setOffsetY] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % SLIDES.length)
    }, SLIDE_MS)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    const onScroll = () => setOffsetY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="relative isolate w-full overflow-hidden bg-[#FFD7E9]">
      <div className="relative aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] w-full max-h-[78vh]">
        <div
          className="absolute inset-0 will-change-transform"
          style={{ transform: `translate3d(0, ${offsetY * 0.22}px, 0) scale(1.06)` }}
        >
          {SLIDES.map((slide, i) => (
            <div
              key={slide.src}
              className="absolute inset-0 transition-opacity duration-[1800ms] ease-in-out"
              style={{ opacity: i === index ? 1 : 0 }}
              aria-hidden={i !== index}
            >
              {/* Soft fill so the frame stays full without cropping the photo */}
              <Image
                src={slide.src}
                alt=""
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover object-center scale-110 blur-xl opacity-70"
              />
              {/* Full photo visible */}
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-contain object-center"
              />
            </div>
          ))}
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-[#EB89B5]/50 via-[#EB89B5]/15 to-[#FFFBF3]/85 pointer-events-none" />

        <header className="absolute inset-0 z-10 flex flex-col justify-end md:justify-center px-4 pb-12 md:pb-0 pt-6">
          <div className="max-w-4xl mx-auto w-full">
            <Link
              href="/"
              className="inline-block mb-4 rounded-md bg-white/90 px-3 py-1.5 text-sm font-semibold text-[#7A2454] shadow-sm backdrop-blur-sm transition-colors hover:bg-white"
            >
              ← Back to Home
            </Link>

            <div className="rounded-2xl bg-white/90 backdrop-blur-md shadow-[0_12px_40px_rgba(122,36,84,0.18)] border border-white/80 px-5 py-6 md:px-8 md:py-8">
              <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.18em] text-[#EB89B5] mb-2">
                HER Education Required
              </p>
              <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#7A2454] mb-2 leading-tight">
                Scholarship Fund
              </h1>
              <p className="text-base md:text-lg text-gray-700 max-w-2xl">
                Need-based scholarships for high school girls in the HER network
              </p>
            </div>
          </div>
        </header>

        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {SLIDES.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              aria-label={`Show slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all duration-500 ${
                i === index ? 'w-6 bg-white shadow' : 'w-2 bg-white/60 hover:bg-white/85'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
