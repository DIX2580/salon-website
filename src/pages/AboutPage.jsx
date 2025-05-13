import About from '../components/About'
import Team from '../components/Team'
import Testimonials from '../components/Testimonials'

const AboutPage = () => {
  return (
    <div className="pt-20">
      <div className="bg-primary text-white py-20 text-center">
        <div className="container">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="max-w-3xl mx-auto">Learn more about our salon, our story, and our dedicated team of beauty professionals.</p>
        </div>
      </div>
      <About />
      <Team />
      <Testimonials />
    </div>
  )
}

export default AboutPage