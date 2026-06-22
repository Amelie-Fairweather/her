import Link from 'next/link'

const HER_FORM_EMBED_URL =
  'https://docs.google.com/forms/d/1uCjsP-O7k6S3d_As3J2pampyR4RJQ0K7z5-txtg6EfA/viewform?embedded=true'

const herOffers = [
  {
    title: 'National recognition',
    description:
      'Stand out as a founder of a recognized HER chapter — leadership that reads on college applications, resumes, and awards.',
  },
  {
    title: 'A powerful network',
    description:
      'Connect with student leaders, journalists, educators, and activists across the country who share your commitment to women’s rights.',
  },
  {
    title: 'Real-world leadership',
    description:
      'Run meetings, host events, lead campaigns, and speak publicly — experience that builds confidence and credibility.',
  },
  {
    title: 'Media & platform',
    description:
      'Gain visibility through HER’s press coverage, social channels, and high-profile AMAs with nationally known figures.',
  },
  {
    title: 'Mentorship & support',
    description:
      'Learn from established chapters, receive guidance from HER leadership, and join a community that backs your work.',
  },
  {
    title: 'A mission that matters',
    description:
      'Be part of the movement to make women’s history a required part of the curriculum — change that lasts beyond high school.',
  },
]

const youOffer = [
  {
    title: 'Launch a chapter',
    description:
      'Bring HER to your high school and build a team of students committed to education and advocacy.',
  },
  {
    title: 'Advocate locally',
    description:
      'Push for women’s history in your district, engage administrators, and rally community support.',
  },
  {
    title: 'Organize & inspire',
    description:
      'Plan events, workshops, and conversations that educate your peers and grow awareness on campus.',
  },
  {
    title: 'Represent HER',
    description:
      'Show up at conferences, collaborate with other chapters, and help expand the network nationwide.',
  },
  {
    title: 'Lead with integrity',
    description:
      'Model inclusive leadership, communicate professionally, and uphold HER’s values in everything you do.',
  },
  {
    title: 'Drive the movement forward',
    description:
      'Your energy, ideas, and persistence are what turn one school’s effort into a national student-led force.',
  },
]

export default function ApplyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFBF3] to-[#FFF8D2]">
      <header className="bg-[#EB89B5] text-white py-10 md:py-14 px-4">
        <div className="max-w-6xl mx-auto">
          <Link href="/" className="inline-block mb-5 text-pink-100 hover:text-white transition-colors text-sm font-semibold tracking-wide">
            ← Back to Home
          </Link>
          <p className="text-xs md:text-sm font-bold uppercase tracking-[0.28em] text-pink-100 mb-3">
            Fall 2026 Chapter Applications
          </p>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight max-w-3xl">
            Start a HER Chapter at Your School
          </h1>
          <p className="mt-4 text-lg md:text-xl opacity-95 max-w-2xl leading-relaxed">
            Join student leaders across the country fighting for women&apos;s history in the classroom.
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
          <section className="bg-white rounded-2xl shadow-xl shadow-[#EB89B5]/10 border border-[#EB89B5]/15 overflow-hidden">
            <div className="bg-gradient-to-r from-[#7A2454] to-[#EB89B5] px-6 py-5 md:px-8 md:py-6">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-pink-100 mb-1">
                For you
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                What HER can do for you
              </h2>
            </div>
            <ul className="divide-y divide-[#EB89B5]/10">
              {herOffers.map((item) => (
                <li key={item.title} className="px-6 py-5 md:px-8 md:py-6 hover:bg-[#FFF6FB] transition-colors">
                  <h3 className="text-lg font-bold text-[#7A2454] mb-1.5">{item.title}</h3>
                  <p className="text-gray-700 text-sm md:text-base leading-relaxed">{item.description}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-white rounded-2xl shadow-xl shadow-[#EB89B5]/10 border border-[#EB89B5]/15 overflow-hidden">
            <div className="bg-gradient-to-r from-[#EB89B5] to-[#FFD7E9] px-6 py-5 md:px-8 md:py-6">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#7A2454]/80 mb-1">
                For the movement
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-[#7A2454]">
                What you can do for HER
              </h2>
            </div>
            <ul className="divide-y divide-[#EB89B5]/10">
              {youOffer.map((item) => (
                <li key={item.title} className="px-6 py-5 md:px-8 md:py-6 hover:bg-[#FFF6FB] transition-colors">
                  <h3 className="text-lg font-bold text-[#7A2454] mb-1.5">{item.title}</h3>
                  <p className="text-gray-700 text-sm md:text-base leading-relaxed">{item.description}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="bg-white rounded-2xl shadow-xl shadow-[#EB89B5]/15 border border-[#EB89B5]/20 overflow-hidden">
          <div className="px-6 py-6 md:px-10 md:py-8 border-b border-[#EB89B5]/15 bg-[#FFF6FB] text-center">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#EB89B5] mb-2">
              Chapter registration
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-[#7A2454]">
              Complete your application below
            </h2>
            <p className="mt-2 text-gray-600 max-w-xl mx-auto">
              Tell us about yourself, your school, and your co-leaders. We&apos;ll be in touch about next steps.
            </p>
          </div>
          <div className="w-full bg-white">
            <iframe
              src={HER_FORM_EMBED_URL}
              width="100%"
              height="1100"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              title="Her Education Required club registration form"
              className="w-full min-h-[900px] md:min-h-[1100px]"
            >
              Loading…
            </iframe>
          </div>
        </section>
      </main>
    </div>
  )
}
