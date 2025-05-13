import { useState, useEffect, useRef, Suspense } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'
import { motion , AnimatePresence } from 'framer-motion'
import { useSpring , animated } from '@react-spring/web'
import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera , useTexture , MeshDistortMaterial } from '@react-three/drei'

// 3D animated background component using React Three Fiber
const AnimatedBackground = () => {
  const mesh = useRef()
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    mesh.current.rotation.x = Math.sin(time / 4) / 8
    mesh.current.rotation.y = Math.sin(time / 2) / 8
    mesh.current.position.z = Math.sin(time / 4) / 8
  })

  return (
    <mesh ref={mesh} position={[0, 0, 0]} scale={[3, 3, 1]}>
      <planeGeometry args={[3, 3, 32, 32]} />
      <MeshDistortMaterial 
        color="#222" 
        attach="material" 
        distort={0.3} 
        speed={4} 
        roughness={0.4}
      />
    </mesh>
  )
}

// Logo component with animation
const Logo = () => {
  const springProps = useSpring({
    from: { opacity: 0, transform: 'scale(0.8)' },
    to: { opacity: 1, transform: 'scale(1)' },
    config: { tension: 200, friction: 20 }
  })

  return (
    <animated.div style={springProps}>
      <Link to="/" className="font-serif text-2xl font-bold text-primary">
        Hair Hacker
      </Link>
    </animated.div>
  )
}

// Individual NavLink with hover effects
const NavLink = ({ to, isActive, children, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link
        to={to}
        className={`relative transition-colors duration-300 hover:text-primary ${
          isActive ? 'text-primary font-medium' : 'text-gray-200'
        }`}
        onClick={onClick}
      >
        {children}
        {isActive && (
          <motion.div
            layoutId="activeIndicator"
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
      </Link>
    </motion.div>
  )
}

// Button component with animation
const AnimatedButton = ({ children, to, onClick }) => {
  const [isHovered, setIsHovered] = useState(false)
  
  const springProps = useSpring({
    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
    boxShadow: isHovered 
      ? '0 10px 15px -3px rgba(249, 115, 22, 0.3), 0 4px 6px -2px rgba(249, 115, 22, 0.2)' 
      : '0 4px 6px -1px rgba(249, 115, 22, 0.1), 0 2px 4px -1px rgba(249, 115, 22, 0.06)',
    config: { tension: 300, friction: 20 }
  })

  return (
    <animated.div 
      style={springProps}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        to={to}
        className="bg-primary text-white px-6 py-2 rounded-lg font-medium transition-all"
        onClick={onClick}
      >
        {children}
      </Link>
    </animated.div>
  )
}

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Team', path: '/team' },
    { name: 'Contact', path: '/contact' },
  ]
  
  // React Spring animation for navbar background
  const navbarSpring = useSpring({
    backgroundColor: isScrolled ? 'rgba(17, 24, 39, 0.95)' : 'rgba(17, 24, 39, 0.7)',
    height: isScrolled ? '4rem' : '5rem',
    backdropFilter: 'blur(8px)',
    boxShadow: isScrolled 
      ? '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' 
      : 'none',
    config: { tension: 200, friction: 20 }
  })

  // Mobile menu animations
  const menuVariants = {
    closed: { 
      opacity: 0,
      height: 0,
      transition: { 
        duration: 0.3,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: { 
      opacity: 1, 
      height: 'auto',
      transition: { 
        duration: 0.4,
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  }

  const menuItemVariants = {
    closed: { y: -20, opacity: 0 },
    open: { y: 0, opacity: 1 }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <animated.header
      style={navbarSpring}
      className="fixed w-full z-50"
    >
      {/* 3D animated background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Canvas>
          <Suspense fallback={null}>
            <PerspectiveCamera makeDefault position={[0, 0, 5]} />
            <ambientLight intensity={0.5} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />
            <AnimatedBackground />
          </Suspense>
        </Canvas>
      </div>

      <div className="container mx-auto flex justify-between items-center h-full px-4 relative z-10">
        <Logo />
        
        {/* Mobile menu button with animation */}
        <motion.button
          className="lg:hidden text-gray-200 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isMenuOpen ? 'close' : 'open'}
              initial={{ opacity: 0, rotate: isMenuOpen ? -90 : 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: isMenuOpen ? 90 : -90 }}
              transition={{ duration: 0.2 }}
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </motion.div>
          </AnimatePresence>
        </motion.button>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              isActive={location.pathname === link.path}
            >
              {link.name}
            </NavLink>
          ))}
          <AnimatedButton to="/booking">
            Book Now
          </AnimatedButton>
        </nav>
      </div>
      
      {/* Mobile Navigation with Framer Motion */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="lg:hidden absolute top-full left-0 right-0 bg-gray-900 shadow-lg backdrop-blur-md"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <motion.nav className="flex flex-col space-y-4 container py-6 px-4">
              {navLinks.map((link) => (
                <motion.div key={link.name} variants={menuItemVariants}>
                  <NavLink
                    to={link.path}
                    isActive={location.pathname === link.path}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </NavLink>
                </motion.div>
              ))}
              <motion.div variants={menuItemVariants} className="pt-2">
                <AnimatedButton 
                  to="/booking"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Book Now
                </AnimatedButton>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </animated.header>
  )
}

export default Navbar