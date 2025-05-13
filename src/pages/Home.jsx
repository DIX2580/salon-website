import Hero from '../components/Hero'
import About from '../components/About'
import Services from '../components/Services'
import Team from '../components/Team'
import Gallery from '../components/Gallery'
import Testimonials from '../components/Testimonials'
import Contact from '../components/Contact'
import Booking from '../components/Booking'

const Home = () => {
  return (
    <>
    <div className='pt-10n'><Hero /></div>
      
      <About />
      <Services />
      <Team />
      <Gallery />
      <Testimonials />
      <Booking />
            <Contact />

    </>
  )
}

export default Home