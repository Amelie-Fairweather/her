'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import JoinForm from '@/components/JoinForm'

export default function Involved() {
  const [showJoinForm, setShowJoinForm] = useState(false)
  const involvementOptions = [
    {
      title: "Join Our Club",
      description: "Become an official HER member and participate in regular meetings and activities. This is open to ALL CVU students, room 134 on Wednesdays!!",
      icon: (
        <svg className="w-8 h-8 text-[#EB89B5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      ),
      benefits: ["Regular club meetings", "YOUR SUPPORT IS CRUCIAL TO OUR CAUSE", "Leadership opportunities"]
    },
    {
      title: "Volunteer at Events",
      description: "Help us organize and run our events, workshops, and community activities. Check the upcoming events! ",
      icon: (
        <svg className="w-8 h-8 text-[#EB89B5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      benefits: ["Event planning experience", "Fundraising experience", "Networking opportunities", "Skill development"]
    },
    {
      title: "Help us advocate!",
      description: "If you are interested in helping us advocate for the required unit, please contact us at hereducationrequired@gmail.com. Or refer anyone of interest.",
      icon: (
        <svg className="w-8 h-8 text-[#EB89B5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      benefits: ["Help us move towards our goal", "Required unit"]
    },
    {
      title: "Social Media & Outreach",
      description: "Help us spread awareness through social media, flyers, and community outreach.",
      icon: (
        <svg className="w-8 h-8 text-[#EB89B5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011-1h2a1 1 0 011 1v22a1 1 0 01-1 1h-2a1 1 0 01-1-1V4M7 4V1a1 1 0 00-1-1H4a1 1 0 00-1 1v22a1 1 0 001 1h2a1 1 0 001-1V4m8 8h2m-2 4h2m-8-4h2m-2 4h2m-8-4h2m-2 4h2" />
        </svg>
      ),
      benefits: ["You can follow us on Instagram at @her_hereducationrequired", "Sign up for our email list (written by students)"]
    }
  ]

  // Removed unused leadershipRoles array

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFBF3] to-[#FFF8D2]">
      {/* Header */}
      <header className="bg-[#EB89B5] text-white py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-block mb-4 text-pink-100 hover:text-white transition-colors">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold mb-2">Get Involved</h1>
          <p className="text-lg opacity-90">Join our community and help us make a difference in education</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 md:py-16">
        {/* Petition Notice */}
        <div className="mb-16 p-4 md:p-8 bg-white border-4 border-[#EB89B5] rounded-lg shadow-lg max-w-4xl mx-auto">
          <div className="text-center">
            <h2 className="text-lg md:text-2xl font-bold text-[#EB89B5] mb-4">
              SHOW YOUR SUPPORT BY SIGNING OUR PETITION IN SUPPORT OF EDUCATION
            </h2>
            <a 
              href="https://docs.google.com/document/d/1VGe4JnrzEtrg9oV6BK7Taaub3hooeU8LjgWIXgC7gNk/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#EB89B5] text-white px-6 md:px-8 py-2 md:py-3 rounded-lg font-semibold hover:bg-[#C76B99] transition-colors shadow-lg hover:shadow-xl text-sm md:text-base"
            >
              Sign Our Petition
            </a>
          </div>
        </div>

        {/* How to Get Involved */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8 text-center">Ways to Get Involved</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Students Box */}
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-bold text-[#EB89B5] mb-4">For Students</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-bold text-gray-800 mb-2">Join Our Club</h4>
                  <p className="text-gray-600 mb-3">Become an official HER member and participate in regular meetings and activities. This is open to ALL CVU students, room 134 on Wednesdays!!</p>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#EB89B5] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Regular club meetings
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#EB89B5] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      YOUR SUPPORT IS CRUCIAL TO OUR CAUSE
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-800 mb-2">Volunteer at Events</h4>
                  <p className="text-gray-600 mb-3">Help us organize and run our events, workshops, and community activities. Check the upcoming events!</p>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#EB89B5] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Event planning experience
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#EB89B5] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Fundraising experience
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#EB89B5] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Networking opportunities
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#EB89B5] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Skill development
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Adults Box */}
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-bold text-[#EB89B5] mb-4">For Adults</h3>
              <div className="space-y-3">
                <p className="text-gray-600">There are many ways you can support our cause:</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-[#EB89B5] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Sign the petition</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-[#EB89B5] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <span>Write emails to state representatives, senators and Becca Balint&apos;s office</span>
                      <br />
                      <span className="text-[#EB89B5] font-semibold">(CC hereducationrequired@gmail.com)</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-[#EB89B5] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <span>Write emails to teachers, principals and other faculty at your local high schools</span>
                      <br />
                      <span className="text-[#EB89B5] font-semibold">(CC hereducationrequired@gmail.com)</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-[#EB89B5] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Post about us on Front Porch Forum, Instagram, and write op eds</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-[#EB89B5] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Inform reporters about our cause</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-[#EB89B5] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Attend our events and contact us at <a href="mailto:hereducationrequired@gmail.com" className="text-[#EB89B5] hover:text-[#C76B99] underline">hereducationrequired@gmail.com</a> if you have ideas or questions</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* How to Support */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto">
            {/* How to Support */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-bold text-[#EB89B5] mb-6">How to Support</h2>
              <div className="space-y-4 mb-6">
                <p className="text-gray-700">
                  If you are an adult who would like to support, please reach out to the club email. 
                  Refer as many people as possible, as students, your support is so inspiring. We are also accepting donations!
                </p>
              </div>
              
              {/* Fundraising Progress */}
              <div className="bg-[#FFFBF3] rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Fundraising Progress</h3>
                <div className="flex items-center justify-center mb-4">
                  <div className="relative w-32 h-32">
                    {/* Pie Chart */}
                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                      {/* Background circle */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#FFD7E9"
                        strokeWidth="8"
                      />
                      {/* Progress circle */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#EB89B5"
                        strokeWidth="8"
                        strokeDasharray={`${2 * Math.PI * 40}`}
                        strokeDashoffset={`${2 * Math.PI * 40 * (1 - 730 / 1000)}`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[#EB89B5]">$730</div>
                        <div className="text-sm text-gray-600">of $1000</div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-center text-gray-600 text-sm mb-4">
                  This money helps us organize more events to help promote the inclusion of women&apos;s rights.
                </p>
                <div className="text-center">
                  <p className="text-gray-700 font-semibold mb-2">Money can be accepted via Venmo to:</p>
                  <p className="text-[#EB89B5] font-bold text-lg">@Ameliefairweather7</p>
                  <p className="text-gray-600 text-sm">Please specify &quot;donation&quot; in the message</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Club Members Message and Photo */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-6">
              <p className="text-lg md:text-xl text-gray-700 text-center leading-relaxed">
                We club members ask that you hear our mission, and that you consider it <span className="text-[#EB89B5] font-bold">your responsibility to push forward change</span>. Write emails, attend events, and support not only us but also your daughters, sisters, mothers, and the women around you. They deserve education and a full understanding of their rights as women.
              </p>
            </div>
            <div className="max-w-3xl mx-auto">
              <Image
                src="/clurb.HEIC"
                alt="HER Club members"
                width={800}
                height={600}
                className="w-full h-auto rounded-lg object-cover shadow-lg"
                style={{ aspectRatio: '4/3' }}
              />
            </div>
          </div>
        </section>

        {/* Email List Signup */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <p className="text-lg md:text-xl text-gray-700 text-center leading-relaxed mb-6">
              Join our student written email list that keeps members informed on actions and events taking place.
            </p>
            <div className="flex justify-center">
              <button 
                onClick={() => setShowJoinForm(true)}
                className="inline-block bg-[#EB89B5] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#C76B99] transition-colors shadow-lg hover:shadow-xl"
              >
                Join Now
              </button>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Ready to Make a Difference?</h2>
          <p className="text-base md:text-lg text-gray-600 mb-6">
            Join HER today and be part of the movement to ensure women&apos;s voices are heard in education.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/events" 
              className="inline-block bg-[#EB89B5] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#C76B99] transition-colors shadow-lg hover:shadow-xl"
            >
              View Upcoming Events
            </Link>
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

      {/* Join Form Modal */}
      {showJoinForm && (
        <JoinForm onClose={() => setShowJoinForm(false)} />
      )}
    </div>
  )
}
