import { API } from '../api';
import axiosClient from '../interceptor';
import { ProductType } from '../models/product';

export const getFeaturedProduct = () => {
  return axiosClient.get(API.PRODUCT.GETFEATURED);
};
