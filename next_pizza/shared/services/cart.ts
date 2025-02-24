import { cartDTO } from './dto/cart.dto';
import { axiosInstance } from './instance';

export const fetchCart = async (): Promise<cartDTO> => {
  const { data } = await axiosInstance.get<cartDTO>('/cart');
  return data;
};
