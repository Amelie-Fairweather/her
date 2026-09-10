'use client'

import { useState } from 'react'

export default function IdeaSubmissionForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    idea: '',
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
      const emailContent = `
New Idea Submission

Name: ${formData.name || 'Anonymous'}
Email: ${formData.email || 'Not provided'}

Idea:
${formData.idea}

Submitted at: ${new Date().toLocaleString()}
      `.trim()

      const mailtoLink = `mailto:hereducationrequired@gmail.com?subject=${encodeURIComponent(
        `HER Idea Submission${formData.name ? ` — ${formData.name}` : ''}`
      )}&body=${encodeURIComponent(emailContent)}`

      window.location.href = mailtoLink
      setSubmitStatus('success')
      setTimeout(() => {
        setFormData({ name: '', email: '', idea: '' })
        setIsSubmitting(false)
        setSubmitStatus('idle')
      }, 2500)
    } catch {
      setSubmitStatus('error')
      setIsSubmitting(false)
    }
  }

  return (
    <section className="mt-14 md:mt-20 max-w-3xl mx-auto">
      <div className="rounded-3xl bg-white border border-[#EB89B5]/25 shadow-xl shadow-[#EB89B5]/10 p-6 md:p-10">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#EB89B5] mb-2 text-center">
          Share with us
        </p>
        <h2 className="text-2xl md:text-4xl font-bold text-[#7A2454] text-center mb-3">
          Got an idea for HER?
        </h2>
        <p className="text-sm md:text-base text-gray-600 text-center max-w-xl mx-auto mb-8">
          Club activities, curriculum ideas, events, partnerships — send anything. Your idea goes straight to{' '}
          <a
            href="mailto:hereducationrequired@gmail.com"
            className="text-[#EB89B5] font-semibold underline underline-offset-2 hover:text-[#7A2454]"
          >
            hereducationrequired@gmail.com
          </a>
          .
        </p>

        {submitStatus === 'success' && (
          <div className="mb-6 rounded-xl bg-green-50 border border-green-300 text-green-800 px-4 py-3 text-sm">
            Email opened — hit send in your mail app to finish submitting your idea.
          </div>
        )}
        {submitStatus === 'error' && (
          <div className="mb-6 rounded-xl bg-red-50 border border-red-300 text-red-800 px-4 py-3 text-sm">
            Something went wrong. Email us directly at hereducationrequired@gmail.com.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="idea-name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                id="idea-name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#EB89B5] focus:border-transparent"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="idea-email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="idea-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#EB89B5] focus:border-transparent"
                placeholder="you@example.com"
              />
            </div>
          </div>
          <div>
            <label htmlFor="idea-text" className="block text-sm font-medium text-gray-700 mb-1">
              Your idea *
            </label>
            <textarea
              id="idea-text"
              name="idea"
              required
              rows={5}
              value={formData.idea}
              onChange={handleChange}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#EB89B5] focus:border-transparent resize-y"
              placeholder="What should HER try next? An event, a campaign, a classroom activity…"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting || !formData.idea.trim()}
            className="w-full min-h-[52px] rounded-xl bg-[#EB89B5] text-white font-bold tracking-wide uppercase text-sm md:text-base hover:bg-[#7A2454] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? 'Opening email…' : 'Submit idea'}
          </button>
        </form>
      </div>
    </section>
  )
}
