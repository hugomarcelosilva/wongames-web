import { createContext, useContext, useEffect, useState } from 'react';

import { useQueryGames } from 'graphql/queries/games';
import formatPrice from 'utils/format-price';
import { getStorageItem, setStorageItem } from 'utils/localStorage';
import { cartMapper } from 'utils/mappers';

const CART_KEY = 'cartItems';

type CartItem = {
  id: string;
  img: string;
  title: string;
  price: string;
};

export type CartContextData = {
  items: CartItem[];
  loading: boolean;
  quantity: number;
  total: string;
  addToCart: (id: string) => void;
  clearCart: () => void;
  isInCart: (id: string) => boolean;
  removeFromCart: (id: string) => void;
};

export const CartContextDefaultValues = {
  items: [],
  loading: false,
  quantity: 0,
  total: '$0.00',
  addToCart: () => null,
  clearCart: () => null,
  isInCart: () => false,
  removeFromCart: () => null
};

export const CartContext = createContext<CartContextData>(
  CartContextDefaultValues
);

export type CartProviderProps = {
  children: React.ReactNode;
};

const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<string[]>([]);

  useEffect(() => {
    const data = getStorageItem(CART_KEY);

    if (data) {
      setCartItems(data);
    }
  }, []);

  const { data, loading } = useQueryGames({
    skip: !cartItems?.length,
    variables: {
      where: {
        id: cartItems
      }
    }
  });

  const total = data?.games.reduce((acc, game) => acc + game.price, 0);

  const saveCart = (cartItems: string[]) => {
    setCartItems(cartItems);
    setStorageItem(CART_KEY, cartItems);
  };

  const addToCart = (id: string) => {
    saveCart([...cartItems, id]);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const isInCart = (id: string) => (id ? cartItems.includes(id) : false);

  const removeFromCart = (id: string) => {
    const newCartItems = cartItems.filter((itemId: string) => itemId !== id);
    saveCart(newCartItems);
  };

  return (
    <CartContext.Provider
      value={{
        items: cartMapper(data?.games),
        loading,
        quantity: cartItems.length,
        total: formatPrice(total || 0),
        addToCart,
        clearCart,
        isInCart,
        removeFromCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export { CartProvider, useCart };
