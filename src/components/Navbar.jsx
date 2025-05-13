import { useState, useEffect, useRef, Suspense, lazy } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { useSpring, animated } from '@react-spring/web'
import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera, useTexture, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

// 3D animated background component using React Three Fiber with enhanced animation
const AnimatedBackground = () => {
  const mesh = useRef()
  const [clicked, setClicked] = useState(false)
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    mesh.current.rotation.x = Math.sin(time / 4) / 8
    mesh.current.rotation.y = Math.sin(time / 2) / 8
    mesh.current.position.z = Math.sin(time / 4) / 8
    
    // Add gentle pulsing effect for more dynamic appearance
    const pulseScale = 1 + Math.sin(time * 2) * 0.03
    mesh.current.scale.x = 3 * pulseScale
    mesh.current.scale.y = 3 * pulseScale
    
    // Add color changes for more visual interest
    if (mesh.current.material) {
      const hue = (time * 0.05) % 1
      mesh.current.material.color.setHSL(hue, 0.5, 0.2)
    }
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
        metalness={0.3}
      />
    </mesh>
  )
}

// Logo component with modern reveal animation
const Logo = () => {
  const springProps = useSpring({
    from: { opacity: 1, transform: 'translateY(0px)' },
    to: [
      { opacity: 1, transform: 'translateY(0px)' },
      { opacity: 1, transform: 'translateY(-5px)', config: { tension: 300, friction: 10 } },
      { opacity: 1, transform: 'translateY(0px)', config: { tension: 300, friction: 15 } }
    ],
    config: { tension: 300, friction: 15 },
    delay: 100
  })

  return (
    <animated.div style={springProps} className="relative">
      <Link to="/" className="font-serif text-2xl font-bold text-primary relative inline-block">
        <span className="relative z-10">Hair Hacker</span>
        <animated.div className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary origin-left transform scale-x-0 animate-expand" />
      </Link>
    </animated.div>
  )
}

