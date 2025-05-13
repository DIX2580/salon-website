import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const textRefs = useRef([]);
  const imageRefs = useRef([]);
  
  // Add refs to the array
  const addToTextRefs = (el) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };
  
  const addToImageRefs = (el) => {
    if (el && !imageRefs.current.includes(el)) {
      imageRefs.current.push(el);
    }
  };

  // Three.js background effect
  useEffect(() => {
    let scene, camera, renderer, particles;
    let animationFrameId;
    
    const initThree = () => {
      scene = new THREE.Scene();
      
      // Create camera
      camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / 300,
        0.1,
        1000
      );
      camera.position.z = 5;
      
      // Create renderer
      renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        alpha: true
      });
      renderer.setSize(window.innerWidth / 4, 300);
      
      // Create particles
      const particlesGeometry = new THREE.BufferGeometry();
      const particlesCount = 500;
      
      const posArray = new Float32Array(particlesCount * 3);
      
      for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 5;
      }
      
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      
      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: '#EB5E28',
        transparent: true,
        opacity: 0.8
      });
      
      particles = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particles);
    };
    
    // Animation loop
    const animate = () => {
      particles.rotation.y += 0.001;
      particles.rotation.x += 0.0005;
      
      renderer.render(scene, camera);
      animationFrameId = window.requestAnimationFrame(animate);
    };
    
    // Initialize and clean up
    if (canvasRef.current) {
      initThree();
      animate();
    }
    
    return () => {
      window.cancelAnimationFrame(animationFrameId);
      if (particles) {
        particles.geometry.dispose();
        particles.material.dispose();
      }
    };
  }, []);

  // GSAP animations  
  useEffect(() => {
    if (sectionRef.current) {
      // Text reveal animations
      textRefs.current.forEach((el, index) => {
        gsap.fromTo(
          el,
          { 
            y: 50, 
            opacity: 0 
          },
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.8, 
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top bottom-=100",
              toggleActions: "play none none none"
            },
            delay: index * 0.1
          }
        );
      });
      
      // Image animations
      imageRefs.current.forEach((el, index) => {
        gsap.fromTo(
          el,
          { 
            scale: 0.8, 
            opacity: 0 
          },
          { 
            scale: 1, 
            opacity: 1, 
            duration: 1, 
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: el,
              start: "top bottom-=50",
              toggleActions: "play none none none"
            },
            delay: 0.2 + (index * 0.2)
          }
        );
      });
    }
  }, []);

  // Animation variants for Framer Motion
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6,
        ease: "easeOut" 
      } 
    }
  };

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="relative py-24 overflow-hidden min-h-screen flex items-center"
    >
      {/* Background Image with Overlay - Similar to Hero */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('/images/about-bg.jpg')",
        }}
      />
      
      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-0 opacity-90" />
      
      {/* Particle effect canvas */}
      <div className="absolute right-0 top-1/4 opacity-40 pointer-events-none z-10">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div ref={addToTextRefs} className="mb-2">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="px-4 py-1 bg-primary bg-opacity-20 rounded-full text-primary font-medium"
              >
                About Us
              </motion.span>
            </div>
            
            <h2 ref={addToTextRefs} className="font-serif text-4xl md:text-5xl font-bold mb-6 leading-tight text-white">
              Your Beauty <span className="text-primary">Sanctuary</span> Since 2010
            </h2>
            
            <p ref={addToTextRefs} className="text-gray-300 leading-relaxed">
              Hair Hacker is more than just a salon; it's a sanctuary where beauty and wellness converge.
              Founded with the vision to provide exceptional hair and beauty services in a serene atmosphere,
              we've been helping our clients look and feel their best for over a decade.
            </p>
            
            <p ref={addToTextRefs} className="text-gray-300 leading-relaxed">
              Our team of highly skilled stylists and beauty therapists are passionate about their craft
              and committed to staying at the forefront of the latest trends and techniques.
              We believe in personalized care, using only premium products that deliver
              outstanding results while caring for your hair and skin.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
              <motion.div 
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-darkSecondary bg-opacity-60 backdrop-blur-md p-6 rounded-lg border-l-4 border-primary"
              >
                <h3 className="font-serif text-xl font-semibold mb-2 text-primary">Expert Stylists</h3>
                <p className="text-gray-300">Trained professionals with years of experience</p>
              </motion.div>
              
              <motion.div 
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-darkSecondary bg-opacity-60 backdrop-blur-md p-6 rounded-lg border-l-4 border-primary"
              >
                <h3 className="font-serif text-xl font-semibold mb-2 text-primary">Premium Products</h3>
                <p className="text-gray-300">Using only the highest quality beauty brands</p>
              </motion.div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-6">
              <div ref={addToImageRefs} className="overflow-hidden rounded-xl shadow-lg">
                <img
                  src="/api/placeholder/400/320"
                  alt="Salon interior"
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              
              <div ref={addToImageRefs} className="overflow-hidden rounded-xl shadow-lg">
                <img
                  src="/api/placeholder/400/320"
                  alt="Hair styling"
                  className="w-full h-64 object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
            
            <div className="pt-10">
              <div ref={addToImageRefs} className="overflow-hidden rounded-xl shadow-lg">
                <img
                  src="/api/placeholder/400/320"
                  alt="Beauty treatment"
                  className="w-full h-80 object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;