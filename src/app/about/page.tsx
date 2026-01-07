import Link from 'next/link'
import Image from 'next/image'

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFBF3] to-[#FFF8D2]">
      {/* Header */}
      <header className="bg-[#EB89B5] text-white py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-block mb-4 text-pink-100 hover:text-white transition-colors">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold mb-2">About HER</h1>
          <p className="text-lg opacity-90">Learn about our mission and the students behind the movement</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 md:py-16">
        {/* Resources Section */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-lg p-4 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6 text-center">Resources</h2>
            <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 text-center">
              Explore our educational materials and curriculum plans for implementing women&apos;s history in schools.
            </p>
            <div className="grid grid-cols-3 gap-2 md:gap-6">
              {/* KUD Link */}
              <div className="text-center">
                <div className="w-10 h-10 md:w-16 md:h-16 bg-[#FFD7E9] rounded-full flex items-center justify-center mx-auto mb-2 md:mb-4">
                  <svg className="w-5 h-5 md:w-8 md:h-8 text-[#EB89B5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xs md:text-xl font-bold text-[#EB89B5] mb-1 md:mb-3">KUD</h3>
                <p className="text-[10px] md:text-base text-gray-600 mb-2 md:mb-4 leading-tight">Know, Understand, Do framework for women&apos;s history curriculum</p>
                <a 
                  href="https://docs.google.com/document/d/1LlC2wW0qCM31NDHau47mPvXDYUyXJ7EcpAMRVpobbR0/edit?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#EB89B5] text-white px-2 md:px-6 py-1 md:py-2 rounded-lg font-semibold hover:bg-[#C76B99] transition-colors shadow-md hover:shadow-lg text-[10px] md:text-base"
                >
                  View KUD
                </a>
              </div>

              {/* Slideshow Link */}
              <div className="text-center">
                <div className="w-10 h-10 md:w-16 md:h-16 bg-[#FFD7E9] rounded-full flex items-center justify-center mx-auto mb-2 md:mb-4">
                  <svg className="w-5 h-5 md:w-8 md:h-8 text-[#EB89B5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011-1h2a1 1 0 011 1v22a1 1 0 01-1 1h-2a1 1 0 01-1-1V4M7 4V1a1 1 0 00-1-1H4a1 1 0 00-1 1v22a1 1 0 001 1h2a1 1 0 001-1V4m8 8h2m-2 4h2m-8-4h2m-2 4h2m-8-4h2m-2 4h2" />
                  </svg>
                </div>
                <h3 className="text-xs md:text-xl font-bold text-[#EB89B5] mb-1 md:mb-3">Women&apos;s History Slideshow</h3>
                <p className="text-[10px] md:text-base text-gray-600 mb-2 md:mb-4 leading-tight">Educational presentation on women&apos;s history and rights</p>
                <a 
                  href="https://docs.google.com/presentation/d/18eRzSft1iVdo2hu4mtBnubxHUdXDKA5NT45-LJIFHcA/edit?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#EB89B5] text-white px-2 md:px-6 py-1 md:py-2 rounded-lg font-semibold hover:bg-[#C76B99] transition-colors shadow-md hover:shadow-lg text-[10px] md:text-base"
                >
                  View Slideshow
                </a>
              </div>

              {/* Curriculum Plan Link */}
              <div className="text-center">
                <div className="w-10 h-10 md:w-16 md:h-16 bg-[#FFD7E9] rounded-full flex items-center justify-center mx-auto mb-2 md:mb-4">
                  <svg className="w-5 h-5 md:w-8 md:h-8 text-[#EB89B5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xs md:text-xl font-bold text-[#EB89B5] mb-1 md:mb-3">Curriculum Plan</h3>
                <p className="text-[10px] md:text-base text-gray-600 mb-2 md:mb-4 leading-tight">Comprehensive plan for implementing women&apos;s rights unit</p>
                <a 
                  href="https://docs.google.com/document/d/1x9kDm71fgmfgrRO6Xu8a89Ycijn3YvjuSPRUHFVf-Ic/edit?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#EB89B5] text-white px-2 md:px-6 py-1 md:py-2 rounded-lg font-semibold hover:bg-[#C76B99] transition-colors shadow-md hover:shadow-lg text-[10px] md:text-base"
                >
                  View Curriculum Plan
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Event Images Collage */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-lg p-4 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#EB89B5] text-center mb-6">
              WHO ARE WE?
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {/* In Club Image */}
              <div className="relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <Image
                  src="/inclub.jpeg"
                  alt="HER Club photo"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
              
              {/* Image 08 */}
              <div className="relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <Image
                  src="/08.jpg"
                  alt="HER Club event photo"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
              
              {/* Event 4 */}
              <div className="relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <Image
                  src="/event4.jpg"
                  alt="HER Club event photo"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
              
              {/* Event 3 */}
              <div className="relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <Image
                  src="/event3.JPG"
                  alt="HER Club event photo"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
              
              {/* Event 5 */}
              <div className="relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <Image
                  src="/event5.jpg"
                  alt="HER Club event photo"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
              
              {/* Event 6 */}
              <div className="relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow md:col-span-1">
                <Image
                  src="/event6.jpg"
                  alt="HER Club event photo"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              HER (Her Education Required) is a student-led club at Champlain Valley Union High School 
              dedicated to addressing the total lack of women&apos;s history and current rights in the curriculum.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              We believe that education should reflect the full spectrum of human experience, including 
              the stories, struggles, and achievements of women throughout history and in contemporary society. Our goal is to foster an environment where students are informed and understanding of 50% of the population. Women have too long been made to feel secondary, unimportant, and not equal to men. We want to change that.
            </p>
          </div>
        </section>

        {/* Why was this club founded? Section */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Why was this club founded?</h2>
            <div className="text-lg text-gray-700 leading-relaxed space-y-4">
              <p>
                Hi! My name is Amelie Fairweather, and I am a junior at CVU, as well as the leader and founder of HER. I would love to share what inspired me to found this movement, and this story takes place all the way back during my freshman year.
              </p>
              <p>
                During the last two weeks of the school year, my freshman social studies teacher decided we would do crash courses on different minorities not traditionally covered in the curriculum. We covered disabled rights, the LGBTQ movement, various religious groups, and on the final day, we began class by learning about the Asian American experience. It occurred to me, as he announced the topic, that we hadn&apos;t covered women&apos;s rights, and when I really reflected on it, I wondered: When have we covered women&apos;s rights? I knew what a suffragette was, but only because in third grade my dad had made me watch a movie about the early civil rights movements. I remembered three things: the main character was Helena Bonham Carter (who I loved), she was a suffragette, and as a suffragette, their primary responsibility was to explode mailboxes.
              </p>
              <p>
                So I raised my hand, and I asked my teacher that very question: &quot;When do we learn about women&apos;s history?&quot; He responded promptly: &quot;Oh, you don&apos;t learn about that.&quot; A few minutes later, he apologized, and instead said: &quot;I mean to say, I don&apos;t believe you learn about it, but if you did, that would probably be during AP Government.&quot;
              </p>
              <p>
                <span className="font-bold text-[#EB89B5]">It took me a few more questions to understand that this meant women&apos;s history was entirely optional.</span> If kids did elect to take AP GOV, that wouldn&apos;t be until their junior or senior year, and that class still did not include the rights of women only 100 years ago. This class did not include the suffrage movement, it did not include the second wave of activism in the &apos;70s, and it did not include the rights of women today.
              </p>
              <p>
                After he told me this, I wasn&apos;t sure what to do. And when I reflect on this, I realize that it was because I didn&apos;t believe in the importance of women&apos;s history. I didn&apos;t believe that it was necessary education because I didn&apos;t understand what women had to endure and overcome, and where we were as a society less than 100 years ago. Prior to that, when my mom asked me if I still thought sexism was relevant today, I had gotten mad at her outdated thinking. So what I did was nothing.
              </p>
              <p>
                Over a year later, the election happened, and the entire attitude of CVU changed. All of a sudden, everyone&apos;s political opinions became a focal point of conversation in the hallways, and I began to realize how relevant women&apos;s rights are today. Before I tell the next story, I should be clear: this club is not seeking to take political stances or become politically involved in any way. <span className="font-bold text-[#EB89B5]">We are hoping instead that students have enough unbiased education and background so that they can make these stances for themselves—regardless of the media, social media, our parents, and what the students around us say.</span>
              </p>
              <p>
                We also hope that all students understand the incredible work of generations of women to give us the rights we have today. Young girls deserve role models, and young boys need respect for the women around them.
              </p>
              <p>
                That day after the election, there was a debate at CVU led by faculty, discussing some of the most pressing issues of the day. We broke off into groups, and as I had somewhat anticipated, the first question was: Do you think a woman has a right to an abortion?
              </p>
              <p>
                I knew my stance, and I was used to surrounding myself with others who shared my views, so when I began articulating my beliefs, I wasn&apos;t prepared for the objections I would receive. A boy in our circle disagreed with me, and I felt myself tearing up as we argued, because even as I tried to speak, I realized I knew nothing beyond my personal beliefs. I realized that, truthfully, I had nothing to say. I had no education around the topic, only my own experience as a woman. I had no idea why abortion had been legalized, what it meant to be banned, or how it affected others around me. And the worst part of it was, that boy who so strongly disagreed with me, who so easily condemned millions of women, he had no understanding of the history either.
              </p>
              <p>
                How can we, as students, be asked such a question when we have no understanding of its implications? That&apos;s what I left the debate thinking. How could I reject that boy&apos;s beliefs so quickly, without any understanding of the topic? Worst of all, how could we leave education concerning something so tangible as my own bodily autonomy to hearsay? I couldn&apos;t focus for the rest of the day; all I could think of was the constant derogatory comments, slurs, and whispers about the girls around me, and how they had become so normalized.
              </p>
              <p>
                How I got upset when my mom asked me if I thought sexism was still relevant, and how I had spoken with such vindication during the debate, when really, I hadn&apos;t said anything. Opinion after opinion, but never fact.
              </p>
              <p>
                <span className="font-bold text-[#EB89B5]">Education is not an opinion; history should never be biased. Yet that is what women&apos;s history has become when we leave it as optional, when we teach it too late. Ask yourself: does your daughter, your sister, know her rights?</span> Does she know what it means to be discriminated against, and does she know how to speak up for herself? I would guess the answer is no. I certainly didn&apos;t know during that debate. Learning about my history has been empowering in so many ways. I hope everyone is incredibly proud of themselves for being present in this room tonight and continuing the hard-won legacy of generations of women before. I wish I could go back to that debate and ask that boy why—not what, but why—he believed what he did. I wish I had learned about women&apos;s history in school. I wish I could stand here and speak knowing more about it than I do.
              </p>
              <p className="font-semibold">
                I founded this club because most of all, students deserve this education, and this education deserves being required. Women&apos;s history is American history, it is human history, and it is our history. <span className="font-bold text-[#EB89B5]">It is now time for us to use our voices, so generations of girls after us know how to as well.</span>
              </p>
            </div>
          </div>
        </section>

        {/* What We Do Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">What We Do</h2>
          <div className="grid grid-cols-2 gap-3 md:gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="w-12 h-12 bg-[#FFD7E9] rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#EB89B5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Curriculum Advocacy</h3>
              <p className="text-gray-600">
               Now is the time to advocate for a required unit in the curriculum. Club members have met with the curriculum director, principal, superintendent, teachers, etc. Also presented to middle schools, freshman and sophomore classes, to attempt to remedy the lack of education.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="w-12 h-12 bg-[#FFD7E9] rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#EB89B5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Educational Events</h3>
              <p className="text-gray-600">
                Host workshops, speaker series, and educational events to raise awareness about 
                women&apos;s rights and historical contributions. We recently fundraised over $600 to host a huge event in the Shelburne library.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="w-12 h-12 bg-[#FFD7E9] rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#EB89B5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">The club!</h3>
              <p className="text-gray-600">
                Our club is entirely student-led, with members from all grades, dedicated to teaching women&apos;s history. We will continue to advocate and fight until this education is required!
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="w-12 h-12 bg-[#FFD7E9] rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#EB89B5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Activism & Awareness</h3>
              <p className="text-gray-600">
                Organize campaigns and initiatives to promote gender equality and raise awareness 
                about current women&apos;s rights issues.
              </p>
            </div>
          </div>
        </section>


        {/* Our Values Section */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Values</h2>
            <div className="grid grid-cols-3 gap-2 md:gap-6">
              <div className="text-center">
                <h3 className="text-xl font-bold text-[#EB89B5] mb-2">Equality</h3>
                <p className="text-gray-600">We believe in equal representation and opportunities for all genders.</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-[#EB89B5] mb-2">Education</h3>
                <p className="text-gray-600">We value comprehensive, inclusive education that reflects diverse perspectives.</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-[#EB89B5] mb-2">Action</h3>
                <p className="text-gray-600">We are committed to taking concrete steps toward positive change.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Us Section */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Contact Us</h2>
            <div className="flex flex-col items-center space-y-4">
              <div className="flex items-center gap-3 w-full max-w-md">
                <div className="w-6 flex-shrink-0">
                  <svg className="w-6 h-6 text-[#EB89B5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-700 font-semibold">EMAIL:</p>
                  <a 
                    href="mailto:hereducationrequired@gmail.com" 
                    className="text-[#EB89B5] hover:text-[#C76B99] transition-colors text-lg font-semibold"
                  >
                    hereducationrequired@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3 w-full max-w-md">
                <div className="w-6 flex-shrink-0">
                  <svg className="w-6 h-6 text-[#EB89B5]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-gray-700 font-semibold">INSTAGRAM:</p>
                  <a 
                    href="https://www.instagram.com/her_hereducationrequired" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#EB89B5] hover:text-[#C76B99] transition-colors text-lg font-semibold"
                  >
                    @her_hereducationrequired
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Ready to Join Our Mission?</h2>
          <p className="text-lg text-gray-600 mb-6">
            Be part of the movement to ensure women&apos;s voices are heard in education.
          </p>
          <Link 
            href="/involved" 
            className="inline-block bg-[#EB89B5] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#C76B99] transition-colors shadow-lg hover:shadow-xl"
          >
            Get Involved Today
          </Link>
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
