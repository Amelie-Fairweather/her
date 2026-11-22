import Link from 'next/link'
import HerChapterMapLoader from '@/components/HerChapterMapLoader'
import HomeParallaxHero from '@/components/HomeParallaxHero'
import IdeaSubmissionForm from '@/components/IdeaSubmissionForm'
import CommunitySlideshow from '@/components/CommunitySlideshow'
import Herstory101Section from '@/components/Herstory101Section'
import HistoryByHerAnnouncement from '@/components/HistoryByHerAnnouncement'
import HistoryByHerImpactStats from '@/components/HistoryByHerImpactStats'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FFFBF3] overflow-x-hidden">
      <HistoryByHerAnnouncement />
      <HomeParallaxHero />

      <main className="max-w-7xl mx-auto px-4 pt-0 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-8 max-w-6xl mx-auto">
          <Link href="/about" className="group">
            <div className="bg-white/95 rounded-2xl shadow-[0_16px_40px_-24px_rgba(122,36,84,0.35)] p-6 md:p-10 text-center hover:shadow-[0_24px_50px_-20px_rgba(122,36,84,0.4)] transition-all duration-300 transform hover:-translate-y-2 border border-[#EB89B5]/15 hover:border-[#EB89B5]/45 h-[240px] md:h-[320px] flex flex-col justify-center">
              <div className="w-14 h-14 md:w-20 md:h-20 bg-[#FFD7E9] rounded-full flex items-center justify-center mx-auto mb-4 md:mb-5 group-hover:bg-[#EB89B5] transition-colors">
                <svg className="w-7 h-7 md:w-10 md:h-10 text-[#EB89B5] group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h3 className="text-base md:text-2xl font-bold text-gray-800 mb-2 md:mb-3">About Us</h3>
              <p className="text-sm md:text-lg text-gray-600 group-hover:text-gray-700 leading-snug px-1">
                Learn about our mission, values, and the passionate students behind HER.
              </p>
            </div>
          </Link>

          <Link href="/history-by-her" className="group">
            <div className="bg-white/95 rounded-2xl shadow-[0_16px_40px_-24px_rgba(122,36,84,0.35)] p-6 md:p-10 text-center hover:shadow-[0_24px_50px_-20px_rgba(122,36,84,0.4)] transition-all duration-300 transform hover:-translate-y-2 border border-[#EB89B5]/15 hover:border-[#EB89B5]/45 h-[240px] md:h-[320px] flex flex-col justify-center">
              <div className="w-14 h-14 md:w-20 md:h-20 bg-[#FFD7E9] rounded-full flex items-center justify-center mx-auto mb-4 md:mb-5 group-hover:bg-[#EB89B5] transition-colors">
                <svg className="w-7 h-7 md:w-10 md:h-10 text-[#EB89B5] group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-base md:text-2xl font-bold text-gray-800 mb-2 md:mb-3">History by HER</h3>
              <p className="text-sm md:text-lg text-gray-600 group-hover:text-gray-700 leading-snug px-1">
                New volunteer initiative — print bookmarks and donate them to local schools and libraries.
              </p>
              <HistoryByHerImpactStats variant="card" />
            </div>
          </Link>

          <Link href="/involved" className="group">
            <div className="bg-white/95 rounded-2xl shadow-[0_16px_40px_-24px_rgba(122,36,84,0.35)] p-6 md:p-10 text-center hover:shadow-[0_24px_50px_-20px_rgba(122,36,84,0.4)] transition-all duration-300 transform hover:-translate-y-2 border border-[#EB89B5]/15 hover:border-[#EB89B5]/45 h-[240px] md:h-[320px] flex flex-col justify-center">
              <div className="w-14 h-14 md:w-20 md:h-20 bg-[#FFD7E9] rounded-full flex items-center justify-center mx-auto mb-4 md:mb-5 group-hover:bg-[#EB89B5] transition-colors">
                <svg className="w-7 h-7 md:w-10 md:h-10 text-[#EB89B5] group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-base md:text-2xl font-bold text-gray-800 mb-2 md:mb-3">Get Involved</h3>
              <p className="text-sm md:text-lg text-gray-600 group-hover:text-gray-700 leading-snug px-1">
                Join our community and help us make a difference in education.
              </p>
            </div>
          </Link>

          <Link href="/scholarship" className="group">
            <div className="bg-white/95 rounded-2xl shadow-[0_16px_40px_-24px_rgba(122,36,84,0.35)] p-6 md:p-10 text-center hover:shadow-[0_24px_50px_-20px_rgba(122,36,84,0.4)] transition-all duration-300 transform hover:-translate-y-2 border border-[#EB89B5]/15 hover:border-[#EB89B5]/45 h-[240px] md:h-[320px] flex flex-col justify-center">
              <div className="w-14 h-14 md:w-20 md:h-20 bg-[#FFD7E9] rounded-full flex items-center justify-center mx-auto mb-4 md:mb-5 group-hover:bg-[#EB89B5] transition-colors">
                <svg className="w-7 h-7 md:w-10 md:h-10 text-[#EB89B5] group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-base md:text-2xl font-bold text-gray-800 mb-2 md:mb-3">Scholarship Fund</h3>
              <p className="text-sm md:text-lg text-gray-600 group-hover:text-gray-700 leading-snug px-1">
                Support our efforts to advance high school girls&apos; access to higher education
              </p>
            </div>
          </Link>

          <Link href="/media" className="group">
            <div className="bg-white/95 rounded-2xl shadow-[0_16px_40px_-24px_rgba(122,36,84,0.35)] p-6 md:p-10 text-center hover:shadow-[0_24px_50px_-20px_rgba(122,36,84,0.4)] transition-all duration-300 transform hover:-translate-y-2 border border-[#EB89B5]/15 hover:border-[#EB89B5]/45 h-[240px] md:h-[320px] flex flex-col justify-center">
              <div className="w-14 h-14 md:w-20 md:h-20 bg-[#FFD7E9] rounded-full flex items-center justify-center mx-auto mb-4 md:mb-5 group-hover:bg-[#EB89B5] transition-colors">
                <svg className="w-7 h-7 md:w-10 md:h-10 text-[#EB89B5] group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="text-base md:text-2xl font-bold text-gray-800 mb-2 md:mb-3">Media Coverage</h3>
              <p className="text-sm md:text-lg text-gray-600 group-hover:text-gray-700 leading-snug px-1">
                News articles and videos featuring our mission.
              </p>
            </div>
          </Link>

          <Link href="/ama" className="group">
            <div className="bg-white/95 rounded-2xl shadow-[0_16px_40px_-24px_rgba(122,36,84,0.35)] p-6 md:p-10 text-center hover:shadow-[0_24px_50px_-20px_rgba(122,36,84,0.4)] transition-all duration-300 transform hover:-translate-y-2 border border-[#EB89B5]/15 hover:border-[#EB89B5]/45 h-[240px] md:h-[320px] flex flex-col justify-center">
              <div className="w-14 h-14 md:w-20 md:h-20 bg-[#FFD7E9] rounded-full flex items-center justify-center mx-auto mb-4 md:mb-5 group-hover:bg-[#EB89B5] transition-colors">
                <svg className="w-7 h-7 md:w-10 md:h-10 text-[#EB89B5] group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-base md:text-2xl font-bold text-gray-800 mb-2 md:mb-3">Ask Me Anything</h3>
              <p className="text-sm md:text-lg text-gray-600 group-hover:text-gray-700 leading-snug px-1">
                Live conversations with journalists, leaders, and changemakers.
              </p>
            </div>
          </Link>

          <Link href="/contact" className="group">
            <div className="bg-white/95 rounded-2xl shadow-[0_16px_40px_-24px_rgba(122,36,84,0.35)] p-6 md:p-10 text-center hover:shadow-[0_24px_50px_-20px_rgba(122,36,84,0.4)] transition-all duration-300 transform hover:-translate-y-2 border border-[#EB89B5]/15 hover:border-[#EB89B5]/45 h-[240px] md:h-[320px] flex flex-col justify-center">
              <div className="w-14 h-14 md:w-20 md:h-20 bg-[#FFD7E9] rounded-full flex items-center justify-center mx-auto mb-4 md:mb-5 group-hover:bg-[#EB89B5] transition-colors">
                <svg className="w-7 h-7 md:w-10 md:h-10 text-[#EB89B5] group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-base md:text-2xl font-bold text-gray-800 mb-2 md:mb-3">Contact Us</h3>
              <p className="text-sm md:text-lg text-gray-600 group-hover:text-gray-700 leading-snug px-1">
                Reach HER for questions, press, partnerships, or chapter support.
              </p>
            </div>
          </Link>
        </div>

        <CommunitySlideshow />

        <div id="chapters-map" className="scroll-mt-8">
          <HerChapterMapLoader />
        </div>

        <Herstory101Section />

        <IdeaSubmissionForm />
      </main>

      <footer className="bg-[#FFFBF3] text-gray-800 py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-700">© {new Date().getFullYear()} HER — Her Education Required | Global Youth Network</p>
        </div>
      </footer>
    </div>
  )
}
