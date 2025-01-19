import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  CreditCard, Smartphone, Globe2, Wallet, AlertCircle, 
  CheckCircle, Download, DollarSign, Building2, FileText 
} from 'lucide-react';
import type { PaymentMethod, PaymentDetails, Transaction } from '../types/payment';
import { initiatePayment, getPaymentStatus, getPaymentReceipt } from '../services/paymentService';
import PaymentHistory from '../components/PaymentHistory';

interface PaymentMethodOption {
  id: PaymentMethod;
  name: string;
  icon: React.ReactNode;
  description: string;
  fees: string;
  enabled: boolean;
}

const paymentMethods: PaymentMethodOption[] = [
  {
    id: 'mobile_money',
    name: 'Mobile Money',
    icon: <Smartphone className="h-6 w-6" />,
    description: 'Pay using MTN, Airtel, or Vodafone Mobile Money',
    fees: '1-2% transaction fee',
    enabled: true
  },
  {
    id: 'card',
    name: 'Credit/Debit Card',
    icon: <CreditCard className="h-6 w-6" />,
    description: 'Pay with Visa or Mastercard',
    fees: '2.9% + $0.30 transaction fee',
    enabled: true
  },
  {
    id: 'paypal',
    name: 'PayPal',
    icon: <Wallet className="h-6 w-6" />,
    description: 'Fast and secure payment with PayPal',
    fees: '3.9% + fixed fee',
    enabled: true
  },
  {
    id: 'wise',
    name: 'Wise Transfer',
    icon: <Globe2 className="h-6 w-6" />,
    description: 'International bank transfer with low fees',
    fees: 'From 0.4%',
    enabled: true
  },
  {
    id: 'revolut',
    name: 'Revolut',
    icon: <Building2 className="h-6 w-6" />,
    description: 'Quick transfer using Revolut',
    fees: 'No fees',
    enabled: true
  }
];

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    type: 'course',
    amount: 0,
    currency: 'USD',
    description: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    // If payment details are passed through location state, use them
    if (location.state?.paymentDetails) {
      setPaymentDetails(location.state.paymentDetails);
    }
  }, [location]);

  const handlePaymentMethodSelect = (method: PaymentMethod) => {
    setSelectedMethod(method);
    setError(null);
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMethod) {
      setError('Please select a payment method');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const { transactionId, redirectUrl } = await initiatePayment(selectedMethod, paymentDetails);
      
      if (redirectUrl) {
        window.location.href = redirectUrl;
      } else {
        // Poll for payment status
        const interval = setInterval(async () => {
          const status = await getPaymentStatus(transactionId);
          if (status.status === 'completed') {
            setSuccess(true);
            clearInterval(interval);
          } else if (status.status === 'failed') {
            setError('Payment failed. Please try again.');
            clearInterval(interval);
          }
        }, 2000);
      }
    } catch (err) {
      setError('Payment failed to initialize. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadReceipt = async (transaction: Transaction) => {
    try {
      const receipt = await getPaymentReceipt(transaction.id);
      const url = window.URL.createObjectURL(receipt);
      const link = document.createElement('a');
      link.href = url;
      link.download = `receipt-${transaction.reference}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError('Failed to download receipt. Please try again.');
    }
  };

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Payment Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Payment</h1>
            <p className="mt-2 text-gray-600">
              Choose your preferred payment method to continue
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <p className="ml-3 text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-6 bg-green-50 border-l-4 border-green-400 p-4">
              <div className="flex">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <div className="ml-3">
                  <p className="text-sm text-green-700">Payment successful!</p>
                  <p className="mt-2 text-sm text-green-600">
                    Your transaction has been completed successfully.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Payment Details */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Payment Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Amount</p>
                <p className="text-lg font-medium text-gray-900">
                  {paymentDetails.currency} {paymentDetails.amount.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Type</p>
                <p className="text-lg font-medium text-gray-900 capitalize">
                  {paymentDetails.type}
                </p>
              </div>
            </div>
            {paymentDetails.description && (
              <div className="mt-4">
                <p className="text-sm text-gray-500">Description</p>
                <p className="text-gray-900">{paymentDetails.description}</p>
              </div>
            )}
          </div>

          {/* Payment Methods */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Select Payment Method</h2>
            <div className="grid gap-4">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => handlePaymentMethodSelect(method.id)}
                  disabled={!method.enabled || isProcessing}
                  className={`flex items-start p-4 border rounded-lg transition-colors ${
                    selectedMethod === method.id
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-200'
                  } ${!method.enabled && 'opacity-50 cursor-not-allowed'}`}
                >
                  <div className="flex-shrink-0 text-indigo-600">
                    {method.icon}
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-sm font-medium text-gray-900">{method.name}</h3>
                    <p className="mt-1 text-sm text-gray-500">{method.description}</p>
                    <p className="mt-1 text-xs text-gray-400">{method.fees}</p>
                  </div>
                  {selectedMethod === method.id && (
                    <CheckCircle className="h-5 w-5 text-indigo-600" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Payment Button */}
          <button
            onClick={handlePaymentSubmit}
            disabled={!selectedMethod || isProcessing}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                Processing...
              </>
            ) : (
              <>Pay Now</>
            )}
          </button>

          {/* Transaction History */}
          {transactions.length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Transaction History</h2>
              <PaymentHistory
                transactions={transactions}
                onDownloadReceipt={handleDownloadReceipt}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;