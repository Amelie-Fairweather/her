import Image from 'next/image'
import Link from 'next/link'
import HistoryByHerForm from '@/components/HistoryByHerForm'

const GAINS = [
  {
    title: 'National recognition',
    detail:
      'Be featured as an official History by HER volunteer on this website and on Instagram (@hereducationrequired).',
  },
  {
    title: 'Volunteer hours',
    detail:
      'Log meaningful service hours on a real campaign — printing, assembling, and donating bookmarks in your community.',
  },
  {
    title: 'Certificate of completion',
    detail:
      'Finish your donations, submit the report form, and receive a certificate celebrating your impact.',
  },
]

const STICKERS = [
  {
    src: '/bookmark-sticker-gloria.png',
    alt: 'History by HER bookmark — Gloria Steinem',
    aspect: 'aspect-[356/966]',
    className:
      'hidden md:block left-0 lg:-left-6 top-8 w-[6.25rem] lg:w-[7rem] -rotate-[12deg] z-10',
  },
  {
    src: '/bookmark-sticker-olympe.png',
    alt: 'History by HER bookmark — Olympe de Gouges',
    aspect: 'aspect-[350/982]',
    className:
      'hidden md:block right-0 lg:-right-6 top-20 w-[6.25rem] lg:w-[7rem] rotate-[11deg] z-10',
  },
  {
    src: '/bookmark-sticker-millicent.png',
    alt: 'History by HER bookmark — Millicent Fawcett',
    aspect: 'aspect-[365/1024]',
    className:
      'hidden md:block left-1 lg:-left-4 top-[28rem] w-[5.75rem] lg:w-[6.5rem] rotate-[7deg] z-10',
  },
  {
    src: '/bookmark-sticker-azza.png',
    alt: 'History by HER bookmark — Azza Karam',
    aspect: 'aspect-[364/1024]',
    className:
      'hidden md:block right-1 lg:-right-4 top-[34rem] w-[5.75rem] lg:w-[6.5rem] -rotate-[8deg] z-10',
  },
  {
    src: '/bookmark-sticker-lucretia.png',
    alt: 'History by HER bookmark — Lucretia Mott',
    aspect: 'aspect-[363/1024]',
    className:
      'hidden md:block left-0 lg:-left-6 top-[52rem] w-[6.25rem] lg:w-[7rem] -rotate-[6deg] z-10',
  },
  {
    src: '/bookmark-sticker-kartini.png',
    alt: 'History by HER bookmark — Raden Adjeng Kartini',
    aspect: 'aspect-[363/1024]',
    className:
      'hidden md:block right-0 lg:-right-6 top-[58rem] w-[6.25rem] lg:w-[7rem] rotate-[9deg] z-10',
  },
  {
    src: '/bookmark-sticker-tarabai.png',
    alt: 'History by HER bookmark — Tarabai Shinde',
    aspect: 'aspect-[352/994]',
    className:
      'hidden md:block left-2 lg:left-0 top-[72rem] w-[5.75rem] lg:w-[6.5rem] rotate-[4deg] z-10',
  },
]

