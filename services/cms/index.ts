import { API } from '../../constant/api';
import axiosClient from '../../interceptor';
import {
  CMSList,
  SearchPagination,
  UpdateUserRequest,
} from '../../models/api/cms';
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
