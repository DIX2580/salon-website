import { useState, useEffect } from 'react';
import { X, Calendar, Star, Clock, ArrowRight, Sparkles, Gift } from 'lucide-react';

const HangingSpecialOffersPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [isSwinging, setIsSwinging] = useState(true);
  
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

  // Start swinging animation and stop after some time
  useEffect(() => {
    if (!isOpen) {
      setIsSwinging(true);
      const timer = setTimeout(() => {
        setIsSwinging(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Periodic swing effect
  useEffect(() => {
    if (!isOpen) {
      const interval = setInterval(() => {
        setIsSwinging(true);
        setTimeout(() => {
          setIsSwinging(false);
        }, 3000);
      }, 10000);
      
      return () => clearInterval(interval);
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

  return (
    <>
      {/* Fixed position hanging sign or full popup */}
      <div 
        className={`fixed right-0 top-16 z-50 transition-all duration-500 ${
          isOpen ? 'w-full h-full flex items-center justify-center' : 'w-auto h-auto'
        }`}
      >
        {!isOpen ? (
          // Hanging sign design
          <div className="relative">
            {/* Ropes */}
            <div className="absolute -top-16 right-8 w-1 h-16 bg-gradient-to-b from-amber-700 to-amber-900 transform -rotate-12"></div>
            <div className="absolute -top-16 right-16 w-1 h-16 bg-gradient-to-b from-amber-700 to-amber-900 transform rotate-12"></div>
            
            {/* Hanging sign board with wooden frame appearance */}
            <div 
              className={`relative bg-gradient-to-b from-amber-800 to-amber-900 rounded-lg shadow-xl cursor-pointer overflow-hidden transition-all duration-300 border-4 border-amber-700 
                ${isSwinging ? 'animate-swinging' : ''}`}
              onClick={() => setIsOpen(true)}
              style={{transformOrigin: 'top  center'}}
            >
              {/* Inner sign with wooden frame effect */}
              <div className="m-1 bg-gradient-to-r from-gray-800 to-gray-900 p-4 rounded overflow-hidden border border-gray-700">
                {/* Content */}
                <div className="flex flex-col items-center">
                  {/* Icon with effects */}
                  <div className="relative mb-2">
                    <div className="absolute inset-0 bg-pink-500 rounded-full blur-md opacity-30"></div>
                    <div className="relative z-10 w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-inner overflow-hidden">
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
                  
                  {/* Text */}
                  <div className="flex flex-col items-center">
                    <span className="font-bold text-white text-sm whitespace-nowrap">Special Offers</span>
                    <p className="text-gray-300 text-xs whitespace-nowrap mt-1">Limited time</p>
                  </div>
                  
                  {/* Notification badge */}
                  <div className="mt-2 bg-gradient-to-br from-red-500 to-red-600 rounded-full px-2 py-0.5 text-xs font-bold shadow-lg text-white animate-pulse">
                    <span>New!</span>
                  </div>
                </div>
              </div>
              
              {/* Nail/tack visuals at corners */}
              <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-gray-300 shadow-inner"></div>
              <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-gray-300 shadow-inner"></div>
              <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-gray-300 shadow-inner"></div>
              <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-gray-300 shadow-inner"></div>
            </div>
          </div>
        ) : (
          // Full popup when open
          <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center">
            <div 
              className={`relative w-full max-w-md bg-gradient-to-b from-amber-800 to-amber-900 rounded-xl shadow-2xl border-4 border-amber-700 overflow-hidden
                ${animationComplete ? 'animate-none' : 'animate-slideInRight'}`}
            >
              {/* Inner content with wooden frame effect */}
              <div className="m-2 bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg border border-gray-700 overflow-hidden">
                {/* Close button */}
                <button
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200 z-10"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
                
                {/* Enhanced Header */}
                <div className="relative overflow-hidden ">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-black opacity-80">
                    <div className="absolute inset-0 bg-pattern"></div>
                  </div>
                  
                  {/* Enhanced header effect */}
                  <div className="relative p-2 flex flex-col items-center text-center">
                    <div className="w-20 h-20 relative mb-3">
                      {/* Animated circles */}
                      <div className="absolute inset-0 animate-ping bg-primary rounded-full opacity-10 scale-300"></div>
                      
                      {/* Central effect */}
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
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full text-white mb-1 ${offer.badgeColor} shadow-md`}>
                              {offer.highlight}
                            </span>
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
              </div>
              
              {/* Nail/tack visuals at corners */}
                    
            </div>
          </div>
        )}
      </div>

      {/* Add global styles */}
      <style jsx global>{`
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fadeIn {
    animation: fadeIn 0.5s ease forwards;
  }

  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .animate-slideInRight {
    animation: slideInRight 0.5s ease forwards;
  }

  @keyframes swinging {
    0% { transform: rotate(0deg); }
    25% { transform: rotate(3deg); }
    50% { transform: rotate(0deg); }
    75% { transform: rotate(-3deg); }
    100% { transform: rotate(0deg); }
  }

  .animate-swinging {
    animation: swinging 1.5s ease-in-out;
  }
`}</style>

    </>
  );
};

export default HangingSpecialOffersPopup;