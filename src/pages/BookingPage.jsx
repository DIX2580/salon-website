import Booking from '../components/Booking'

const BookingPage = () => {
  return (
    <div className="pt-20">
      <div className="bg-primary text-white py-20 text-center">
        <div className="container">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Book an Appointment</h1>
          <p className="max-w-3xl mx-auto">Schedule your visit with our talented team of beauty professionals.</p>
        </div>
      </div>
      <Booking />
    </div>
  )
}

export default BookingPage