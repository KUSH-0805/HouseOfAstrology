import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard';
import { Service } from '../types';

// Mock data - will be replaced with API data
const mockServices: Service[] = [
  {
    id: 1,
    name: 'Career & Finance Guidance',
    slug: 'career-guidance',
    description: 'Guidance for professional growth and success. Get clarity on your career path, financial decisions, and professional opportunities.',
    duration: 30,
    price: 999,
    is_active: true,
  },
  {
    id: 2,
    name: 'Relationship Consultation',
    slug: 'relationship-consultation',
    description: 'Insights for meaningful connections and harmony. Understand your relationship patterns and find balance in your personal life.',
    duration: 45,
    price: 1499,
    is_active: true,
  },
  {
    id: 3,
    name: 'Life Purpose Reading',
    slug: 'life-purpose-reading',
    description: 'Discover your path and true calling. Uncover your life purpose and align your actions with your deeper mission.',
    duration: 45,
    price: 1299,
    is_active: true,
  },
  {
    id: 4,
    name: 'Birth Chart Reading',
    slug: 'birth-chart-reading',
    description: 'Deep insights from your cosmic blueprint. A comprehensive analysis of your birth chart for a complete understanding of your life.',
    duration: 60,
    price: 1999,
    is_active: true,
  },
];

const Services = () => {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-20 bg-charcoal">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="section-subtitle">Services</p>
            <h1 className="section-title">Consultations for Every Question</h1>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Each consultation is personalized to your unique situation, providing
              clear, practical, and honest guidance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* All Services */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

      {/* CTA */}
      <section className="py-20 bg-charcoal">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title mb-6">Not Sure Which Service is Right for You?</h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-10">
              Contact us and we'll help you find the right consultation for your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-outline text-lg">
                Contact Us
              </Link>
              <Link to="/book" className="btn-primary text-lg">
                Book a Consultation
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;