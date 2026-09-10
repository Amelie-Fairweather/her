'use client'

import Image from 'next/image'

const SLIDES = [
  { src: '/community-booth.jpg', alt: 'HER students at a club outreach table' },
  { src: '/community-photo-booth.jpg', alt: 'HER students with a photo booth frame' },
  { src: '/steve-stecklow-ama.png', alt: 'HER AMA with Steve Stecklow and student chapters' },
  { src: '/rubina-ama-screenshot.png', alt: 'HER AMA with Rubina Fillion of The New York Times' },
  { src: '/community-her-cam-1.png', alt: 'HER students posing in a H.E.R. CAM photo frame' },
  { src: '/community-her-cam-2.png', alt: 'HER chapter students with H.E.R. CAM frame' },
  { src: '/community-classroom.png', alt: 'HER students together in a classroom' },
  { src: '/17.JPG', alt: 'HER students speaking on a panel' },
  { src: '/scholarship-group-icecream.png', alt: 'HER students together' },
  { src: '/scholarship-group-sunset.png', alt: 'HER students at sunset' },
  { src: '/get-involved-top-group.jpg', alt: 'HER group gathering' },
  { src: '/event1.JPG', alt: 'HER event' },
  { src: '/county-09-applause.jpg', alt: 'HER audience applause' },
  { src: '/11.JPG', alt: 'HER students' },
  { src: '/inclub.jpeg', alt: 'HER club meeting' },
  { src: '/event6.jpg', alt: 'HER community event' },
  { src: '/sbhs-group-extra.png', alt: 'HER chapter students' },
  { src: '/14.JPG', alt: 'HER students together' },
]

export default function CommunitySlideshow() {
  const loop = [...SLIDES, ...SLIDES]

  return (
    <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] my-16 md:my-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFFBF3] via-[#FFD7E9]/25 to-[#FFFBF3]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#EB89B5]/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#EB89B5]/40 to-transparent" />

      <div className="relative max-w-6xl mx-auto px-6 pt-14 md:pt-20 pb-8 md:pb-10 text-center">
        <p className="text-[11px] md:text-xs font-bold uppercase tracking-[0.32em] text-[#EB89B5] mb-4">
          Our community
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#7A2454] tracking-tight leading-[1.1]">
          Youth leaders around the world
        </h2>
        <p className="mt-4 md:mt-5 text-sm md:text-base text-[#7A2454]/70 max-w-2xl mx-auto leading-relaxed">
          A living network of students building chapters, hosting events, and advocating for women&apos;s history in schools everywhere.
        </p>
      </div>

      <div className="relative py-6 md:py-10">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 md:w-40 bg-gradient-to-r from-[#FFFBF3] via-[#FFFBF3]/80 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 md:w-40 bg-gradient-to-l from-[#FFFBF3] via-[#FFFBF3]/80 to-transparent" />

        <div className="flex w-max animate-her-marquee gap-5 md:gap-7 hover:[animation-play-state:paused] px-4">
          {loop.map((slide, i) => (
            <figure
              key={`${slide.src}-${i}`}
              className="group relative h-64 w-[18rem] sm:h-80 sm:w-[24rem] md:h-[26rem] md:w-[32rem] shrink-0 overflow-hidden rounded-[1.35rem] bg-[#FFD7E9] shadow-[0_20px_50px_-28px_rgba(122,36,84,0.45)] ring-1 ring-[#EB89B5]/25 transition-transform duration-700 ease-out hover:-translate-y-1.5"
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes="(max-width: 640px) 288px, (max-width: 768px) 384px, 512px"
                className="object-cover object-center transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#7A2454]/35 via-transparent to-transparent opacity-70" />
            </figure>
          ))}
        </div>
      </div>

      <p className="relative text-center text-[11px] md:text-xs uppercase tracking-[0.2em] text-[#7A2454]/45 pb-12 md:pb-16">
        Hover to pause
      </p>
    </section>
  )
}
