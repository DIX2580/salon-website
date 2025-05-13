import { useState } from 'react'
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const testimonials = [
    {
      name: "Emma Thompson",
      image: "/images/testimonial-1.jpg",
      text: "I've been coming to Hair Hacker for over a year now, and I'm always thrilled with the results. The stylists are true professionals who listen to what you want and deliver every time. Highly recommend!",
      rating: 5
    },
    {
      name: "David Rodriguez",
      image: "/images/testimonial-2.jpg",
      text: "The atmosphere at Hair Hacker is so welcoming and relaxing. My haircut was exactly what I wanted, and the head massage during the wash was an unexpected bonus. This salon really goes above and beyond.",
      rating: 5
    },
    {
      name: "Sarah Johnson",
      image: "/images/testimonial-3.jpg",
      text: "I recently had a facial treatment at Hair Hacker and my skin has never looked better! The esthetician was knowledgeable and personalized the treatment to address my specific concerns. I've already booked my next appointment!",
      rating: 4
    }
  ]
  
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
  }
  
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
  }
  
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <span className="section-subtitle">Testimonials</span>
          <h2 className="section-title">What Our Clients Say</h2>
          <p className="max-w-3xl mx-auto text-gray-600">
            Don't just take our word for it. Here's what our valued clients have to say about their experiences.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto relative">
          <div className="bg-light p-8 md:p-12 rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden flex-shrink-0">
                <img 
                  src={testimonials[currentIndex].image} 
                  alt={testimonials[currentIndex].name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <FaQuoteLeft className="text-primary opacity-20 text-4xl mb-4" />
                <p className="text-gray-600 italic mb-6">{testimonials[currentIndex].text}</p>
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar 
                      key={i}
                      className={`${i < testimonials[currentIndex].rating ? 'text-yellow-400' : 'text-gray-300'} text-lg`}
                    />
                  ))}
                </div>
                <h4 className="font-serif text-lg font-semibold">{testimonials[currentIndex].name}</h4>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-8 gap-4">
            <button 
              className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors duration-300"
              onClick={prevSlide}
            >
              <FaChevronLeft />
            </button>
            <button 
              className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors duration-300"
              onClick={nextSlide}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials