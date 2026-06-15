import Link from 'next/link'

export default function HarwickUnionHighSchoolGirlsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFBF3] to-[#FFF8D2]">
      <header className="bg-[#EB89B5] text-white py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-block mb-4 text-pink-100 hover:text-white transition-colors">
            ← Back to Home
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold">Meet the students at Harwood Union High School</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-xl text-gray-700 font-semibold">Coming soon</p>
        <p className="mt-2 text-gray-600 mb-6">Follow HER at Harwood Union High School on Instagram for updates.</p>
        <a
          href="https://www.instagram.com/huhs_hereducationrequired/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-lg bg-[#FFF6FB] px-6 py-3 text-[#EB89B5] font-semibold hover:bg-white border border-[#EB89B5]/30 transition-colors"
        >
          @huhs_hereducationrequired
        </a>
      </main>
    </div>
  )
}
