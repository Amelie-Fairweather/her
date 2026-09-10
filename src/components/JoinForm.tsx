'use client'

import { useState } from 'react'
// import emailjs from '@emailjs/browser' // Removed unused import

interface JoinFormProps {
  onClose: () => void
}

export default function JoinForm({ onClose }: JoinFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    description: '',
    emailUpdates: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Create the email content
      const emailContent = `
New Member Application

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

About Me & Interest:
${formData.description}

Email Updates Opt-in: ${formData.emailUpdates ? 'Yes' : 'No'}

Application submitted at: ${new Date().toLocaleString()}
      `.trim()

      // Create a mailto link
      const mailtoLink = `mailto:hereducationrequired@gmail.com?subject=New Member Application - ${formData.name}&body=${encodeURIComponent(emailContent)}`
      
      // Open email client
      window.location.href = mailtoLink
      
      setSubmitStatus('success')
      
      // Reset form after a delay
      setTimeout(() => {
        setFormData({ name: '', email: '', phone: '', description: '', emailUpdates: false })
        setIsSubmitting(false)
        setSubmitStatus('idle')
        onClose() // Close the modal after successful submission
      }, 2000)
      
    } catch (error) {
      console.error('Error submitting application:', error)
      setSubmitStatus('error')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-[#EB89B5]">Join HER Club</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <p className="text-gray-600 mb-6">We&apos;d love to have you join our community!</p>

          {submitStatus === 'success' && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Email opened! Please hit the send button in your email popup to complete your application.
              </div>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                There was an error submitting your application. Please try again.
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EB89B5] focus:border-transparent"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EB89B5] focus:border-transparent"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EB89B5] focus:border-transparent"
                placeholder="Your phone number"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Tell us about yourself and why you&apos;re interested in joining *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EB89B5] focus:border-transparent"
                placeholder="Share your background, interests, and what draws you to women's rights education..."
              />
              <p className="text-sm text-gray-600 mt-2 font-bold">
                After submitting, please hit the send button in your email popup to complete your application.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="emailUpdates"
                name="emailUpdates"
                checked={formData.emailUpdates}
                onChange={handleCheckboxChange}
                className="mt-1 w-4 h-4 text-[#EB89B5] border-gray-300 rounded focus:ring-[#EB89B5] focus:ring-2"
              />
              <label htmlFor="emailUpdates" className="text-sm text-gray-700">
                I&apos;d like to receive weekly email updates from student members about ways I can help, upcoming events, and our progress
              </label>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !formData.name.trim() || !formData.email.trim() || !formData.description.trim()}
                className="flex-1 px-4 py-2 bg-[#EB89B5] text-white rounded-md hover:bg-[#C76B99] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
