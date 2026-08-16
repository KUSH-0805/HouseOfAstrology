import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-charcoal border-t border-gold/10 py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-full border border-gold/50 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-gold" />
              </div>
              <span className="font-serif text-xl font-semibold tracking-wide text-soft-white">
                House of <span className="text-gold">Astrology</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Intuitive astrology for real-life answers and a better tomorrow.
              Clarity. Guidance. Real Connection.
            </p>
          </div>

          <div>
            <h3 className="text-gold font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-gold text-sm transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-gold text-sm transition-colors">About</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-gold text-sm transition-colors">Services</Link></li>
              <li><Link to="/pricing" className="text-gray-400 hover:text-gold text-sm transition-colors">Pricing</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-gold text-sm transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-gold font-semibold mb-4 text-sm uppercase tracking-wider">Services</h3>
            <ul className="space-y-2">
              <li><Link to="/services/career-guidance" className="text-gray-400 hover:text-gold text-sm transition-colors">Career Guidance</Link></li>
              <li><Link to="/services/relationship-consultation" className="text-gray-400 hover:text-gold text-sm transition-colors">Relationship</Link></li>
              <li><Link to="/services/life-purpose-reading" className="text-gray-400 hover:text-gold text-sm transition-colors">Life Purpose</Link></li>
              <li><Link to="/services/birth-chart-reading" className="text-gray-400 hover:text-gold text-sm transition-colors">Birth Chart</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-dark-slate text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} House of Astrology. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;