import api from './api';
import { VerifyPaymentRequest, Booking } from '../types';

export const createOrder = async (bookingId: number) => {
  const response = await api.post('/api/payments/create-order/', { booking_id: bookingId });
  return response.data;
};

export const verifyPayment = async (data: VerifyPaymentRequest): Promise<Booking> => {
  const response = await api.post('/api/payments/verify/', data);
  return response.data;
};