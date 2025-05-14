import { useState, useEffect } from 'react';
import { 
  FaCut, 
  FaPaintBrush, 
  FaSpa, 
  FaHands, 
  FaChevronRight, 
  FaGlassMartiniAlt, 
  FaRing, 
  FaBriefcase, 
  FaMale, 
  FaFemale,
  FaLeaf
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const ServicesCard = ({ service, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative bg-gray-800 rounded-xl overflow-hidden  "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-64 rounded-[20px] overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-0 opacity-90"></div>
        
        {/* 3D Parallax Effect */}
        <motion.div 
          animate={{ 
            x: isHovered ? 10 : 0,
            y: isHovered ? -10 : 0,
            scale: isHovered ? 1.05 : 1
          }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 z-10"
        >
          <div className="absolute bottom-6 left-6 text-white">
            <motion.h3 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="text-2xl font-bold drop-shadow-lg"
            >
              {service.title}
            </motion.h3>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: isHovered ? '80px' : '40px' }}
              className="h-1 bg-primary mt-2 rounded-full"
              transition={{ duration: 0.3 }}
            ></motion.div>
          </div>
        </motion.div>
        
        <motion.div 
          className="absolute top-6 right-6 z-10"
          animate={{ scale: isHovered ? 1.2 : 1, rotate: isHovered ? 10 : 0 }}
          transition={{ duration: 0.3, type: "spring" }}
        >
          <div className="w-14 h-14 rounded-full bg-gray-900 bg-opacity-90 stroke-slate-200 flex items-center justify-center shadow-lg border border-white">
            <div className="text-primary ">{service.icon}</div>
          </div>
        </motion.div>
      </div>
      
      <motion.div 
        className="p-6 relative z-10 bg-gray-800"
        initial={{ height: "auto" }}
        animate={{ height: isHovered ? "auto" : "auto" }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-gray-300 mb-5 text-sm leading-relaxed">{service.description}</p>
        
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isHovered ? 1 : 0,
            height: isHovered ? "auto" : 0,
            marginBottom: isHovered ? 16 : 0
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="pt-4 border-t border-gray-700">
            <ul className="space-y-2">
              {service.features.map((feature, i) => (
                <motion.li 
                  key={i} 
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="flex items-center text-sm text-gray-300"
                >
                  <span className="text-purple-400 mr-2 text-xs">
                    <FaChevronRight />
                  </span>
                  {feature}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
        
        <motion.div
          whileHover={{ x: 5 }}
          className="inline-flex items-center justify-center text-sm font-medium text-primary hover:text-purple-300 transition-colors"
        >
          Explore Details
          <FaChevronRight className="ml-1 text-xs" />
        </motion.div>
      </motion.div>
      
      {/* Gradient Border Animation */}
      <motion.div 
        className="absolute inset-0 p-0.5 rounded-xl z-0 bg-gradient-to-r from-purple-600 to-pink-500 opacity-0 group-hover:opacity-100"
        animate={{ 
          backgroundPosition: isHovered ? "200% 0" : "0% 0"
        }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
        style={{ backgroundSize: "200% 200%" }}
      ></motion.div>
    </motion.div>
  );
};

const AnimatedBackground = () => {
  useEffect(() => {
    // This is a simplified visualization - in a real implementation,
    // you would set up an actual Three.js scene with proper rendering
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    
    // Simulate Three.js effect with a CSS animation
    canvas.style.background = 'radial-gradient(circle at center, rgba(139, 92, 246, 0.2) 0%, rgba(0, 0, 0, 0) 70%)';
    
    return () => {
      // Cleanup
    };
  }, []);

  return (
    <div 
      id="bg-canvas" 
      className="absolute inset-0 -z-10 opacity-60"
    ></div>
  );
};

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [animateHeader, setAnimateHeader] = useState(false);

  useEffect(() => {
    setAnimateHeader(true);
  }, []);

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'men', label: 'Men' },
    { id: 'women', label: 'Women' },
    { id: 'bridal', label: 'Bridal' },
    { id: 'spa', label: 'Spa & Wellness' }
  ];

  const services = [
    {
      icon: <FaCut className="text-3xl" />,
      title: "Haircuts & Styling",
      description: "Premium haircuts and styling services by master stylists to give you a perfect look.",
      image: "	https://i.pinimg.com/736x/7d/76/2e/7d762e98bbd81d86d3903fc7ffb8ec72.jpg",
      features: ["Precision Cuts", "Trending Styles", "Blowouts", "Hair Spa"],
      category: ['men', 'women']
    },
    {
      icon: <FaPaintBrush className="text-3xl" />,
      title: "Hair Coloring",
      description: "Express yourself with vibrant colors, subtle highlights, or natural-looking shades.",
      image: "https://i.pinimg.com/736x/d1/6c/d8/d16cd84b76ad6eb6f47a7a8eb052051f.jpg",
      features: ["Global Color", "Balayage", "Highlights", "Fashion Colors"],
      category: ['men', 'women']
    },
    {
      icon: <FaMale className="text-3xl" />,
      title: "Men's Grooming",
      description: "Premium grooming services tailored specifically for men's needs and style preferences.",
      image: "https://i.pinimg.com/736x/3a/ec/da/3aecda79a4c250e0bb1c33f5dfd4163e.jpg",
      features: ["Beard Styling", "Shaving", "Hair Tattoo", "Hair Bonding"],
      category: ['men']
    },
    {
      icon: <FaFemale className="text-3xl" />,
      title: "Women's Services",
      description: "Complete beauty solutions designed especially for women's unique beauty requirements.",
      image: "https://i.pinimg.com/736x/20/83/0c/20830c201f99b2615e61d54a7d48c702.jpg", 
      features: ["Keratin Treatment", "Hair Extensions", "Perming", "Smoothening"],
      category: ['women']
    },
    {
      icon: <FaSpa className="text-3xl" />,
      title: "Facial Treatments",
      description: "Rejuvenate your skin with our premium facials tailored to your skin type and concerns.",
      image: "	https://i.pinimg.com/736x/33/a2/cd/33a2cd275cb11daf3e6c24551d7d3658.jpg",
      features: ["Gold Facial", "Diamond Facial", "Anti-Aging", "Hydrating"],
      category: ['men', 'women', 'spa']
    },
    {
      icon: <FaHands className="text-3xl" />,
      title: "Nail Services",
      description: "Complete your look with beautiful nails, from classic designs to creative nail art.",
      image: "	https://i.pinimg.com/736x/20/e4/ca/20e4ca45873b7c3d776d71d537aa717c.jpg",
      features: ["Gel Polish", "Nail Art", "Spa Pedicure", "Paraffin Treatment"],
      category: ['men', 'women']
    },
    {
      icon: <FaRing className="text-3xl" />,
      title: "Bridal Packages",
      description: "Comprehensive bridal beauty solutions to make your special day truly unforgettable.",
      image: "	https://i.pinimg.com/736x/ac/a4/9d/aca49db963144a4d1f753b738532b446.jpg",
      features: ["HD Makeup", "Pre-Bridal Treatments", "Mehendi", "Hairstyling"],
      category: ['women', 'bridal']
    },
    {
      icon: <FaLeaf className="text-3xl" />,
      title: "Ayurvedic Treatments",
      description: "Traditional Indian wellness therapies using natural herbs and ancient techniques.",
      image: "	https://i.pinimg.com/736x/cd/71/f1/cd71f156f2460ba4aee5ca6ae4348be9.jpg",
      features: ["Head Massage", "Body Polishing", "Herbal Facials", "Hot Oil Treatment"],
      category: ['men', 'women', 'spa']
    },
    {
      icon: <FaGlassMartiniAlt className="text-3xl" />,
      title: "Pre-Wedding Packages",
      description: "Complete beauty regimens to prepare you for your big day, starting months in advance.",
      image: "/api/placeholder/600/400",
      features: ["Skin Brightening", "Hair Treatments", "Body Polishing", "Nail Care"],
      category: ['women', 'bridal', 'men']
    },
    {
      icon: <FaBriefcase className="text-3xl" />,
      title: "Executive Packages",
      description: "Quick, efficient services designed for busy professionals who need to look their best.",
      image: "/api/placeholder/600/400",
      features: ["Express Facial", "Quick Haircut", "Hand Care", "Shoe Shine"],
      category: ['men', 'women']
    }
  ];

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category.includes(selectedCategory));

  return (
    <section id="services" className="py-24 relative overflow-hidden bg-gray-900 text-white">
      <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-0 opacity-90"></div>
      <AnimatedBackground />
      
      {/* Floating Decorative Elements */}
      <div className="hidden lg:block">
        <motion.div 
          className="absolute top-40 left-10 w-64 h-64 rounded-full bg-purple-900 opacity-20 blur-3xl"
          animate={{ 
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        ></motion.div>
        <motion.div 
          className="absolute bottom-40 right-10 w-80 h-80 rounded-full bg-pink-900 opacity-20 blur-3xl"
          animate={{ 
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        ></motion.div>
      </div>
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ 
            opacity: animateHeader ? 1 : 0, 
            y: animateHeader ? 0 : -20 
          }}
          transition={{ duration: 0.7 }}
        >
          <motion.span 
            className="text-sm font-medium tracking-wider uppercase text-purple-300 mb-3 inline-block px-4 py-1 bg-primary bg-opacity-50 rounded-full"
            whileHover={{ scale: 1.05 }}
          >
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
                  <span className="relative z-10"> Luxury Beauty Experience</span>
                </motion.span>
           
          </motion.span>
          <h2 className="text-5xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-black">
            Premium Beauty Services
          </h2>
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-primary to-pink-400 mx-auto mb-8 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: animateHeader ? "6rem" : 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          ></motion.div>
          <p className="max-w-2xl mx-auto text-gray-300 text-lg">
            Discover our  comprehensive range of professional hair and beauty services 
            at Radiance Unisex Salon, where we blend traditional Indian techniques with 
            modern styling to help you look and feel extraordinary. 
          </p>
        </motion.div>
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center mb-12 gap-3">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category.id 
                  ? 'bg-gradient-to-r from-primary to-black text-white shadow-lg' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 shadow'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.label}
            </motion.button>
          ))}
        </div>
        
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          layout
        >
          {filteredServices.map((service, index) => (
            <ServicesCard key={index} service={service} index={index} />
          ))}
        </motion.div>
        
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <motion.button 
            className="px-8 py-4 btn-primary duration-300"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.4), 0 8px 10px -6px rgba(139, 92, 246, 0.3)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            <a href="/booking ">            Book Your Appointment Now
</a>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
