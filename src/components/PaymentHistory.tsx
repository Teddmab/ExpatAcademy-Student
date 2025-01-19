import React from 'react';
import { Download, ExternalLink } from 'lucide-react';
import type { Transaction } from '../types/payment';

interface PaymentHistoryProps {
  transactions: Transaction[];
  onDownloadReceipt: (transaction: Transaction) => void;
}

const PaymentHistory: React.FC<PaymentHistoryProps> = ({ transactions, onDownloadReceipt }) => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            <div className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <p className="text-sm font-medium text-indigo-600 truncate">
                    {transaction.description}
                  </p>
                  <p className="sm:ml-2 flex-shrink-0 flex">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      transaction.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : transaction.status === 'failed'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {transaction.status}
                    </span>
                  </p>
                </div>
                <div className="sm:flex sm:items-center">
                  <p className="text-sm text-gray-900 font-medium">
                    {transaction.currency} {transaction.amount.toFixed(2)}
                  </p>
                  {transaction.receipt_url && (
                    <button
                      onClick={() => onDownloadReceipt(transaction)}
                      className="ml-4 text-indigo-600 hover:text-indigo-900"
                    >
                      <Download className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </div>
              <div className="mt-2 sm:flex sm:justify-between">
                <div className="sm:flex">
                  <p className="flex items-center text-sm text-gray-500">
                    <ExternalLink className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                    {transaction.reference}
                  </p>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                  <p>
                    {new Date(transaction.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PaymentHistory;