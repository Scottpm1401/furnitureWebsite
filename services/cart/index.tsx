import { API } from '../../constant/api';
import axiosClient from '../../interceptor';
import {
  AddToCartRequest,
  RemoveFromCartRequest,
  UpdateCartQuantityRequest,
  UpdateProductCartQuantityResponse,
} from '../../models/api/cart';
import { ProductCartType } from '../../models/cart';
import { commonResponse } from '../../models/common';

export const addProductCart = async (body: AddToCartRequest) => {
  const res = await axiosClient.post(API.USER.ADDTOCART, body);
  return res.data as ProductCartType[];
};

export const removeProductCart = async (body: RemoveFromCartRequest) => {
  const res = await axiosClient.post(API.USER.REMOVEFROMCART, body);
  return res.data as ProductCartType[];
};

export const clearProductCart = async () => {
  const res = await axiosClient.post(API.USER.CLEARCART);
  return res.data as commonResponse;
};

export const updateCartQuantity = async (body: UpdateCartQuantityRequest) => {
  const res = await axiosClient.post(API.USER.UPDATECARTQUANTITY, body);
  return res.data as UpdateProductCartQuantityResponse;
};
