'use client'

import dynamic from 'next/dynamic'

const HerChapterMap = dynamic(() => import('./HerChapterMap'), {
  ssr: false,
  loading: () => (
    <div className="mt-10 max-w-7xl mx-auto rounded-2xl bg-white/80 border border-[#EB89B5]/20 shadow-lg h-[360px] md:h-[480px] flex items-center justify-center">
      <p className="text-[#EB89B5] font-semibold">Loading map…</p>
    </div>
  ),
})

export default function HerChapterMapLoader() {
  return <HerChapterMap />
}
