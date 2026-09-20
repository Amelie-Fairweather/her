import Link from 'next/link'
import HistoryByHerForm from '@/components/HistoryByHerForm'

const HOW_TO_VIDEO_EMBED =
  'https://drive.google.com/file/d/1hFNHGvuRvsgU11hii3PRIJ74RUJ36Q3k/preview'

export default function HistoryByHerPage() {
  return (
    <div className="min-h-screen bg-[#FFFBF3]">
      <header className="bg-[#EB89B5] text-white py-10 md:py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/"
            className="inline-block mb-5 text-pink-100 hover:text-white transition-colors text-sm font-semibold tracking-wide"
          >
            ← Back to Home
          </Link>
          <p className="text-xs md:text-sm font-bold uppercase tracking-[0.28em] text-pink-100 mb-3">
            Volunteer initiative
          </p>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">History by HER</h1>
          <p className="mt-4 text-lg md:text-xl opacity-95 leading-relaxed">
            Print HER bookmarks, donate them to local libraries and schools, and help share women&apos;s
            history in your community. Open to all!
          </p>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10 md:py-14 space-y-10 md:space-y-14">
        <section aria-label="How to print and assemble HER bookmarks">
          <div className="text-center mb-5 md:mb-6">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#EB89B5] mb-2">
              How-to video
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-[#7A2454]">
              Watch: print &amp; assemble the bookmarks
            </h2>
            <p className="mt-2 text-sm md:text-base text-gray-600 max-w-xl mx-auto">
              Click play to see the full instructional video before you get started.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-[#EB89B5]/25 bg-black shadow-xl shadow-[#EB89B5]/15">
            <div className="relative w-full aspect-video">
              <iframe
                src={HOW_TO_VIDEO_EMBED}
                title="History by HER — how to print and assemble bookmarks"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
          </div>
        </section>

        <HistoryByHerForm />
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
