import { useEffect } from 'react';
import { useCartStore } from '../store/cart';

export const useCart = () => {
  const fetchCartItems = useCartStore((state) => state.fetchCartItems);
  const updateItemQuantity = useCartStore((state) => state.updateItemQuantity);
  const removeCartItem = useCartStore((state) => state.removeCartItem);
  const items = useCartStore((state) => state.items);
  const totalAmount = useCartStore((state) => state.totalAmount);
  const loading = useCartStore((state) => state.loading);
  const addCartItem = useCartStore((state) => state.addCartItem);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  return { updateItemQuantity, removeCartItem, items, totalAmount,loading,addCartItem };
};
