import { API } from '../../constant/api';
import axiosClient from '../../interceptor';
import { UpdateSelfUserRequest } from '../../models/api/user';
import { UserType } from '../../models/user';

export const getProfile = async () => {
  const res = await axiosClient.get(API.USER.GETSELF);
  return res.data as UserType;
};
export const updateUser = async (body: UpdateSelfUserRequest) => {
  const res = await axiosClient.patch(API.USER.UPDATESELF, body);
  return res.data as UserType;
};
