import Services from '../components/Services'

const ServicesPage = () => {
  return (
    <div className="pt-20">
      <div className="bg-primary text-white py-20 text-center">
        <div className="container">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="max-w-3xl mx-auto">Discover our full range of professional beauty and hair care services.</p>
        </div>
      </div>
      <Services />
    </div>
  )
}

export default ServicesPage