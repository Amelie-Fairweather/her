import Link from 'next/link'
import ScholarshipTracker from '@/components/ScholarshipTracker'
import ScholarshipHero from '@/components/ScholarshipHero'

const GOFUNDME_URL =
  'https://www.gofundme.com/f/support-scholarships-and-womens-history-education'

const INSTAGRAM_URL = 'https://www.instagram.com/her_scholarshipfund/'

export default function ScholarshipPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFBF3] to-[#FFF8D2]">
      <ScholarshipHero />

      <main className="max-w-4xl mx-auto px-4 py-10 md:py-16">
        <section className="bg-white rounded-2xl shadow-lg p-6 md:p-10 mb-10">
          <div className="group relative inline-flex flex-col gap-1 pb-4 mb-6">
            <p className="text-sm md:text-base font-semibold uppercase tracking-[0.18em] text-[#EB89B5]">
              Introducing
            </p>
            <div className="flex flex-col sm:flex-row sm:items-end gap-1 sm:gap-3">
              <h2 className="font-serif text-2xl md:text-4xl font-bold text-[#EB89B5]">
                HER Education Required
              </h2>
              <h2 className="font-serif text-2xl md:text-4xl font-bold text-[#7A2454]">
                Scholarship Fund
              </h2>
            </div>
          </div>

          <div className="mb-8 rounded-2xl bg-[#FFF6FB] border border-[#EB89B5]/30 px-5 py-6 md:px-8 md:py-7 text-center">
            <p className="font-serif text-xl md:text-2xl font-bold text-[#7A2454]">
              Applications will be launched soon
            </p>
            <p className="mt-2 text-sm md:text-base text-gray-600">
              Follow along for eligibility details, deadlines, and the moment applications open.
            </p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center justify-center min-h-[48px] px-6 rounded-none bg-[#EB89B5] text-white text-sm md:text-base font-bold tracking-[0.08em] uppercase shadow-md border-2 border-[#EB89B5] transition-all duration-300 hover:bg-[#7A2454] hover:border-[#7A2454]"
            >
              Stay updated
            </a>
          </div>

          <div className="space-y-5 text-base md:text-lg text-gray-700 leading-relaxed">
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#7A2454]">
              Why this scholarship?
            </h3>
            <p>
              HER Education Required is a global, student-led network advocating for women&apos;s
              history to become a required part of the social studies curriculum. Through student
              chapters, educational programming, and advocacy initiatives, we empower young people to
              advance gender equity in education and ensure that women&apos;s contributions are no
              longer treated as optional history.
            </p>

            <p>
              To further our mission, we are launching the{' '}
              <strong className="text-[#7A2454]">HER Education Required Scholarship Fund</strong>,
              with an initial fundraising goal of{' '}
              <strong className="text-[#7A2454]">$10,000</strong>. This need-based scholarship is
              designed to help remove financial barriers to higher education while celebrating the
              voices and creativity of young women who are already making an impact in their
              communities.
            </p>

            <p>
              The scholarship is open exclusively to{' '}
              <strong className="text-[#7A2454]">high school juniors and seniors</strong> who are
              active members of HER Education Required through an existing chapter or by starting one
              in their school or community. Applicants will submit an original creative work—such as
              an essay, short story, poem, or visual art piece accompanied by a written artist&apos;s
              statement—exploring themes related to women&apos;s history, leadership, equality, or
              social change. Each application must also include a teacher letter of recommendation.
            </p>

            <p>
              Financial need will be the primary consideration during selection, with{' '}
              <strong className="text-[#7A2454]">
                parent or guardian income serving as the most significant factor
              </strong>
              . After reviewing applications, five finalists will be invited to participate in a
              virtual interview alongside one parent or guardian before the scholarship recipient is
              selected.
            </p>

            <p>
              To ensure a thoughtful and equitable review process, applications will be accepted until
              the published deadline or until{' '}
              <strong className="text-[#7A2454]">100 applications</strong> have been received,
              whichever comes first.
            </p>

            <p>
              By investing in the HER Education Required Scholarship Fund, donors are doing more than
              supporting one student&apos;s college education—they are investing in a generation of
              young women who are actively advocating for educational equity, preserving women&apos;s
              stories, and creating lasting change in their schools and communities. Every
              contribution directly expands educational opportunity while strengthening a student-led
              movement working to make history education more inclusive for future generations.
            </p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={GOFUNDME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center min-h-[52px] px-6 rounded-none bg-[#EB89B5] text-white text-sm md:text-base font-bold tracking-[0.08em] uppercase shadow-md border-2 border-[#EB89B5] transition-all duration-300 hover:bg-[#7A2454] hover:border-[#7A2454]"
            >
              Donate on GoFundMe
            </a>
            <Link
              href="/apply"
              className="inline-flex items-center justify-center min-h-[52px] px-6 rounded-none bg-white text-[#EB89B5] text-sm md:text-base font-bold tracking-[0.08em] uppercase border-2 border-[#EB89B5] transition-all duration-300 hover:bg-[#FFD7E9]"
            >
              Start a chapter
            </Link>
          </div>
        </section>

        <ScholarshipTracker showDetailsLink={false} />
      </main>
    </div>
  )
}
