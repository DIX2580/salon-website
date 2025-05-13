import { FaInstagram, FaFacebookF, FaTiktok } from 'react-icons/fa'

const Team = () => {
  const team = [
    {
      name: "Alex Morgan",
      role: "Founder & Master Stylist",
      bio: "Specializing in modern cuts and styling for all genders with over 15 years of experience.",
      image: "/images/team-1.jpg",
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
  ]

  return (
    <section id="team" className="py-20 bg-darkSecondary">
      <div className="container">
        <div className="text-center mb-16">
          <span className="section-subtitle">Meet Our Team</span>
          <h2 className="section-title">Styling Professionals</h2>
          <p className="max-w-3xl mx-auto text-gray-300">
            Our diverse team of talented professionals is passionate about helping you
            express your individual style, regardless of gender or identity.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div key={index} className="bg-darkTertiary rounded-lg overflow-hidden">
              <div className="relative overflow-hidden group">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-80 object-cover object-center transform group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-darkTertiary opacity-80"></div>
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-all duration-500"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex space-x-3 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    <a href={member.social.instagram} className="w-8 h-8 rounded-full bg-dark flex items-center justify-center text-primary hover:bg-primary hover:text-dark transition-colors duration-300">
                      <FaInstagram />
                    </a>
                    <a href={member.social.facebook} className="w-8 h-8 rounded-full bg-dark flex items-center justify-center text-primary hover:bg-primary hover:text-dark transition-colors duration-300">
                      <FaFacebookF />
                    </a>
                    <a href={member.social.tiktok} className="w-8 h-8 rounded-full bg-dark flex items-center justify-center text-primary hover:bg-primary hover:text-dark transition-colors duration-300">
                      <FaTiktok />
                    </a>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl font-semibold text-light">{member.name}</h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-gray-400">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Team