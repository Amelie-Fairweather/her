import Link from 'next/link'

export default function BurlingtonHighSchoolGirlsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFBF3] to-[#FFF8D2]">
      <header className="bg-[#EB89B5] text-white py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-block mb-4 text-pink-100 hover:text-white transition-colors">
            ← Back to Home
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold">Meet the students at Burlington High School</h1>
          <p className="mt-2 text-lg opacity-90">BHS</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-xl text-gray-700 font-semibold mb-6">
          Visit the Burlington High School HER page for mission, data, and how to get involved.
        </p>
        <a
          href="https://blackmaj3.wixsite.com/bhshereducation"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-lg bg-[#EB89B5] px-6 py-3 text-white font-semibold hover:bg-[#d977a5] transition-colors"
        >
          Go to BHS HER page
        </a>
        <p className="mt-6 text-gray-600">
          Or follow on{' '}
          <a
            href="https://www.instagram.com/bhs_hereducation/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#EB89B5] font-semibold hover:underline"
          >
            Instagram
          </a>
        </p>
      </main>
    </div>
  )
}
