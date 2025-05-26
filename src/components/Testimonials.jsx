import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const TestimonialSeparator = () => (
  <div className="flex items-center justify-center py-10">
    <div className="h-0.5 w-16 bg-gray-700"></div>
    <div className="mx-4">
      <div className="h-2 w-2 bg-primary rotate-45"></div>
    </div>
    <div className="h-0.5 w-16 bg-gray-700"></div>
  </div>
)

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0) // -1 for left, 1 for right
  
  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 8000)
    
    return () => clearInterval(interval)
  }, [currentIndex])
  
  const testimonials = [
    {
      name: "Payalpriyadarsini Sahoo",
      image: "9th.jpg",
      text: "I have visited for the first time and this was one of the best place to do your hair and the staff was also good and akash attended me and he dose as perfect as imagined one of the best hairstylist!",
      rating: 5,
      role: "Regular Client"
    },
    {
      name: "Satyanarayan Routray",
      image: "10th.jpg",
      text: "It's one of a best unisex parlor in Bhubaneswar which is situated at Rasulgarh. The Behavior and attitude of staffs so impressive with beautiful services..",
      rating: 5,
      role: "First-time Visitor"
    },
    {
      name: "Ajnabi Parida",
      image: "11th.jpg",
      text: "Very nice service and very friendly behavior and i am so happy thank you so much Nikita 🥰excellent massage full on relaxed all employee service and behavior to Good it's really good salon thank you the hair hacker team Services!",
      rating: 4,
      role: "Spa Client"
    }
  ]
  
  const nextSlide = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
  }
  
  const prevSlide = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
  }

  const variants = {
    enter: (direction) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
      }
    },
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => {
      return {
        x: direction < 0 ? 1000 : -1000,
        opacity: 0
      }
    }
  }
  
  return (
    <section id="testimonials" className="bg-black text-white py-20">
      <TestimonialSeparator />
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block text-primary font-medium mb-2"
          >
            TESTIMONIALS
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            What Our Clients Say
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="h-1 w-20 bg-primary mx-auto mb-6"
          />
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="max-w-3xl mx-auto text-gray-400"
          >
            Don't just take our word for it. Here's what our valued clients have to say about their experiences.
          </motion.p>
        </div>
        
        <div className="max-w-4xl mx-auto relative">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-gray-900 p-8 md:p-12 rounded-lg shadow-xl"
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden flex-shrink-0 border-2 border-primary p-1"
                >
                  <img 
                    src={testimonials[currentIndex].image} 
                    alt={testimonials[currentIndex].name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </motion.div>
                <div className="flex-1">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <FaQuoteLeft className="text-primary text-4xl mb-4" />
                    <p className="text-gray-300 italic mb-6 text-lg">{testimonials[currentIndex].text}</p>
                    
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <FaStar 
                          key={i}
                          className={`${i < testimonials[currentIndex].rating ? 'text-yellow-400' : 'text-gray-700'} text-lg`}
                        />
                      ))}
                    </div>
                    
                    <h4 className="font-serif text-xl font-semibold text-white">{testimonials[currentIndex].name}</h4>
                    <p className="text-primary">{testimonials[currentIndex].role}</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          <div className="flex justify-center mt-8 gap-4">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 rounded-full bg-gray-900 border border-gray-700 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors duration-300"
              onClick={prevSlide}
            >
              <FaChevronLeft />
            </motion.button>
            
            <motion.div className="flex gap-2 items-center">
              {testimonials.map((_, index) => (
                <motion.button 
                  key={index}
                  className={`w-2 h-2 rounded-full ${currentIndex === index ? 'bg-primary' : 'bg-gray-700'}`}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1)
                    setCurrentIndex(index)
                  }}
                />
              ))}
            </motion.div>
            
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 rounded-full bg-gray-900 border border-gray-700 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors duration-300"
              onClick={nextSlide}
            >
              <FaChevronRight />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials