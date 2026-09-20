import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard';
import { Service } from '../types';
import { getServices } from '../services/serviceService';

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getServices()
      .then((data) => {
        setServices(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load services. Please try again later.');
        setLoading(false);
      });
  }, []);

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
          {loading && (
            <div className="text-center py-16">
              <p className="text-gray-400">Loading services…</p>
            </div>
          )}
          {error && !loading && (
            <div className="text-center py-16">
              <p className="text-red-400">{error}</p>
              <Link to="/services" className="btn-outline mt-6">
                Retry
              </Link>
            </div>
          )}
          {!loading && !error && services.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-400">No services available right now.</p>
            </div>
          )}
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => (
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
          )}
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