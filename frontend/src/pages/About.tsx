import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const stats = [
  { value: '7+', label: 'Years of Study & Practice' },
  { value: '1000+', label: 'Consultations Guided' },
  { value: 'Vedic', label: 'Rooted in Ancient Wisdom' },
  { value: 'Real', label: 'Practical. Honest. Result-Oriented.' },
];

const journey = [
  {
    title: 'The Beginning',
    description: 'My journey into astrology began with a deep curiosity about the patterns that shape our lives and the cosmic forces that influence our paths.',
  },
  {
    title: 'Years of Study',
    description: 'Over 7 years of dedicated study of Vedic astrology, planetary movements, and their practical applications in everyday life.',
  },
  {
    title: 'Practice & Growth',
    description: 'Guided over 1000 consultations, helping people find clarity in career, relationships, and life purpose.',
  },
  {
    title: 'Today',
    description: 'Combining ancient wisdom with practical, honest, and result-oriented guidance for a better tomorrow.',
  },
];

const approach = [
  {
    title: 'Practical',
    description: 'Focus on real-life answers and actionable guidance, not just theoretical predictions.',
  },
  {
    title: 'Honest',
    description: 'Clear, straightforward insights without sugar-coating or fear-mongering.',
  },
  {
    title: 'Result-Oriented',
    description: 'Every consultation is designed to help you take confident steps forward.',
  },
  {
    title: 'Rooted in Wisdom',
    description: 'Built on the solid foundation of ancient Vedic astrological knowledge.',
  },
];

const About = () => {
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
            <p className="section-subtitle">About</p>
            <h1 className="section-title">Astrology with Intellect. Insights. Impact.</h1>
            <p className="text-gray-400 max-w-3xl mx-auto">
              My journey is rooted in a deep commitment to providing practical,
              honest, and result-oriented astrological guidance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="container-custom">
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

      {/* My Journey */}
      <section className="py-20 bg-charcoal">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="section-subtitle">My Journey</p>
            <h2 className="section-title">A Path of Discovery</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {journey.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card"
              >
                <h3 className="text-xl font-serif text-gold mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="section-subtitle">My Approach</p>
            <h2 className="section-title">Why Choose Me</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {approach.map((item, index) => (
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-serif text-soft-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link to="/book" className="btn-primary text-lg">
              Book Your Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;