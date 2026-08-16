import { Link } from 'react-router-dom';
import { Service } from '../types';
import { motion } from 'framer-motion';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="card flex flex-col h-full"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center">
          <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v3m0 12v3m9-9h-3M6 12H3m15.364-6.364l-2.121 2.121M7.757 16.243l-2.121 2.121m13.728 0l-2.121-2.121M7.757 7.757L5.636 5.636M12 8a4 4 0 100 8 4 4 0 000-8z" />
          </svg>
        </div>
        <span className="text-gold font-semibold text-lg">₹{service.price}</span>
      </div>
      
      <h3 className="text-xl font-serif text-soft-white mb-2">{service.name}</h3>
      <p className="text-gray-400 text-sm mb-4 flex-grow">{service.description}</p>
      
      <div className="flex items-center text-sm text-gray-300 mb-6">
        <svg className="w-4 h-4 mr-2 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {service.duration} Minutes
      </div>
      
      <div className="flex space-x-3">
        <Link to={`/services/${service.slug}`} className="btn-outline flex-1 text-sm">
          Learn More
        </Link>
        <Link to={`/book?service=${service.id}`} className="btn-primary flex-1 text-sm">
          Book Now
        </Link>
      </div>
    </motion.div>
  );
};

export default ServiceCard;