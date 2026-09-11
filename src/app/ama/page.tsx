import Link from 'next/link'
import Image from 'next/image'
import AmaSpeakerForm from '@/components/AmaSpeakerForm'

const pastAmas = [
  {
    name: 'Steve Stecklow',
    role: '3-time Pulitzer Prize–winning investigative journalist at Reuters',
    date: 'September 2026',
    detail:
      'High schoolers across HER chapters joined a live AMA with Steve Stecklow — asking about investigative reporting, career paths in journalism, and how young people can hold power to account.',
    photoUrl: '/steve-stecklow-ama.png',
    photoAlt: 'HER students in a virtual AMA with Steve Stecklow',
  },
  {
    name: 'Rubina Fillion',
    role: 'Head of AI Initiatives at The New York Times',
    date: 'June 5, 2026',
    detail:
      'Students sat down with Rubina Fillion for a conversation on AI, journalism, and leadership — getting direct mentorship from someone shaping how newsrooms use emerging technology.',
    photoUrl: '/rubina-ama-screenshot.png',
    photoAlt: 'Screenshot from the HER AMA with Rubina Fillion',
  },
  {
    name: 'Jodi Kantor',
    role: 'Pulitzer Prize–winning journalist at The New York Times',
    date: 'May 12, 2026',
    detail:
      'HER co-hosted an AMA with Jodi Kantor on investigative reporting, women in leadership, and what it takes to tell stories that change institutions.',
    photoUrl: '/jodi-kantor-ama.png',
    photoAlt: 'HER students in a virtual AMA with Jodi Kantor',
    instagramUrl: 'https://www.instagram.com/hereducationrequired/',
  },
]

export default function AmaPage() {
  return (
    <div className="min-h-screen bg-[#FFFBF3]">
      <header className="bg-[#EB89B5] text-white py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-block mb-4 text-pink-100 hover:text-white transition-colors">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold mb-2">Ask Me Anything</h1>
          <p className="text-lg opacity-90">
            Mentorship for high schoolers — live conversations with world-class guests
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-10 md:py-16">
        <section className="mb-12 bg-white rounded-2xl shadow-lg border border-[#EB89B5]/15 p-6 md:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#EB89B5] mb-3">Our initiative</p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#7A2454] mb-4">
            Mentoring the next generation of leaders
          </h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              HER launched and organizes an Ask Me Anything initiative that connects students in our
              organization — high schoolers leading chapters around the world — with mentors they would
              rarely get to meet otherwise. These are not lectures. They are live, student-driven
              conversations where young people ask hard questions, hear unfiltered career stories, and
              leave with advice they can use.
            </p>
            <p>
              Through this program, HER has hosted AMAs with{' '}
              <span className="font-semibold text-[#7A2454]">Jodi Kantor</span> (Pulitzer Prize–winning
              journalist at The New York Times),{' '}
              <span className="font-semibold text-[#7A2454]">Steve Stecklow</span> (three-time Pulitzer
              Prize–winning journalist for Reuters), and{' '}
              <span className="font-semibold text-[#7A2454]">Rubina Fillion</span> (Head of AI Initiatives
              at The New York Times) — bringing investigative reporting, journalism excellence, and AI
              leadership into the same room as student organizers.
            </p>
            <p>
              Chapters join virtually from classrooms and living rooms across our network. One guest.
              Dozens of high school voices. Real mentorship at scale.
            </p>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              href="/apply"
              className="inline-flex justify-center items-center rounded-xl bg-[#EB89B5] text-white px-6 py-3 font-semibold hover:bg-[#7A2454] transition-colors"
            >
              Start a chapter to join
            </Link>
            <a
              href="#apply-speaker"
              className="inline-flex justify-center items-center rounded-xl border-2 border-[#EB89B5] text-[#EB89B5] px-6 py-3 font-semibold hover:bg-[#FFD7E9] transition-colors"
            >
              Apply to be a speaker
            </a>
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl md:text-3xl font-bold text-[#7A2454] mb-6">Past AMAs</h2>
          <div className="space-y-6">
            {pastAmas.map((ama) => (
              <article
                key={ama.name}
                className="bg-white rounded-2xl shadow-lg border border-[#EB89B5]/15 overflow-hidden"
              >
                <div className="p-6 md:p-8">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#EB89B5] mb-2">{ama.date}</p>
                  <h3 className="text-xl md:text-2xl font-bold text-[#7A2454]">{ama.name}</h3>
                  <p className="text-sm md:text-base text-[#EB89B5] font-semibold mt-1">{ama.role}</p>
                  <p className="mt-3 text-gray-700 leading-relaxed">{ama.detail}</p>
                  {'instagramUrl' in ama && ama.instagramUrl && (
                    <a
                      href={ama.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-4 text-sm font-bold text-[#EB89B5] underline underline-offset-4 hover:text-[#7A2454]"
                    >
                      Watch on Instagram →
                    </a>
                  )}
                </div>
                {'photoUrl' in ama && ama.photoUrl && (
                  <div className="relative w-full aspect-[16/10] bg-[#FFD7E9]">
                    <Image
                      src={ama.photoUrl}
                      alt={ama.photoAlt || ama.name}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, 896px"
                    />
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* Form embed goes here later */}
        <section
          id="apply-speaker"
          className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#7A2454] via-[#9B3A6E] to-[#EB89B5] px-6 py-16 md:px-14 md:py-24 text-center shadow-[0_32px_80px_-28px_rgba(122,36,84,0.6)]"
        >
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.35),transparent_45%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.2),transparent_40%)]" />
          <div className="relative max-w-3xl mx-auto">
            <p className="text-sm md:text-base font-bold uppercase tracking-[0.28em] text-white/85 mb-5">
              Mentorship opportunity
            </p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.05] tracking-tight mb-6">
              Apply to be an AMA speaker
            </h2>
            <p className="text-lg md:text-xl text-white/95 leading-relaxed mb-10 max-w-2xl mx-auto">
              Be part of HER&apos;s Ask Me Anything initiative — fill out this application and hear back within
              the following week. We welcome all ages and backgrounds, and we&apos;re looking for changemakers
              and innovators with experience across different fields.
            </p>

            <AmaSpeakerForm />
          </div>
        </section>
      </main>

      <footer className="bg-[#FFFBF3] text-gray-800 py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-700">
            © {new Date().getFullYear()} HER — Her Education Required | Global Youth Network
          </p>
        </div>
      </footer>
    </div>
  )
}
