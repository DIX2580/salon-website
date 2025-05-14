import { useState } from 'react'
import axios from 'axios' // Make sure to install axios with: npm install axios

const Booking = () => {
  const [step, setStep] = useState(1)
  const [bookingData, setBookingData] = useState({
    service: '',
    stylist: '',
    date: '',
    time: '',
    name: '',
    email: '',
    phone: '',
    notes: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  
  // API base URL - change this to match your backend URL
  const API_URL =  'http://localhost:5000/api'
  
  const services = [
    { id: 'haircut', name: 'Haircut & Styling', duration: '60 min', price: '$65+' },
    { id: 'color', name: 'Hair Coloring', duration: '120 min', price: '$100+' },
    { id: 'highlights', name: 'Highlights', duration: '150 min', price: '$120+' },
    { id: 'facial', name: 'Facial Treatment', duration: '60 min', price: '$85+' },
    { id: 'manicure', name: 'Manicure', duration: '45 min', price: '$40+' },
    { id: 'pedicure', name: 'Pedicure', duration: '60 min', price: '$55+' }
  ]
  
  const stylists = [
    { id: 'sophia', name: 'Sophia Reynolds', specialties: ['Haircut', 'Styling'] },
    { id: 'michael', name: 'Michael Chen', specialties: ['Color', 'Highlights'] },
    { id: 'olivia', name: 'Olivia Garcia', specialties: ['Facial', 'Skincare'] },
    { id: 'james', name: 'James Wilson', specialties: ['Manicure', 'Pedicure'] }
  ]
  
  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', 
    '5:00 PM', '6:00 PM', '7:00 PM'
  ]
  
  const handleChange = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value
    })
  }
  
  const handleSelection = (field, value) => {
    setBookingData({
      ...bookingData,
      [field]: value
    })
  }
  
  const resetForm = () => {
    setBookingData({
      service: '',
      stylist: '',
      date: '',
      time: '',
      name: '',
      email: '',
      phone: '',
      notes: ''
    })
    setStep(1)
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    try {
      // Get the selected service and stylist names
      const serviceObj = services.find(s => s.id === bookingData.service) || {}
      const stylistObj = stylists.find(s => s.id === bookingData.stylist) || {}
      
      // Prepare data for submission
      const bookingPayload = {
        ...bookingData,
        service: serviceObj.name, // Send actual name instead of ID
        stylist: stylistObj.name  // Send actual name instead of ID
      }
      
      // Submit booking to backend API
      const response = await axios.post(`${API_URL}/bookings`, bookingPayload)
      console.log('Booking successful:', response.data)
      
      setSuccess(true)
      resetForm()
      setTimeout(() => setSuccess(false), 5000) // Clear success message after 5 seconds
    } catch (err) {
      console.error('Booking error:', err)
      setError(err.response?.data?.message || 'Failed to book appointment. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Get selected item names
  const getSelectedService = () => services.find(s => s.id === bookingData.service) || {}
  const getSelectedStylist = () => stylists.find(s => s.id === bookingData.stylist) || {}
  
  // Validate current step
  const isStepComplete = () => {
    switch(step) {
      case 1: return bookingData.service !== ''
      case 2: return bookingData.stylist !== ''
      case 3: return bookingData.date !== '' && bookingData.time !== ''
      default: return true
    }
  }

  // Navigation
  const nextStep = () => {
    if (step < 4 && isStepComplete()) {
      setStep(step + 1)
      window.scrollTo(0, 0)
    }
  }
  
  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1)
      window.scrollTo(0, 0)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-transparent text-primary bg-clip-text bg-gradient-to-r from-primary to-white">
            Book Your Appointment
          </h1>
          <p className="mt-3 text-gray-400 max-w-2xl mx-auto">
            Complete the steps below to schedule your salon experience
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 bg-green-900/40 border border-green-500 text-green-100 p-4 rounded-xl animate-fadeIn">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p>Your appointment has been booked successfully! You will receive a confirmation email shortly.</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-900/40 border border-red-500 text-red-100 p-4 rounded-xl animate-fadeIn">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>{error}</p>
            </div>
          </div>
        )}

        {/* Main Form Card */}
        <div className="bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl border border-zinc-800">
          {/* Progress Bar */}
          <div className="bg-zinc-800 h-1 w-full">
            <div 
              className="bg-gradient-to-r from-amber-600 via-amber-500 to-primary h-full transition-all duration-500 ease-out"
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>

          {/* Steps */}
          <div className="flex border-b border-zinc-800">
            {['Select Service', 'Choose Stylist', 'Schedule', 'Your Details'].map((label, idx) => {
              const stepNum = idx + 1
              return (
                <div 
                  key={stepNum}
                  className={`flex-1 py-4 px-2 text-center transition-all duration-300 ${
                    step === stepNum ? 'border-b-2 border-amber-500 text-white' : 'text-gray-500'
                  }`}
                >
                  <div className="flex items-center justify-center">
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center text-sm mr-2 
                      ${step >= stepNum ? 'bg-gradient-to-r from-primary to-black text-white' : 'bg-zinc-800 text-gray-500'}
                    `}>
                      {stepNum}
                    </div>
                    <span className="hidden sm:inline">{label}</span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Content Area */}
          <div className="p-8">
            {/* Step 1: Service Selection */}
            {step === 1 && (
              <div className="animate-fadeIn">
                <h2 className="text-2xl font-bold mb-6">Select Your Service</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {services.map(service => (
                    <div
                      key={service.id}
                      onClick={() => handleSelection('service', service.id)}
                      className={`
                        p-6 rounded-xl cursor-pointer transition-all duration-300
                        ${bookingData.service === service.id 
                          ? 'bg-gradient-to-br from-amber-900/40 to-yellow-900/40 border border-amber-500' 
                          : 'bg-zinc-800/50 border border-zinc-700 hover:border-amber-500/50'}
                      `}
                    >
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-medium">{service.name}</h3>
                        {bookingData.service === service.id && (
                          <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="flex justify-between mt-4 text-sm">
                        <span className="text-gray-400">{service.duration}</span>
                        <span className="font-medium text-amber-400">{service.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Stylist Selection */}
            {step === 2 && (
              <div className="animate-fadeIn">
                <h2 className="text-2xl font-bold mb-6">Choose Your Stylist</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {stylists.map(stylist => (
                    <div
                      key={stylist.id}
                      onClick={() => handleSelection('stylist', stylist.id)}
                      className={`
                        p-6 rounded-xl cursor-pointer transition-all duration-300 flex items-center
                        ${bookingData.stylist === stylist.id 
                          ? 'bg-gradient-to-br from-amber-900/40 to-yellow-900/40 border border-amber-500' 
                          : 'bg-zinc-800/50 border border-zinc-700 hover:border-amber-500/50'}
                      `}
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-600 to-amber-400 flex items-center justify-center text-xl font-bold">
                        {stylist.name.charAt(0)}
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex justify-between">
                          <h3 className="text-lg font-medium">{stylist.name}</h3>
                          {bookingData.stylist === stylist.id && (
                            <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-gray-400 mt-1">
                          {stylist.specialties.join(' • ')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Date & Time */}
            {step === 3 && (
              <div className="animate-fadeIn">
                <h2 className="text-2xl font-bold mb-6">Schedule Your Appointment</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-gray-400 mb-2 text-sm">Select Date</label>
                    <input
                      type="date"
                      name="date"
                      value={bookingData.date}
                      onChange={handleChange}
                      className="w-full p-4 bg-zinc-800 border border-zinc-700 rounded-xl focus:outline-none focus:border-amber-500 text-white"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 mb-2 text-sm">Select Time</label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {timeSlots.map(time => (
                        <div
                          key={time}
                          onClick={() => handleSelection('time', time)}
                          className={`
                            p-3 text-center rounded-lg cursor-pointer transition-all duration-300
                            ${bookingData.time === time 
                              ? 'bg-amber-500 text-white' 
                              : 'bg-zinc-800 border border-zinc-700 hover:border-amber-500/50'}
                          `}
                        >
                          {time}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Personal Details */}
            {step === 4 && (
              <div className="animate-fadeIn">
                <h2 className="text-2xl font-bold mb-6">Complete Your Booking</h2>
                
                <div className="bg-zinc-800/50 p-6 rounded-xl mb-8 border border-zinc-700">
                  <h3 className="text-lg font-medium mb-4">Booking Summary</h3>
                  <div className="grid grid-cols-2 gap-y-3">
                    <div className="text-gray-400">Service:</div>
                    <div>{getSelectedService().name}</div>
                    
                    <div className="text-gray-400">Stylist:</div>
                    <div>{getSelectedStylist().name}</div>
                    
                    <div className="text-gray-400">Date:</div>
                    <div>{bookingData.date}</div>
                    
                    <div className="text-gray-400">Time:</div>
                    <div>{bookingData.time}</div>
                    
                    <div className="text-gray-400">Estimated Price:</div>
                    <div>{getSelectedService().price}</div>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-400 mb-2 text-sm">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          value={bookingData.name}
                          onChange={handleChange}
                          className="w-full p-4 bg-zinc-800 border border-zinc-700 rounded-xl focus:outline-none focus:border-amber-500 text-white"
                          placeholder="Your name"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-400 mb-2 text-sm">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          value={bookingData.email}
                          onChange={handleChange}
                          className="w-full p-4 bg-zinc-800 border border-zinc-700 rounded-xl focus:outline-none focus:border-amber-500 text-white"
                          placeholder="Your email"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-gray-400 mb-2 text-sm">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={bookingData.phone}
                        onChange={handleChange}
                        className="w-full p-4 bg-zinc-800 border border-zinc-700 rounded-xl focus:outline-none focus:border-amber-500 text-white"
                        placeholder="Your phone number"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-400 mb-2 text-sm">Special Requests <span className="text-gray-500">(Optional)</span></label>
                      <textarea
                        name="notes"
                        value={bookingData.notes}
                        onChange={handleChange}
                        rows="3"
                        className="w-full p-4 bg-zinc-800 border border-zinc-700 rounded-xl focus:outline-none focus:border-amber-500 text-white"
                        placeholder="Any special requests or notes"
                      ></textarea>
                    </div>
                    
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className={`
                          w-full p-4 rounded-xl text-white font-bold transition-all
                          ${loading 
                            ? 'bg-zinc-700 cursor-not-allowed' 
                            : 'bg-gradient-to-r from-amber-600 via-amber-500 to-primary hover:opacity-90'}
                        `}
                      >
                        {loading ? 'Processing...' : 'Confirm Booking'}
                      </button>
                      <p className="text-gray-500 text-sm text-center mt-3">
                        By confirming, you agree to our booking terms and policies
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="px-8 pb-8 pt-2 flex justify-between">
            {step > 1 ? (
              <button
                onClick={prevStep}
                className="px-6 py-3 border border-zinc-700 rounded-lg hover:bg-zinc-800 transition-colors"
              >
                Back
              </button>
            ) : (
              <div></div>
            )}
            
            {step < 4 && (
              <button
                onClick={nextStep}
                disabled={!isStepComplete()}
                className={`
                  px-6 py-3 rounded-lg transition-all duration-300 font-medium
                  ${isStepComplete() 
                    ? 'bg-gradient-to-r from-amber-600 to-amber-400 text-white' 
                    : 'bg-zinc-800 text-gray-500 cursor-not-allowed'}
                `}
              >
                Continue
              </button>
            )}
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Need help? Contact us at <span className="text-amber-400">support@hairhacker.com</span></p>
        </div>
      </div>
    </div>
  )
}

export default Booking