'use client'

import { useEffect, useRef, useState } from 'react'

type StudentQuote = {
  quote: string
  name: string
  place: string
  rotate: string
  delay: string
  /** Desktop column nudge */
  nudge: 'left' | 'right' | 'center'
}

const QUOTES: StudentQuote[] = [
  {
    quote:
      "I'm tired of how we aren't taught about women in history… and how we only learn about men.",
    name: 'Juliet Hughes',
    place: 'Texas',
    rotate: '-2.5deg',
    delay: '0s',
    nudge: 'left',
  },
  {
    quote:
      "There is no women's history class at my school, and our history classes do not cover the subject.",
    name: 'Jacey Josey',
    place: 'Vermont',
    rotate: '2.2deg',
    delay: '0.08s',
    nudge: 'right',
  },
  {
    quote:
      "So much of female history is left out of the high school classrooms — and that's really disappointing.",
    name: 'Elle Harrington',
    place: 'California',
    rotate: '1.6deg',
    delay: '0.16s',
    nudge: 'center',
  },
  {
    quote:
      'Even at a progressive school, we often do not get taught in-depth lessons about women\'s history.',
    name: 'Amelia Mundy',
    place: 'New York',
    rotate: '-1.8deg',
    delay: '0.05s',
    nudge: 'right',
  },
  {
    quote:
      'Ever since I was younger I wondered why we rarely cover women in all my years of education.',
    name: 'Isabel Dee',
    place: 'Connecticut',
    rotate: '2.4deg',
    delay: '0.12s',
    nudge: 'left',
  },
  {
    quote:
      "I've witnessed firsthand the lack of representation women's history receives in the classroom.",
    name: 'Alaia Jeannin',
    place: 'Florida',
    rotate: '-1.4deg',
    delay: '0.2s',
    nudge: 'right',
  },
  {
    quote:
      "At my school we barely speak about women's history and don't even celebrate Women's History Month.",
    name: 'Brooklynn Whaley',
    place: 'Michigan',
    rotate: '-2.2deg',
    delay: '0.1s',
    nudge: 'left',
  },
  {
    quote:
      'So many women are left out or not given credit. No one knows the whole history without them.',
    name: 'Lily Walker',
    place: 'Maryland',
    rotate: '2deg',
    delay: '0.18s',
    nudge: 'right',
  },
  {
    quote:
      "Women are not given as much credit for what they do. I want to help include women's history and spread awareness in my country.",
    name: 'Naisha Nayyar',
    place: 'Singapore',
    rotate: '1.2deg',
    delay: '0.14s',
    nudge: 'left',
  },
  {
    quote:
      "I constantly notice the sexism around me — this is a chance to bring girls at my school an education on women's history.",
    name: 'Amelia Sharp',
    place: 'Oregon',
    rotate: '-2.6deg',
    delay: '0.22s',
    nudge: 'right',
  },
  {
    quote:
      'Through education I can change my reality — the dream of many girls like me. But so many are denied their future.',
    name: 'Lara Pedrosa',
    place: 'Brazil',
    rotate: '1.8deg',
    delay: '0.16s',
    nudge: 'center',
  },
]

function QuoteCard({
  item,
  visible,
  index,
}: {
  item: StudentQuote
  visible: boolean
  index: number
}) {
  const nudgeClass =
    item.nudge === 'left'
      ? 'md:justify-self-start md:ml-0 md:mr-auto'
      : item.nudge === 'right'
        ? 'md:justify-self-end md:ml-auto md:mr-0 md:mt-10'
        : 'md:justify-self-center md:mx-auto'

  const colClass = index % 2 === 0 ? 'md:col-start-1' : 'md:col-start-2'

  return (
    <figure
      className={`group max-w-md w-full ${colClass} ${nudgeClass} relative hover:z-30`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? `rotate(${item.rotate})`
          : `rotate(${item.rotate}) translateY(18px)`,
        transition: `opacity 0.75s ease ${item.delay}, transform 0.75s ease ${item.delay}`,
      }}
    >
      <div
        className="student-voice-bubble will-change-transform cursor-default transition-transform duration-300 ease-out group-hover:scale-[1.07]"
        style={{ animationDelay: item.delay }}
      >
        <blockquote className="text-[#7A2454] text-[1.15rem] md:text-[1.3rem] leading-snug italic font-medium">
          &ldquo;{item.quote}&rdquo;
        </blockquote>
        <figcaption className="mt-3 not-italic">
          <span className="block text-base font-bold text-[#EB89B5] tracking-[0.02em]">
            {item.name}
          </span>
          <span className="block text-sm font-semibold uppercase tracking-[0.16em] text-[#7A2454]/55 mt-0.5">
            {item.place}
          </span>
        </figcaption>
      </div>
    </figure>
  )
}

function PinkStar({
  size = 14,
  delay = '0s',
  opacity = 0.7,
  top,
  left,
  right,
}: {
  size?: number
  delay?: string
  opacity?: number
  top: string
  left?: string
  right?: string
}) {
  return (
    <svg
      aria-hidden
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className="pointer-events-none absolute text-[#EB89B5] student-voice-star"
      style={{ top, left, right, opacity, animationDelay: delay }}
      fill="currentColor"
    >
      <path d="M12 1.6l2.35 7.05H22l-6.1 4.35 2.4 7.1L12 16.05 5.7 20.1l2.4-7.1L2 8.65h7.65L12 1.6z" />
    </svg>
  )
}

const STARS: {
  top: string
  left?: string
  right?: string
  size: number
  delay: string
  opacity: number
}[] = [
  { top: '6%', left: '4%', size: 18, delay: '0s', opacity: 0.55 },
  { top: '10%', right: '8%', size: 22, delay: '0.6s', opacity: 0.7 },
  { top: '18%', left: '48%', size: 15, delay: '1.2s', opacity: 0.45 },
  { top: '28%', left: '8%', size: 20, delay: '0.3s', opacity: 0.6 },
  { top: '32%', right: '4%', size: 16, delay: '1.5s', opacity: 0.5 },
  { top: '42%', left: '42%', size: 19, delay: '0.9s', opacity: 0.55 },
  { top: '48%', right: '14%', size: 14, delay: '1.8s', opacity: 0.4 },
  { top: '58%', left: '3%', size: 21, delay: '0.4s', opacity: 0.65 },
  { top: '62%', right: '6%', size: 17, delay: '1.1s', opacity: 0.5 },
  { top: '72%', left: '38%', size: 15, delay: '0.7s', opacity: 0.45 },
  { top: '78%', left: '12%', size: 19, delay: '1.4s', opacity: 0.6 },
  { top: '82%', right: '18%', size: 16, delay: '0.2s', opacity: 0.5 },
  { top: '90%', left: '55%', size: 20, delay: '1s', opacity: 0.55 },
  { top: '14%', left: '22%', size: 13, delay: '1.7s', opacity: 0.4 },
  { top: '54%', left: '55%', size: 14, delay: '0.5s', opacity: 0.45 },
]

export default function StudentVoicesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
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
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.12, rootMargin: '40px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative z-20 overflow-hidden bg-[#FFFBF3] pt-14 md:pt-20 pb-10 md:pb-14"
      aria-label="What students have said around the world"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 40%, #FFE8F0 0%, transparent 70%), linear-gradient(180deg, #FFFBF3 0%, #FFF5F8 45%, #FFFBF3 100%)',
        }}
      />

      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {STARS.map((star, i) => (
          <PinkStar
            key={i}
            top={star.top}
            left={star.left}
            right={star.right}
            size={star.size}
            delay={star.delay}
            opacity={star.opacity}
          />
        ))}
      </div>

      <div className="relative max-w-6xl mx-auto px-5 md:px-10">
        <header
          className="text-center mb-12 md:mb-16"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(18px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          <p className="text-[11px] md:text-xs font-bold uppercase tracking-[0.34em] text-[#EB89B5] mb-5 md:mb-6">
            Student voices
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#7A2454] leading-snug max-w-2xl mx-auto">
            What students have said around the world
          </h2>
        </header>

        {/* Desktop: staggered two-column float (no overlap) */}
        <div
          className={`hidden md:grid grid-cols-2 gap-x-10 lg:gap-x-16 gap-y-14 lg:gap-y-16 ${
            reducedMotion ? '' : 'student-voices-float'
          }`}
        >
          {QUOTES.map((item, i) => (
            <QuoteCard key={item.name} item={item} visible={visible} index={i} />
          ))}
        </div>

        {/* Mobile: staggered stack */}
        <ul className="md:hidden space-y-8">
          {QUOTES.map((item, i) => {
            const offset = i % 2 === 0 ? 'ml-0 mr-3 -rotate-1' : 'ml-3 mr-0 rotate-1'
            return (
              <li
                key={item.name}
                className={`${offset} transition-all duration-300 ease-out hover:scale-[1.05]`}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? undefined : `translateY(${16 + (i % 3) * 6}px)`,
                  transitionDelay: visible ? undefined : `${i * 0.07}s`,
                }}
              >
                <blockquote className="text-[#7A2454] text-[1.15rem] leading-snug italic font-medium">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <p className="mt-2.5 text-base font-bold text-[#EB89B5]">{item.name}</p>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7A2454]/55">
                  {item.place}
                </p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
