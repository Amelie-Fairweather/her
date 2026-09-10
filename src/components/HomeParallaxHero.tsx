'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import ScholarshipTracker from '@/components/ScholarshipTracker'
import ImpactStats from '@/components/ImpactStats'
import FounderQuoteParallax from '@/components/FounderQuoteParallax'

export default function HomeParallaxHero() {
  const [offsetY, setOffsetY] = useState(0)
  const [isMissionVisible, setIsMissionVisible] = useState(false)
  const missionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === missionRef.current && entry.isIntersecting) {
            setIsMissionVisible(true)
          }
        })
      },
      { threshold: 0.15, rootMargin: '80px' }
    )

    const timeout = window.setTimeout(() => {
      if (missionRef.current) observer.observe(missionRef.current)
    }, 80)

    return () => {
      window.clearTimeout(timeout)
      observer.disconnect()
    }
  }, [])

  const textOpacity = Math.max(1 - offsetY / 520, 0)
  const textLift = offsetY * 0.22
  const missionParallax = isMissionVisible ? Math.max(-12, Math.min(36, (offsetY - 700) * 0.04)) : 70

  return (
    <>
      {/* One continuous backdrop for hero + impact — never parallaxed */}
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              'linear-gradient(180deg, #EB89B5 0%, #EB89B5 32%, #F0A0C4 48%, #F7C8D8 62%, #FFE8F0 78%, #FFFBF3 100%)',
          }}
        />

        <header className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center px-4 py-16 md:py-20 bg-transparent">
          <div
            className="max-w-4xl mx-auto text-center text-white will-change-transform"
            style={{
              transform: `translate3d(0, -${textLift}px, 0)`,
              opacity: textOpacity,
            }}
          >
            <div className="her-logo-container mb-6 md:mb-8">
              <Image
                src="/logo.png"
                alt="HER Logo"
                width={224}
                height={224}
                className="mx-auto w-48 h-48 md:w-56 md:h-56 rounded-xl border-[3px] border-white"
                priority
              />
            </div>
            <h2 className="text-3xl md:text-5xl font-semibold mb-3 tracking-tight">Her Education Required</h2>
            <p className="text-lg md:text-xl opacity-90 max-w-xl mx-auto">
              Global Youth Network for women&apos;s rights.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4">
              <Link
                href="/apply"
                className="inline-flex items-center justify-center min-h-[56px] px-8 py-3 rounded-none bg-white text-[#EB89B5] text-sm md:text-base font-bold tracking-[0.1em] uppercase border-2 border-white shadow-lg transition-all duration-300 hover:bg-[#7A2454] hover:text-white hover:border-[#7A2454]"
              >
                Applications are now open
              </Link>
              <a
                href="#chapters-map"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('chapters-map')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="text-sm text-white/90 underline-offset-4 hover:text-white hover:underline transition-colors"
              >
                Explore chapters around the world
              </a>
            </div>
          </div>

          <p
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-sm uppercase tracking-[0.2em] text-white/65 will-change-transform"
            style={{ opacity: textOpacity }}
          >
            Scroll
          </p>
        </header>

        <ImpactStats />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-6 bg-[#FFFBF3]">
        <div
          ref={missionRef}
          className="pt-10 md:pt-16 pb-8 md:pb-12"
          style={{
            transform: `translate3d(0, ${missionParallax}px, 0)`,
            opacity: isMissionVisible ? 1 : 0,
            transition: 'opacity 1.2s ease-out',
          }}
        >
          <div className="relative bg-[#FFD7E9] rounded-full py-10 md:py-16 px-6 md:px-16 max-w-5xl mx-auto shadow-xl border-4 border-[#EB89B5]">
            <div className="absolute -top-3 md:-top-6 left-1/2 transform -translate-x-1/2">
              <svg className="w-8 h-8 md:w-12 md:h-12 drop-shadow-md" viewBox="0 0 24 24" fill="#EB89B5">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>

            <div className="text-center pt-4 md:pt-6 pb-2 md:pb-4">
              <h3 className="text-xl md:text-3xl font-bold text-[#EB89B5] mb-4 md:mb-6">
                Empowering the Next Generation Through Complete History
              </h3>
              <p className="text-sm md:text-lg font-semibold text-[#7A2454] max-w-3xl mx-auto mb-4 md:mb-5">
                Across the world, students consistently report next to no education.
              </p>
              <p className="text-sm md:text-lg text-gray-700 max-w-3xl mx-auto mb-3 md:mb-4">
                A well-rounded education is impossible without understanding the full scope of history. Today, millions of
                students graduate without learning about the historical struggles for women&apos;s rights or the leaders
                who shaped our world.
              </p>
              <p className="text-sm md:text-lg text-gray-700 max-w-3xl mx-auto">
                This gap in knowledge leaves young girls without visible role models and leaves future voters unprepared
                to evaluate policies that impact everyone. By integrating a mandatory Women&apos;s History unit into school
                curricula, we ensure that every student—regardless of gender—builds empathy, civic awareness, and an
                appreciation for the path to equality.
              </p>
            </div>
          </div>
        </div>
      </div>

      <FounderQuoteParallax />

      <div className="relative z-20 mb-16 md:mb-20 max-w-7xl mx-auto px-4 md:px-6 bg-[#FFFBF3] pt-8 md:pt-12">
        <ScholarshipTracker />
      </div>
    </>
  )
}
