import { API } from '../api';
import axiosClient from '../interceptor';
import { ProductType } from '../models/product';

export const getFeaturedProduct = async () => {
  const res = await axiosClient.get(API.PRODUCT.GETFEATURED);
  const data = res.data;
  return data as ProductType[];
};
