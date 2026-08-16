import { motion } from 'framer-motion';
import { Slot } from '../types';

interface TimeSlotProps {
  slot: Slot;
  selected: boolean;
  onSelect: (slot: Slot) => void;
}

const TimeSlot = ({ slot, selected, onSelect }: TimeSlotProps) => {
  const isAvailable = slot.status === 'AVAILABLE';
  const isHeld = slot.status === 'HELD';

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${String(minutes).padStart(2, '0')} ${period}`;
  };

  return (
    <motion.button
      whileHover={isAvailable ? { scale: 1.02 } : undefined}
      whileTap={isAvailable ? { scale: 0.98 } : undefined}
      onClick={() => isAvailable && onSelect(slot)}
      disabled={!isAvailable}
      className={`w-full py-3 px-4 rounded-lg text-sm font-medium transition-all ${
        selected
          ? 'bg-gold text-deep-black'
          : isAvailable
            ? 'bg-dark-slate border border-dark-slate text-soft-white hover:border-gold/50 hover:text-gold'
            : 'bg-dark-slate/50 border border-dark-slate text-gray-600 cursor-not-allowed'
      }`}
    >
      {formatTime(slot.start_time)}
      {isHeld && <span className="ml-2 text-xs text-gray-500">(Held)</span>}
    </motion.button>
  );
};

export default TimeSlot;