export default function HistoryByHerPage() {
  return (
    <div className="min-h-screen bg-[#FFFBF3]">
      <header className="bg-[#EB89B5] text-white py-12 md:py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/"
            className="inline-block mb-6 text-pink-100 hover:text-white transition-colors text-sm font-semibold tracking-wide"
          >
            ← Back to Home
          </Link>
          <p className="text-xs md:text-sm font-bold uppercase tracking-[0.28em] text-pink-100 mb-4">
            Volunteer initiative
          </p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">History by HER</h1>
          <p className="mt-5 text-lg md:text-xl opacity-95 leading-relaxed max-w-2xl">
            An educational bookmark campaign spreading women&apos;s history — one library shelf, bookstore
            counter, and classroom at a time.
          </p>
        </div>
      </header>

      <main className="relative max-w-5xl mx-auto px-4 py-12 md:py-16 space-y-14 md:space-y-20 overflow-visible">
        {/* Desktop stickers — staggered down the page */}
        {STICKERS.map((sticker) => (
          <div key={sticker.src} className={`absolute ${sticker.className}`}>
            <div
              className={`relative w-full ${sticker.aspect} rounded-md bg-white p-1.5 shadow-[0_14px_32px_rgba(122,36,84,0.22)] ring-1 ring-black/5 transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.04]`}
            >
              <div className="relative h-full w-full overflow-hidden rounded-sm">
                <Image
                  src={sticker.src}
                  alt={sticker.alt}
                  fill
                  sizes="200px"
                  className="object-contain object-center select-none"
                />
              </div>
            </div>
          </div>
        ))}

        <section className="relative text-center py-4 md:py-10 md:px-28 lg:px-36 overflow-visible">
          {/* Mobile sticker strip */}
          <div className="md:hidden mb-8 -mx-2">
            <div className="flex items-end gap-3 overflow-x-auto px-2 pb-3 snap-x">
              {STICKERS.map((sticker, i) => (
                <div
                  key={`m-${sticker.src}`}
                  className={`relative h-40 w-[5.5rem] shrink-0 snap-center rounded-md bg-white p-1.5 shadow-lg ring-1 ring-black/5 ${
                    i % 2 === 0 ? '-rotate-6' : 'rotate-6'
                  }`}
                >
                  <div className="relative h-full w-full overflow-hidden rounded-sm">
                    <Image
                      src={sticker.src}
                      alt={sticker.alt}
                      fill
                      sizes="88px"
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-[1]">
            <p className="text-xs font-bold uppercase tracking-[0.34em] text-[#EB89B5] mb-8 md:mb-10">
              What is it?
            </p>

            <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#7A2454] leading-[1.25] max-w-2xl mx-auto">
              History by HER
            </p>
            <p className="mt-4 md:mt-5 text-lg sm:text-xl md:text-2xl text-[#7A2454]/85 leading-relaxed max-w-2xl mx-auto font-medium">
              An educational bookmark initiative launching women&apos;s history into the world —
              one bookmark at a time.
            </p>

            <p className="mt-8 md:mt-10 text-base md:text-lg text-[#7A2454]/75 leading-relaxed max-w-xl mx-auto">
              Built to grow international understanding of pivotal figures in the women&apos;s rights
              movements around the globe.
            </p>

            <div className="mt-10 md:mt-12 mx-auto max-w-lg rounded-[2rem] bg-gradient-to-b from-[#FFD7E9]/70 to-[#FFF6FB] border border-[#EB89B5]/25 px-6 py-8 md:px-10 md:py-10">
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#EB89B5] mb-3">
                Happening this fall
              </p>
              <p className="text-base md:text-lg text-[#7A2454] leading-relaxed font-semibold">
                Students print &amp; assemble ready-to-go bookmarks, then donate them locally.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm md:text-base font-bold text-[#EB89B5]">
                <span>Libraries</span>
                <span className="text-[#EB89B5]/35" aria-hidden>
                  ·
                </span>
                <span>Bookstores</span>
                <span className="text-[#EB89B5]/35" aria-hidden>
                  ·
                </span>
                <span>Middle schools</span>
                <span className="text-[#EB89B5]/35" aria-hidden>
                  ·
                </span>
                <span>High schools</span>
              </div>
            </div>

            <p className="mt-10 md:mt-12 text-base md:text-lg text-[#7A2454]/80 leading-relaxed max-w-xl mx-auto">
              You get the print files, a short how-to, and a clear mission: put stories of trailblazing
              women into the hands of readers where you live.
            </p>
            <p className="mt-5 text-sm md:text-base font-bold tracking-[0.06em] text-[#EB89B5]">
              Open to everyone — worldwide.
            </p>
          </div>
        </section>

        <section className="relative z-[1]">
          <div className="text-center mb-8 md:mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#EB89B5] mb-3">
              Why join?
            </p>
            <h2 className="text-2xl md:text-4xl font-bold text-[#7A2454] leading-tight">
              What can you gain through this initiative?
            </h2>
          </div>

          <ul className="space-y-5 md:space-y-6 max-w-3xl mx-auto">
            {GAINS.map((item) => (
              <li
                key={item.title}
                className="rounded-3xl bg-white border border-[#EB89B5]/20 px-6 py-7 md:px-8 md:py-8 shadow-lg shadow-[#EB89B5]/10"
              >
                <h3 className="text-lg md:text-xl font-bold text-[#EB89B5] mb-2">{item.title}</h3>
                <p className="text-sm md:text-base text-[#7A2454]/85 leading-relaxed">{item.detail}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="relative z-[1] text-center space-y-3 md:space-y-4 pb-2 max-w-3xl mx-auto">
          <p className="text-xl md:text-2xl font-bold text-[#7A2454] leading-snug">
            Fill out the form below and check your email today.
          </p>
          <p className="text-sm md:text-base text-[#7A2454]/70 max-w-xl mx-auto leading-relaxed">
            We&apos;ll send your print files, the assembly how-to, and everything you need to start donating.
          </p>
        </section>

        <div className="relative z-[1] max-w-3xl mx-auto">
          <HistoryByHerForm />
        </div>
      </main>

      <footer className="bg-[#FFFBF3] text-gray-800 py-8 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gray-700">
            © {new Date().getFullYear()} HER — Her Education Required | Global Youth Network
          </p>
        </div>
      </footer>
    </div>
  )
}
