import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Confirmation = () => {
  return (
    <div className="pt-24 pb-20">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-lg mx-auto text-center"
        >
          <div className="w-20 h-20 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-8">
            <svg className="w-10 h-10 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-3xl font-serif text-soft-white mb-2">Booking Confirmed</h1>
          <p className="text-gray-400 mb-8">
            Thank you, Rahul. Your consultation has been successfully booked.
          </p>

          <div className="card text-left mb-8">
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Service</p>
                <p className="text-soft-white font-medium">Career Guidance</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Date</p>
                <p className="text-soft-white font-medium">20 August 2026</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Time</p>
                <p className="text-soft-white font-medium">10:00 AM</p>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-dark-slate">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Amount</p>
                  <p className="text-soft-white font-medium">₹999</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Payment</p>
                  <p className="text-gold font-medium">Successful</p>
                </div>
              </div>
              <div className="pt-4 border-t border-dark-slate">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Booking ID</p>
                <p className="text-soft-white font-mono">HOA-20260820-001</p>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-400 mb-8">
            A confirmation email has been sent to your email address.
          </p>

          <Link to="/" className="btn-primary">
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Confirmation;