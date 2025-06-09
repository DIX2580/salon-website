import { Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import GalleryPage from './pages/GalleryPage'
import TeamPage from './pages/TeamPage'
import ContactPage from './pages/ContactPage'
import BookingPage from './pages/BookingPage'
import PaymentRequiredPage from './pages/PaymentRequiredPage'
function App() {
  const [paymentStatus, setPaymentStatus] = useState('checking') // 'paid', 'unpaid', 'checking'

  useEffect(() => {
    // Check payment/billing status
    checkPaymentStatus()
  }, [])

  const checkPaymentStatus = async () => {
    try {
      // Replace this with your actual payment/billing API call
      const response = await fetch('/api/check-payment-status')
      const data = await response.json()
      
      if (data.isPaid) {
        setPaymentStatus('paid')
      } else {
        setPaymentStatus('unpaid')
      }
    } catch (error) {
      console.error('Error checking payment status:', error)
      // Default to unpaid on error for security
      setPaymentStatus('unpaid')
    }
  }

  // Show loading while checking payment status
  if (paymentStatus === 'checking') {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Checking account status...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // If payment is not made, redirect to payment required page
  if (paymentStatus === 'unpaid') {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/payment-required" element={<PaymentRequiredPage />} />
            <Route path="*" element={<Navigate to="/payment-required" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    )
  }

  // Normal app routes when payment is confirmed
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/booking" element={<BookingPage />} />
          {/* Catch all route for 404s */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
