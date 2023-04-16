import { API } from '../../constant/api';
import axiosClient from '../../interceptor';
import { ProductRatingRequest } from '../../models/api/product';
import { commonResponse } from '../../models/common';
import { Filter, ProductType } from '../../models/product';

export const getFeaturedProduct = async () => {
  const res = await axiosClient.get(API.PRODUCT.GETFEATURED);

  return res.data as ProductType[];
};

export const getProducts = async (filter: Filter) => {
  const res = await axiosClient.get(API.PRODUCT.GETALL, {
    params: {
      ...filter,
    },
  });
  return res.data as ProductType[];
};

export const getProductById = async (id: string) => {
  const res = await axiosClient.get(API.PRODUCT.GETPRODUCT(id));
  return res.data as ProductType;
};

export const ratingProduct = async (id: string, body: ProductRatingRequest) => {
  const res = await axiosClient.post(API.PRODUCT.RATINGPRODUCT(id), body);
  return res.data as commonResponse;
};
