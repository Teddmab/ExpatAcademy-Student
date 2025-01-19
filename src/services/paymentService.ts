import type { PaymentMethod, PaymentDetails, Transaction } from '../types/payment';
import api from './api';

export const initiatePayment = async (
  method: PaymentMethod,
  details: PaymentDetails
): Promise<{ transactionId: string; redirectUrl?: string }> => {
  const response = await api.post('/api/payments/initiate', {
    method,
    ...details,
  });
  return response.data;
};

export const getPaymentStatus = async (transactionId: string): Promise<Transaction> => {
  const response = await api.get(`/api/payments/${transactionId}/status`);
  return response.data;
};

export const getTransactionHistory = async (): Promise<Transaction[]> => {
  const response = await api.get('/api/payments/history');
  return response.data;
};

export const getPaymentReceipt = async (transactionId: string): Promise<Blob> => {
  const response = await api.get(`/api/payments/${transactionId}/receipt`, {
    responseType: 'blob'
  });
  return response.data;
};