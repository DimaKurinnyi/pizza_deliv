import { cartDTO, CreateCartItemValues } from './dto/cart.dto';
import { axiosInstance } from './instance';

export const fetchCart = async (): Promise<cartDTO> => {
  const { data } = await axiosInstance.get<cartDTO>('/cart');
  return data;
};

export const updateItemQuantity = async (itemId: number, quantity: number): Promise<cartDTO> => {
  const { data } = await axiosInstance.patch<cartDTO>('/cart/' + itemId, { quantity });

  return data;
};

export const removeCartItem = async (itemId: number): Promise<cartDTO> => {
  const { data } = await axiosInstance.delete<cartDTO>('/cart/' + itemId);

  return data;
};

export const addCartItem = async (values: CreateCartItemValues): Promise<cartDTO> => {
  const { data } = await axiosInstance.post<cartDTO>('/cart', values);
  return data;
};
