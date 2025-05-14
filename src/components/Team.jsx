import { useEffect, useRef } from 'react';
import { FaInstagram, FaFacebookF, FaTiktok } from 'react-icons/fa';
// Import AOS directly instead of using require
import AOS from 'aos';
import 'aos/dist/aos.css';

const Team = () => {
  const initialized = useRef(false);
  const team = [
    {
      name: "Alex Morgan",
      role: "Founder & Master Stylist",
      bio: "Specializing in modern cuts and styling for all genders with over 15 years of experience.",
      image: "/st1.jpg",
      social: {
        instagram: "#",
        facebook: "#",
        tiktok: "#"
      }
    },
    {
      name: "Jamie Chen",
      role: "Color Specialist",
      bio: "Known for innovative color techniques and avant-garde styles that make a statement.",
      image: "/images/team-2.jpg",
      social: {
        instagram: "#",
        facebook: "#",
        tiktok: "#"
      }
    },
    {
      name: "Sam Rodriguez",
      role: "Barber & Texture Expert",
      bio: "Expert in precision fades, beard sculpting, and styling textured hair of all types.",
      image: "/images/team-3.jpg",
      social: {
        instagram: "#",
        facebook: "#",
        tiktok: "#"
      }
    },
    {
      name: "Jordan Wilson",
      role: "Creative Director",
      bio: "Fashion forward stylist specializing in editorial looks and transformative makeovers.",
      image: "/images/team-4.jpg",
      social: {
        instagram: "#",
        facebook: "#",
        tiktok: "#"
      }
    }
  ];

  useEffect(() => {
    // Initialize AOS only once
    if (!initialized.current) {
      AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
      initialized.current = true;
    }
    
    // Refresh AOS on component updates
    AOS.refresh();
    
    return () => {
      // No cleanup needed for AOS
    };
  }, []);

  return (
    <section id="team" className="py-24 bg-[#121212] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black to-transparent opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent opacity-50"></div>
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20" data-aos="fade-up">
          <span className="text-primary font-medium tracking-wider uppercase text-sm mb-2 inline-block">Meet Our Team</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">Styling Professionals</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          <p className="max-w-3xl mx-auto text-gray-300 text-lg">
            Our diverse team of talented professionals is passionate about helping you
            express your individual style, regardless of gender or identity.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div 
              key={index} 
              className="bg-[#1a1a1a] rounded-lg overflow-hidden shadow-xl transform hover:-translate-y-2 transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="relative overflow-hidden group h-80">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover object-center transform group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1a1a1a] opacity-90"></div>
                
                {/* Overlay with social icons */}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/30 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex space-x-4">
                    <a href={member.social.instagram} className="w-10 h-10 rounded-full bg-[#121212] flex items-center justify-center text-primary hover:bg-primary hover:text-[#121212] transition-colors duration-300 transform hover:scale-110">
                      <FaInstagram size={18} />
                    </a>
                    <a href={member.social.facebook} className="w-10 h-10 rounded-full bg-[#121212] flex items-center justify-center text-primary hover:bg-primary hover:text-[#121212] transition-colors duration-300 transform hover:scale-110">
                      <FaFacebookF size={16} />
                    </a>
                    <a href={member.social.tiktok} className="w-10 h-10 rounded-full bg-[#121212] flex items-center justify-center text-primary hover:bg-primary hover:text-[#121212] transition-colors duration-300 transform hover:scale-110">
                      <FaTiktok size={16} />
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="font-serif text-2xl font-semibold text-white mb-1">{member.name}</h3>
                <p className="text-primary font-medium mb-4 inline-block relative">
                  {member.role}
                  <span className="absolute bottom-0 left-0 w-0 group-hover:w-full h-0.5 bg-primary transition-all duration-300"></span>
                </p>
                <p className="text-gray-400 leading-relaxed">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;