'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import ScholarshipTracker from '@/components/ScholarshipTracker'

const stats = [
  {
    value: '85%',
    text: "of students grades 9-12 did not know what the suffrage movement was, Title 7 or 8 or ERA, pay and gender gap, or what year women gained the right to vote.",
  },
  {
    value: '90%',
    text: "of students grades 9-12 said they had received no education around women's rights from school.",
  },
  {
    value: '81%',
    text: 'of students grades 9-12 reported they had experienced sexism.',
  },
]

export default function HomeParallaxHero() {
  const [offsetY, setOffsetY] = useState(0)
  const [isStatsVisible, setIsStatsVisible] = useState(false)
  const [isMissionVisible, setIsMissionVisible] = useState(false)
  const statsRef = useRef<HTMLDivElement>(null)
  const missionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === statsRef.current && entry.isIntersecting) {
            setIsStatsVisible(true)
          }
          if (entry.target === missionRef.current && entry.isIntersecting) {
            setIsMissionVisible(true)
          }
        })
      },
      { threshold: 0.1, rootMargin: '100px' }
    )

    const timeout = window.setTimeout(() => {
      if (statsRef.current) {
        observer.observe(statsRef.current)
        const rect = statsRef.current.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setIsStatsVisible(true)
        }
      }
      if (missionRef.current) {
        observer.observe(missionRef.current)
        const rect = missionRef.current.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setIsMissionVisible(true)
        }
      }
    }, 100)

    return () => {
      window.clearTimeout(timeout)
      if (statsRef.current) observer.unobserve(statsRef.current)
      if (missionRef.current) observer.unobserve(missionRef.current)
    }
  }, [])

  return (
    <>
      <header
        className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center bg-[#EB89B5] text-white px-4 py-12"
        style={{
          transform: `translateY(-${offsetY * 0.3}px)`,
          opacity: Math.max(1 - offsetY / 600, 0),
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
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
          <h2 className="text-3xl md:text-4xl font-semibold mb-3">Her Education Required</h2>
          <p className="text-lg md:text-xl opacity-90 max-w-xl mx-auto">
            National Youth Network for women&apos;s rights.
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
              className="text-sm text-white/80 underline-offset-4 hover:text-white hover:underline transition-colors"
            >
              Explore chapters across the nation
            </a>
          </div>
        </div>
        <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-sm uppercase tracking-[0.2em] text-white/70">
          Scroll
        </p>
      </header>

      <div className="relative z-20 mb-16 max-w-7xl mx-auto px-4 md:px-0 bg-gradient-to-br from-[#FFFBF3] to-[#FFF8D2]">
        <div
          ref={statsRef}
          className="grid grid-cols-1 md:grid-cols-3 justify-center pt-12 md:pt-16 mb-12 max-w-6xl mx-auto gap-4 md:gap-6"
          style={{
            transform: `translateY(${isStatsVisible ? Math.max(0, Math.min(30, (offsetY - 500) * 0.05)) : 60}px)`,
            opacity: isStatsVisible ? 1 : 0,
            transition: 'opacity 1s ease-out, transform 1s ease-out',
          }}
        >
          {stats.map((stat) => (
            <div key={stat.value} className="w-full">
              <div className="bg-white rounded-2xl p-4 md:p-8 shadow-lg shadow-[#EB89B5]/20 transform hover:scale-110 transition-transform duration-300 h-[200px] md:h-[240px] flex items-center">
                <div className="text-center w-full">
                  <div className="text-2xl md:text-4xl font-bold text-[#EB89B5] mb-2 md:mb-3">
                    {stat.value}
                  </div>
                  <p className="text-xs md:text-sm text-gray-700 font-semibold px-1 md:px-4 leading-tight">
                    {stat.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          ref={missionRef}
          style={{
            transform: `translateY(${isMissionVisible ? Math.max(0, Math.min(30, (offsetY - 900) * 0.05)) : 60}px)`,
            opacity: isMissionVisible ? 1 : 0,
            transition: 'opacity 1.2s ease-out, transform 1.2s ease-out',
          }}
        >
          <div className="relative bg-[#FFD7E9] rounded-full py-8 md:py-16 px-6 md:px-16 max-w-5xl mx-auto shadow-xl border-4 border-[#EB89B5]">
            <div className="absolute -top-3 md:-top-6 left-1/2 transform -translate-x-1/2">
              <svg className="w-8 h-8 md:w-12 md:h-12 drop-shadow-md" viewBox="0 0 24 24" fill="#EB89B5">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>

            <div className="text-center pt-4 md:pt-6 pb-2 md:pb-4">
              <h3 className="text-xl md:text-3xl font-bold text-[#EB89B5] mb-4 md:mb-6">
                Support our mission to implement a required unit into the curriculum
              </h3>
              <p className="text-sm md:text-lg text-gray-700 max-w-3xl mx-auto mb-3 md:mb-4">
                A required unit is absolutely essential to ensuring students have a well-rounded understanding of
                American history. Today, students have no idea the struggle women faced and the work needed to overcome
                them. Lack of role models for young girls, lack of representation, and lack of knowledge limits the
                inclusion and success of your daughters, mothers, sisters, etc. Furthermore, men lack this education
                too. How can students vote on new policies surrounding women&apos;s rights without basic understanding
                of them?
              </p>
            </div>
          </div>

          <ScholarshipTracker />
        </div>
      </div>
    </>
  )
}
