export interface Service {
  id: number;
  name: string;
  slug: string;
  description: string;
  duration: number;
  price: number;
  is_active: boolean;
  icon?: string;
}

export interface Slot {
  id: number;
  date: string;
  start_time: string;
  end_time: string;
  status: 'AVAILABLE' | 'BLOCKED' | 'BOOKED' | 'HELD';
}

export interface Customer {
  name: string;
  email: string;
  phone: string;
  date_of_birth?: string;
  time_of_birth?: string;
  place_of_birth?: string;
}

export interface Booking {
  id: number;
  booking_number: string;
  customer: Customer;
  service: Service;
  slot: Slot;
  booking_status: 'PENDING_PAYMENT' | 'CONFIRMED' | 'CANCELLED' | 'EXPIRED';
  amount: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Payment {
  id: number;
  booking: number;
  razorpay_order_id: string;
  razorpay_payment_id?: string;
  razorpay_signature?: string;
  amount: number;
  status: 'CREATED' | 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED';
  created_at: string;
  updated_at: string;
}

export interface AvailabilityResponse {
  date: string;
  slots: Slot[];
}

export interface CreateBookingRequest {
  service_id: number;
  slot_id: number;
  customer: Customer;
  notes?: string;
}

export interface CreateBookingResponse {
  booking: Booking;
  message?: string;
  payment?: {
    order_id: string;
    amount: number;
    currency: string;
    key_id: string;
  };
}

export interface VerifyPaymentRequest {
  booking_id: number;
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}