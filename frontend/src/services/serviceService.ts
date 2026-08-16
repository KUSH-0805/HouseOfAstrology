import api from './api';
import { Service } from '../types';

export const getServices = async (): Promise<Service[]> => {
  const response = await api.get('/api/services/');
  return response.data;
};

export const getService = async (id: number): Promise<Service> => {
  const response = await api.get(`/api/services/${id}/`);
  return response.data;
};

export const getServiceBySlug = async (slug: string): Promise<Service> => {
  const response = await api.get(`/api/services/${slug}/`);
  return response.data;
};