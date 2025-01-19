export type PaymentMethod = 'mobile_money' | 'revolut' | 'wise' | 'card' | 'paypal';

export type MobileMoneyProvider = 'mtn' | 'airtel' | 'vodafone';

export interface PaymentDetails {
  type: 'course' | 'tuition' | 'visa';
  amount: number;
  currency: string;
  description: string;
  reference?: string;
}

export interface PaymentMethodOption {
  id: PaymentMethod;
  name: string;
  icon: string;
  description: string;
  fees: string;
  enabled: boolean;
}

export interface Transaction {
  id: string;
  type: 'course' | 'tuition' | 'visa';
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  method: PaymentMethod;
  description: string;
  reference: string;
  date: string;
  receipt_url?: string;
}