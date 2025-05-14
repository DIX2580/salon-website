import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useAnimation, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const textRefs = useRef([]);
  const imageRefs = useRef([]);
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

  // Framer Motion particles setup
  const generateParticles = (count) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: 15 + Math.random() * 15,
      delay: Math.random() * 10,
      color: i % 4 === 0 ? '#9c27b0' : i % 4 === 1 ? '#e91e63' : i % 4 === 2 ? '#3f51b5' : '#01579b'
    }));
  };
  
  const particles = generateParticles(100);
  const backgroundControls = useAnimation();
  
  // Animate background with Framer Motion
  useEffect(() => {
    backgroundControls.start({
      opacity: [0.5, 0.7, 0.5],
      transition: {
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    });
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
  
  // Scroll-based animations with Framer Motion
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);
  const y = useTransform(scrollYProgress, [0, 0.2], [100, 0]);

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
  
  // Framer Motion background variants
  const backgroundVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 0.6,
      transition: {
        duration: 1.5
      }
    }
  };
  
  // Diagonal lines animations
  const lineVariants = {
    initial: (i) => ({
      left: '-20%',
      top: `${Math.random() * 100}%`,
      rotate: -5 + Math.random() * 10,
    }),
    animate: {
      left: '100%',
      transition: {
        duration: index => 15 + Math.random() * 20,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  return (
    <motion.section 
      id="about" 
      ref={sectionRef}
      className="relative py-32 overflow-hidden min-h-screen flex items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Framer Motion Animated Background with particles */}
      <motion.div 
        className="absolute inset-0 -z-10" 
        initial="hidden"
        animate="visible"
        variants={backgroundVariants}
      >
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>
      
      {/* Dark theme background with gradient overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#121212] to-[#1a1a1a] -z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      />
      
      {/* Additional gradient overlay for depth */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-0 opacity-90"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.9 }}
        transition={{ duration: 1.5, delay: 0.3 }}
      />
      
      {/* Subtle grid overlay for depth */}
      <motion.div 
        className="absolute inset-0 bg-[url('/grid.png')] bg-repeat opacity-5 z-0"
        style={{ backgroundSize: '30px 30px' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 2 }}
      />
      
      {/* Dark gradient overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1.8, delay: 0.2 }}
      />
      
      {/* Accent light effects with Framer Motion */}
      <motion.div 
        className="absolute top-1/4 -left-12 w-72 h-72 bg-primary rounded-full blur-3xl -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05, scale: [0.8, 1.1, 0.8] }}
        transition={{ 
          opacity: { duration: 2 },
          scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
        }}
      />
      
      <motion.div 
        className="absolute bottom-1/4 -right-12 w-96 h-96 bg-primary rounded-full blur-3xl -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05, scale: [1, 0.8, 1] }}
        transition={{ 
          opacity: { duration: 2 },
          scale: { duration: 10, repeat: Infinity, ease: "easeInOut" }
        }}
      />
      
      {/* Animated diagonal lines with Framer Motion */}
      <div className="absolute inset-0 overflow-hidden z-0 opacity-10">
        {[...Array(10)].map((_, i) => (
          <motion.div 
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-primary to-transparent"
            style={{
              width: '140%',
            }}
            custom={i}
            variants={lineVariants}
            initial="initial"
            animate="animate"
          />
        ))}
      </div>
      
      <motion.div 
        className="container mx-auto px-4 relative z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
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
                <motion.span 
                  className="px-6 py-2 rounded-full text-white font-medium tracking-wider flex items-center space-x-2 relative overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <motion.span 
                    className="absolute inset-0 bg-primary rounded-full"
                    animate={{ opacity: [0.8, 0.95, 0.8] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <motion.span 
                    className="absolute inset-0 bg-primary rounded-full"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    style={{ opacity: 0.9 }}
                  />
                  <motion.span 
                    className="w-2 h-2 bg-white rounded-full inline-block mr-2 relative z-10"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <span className="relative z-10">ABOUT US</span>
                </motion.span>
                
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
            
            <motion.h2 
              ref={addToTextRefs} 
              className="font-serif text-5xl md:text-6xl font-bold mb-8 leading-tight text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Your Style <span className="text-primary inline-block relative">
                Sanctuary
                <motion.span 
                  className="absolute -bottom-2 left-0 h-1 bg-primary"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                />
              </span> For Everyone
            </motion.h2>
            
            <motion.p 
              ref={addToTextRefs} 
              className="text-gray-300 leading-relaxed text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Style Studio is more than just a salon; it's a sanctuary where beauty and personal style converge for all.
              Founded with the vision to provide exceptional hair and beauty services in a welcoming atmosphere,
              we've been helping clients of all genders express their unique identity for over a decade.
            </motion.p>
            
            <motion.p 
              ref={addToTextRefs} 
              className="text-gray-300 leading-relaxed text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Our diverse team of highly skilled stylists and beauty therapists are passionate about their craft
              and committed to staying at the forefront of the latest trends and techniques.
              We believe in personalized care that celebrates individuality, using only premium products
              that deliver outstanding results while caring for your hair and skin.
            </motion.p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8">
              <motion.div 
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
                className="bg-black/50 backdrop-blur-lg p-7 rounded-xl border-l-4 border-primary shadow-lg shadow-primary/10"
              >
                <div className="flex items-center mb-4">
                  <motion.div 
                    className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mr-4"
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.6 }}
                  >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </motion.div>
                  <motion.h3 
                    className="font-serif text-2xl font-semibold text-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    Expert Stylists
                  </motion.h3>
                </div>
                <motion.p 
                  variants={textVariants} 
                  className="text-gray-300 pl-16"
                >
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
                className="bg-black/50 backdrop-blur-lg p-7 rounded-xl border-l-4 border-primary shadow-lg shadow-primary/10"
              >
                <div className="flex items-center mb-4">
                  <motion.div 
                    className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mr-4"
                    animate={{ 
                      boxShadow: ['0 0 0 0 rgba(156, 39, 176, 0)', '0 0 0 10px rgba(156, 39, 176, 0.1)', '0 0 0 0 rgba(156, 39, 176, 0)'] 
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </motion.div>
                  <motion.h3 
                    className="font-serif text-2xl font-semibold text-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    Premium Products
                  </motion.h3>
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
                  <motion.img
                    src="/hair2.png"
                    alt="Unisex salon interior"
                    className="w-full h-52 object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.7 }}
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"
                    initial={{ opacity: 0.6 }}
                    whileHover={{ opacity: 0.4 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Animated overlay on hover */}
                  <motion.div 
                    className="absolute inset-0 bg-primary/20"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.6 }}
                    transition={{ duration: 0.5 }}
                  />
                  
                  <motion.div 
                    className="absolute bottom-0 left-0 p-4"
                    initial={{ y: "100%" }}
                    whileHover={{ y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h4 className="text-white font-medium">Modern Space</h4>
                  </motion.div>
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
                  <motion.img
                    src="/hair.jpg"
                    alt="Hair styling"
                    className="w-full h-64 object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.7 }}
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"
                    initial={{ opacity: 0.6 }}
                    whileHover={{ opacity: 0.4 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Animated overlay on hover */}
                  <motion.div 
                    className="absolute inset-0 bg-primary/20"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.6 }}
                    transition={{ duration: 0.5 }}
                  />
                  
                  <motion.div 
                    className="absolute bottom-0 left-0 p-4"
                    initial={{ y: "100%" }}
                    whileHover={{ y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h4 className="text-white font-medium">Inclusive Styling</h4>
                  </motion.div>
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
                  <motion.img
                    src="/hair3.png"
                    alt="Unisex beauty treatments"
                    className="w-full h-96 object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.7 }}
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"
                    initial={{ opacity: 0.6 }}
                    whileHover={{ opacity: 0.4 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Animated overlay on hover */}
                  <motion.div 
                    className="absolute inset-0 bg-primary/20"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.6 }}
                    transition={{ duration: 0.5 }}
                  />
                  
                  <motion.div 
                    className="absolute bottom-0 left-0 p-4"
                    initial={{ y: "100%" }}
                    whileHover={{ y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h4 className="text-white font-medium">Premium Treatments</h4>
                  </motion.div>
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
              <motion.div 
                className="absolute inset-0 bg-primary/20"
                animate={{ opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div 
                className="absolute inset-0"
                animate={{ opacity: [0.1, 0.4, 0.1] }}
                transition={{ duration: 4, repeat: Infinity }}
                style={{
                  background: "radial-gradient(circle at center, rgba(255, 255, 255, 0.3) 0%, transparent 70%)",
                }}
              />
              
              <div className="text-center relative z-10">
                <motion.h4 
                  className="text-primary inline-block font-semibold mb-1"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  9+ Years
                </motion.h4>
                <p className="text-sm text-gray-300">of Excellence</p>
                <motion.div 
                  className="w-12 h-1 bg-primary mx-auto mt-2"
                  animate={{ width: [12, 48, 12] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      {/* Enhanced floating particles for additional depth with Framer Motion */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full text-primary"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
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
      
      {/* Enhanced scroll indicator with Framer Motion */}
<motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <p className="text-gray-400 text-sm mb-2">Scroll down</p>
        <motion.div 
          animate={{ 
            y: [0, 10, 0],
            opacity: [0.4, 1, 0.4]
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          className="w-5 h-10 border-2 border-gray-400 rounded-full flex justify-center"
        >
          <motion.div 
            animate={{ y: [0, 15, 0] }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
            className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5"
          />
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default About;