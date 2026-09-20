import api from './api';
import { 
  AvailabilityResponse, 
  CreateBookingRequest, 
  CreateBookingResponse, 
  Slot,
  VerifyPaymentRequest,
  Booking
} from '../types';

export const getAvailability = async (date: string): Promise<AvailabilityResponse> => {
  const response = await api.get(`/api/availability/?date=${date}`);
  return response.data;
};

export const getSlots = async (): Promise<Slot[]> => {
  const response = await api.get('/api/slots/');
  return response.data;
};

export const createBooking = async (data: CreateBookingRequest): Promise<CreateBookingResponse> => {
  const response = await api.post('/api/bookings/', data);
  return response.data;
};

export const getBooking = async (id: number): Promise<Booking> => {
  const response = await api.get(`/api/bookings/detail/${id}/`);
  return response.data;
};

export const verifyPayment = async (data: VerifyPaymentRequest): Promise<Booking> => {
  const response = await api.post('/api/payments/verify/', data);
  return response.data;
};