import { useState } from 'react'
import { FaCalendarAlt, FaClock, FaUser } from 'react-icons/fa'

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
  
  const handleServiceSelection = (serviceId) => {
    setBookingData({
      ...bookingData,
      service: serviceId
    })
  }
  
  const handleStylistSelection = (stylistId) => {
    setBookingData({
      ...bookingData,
      stylist: stylistId
    })
  }
  
  const handleTimeSelection = (time) => {
    setBookingData({
      ...bookingData,
      time: time
    })
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log(bookingData)
    // Show success message
    alert('Thank you for booking with us! We look forward to seeing you soon.')
    // Reset form
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
  
  const nextStep = () => {
    setStep(step + 1)
  }
  
  const prevStep = () => {
    setStep(step - 1)
  }
  
  return (
    <section id="booking" className="py-20 bg-white">
      <div className="container max-w-4xl">
        <div className="text-center mb-16">
          <span className="section-subtitle">Book an Appointment</span>
          <h2 className="section-title">Schedule Your Visit</h2>
          <p className="max-w-3xl mx-auto text-gray-600">
            Ready to experience our exceptional salon services? Schedule your appointment in a few simple steps.
          </p>
        </div>
        
        <div className="bg-light p-8 rounded-lg shadow-md">
          {/* Progress Steps */}
          <div className="flex justify-between mb-12 relative">
            <div className="w-full absolute top-1/2 h-0.5 bg-gray-300 -translate-y-1/2 z-0"></div>
            {[1, 2, 3].map((item) => (
              <div key={item} className="relative z-10 flex flex-col items-center">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= item ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {item}
                </div>
                <span className={`mt-2 text-sm ${step >= item ? 'text-primary' : 'text-gray-600'}`}>
                  {item === 1 ? 'Select Service' : item === 2 ? 'Choose Date & Time' : 'Your Details'}
                </span>
              </div>
            ))}
          </div>
          
          {/* Step 1: Select Service & Stylist */}
          {step === 1 && (
            <div>
              <h3 className="font-serif text-xl font-semibold mb-6">Select a Service</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {services.map((service) => (
                  <div 
                    key={service.id}
                    className={`border p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                      bookingData.service === service.id 
                        ? 'border-primary bg-primary bg-opacity-5' 
                        : 'border-gray-200 hover:border-primary'
                    }`}
                    onClick={() => handleServiceSelection(service.id)}
                  >
                    <h4 className="font-medium mb-2">{service.name}</h4>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{service.duration}</span>
                      <span>{service.price}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <h3 className="font-serif text-xl font-semibold mb-6">Choose a Stylist</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {stylists.map((stylist) => (
                  <div 
                    key={stylist.id}
                    className={`border p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                      bookingData.stylist === stylist.id 
                        ? 'border-primary bg-primary bg-opacity-5' 
                        : 'border-gray-200 hover:border-primary'
                    }`}
                    onClick={() => handleStylistSelection(stylist.id)}
                  >
                    <h4 className="font-medium mb-2">{stylist.name}</h4>
                    <div className="text-sm text-gray-600">
                      <span>Specialties: {stylist.specialties.join(', ')}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-end">
                <button 
                  className="btn-primary"
                  onClick={nextStep}
                  disabled={!bookingData.service || !bookingData.stylist}
                >
                  Continue
                </button>
              </div>
            </div>
          )}
          
          {/* Step 2: Choose Date & Time */}
          {step === 2 && (
            <div>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-serif text-xl font-semibold mb-6 flex items-center">
                    <FaCalendarAlt className="mr-2 text-primary" /> Select a Date
                  </h3>
                  <input
                    type="date"
                    name="date"
                    value={bookingData.date}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <h3 className="font-serif text-xl font-semibold mb-6 flex items-center">
                    <FaClock className="mr-2 text-primary" /> Select a Time
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((time) => (
                      <div 
                        key={time}
                        className={`border p-2 rounded text-center cursor-pointer transition-all duration-300 ${
                          bookingData.time === time 
                            ? 'border-primary bg-primary bg-opacity-5 text-primary' 
                            : 'border-gray-200 hover:border-primary'
                        }`}
                        onClick={() => handleTimeSelection(time)}
                      >
                        {time}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between mt-8">
                <button 
                  className="btn-secondary"
                  onClick={prevStep}
                >
                  Back
                </button>
                <button 
                  className="btn-primary"
                  onClick={nextStep}
                  disabled={!bookingData.date || !bookingData.time}
                >
                  Continue
                </button>
              </div>
            </div>
          )}
          
          {/* Step 3: Personal Details */}
          {step === 3 && (
            <div>
              <h3 className="font-serif text-xl font-semibold mb-6 flex items-center">
                <FaUser className="mr-2 text-primary" /> Your Information
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={bookingData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={bookingData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Your email"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={bookingData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Your phone number"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="notes" className="block text-gray-700 mb-2">Special Requests (Optional)</label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={bookingData.notes}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Any special requests or notes for your appointment"
                  ></textarea>
                </div>
                
                <div className="bg-primary bg-opacity-5 border border-primary border-opacity-20 p-4 rounded-lg">
                  <h4 className="font-serif text-lg font-semibold mb-2">Booking Summary</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-gray-600">Service:</div>
                    <div className="font-medium">{services.find(s => s.id === bookingData.service)?.name}</div>
                    
                    <div className="text-gray-600">Stylist:</div>
                    <div className="font-medium">{stylists.find(s => s.id === bookingData.stylist)?.name}</div>
                    
                    <div className="text-gray-600">Date:</div>
                    <div className="font-medium">{bookingData.date}</div>
                    
                    <div className="text-gray-600">Time:</div>
                    <div className="font-medium">{bookingData.time}</div>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <button 
                    type="button"
                    className="btn-secondary"
                    onClick={prevStep}
                  >
                    Back
                  </button>
                  <button 
                    type="submit"
                    className="btn-primary"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Booking