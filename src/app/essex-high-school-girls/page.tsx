import Link from 'next/link'

export default function EssexHighSchoolGirlsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFBF3] to-[#FFF8D2]">
      <header className="bg-[#EB89B5] text-white py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-block mb-4 text-pink-100 hover:text-white transition-colors">
            ← Back to Home
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold">Meet the students at Essex High School</h1>
          <p className="mt-2 text-lg opacity-90">EHS</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-xl text-gray-700 font-semibold">Coming soon</p>
        <p className="mt-2 text-gray-600">More information about HER at Essex High School will be posted here.</p>
      </main>
    </div>
  )
}
