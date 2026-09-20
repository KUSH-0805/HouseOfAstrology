import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getBooking } from '../services/bookingService';
import { Booking } from '../types';

const formatTime = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${String(minutes).padStart(2, '0')} ${period}`;
};

const formatDate = (date: string) => {
  const parts = date.split('-');
  if (parts.length !== 3) return date;
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  return `${Number(parts[2])} ${months[Number(parts[1]) - 1]} ${parts[0]}`;
};

const Confirmation = () => {
  const { id } = useParams<{ id: string }>();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    getBooking(Number(id))
      .then((data) => setBooking(data))
      .catch(() => setBooking(null))
      .finally(() => setLoading(false));
  }, [id]);

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
            Thank you{booking ? `, ${booking.customer.name}` : ''}. Your consultation has been successfully booked.
          </p>

          {loading ? (
            <div className="text-center py-12 text-gray-400">Loading booking details…</div>
          ) : !booking ? (
            <div className="card text-center py-12">
              <h2 className="text-xl font-serif text-soft-white mb-4">Booking Not Found</h2>
              <p className="text-gray-400 mb-8">
                We couldn't find your booking. Please check your confirmation email or contact us.
              </p>
              <Link to="/" className="btn-primary">Back to Home</Link>
            </div>
          ) : (
            <div className="card text-left mb-8">
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Service</p>
                  <p className="text-soft-white font-medium">{booking.service.name}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Date</p>
                  <p className="text-soft-white font-medium">{formatDate(booking.slot.date)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Time</p>
                  <p className="text-soft-white font-medium">{formatTime(booking.slot.start_time)}</p>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-dark-slate">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Amount</p>
                    <p className="text-soft-white font-medium">₹{booking.amount}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Payment</p>
                    <p className="text-gold font-medium">
                      {booking.booking_status === 'CONFIRMED' || booking.booking_status === 'PENDING_PAYMENT'
                        ? 'Successful'
                        : 'Pending'}
                    </p>
                  </div>
                </div>
                <div className="pt-4 border-t border-dark-slate">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Booking ID</p>
                  <p className="text-soft-white font-mono">{booking.booking_number}</p>
                </div>
              </div>
            </div>
          )}

          {booking && (
            <p className="text-sm text-gray-400 mb-8">
              A confirmation email has been sent to {booking.customer.email}.
            </p>
          )}

          <Link to="/" className="btn-primary">
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Confirmation;