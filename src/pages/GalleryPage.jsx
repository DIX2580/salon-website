import Gallery from '../components/Gallery'

const GalleryPage = () => {
  return (
    <div className="pt-20">
      <div className="bg-primary text-white py-20 text-center">
        <div className="container">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Our Gallery</h1>
          <p className="max-w-3xl mx-auto">Browse through our collection of styles and treatments to find inspiration for your next visit.</p>
        </div>
      </div>
      <Gallery />
    </div>
  )
}

export default GalleryPage