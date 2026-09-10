'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const body = `
Contact Form Message

Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject || 'General inquiry'}

Message:
${formData.message}

Sent at: ${new Date().toLocaleString()}
      `.trim()

      window.location.href = `mailto:hereducationrequired@gmail.com?subject=${encodeURIComponent(
        formData.subject || `HER Contact — ${formData.name}`
      )}&body=${encodeURIComponent(body)}`

      setSubmitStatus('success')
      setTimeout(() => {
        setFormData({ name: '', email: '', subject: '', message: '' })
        setIsSubmitting(false)
        setSubmitStatus('idle')
      }, 2500)
    } catch {
      setSubmitStatus('error')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FFFBF3]">
      <header className="bg-[#EB89B5] text-white py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-block mb-4 text-pink-100 hover:text-white transition-colors">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold mb-2">Contact Us</h1>
          <p className="text-lg opacity-90">Questions, partnerships, press, or chapter support — we&apos;d love to hear from you</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <a
            href="mailto:hereducationrequired@gmail.com"
            className="bg-white rounded-2xl shadow-lg border border-[#EB89B5]/15 p-6 hover:border-[#EB89B5]/45 hover:shadow-xl transition-all"
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#EB89B5] mb-2">Email</p>
            <p className="text-lg font-semibold text-[#7A2454] break-all">hereducationrequired@gmail.com</p>
          </a>
          <a
            href="https://www.instagram.com/hereducationrequired/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-2xl shadow-lg border border-[#EB89B5]/15 p-6 hover:border-[#EB89B5]/45 hover:shadow-xl transition-all"
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#EB89B5] mb-2">Instagram</p>
            <p className="text-lg font-semibold text-[#7A2454]">@hereducationrequired</p>
          </a>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-[#EB89B5]/15 p-6 md:p-10">
          <h2 className="text-2xl font-bold text-[#7A2454] mb-2">Send a message</h2>
          <p className="text-gray-600 mb-6 text-sm md:text-base">
            Fill this out and we&apos;ll open an email to HER leadership. Hit send in your mail app to finish.
          </p>

          {submitStatus === 'success' && (
            <div className="mb-4 rounded-xl bg-green-50 border border-green-300 text-green-800 px-4 py-3 text-sm">
              Email opened — hit send in your mail app to complete your message.
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="mb-4 rounded-xl bg-red-50 border border-red-300 text-red-800 px-4 py-3 text-sm">
              Something went wrong. Email us at hereducationrequired@gmail.com.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#EB89B5]"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#EB89B5]"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#EB89B5]"
                placeholder="What is this about?"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#EB89B5] resize-y"
                placeholder="How can we help?"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting || !formData.name.trim() || !formData.email.trim() || !formData.message.trim()}
              className="w-full min-h-[52px] rounded-xl bg-[#EB89B5] text-white font-bold tracking-wide uppercase text-sm hover:bg-[#7A2454] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Opening email…' : 'Send message'}
            </button>
          </form>
        </div>
      </main>

      <footer className="bg-[#FFFBF3] text-gray-800 py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-700">© {new Date().getFullYear()} HER — Her Education Required | Global Youth Network</p>
        </div>
      </footer>
    </div>
  )
}
