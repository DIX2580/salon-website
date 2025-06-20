// Updated Contact.jsx
import { useState } from 'react'
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa'
import axios from 'axios'

// Define multiple API endpoints - use the production URL or fallback to localhost for development
const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://salon-website-backend.onrender.com/api'
  : 'http://localhost:5000/api'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      // Send data to backend API
      await axios.post(`${API_URL}/contacts`, formData)

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
      setSubmitSuccess(true)

      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false)
      }, 5000)
    } catch (error) {
      console.error('Error submitting contact form:', error)
      setSubmitError('Failed to send your message. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 bg-light">
      <div className="container">
        <div className="text-center mb-16">
          <span className="section-subtitle">Get In Touch</span>
          <h2 className="section-title">Contact Us</h2>
          <p className="max-w-3xl mx-auto text-gray-600">
            Have questions or want to book an appointment? Reach out to us using the contact information below.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="font-serif text-2xl font-semibold mb-6">Contact Information</h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-primary bg-opacity-10 flex items-center justify-center flex-shrink-0">
                  <FaMapMarkerAlt className="text-primary" />
                </div>
                <div className="ml-4">
                  <h4 className="font-serif text-lg font-semibold mb-1">Our Location</h4>
                  <p className="text-gray-600">Plot no-606/736, Bomikhal, Near Utkal Hyundai<br />Bhubaneswar, Odisha 751010</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-primary bg-opacity-10 flex items-center justify-center flex-shrink-0">
                  <FaPhone className="text-primary" />
                </div>
                <div className="ml-4">
                  <h4 className="font-serif text-lg font-semibold mb-1">Phone Number</h4>
                  <p className="text-gray-600">(+91) 9668265622</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-primary bg-opacity-10 flex items-center justify-center flex-shrink-0">
                  <FaEnvelope className="text-primary" />
                </div>
                <div className="ml-4">
                  <h4 className="font-serif text-lg font-semibold mb-1">Email Address</h4>
                  <p className="text-gray-600">info@hairhackersalon.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-primary bg-opacity-10 flex items-center justify-center flex-shrink-0">
                  <FaClock className="text-primary" />
                </div>
                <div className="ml-4">
                  <h4 className="font-serif text-lg font-semibold mb-1">Working Hours</h4>
                  <p className="text-gray-600">
                    Monday - Friday: 9:00 AM - 9:00 PM<br />
                    Saturday: 8:00 AM - 9:00 PM<br />
                    Sunday: 8:00 AM - 10:00 PM
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 h-64 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3386.473816183704!2d85.85484427523674!3d20.293006481178573!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a190a054703520f%3A0x960fb549ab15cb22!2sTHE%20HAIR%20HACKER!5e1!3m2!1sen!2sin!4v1748255750902!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="THE HAIR HACKER Location"
              />
            </div>
          </div>

          <div>
            <h3 className="font-serif text-2xl font-semibold mb-6">Send Us a Message</h3>
            {submitSuccess && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                Thank you for your message! We will get back to you soon.
              </div>
            )}

            {submitError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                {submitError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Your name"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Your email"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Subject"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Your message"
                  required
                  disabled={isSubmitting}
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn-primary w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact