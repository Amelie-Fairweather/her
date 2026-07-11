import Link from 'next/link'
import HerChapterMapLoader from '@/components/HerChapterMapLoader'
import HomeParallaxHero from '@/components/HomeParallaxHero'
// import HeroTitle from '@/components/HeroTitle' // Removed hearts and stars animation

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFBF3] to-[#FFF8D2]">
      <HomeParallaxHero />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 pt-0 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
          {/* About Us Button */}
          <Link href="/about" className="group">
            <div className="bg-white rounded-lg shadow-lg p-5 md:p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-[#EB89B5] h-[200px] md:h-[260px] flex flex-col justify-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[#FFD7E9] rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:bg-[#EB89B5] transition-colors">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-[#EB89B5] group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h3 className="text-sm md:text-xl font-bold text-gray-800 mb-2 md:mb-3">About Us</h3>
              <p className="text-xs md:text-base text-gray-600 group-hover:text-gray-700 leading-tight">
                Learn about our mission, values, and the passionate students behind HER.
              </p>
            </div>
          </Link>

          {/* Upcoming Events Button */}
          <Link href="/events" className="group">
            <div className="bg-white rounded-lg shadow-lg p-5 md:p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-[#EB89B5] h-[200px] md:h-[260px] flex flex-col justify-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[#FFD7E9] rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:bg-[#EB89B5] transition-colors">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-[#EB89B5] group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-sm md:text-xl font-bold text-gray-800 mb-2 md:mb-3">Upcoming Events</h3>
              <p className="text-xs md:text-base text-gray-600 group-hover:text-gray-700 leading-tight">
                Stay updated on our meetings, workshops, and community events.
              </p>
            </div>
          </Link>

          {/* Get Involved Button */}
          <Link href="/involved" className="group">
            <div className="bg-white rounded-lg shadow-lg p-5 md:p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-[#EB89B5] h-[200px] md:h-[260px] flex flex-col justify-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[#FFD7E9] rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:bg-[#EB89B5] transition-colors">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-[#EB89B5] group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-sm md:text-xl font-bold text-gray-800 mb-2 md:mb-3">Get Involved</h3>
              <p className="text-xs md:text-base text-gray-600 group-hover:text-gray-700 leading-tight">
                Join our community and help us make a difference in education.
              </p>
            </div>
          </Link>

          {/* Media Coverage Button */}
          <Link href="/media" className="group">
            <div className="bg-white rounded-lg shadow-lg p-5 md:p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-[#EB89B5] h-[200px] md:h-[260px] flex flex-col justify-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[#FFD7E9] rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:bg-[#EB89B5] transition-colors">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-[#EB89B5] group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="text-sm md:text-xl font-bold text-gray-800 mb-2 md:mb-3">Media Coverage</h3>
              <p className="text-xs md:text-base text-gray-600 group-hover:text-gray-700 leading-tight">
                News articles and videos featuring our mission.
              </p>
            </div>
          </Link>
        </div>

        <div id="chapters-map" className="scroll-mt-8">
          <HerChapterMapLoader />
        </div>

        <section className="mt-14 md:mt-20 mb-14 md:mb-20 max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-[#7A2454] leading-tight mb-8 md:mb-10">
            Start a Her Education Required today
          </h2>
          <Link
            href="/apply"
            className="group inline-flex items-center justify-center w-full max-w-md mx-auto min-h-[88px] md:min-h-[100px] px-10 py-6 rounded-none bg-[#EB89B5] text-white text-lg md:text-2xl font-bold tracking-[0.08em] uppercase shadow-lg shadow-[#EB89B5]/25 border-2 border-[#EB89B5] transition-all duration-300 hover:bg-[#7A2454] hover:border-[#7A2454] hover:shadow-[#7A2454]/30"
          >
            Applications are now open
          </Link>
        </section>

        {/* Meet the students: Essex, South Burlington, Burlington, Stowe, Harwood Union, Vergennes Union, Rice Memorial, Peoples Academy */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
          <a
            href="https://www.instagram.com/ehs_her.education.required/"
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-2xl bg-gradient-to-br from-[#FFF6FB] to-[#FFEAF4] shadow-md shadow-[#EB89B5]/10 p-6 md:p-7 text-center min-h-[160px] flex flex-col items-center justify-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#EB89B5]/20"
          >
            <h3 className="font-serif text-xl md:text-2xl font-bold text-[#7A2454] leading-tight group-hover:text-[#EB89B5] transition-colors">
              Meet the students at Essex High School
            </h3>
            <p className="mt-3 text-sm font-semibold text-gray-700 tracking-[0.12em] uppercase">
              Coming soon
            </p>
          </a>
          <Link href="/south-burlington-girls" className="group">
            <div className="bg-gradient-to-br from-white to-[#FFF6FB] rounded-2xl shadow-lg shadow-[#EB89B5]/10 p-6 md:p-7 text-center transition-all duration-300 transform group-hover:-translate-y-2 group-hover:shadow-xl group-hover:shadow-[#EB89B5]/20 border border-[#EB89B5]/20 group-hover:border-[#EB89B5]/50 h-full flex flex-col justify-center min-h-[160px]">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#FFD7E9] flex items-center justify-center text-[#EB89B5] group-hover:bg-[#EB89B5] group-hover:text-white transition-colors duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-[#EB89B5] leading-tight">
                Meet the students at South Burlington High School
              </h3>
            </div>
          </Link>
          <a
            href="https://blackmaj3.wixsite.com/bhshereducation"
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            <div className="bg-gradient-to-br from-white to-[#FFF6FB] rounded-2xl shadow-lg shadow-[#EB89B5]/10 p-6 md:p-7 text-center transition-all duration-300 transform group-hover:-translate-y-2 group-hover:shadow-xl group-hover:shadow-[#EB89B5]/20 border border-[#EB89B5]/20 group-hover:border-[#EB89B5]/50 h-full flex flex-col justify-center min-h-[160px]">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#FFD7E9] flex items-center justify-center text-[#EB89B5] group-hover:bg-[#EB89B5] group-hover:text-white transition-colors duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-[#EB89B5] leading-tight">
                Meet the students at Burlington High School
              </h3>
            </div>
          </a>
          <a
            href="https://www.instagram.com/stowe.hereducationrequired/"
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-2xl bg-gradient-to-br from-[#FFF6FB] to-[#FFEAF4] shadow-md shadow-[#EB89B5]/10 p-6 md:p-7 text-center min-h-[160px] flex flex-col items-center justify-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#EB89B5]/20"
          >
            <h3 className="font-serif text-xl md:text-2xl font-bold text-[#7A2454] leading-tight group-hover:text-[#EB89B5] transition-colors">
              Meet the students at Stowe High School
            </h3>
            <p className="mt-3 text-sm font-semibold text-gray-700 tracking-[0.12em] uppercase">
              Coming soon
            </p>
          </a>
          <a
            href="https://www.instagram.com/huhs_hereducationrequired/"
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-2xl bg-gradient-to-br from-[#FFF6FB] to-[#FFEAF4] shadow-md shadow-[#EB89B5]/10 p-6 md:p-7 text-center min-h-[160px] flex flex-col items-center justify-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#EB89B5]/20"
          >
            <h3 className="font-serif text-xl md:text-2xl font-bold text-[#7A2454] leading-tight group-hover:text-[#EB89B5] transition-colors">
              Meet the students at Harwood Union High School
            </h3>
            <p className="mt-3 text-sm font-semibold text-gray-700 tracking-[0.12em] uppercase">
              Coming soon
            </p>
          </a>
          <a
            href="https://www.instagram.com/vuhs.hereducationrequired/"
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-2xl bg-gradient-to-br from-[#FFF6FB] to-[#FFEAF4] shadow-md shadow-[#EB89B5]/10 p-6 md:p-7 text-center min-h-[160px] flex flex-col items-center justify-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#EB89B5]/20"
          >
            <h3 className="font-serif text-xl md:text-2xl font-bold text-[#7A2454] leading-tight group-hover:text-[#EB89B5] transition-colors">
              Meet the students at Vergennes Union High School
            </h3>
            <p className="mt-3 text-sm font-semibold text-gray-700 tracking-[0.12em] uppercase">
              Coming soon
            </p>
          </a>
          <div className="rounded-2xl bg-gradient-to-br from-[#FFF6FB] to-[#FFEAF4] shadow-md shadow-[#EB89B5]/10 p-6 md:p-7 text-center min-h-[160px] flex flex-col items-center justify-center">
            <h3 className="font-serif text-xl md:text-2xl font-bold text-[#7A2454] leading-tight">
              Meet the students at Rice Memorial High School
            </h3>
            <p className="mt-3 text-sm font-semibold text-gray-700 tracking-[0.12em] uppercase">
              Coming soon
            </p>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-[#FFF6FB] to-[#FFEAF4] shadow-md shadow-[#EB89B5]/10 p-6 md:p-7 text-center min-h-[160px] flex flex-col items-center justify-center">
            <h3 className="font-serif text-xl md:text-2xl font-bold text-[#7A2454] leading-tight">
              Meet the students at Peoples Academy
            </h3>
            <p className="mt-3 text-sm font-semibold text-gray-700 tracking-[0.12em] uppercase">
              Coming soon
            </p>
          </div>
          <a
            href="https://www.instagram.com/luhs.hereducationrequired/"
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-2xl bg-gradient-to-br from-[#FFF6FB] to-[#FFEAF4] shadow-md shadow-[#EB89B5]/10 p-6 md:p-7 text-center min-h-[160px] flex flex-col items-center justify-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#EB89B5]/20"
          >
            <h3 className="font-serif text-xl md:text-2xl font-bold text-[#7A2454] leading-tight group-hover:text-[#EB89B5] transition-colors">
              Meet the students at Lamoille Union High School
            </h3>
            <p className="mt-3 text-sm font-semibold text-gray-700 tracking-[0.12em] uppercase">
              Coming soon
            </p>
          </a>
          <a
            href="https://www.instagram.com/tag_hereducationrequired/"
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-2xl bg-gradient-to-br from-[#FFF6FB] to-[#FFEAF4] shadow-md shadow-[#EB89B5]/10 p-6 md:p-7 text-center min-h-[160px] flex flex-col items-center justify-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#EB89B5]/20"
          >
            <h3 className="font-serif text-xl md:text-2xl font-bold text-[#7A2454] leading-tight group-hover:text-[#EB89B5] transition-colors">
              Meet the students at Texas School for the Talented and Gifted
            </h3>
            <p className="mt-3 text-sm font-semibold text-gray-700 tracking-[0.12em] uppercase">
              Coming soon
            </p>
          </a>
          <a
            href="https://www.instagram.com/shs_hereducationrequired/"
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-2xl bg-gradient-to-br from-[#FFF6FB] to-[#FFEAF4] shadow-md shadow-[#EB89B5]/10 p-6 md:p-7 text-center min-h-[160px] flex flex-col items-center justify-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#EB89B5]/20"
          >
            <h3 className="font-serif text-xl md:text-2xl font-bold text-[#7A2454] leading-tight group-hover:text-[#EB89B5] transition-colors">
              Meet the students at Solon High School
            </h3>
            <p className="mt-3 text-sm font-semibold text-gray-700 tracking-[0.12em] uppercase">
              Coming soon
            </p>
          </a>
          <div className="rounded-2xl bg-gradient-to-br from-[#FFF6FB] to-[#FFEAF4] shadow-md shadow-[#EB89B5]/10 p-6 md:p-7 text-center min-h-[160px] flex flex-col items-center justify-center">
            <h3 className="font-serif text-xl md:text-2xl font-bold text-[#7A2454] leading-tight">
              Meet the students at Proctor Academy
            </h3>
            <p className="mt-3 text-sm font-semibold text-gray-700 tracking-[0.12em] uppercase">
              Coming soon
            </p>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-[#FFF6FB] to-[#FFEAF4] shadow-md shadow-[#EB89B5]/10 p-6 md:p-7 text-center min-h-[160px] flex flex-col items-center justify-center">
            <h3 className="font-serif text-xl md:text-2xl font-bold text-[#7A2454] leading-tight">
              Meet the students at Holderness School
            </h3>
            <p className="mt-3 text-sm font-semibold text-gray-700 tracking-[0.12em] uppercase">
              Coming soon
            </p>
          </div>
          <a
            href="https://www.instagram.com/mmu_hereducationrequired/"
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-2xl bg-gradient-to-br from-[#FFF6FB] to-[#FFEAF4] shadow-md shadow-[#EB89B5]/10 p-6 md:p-7 text-center min-h-[160px] flex flex-col items-center justify-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#EB89B5]/20"
          >
            <h3 className="font-serif text-xl md:text-2xl font-bold text-[#7A2454] leading-tight group-hover:text-[#EB89B5] transition-colors">
              Meet the students at Mt Mansfield Union High School
            </h3>
            <p className="mt-3 text-sm font-semibold text-gray-700 tracking-[0.12em] uppercase">
              Coming soon
            </p>
          </a>
          <a
            href="https://www.instagram.com/hhs_hereducationrequired/"
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-2xl bg-gradient-to-br from-[#FFF6FB] to-[#FFEAF4] shadow-md shadow-[#EB89B5]/10 p-6 md:p-7 text-center min-h-[160px] flex flex-col items-center justify-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#EB89B5]/20"
          >
            <h3 className="font-serif text-xl md:text-2xl font-bold text-[#7A2454] leading-tight group-hover:text-[#EB89B5] transition-colors">
              Meet the students at Hopkins High School
            </h3>
            <p className="mt-3 text-sm font-semibold text-gray-700 tracking-[0.12em] uppercase">
              Coming soon
            </p>
          </a>
          <div className="rounded-2xl bg-gradient-to-br from-[#FFF6FB] to-[#FFEAF4] shadow-md shadow-[#EB89B5]/10 p-6 md:p-7 text-center min-h-[160px] flex flex-col items-center justify-center">
            <h3 className="font-serif text-xl md:text-2xl font-bold text-[#7A2454] leading-tight">
              Meet the students at Deer Park High School
            </h3>
            <p className="mt-3 text-sm font-semibold text-gray-700 tracking-[0.12em] uppercase">
              Coming soon
            </p>
          </div>
          <a
            href="https://www.instagram.com/sg_hereducationrequired/"
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-2xl bg-gradient-to-br from-[#FFF6FB] to-[#FFEAF4] shadow-md shadow-[#EB89B5]/10 p-6 md:p-7 text-center min-h-[160px] flex flex-col items-center justify-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#EB89B5]/20"
          >
            <h3 className="font-serif text-xl md:text-2xl font-bold text-[#7A2454] leading-tight group-hover:text-[#EB89B5] transition-colors">
              Meet the students at Global Indian International School
            </h3>
            <p className="mt-3 text-sm font-semibold text-gray-700 tracking-[0.12em] uppercase">
              Coming soon
            </p>
          </a>
          <a
            href="https://www.instagram.com/montpelierhighschool_her/"
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-2xl bg-gradient-to-br from-[#FFF6FB] to-[#FFEAF4] shadow-md shadow-[#EB89B5]/10 p-6 md:p-7 text-center min-h-[160px] flex flex-col items-center justify-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#EB89B5]/20"
          >
            <h3 className="font-serif text-xl md:text-2xl font-bold text-[#7A2454] leading-tight group-hover:text-[#EB89B5] transition-colors">
              Meet the students at Montpelier High School
            </h3>
            <p className="mt-3 text-sm font-semibold text-gray-700 tracking-[0.12em] uppercase">
              Coming soon
            </p>
          </a>
          <div className="rounded-2xl bg-gradient-to-br from-[#FFF6FB] to-[#FFEAF4] shadow-md shadow-[#EB89B5]/10 p-6 md:p-7 text-center min-h-[160px] flex flex-col items-center justify-center">
            <h3 className="font-serif text-xl md:text-2xl font-bold text-[#7A2454] leading-tight">
              Meet the students at Southwest High School
            </h3>
            <p className="mt-3 text-sm font-semibold text-gray-700 tracking-[0.12em] uppercase">
              Coming soon
            </p>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-[#FFF6FB] to-[#FFEAF4] shadow-md shadow-[#EB89B5]/10 p-6 md:p-7 text-center min-h-[160px] flex flex-col items-center justify-center">
            <h3 className="font-serif text-xl md:text-2xl font-bold text-[#7A2454] leading-tight">
              Meet the students at North Eugene High School
            </h3>
            <p className="mt-3 text-sm font-semibold text-gray-700 tracking-[0.12em] uppercase">
              Coming soon
            </p>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-[#FFF6FB] to-[#FFEAF4] shadow-md shadow-[#EB89B5]/10 p-6 md:p-7 text-center min-h-[160px] flex flex-col items-center justify-center">
            <h3 className="font-serif text-xl md:text-2xl font-bold text-[#7A2454] leading-tight">
              Meet the students at Atkins High School
            </h3>
            <p className="mt-3 text-sm font-semibold text-gray-700 tracking-[0.12em] uppercase">
              Coming soon
            </p>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-[#FFF6FB] to-[#FFEAF4] shadow-md shadow-[#EB89B5]/10 p-6 md:p-7 text-center min-h-[160px] flex flex-col items-center justify-center">
            <h3 className="font-serif text-xl md:text-2xl font-bold text-[#7A2454] leading-tight">
              Meet the students at Irvington High School
            </h3>
            <p className="mt-3 text-sm font-semibold text-gray-700 tracking-[0.12em] uppercase">
              Coming soon
            </p>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-[#FFF6FB] to-[#FFEAF4] shadow-md shadow-[#EB89B5]/10 p-6 md:p-7 text-center min-h-[160px] flex flex-col items-center justify-center">
            <h3 className="font-serif text-xl md:text-2xl font-bold text-[#7A2454] leading-tight">
              Meet the students at Suffield Academy
            </h3>
            <p className="mt-3 text-sm font-semibold text-gray-700 tracking-[0.12em] uppercase">
              Coming soon
            </p>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-[#FFF6FB] to-[#FFEAF4] shadow-md shadow-[#EB89B5]/10 p-6 md:p-7 text-center min-h-[160px] flex flex-col items-center justify-center">
            <h3 className="font-serif text-xl md:text-2xl font-bold text-[#7A2454] leading-tight">
              Meet the students at Woodcreek High School
            </h3>
            <p className="mt-3 text-sm font-semibold text-gray-700 tracking-[0.12em] uppercase">
              Coming soon
            </p>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-[#FFF6FB] to-[#FFEAF4] shadow-md shadow-[#EB89B5]/10 p-6 md:p-7 text-center min-h-[160px] flex flex-col items-center justify-center">
            <h3 className="font-serif text-xl md:text-2xl font-bold text-[#7A2454] leading-tight">
              Meet the students at La Cueva High School
            </h3>
            <p className="mt-3 text-sm font-semibold text-gray-700 tracking-[0.12em] uppercase">
              Coming soon
            </p>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-[#FFF6FB] to-[#FFEAF4] shadow-md shadow-[#EB89B5]/10 p-6 md:p-7 text-center min-h-[160px] flex flex-col items-center justify-center">
            <h3 className="font-serif text-xl md:text-2xl font-bold text-[#7A2454] leading-tight">
              Meet the students at Theodore Roosevelt Senior High School
            </h3>
            <p className="mt-3 text-sm font-semibold text-gray-700 tracking-[0.12em] uppercase">
              Coming soon
            </p>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-[#FFF6FB] to-[#FFEAF4] shadow-md shadow-[#EB89B5]/10 p-6 md:p-7 text-center min-h-[160px] flex flex-col items-center justify-center">
            <h3 className="font-serif text-xl md:text-2xl font-bold text-[#7A2454] leading-tight">
              Meet the students at Saint Johnsbury Academy
            </h3>
            <p className="mt-3 text-sm font-semibold text-gray-700 tracking-[0.12em] uppercase">
              Coming soon
            </p>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-[#FFF6FB] to-[#FFEAF4] shadow-md shadow-[#EB89B5]/10 p-6 md:p-7 text-center min-h-[160px] flex flex-col items-center justify-center">
            <h3 className="font-serif text-xl md:text-2xl font-bold text-[#7A2454] leading-tight">
              Meet the students at Colchester High School
            </h3>
            <p className="mt-3 text-sm font-semibold text-gray-700 tracking-[0.12em] uppercase">
              Coming soon
            </p>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-[#FFF6FB] to-[#FFEAF4] shadow-md shadow-[#EB89B5]/10 p-6 md:p-7 text-center min-h-[160px] flex flex-col items-center justify-center">
            <h3 className="font-serif text-xl md:text-2xl font-bold text-[#7A2454] leading-tight">
              Meet the students at East Brunswick High School
            </h3>
            <p className="mt-3 text-sm font-semibold text-gray-700 tracking-[0.12em] uppercase">
              Coming soon
            </p>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-[#FFF6FB] to-[#FFEAF4] shadow-md shadow-[#EB89B5]/10 p-6 md:p-7 text-center min-h-[160px] flex flex-col items-center justify-center">
            <h3 className="font-serif text-xl md:text-2xl font-bold text-[#7A2454] leading-tight">
              Meet the students at Haddon Township High School
            </h3>
            <p className="mt-3 text-sm font-semibold text-gray-700 tracking-[0.12em] uppercase">
              Coming soon
            </p>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-[#FFF6FB] to-[#FFEAF4] shadow-md shadow-[#EB89B5]/10 p-6 md:p-7 text-center min-h-[160px] flex flex-col items-center justify-center">
            <h3 className="font-serif text-xl md:text-2xl font-bold text-[#7A2454] leading-tight">
              Meet the students at Marymount High School
            </h3>
            <p className="mt-3 text-sm font-semibold text-gray-700 tracking-[0.12em] uppercase">
              Coming soon
            </p>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-[#FFF6FB] to-[#FFEAF4] shadow-md shadow-[#EB89B5]/10 p-6 md:p-7 text-center min-h-[160px] flex flex-col items-center justify-center">
            <h3 className="font-serif text-xl md:text-2xl font-bold text-[#7A2454] leading-tight">
              Meet the students at Pan American Christian Academy
            </h3>
            <p className="mt-3 text-sm font-semibold text-gray-700 tracking-[0.12em] uppercase">
              Coming soon
            </p>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-[#FFF6FB] to-[#FFEAF4] shadow-md shadow-[#EB89B5]/10 p-6 md:p-7 text-center min-h-[160px] flex flex-col items-center justify-center">
            <h3 className="font-serif text-xl md:text-2xl font-bold text-[#7A2454] leading-tight">
              Meet the students at Casa Roble High School
            </h3>
            <p className="mt-3 text-sm font-semibold text-gray-700 tracking-[0.12em] uppercase">
              Coming soon
            </p>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-[#FFF6FB] to-[#FFEAF4] shadow-md shadow-[#EB89B5]/10 p-6 md:p-7 text-center min-h-[160px] flex flex-col items-center justify-center">
            <h3 className="font-serif text-xl md:text-2xl font-bold text-[#7A2454] leading-tight">
              Meet the students at Aga Khan Academy Nairobi
            </h3>
            <p className="mt-3 text-sm font-semibold text-gray-700 tracking-[0.12em] uppercase">
              Coming soon
            </p>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-[#FFF6FB] to-[#FFEAF4] shadow-md shadow-[#EB89B5]/10 p-6 md:p-7 text-center min-h-[160px] flex flex-col items-center justify-center">
            <h3 className="font-serif text-xl md:text-2xl font-bold text-[#7A2454] leading-tight">
              Meet the students at Mission San Jose High School
            </h3>
            <p className="mt-3 text-sm font-semibold text-gray-700 tracking-[0.12em] uppercase">
              Coming soon
            </p>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-[#FFF6FB] to-[#FFEAF4] shadow-md shadow-[#EB89B5]/10 p-6 md:p-7 text-center min-h-[160px] flex flex-col items-center justify-center">
            <h3 className="font-serif text-xl md:text-2xl font-bold text-[#7A2454] leading-tight">
              Meet the students at Wethersfield High School
            </h3>
            <p className="mt-3 text-sm font-semibold text-gray-700 tracking-[0.12em] uppercase">
              Coming soon
            </p>
          </div>
        </div>

        {/* CVU page context */}
        <div className="mt-8 max-w-7xl mx-auto mb-4 rounded-xl bg-[#FFF8D2] border border-[#EB89B5]/30 py-3 px-4 text-center shadow-sm">
          <p className="text-sm md:text-base font-semibold text-[#7A2454] tracking-wide uppercase">
            You are viewing the CVU page
          </p>
        </div>

        {/* Petition Notice */}
        <div className="mt-8 mb-12 p-5 md:p-7 bg-[#FFD7E9] border-l-4 border-[#EB89B5] rounded-r-lg max-w-5xl mx-auto">
          <div className="flex items-center gap-3 md:gap-4">
            <svg className="w-6 h-6 md:w-7 md:h-7 text-[#EB89B5] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-[#EB89B5] font-semibold text-sm md:text-lg">
                Please sign our petition in support of education! Visit the <Link href="/involved" className="underline hover:text-[#C76B99]">Get Involved</Link> page to show your support.
              </p>
            </div>
          </div>
        </div>

        <div className="my-12 md:my-16 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#EB89B5]">
            Thank you for your support
          </h2>
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-[#FFF8D2] text-gray-800 py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-700">
            © 2024 HER - Her Education Required | CVU Student Club
          </p>
        </div>
      </footer>
    </div>
  )
}