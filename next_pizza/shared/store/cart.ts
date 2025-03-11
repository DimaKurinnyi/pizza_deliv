import { create } from 'zustand';
import { getCartDetails } from '../lib/get-cart-ditails';
import { Api } from '../services/appi-client';

export type CartStateItem = {
  id: number;
  quantity: number;
  name: string;
  price: number;
  imageUrl: string;
  pizzaSize?: number | null;
  pizzaType?: number | null;
  ingredients: Array<{ name: string; price: number }>;
};

export interface CartState {
  loading: boolean;
  error: boolean;
  totalAmount: number;
  items: CartStateItem[];

  // get items from cart
  fetchCartItems: () => Promise<void>;

  // update item quantity  in cart
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;

  // add new item to cart
  addCartItem: (values: any) => Promise<void>;

  // remove item from cart  (not delete, just mark as removed)  (soft delete)
  removeCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  error: false,
  loading: true,
  totalAmount: 0,
  fetchCartItems: async () => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.fetchCart();
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
  removeCartItem: async (id: number) => {try {
    set({ loading: true, error: false });
    const data = await Api.cart.removeCartItem(id);
    set(getCartDetails(data));
  } catch (error) {
    console.error(error);
    set({ error: true });
  } finally {
    set({ loading: false });
  }},
  updateItemQuantity: async (id: number, quantity: number) => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.updateItemQuantity(id, quantity);
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
  addCartItem: async (values: any) => {},
}));
