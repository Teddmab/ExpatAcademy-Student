import React, { createContext, useContext, useState } from 'react';

interface BasketItem {
  id: string;
  name: string;
  description: string;
  price: number;
}

interface BasketContextType {
  items: BasketItem[];
  addToBasket: (item: BasketItem) => void;
  removeFromBasket: (id: string) => void;
  clearBasket: () => void;
}

const BasketContext = createContext<BasketContextType | null>(null);

export const BasketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<BasketItem[]>([]);

  const addToBasket = (item: BasketItem) => {
    setItems((prevItems) => {
      // Check if item already exists
      if (prevItems.some((i) => i.id === item.id)) {
        return prevItems;
      }
      return [...prevItems, item];
    });
  };

  const removeFromBasket = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const clearBasket = () => {
    setItems([]);
  };

  return (
    <BasketContext.Provider value={{ items, addToBasket, removeFromBasket, clearBasket }}>
      {children}
    </BasketContext.Provider>
  );
};

export const useBasket = () => {
  const context = useContext(BasketContext);
  if (!context) {
    throw new Error('useBasket must be used within a BasketProvider');
  }
  return context;
};