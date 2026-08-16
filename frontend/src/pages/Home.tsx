import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ZodiacAnimation from '../components/ZodiacAnimation';
import ServiceCard from '../components/ServiceCard';
import { Service } from '../types';

// Mock data for now - will be replaced with API data
const mockServices: Service[] = [
  {
    id: 1,
    name: 'Career & Finance Guidance',
    slug: 'career-guidance',
    description: 'Guidance for professional growth and success.',
    duration: 30,
    price: 999,
    is_active: true,
  },
  {
    id: 2,
    name: 'Relationship Consultation',
    slug: 'relationship-consultation',
    description: 'Insights for meaningful connections and harmony.',
    duration: 45,
    price: 1499,
    is_active: true,
  },
  {
    id: 3,
    name: 'Life Purpose Reading',
    slug: 'life-purpose-reading',
    description: 'Discover your path and true calling.',
    duration: 45,
    price: 1299,
    is_active: true,
  },
  {
    id: 4,
    name: 'Birth Chart Reading',
    slug: 'birth-chart-reading',
    description: 'Deep insights from your cosmic blueprint.',
    duration: 60,
    price: 1999,
    is_active: true,
  },
];

const steps = [
  {
    number: '01',
    title: 'Book',
    description: 'Choose a service and book your slot.',
  },
  {
    number: '02',
    title: 'Consult',
    description: 'Connect at the scheduled time.',
  },
  {
    number: '03',
    title: 'Guidance',
    description: 'Get clear and practical guidance.',
  },
  {
    number: '04',
    title: 'Transform',
    description: 'Take confident steps toward a better you.',
  },
];

const stats = [
  { value: '7+', label: 'Years of Study & Practice' },
  { value: '1000+', label: 'Consultations Guided' },
  { value: 'Vedic', label: 'Rooted in Ancient Wisdom' },
  { value: 'Real', label: 'Practical. Honest. Result-Oriented.' },
];

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-deep-black via-charcoal to-deep-black" />
        <ZodiacAnimation />
        
        <div className="relative z-10 container-custom text-center py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-gold text-sm uppercase tracking-[0.3em] mb-6">
              House of Astrology
            </p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif text-soft-white leading-tight mb-6">
              Clarity.
              <br />
              Guidance.
              <br />
              <span className="text-gold">Real Connection.</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10">
              Intuitive astrology for real-life answers and a better tomorrow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/book" className="btn-primary text-lg">
                Book Your Consultation
              </Link>
              <Link to="/services" className="btn-outline text-lg">
                Explore Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-24 bg-charcoal">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="section-subtitle">About</p>
            <h2 className="section-title">Astrology with Intellect. Insights. Impact.</h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              With over 7 years of dedicated study and practice, I provide practical,
              honest, and result-oriented guidance rooted in ancient Vedic wisdom.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card text-center"
              >
                <div className="text-3xl font-serif text-gold mb-2">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="section-subtitle">Services</p>
            <h2 className="section-title">Consultations for Every Question</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Choose from our range of personalized consultations designed to bring
              clarity to every aspect of your life.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ServiceCard service={service} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-charcoal">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="section-subtitle">How It Works</p>
            <h2 className="section-title">Your Journey to Clarity</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="text-5xl font-serif text-gold/20 mb-4">{step.number}</div>
                <h3 className="text-xl font-serif text-soft-white mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-8 border-t border-gold/20" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gold/10 to-transparent" />
        <div className="relative container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title mb-6">Ready to Find Your Answers?</h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-10">
              Book your consultation today and take the first step toward clarity,
              guidance, and real connection.
            </p>
            <Link to="/book" className="btn-primary text-lg">
              Book Your Consultation
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;