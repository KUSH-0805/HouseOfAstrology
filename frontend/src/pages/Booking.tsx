import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import BookingCalendar from '../components/BookingCalendar';
import TimeSlot from '../components/TimeSlot';
import { Service, Slot, Customer } from '../types';

// Mock data for now
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

// Mock slots for demo
const mockSlots: Slot[] = [
  { id: 1, date: '2026-08-20', start_time: '10:00', end_time: '10:30', status: 'AVAILABLE' },
  { id: 2, date: '2026-08-20', start_time: '10:30', end_time: '11:00', status: 'AVAILABLE' },
  { id: 3, date: '2026-08-20', start_time: '11:00', end_time: '11:30', status: 'BOOKED' },
  { id: 4, date: '2026-08-20', start_time: '11:30', end_time: '12:00', status: 'BLOCKED' },
  { id: 5, date: '2026-08-20', start_time: '12:00', end_time: '12:30', status: 'AVAILABLE' },
  { id: 6, date: '2026-08-20', start_time: '12:30', end_time: '13:00', status: 'AVAILABLE' },
  { id: 7, date: '2026-08-21', start_time: '10:00', end_time: '10:30', status: 'AVAILABLE' },
  { id: 8, date: '2026-08-21', start_time: '10:30', end_time: '11:00', status: 'AVAILABLE' },
  { id: 9, date: '2026-08-21', start_time: '11:00', end_time: '11:30', status: 'AVAILABLE' },
  { id: 10, date: '2026-08-22', start_time: '10:00', end_time: '10:30', status: 'AVAILABLE' },
  { id: 11, date: '2026-08-22', start_time: '10:30', end_time: '11:00', status: 'BOOKED' },
  { id: 12, date: '2026-08-22', start_time: '11:00', end_time: '11:30', status: 'AVAILABLE' },
];

const steps = ['Service', 'Date', 'Time', 'Details', 'Payment', 'Confirmation'];

