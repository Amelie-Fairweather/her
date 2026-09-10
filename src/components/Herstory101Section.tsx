'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

export default function Herstory101Section() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    suggestion: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

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

    if (reducedMotion) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [reducedMotion])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const emailContent = `
HERstory 101 Suggestion

Name: ${formData.name || 'Anonymous'}
Email: ${formData.email || 'Not provided'}

Suggested woman / topic:
${formData.suggestion}

Submitted at: ${new Date().toLocaleString()}
      `.trim()

      window.location.href = `mailto:hereducationrequired@gmail.com?subject=${encodeURIComponent(
        `HERstory 101 Suggestion${formData.name ? ` — ${formData.name}` : ''}`
      )}&body=${encodeURIComponent(emailContent)}`

      setSubmitStatus('success')
      setTimeout(() => {
        setFormData({ name: '', email: '', suggestion: '' })
        setIsSubmitting(false)
        setSubmitStatus('idle')
      }, 2500)
    } catch {
      setSubmitStatus('error')
      setIsSubmitting(false)
    }
  }

  const reveal = (delayMs = 0) =>
    reducedMotion
      ? undefined
      : {
          opacity: visible ? 1 : 0,
          transform: visible ? 'translate3d(0,0,0)' : 'translate3d(0,28px,0)',
          transition: `opacity 700ms cubic-bezier(0.22,1,0.36,1) ${delayMs}ms, transform 700ms cubic-bezier(0.22,1,0.36,1) ${delayMs}ms`,
        }

  return (
    <section ref={sectionRef} className="mt-20 md:mt-28 mb-12 md:mb-16">
      <div
        className="group/herstory relative overflow-hidden rounded-[1.75rem] border border-[#EB89B5]/20 bg-white shadow-[0_24px_60px_-28px_rgba(122,36,84,0.45)] transition-[box-shadow,transform] duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_32px_70px_-24px_rgba(122,36,84,0.55)]"
        style={reveal(0)}
      >
        <div className="her-sheen pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-[1.75rem]" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:min-h-[32rem]">
          {/* Text + suggestion */}
          <div className="relative flex flex-col justify-center overflow-hidden bg-gradient-to-br from-[#7A2454] via-[#9B3A6E] to-[#EB89B5] px-8 py-12 md:px-14 md:py-16 lg:px-16 lg:py-20 text-white order-2 lg:order-1">
            <div className="her-glow-orb pointer-events-none absolute -top-16 -right-10 h-44 w-44 rounded-full bg-white/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-10 h-52 w-52 rounded-full bg-[#FFD7E9]/20 blur-3xl" />

            <p
              className="relative text-[11px] md:text-xs font-bold uppercase tracking-[0.32em] text-white/80 mb-5 md:mb-6"
              style={reveal(80)}
            >
              Instagram series
            </p>
            <h2
              className="relative text-3xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-6 md:mb-8"
              style={reveal(140)}
            >
              HERstory 101
            </h2>
            <p
              className="relative text-sm md:text-base text-white/95 leading-relaxed mb-5 md:mb-6 max-w-lg"
              style={reveal(200)}
            >
              Every week, student leaders across our global network research, write, and film short educational
              reels spotlighting women whose stories are too often left out of the classroom — then share them with
              the world on Instagram.
            </p>
            <p
              className="relative text-sm md:text-base text-white/95 leading-relaxed mb-8 md:mb-10 max-w-lg"
              style={reveal(260)}
            >
              From suffrage pioneers to scientists, artists, and activists, HERstory 101 turns chapter learning into
              viral education. The series has already reached{' '}
              <span className="font-bold text-white">10,000+ views</span>, bringing women&apos;s history to feeds far
              beyond any single school.
            </p>
            <div className="relative flex flex-wrap gap-2.5 md:gap-3 mb-8 md:mb-10" style={reveal(320)}>
              <span className="inline-flex items-center rounded-full border border-white/40 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20 hover:border-white/70">
                Weekly reels
              </span>
              <span className="inline-flex items-center rounded-full border border-white/40 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20 hover:border-white/70">
                10k+ views
              </span>
              <a
                href="https://www.instagram.com/hereducationrequired/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-white/40 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.03] hover:bg-white hover:text-[#7A2454] hover:border-white"
              >
                @hereducationrequired
              </a>
            </div>

            {/* Suggestion — inside same panel */}
            <div
              className="relative max-w-lg rounded-xl border border-white/25 bg-black/15 backdrop-blur-[2px] px-3 py-3 md:px-3.5 md:py-3.5"
              style={reveal(380)}
            >
              <div className="mb-2">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/70 mb-0.5">
                  Help shape the series
                </p>
                <h3 className="text-xs font-bold text-white leading-tight">
                  Submit a HERstory suggestion
                </h3>
                <p className="text-[10px] text-white/80 mt-1 leading-snug">
                  Know a woman whose story deserves the spotlight? Send her name or topic —{' '}
                  <span className="font-semibold text-white">hereducationrequired@gmail.com</span>
                </p>
              </div>

              {submitStatus === 'success' && (
                <div className="mb-2 rounded-md bg-white/15 border border-white/25 text-white px-2 py-1 text-[10px]">
                  Email opened — hit send to finish.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="mb-2 rounded-md bg-black/25 border border-white/25 text-white px-2 py-1 text-[10px]">
                  Something went wrong. Email hereducationrequired@gmail.com.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-1.5">
                <div className="grid grid-cols-2 gap-1.5">
                  <input
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full px-2 py-1.5 rounded-md bg-white/95 border border-white/30 text-[11px] text-[#7A2454] placeholder:text-[#7A2454]/45 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/80"
                  />
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email (optional)"
                    className="w-full px-2 py-1.5 rounded-md bg-white/95 border border-white/30 text-[11px] text-[#7A2454] placeholder:text-[#7A2454]/45 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/80"
                  />
                </div>
                <input
                  name="suggestion"
                  type="text"
                  required
                  value={formData.suggestion}
                  onChange={handleChange}
                  placeholder="Woman or topic to feature…"
                  className="w-full px-2 py-1.5 rounded-md bg-white/95 border border-white/30 text-[11px] text-[#7A2454] placeholder:text-[#7A2454]/45 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/80"
                />
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.suggestion.trim()}
                  className="w-full min-h-[28px] rounded-md bg-white text-[#7A2454] font-bold tracking-wide uppercase text-[10px] transition-all duration-300 hover:bg-[#FFD7E9] hover:scale-[1.01] active:scale-[0.98] disabled:bg-white/40 disabled:text-white/70 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? 'Opening…' : 'Submit'}
                </button>
              </form>
            </div>
          </div>

          {/* Image side */}
          <div className="group/image relative min-h-[24rem] md:min-h-[28rem] lg:min-h-full order-1 lg:order-2 overflow-hidden bg-[#FFB6D0]">
            <Image
              src="/herstory-101.png"
              alt="HERstory 101 instructors — Amelia Sharp, Skylar Dixon, Jacey Josey, Riley Gordon, Lila Palochek, and Aiofe Garvin"
              fill
              className="object-contain object-center transition-transform duration-[1.2s] ease-out group-hover/image:scale-[1.035] group-hover/herstory:scale-[1.02]"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#7A2454]/15 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover/image:opacity-100" />
          </div>
        </div>
      </div>
    </section>
  )
}
