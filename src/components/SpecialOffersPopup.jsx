import { useState, useEffect, useRef } from 'react';
import { X, Calendar, Star, Clock, ArrowRight, Sparkles, Gift } from 'lucide-react';

const AdvancedSpecialOffersPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [animationComplete, setAnimationComplete] = useState(false);
  const popupRef = useRef(null);
  
  // Show popup automatically after 3 seconds
  useEffect(() => {
    const popupTimer = setTimeout(() => {
      setIsOpen(true);
    }, 3000);
    
    // Show button immediately
    setIsButtonVisible(true);
    
    return () => clearTimeout(popupTimer);
  }, []);

  // Animation completion effect
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setAnimationComplete(true);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      setAnimationComplete(false);
    }
  }, [isOpen]);

  // Offers data with enhanced structure
  const specialOffers = [
    {
      id: 1,
      title: "Premium Package",
      description: "Hair Spa + Haircut + Facial",
      originalPrice: "₹5999",
      price: "₹3999",
      highlight: "SAVE 33%",
      icon: <Sparkles className="text-purple-200" size={18} />,
      badgeColor: "bg-gradient-to-r from-purple-500 to-pink-500",
      borderColor: "border-purple-500",
      details: ["Premium Hair Treatment", "Luxury Face Ritual", "Professional Styling"]
    },
    {
      id: 2,
      title: "Puja Special",
      description: "Hair Spa + Haircut or De-Tan",
      originalPrice: "₹1999",
      price: "₹999",
      highlight: "LIMITED",
      icon: <Star className="text-amber-200" size={18} />,
      badgeColor: "bg-gradient-to-r from-amber-500 to-red-500",
      borderColor: "border-amber-500",
      details: ["Revitalizing Hair Spa", "Precision Haircut", "De-Tan Option Available"]
    },
    {
      id: 3,
      title: "First Visit",
      description: "Any Service Discount for New Clients",
      originalPrice: "",
      price: "20% OFF",
      highlight: "NEW",
      icon: <Gift className="text-emerald-200" size={18} />,
      badgeColor: "bg-gradient-to-r from-emerald-500 to-teal-500",
      borderColor: "border-emerald-500",
      details: ["Valid on All Services", "New Customers Only", "Cannot Combine with Other Offers"]
    },
    {
      id: 4,
      title: "Hydra Facial",
      description: "Deep cleansing + hydration treatment",
      originalPrice: "₹2500",
      price: "₹999",
      highlight: "POPULAR",
      icon: <Sparkles className="text-blue-200" size={18} />,
      badgeColor: "bg-gradient-to-r from-blue-500 to-cyan-500",
      borderColor: "border-blue-500",
      details: ["Deep Pore Cleansing", "Hydration Boost", "Anti-aging Benefits"]
    },
    {
      id: 5,
      title: "O3+ Clean Up",
      description: "With D-Tan Treatment Free",
      originalPrice: "₹1250",
      price: "₹599",
      highlight: "BEST DEAL",
      icon: <Star className="text-fuchsia-200" size={18} />,
      badgeColor: "bg-gradient-to-r from-fuchsia-500 to-pink-500",
      borderColor: "border-fuchsia-500",
      details: ["O3+ Professional Products", "D-Tan Treatment Included", "Skin Brightening"]
    }
  ];

  const handleBookNow = () => {
    // Direct redirect to booking page
    window.location.href = "/booking";
  };

  const handleDragStart = (e) => {
    setIsDragging(true);
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    setDragPosition({ x: clientX, y: clientY });
  };

  const handleDragMove = (e) => {
    if (!isDragging || !popupRef.current) return;
    
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    const deltaX = clientX - dragPosition.x;
    const deltaY = clientY - dragPosition.y;
    
    // Calculate new position - constrain to window
    const rect = popupRef.current.getBoundingClientRect();
    const newX = Math.min(Math.max(rect.left + deltaX, 0), window.innerWidth - rect.width);
    const newY = Math.min(Math.max(rect.top + deltaY, 0), window.innerHeight - rect.height);
    
    popupRef.current.style.transform = `translate(${newX}px, ${newY}px)`;
    setDragPosition({ x: clientX, y: clientY });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <>
      {/* Floating Button with "Click Me" text */}
      {isButtonVisible && !isOpen && (
        <button
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full p-4 shadow-xl flex items-center justify-center group hover:shadow-purple-500/30 hover:shadow-2xl transition-all duration-300"
          onClick={() => setIsOpen(true)}
          aria-label="Special Offers"
        >
          {/* Enhanced notification badge with "Click Me" text */}
          <div className="absolute -top-10 -right-2 bg-gradient-to-br from-red-500 to-red-600 rounded-full px-3 py-1 flex items-center justify-center text-xs font-bold shadow-lg">
            <span className="animate-bounce whitespace-nowrap">Click Me!</span>
          </div>
          
          {/* Colorful animated "bomb" effect replacing gift icon */}
          <div className="relative group-hover:scale-110 transition-transform duration-300">
            <div className="absolute inset-0 bg-pink-500 rounded-full blur-md opacity-30 group-hover:opacity-70 transition-opacity duration-300"></div>
            <div className="relative z-10 w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-inner overflow-hidden">
              {/* Animated explosion/bomb effect */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="absolute w-2 h-2 bg-yellow-300 rounded-full animate-ping"></div>
                  <div className="absolute w-4 h-4 bg-yellow-500 rounded-full opacity-50 animate-pulse"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Sparkles size={20} className="text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </button>
      )}

      {/* Popup */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
          <div 
            ref={popupRef}
            className={`relative w-full max-w-md bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl shadow-2xl border border-gray-700 overflow-hidden
              ${animationComplete ? 'animate-none' : 'animate-slideInRight'}
              ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
          >
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200 z-10"
              onClick={() => setIsOpen(false)}
              aria-label="Close"
            >
              <X size={20} />
            </button>
            
            {/* Enhanced Header with animated background */}
            <div className="relative overflow-hidden h-36">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-800 to-pink-800 opacity-80">
                <div className="absolute inset-0 bg-pattern"></div>
              </div>
              
              {/* Enhanced explosion/bomb effect */}
              <div className="relative p-6 flex flex-col items-center text-center">
                <div className="w-20 h-20 relative mb-3">
                  {/* Animated explosion circles */}
                  <div className="absolute inset-0 animate-ping bg-yellow-500 rounded-full opacity-10 scale-150"></div>
                  <div className="absolute inset-0 animate-pulse bg-red-500 rounded-full opacity-20 scale-125"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-80"></div>
                  
                  {/* Central explosion effect */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <Sparkles size={32} className="text-white z-10" />
                      {/* Small particle effects */}
                      <div className="particle-1"></div>
                      <div className="particle-2"></div>
                      <div className="particle-3"></div>
                      <div className="particle-4"></div>
                    </div>
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-white mb-1 animate-fadeIn">Exclusive Offers</h2>
                <p className="text-gray-200 animate-fadeIn">Limited time special promotions just for you</p>
              </div>
            </div>

            {/* Main Content with offers */}
            <div className="p-6 space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
              {specialOffers.map((offer) => (
                <div
                  key={offer.id}
                  className={`relative bg-gray-900 rounded-lg overflow-hidden shadow-md transition-all duration-500 border ${offer.borderColor} hover:border-opacity-100 border-opacity-50 group transform hover:-translate-y-1 ${animationComplete ? 'animate-fadeIn' : 'opacity-0'}`}
                  style={{animationDelay: `${(offer.id * 150) + 500}ms`}}
                >
                  <div className={`${offer.badgeColor} h-1`}></div>
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <span className={`mr-2 text-white p-1.5 rounded-full ${offer.badgeColor} shadow-lg`}>
                            {offer.icon}
                          </span>
                          <h4 className="font-bold text-white text-lg">{offer.title}</h4>
                        </div>
                        <p className="text-gray-300">{offer.description}</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full text-white mb-1 ${offer.badgeColor} shadow-md`}>{offer.highlight}</span>
                        <div>
                          {offer.originalPrice && (
                            <span className="text-gray-400 text-sm line-through mr-2">{offer.originalPrice}</span>
                          )}
                          <span className="font-bold text-xl text-white">{offer.price}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3 space-y-2">
                      <div className="flex flex-wrap gap-2">
                        {offer.details.map((detail, idx) => (
                          <span key={idx} className="text-xs bg-gray-800 px-2 py-1 rounded-full text-gray-300">
                            {detail}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex justify-between items-center pt-2">
                        <div className="flex items-center text-gray-400 text-sm">
                          <Clock size={14} className="mr-1" />
                          <span>Limited time</span>
                        </div>
                        <button 
                          className={`text-white px-4 py-1.5 rounded-md font-medium transition-all duration-300 text-sm ${offer.badgeColor} hover:opacity-90 flex items-center`}
                          onClick={handleBookNow}
                        >
                          Book Now
                          <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Draggable indicator */}
            <div className="absolute top-0 left-0 w-full h-8 cursor-grab bg-transparent flex items-center justify-center">
              <div className="w-12 h-1 bg-gray-600 rounded-full"></div>
            </div>
          </div>
        </div>
      )}

      {/* Add global styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(31, 41, 55, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(107, 33, 168, 0.8);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(126, 34, 206, 0.9);
        }
        
        .bg-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
          background-size: 30px 30px;
        }
        
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(100%); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
        
        /* Particle animations */
        .particle-1, .particle-2, .particle-3, .particle-4 {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: linear-gradient(to right, #fff, #fca5a5);
        }
        
        .particle-1 {
          top: -10px;
          left: 50%;
          animation: particleMove1 2s infinite ease-out;
        }
        
        .particle-2 {
          top: 50%;
          right: -10px;
          animation: particleMove2 2.3s infinite ease-out;
        }
        
        .particle-3 {
          bottom: -10px;
          left: 50%;
          animation: particleMove3 1.8s infinite ease-out;
        }
        
        .particle-4 {
          top: 50%;
          left: -10px;
          animation: particleMove4 2.1s infinite ease-out;
        }
        
        @keyframes particleMove1 {
          0% { transform: translate(0, 0); opacity: 1; }
          100% { transform: translate(0, -30px); opacity: 0; }
        }
        
        @keyframes particleMove2 {
          0% { transform: translate(0, 0); opacity: 1; }
          100% { transform: translate(30px, 0); opacity: 0; }
        }
        
        @keyframes particleMove3 {
          0% { transform: translate(0, 0); opacity: 1; }
          100% { transform: translate(0, 30px); opacity: 0; }
        }
        
        @keyframes particleMove4 {
          0% { transform: translate(0, 0); opacity: 1; }
          100% { transform: translate(-30px, 0); opacity: 0; }
        }
      `}</style>
    </>
  );
};

export default AdvancedSpecialOffersPopup;