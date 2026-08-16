import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const packages = [
  {
    name: 'Career Guidance',
    duration: '30 Minutes',
    price: 999,
    description: 'Professional growth and success guidance',
    features: [
      'Career path analysis',
      'Financial decision guidance',
      'Professional opportunities',
      'Practical recommendations',
    ],
  },
  {
    name: 'Relationship Consultation',
    duration: '45 Minutes',
    price: 1499,
    description: 'Meaningful connections and harmony',
    features: [
      'Relationship pattern analysis',
      'Compatibility insights',
      'Communication guidance',
      'Personal growth advice',
    ],
  },
  {
    name: 'Life Purpose Reading',
    duration: '45 Minutes',
    price: 1299,
    description: 'Discover your path and true calling',
    features: [
      'Life purpose analysis',
      'Soul path guidance',
      'Alignment strategies',
      'Actionable steps',
    ],
  },
  {
    name: 'Birth Chart Reading',
    duration: '60 Minutes',
    price: 1999,
    description: 'Deep insights from your cosmic blueprint',
    features: [
      'Complete birth chart analysis',
      'Planetary influences',
      'Life themes and patterns',
      'Comprehensive guidance',
    ],
  },
];

const faqs = [
  {
    question: 'How do I book a consultation?',
    answer: 'Simply choose a service, select your preferred date and time, enter your details, and complete the payment. You will receive a confirmation email with all the details.',
  },
  {
    question: 'What payment methods are accepted?',
    answer: 'We accept UPI, credit/debit cards, and net banking through our secure Razorpay payment gateway.',
  },
  {
    question: 'How will the consultation be conducted?',
    answer: 'Consultations are conducted via phone or video call at the scheduled time. You will receive the connection details in your confirmation email.',
  },
  {
    question: 'Can I reschedule my consultation?',
    answer: 'Yes, you can reschedule your consultation by contacting us at least 24 hours before your scheduled time.',
  },
  {
    question: 'What information do I need to provide?',
    answer: 'For most consultations, you will need to provide your date of birth, time of birth, and place of birth. For birth chart readings, this information is essential.',
  },
];

const Pricing = () => {
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
            <p className="section-subtitle">Pricing</p>
            <h1 className="section-title">Transparent Pricing for Every Consultation</h1>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Choose the consultation that fits your needs. Every session is
              personalized and result-oriented.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card flex flex-col"
              >
                <h3 className="text-xl font-serif text-soft-white mb-2">{pkg.name}</h3>
                <p className="text-sm text-gray-400 mb-4">{pkg.duration}</p>
                <div className="text-4xl font-serif text-gold mb-4">₹{pkg.price}</div>
                <p className="text-sm text-gray-400 mb-6">{pkg.description}</p>
                <ul className="space-y-2 mb-8 flex-grow">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start text-sm text-gray-300">
                      <svg className="w-4 h-4 mr-2 mt-0.5 text-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link to={`/book?service=${index + 1}`} className="btn-primary w-full text-center">
                  Book Now
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-charcoal">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="section-subtitle">FAQ</p>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card"
              >
                <h3 className="text-lg font-serif text-soft-white mb-2">{faq.question}</h3>
                <p className="text-sm text-gray-400">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;