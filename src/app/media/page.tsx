import Link from 'next/link'

const mediaArticles = [
  {
    title: "CVU Students Demand More Women's History",
    source: "The Citizen",
    description: "Coverage of CVU students advocating for expanded women's history education in the school curriculum.",
    url: "https://www.vtcng.com/shelburnenews/community/school_news/cvu-students-demand-more-women-s-history/article_144a3891-74b0-45d7-ab1d-7b23881c6f47.html",
    type: "article"
  },
  {
    title: "CVU Students Push for Women's History Curriculum",
    source: "WCAX News",
    description: "Local news coverage featuring HER club members discussing the importance of women's history education.",
    url: "https://www.wcax.com/2025/11/17/cvu-students-push-womens-history-curriculum/",
    type: "video"
  },
  {
    title: "High Schoolers Advocate for Women's History",
    source: "The Hinesburg Record",
    description: "Community newspaper article highlighting student efforts to include women's history in required curriculum.",
    url: "https://www.hinesburgrecord.org/p/high-schoolers-advocate-for-womens",
    type: "article"
  },
  {
    title: "CVU Students Advocate for Women's History Representation",
    source: "The Williston Observer",
    description: "Feature story on HER club's mission to ensure women's history is properly represented in education.",
    url: "https://www.willistonobserver.com/community/schools/cvu-students-advocate-for-women-s-history-representation/article_2f6eec72-d3dc-4956-b947-448b582b7f6c.html",
    type: "article"
  },
  {
    title: "HER Club Feature - Media Factory",
    source: "Media Factory CVSD",
    description: "Video feature documenting the HER club's activities and advocacy for women's history education.",
    extraInfo: "Skip ahead to 11:30 for our segment.",
    url: "https://www.mediafactory.org/cvsd?modal=48,episode,238683",
    type: "video"
  },
  {
    title: "CVU Students Push for Women's History Curriculum",
    source: "Vermont State Youth Council",
    description: "Featured in the VSYC newsletter's Youth Changemakers section, highlighting HER club's mission to include women's history in the curriculum.",
    url: "https://www.vtstateyouthcouncil.org/updates/1",
    type: "article"
  },
  {
    title: "High Schoolers Advocate for Women's History Curriculum",
    source: "The Charlotte News",
    description: "Coverage of HER club's event at Pierson Library, featuring student presentations and community outreach efforts to expand women's history education.",
    url: "https://www.charlottenewsvt.org/2026/01/15/high-schoolers-advocate-for-womens-history-curriculum/",
    type: "article"
  }
]

export default function MediaCoverage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFBF3] to-[#FFF8D2]">
      {/* Header */}
      <header className="bg-[#EB89B5] text-white py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-block mb-4 text-pink-100 hover:text-white transition-colors">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold mb-2">Media Coverage</h1>
          <p className="text-lg opacity-90">News articles and videos featuring HER&apos;s mission</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 md:py-16">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">In The News</h2>
          <p className="text-gray-600">
            Our mission to include women&apos;s history in the curriculum has been featured in local news outlets. 
            Check out the coverage below to learn more about our advocacy efforts.
          </p>
        </div>

        {/* Media Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mediaArticles.map((article, index) => (
            <a
              key={index}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent hover:border-[#EB89B5]"
            >
              {/* Card Header with Type Badge */}
              <div className="bg-gradient-to-r from-[#FFD7E9] to-[#FFF0F5] p-4 flex items-center justify-between">
                <span className="text-sm font-semibold text-[#EB89B5] uppercase tracking-wide">
                  {article.source}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  article.type === 'video' 
                    ? 'bg-[#EB89B5] text-white' 
                    : 'bg-white text-[#EB89B5] border border-[#EB89B5]'
                }`}>
                  {article.type === 'video' ? '▶ Video' : '📄 Article'}
                </span>
              </div>
              
              {/* Card Body */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-[#EB89B5] transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {article.description}
                  {article.extraInfo && (
                    <> Skip ahead to <span className="font-bold">11:30</span> for our segment.</>
                  )}
                </p>
                <div className="flex items-center text-[#EB89B5] font-semibold text-sm">
                  <span>Read more</span>
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8 text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-3">Are you a reporter?</h3>
          <p className="text-gray-600 mb-4">
            We&apos;d love to share our story with more people. Contact us to learn about our mission.
          </p>
          <p className="text-[#EB89B5] font-semibold">
            Email: hereducationrequired@gmail.com
          </p>
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

