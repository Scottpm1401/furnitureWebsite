import { API } from '../api';
import axiosClient from '../interceptor';
import { ProductType } from '../models/product';

export const getFeaturedProduct = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BE_URL}${API.PRODUCT.GETFEATURED}`
  );
  const data = await res.json();
  return data as ProductType[];
};
