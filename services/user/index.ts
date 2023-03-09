import { API } from '../../constant/api';
import axiosClient from '../../interceptor';
import {
  ChangePasswordRequest,
  LoginResponse,
  UpdateSelfUserRequest,
} from '../../models/api/user';
import { UserType } from '../../models/user';

export const getProfile = async () => {
  const res = await axiosClient.get(API.USER.GETSELF);
  return res.data as UserType;
};

export const changePassword = async (body: ChangePasswordRequest) => {
  const res = await axiosClient.post(API.USER.CHANGEPASSWORD, body);
  return res.data as LoginResponse;
};

export const updateUser = async (body: UpdateSelfUserRequest) => {
  const res = await axiosClient.patch(API.USER.UPDATESELF, body);
  return res.data as UserType;
};
