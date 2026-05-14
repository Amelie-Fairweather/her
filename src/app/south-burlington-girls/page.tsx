import Link from 'next/link'
import Image from 'next/image'

export default function SouthBurlingtonGirlsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFBF3] to-[#FFF8D2]">
      <header className="bg-[#EB89B5] text-white py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <Link href="/" className="inline-block mb-4 text-pink-100 hover:text-white transition-colors">
            ← Back to Home
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold">Meet the students at South Burlington</h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl shadow-[#EB89B5]/10 p-5 md:p-10 space-y-12 md:space-y-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="bg-white rounded-2xl p-4 md:p-8 shadow-lg shadow-[#EB89B5]/20 transform hover:scale-110 transition-transform duration-300 h-[200px] md:h-[240px] flex items-center">
              <div className="text-center w-full">
                <div className="text-2xl md:text-4xl font-bold text-[#EB89B5] mb-2 md:mb-3">80%</div>
                <p className="text-xs md:text-sm text-gray-700 font-semibold px-1 md:px-4 leading-tight">
                  of students said school did not go deep enough into women&apos;s history.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 md:p-8 shadow-lg shadow-[#EB89B5]/20 transform hover:scale-110 transition-transform duration-300 h-[200px] md:h-[240px] flex items-center">
              <div className="text-center w-full">
                <div className="text-2xl md:text-4xl font-bold text-[#EB89B5] mb-2 md:mb-3">70%</div>
                <p className="text-xs md:text-sm text-gray-700 font-semibold px-1 md:px-4 leading-tight">
                  of students said they had received no women&apos;s history outside of optional classes.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 md:p-8 shadow-lg shadow-[#EB89B5]/20 transform hover:scale-110 transition-transform duration-300 h-[200px] md:h-[240px] flex items-center">
              <div className="text-center w-full">
                <div className="text-2xl md:text-4xl font-bold text-[#EB89B5] mb-2 md:mb-3">90%</div>
                <p className="text-xs md:text-sm text-gray-700 font-semibold px-1 md:px-4 leading-tight">
                  of students did not know what a suffragist was, or what Title VII or Title IX were or did.
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-center text-4xl md:text-5xl font-extrabold text-[#EB89B5] tracking-tight">South Burlington HER</h2>

          <section className="bg-white border border-[#EB89B5]/30 rounded-2xl p-5 md:p-7 text-center shadow-sm">
            <p className="text-gray-800 text-sm md:text-base leading-relaxed max-w-4xl mx-auto">
              Learning women&apos;s history is essential because it gives students a complete and honest understanding of the past, highlights
              the leadership and resilience of women across generations, and helps ensure today&apos;s decisions are informed by voices that have
              too often been left out of classrooms and textbooks.
            </p>
          </section>

          <div className="max-w-4xl mx-auto">
            <div className="relative w-full overflow-hidden rounded-lg shadow-md" style={{ aspectRatio: '16 / 10' }}>
              <Image
                src="/sbhs-img-8861.jpeg"
                alt="Students presenting at the county-wide HER event"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 1000px"
                priority
              />
            </div>
          </div>

          <section className="bg-white border border-[#EB89B5]/30 rounded-2xl p-5 md:p-7 shadow-sm">
            <h2 className="text-2xl md:text-3xl font-bold text-[#EB89B5] text-center mb-5">Meet Your Leaders</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 text-center">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-[#EB89B5]/15 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03] hover:shadow-xl hover:shadow-[#EB89B5]/20 hover:border-[#EB89B5]/60">
                <p className="text-sm text-gray-500 mb-1">Left in photo</p>
                <p className="text-lg font-bold text-gray-900">Kaydence!</p>
                <p className="text-[#EB89B5] font-semibold">Secretary</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-[#EB89B5]/15 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03] hover:shadow-xl hover:shadow-[#EB89B5]/20 hover:border-[#EB89B5]/60">
                <p className="text-sm text-gray-500 mb-1">Middle in photo</p>
                <p className="text-lg font-bold text-gray-900">Trusha!</p>
                <p className="text-[#EB89B5] font-semibold">President</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-[#EB89B5]/15 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03] hover:shadow-xl hover:shadow-[#EB89B5]/20 hover:border-[#EB89B5]/60">
                <p className="text-sm text-gray-500 mb-1">Right in photo</p>
                <p className="text-lg font-bold text-gray-900">Salma!</p>
                <p className="text-[#EB89B5] font-semibold">Vice President</p>
              </div>
            </div>
          </section>

          <section className="p-3 md:p-4 transition-all duration-300 rounded-2xl hover:-translate-y-1 hover:shadow-lg hover:shadow-[#EB89B5]/15">
            <blockquote className="text-gray-800 text-lg md:text-2xl leading-relaxed pl-2">
              &ldquo;We started H.E.R because we&apos;ve personally noticed that our school, along with many others, excludes a lot of women&apos;s history in the curriculum. Women&apos;s voices throughout history, and even now, have gone unheard. We believe that we can help make a change by joining H.E.R and pushing for our history to be taught.&rdquo;
            </blockquote>
            <p className="mt-3 text-right text-[#EB89B5] font-semibold text-lg md:text-xl">- Trusha Patel</p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative w-full overflow-hidden rounded-lg shadow-md" style={{ aspectRatio: '3 / 2' }}>
              <Image
                src="/sbhs-img-0648.jpg"
                alt="South Burlington High School students group photo"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="relative w-full overflow-hidden rounded-lg shadow-md" style={{ aspectRatio: '3 / 2' }}>
              <Image
                src="/sbhs-group-extra.png"
                alt="South Burlington High School HER club group photo in classroom"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <section className="relative overflow-hidden rounded-2xl bg-white/80 p-5 md:p-7 text-center shadow-sm">
              <div
                className="pointer-events-none absolute inset-0 opacity-80"
                style={{
                  background:
                    'radial-gradient(900px circle at 50% 0%, rgba(235,137,181,0.18), rgba(255,255,255,0))',
                }}
              />
              <div className="relative">
                <p className="text-[#EB89B5] text-xl md:text-2xl font-extrabold tracking-tight">
                  SBHS Students
                </p>
                <p className="mt-2 text-gray-800 text-base md:text-lg font-semibold leading-snug">
                  Join our club in <span className="text-[#EB89B5]">Room 102</span> during{' '}
                  <span className="text-[#EB89B5]">A Block</span> and/or office hours on Fridays.
                </p>
              </div>
            </section>

            <section className="rounded-2xl bg-white p-5 md:p-7 text-center shadow-sm">
              <p className="text-[#EB89B5] text-xl md:text-2xl font-bold tracking-tight">
                Follow our socials
              </p>
              <a
                href="https://www.instagram.com/sb.hereducationrequired/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center justify-center rounded-lg bg-[#FFF6FB] px-4 py-2 text-[#7A2454] font-semibold hover:bg-white transition-colors shadow-sm"
              >
                @sb.hereducationrequired
              </a>
            </section>

            <section className="rounded-2xl bg-gradient-to-br from-[#FFD7E9] to-[#FFEAF4] p-5 md:p-7 text-center shadow-sm">
              <h3 className="text-xl md:text-2xl font-bold text-[#EB89B5] tracking-tight">
                Start a HER club at your school
              </h3>
              <p className="mt-2 text-gray-800 text-sm md:text-base leading-relaxed">
                Contact{' '}
                <a
                  href="mailto:hereducationrequired@gmail.com"
                  className="text-[#7A2454] underline decoration-[#EB89B5]/60 underline-offset-4 hover:decoration-[#EB89B5] font-semibold"
                >
                  hereducationrequired@gmail.com
                </a>{' '}
                to get started.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
