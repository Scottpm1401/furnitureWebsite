import axios from 'axios';

import { API } from '../api';
import axiosClient from '../interceptor';
import { Filter, ProductType } from '../models/product';

export const getFeaturedProduct = async () => {
  const res = await axiosClient.get(API.PRODUCT.GETFEATURED);
  // const res = await axios.get(
  //   `${process.env.NEXT_PUBLIC_BE_URL}${API.PRODUCT.GETFEATURED}`
  // );
  return res.data as ProductType[];
};

export const getProducts = async (filter: Filter) => {
  const res = await axiosClient.get(API.PRODUCT.GETALL, {
    params: {
      ...filter,
    },
  });
  // const res = await axios.get(
  //   `${process.env.NEXT_PUBLIC_BE_URL}${API.PRODUCT.GETFEATURED}`
  // );
  return res.data as ProductType[];
};
