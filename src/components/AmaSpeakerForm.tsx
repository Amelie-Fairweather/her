'use client'

import { useState } from 'react'

const PHOTO_OPTIONS = ['Yes', 'No', 'Maybe', 'Photo and recording'] as const

const initialForm = {
  fullName: '',
  contact: '',
  organization: '',
  status: '',
  about: '',
  whySpeak: '',
  eventStyle: '',
  audience: '',
  photoConsent: '',
}

type FormState = typeof initialForm

const inputClass =
  'w-full px-3.5 py-3 rounded-xl bg-white/95 border border-white/40 text-[#7A2454] text-sm md:text-base placeholder:text-[#7A2454]/45 focus:outline-none focus:ring-2 focus:ring-white transition-shadow'
const labelClass = 'block text-left text-xs font-bold uppercase tracking-[0.16em] text-white/85 mb-1.5'

export default function AmaSpeakerForm() {
  const [form, setForm] = useState<FormState>(initialForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus('idle')

    try {
      const res = await fetch('/api/ama-speaker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) throw new Error('submit failed')

      setStatus('success')
      setForm(initialForm)
    } catch {
      setStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="rounded-3xl bg-white/15 border border-white/35 backdrop-blur-sm px-5 py-8 md:px-10 md:py-10 text-left">
      {status === 'success' && (
        <div className="mb-5 rounded-xl bg-white/20 border border-white/35 text-white px-4 py-3 text-sm text-center">
          Application received — thank you. We&apos;ll be in touch soon.
        </div>
      )}
      {status === 'error' && (
        <div className="mb-5 rounded-xl bg-black/25 border border-white/30 text-white px-4 py-3 text-sm text-center">
          Something went wrong. Email{' '}
          <a href="mailto:hereducationrequired@gmail.com" className="underline font-semibold">
            hereducationrequired@gmail.com
          </a>{' '}
          or try again.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="fullName" className={labelClass}>
              Full name
            </label>
            <input
              id="fullName"
              name="fullName"
              required
              value={form.fullName}
              onChange={handleChange}
              placeholder="Your full name"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="contact" className={labelClass}>
              Best contact
            </label>
            <input
              id="contact"
              name="contact"
              required
              value={form.contact}
              onChange={handleChange}
              placeholder="Email or phone"
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="organization" className={labelClass}>
              Organization
            </label>
            <input
              id="organization"
              name="organization"
              required
              value={form.organization}
              onChange={handleChange}
              placeholder="Company, school, or affiliation"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="status" className={labelClass}>
              Current status
            </label>
            <input
              id="status"
              name="status"
              required
              value={form.status}
              onChange={handleChange}
              placeholder="High school, college, working, etc."
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="about" className={labelClass}>
            Briefly tell us about yourself
          </label>
          <textarea
            id="about"
            name="about"
            required
            rows={3}
            value={form.about}
            onChange={handleChange}
            placeholder="What should we know about you?"
            className={`${inputClass} resize-y`}
          />
        </div>

        <div>
          <label htmlFor="whySpeak" className={labelClass}>
            Why do you want to be a speaker?
          </label>
          <textarea
            id="whySpeak"
            name="whySpeak"
            required
            rows={3}
            value={form.whySpeak}
            onChange={handleChange}
            placeholder="What draws you to mentoring HER students?"
            className={`${inputClass} resize-y`}
          />
        </div>

        <div>
          <label htmlFor="eventStyle" className={labelClass}>
            Preferred event style
          </label>
          <input
            id="eventStyle"
            name="eventStyle"
            required
            value={form.eventStyle}
            onChange={handleChange}
            placeholder="Ask Me Anything, Workshop, or Presentation"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="audience" className={labelClass}>
            Preferred audience
          </label>
          <input
            id="audience"
            name="audience"
            required
            value={form.audience}
            onChange={handleChange}
            placeholder="e.g. state, age group, or open to all"
            className={inputClass}
          />
        </div>

        <div>
          <p className={labelClass}>Photo / recording for website &amp; social?</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {PHOTO_OPTIONS.map((option) => (
              <label
                key={option}
                className={`cursor-pointer rounded-xl border px-3 py-2.5 text-center text-xs sm:text-sm font-semibold transition-colors ${
                  form.photoConsent === option
                    ? 'bg-white text-[#7A2454] border-white'
                    : 'bg-white/10 text-white border-white/35 hover:bg-white/20'
                }`}
              >
                <input
                  type="radio"
                  name="photoConsent"
                  value={option}
                  checked={form.photoConsent === option}
                  onChange={handleChange}
                  required
                  className="sr-only"
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full min-h-[52px] rounded-2xl bg-white text-[#7A2454] font-bold uppercase tracking-wide text-sm md:text-base hover:bg-[#FFD7E9] disabled:bg-white/40 disabled:text-white/70 disabled:cursor-not-allowed transition-colors mt-2"
        >
          {isSubmitting ? 'Submitting…' : 'Submit application'}
        </button>

        <p className="pt-2 text-center text-xs text-white/70">
          Prefer Google Forms?{' '}
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSc68658Y_eU6atMck6K0z9az5rrOdt2rbpFYfMfmWblTnB7SQ/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-white font-semibold"
          >
            Open the responder form
          </a>
        </p>
      </form>
    </div>
  )
}
