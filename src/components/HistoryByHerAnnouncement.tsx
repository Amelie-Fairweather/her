import Link from 'next/link'
import HistoryByHerImpactStats from '@/components/HistoryByHerImpactStats'

export default function HistoryByHerAnnouncement() {
  return (
    <div className="relative z-50 w-full bg-[#7A2454] text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-3 px-4 py-3.5 text-center sm:gap-3.5 sm:py-4 md:py-5">
        <div className="flex flex-col items-center justify-center gap-2.5 sm:flex-row sm:gap-4">
          <p className="text-sm sm:text-base md:text-lg font-bold leading-snug">
            <span className="uppercase tracking-[0.16em] text-[#FFD7E9] text-[10px] sm:text-xs block sm:inline sm:mr-2 mb-1 sm:mb-0">
              New
            </span>
            Volunteer opportunity: History by HER initiative
          </p>
          <Link
            href="/history-by-her"
            className="inline-flex shrink-0 items-center justify-center rounded-none border-2 border-white bg-white px-4 py-1.5 md:px-5 md:py-2 text-[11px] md:text-xs font-bold uppercase tracking-[0.14em] text-[#7A2454] transition-colors hover:bg-[#FFD7E9] hover:border-[#FFD7E9]"
          >
            Learn more
          </Link>
        </div>
        <HistoryByHerImpactStats variant="banner" />
        <div className="w-full max-w-3xl border-t border-white/20 pt-3 sm:pt-3.5">
          <Link
            href="/ama#cliff-burrows"
            className="group flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-4"
          >
            <p className="text-xs sm:text-sm font-semibold leading-snug text-white/95 group-hover:text-white">
              <span className="uppercase tracking-[0.16em] text-[#FFD7E9] text-[10px] block sm:inline sm:mr-2 mb-0.5 sm:mb-0">
                New
              </span>
              Ask Me Anything opportunity — Cliff Burrows, former President of Starbucks
            </p>
            <span className="inline-flex shrink-0 items-center justify-center rounded-none border-2 border-white/80 bg-transparent px-4 py-1.5 text-[11px] md:text-xs font-bold uppercase tracking-[0.14em] text-white transition-colors group-hover:bg-white group-hover:text-[#7A2454]">
              Learn more
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}
