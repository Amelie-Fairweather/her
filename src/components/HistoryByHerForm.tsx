'use client'

import { useState } from 'react'

const YES_NO = ['Yes', 'No'] as const

const initialForm = {
  fullName: '',
  email: '',
  location: '',
  honorVolunteer: '',
  shareMedia: '',
}

type FormState = typeof initialForm

const inputClass =
  'w-full px-3.5 py-3 rounded-xl bg-white border border-[#EB89B5]/35 text-[#7A2454] text-sm md:text-base placeholder:text-[#7A2454]/40 focus:outline-none focus:ring-2 focus:ring-[#EB89B5]/50 focus:border-[#EB89B5] transition-shadow'
const labelClass = 'block text-sm font-semibold text-[#7A2454] mb-1.5'

export default function HistoryByHerForm() {
  const [form, setForm] = useState<FormState>(initialForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus('idle')

    try {
      const res = await fetch('/api/history-by-her', {
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
    <section id="history-by-her" className="scroll-mt-8">
      <div className="rounded-3xl bg-white border border-[#EB89B5]/25 shadow-xl shadow-[#EB89B5]/10 overflow-hidden">
        <div className="bg-gradient-to-r from-[#7A2454] to-[#EB89B5] px-6 py-7 md:px-10 md:py-9 text-center text-white">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/85 mb-2">
            Sign up
          </p>
          <h2 className="text-2xl md:text-3xl font-bold leading-tight">Volunteer form</h2>
          <p className="mt-3 text-sm md:text-base text-white/95 max-w-xl mx-auto leading-relaxed">
            Fill this out to receive the PDF HER bookmarks and an instructional video on how to print
            and assemble. Donate bookmarks to local libraries, high schools, and middle schools — then
            complete the report form sent by email.
          </p>
        </div>

        <div className="p-6 md:p-10">
          {status === 'success' && (
            <div className="mb-6 rounded-xl bg-green-50 border border-green-300 text-green-800 px-4 py-3 text-sm">
              You&apos;re signed up — check your email for the bookmark PDF, assembly video, and report
              form.
            </div>
          )}
          {status === 'error' && (
            <div className="mb-6 rounded-xl bg-red-50 border border-red-300 text-red-800 px-4 py-3 text-sm">
              Something went wrong. Try again or{' '}
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSdPaht-67KRVxMnvEUkMudD2PZvqMvFTC0qJosfZFSksuvZFw/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-semibold"
              >
                open the volunteer form
              </a>
              , or email{' '}
              <a href="mailto:hereducationrequired@gmail.com" className="underline font-semibold">
                hereducationrequired@gmail.com
              </a>
              .
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="hbh-name" className={labelClass}>
                First and last name *
              </label>
              <input
                id="hbh-name"
                name="fullName"
                required
                value={form.fullName}
                onChange={handleChange}
                placeholder="Your full name"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="hbh-email" className={labelClass}>
                Your email *
              </label>
              <input
                id="hbh-email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="Where we'll send the materials"
                className={inputClass}
              />
              <p className="mt-1 text-xs text-gray-500">This is where information will be sent.</p>
            </div>

            <div>
              <label htmlFor="hbh-location" className={labelClass}>
                Town and state/country *
              </label>
              <input
                id="hbh-location"
                name="location"
                required
                value={form.location}
                onChange={handleChange}
                placeholder="e.g. Solon, Ohio or Kutch in Gujarat, India"
                className={inputClass}
              />
            </div>

            <fieldset>
              <legend className={labelClass}>
                Would you like to be honored as an official volunteer for this initiative? *
              </legend>
              <p className="text-xs text-gray-500 mb-2 -mt-0.5">
                Includes recognition on our website, and potentially Instagram.
              </p>
              <div className="flex flex-wrap gap-2">
                {YES_NO.map((option) => (
                  <label
                    key={`honor-${option}`}
                    className={`cursor-pointer rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors ${
                      form.honorVolunteer === option
                        ? 'border-[#EB89B5] bg-[#FFD7E9] text-[#7A2454]'
                        : 'border-[#EB89B5]/30 bg-white text-[#7A2454]/80 hover:border-[#EB89B5]/60'
                    }`}
                  >
                    <input
                      type="radio"
                      name="honorVolunteer"
                      value={option}
                      checked={form.honorVolunteer === option}
                      onChange={handleChange}
                      required
                      className="sr-only"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className={labelClass}>
                Willing to create reels or submit photos for Instagram? *
              </legend>
              <p className="text-xs text-gray-500 mb-2 -mt-0.5">
                @hereducationrequired — this answer has no weight at all!
              </p>
              <div className="flex flex-wrap gap-2">
                {YES_NO.map((option) => (
                  <label
                    key={`media-${option}`}
                    className={`cursor-pointer rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors ${
                      form.shareMedia === option
                        ? 'border-[#EB89B5] bg-[#FFD7E9] text-[#7A2454]'
                        : 'border-[#EB89B5]/30 bg-white text-[#7A2454]/80 hover:border-[#EB89B5]/60'
                    }`}
                  >
                    <input
                      type="radio"
                      name="shareMedia"
                      value={option}
                      checked={form.shareMedia === option}
                      onChange={handleChange}
                      required
                      className="sr-only"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </fieldset>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full min-h-[52px] rounded-xl bg-[#EB89B5] text-white font-bold tracking-wide uppercase text-sm md:text-base hover:bg-[#7A2454] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Submitting…' : 'Sign up to volunteer'}
            </button>

            <p className="text-center text-xs text-gray-500">
              Prefer Google Forms?{' '}
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSdPaht-67KRVxMnvEUkMudD2PZvqMvFTC0qJosfZFSksuvZFw/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#EB89B5] font-semibold underline underline-offset-2 hover:text-[#7A2454]"
              >
                Open the volunteer form
              </a>
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
