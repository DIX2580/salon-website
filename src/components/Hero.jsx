import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaArrowRight } from 'react-icons/fa';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, PerspectiveCamera } from '@react-three/drei';
import { Suspense } from 'react';
import * as THREE from 'three';
import SpecialOffersPopup from './SpecialOffersPopup';

// Animated floating particles in 3D space
const Particles = ({ count = 100 }) => {
  const mesh = useRef();
  const [positions, setPositions] = useState(() => {
    const positions = [];
    for (let i = 0; i < count; i++) {
      positions.push({
        x: (Math.random() - 0.5) * 20,
        y: (Math.random() - 0.5) * 20,
        z: (Math.random() - 0.5) * 20,
        rotationSpeed: Math.random() * 0.01,
        size: Math.random() * 0.2 + 0.1
      });
    }
    return positions;
  });

  useFrame((state) => {
    mesh.current.rotation.y += 0.001;
    mesh.current.rotation.x += 0.0005;
  });

  return (
    <group ref={mesh}>
      {positions.map((particle, i) => (
        <mesh key={i} position={[particle.x, particle.y, particle.z]}>
          <sphereGeometry args={[particle.size, 8, 8]} />
          <meshStandardMaterial 
            color="#8A57E9" 
            emissive="#8A57E9"
            emissiveIntensity={0.5}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
};

// Background 3D scene
const BackgroundScene = () => {
  return (
    <Canvas className="hidden md:block" style={{ position: 'absolute', top: 0, left: 0 }}>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={75} />
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} />
      <Suspense fallback={null}>
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <Particles count={50} />
        </Float>
        <Environment preset="night" />
      </Suspense>
    </Canvas>
  );
};

// Service card component with hover animation
const ServiceCard = ({ title, description }) => {
  return (
    <motion.div 
      whileHover={{ 
        scale: 1.05,
        boxShadow: '0 8px 30px rgba(138, 87, 233, 0.25)'
      }}
      transition={{ duration: 0.2 }}
      className="bg-darkSecondary bg-opacity-60 backdrop-blur-md p-4 rounded-lg border border-gray-800 hover:border-primary transition-colors duration-300"
    >
      <h3 className="font-medium text-primary mb-1">{title}</h3>
      <p className="text-sm text-gray-300">{description}</p>
    </motion.div>
  );
};

// Video Background Component
const VideoBackground = () => {
  const videoRef = useRef();
  
  useEffect(() => {
    // Ensure video plays automatically and loops
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Video play failed:", error);
      });
    }
  }, []);

  return (
    <motion.div 
      className="absolute right-0 top-0 h-full w-full md:w-1/2 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.85 }}
      transition={{ duration: 1.5 }}
    >
      <div className="relative h-full w-full">
        {/* Video gradient overlay - stronger on mobile */}
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black z-10 opacity-90 md:opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black z-10 opacity-70 md:opacity-40" />
        
        {/* Extra overlay for small screens to ensure text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-60 md:bg-opacity-0 z-10"></div>
        
        {/* Border effect - visible on larger screens */}
        <div className="absolute inset-0 border-l border-primary opacity-0 md:opacity-20 z-20"></div>
        
        {/* The video element */}
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          disablePictureInPicture
          disableRemotePlayback
          controlsList="nodownload nofullscreen noremoteplayback"
          style={{
            pointerEvents: 'none', // Prevents interaction with the video
          }}
        >
          <source src="/videoplayback.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </motion.div>
  );
};

const Hero = () => {
  const controls = useAnimation();
  const contentRef = useRef();

  useEffect(() => {
    controls.start('visible');
    
    // Optional: Parallax effect on scroll
    const handleScroll = () => {
      if (contentRef.current) {
        const scrollY = window.scrollY;
        contentRef.current.style.transform = `translateY(${scrollY * 0.1}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [controls]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* 3D Background */}
      <BackgroundScene />
      
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0 opacity-70"
        style={{
          backgroundImage: "url('/images/hero-bg.jpg')",
        }}
      />
      
      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-0 opacity-90" />
      
      {/* Animated Gradient Effect */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-primary opacity-10 rounded-full blur-3xl animate-blob"></div>
      <div className="absolute top-1/2 -right-20 w-96 h-96 bg-purple-700 opacity-10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-indigo-500 opacity-10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      
      {/* Video Background */}
      <VideoBackground />
      
      {/* Content */}
      <div ref={contentRef} className="container relative z-20 py-20 px-4 md:px-0 text-left">
        <motion.div 
          className="max-w-md md:max-w-2xl"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <motion.div 
            className="mb-6 inline-block px-12 py-2 bg-primary bg-opacity-20 rounded-full"
            variants={itemVariants}
          >
            <span className="text-primary font-medium">Premium Unisex Salon</span>
          </motion.div>
          
          <motion.h1 
            className="font-serif text-3xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight"
            variants={itemVariants}
          >
            Style With{" "}
            <motion.span 
              className="text-primary inline-block"
              animate={{ 
                textShadow: ["0 0 5px rgba(138, 87, 233, 0)", "0 0 15px rgba(138, 87, 233, 0.5)", "0 0 5px rgba(138, 87, 233, 0)"],
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            >
              Confidence
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="text-base md:text-xl max-w-xl mb-8 md:mb-10 text-gray-300"
            variants={itemVariants}
          >
            Where precision meets passion. Experience personalized styling for all genders in our modern, luxurious atmosphere.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            variants={itemVariants}
          >
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
              <Link 
                to="/booking" 
                className="btn-primary flex items-center justify-center px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-md transition-colors duration-300"
              >
                <FaCalendarAlt className="mr-2" />
                Book Appointment
              </Link>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
              <Link 
                to="/services" 
                className="btn-secondary flex items-center justify-center px-6 py-3 border border-primary text-primary hover:bg-primary hover:bg-opacity-10 rounded-md transition-colors duration-300"
              >
                Explore Services <FaArrowRight className="ml-2" />
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Service Highlights */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 md:mt-16"
            variants={itemVariants}
          >
            <ServiceCard 
              title="Haircuts" 
              description="For all styles & genders" 
            />
            <ServiceCard 
              title="Color Studio" 
              description="Express your uniqueness" 
            />
            <ServiceCard 
              title="Grooming" 
              description="Beard trims & more" 
            />
          </motion.div>
        </motion.div>
      </div>
      
      {/* Special Offers Popup */}
      <SpecialOffersPopup />
    </section>
  );
};

// Add keyframes for blob animation to your CSS file
const style = document.createElement('style');
style.textContent = `
  @keyframes blob {
    0%, 100% { transform: translate(0, 0) scale(1); }
    25% { transform: translate(20px, -30px) scale(1.1); }
    50% { transform: translate(-20px, 20px) scale(0.9); }
    75% { transform: translate(30px, 30px) scale(1.05); }
  }
  
  .animate-blob {
    animation: blob 15s infinite;
  }
  
  .animation-delay-2000 {
    animation-delay: 2s;
  }
  
  .animation-delay-4000 {
    animation-delay: 4s;
  }
`;
document.head.appendChild(style);

export default Hero;