const Booking = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [services] = useState<Service[]>(mockServices);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [customer, setCustomer] = useState<Customer>({
    name: '',
    email: '',
    phone: '',
    date_of_birth: '',
    time_of_birth: '',
    place_of_birth: '',
  });
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const serviceId = searchParams.get('service');
    if (serviceId) {
      const service = services.find((s) => s.id === Number(serviceId));
      if (service) {
        setSelectedService(service);
        setCurrentStep(1);
      }
    }
  }, [searchParams, services]);

  useEffect(() => {
    if (selectedDate) {
      // In production, this would call the API
      // getAvailability(selectedDate).then((data) => setSlots(data.slots));
      setSlots(mockSlots.filter((slot) => slot.date === selectedDate));
    }
  }, [selectedDate]);

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setCurrentStep(1);
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedSlot(null);
    setCurrentStep(2);
  };

  const handleSlotSelect = (slot: Slot) => {
    setSelectedSlot(slot);
    setCurrentStep(3);
  };

  const handleCustomerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(4);
  };

  const handlePayment = async () => {
    setLoading(true);
    setError('');

    try {
      // In production, this would call the API
      // const response = await createBooking({
      //   service_id: selectedService!.id,
      //   slot_id: selectedSlot!.id,
      //   customer,
      //   notes,
      // });
      // navigate(`/confirmation/${response.booking.id}`);
      
      // Mock: navigate to confirmation
      navigate('/confirmation/1');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="pt-24 pb-20">
      <div className="container-custom">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                      index <= currentStep
                        ? 'bg-gold text-deep-black'
                        : 'bg-dark-slate text-gray-500'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span className={`text-xs mt-2 ${index <= currentStep ? 'text-gold' : 'text-gray-500'}`}>
                    {step}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-px mx-2 ${
                      index < currentStep ? 'bg-gold' : 'bg-dark-slate'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {/* Step 1: Select Service */}
            {currentStep === 0 && (
              <motion.div
                key="service"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-serif text-soft-white mb-8 text-center">Select a Service</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {services.map((service) => (
                    <motion.button
                      key={service.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleServiceSelect(service)}
                      className="card text-left hover:border-gold/50 transition-all"
                    >
                      <h3 className="text-lg font-serif text-soft-white mb-2">{service.name}</h3>
                      <p className="text-sm text-gray-400 mb-4">{service.duration} Minutes</p>
                      <div className="text-2xl font-serif text-gold">₹{service.price}</div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Select Date */}
            {currentStep === 1 && (
              <motion.div
                key="date"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-serif text-soft-white mb-8 text-center">Choose a Date</h2>
                <div className="max-w-md mx-auto">
                  <BookingCalendar
                    selectedDate={selectedDate}
                    onSelectDate={handleDateSelect}
                  />
                </div>
                <div className="text-center mt-8">
                  <button onClick={goBack} className="btn-outline">
                    Back
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Select Time */}
            {currentStep === 2 && (
              <motion.div
                key="time"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-serif text-soft-white mb-8 text-center">Choose a Time</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
                  {slots.map((slot) => (
                    <TimeSlot
                      key={slot.id}
                      slot={slot}
                      selected={selectedSlot?.id === slot.id}
                      onSelect={handleSlotSelect}
                    />
                  ))}
                </div>
                <div className="text-center mt-8">
                  <button onClick={goBack} className="btn-outline">
                    Back
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Customer Details */}
            {currentStep === 3 && (
              <motion.div
                key="details"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-serif text-soft-white mb-8 text-center">Your Details</h2>
                <form onSubmit={handleDetailsSubmit} className="card max-w-2xl mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="label-field" htmlFor="name">Full Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={customer.name}
                        onChange={handleCustomerChange}
                        required
                        className="input-field"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="label-field" htmlFor="email">Email *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={customer.email}
                        onChange={handleCustomerChange}
                        required
                        className="input-field"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="label-field" htmlFor="phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={customer.phone}
                      onChange={handleCustomerChange}
                      required
                      className="input-field"
                      placeholder="Your phone number"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <label className="label-field" htmlFor="date_of_birth">Date of Birth</label>
                      <input
                        type="date"
                        id="date_of_birth"
                        name="date_of_birth"
                        value={customer.date_of_birth}
                        onChange={handleCustomerChange}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="label-field" htmlFor="time_of_birth">Time of Birth</label>
                      <input
                        type="time"
                        id="time_of_birth"
                        name="time_of_birth"
                        value={customer.time_of_birth}
                        onChange={handleCustomerChange}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="label-field" htmlFor="place_of_birth">Place of Birth</label>
                      <input
                        type="text"
                        id="place_of_birth"
                        name="place_of_birth"
                        value={customer.place_of_birth}
                        onChange={handleCustomerChange}
                        className="input-field"
                        placeholder="City, Country"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="label-field" htmlFor="notes">Additional Question / Message</label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={4}
                      className="input-field"
                      placeholder="Any specific questions or concerns?"
                    />
                  </div>

                  <div className="flex justify-between">
                    <button type="button" onClick={goBack} className="btn-outline">
                      Back
                    </button>
                    <button type="submit" className="btn-primary">
                      Continue to Payment
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Step 5: Payment */}
            {currentStep === 4 && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-serif text-soft-white mb-8 text-center">Payment</h2>
                <div className="card max-w-md mx-auto">
                  <div className="mb-6">
                    <h3 className="text-lg font-serif text-soft-white mb-2">{selectedService?.name}</h3>
                    <p className="text-sm text-gray-400 mb-4">
                      {selectedDate} · {selectedSlot?.start_time}
                    </p>
                    <div className="flex justify-between items-center py-4 border-t border-dark-slate">
                      <span className="text-gray-300">Amount</span>
                      <span className="text-2xl font-serif text-gold">₹{selectedService?.price}</span>
                    </div>
                  </div>

                  {error && (
                    <p className="text-red-400 text-sm mb-4">{error}</p>
                  )}

                  <button
                    onClick={handlePayment}
                    disabled={loading}
                    className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Processing...' : 'Pay Now'}
                  </button>
                  <p className="text-xs text-gray-500 mt-4 text-center">
                    Secure payment powered by Razorpay. UPI, Cards & Net Banking accepted.
                  </p>
                </div>
                <div className="text-center mt-8">
                  <button onClick={goBack} className="btn-outline">
                    Back
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Booking;