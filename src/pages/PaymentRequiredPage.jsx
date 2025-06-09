import { useState } from 'react'

function PaymentRequiredPage() {
  const [isProcessing, setIsProcessing] = useState(false)
  const unpaidAmount = 3600 // Outstanding bill amount
  const upiId = "6371651764@ptsbi" // UPI ID from the QR code

  const handleUPIPayment = () => {
    setIsProcessing(true)
    
    // Generate UPI payment URL
    const upiUrl = `upi://pay?pa=${upiId}&pn=Dibyanjaya Panda&am=${unpaidAmount}&cu=INR&tn=Bill Payment - Account Restoration`
    
    // Try to open UPI app
    window.location.href = upiUrl
    
    // Reset processing state after a delay
    setTimeout(() => {
      setIsProcessing(false)
    }, 3000)
  }

  const handlePaymentRedirect = () => {
    setIsProcessing(true)
    // Redirect to your payment processor or billing page
    window.location.href = '/payment-portal' // Replace with your actual payment URL
  }

  const handleContactSupport = () => {
    // Redirect to contact or support page
    window.location.href = 'mailto:billing@yourcompany.com' // Replace with your support email
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 text-red-600 bg-red-100 rounded-full flex items-center justify-center">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Unpaid Bill - Service Suspended
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Your account has been temporarily suspended due to an outstanding payment.
          </p>
        </div>

        {/* Bill Details */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-red-600 px-6 py-4">
            <h3 className="text-lg font-semibold text-white">Outstanding Bill</h3>
          </div>
          <div className="px-6 py-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Account Status:</span>
              <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                Suspended
              </span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Due Date:</span>
              <span className="text-gray-900 font-medium">{new Date().toLocaleDateString()}</span>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium text-gray-900">Amount Due:</span>
                <span className="text-2xl font-bold text-red-600">₹{unpaidAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Notice */}
        <div className="rounded-md bg-yellow-50 p-4 border border-yellow-200">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Immediate Payment Required
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  Please pay the outstanding amount of <strong>₹{unpaidAmount.toLocaleString()}</strong> to restore access to your account and services.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* UPI Payment Details */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a2 2 0 114 0 2 2 0 01-4 0zm8-1a1 1 0 100-2 1 1 0 000 2z"/>
            </svg>
            <h3 className="text-sm font-medium text-blue-800">UPI Payment Details</h3>
          </div>
          <p className="text-sm text-blue-700">
            <strong>UPI ID:</strong> {upiId}<br/>
          </p>
        </div>

        {/* Payment Options */}
        <div className="space-y-4">
          <button
            onClick={handleUPIPayment}
            disabled={isProcessing}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isProcessing ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Opening UPI App...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Pay via UPI - ₹{unpaidAmount.toLocaleString()}
              </>
            )}
          </button>

          <button
            onClick={handlePaymentRedirect}
            disabled={isProcessing}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Other Payment Methods
          </button>

          <button
            onClick={handleContactSupport}
            className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Contact Billing Support
          </button>
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-500">
            Questions about your bill? Contact our billing team for assistance.
          </p>
        </div>
      </div>
    </div>
  )
}

export default PaymentRequiredPage
