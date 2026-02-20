import Link from 'next/link'
import Image from 'next/image'

export default function WakeRobinRecap() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFBF3] to-[#FFF8D2]">
      {/* Header */}
      <header className="bg-[#EB89B5] text-white py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/events" className="inline-block mb-4 text-pink-100 hover:text-white transition-colors">
            ← Back to Events
          </Link>
          <h1 className="text-4xl font-bold mb-2">Event Recap</h1>
          <p className="text-lg opacity-90">Recap of the Presentation at Wake Robin</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 md:py-16">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Event Recap</h2>
          <p className="text-lg text-gray-600 mb-8">
            Recap of the Presentation at Wake Robin held on February 9, 2026. HER club members presented to the Wake Robin community about our mission and women's history education.
          </p>
          <div className="mt-6">
            <a
              href="https://docs.google.com/document/d/1IDgEAdsMd3uK8O0vdXzD01IXmYtpEFoZra_ABqgKQQA/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#EB89B5] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#C76B99] transition-colors shadow-md hover:shadow-lg"
            >
              View discussion questions
            </a>
          </div>
        </div>

        {/* Event Images Collage */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-4 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#EB89B5] text-center mb-6">
            EVENT PHOTOS
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {/* Image 03 */}
            <div className="relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Image
                src="/03.JPG"
                alt="HER Club presentation at Wake Robin"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
            
            {/* Image 17 */}
            <div className="relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Image
                src="/17.JPG"
                alt="HER Club presentation at Wake Robin"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
            
            {/* Talk Image */}
            <div className="relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Image
                src="/talk.jpeg"
                alt="HER Club presentation at Wake Robin"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
            
            {/* Mad Image */}
            <div className="relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Image
                src="/mad.jpeg"
                alt="HER Club presentation at Wake Robin"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
            
            {/* Paper Image */}
            <div className="relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Image
                src="/paper.jpeg"
                alt="HER Club presentation at Wake Robin"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
            
            {/* Image 10 */}
            <div className="relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Image
                src="/10.JPG"
                alt="HER Club presentation at Wake Robin"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
            
            {/* Image 11 */}
            <div className="relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Image
                src="/11.JPG"
                alt="HER Club presentation at Wake Robin"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
            
            {/* Image 13 */}
            <div className="relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Image
                src="/13.JPG"
                alt="HER Club presentation at Wake Robin"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
            
            {/* Image 14 */}
            <div className="relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Image
                src="/14.JPG"
                alt="HER Club presentation at Wake Robin"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
            
            {/* Image 18 */}
            <div className="relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Image
                src="/18.JPG"
                alt="HER Club presentation at Wake Robin"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
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
