import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, DollarSign } from 'lucide-react';
import { useBasket } from '../../context/BasketContext';

const Basket = () => {
  const navigate = useNavigate();
  const { items, removeFromBasket, clearBasket } = useBasket();

  const total = items.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
    navigate('/payment', {
      state: {
        paymentDetails: {
          type: 'course',
          amount: total,
          currency: 'USD',
          description: `Payment for ${items.length} course${items.length > 1 ? 's' : ''}`,
        }
      }
    });
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-8">
        <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">Your basket is empty</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-gray-900">Your Basket</h2>
        <button
          onClick={clearBasket}
          className="text-sm text-red-600 hover:text-red-800"
        >
          Clear All
        </button>
      </div>

      <div className="divide-y divide-gray-200">
        {items.map((item) => (
          <div key={item.id} className="py-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{item.description}</p>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-900 mr-4">
                  ${item.price}
                </span>
                <button
                  onClick={() => removeFromBasket(item.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t border-gray-200 pt-6">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Total</p>
          <p>${total.toFixed(2)}</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">
          Taxes and additional fees calculated at checkout.
        </p>
      </div>

      <div className="mt-6">
        <button
          onClick={handleCheckout}
          className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <DollarSign className="h-5 w-5 mr-2" />
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Basket;