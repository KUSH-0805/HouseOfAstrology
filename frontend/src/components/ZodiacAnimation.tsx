import { motion } from 'framer-motion';

const stars = [
  { top: '10%', left: '15%', size: 2, delay: 0 },
  { top: '20%', left: '80%', size: 3, delay: 0.5 },
  { top: '30%', left: '60%', size: 2, delay: 1 },
  { top: '50%', left: '10%', size: 3, delay: 1.5 },
  { top: '60%', left: '90%', size: 2, delay: 2 },
  { top: '70%', left: '30%', size: 1, delay: 0.8 },
  { top: '80%', left: '70%', size: 2, delay: 1.2 },
  { top: '15%', left: '45%', size: 1, delay: 2.5 },
  { top: '90%', left: '50%', size: 2, delay: 0.3 },
  { top: '40%', left: '25%', size: 1, delay: 1.8 },
  { top: '45%', left: '85%', size: 1, delay: 2.8 },
  { top: '85%', left: '15%', size: 2, delay: 0.6 },
];

const ZodiacAnimation = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Stars */}
      {stars.map((star, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-soft-white"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: star.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Moon */}
      <motion.div
        className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-gold/30 to-transparent"
        style={{
          top: '15%',
          right: '20%',
          boxShadow: '0 0 60px rgba(212, 175, 55, 0.3)',
        }}
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <div className="absolute inset-3 rounded-full bg-gold/50" />
        <div className="absolute inset-4 rounded-full bg-gold/30" />
      </motion.div>

      {/* Orbital circle */}
      <motion.div
        className="absolute border border-gold/20 rounded-full"
        style={{
          top: '50%',
          left: '50%',
          width: 400,
          height: 400,
          marginLeft: -200,
          marginTop: -200,
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <div
          className="absolute w-2 h-2 rounded-full bg-gold"
          style={{ top: -4, left: '50%' }}
        />
      </motion.div>

      {/* Smaller orbital circle */}
      <motion.div
        className="absolute border border-gold/10 rounded-full"
        style={{
          top: '50%',
          left: '50%',
          width: 280,
          height: 280,
          marginLeft: -140,
          marginTop: -140,
        }}
        animate={{ rotate: -360 }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <div
          className="absolute w-1.5 h-1.5 rounded-full bg-gold/70"
          style={{ bottom: -3, left: '50%' }}
        />
      </motion.div>

      {/* Zodiac symbol rings */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-gold rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-gold rounded-full" />
      </div>
    </div>
  );
};

export default ZodiacAnimation;