import axios from 'axios';

import { API } from '../api';
import axiosClient from '../interceptor';
import { ProductType } from '../models/product';

export const getFeaturedProduct = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BE_URL}${API.PRODUCT.GETFEATURED}`
  );
  const data = res.data;
  return data as ProductType[];
};