// Individual NavLink with enhanced hover effects
const NavLink = ({ to, isActive, children, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Link
        to={to}
        className={`relative transition-colors duration-300 hover:text-primary overflow-hidden ${
          isActive ? 'text-primary font-medium' : 'text-gray-200'
        }`}
        onClick={onClick}
      >
        <span className="relative z-10">{children}</span>
        
        {/* Hover animation underline effect */}
        <motion.span 
          className="absolute bottom-0 left-0 w-full h-0.5 bg-primary origin-left" 
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />
        
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

// Button component with enhanced animation
const AnimatedButton = ({ children, to, onClick }) => {
  const [isHovered, setIsHovered] = useState(false)
  
  const springProps = useSpring({
    transform: isHovered ? 'scale(1.05) translateY(-2px)' : 'scale(1) translateY(0px)',
    boxShadow: isHovered 
      ? '0 10px 15px -3px rgba(249, 115, 22, 0.3), 0 4px 6px -2px rgba(249, 115, 22, 0.2)' 
      : '0 4px 6px -1px rgba(249, 115, 22, 0.1), 0 2px 4px -1px rgba(249, 115, 22, 0.06)',
    background: isHovered
      ? 'linear-gradient(135deg, #ff8a00, #e53e3e)'
      : 'linear-gradient(135deg, #f97316, #f59e0b)',
    config: { tension: 300, friction: 20 }
  })

  return (
    <animated.div 
      style={springProps}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="rounded-lg overflow-hidden"
    >
      <Link
        to={to}
        className="flex items-center justify-center text-white px-6 py-2 font-medium relative overflow-hidden"
        onClick={onClick}
      >
        <span className="relative z-10">{children}</span>
        {isHovered && (
          <animated.div 
            className="absolute inset-0 bg-white opacity-10"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 30, opacity: 0.15 }}
            style={{
              transformOrigin: 'center'
            }}
          />
        )}
      </Link>
    </animated.div>
  )
}

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [is3DLoaded, setIs3DLoaded] = useState(false)
  const location = useLocation()
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Team', path: '/team' },
    { name: 'Contact', path: '/contact' },
  ]
  
  // Enhanced React Spring animation for navbar background
  const navbarSpring = useSpring({
    backgroundColor: isScrolled ? 'rgba(17, 24, 39, 0.95)' : 'rgba(17, 24, 39, 0.7)',
    height: isScrolled ? '4rem' : '5rem',
    backdropFilter: 'blur(8px)',
    boxShadow: isScrolled 
      ? '0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)' 
      : 'none',
    borderBottom: isScrolled 
      ? '1px solid rgba(255, 255, 255, 0.1)' 
      : '1px solid rgba(255, 255, 255, 0)',
    config: { tension: 280, friction: 20, mass: 1 }
  })

  // Enhanced mobile menu animations
  const menuVariants = {
    closed: { 
      opacity: 0,
      height: 0,
      transition: { 
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: { 
      opacity: 1, 
      height: 'auto',
      transition: { 
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
        when: "beforeChildren",
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  }

  const menuItemVariants = {
    closed: { y: -15, opacity: 0 },
    open: (i) => ({ 
      y: 0, 
      opacity: 1,
      transition: {
        delay: i * 0.06,
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    })
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

    // Load 3D background after core content is displayed
    const timer = setTimeout(() => {
      setIs3DLoaded(true)
    }, 100);

    // Add CSS animation keyframe for the logo underline
    const style = document.createElement('style');
    style.textContent = `
      @keyframes expandWidth {
        0% { transform: scaleX(0); }
        100% { transform: scaleX(1); }
      }
      .animate-expand {
        animation: expandWidth 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.5s forwards;
      }
    `;
    document.head.appendChild(style);

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timer)
      document.head.removeChild(style);
    }
  }, [])

  return (
    <animated.header
      style={navbarSpring}
      className="fixed w-full z-50"
    >
      {/* 3D animated background - rendered conditionally */}
      {is3DLoaded && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Canvas>
            <Suspense fallback={null}>
              <PerspectiveCamera makeDefault position={[0, 0, 5]} />
              <ambientLight intensity={0.5} />
              <pointLight position={[-10, -10, -10]} intensity={0.5} />
              <pointLight position={[10, 10, 10]} color="#ff6b6b" intensity={0.3} />
              <AnimatedBackground />
            </Suspense>
          </Canvas>
        </div>
      )}

      {/* Solid fallback background color with gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800 z-0"></div>

      <div className="container mx-auto flex justify-between items-center h-full px-4 relative z-10">
        {/* Initial animation for content entry */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full flex justify-between items-center"
        >
          <Logo />
          
          {/* Mobile menu button with animation */}
          <motion.button
            className="lg:hidden text-gray-200 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
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
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 1), duration: 0.5 }}
              >
                <NavLink
                  to={link.path}
                  isActive={location.pathname === link.path}
                >
                  {link.name}
                </NavLink>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (navLinks.length + 1), duration: 0.5 }}
            >
              <AnimatedButton to="/booking">
                Book Now
              </AnimatedButton>
            </motion.div>
          </nav>
        </motion.div>
      </div>
      
      {/* Mobile Navigation with enhanced Framer Motion animations */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="lg:hidden absolute top-full left-0 right-0 bg-gradient-to-b from-gray-900 to-gray-800 shadow-lg backdrop-blur-md"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <motion.div 
              className="absolute inset-0 bg-black opacity-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              exit={{ opacity: 0 }}
            />
            <motion.nav className="flex flex-col space-y-4 container py-6 px-4">
              {navLinks.map((link, index) => (
                <motion.div 
                  key={link.name} 
                  variants={menuItemVariants}
                  custom={index}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 40,
                    delay: index * 0.05
                  }}
                >
                  <NavLink
                    to={link.path}
                    isActive={location.pathname === link.path}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </NavLink>
                </motion.div>
              ))}
              <motion.div 
                variants={menuItemVariants} 
                className="pt-2"
                custom={navLinks.length}
                transition={{
                  type: "spring",
                  stiffness: 400, 
                  damping: 40,
                  delay: navLinks.length * 0.05
                }}
              >
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

