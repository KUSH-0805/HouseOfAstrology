import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = mockServices.find((s) => s.slug === slug) || mockServices[0];

  const whoItsFor = [
    'Seeking clarity in your professional life',
    'Facing important decisions and need guidance',
    'Wanting to understand your life patterns',
    'Looking for practical, actionable advice',
  ];

  const whatYouReceive = [
    'Personalized consultation session',
    'Detailed analysis of your situation',
    'Practical recommendations and guidance',
    'Follow-up support if needed',
  ];

  const howItWorks = [
    { step: '01', title: 'Book', description: 'Choose your preferred date and time.' },
    { step: '02', title: 'Connect', description: 'Join the consultation at the scheduled time.' },
    { step: '03', title: 'Receive Guidance', description: 'Get clear, practical, and honest insights.' },
  ];

  const faqs = [
    {
      question: 'What do I need to prepare?',
      answer: 'For most consultations, having your date of birth, time of birth, and place of birth ready is helpful. For birth chart readings, this information is essential.',
    },
    {
      question: 'How is the consultation conducted?',
      answer: 'Consultations are conducted via phone or video call. You will receive the connection details in your confirmation email.',
    },
    {
      question: 'Can I ask questions during the session?',
      answer: 'Absolutely. The session is interactive and designed to address your specific questions and concerns.',
    },
  ];

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-20 bg-charcoal">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="section-subtitle">Service</p>
            <h1 className="section-title">{service.name}</h1>
            <p className="text-gray-400 max-w-3xl mx-auto mb-8">{service.description}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center text-gray-300">
                <svg className="w-5 h-5 mr-2 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {service.duration} Minutes
              </div>
              <div className="text-3xl font-serif text-gold">₹{service.price}</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Consultation */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="section-subtitle">About This Consultation</p>
              <h2 className="section-title">What to Expect</h2>
              <p className="text-gray-400 leading-relaxed">
                This {service.duration}-minute consultation is designed to provide you with
                clear, practical, and honest guidance on {service.name.toLowerCase()}.
                Each session is personalized to your unique situation and questions.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="card"
            >
              <h3 className="text-xl font-serif text-soft-white mb-4">Who Is It For?</h3>
              <ul className="space-y-3">
                {whoItsFor.map((item) => (
                  <li key={item} className="flex items-start text-gray-300">
                    <svg className="w-5 h-5 mr-3 mt-0.5 text-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What You Receive */}
      <section className="py-20 bg-charcoal">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="section-subtitle">What You Receive</p>
            <h2 className="section-title">Your Session Includes</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whatYouReceive.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card"
              >
                <div className="w-12 h-12 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-gray-300">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="section-subtitle">How It Works</p>
            <h2 className="section-title">Simple Three Steps</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl font-serif text-gold/20 mb-4">{step.step}</div>
                <h3 className="text-xl font-serif text-soft-white mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
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
            <h2 className="section-title">Common Questions</h2>
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

      {/* CTA */}
      <section className="py-20">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title mb-6">Ready to Book This Consultation?</h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-10">
              {service.duration} minutes · ₹{service.price}
            </p>
            <Link to={`/book?service=${service.id}`} className="btn-primary text-lg">
              Book This Consultation
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;