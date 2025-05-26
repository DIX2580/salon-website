import { Link } from 'react-router-dom'
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-16 pb-6">
      <div className="container">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Link to="/" className="font-serif text-2xl font-bold text-white mb-4 block">
              Hair Hacker
            </Link>
            <p className="text-gray-300 mb-6">
              A premium salon dedicated to enhancing your natural beauty with our expert services and personalized care.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white bg-opacity-10 flex items-center justify-center hover:bg-primary transition-colors duration-300">
                <FaFacebookF />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white bg-opacity-10 flex items-center justify-center hover:bg-primary transition-colors duration-300">
                <FaInstagram />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white bg-opacity-10 flex items-center justify-center hover:bg-primary transition-colors duration-300">
                <FaTiktok />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white bg-opacity-10 flex items-center justify-center hover:bg-primary transition-colors duration-300">
                <FaYoutube />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-serif text-xl font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-primary transition-colors duration-300">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-primary transition-colors duration-300">About Us</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-primary transition-colors duration-300">Our Services</Link>
              </li>
              <li>
                <Link to="/team" className="text-gray-300 hover:text-primary transition-colors duration-300">Our Team</Link>
              </li>
              <li>
                <Link to="/gallery" className="text-gray-300 hover:text-primary transition-colors duration-300">Gallery</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-primary transition-colors duration-300">Contact Us</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif text-xl font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/services" className="text-gray-300 hover:text-primary transition-colors duration-300">Hair Styling</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-primary transition-colors duration-300">Hair Coloring</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-primary transition-colors duration-300">Hair Extensions</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-primary transition-colors duration-300">Facial Treatments</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-primary transition-colors duration-300">Manicure & Pedicure</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-primary transition-colors duration-300">Waxing & Threading</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif text-xl font-semibold mb-6">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-primary mt-1 mr-3" />
                <span className="text-gray-300">Plot no-606/736, Bomikhal, Near Utkal Hyundai <br />Bhubaneswar, Odisha 751010</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="text-primary mr-3" />
                <span className="text-gray-300">(+91) 9668265622</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-primary mr-3" />
                <span className="text-gray-300">info@Hair Hackersalon.com</span>
              </li>
            </ul>
            <div className="mt-6">
              <Link to="/booking" className="btn-primary">
                Book Now
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Hair Hacker Salon. All Rights Reserved.
            </p>
            <div className="flex space-x-4 text-gray-400 text-sm">
              <a href="#" className="hover:text-primary transition-colors duration-300">Privacy Policy</a>
              <span>|</span>
              <a href="#" className="hover:text-primary transition-colors duration-300">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
export default Footer
