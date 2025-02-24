import { create } from 'zustand';
import { Api } from '../services/appi-client';
import { getCartDetails } from '../lib/get-cart-ditails';

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
      const data = await Api.cart.fetchCart()
      set(getCartDetails(data))
    } catch (error) {
        console.log(error)
     set({error:true})
    } finally {
        set({ loading: false });
    }
  },
  removeCartItem:async(id:number)=>{},
  updateItemQuantity: async(id:number, quantity:number)=>{},
  addCartItem: async(values: any)=>{},


}));
