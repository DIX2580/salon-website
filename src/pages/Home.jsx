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
    <div className='pt-10'><Hero /></div>
          <hr/>
      <div className='pt-1'></div>
       <Services />
         <hr/>
      <div className='pt-1'></div>
      
      <About />
         <hr/>
      <div className='pt-1'></div>
      
     
      <Team />
         <hr/>
      <div className='pt-1'></div>
      <Gallery />
         <hr/>
      <div className='pt-1'></div>
      <Testimonials />
         <hr/>
      <div className='pt-1'></div>
      <Booking />
         <hr/>
      <div className='pt-1'></div>
            <Contact />

    </>
  )
}

export default Home