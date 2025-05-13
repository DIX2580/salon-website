import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const textRefs = useRef([]);
  const imageRefs = useRef([]);
  const sceneRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
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

  // Enhanced Three.js background effect
  useEffect(() => {
    let scene, camera, renderer, particles, composer;
    let animationFrameId;
    let mouseX = 0;
    let mouseY = 0;
    
    // Mouse move handler for interactive background
    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    const initThree = () => {
      // Scene setup
      scene = new THREE.Scene();
      sceneRef.current = scene;
      
      // Create camera with wider FOV for dramatic effect
      camera = new THREE.PerspectiveCamera(
        90,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 3.5;
      
      // Create renderer with enhanced settings
      renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        alpha: true,
        antialias: true
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      
      // Create particles system for background - modified for unisex salon aesthetic
      const particlesGeometry = new THREE.BufferGeometry();
      const particlesCount = 2500;
      
      const posArray = new Float32Array(particlesCount * 3);
      const scaleArray = new Float32Array(particlesCount);
      const colorArray = new Float32Array(particlesCount * 3);
      
      // Create custom color palette for particles
      const colorPalette = [
        new THREE.Color('#9c27b0').toArray(), // Purple
        new THREE.Color('#e91e63').toArray(), // Pink
        new THREE.Color('#3f51b5').toArray(), // Indigo
        new THREE.Color('#01579b').toArray(), // Dark Blue
      ];
      
      for (let i = 0; i < particlesCount * 3; i += 3) {
        // Create a structured field of particles with more interesting distribution
        posArray[i] = (Math.random() - 0.5) * 20;
        posArray[i + 1] = (Math.random() - 0.5) * 20;
        posArray[i + 2] = (Math.random() - 0.5) * 15;
        
        // Vary the particle sizes with more pronounced variation
        scaleArray[i/3] = Math.random() * 2;
        
        // Assign random colors from palette
        const randomColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        colorArray[i] = randomColor[0];
        colorArray[i + 1] = randomColor[1];
        colorArray[i + 2] = randomColor[2];
      }
      
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      particlesGeometry.setAttribute('scale', new THREE.BufferAttribute(scaleArray, 1));
      particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
      
      // Create material with custom shader for more advanced look
      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.03,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
        vertexColors: true
      });
      
      particles = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particles);
      
      // Add some ambient light
      const ambientLight = new THREE.AmbientLight(0x404040);
      scene.add(ambientLight);
      
      // Add directional light for depth
      const directionalLight = new THREE.DirectionalLight(0x3f51b5, 0.4);
      directionalLight.position.set(1, 1, 1);
      scene.add(directionalLight);
      
      // Setup post-processing for bloom effect
      const renderScene = new RenderPass(scene, camera);
      
      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        0.7,  // Strength
        0.5,  // Radius
        0.7   // Threshold
      );
      
      composer = new EffectComposer(renderer);
      composer.addPass(renderScene);
      composer.addPass(bloomPass);
      
      // Add window resize handler
      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        composer.setSize(window.innerWidth, window.innerHeight);
      });
    };
    
    // Enhanced animation loop
    const animate = () => {
      // Enhanced responsive animation to mouse position
      particles.rotation.y += 0.0007;
      particles.rotation.x += 0.0003;
      
      // More dynamic sway effect based on mouse position
      particles.position.x += (mouseX * 0.08 - particles.position.x) * 0.02;
      particles.position.y += (-mouseY * 0.08 - particles.position.y) * 0.02;
      
      // Enhanced pulse effect
      const time = Date.now() * 0.0005;
      particles.material.size = 0.03 + Math.sin(time) * 0.01;
      
      // Wave effect through the particles
      const positions = particles.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 2] += Math.sin((time + positions[i] * 0.1) * 0.5) * 0.01;
      }
      particles.geometry.attributes.position.needsUpdate = true;
      
      // Use composer for rendering with post-processing
      composer.render();
      animationFrameId = window.requestAnimationFrame(animate);
    };
    
    // Initialize and clean up
    if (canvasRef.current) {
      initThree();
      animate();
    }
    
    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      
      if (particles) {
        particles.geometry.dispose();
        particles.material.dispose();
      }
      
      // Clean up any other resources
      scene.clear();
      renderer.dispose();
    };
  }, []);

  // GSAP enhanced animations  
  useEffect(() => {
    if (sectionRef.current) {
      // Text reveal animations with staggered timeline
      const textTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none none"
        }
      });
      
      textRefs.current.forEach((el, index) => {
        textTimeline.fromTo(
          el,
          { 
            y: 70, 
            opacity: 0,
            rotateX: 15
          },
          { 
            y: 0, 
            opacity: 1,
            rotateX: 0,
            duration: 0.9, 
            ease: "power3.out",
            delay: index * 0.15
          },
          index * 0.1
        );
      });
      
      // Enhanced image animations with advanced effects
      imageRefs.current.forEach((el, index) => {
        gsap.fromTo(
          el,
          { 
            scale: 0.8, 
            opacity: 0,
            y: 60,
            rotationY: 12
          },
          { 
            scale: 1, 
            opacity: 1,
            y: 0,
            rotationY: 0,
            duration: 1.4, 
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: el,
              start: "top bottom-=50",
              toggleActions: "play none none none"
            },
            delay: 0.3 + (index * 0.25)
          }
        );
      });
      
      // Parallax scrolling effect for images
      imageRefs.current.forEach((el) => {
        gsap.to(el, {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });
    }
  }, []);

  // React Spring animation for hoverable cards - replaced with Framer Motion
  const [hoverCard, setHoverCard] = useState(null);

  // Animation variants for Framer Motion - enhanced
  const cardVariants = {
    hidden: { opacity: 0, y: 40, rotateX: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      transition: { 
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
        staggerChildren: 0.1
      } 
    },
    hover: {
      scale: 1.05,
      y: -10,
      boxShadow: "0px 25px 50px -12px rgba(0, 0, 0, 0.25)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };
  
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  // Floating element variants
  const floatingVariants = {
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 6,
        ease: "easeInOut",
        repeat: Infinity,
      }
    }
  };

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="relative py-32 overflow-hidden min-h-screen flex items-center"
    >
      {/* Three.js Background Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full -z-10" 
        style={{ opacity: 0.6 }}
      />
      
      {/* Dark theme background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#121212] to-[#1a1a1a] -z-20" />
      
      {/* Additional gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-0 opacity-90" />
      
      {/* Subtle grid overlay for depth */}
      <div 
        className="absolute inset-0 bg-[url('/grid.png')] bg-repeat opacity-5 z-0"
        style={{ backgroundSize: '30px 30px' }}
      />
      
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-40 z-0" />
      
      {/* Accent light effects */}
      <div className="absolute top-1/4 -left-12 w-72 h-72 bg-primary opacity-5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 -right-12 w-96 h-96 bg-primary opacity-5 rounded-full blur-3xl -z-10" />
      
      {/* Animated diagonal lines */}
      <div className="absolute inset-0 overflow-hidden z-0 opacity-10">
        {[...Array(10)].map((_, i) => (
          <motion.div 
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-primary to-transparent"
            style={{
              top: `${Math.random() * 100}%`,
              left: '-20%',
              width: '140%',
              transform: `rotate(${-5 + Math.random() * 10}deg)`,
            }}
            animate={{
              left: ['-20%', '100%'],
            }}
            transition={{
              duration: 15 + Math.random() * 20,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "linear"
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div ref={addToTextRefs} className="mb-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.6,
                  ease: [0.34, 1.56, 0.64, 1]
                }}
                className="inline-block relative"
              >
                {/* About Us text with animated gradient background */}
                <span className="px-6 py-2 rounded-full text-white font-medium tracking-wider flex items-center space-x-2 relative overflow-hidden">
                  <span className="absolute inset-0 bg-primary opacity-90 rounded-full"></span>
                  <span className="absolute inset-0 bg-primary opacity-90 rounded-full"
                    style={{
                      animation: "gradientShift 3s linear infinite"
                    }}
                  ></span>
                  <style jsx>{`
                    @keyframes gradientShift {
                      0% { transform: translateX(-100%); }
                      100% { transform: translateX(100%); }
                    }
                  `}</style>
                  <span className="w-2 h-2 bg-white rounded-full inline-block animate-pulse mr-2 relative z-10"></span>
                  <span className="relative z-10">ABOUT US</span>
                </span>
                
                {/* Tooltip with information */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="absolute left-0 -bottom-12 bg-black/70 backdrop-blur-md text-xs text-white/90 p-2 rounded-md w-64 border border-white/10"
                >
                  Learn more about our salon, our story, and our dedicated team of beauty professionals.
                </motion.div>
              </motion.div>
            </div>
            
            <h2 ref={addToTextRefs} className="font-serif text-5xl md:text-6xl font-bold mb-8 leading-tight text-white">
              Your Style <span className="text-primary inline-block relative">
                Sanctuary
                <motion.span 
                  className="absolute -bottom-2 left-0 w-full h-1 bg-primary"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                />
              </span> For Everyone
            </h2>
            
            <p ref={addToTextRefs} className="text-gray-300 leading-relaxed text-lg">
              Style Studio is more than just a salon; it's a sanctuary where beauty and personal style converge for all.
              Founded with the vision to provide exceptional hair and beauty services in a welcoming atmosphere,
              we've been helping clients of all genders express their unique identity for over a decade.
            </p>
            
            <p ref={addToTextRefs} className="text-gray-300 leading-relaxed text-lg">
              Our diverse team of highly skilled stylists and beauty therapists are passionate about their craft
              and committed to staying at the forefront of the latest trends and techniques.
              We believe in personalized care that celebrates individuality, using only premium products
              that deliver outstanding results while caring for your hair and skin.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8">
              <motion.div 
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
                className="bg-black/50 backdrop-blur-lg p-7 rounded-xl border-l-4 border-primary shadow-lg shadow-primary/10 transform transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-white">Expert Stylists</h3>
                </div>
                <motion.p variants={textVariants} className="text-gray-300 pl-16">
                  A diverse team of professionals creating perfect looks for everyone
                </motion.p>
              </motion.div>
              
              <motion.div 
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-black/50 backdrop-blur-lg p-7 rounded-xl border-l-4 border-primary shadow-lg shadow-primary/10 transform transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-white">Premium Products</h3>
                </div>
                <motion.p variants={textVariants} className="text-gray-300 pl-16">
                  Using only high-quality products for all hair and skin types
                </motion.p>
              </motion.div>
            </div>
          </div>
          
          {/* Advanced image grid with animations and effects */}
          <div className="grid grid-cols-2 gap-6 relative">
            {/* Decorative elements */}
            <motion.div 
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute -top-12 -left-12 w-24 h-24 border border-primary/20 rounded-full"
            />
            <motion.div 
              animate={{
                rotate: [360, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute -bottom-12 -right-12 w-32 h-32 border border-primary/10 rounded-full"
            />
            
            <div className="space-y-6">
              <motion.div 
                ref={addToImageRefs}
                initial={{ opacity: 0, scale: 0.8, rotateY: 10 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                viewport={{ once: true }}
                className="group overflow-hidden rounded-2xl shadow-xl shadow-black/50 border border-primary/10 relative"
              >
                <div className="relative">
                  <img
                    src="/hair2.png"
                    alt="Unisex salon interior"
                    className="w-full h-52 object-cover transition-all duration-700 transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
                  
                  {/* Animated overlay on hover */}
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
                  
                  <div className="absolute bottom-0 left-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h4 className="text-white font-medium">Modern Space</h4>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                ref={addToImageRefs}
                initial={{ opacity: 0, scale: 0.8, rotateY: -10 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                viewport={{ once: true }}
                className="group overflow-hidden rounded-2xl shadow-xl shadow-black/50 border border-primary/10 relative"
              >
                <div className="relative">
                  <img
                    src="/hair.jpg"
                    alt="Hair styling"
                    className="w-full h-64 object-cover transition-all duration-700 transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
                  
                  {/* Animated overlay on hover */}
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
                  
                  <div className="absolute bottom-0 left-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h4 className="text-white font-medium">Inclusive Styling</h4>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <div className="pt-12">
              <motion.div 
                ref={addToImageRefs}
                initial={{ opacity: 0, scale: 0.8, rotateY: 10 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                viewport={{ once: true }}
                className="group overflow-hidden rounded-2xl shadow-xl shadow-black/50 border border-primary/10 relative"
              >
                <div className="relative">
                  <img
                    src="/hair3.png"
                    alt="Unisex beauty treatments"
                    className="w-full h-96 object-cover transition-all duration-700 transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
                  
                  {/* Animated overlay on hover */}
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
                  
                  <div className="absolute bottom-0 left-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h4 className="text-white font-medium">Premium Treatments</h4>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Interactive floating element */}
            <motion.div 
              variants={floatingVariants}
              animate="animate"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.3)'
              }}
              transition={{ 
                type: 'spring', 
                stiffness: 500, 
                damping: 30 
              }}
              className="absolute -bottom-8 -right-8 md:-right-16 w-40 h-40 bg-black/80 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-primary/30 flex items-center justify-center p-3 z-20"
            >
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-primary/20"></div>
              <div 
                className="absolute inset-0 opacity-30"
                style={{
                  background: "radial-gradient(circle at center, rgba(255, 255, 255, 0.3) 0%, transparent 70%)",
                  animation: "pulseGlow 4s ease-in-out infinite"
                }}
              >
                <style jsx>{`
                  @keyframes pulseGlow {
                    0%, 100% { opacity: 0.1; }
                    50% { opacity: 0.4; }
                  }
                `}</style>
              </div>
              
              <div className="text-center relative z-10">
                <h4 className="text-primary inline-block font-semibold mb-1">9+ Years</h4>
                <p className="text-sm text-gray-300">of Excellence</p>
                <div className="w-12 h-1 bg-primary mx-auto mt-2"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Enhanced floating particles for additional depth */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              background: i % 2 === 0 ? 'currentColor' : 'currentColor',
              className: "text-primary"
            }}
            animate={{
              y: [0, -120, 0],
              opacity: [0, 0.7, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 10,
            }}
          />
        ))}
      </div>
      
      {/* Enhanced scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center p-1">
          <motion.div 
            className="w-1 bg-primary rounded-full"
            animate={{
              height: ["20%", "60%", "20%"],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </div>
        <span className="text-primary/70 text-xs mt-2">Scroll for more</span>
      </motion.div>
    </section>
  );
};

export default About;