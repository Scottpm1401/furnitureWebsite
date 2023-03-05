import { API } from '../../constant/api';
import axiosClient from '../../interceptor';
import {
  CMSList,
  SearchPagination,
  UpdateOrderedRequest,
  UpdateUserRequest,
} from '../../models/api/cms';
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
