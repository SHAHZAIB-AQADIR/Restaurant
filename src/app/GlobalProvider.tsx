import { CartProvider } from '@/app/context/CartContext'
import React, { ReactNode } from 'react'

interface GlobalProviderProps {
  children: ReactNode;
}

const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  return (
    <CartProvider>
      {children}
    </CartProvider>
  );
};

export default GlobalProvider;