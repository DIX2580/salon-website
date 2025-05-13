import Team from '../components/Team'

const TeamPage = () => {
  return (
    <div className="pt-20">
      <div className="bg-primary text-white py-20 text-center">
        <div className="container">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Meet Our Team</h1>
          <p className="max-w-3xl mx-auto">Learn more about our talented stylists and beauty professionals.</p>
        </div>
      </div>
      <Team />
    </div>
  )
}

export default TeamPage
