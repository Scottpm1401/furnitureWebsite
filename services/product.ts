import { API } from '../api';
import axiosClient from '../interceptor';
import { ProductType } from '../models/product';

export const getFeaturedProduct = async () => {
  const res = await axiosClient.get(API.PRODUCT.GETFEATURED);
  return [];
  // return res.data as ProductType[];
};
