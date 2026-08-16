import { useState } from 'react';
import { motion } from 'framer-motion';

interface BookingCalendarProps {
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
  disabledDates?: string[];
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const BookingCalendar = ({ selectedDate, onSelectDate, disabledDates = [] }: BookingCalendarProps) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const formatDate = (day: number) => {
    return `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const isPastDate = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return date < todayDate;
  };

  const isDisabled = (day: number) => {
    const dateStr = formatDate(day);
    return isPastDate(day) || disabledDates.includes(dateStr);
  };

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={prevMonth}
          className="p-2 text-gray-400 hover:text-gold transition-colors"
          aria-label="Previous month"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h3 className="text-lg font-serif text-soft-white">
          {MONTHS[currentMonth]} {currentYear}
        </h3>
        <button
          onClick={nextMonth}
          className="p-2 text-gray-400 hover:text-gold transition-colors"
          aria-label="Next month"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAYS.map((day) => (
          <div key={day} className="text-center text-xs text-gray-500 font-medium py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          if (day === null) {
            return <div key={`empty-${index}`} className="h-10" />;
          }

          const dateStr = formatDate(day);
          const disabled = isDisabled(day);
          const selected = selectedDate === dateStr;

          return (
            <motion.button
              key={day}
              whileHover={!disabled ? { scale: 1.05 } : undefined}
              whileTap={!disabled ? { scale: 0.95 } : undefined}
              onClick={() => !disabled && onSelectDate(dateStr)}
              disabled={disabled}
              className={`h-10 rounded-lg text-sm font-medium transition-all ${
                selected
                  ? 'bg-gold text-deep-black'
                  : disabled
                    ? 'text-gray-600 cursor-not-allowed'
                    : 'text-gray-300 hover:bg-gold/10 hover:text-gold'
              }`}
            >
              {day}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default BookingCalendar;