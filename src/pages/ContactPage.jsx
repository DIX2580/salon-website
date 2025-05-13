import Contact from '../components/Contact'

const ContactPage = () => {
  return (
    <div className="pt-20">
      <div className="bg-primary text-white py-20 text-center">
        <div className="container">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="max-w-3xl mx-auto">Have questions or want to get in touch? We'd love to hear from you.</p>
        </div>
      </div>
      <Contact />
    </div>
  )
}

export default ContactPage