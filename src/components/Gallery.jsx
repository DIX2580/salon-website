import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  
  const galleryImages = [
    { src: "/images/gallery-1.jpg", category: "Hair" },
    { src: "/images/gallery-2.jpg", category: "Color" },
    { src: "/images/gallery-3.jpg", category: "Facial" },
    { src: "/images/gallery-4.jpg", category: "Nails" },
    { src: "/images/gallery-5.jpg", category: "Hair" },
    { src: "/images/gallery-6.jpg", category: "Color" },
    { src: "/images/gallery-7.jpg", category: "Facial" },
    { src: "/images/gallery-8.jpg", category: "Nails" },
  ]
  
  return (
    <section id="gallery" className="py-20 bg-light">
      <div className="container">
        <div className="text-center mb-16">
          <span className="section-subtitle">Our Gallery</span>
          <h2 className="section-title">Our Beautiful Work</h2>
          <p className="max-w-3xl mx-auto text-gray-600">
            Browse through our gallery showcasing our latest styles, colors, and beauty treatments.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <div 
              key={index} 
              className="relative overflow-hidden group cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              <img 
                src={image.src} 
                alt={`Gallery image ${index + 1}`}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-primary bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                <span className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {image.category}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Lightbox */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl w-full">
              <button 
                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                <FaTimes size={24} />
              </button>
              <img 
                src={selectedImage.src} 
                alt="Gallery preview" 
                className="w-full h-auto"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Gallery
