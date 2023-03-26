import { API } from '../../constant/api';
import axiosClient from '../../interceptor';
import { DataPoint, Revenue } from '../../models/analysis';
import {
  CMSList,
  SearchPagination,
  UpdateOrderedRequest,
  UpdateProductRequest,
  UpdateUserRequest,
} from '../../models/api/cms';
import { ProductType } from '../../models/product';
import { PurchaseType } from '../../models/purchase';
import { UserType } from '../../models/user';

export const getAllUsers = async (params: SearchPagination) => {
  const res = await axiosClient.get(API.USER.GETALL, { params });
  return res.data as CMSList<UserType[]>;
};

export const getUserById = async (id: string) => {
  const res = await axiosClient.get(API.USER.GETUSER(id));
  return res.data as UserType;
};

export const updateUserById = async (id: string, body: UpdateUserRequest) => {
  const res = await axiosClient.post(API.USER.UPDATEUSER(id), body);
  return res.data as UserType;
};

export const getAllOrdered = async (params: SearchPagination) => {
  const res = await axiosClient.get(API.ORDERED.GETALL, { params });
  return res.data as CMSList<PurchaseType[]>;
};

export const getOrderedById = async (id: string) => {
  const res = await axiosClient.get(API.ORDERED.GETORDERD(id));
  return res.data as PurchaseType;
};

export const updateOrderedById = async (
  id: string,
  body: UpdateOrderedRequest
) => {
  const res = await axiosClient.post(API.ORDERED.UPDATEORDERD(id), body);
  return res.data as PurchaseType;
};

export const getAllProducts = async (params: SearchPagination) => {
  const res = await axiosClient.get(API.PRODUCT.GETCMSALL, { params });
  return res.data as CMSList<ProductType[]>;
};

export const updateProductById = async (
  id: string,
  body: UpdateProductRequest
) => {
  const res = await axiosClient.patch(API.PRODUCT.UPDATEPRODUCT(id), body);
  return res.data as ProductType;
};

export const createProduct = async (body: UpdateProductRequest) => {
  const res = await axiosClient.post(API.PRODUCT.CREATEPRODUCT, body);
  return res.data as ProductType;
};

export const getRevenuePerMonth = async () => {
  const res = await axiosClient.get(API.ANALYSIS.GETREVENUEPERMONTH);
  return res.data as Revenue[];
};
