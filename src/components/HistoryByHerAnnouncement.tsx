import Link from 'next/link'

export default function HistoryByHerAnnouncement() {
  return (
    <div className="relative z-50 w-full bg-[#7A2454] text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-4 px-4 py-5 text-center sm:flex-row sm:gap-6 sm:py-6 md:py-7">
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-snug">
          <span className="uppercase tracking-[0.16em] text-[#FFD7E9] text-xs sm:text-sm block sm:inline sm:mr-2.5 mb-1.5 sm:mb-0">
            New
          </span>
          Volunteer opportunity: History by HER initiative
        </p>
        <Link
          href="/history-by-her"
          className="inline-flex shrink-0 items-center justify-center rounded-none border-2 border-white bg-white px-7 py-3 md:px-8 md:py-3.5 text-sm md:text-base font-bold uppercase tracking-[0.14em] text-[#7A2454] transition-colors hover:bg-[#FFD7E9] hover:border-[#FFD7E9]"
        >
          Learn more
        </Link>
      </div>
    </div>
  )
}
