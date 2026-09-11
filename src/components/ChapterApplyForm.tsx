'use client'

import { useState } from 'react'

const initialForm = {
  nameGrade: '',
  schoolTownState: '',
  coLeaders: '',
  contact: '',
  howHeard: '',
  whyHer: '',
  meetingTimes: '',
}

type FormState = typeof initialForm

const inputClass =
  'w-full px-4 py-3 rounded-xl bg-white border border-[#EB89B5]/35 text-[#7A2454] text-sm md:text-base placeholder:text-[#7A2454]/40 focus:outline-none focus:ring-2 focus:ring-[#EB89B5]/50 focus:border-[#EB89B5] transition-shadow'
const labelClass = 'block text-left text-xs font-bold uppercase tracking-[0.16em] text-[#7A2454] mb-1.5'
const helpClass = 'mt-1 text-xs text-gray-500 leading-relaxed'

export default function ChapterApplyForm() {
  const [form, setForm] = useState<FormState>(initialForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus('idle')

    try {
      const res = await fetch('/api/chapter-apply', {
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
    <div className="px-6 py-8 md:px-10 md:py-10">
      {status === 'success' && (
        <div className="mb-6 rounded-xl bg-[#FFD7E9]/60 border border-[#EB89B5]/30 text-[#7A2454] px-4 py-3 text-sm text-center font-semibold">
          Application received — thank you. We&apos;ll be in touch about next steps. Please continue to
          check your email.
        </div>
      )}
      {status === 'error' && (
        <div className="mb-6 rounded-xl bg-[#7A2454]/08 border border-[#7A2454]/20 text-[#7A2454] px-4 py-3 text-sm text-center">
          Something went wrong.{' '}
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScl9lSLS7BoaZrzdaRLzNmgUGkz6qUg93UZzjDRgaH3VydfJA/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-semibold"
          >
            Open the Google Form
          </a>{' '}
          or email{' '}
          <a href="mailto:hereducationrequired@gmail.com" className="underline font-semibold">
            hereducationrequired@gmail.com
          </a>
          .
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl mx-auto">
        <div>
          <label htmlFor="nameGrade" className={labelClass}>
            Your name and grade level *
          </label>
          <input
            id="nameGrade"
            name="nameGrade"
            required
            value={form.nameGrade}
            onChange={handleChange}
            placeholder="e.g. Jordan Lee — junior"
            className={inputClass}
          />
          <p className={helpClass}>Freshman, sophomore, junior, senior, etc.</p>
        </div>

        <div>
          <label htmlFor="schoolTownState" className={labelClass}>
            High school, town, and state *
          </label>
          <textarea
            id="schoolTownState"
            name="schoolTownState"
            required
            rows={2}
            value={form.schoolTownState}
            onChange={handleChange}
            placeholder="e.g. Solon High School, Solon, Ohio"
            className={`${inputClass} resize-y min-h-[72px]`}
          />
        </div>

        <div>
          <label htmlFor="coLeaders" className={labelClass}>
            Co-leaders (optional)
          </label>
          <textarea
            id="coLeaders"
            name="coLeaders"
            rows={2}
            value={form.coLeaders}
            onChange={handleChange}
            placeholder="If yes, their names"
            className={`${inputClass} resize-y min-h-[72px]`}
          />
        </div>

        <div>
          <label htmlFor="contact" className={labelClass}>
            Best contact *
          </label>
          <input
            id="contact"
            name="contact"
            required
            value={form.contact}
            onChange={handleChange}
            placeholder="Phone number or email"
            className={inputClass}
          />
          <p className={helpClass}>This is not public — used only to reach you about next steps.</p>
        </div>

        <div>
          <label htmlFor="howHeard" className={labelClass}>
            How did you hear about us? *
          </label>
          <input
            id="howHeard"
            name="howHeard"
            required
            value={form.howHeard}
            onChange={handleChange}
            placeholder="Instagram, friend, teacher, etc."
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="whyHer" className={labelClass}>
            Why do you want to start a HER?
          </label>
          <textarea
            id="whyHer"
            name="whyHer"
            rows={4}
            value={form.whyHer}
            onChange={handleChange}
            placeholder="Tell us what draws you to this mission"
            className={`${inputClass} resize-y min-h-[120px]`}
          />
        </div>

        <div>
          <label htmlFor="meetingTimes" className={labelClass}>
            Meeting availability *
          </label>
          <textarea
            id="meetingTimes"
            name="meetingTimes"
            required
            rows={3}
            value={form.meetingTimes}
            onChange={handleChange}
            placeholder="1–3 dates and times (include your time zone)"
            className={`${inputClass} resize-y min-h-[100px]`}
          />
          <p className={helpClass}>
            List 1–3 times you can meet virtually for up to 30 minutes. Times are flexible — we&apos;ll
            confirm details later.
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full min-h-[52px] rounded-xl bg-[#EB89B5] text-white font-bold uppercase tracking-wide text-sm md:text-base hover:bg-[#7A2454] disabled:bg-[#EB89B5]/45 disabled:cursor-not-allowed transition-colors mt-2"
        >
          {isSubmitting ? 'Submitting…' : 'Submit application'}
        </button>

        <p className="pt-1 text-center text-xs text-gray-500">
          Prefer Google Forms?{' '}
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScl9lSLS7BoaZrzdaRLzNmgUGkz6qUg93UZzjDRgaH3VydfJA/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 text-[#EB89B5] font-semibold hover:text-[#7A2454]"
          >
            Open the registration form
          </a>
        </p>
      </form>
    </div>
  )
}
