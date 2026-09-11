'use client'

import { useState } from 'react'

export default function IdeaSubmissionForm() {
  const [formData, setFormData] = useState({
    name: '',
    idea: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const res = await fetch('/api/idea-pitch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error('submit failed')

      setSubmitStatus('success')
      setFormData({ name: '', idea: '' })
    } catch {
      setSubmitStatus('error')
    } finally {
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
          Pitch us your ideas for upcoming HER initiatives — club activities, curriculum ideas, events,
          partnerships, and more.
        </p>

        {submitStatus === 'success' && (
          <div className="mb-6 rounded-xl bg-green-50 border border-green-300 text-green-800 px-4 py-3 text-sm">
            Idea received — thank you for pitching us.
          </div>
        )}
        {submitStatus === 'error' && (
          <div className="mb-6 rounded-xl bg-red-50 border border-red-300 text-red-800 px-4 py-3 text-sm">
            Something went wrong. Try again or{' '}
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSeEfY5Ssd0Ya_YgqveeD5l9WMYiqtb4ks1wjldAajrN7Xd3vA/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold"
            >
              open the responder form
            </a>
            .
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="idea-name" className="block text-sm font-medium text-gray-700 mb-1">
              Full name <span className="text-gray-400 font-normal">(optional if you want to be credited)</span>
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
            {isSubmitting ? 'Submitting…' : 'Submit idea'}
          </button>
          <p className="text-center text-xs text-gray-500">
            Prefer Google Forms?{' '}
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSeEfY5Ssd0Ya_YgqveeD5l9WMYiqtb4ks1wjldAajrN7Xd3vA/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#EB89B5] font-semibold underline underline-offset-2 hover:text-[#7A2454]"
            >
              Open the responder form
            </a>
          </p>
        </form>
      </div>
    </section>
  )
}
