import Link from 'next/link'
import Image from 'next/image'

export default function EventRecap() {
  const eventPhotos = [
    '/county-02-olivia-cieri.jpg',
    '/county-05-vla.jpg',
    '/county-06-group.jpg',
    '/county-08-rice-crispie-treats.jpg',
    '/county-09-applause.jpg',
    '/county-13-amelie-gov-kunin.jpg',
    '/recap-17-applause.jpg',
    '/recap-57.jpg',
    '/recap-47.jpg',
    '/recap-34.jpg',
    '/recap-20.jpg',
    '/recap-19.jpg',
    '/recap-15-gov-kunin-speaks.jpg',
    '/recap-53.jpg',
    '/recap-21.jpg'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFBF3] to-[#FFF8D2]">
      {/* Header */}
      <header className="bg-[#EB89B5] text-white py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/events" className="inline-block mb-4 text-pink-100 hover:text-white transition-colors">
            ← Back to Events
          </Link>
          <h1 className="text-4xl font-bold mb-2">Event Recap</h1>
          <p className="text-lg opacity-90">Recap of the Event to Include Women in the Curriculum</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 md:py-16">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Event Recap</h2>
          <p className="text-lg text-gray-600 mb-8">
            Recap of the Event to Include Women in the Curriculum held on November 12, 2025.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="https://docs.google.com/presentation/d/1zpWPbF3Mq4Xi9_JoTawzYs3-vQ37vlJ3a9HUkoOFhGk/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#EB89B5] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#C76B99] transition-colors shadow-lg hover:shadow-xl text-center"
            >
              View Event Slides
            </a>
            <a
              href="https://docs.google.com/document/d/1ri3FWfUHuIv_q1TQEVups_hMjbLtmJJWS5f2aSWuELA/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#EB89B5] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#C76B99] transition-colors shadow-lg hover:shadow-xl text-center"
            >
              View Event Agenda
            </a>
            <a
              href="https://docs.google.com/document/d/1G1yA9qRNS43FGnqXz7bPo9m8SBHmsVhWo6nq_M_o4L4/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#EB89B5] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#C76B99] transition-colors shadow-lg hover:shadow-xl text-center"
            >
              View County-Wide Event Script
            </a>
          </div>
        </div>

        {/* Event Images Collage */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-4 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#EB89B5] text-center mb-6">
            EVENT PHOTOS
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {eventPhotos.map((photoPath) => (
              <div
                key={photoPath}
                className="relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <Image
                  src={photoPath}
                  alt="HER Club event photo"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
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

