import { Product } from '@prisma/client';
import { ApiRoute } from './constance';
import { axiosInstance } from './instance';

export const search = async (query: string):Promise<Product[]> => {
  return (await axiosInstance.get<Product[]>(ApiRoute.SEARCH_PRODUCT, { params: { query } })).data;
};
